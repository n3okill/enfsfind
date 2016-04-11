/**
 * @project enfsfind
 * @filename findSync.js
 * @description sync methods for finding items inside directories
 * @author Joao Parreira <joaofrparreira@gmail.com>
 * @copyright Copyright(c) 2016 Joao Parreira <joaofrparreira@gmail.com>
 * @licence Creative Commons Attribution 4.0 International License
 * @createdAt Created at 18-02-2016.
 * @version 0.0.2
 */


"use strict";

const nodeAssert = require("assert");
const enFs = require("enfspatch");
const enfslist = require("enfslist");


/**
 * Find all the items inside a directory and sub-directories based on a provided filter
 * @param {string} path - the path to the directory
 * @param {object} opt - various options for list module
 *              {bool} options.dereference - defines the type of stat that will be used in files
 *              {object} options.fs - the fs module to be used
 *              {function|RegExp} options.filter - function or RegExp used to narrow results
 *              this function receives an object of type {path: itemPath, stat: itemStatObject}
 * @return {Error|Array}
 */

function find(path, opt) {
    let options, result;
    nodeAssert(path, "path is required");

    if (opt) {
        if (isFunction(opt) || isRegExp(opt)) {
            options = {filter: opt};
        } else {
            options = opt;
        }
    }
    options = options || {};
    options.fs = options.fs || enFs;
    options.dereference = options.dereference === true;
    result = enfslist.listSync(path, options);
    if (options.filter) {
        if (isRegExp(options.filter)) {
            result = result.filter((item)=> {
                return options.filter.test(item.path);
            });
        } else if (isFunction(options.filter)) {
            result = result.filter((item)=> {
                return options.filter(item.path, item.stats);
            });
        }
    }
    return result;
}


module.exports = find;


function isFunction(arg) {
    return "Function".toLowerCase() === kindOf(arg).toLowerCase();
}

function isRegExp(arg) {
    return "RegExp".toLowerCase() === kindOf(arg).toLowerCase();
}
function kindOf(arg) {
    return arg === null ? "null" : arg === undefined ? "undefined" : /^\[object (.*)\]$/.exec(Object.prototype.toString.call(arg))[1];
}
