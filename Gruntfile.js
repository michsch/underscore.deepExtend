module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '<%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        '<%= pkg.original ? " * original: " + pkg.original + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
        ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n',
      //bannermin: '/*! <%= meta.banner %> */\n'
      bannermin: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
    },
    'string-replace': {
      version: {
        files: {
          './': [ './bower.json' ]
        },
        options: {
          replacements: [{
            pattern: /(\"version\":).*/i,
            replacement: '$1 "<%= pkg.version %>",'
          }]
        }
      }
    },
    coffee: {
      options: {
        bare: true
      },
      module: {
        expand: true,
        cwd: 'coffee/',
        src: [ '**/*.coffee' ],
        dest: 'dist/',
        rename: function( destPath, srcPath ) {
          var dest;
          dest = destPath + srcPath.replace(/\.coffee$/,".js");
          return dest;
        }
        //ext: '.js'
      }
    },
    usebanner: {
      taskName: {
        options: {
          position: 'top' || 'bottom',
          banner: '/* <%= meta.banner %> */',
          linebreak: true || false
        },
        files: {
          src: [ 'dist/underscore.deepExtend.js' ]
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: [ 'Gruntfile.js' ]
      },
      main: {
        src: [ 'Gruntfile.js' ]
      }
    },
    uglify: {
      prod: {
        options : {
          banner: '<%= meta.bannermin %>'
        },
        files: {
          'dist/underscore.deepExtend.min.js' : [ 'dist/underscore.deepExtend.js' ]
        }
      }
    },
    watch: {
      build: {
        files: [
          'Gruntfile.js',
          'coffee/**/*.coffee'
        ],
        tasks: 'build'
      }
    }
  });

  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('version', ['string-replace:version']);

  grunt.registerTask('build', [
    'version',
    'coffee',
    'usebanner',
    'jshint',
    'uglify'
  ]);

  grunt.registerTask('travis', ['build']);

  // Default task.
  grunt.registerTask('default', 'build');
};
