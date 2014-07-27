# underscore mixin deepExtend

[![Release](http://img.shields.io/github/release/michsch/underscore.deepExtend.svg?style=flat)](https://github.com/michsch/underscore.deepExtend/releases)
[![Issues](http://img.shields.io/github/issues/michsch/underscore.deepExtend.svg?style=flat)](https://github.com/michsch/underscore.deepExtend/issues)

---

[![Build Status](http://img.shields.io/travis/michsch/underscore.deepExtend/master.svg?style=flat)](https://travis-ci.org/michsch/underscore.deepExtend)
[![Code Climate](http://img.shields.io/codeclimate/github/michsch/underscore.deepExtend.svg?style=flat)](https://codeclimate.com/github/michsch/underscore.deepExtend)
[![devDependency Status](http://img.shields.io/david/dev/michsch/underscore.deepExtend.svg?style=flat)](https://david-dm.org/michsch/underscore.deepExtend#info=devDependencies)

Copy all of the properties in the source objects over to the destination object, and return the destination object. This method will recursively copy mutual properties which are also objects.

Original code: https://gist.github.com/ElliotChong/3861963

## How to use

```javascript
var user = {
  "name": {
    "first": "Earl"
  },
  "friends": ["0", "1", "3"],
  "job": "Mad Scientist",
  "pets": { "dog": "Ralph" }
};

var userUpdate = {
  "name": {
    "last": "Duncan"
  },
  "friends": ["6", "9"],
  "job":
  "Happy Scientist",
  "pets": {
    "cat": "Judy"
  },
  "city": "Portlandia"
};

_.deepExtend(user, userUpdate);

/*
results in user equalling:

{
  "name": {
    "first": "Earl",
    "last": "Duncan"
  },
  "friends": ["0", "1", "3", "6", "9"],
  "job":
  "Happy Scientist",
  "pets": {
    "dog": "Ralph", "cat": "Judy"
  },
  "city": "Portlandia"
}
*/
```

## License

Licensed under the [MIT License](https://github.com/michsch/underscore.deepExtend/blob/master/MIT.txt) and [WTFPL License](https://github.com/michsch/underscore.deepExtend/blob/master/WTFPL.txt).

[![Made with love in cologne](http://img.shields.io/badge/made_with_love_in-cologne-red.svg?style=flat)](http://en.wikipedia.org/wiki/Cologne)
