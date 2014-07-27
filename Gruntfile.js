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
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>',
      bannercoffee: '###*\n * <%= meta.banner %> \n###',
      bannerjs: '/*! <%= meta.banner %> */\n'
    },
    'string-replace': {
      comment: {
        files: {
          './': [ '**/*.coffee' ]
        },
        options: {
          replacements: [{
            pattern: /###\*(\n|\r|(\r\n))(.|\n|\r|(\r\n))*###/i,
            replacement: '<%= meta.bannercoffee %>'
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
        dest: '',
        rename: function( destPath, srcPath ) {
          var dest;
          dest = destPath + srcPath.replace(/\.coffee$/,".js");
          return dest;
        }
        //ext: '.js'
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
          banner: '<%= meta.bannerjs %>'
        },
        files: {
          'underscore.deepExtend.min.js' : [ 'underscore.deepExtend.js' ]
        }
      }
    },
    watch: {
      module: {
        files: [
          'Gruntfile.js',
          'coffee/**/*.coffee'
        ],
        tasks: 'compile'
      }
    }
  });

  // Load grunt-compass plugin
  grunt.loadNpmTasks( 'grunt-contrib-coffee' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-string-replace' );

  grunt.registerTask( 'comment', [ 'string-replace:comment' ]);

  grunt.registerTask( 'travis', [
    'coffee',
    'jshint',
    'uglify'
  ]);

  grunt.registerTask( 'compile', [
    'coffee',
    'jshint',
    'uglify'
  ]);


  // Default task.
  grunt.registerTask('default', 'watch:module');
};
