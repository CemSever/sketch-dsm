var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/csv.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/csv.js":
/*!********************!*\
  !*** ./src/csv.js ***!
  \********************/
/*! exports provided: default, getCurrentFilePath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentFilePath", function() { return getCurrentFilePath; });
/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var sketch = __webpack_require__(/*! sketch/dom */ "sketch/dom");

  var Document = __webpack_require__(/*! sketch/dom */ "sketch/dom").Document;

  var document = Document.getSelectedDocument();
  var pageCount = document.pages.length;
  var p;
  var currentPage;
  var k;
  var componentData = makeComponentData(document);
  var csvData = createCSV(document);
  writeFile('/Users/cemsever/components.csv', csvData);
  log(getCurrentFilePath);
});
function getCurrentFilePath(context) {
  return context.document.fileURL().path().replace(/\.sketch$/, '');
}

function writeFile(path, content) {
  var string = NSString.stringWithFormat("%@", content);
  return string.writeToFile_atomically(path, true);
}

function makeComponentData(document) {
  var pageIndex = 0;
  var pageCount = document.pages.length;
  var components = [];
  var pages = [];

  for (pageIndex = 0; pageIndex < pageCount; pageIndex++) {
    var page = document.pages[pageIndex]; // pages = page.name;

    pages.push({
      name: page.name
    });
    var componentIndex = 0;
    var componentCount = page.layers.length;

    for (componentIndex = 0; componentIndex < componentCount; componentIndex++) {
      var component = page.layers[componentIndex]; // log(component.id);

      components.push({
        name: component.name,
        parent: page.name
      });
    }
  }

  var dictionary = {
    "components": components,
    "pages": pages
  };
  return JSON.stringify(dictionary);
}

function createCSV(document) {
  var pageIndex = 0;
  var pageCount = document.pages.length;
  var components = "Component Group , Component Name  , Position , Size , Status, Custom ";
  components += "\n";

  for (pageIndex = 0; pageIndex < pageCount; pageIndex++) {
    var page = document.pages[pageIndex];

    if (page.name != "Symbols") {
      var componentIndex = 0;
      var componentCount = page.layers.length;

      for (componentIndex = 0; componentIndex < componentCount; componentIndex++) {
        var component = page.layers[componentIndex];
        var compName = component.name;
        var tempName = compName.split('/');
        var nameIndex = 0;
        var nameCount = tempName.length;

        for (nameIndex = 0; nameIndex < nameCount; nameIndex++) {
          if (tempName[nameIndex] != " ") {
            components += tempName[nameIndex];
          } else {
            components += "";
          }

          if (nameIndex != nameCount - 1) {
            components += ",";
          }
        }

        components += "\n";
      }
    }
  }

  var csv = components;
  return csv;
}

function createArray() {
  var components;
} // TODO
//     var table = createTable(document);
//      createarray with component.group, component.name, component.position, component.size, component.status, component.custom, component.id
//      change createCSV to handle arrays

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=csv.js.map