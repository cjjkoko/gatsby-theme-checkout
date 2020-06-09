"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isItemInList = exports.grapQLData = exports.graphQLStrData = exports.ObjToString = exports.isOrNotEmpty = void 0;
/**
 * 去掉特殊字符,返回true为空，返回false不为空
 * @param字符检验
 *
 */
function isOrNotEmpty(s) {
    if (!!s) {
        switch (typeof (s)) {
            case 'string':
                // @ts-ignore
                if (s !== '' || s !== 'null') {
                    return false;
                }
                return true;
            case 'number':
                return false;
            case 'object':
                if (JSON.stringify(s) === '{}' || JSON.stringify(s) === '[]') {
                    return true;
                }
                return false;
        }
        return true;
    }
    return true;
}
exports.isOrNotEmpty = isOrNotEmpty;
function ObjToString(obj) {
    switch (typeof (obj)) {
        case 'object':
            var newData_1 = '';
            if (obj.length >= 1) {
                newData_1 += '[';
                obj.map(function (item) {
                    switch (typeof (item)) {
                        case 'object':
                            newData_1 += '{';
                            Object.keys(item).map(function (key) {
                                newData_1 += key + ":" + ObjToString(item[key]) + ",";
                            });
                            newData_1 = newData_1.slice(0, newData_1.length - 1);
                            newData_1 += '},';
                            break;
                        case 'string':
                            newData_1 += item;
                            newData_1 += ',';
                            break;
                    }
                });
                newData_1 = newData_1.slice(0, newData_1.length - 1);
                newData_1 += ']';
            }
            else {
                newData_1 += '{';
                Object.keys(obj).map(function (key) {
                    newData_1 += key + ":" + ObjToString(obj[key]) + ",";
                });
                newData_1 = newData_1.slice(0, newData_1.length - 1);
                newData_1 += '}';
            }
            return newData_1;
        case 'number':
            return obj;
        default:
            var str = obj.toString();
            if (str.indexOf('enum') !== -1) {
                str = str.slice(4, str.length);
                return "" + str;
            }
            return "\"" + obj.toString() + "\"";
    }
}
exports.ObjToString = ObjToString;
function graphQLStrData(obj) {
    if (obj === null) {
        return 'null';
    }
    if (obj === undefined) {
        return 'undefined';
    }
    switch (typeof (obj)) {
        case 'number':
        case 'boolean':
        case 'object':
            return obj;
        default:
            if (obj.slice(0, 1) === '"') {
                return "" + decodeURIComponent(encodeURIComponent(obj).replace(/%0A/g, "\\n"));
            }
            else {
                return "\"" + decodeURIComponent(encodeURIComponent(obj).replace(/%0A/g, "\\n")) + "\"";
            }
    }
}
exports.graphQLStrData = graphQLStrData;
function grapQLData(obj) {
    var newData = '';
    Object.keys(obj).map(function (key) {
        newData += key + ":" + ObjToString(obj[key]) + ",";
    });
    return newData.slice(0, newData.length - 1);
}
exports.grapQLData = grapQLData;
function isItemInList(list, obj, key) {
    if (isOrNotEmpty(list)) {
        return false;
    }
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var item = list_1[_i];
        if (item[key] === obj) {
            return true;
        }
    }
    return false;
}
exports.isItemInList = isItemInList;
