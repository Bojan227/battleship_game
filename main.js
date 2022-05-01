/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar dom = function () {\n  var createBoard = function createBoard(gameArr, container) {\n    var _loop = function _loop(i) {\n      gameArr[i].forEach(function (element, n) {\n        var squareDiv = document.createElement('div');\n        squareDiv.setAttribute('data-x', i);\n        squareDiv.setAttribute('data-y', n);\n        container.className === 'user-board' ? squareDiv.classList.add('empty') : false;\n        typeof element === 'number' ? squareDiv.setAttribute('data-busy', 'busy') : false;\n        squareDiv.setAttribute('data-ship', element);\n        container.appendChild(squareDiv);\n      });\n    };\n\n    for (var i = 0; i < 10; i += 1) {\n      _loop(i);\n    }\n  };\n\n  return {\n    createBoard: createBoard\n  };\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n//# sourceURL=webpack://battleship_game/./src/dom.js?");

/***/ }),

/***/ "./src/gameboardFactory.js":
/*!*********************************!*\
  !*** ./src/gameboardFactory.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ \"./src/shipFactory.js\");\n\n\nvar gameboard = function gameboard() {\n  var gameboardArray = Array.from(Array(10), function () {\n    return new Array(10).fill('');\n  });\n  var shipArray = [(0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(3), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(4), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(2), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(5), (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(6)];\n\n  function placeShip(x, y, length, direction) {\n    var i = 0;\n\n    if (direction === 'h') {\n      while (i < length) {\n        gameboardArray[x][y + i] = shipArray.find(function (x) {\n          return x.getLength() === length;\n        }).getLength();\n        i += 1;\n      }\n    } else if (direction === 'v') {\n      while (i < length) {\n        gameboardArray[x + i][y] = shipArray.find(function (x) {\n          return x.getLength() === length;\n        }).getLength();\n        i += 1;\n      }\n    }\n\n    return gameboardArray;\n  }\n\n  function receiveAttack(x, y) {\n    if (typeof gameboardArray[x][y] === 'number') {\n      var shipLength = gameboardArray[x][y];\n      shipArray.find(function (x) {\n        return x.length === shipLength;\n      }).hit(); // length goes down by one\n\n      gameboardArray[x][y] = 'x';\n    } else if (gameboardArray[x][y] === 'x') {\n      return;\n    } else {\n      gameboardArray[x][y] = 'e';\n    }\n\n    return gameboardArray;\n  }\n\n  function checkSunk() {\n    var result = [];\n\n    for (var _ship in shipArray) {\n      result.push(shipArray[_ship].isSunk());\n    }\n\n    return result.every(function (x) {\n      return x === true;\n    });\n  }\n\n  function checkWin(winMsg, player) {\n    return checkSunk() ? winMsg.textContent = \"\".concat(player, \" lost\") : false;\n  }\n\n  function restartArray() {\n    gameboardArray = '';\n    gameboardArray = Array.from(Array(10), function () {\n      return new Array(10).fill('');\n    });\n    return gameboardArray;\n  }\n\n  function getArray() {\n    return gameboardArray;\n  }\n\n  return {\n    placeShip: placeShip,\n    receiveAttack: receiveAttack,\n    checkSunk: checkSunk,\n    checkWin: checkWin,\n    restartArray: restartArray,\n    getArray: getArray\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboard);\n\n//# sourceURL=webpack://battleship_game/./src/gameboardFactory.js?");

/***/ }),

/***/ "./src/helperFunctions.js":
/*!********************************!*\
  !*** ./src/helperFunctions.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"placeMultipleShips\": () => (/* binding */ placeMultipleShips),\n/* harmony export */   \"removePreviousShipCoord\": () => (/* binding */ removePreviousShipCoord)\n/* harmony export */ });\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n// Removes the coordinates of previous placed ship\nfunction removePreviousShipCoord(playerArr, coordx, coordy, lng, direction) {\n  playerArr.forEach(function (coord) {\n    if (JSON.stringify(coord) === JSON.stringify([coordx, coordy, lng, direction])) {\n      playerArr.splice(playerArr.indexOf(coord), 1);\n    }\n  });\n}\n\nfunction placeMultipleShips(coordArr, choosePlayer) {\n  coordArr.forEach(function (coord) {\n    var _coord = _slicedToArray(coord, 4),\n        x = _coord[0],\n        y = _coord[1],\n        z = _coord[2],\n        d = _coord[3];\n\n    choosePlayer.placeShip(x, y, z, d);\n  });\n}\n\n\n\n//# sourceURL=webpack://battleship_game/./src/helperFunctions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardFactory */ \"./src/gameboardFactory.js\");\n/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helperFunctions */ \"./src/helperFunctions.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\n\nvar gameFlow = function () {\n  var createBoard = _dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"].createBoard;\n  var container = document.querySelector('.container');\n  var mainBoard = document.querySelector('.user-board');\n  var enemyBoard = document.querySelector('.enemy-board');\n  var mainPlayerCoord = [[0, 5, 3, 'h'], [5, 3, 4, 'h'], [8, 8, 1, 'h'], [5, 8, 2, 'v'], [2, 1, 5, 'v'], [9, 0, 6, 'h']];\n  var enemyCoord = [];\n  var mainPlayer = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  var computerPlayer = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_1__.placeMultipleShips)(mainPlayerCoord, mainPlayer);\n  (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_1__.placeMultipleShips)(mainPlayerCoord, computerPlayer);\n  createBoard(mainPlayer.getArray(), mainBoard);\n  createBoard(mainPlayer.getArray(), enemyBoard);\n  console.log(mainPlayer.getArray());\n}();\n\n//# sourceURL=webpack://battleship_game/./src/index.js?");

/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar ship = function ship(length) {\n  var newLength = length;\n\n  function hit() {\n    newLength -= 1;\n  }\n\n  function isSunk() {\n    return newLength === 0;\n  }\n\n  function getLength() {\n    return newLength;\n  }\n\n  return {\n    length: length,\n    getLength: getLength,\n    hit: hit,\n    isSunk: isSunk\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ship);\n\n//# sourceURL=webpack://battleship_game/./src/shipFactory.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;