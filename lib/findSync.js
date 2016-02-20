/**
 * @project enfsfind
 * @filename findSync.js
 * @description sync methods for finding items inside directories
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
 * @return {Error|Array}
 */

function find(path, opt) {
    var items, options, result;
    nodeAssert(path, "path is required");

    if (opt) {
        if (nodeUtil.isFunction(opt) || nodeUtil.isRegExp(opt)) {
            options = {filter: opt};
        } else {
            options = opt;
        }
    }
    options = options || {};
    options.fs = options.fs || enFs;
    options.dereference = options.dereference === true;
    items = enfslist.listSync(path, {fs: options.fs, dereference: options.dereference});
    if (options.filter) {
        if (nodeUtil.isRegExp(options.filter)) {
            result = items.filter(function(item) {
                return options.filter.test(item.path);
            });
        } else if (nodeUtil.isFunction(options.filter)) {
            result = items.filter(function(item) {
                return options.filter(item.path);
            });
        }
    } else {
        result = items;
    }
    return result;
}


module.exports = find;
