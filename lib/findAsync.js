/**
 * @project enfsfind
 * @filename findAsync.js
 * @description async methods for finding items inside directories
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

function kindOf(arg) {
    return arg === null ? "null" : typeof arg === "undefined" ? "undefined" : /^\[object (.*)\]$/.exec(Object.prototype.toString.call(arg))[1];
}

function isFunction(arg) {
    return "Function".toLowerCase() === kindOf(arg).toLowerCase();
}

function isRegExp(arg) {
    return "RegExp".toLowerCase() === kindOf(arg).toLowerCase();
}


/**
 * Find all the items inside a directory and sub-directories based on a provided filter
 * @param {string} path - the path to the directory
 * @param {object} opt - various options for list module
 *              {bool} options.dereference - defines the type of stat that will be used in files
 *              {object} options.fs - the fs module to be used
 *              {function|RegExp} options.filter - function or RegExp used to narrow results
 *              this function receives an object of type {path: itemPath, stat: itemStatObject}
 * @param {function} callback - the callback function that will be called after the list is done
 * @return {Error|Array}
 */

function find(path, opt, callback) {
    let options;
    nodeAssert(path, "path is required");
    if (isFunction(opt) && !callback) {
        callback = opt;
        opt = null;
    }

    if (opt) {
        if (isFunction(opt) || isRegExp(opt)) {
            options = {filter: opt};
        } else {
            options = opt;
        }
    }
    options = options || {};
    nodeAssert(typeof callback === "function", "callback must be a function");

    options.fs = options.fs || enFs;
    options.dereference = options.dereference === true;

    enfslist.list(path, options, (err, list) => {
        if (err) {
            return callback(err);
        }
        if (options.filter) {
            if (isRegExp(options.filter)) {
                list = list.filter(function(item) {
                    return options.filter.test(item.path);
                });
            } else if (isFunction(options.filter)) {
                list = list.filter(function(item) {
                    return options.filter(item.path, item.stats);
                });
            }
        }
        callback(null, list);
    });
}


module.exports = find;

