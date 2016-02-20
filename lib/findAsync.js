/**
 * @project enfsfind
 * @filename findAsync.js
 * @description async methods for finding items inside directories
 * @author Joao Parreira <joaofrparreira@gmail.com>
 * @copyright Copyright(c) 2016 Joao Parreira <joaofrparreira@gmail.com>
 * @licence Creative Commons Attribution 4.0 International License
 * @createdAt Created at 18-02-2016.
 * @version 0.0.1
 */


"use strict";


var nodeAssert = require("assert"),
    nodeUtil = require("util"),
    enFs = require("enfspatch"),
    enfslist = require("enfslist");

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
    var options;
    nodeAssert(path, "path is required");
    if (nodeUtil.isFunction(opt) && !callback) {
        callback = opt;
        opt = null;
    }
    if (opt) {
        if (nodeUtil.isFunction(opt) || nodeUtil.isRegExp(opt)) {
            options = {filter: opt};
        } else {
            options = opt;
        }
    }
    options = options || {};
    nodeAssert(typeof callback === "function", "callback must be a function");

    options.fs = options.fs || enFs;
    options.dereference = options.dereference === true;

    enfslist.list(path, {
        fs: options.fs,
        dereference: options.dereference
    }, function(err, list) {
        var result = [];
        if (err) {
            return callback(err);
        }
        if (options.filter) {
            if (nodeUtil.isRegExp(options.filter)) {
                result = list.filter(function(item) {
                    return options.filter.test(item.path);
                });
            } else if (nodeUtil.isFunction(options.filter)) {
                result = list.filter(function(item) {
                    return options.filter(item);
                });
            }
        } else {
            result = list;
        }
        callback(null, result);
    });
}


module.exports = find;
