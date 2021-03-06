[![Build Status](https://travis-ci.org/n3okill/enfsfind.svg)](https://travis-ci.org/n3okill/enfsfind)
[![Build status](https://ci.appveyor.com/api/projects/status/w8567ywc795x06po?svg=true)](https://ci.appveyor.com/project/n3okill/enfsfind)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/125b0fd16c4e4ad390acd52b216586e1)](https://www.codacy.com/app/n3okill/enfsfind)
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=64PYTCDH5UNZ6)

[![NPM](https://nodei.co/npm/enfsfind.png)](https://nodei.co/npm/enfsfind/)

enfsfind
=========
Module that add find functionality to node fs module

**enfs** stands for [E]asy [N]ode [fs]

This module is intended to work as a sub-module of [enfs](https://www.npmjs.com/package/enfs)


Description
-----------
This module will add a method that allows the obtaining of a
list of items in the file system under one directory and sub-directories
filtering the result.

- This module will add following methods to node fs module:
  * find
  * findSync
  
Usage
-----
`enfsfind`

```js
    const enfsfind = require("enfsfind");
```

Errors
------
All the methods follows the node culture.
- Async: Every async method returns an Error in the first callback parameter
- Sync: Every sync method throws an Error.


Additional Methods
------------------
- [find](#find)
- [findSync](#findsync)


### find
  - **find(path, [options], callback)**

> Obtain the list of items under a directory and sub-directories asynchronously.
Each item will be an object containing: {path: pathToItem, stat: itemStat}

[options]:
  * fs (Object): an alternative fs module to use (default will be [enfslist](https://www.npmjs.com/package/enfslist))
  * dereference (Boolean): if true will dereference symlinks listing the items to where it points (default: false)
  * filter (Function or RegExp): if defined will filter the items in the file system

No Filter:

```js
    enfsfind.find("/home", function(err, listOfItems){
        listOfItems.forEach(function(item){
            //do something
        });
    });
```

Filter (Function):

```js
    function filterFn(path, stat){
        return stat.isFile() && path.indexOf("mp3") !== -1;
    }
    enfsfind.find("/home", {filter: filterFn},function(err, listOfItems){
        listOfItems.forEach(function(item){
            //do something
        });
    });
```

Filter (RegExp):

```js
    enfsfind.find("/home", /\.mp3$/,function(err, listOfItems){
        listOfItems.forEach(function(item){
            //do something
        });
    });
```


### findSync
  - **findSync(path, [options])**

> Obtain the list of items under a directory and sub-directories synchronously
Each item will be an object containing: {path: pathToItem, stat: itemStat}

[options]:
  * fs (Object): an alternative fs module to use (default will be [enfslist](https://www.npmjs.com/package/enfslist))
  * dereference (Boolean): if true will dereference symlinks listing the items to where it points (default: false)
  * filter (Function or RegExp): if defined will filter the items in the file system

No Filter:

```js
    const listOfItems = enfsfind.findSync("/home");
    listOfItems.forEach(function(item){
        //do something
    });
```

Filter (Function):

```js
    function filterFn(path, stat){
        return stat.isFile() && path.indexOf("mp3") !== -1;
    }
    const listOfItems = enfsfind.findSync("/home", {filter: filterFn});
    listOfItems.forEach(function(item){
        //do something
    });
```

Filter (RegExp):

```js
    const listOfItems = enfsfind.findSync("/home", /\.mp3$/);
    listOfItems.forEach(function(item){
        //do something
    });
```

License
-------

Creative Commons Attribution 4.0 International License

Copyright (c) 2016 Joao Parreira <joaofrparreira@gmail.com> [GitHub](https://github.com/n3okill)

This work is licensed under the Creative Commons Attribution 4.0 International License. 
To view a copy of this license, visit [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/).


