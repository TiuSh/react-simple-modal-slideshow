module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactAddonsCssTransitionGroup = __webpack_require__(2);
	
	var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);
	
	var _debug = __webpack_require__(3);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	var _SimpleModal = __webpack_require__(6);
	
	var _SimpleModal2 = _interopRequireDefault(_SimpleModal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var log = (0, _debug2.default)('modal-slideshow:log');
	
	var SimpleModalSlideshow = function (_Component) {
	  _inherits(SimpleModalSlideshow, _Component);
	
	  function SimpleModalSlideshow(props) {
	    _classCallCheck(this, SimpleModalSlideshow);
	
	    // Initial state
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleModalSlideshow).call(this, props));
	
	    _this.state = {
	      open: false,
	      currentSlide: 0,
	      slideAnimationDirection: 'left'
	    };
	
	    // Prepare keyboard event listener
	    _this._handleKeyboardInput = _this._handleKeyboardInput.bind(_this);
	
	    // Bind API
	    _this.goTo = _this.goTo.bind(_this);
	    _this.goToNext = _this.goToNext.bind(_this);
	    _this.goToPrev = _this.goToPrev.bind(_this);
	    _this.open = _this.open.bind(_this);
	    _this.close = _this.close.bind(_this);
	    return _this;
	  }
	
	  _createClass(SimpleModalSlideshow, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // Initially set current slide
	      if (this.props.currentSlide) {
	        this._goTo(this.props.currentSlide);
	      }
	
	      // Initially open the modal
	      if (this.props.open) {
	        this._open();
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // Listen "open" / "currentSlide" props only if the API is disabled
	      if (!nextProps.enableApi) {
	        // Update current slide
	        this._goTo(nextProps.currentSlide);
	
	        // Make sure to open/close only when needed
	        if (!this.props.open && nextProps.open) {
	          this._open();
	        } else if (this.props.open && !nextProps.open) {
	          this._close();
	        }
	      }
	
	      // If classNamePrefix is updated, make sure to update flag on html tag if set
	      if (nextProps.classNamePrefix !== this.props.classNamePrefix) {
	        document.documentElement.classList.remove(this.props.classNamePrefix + '--opened');
	        document.documentElement.classList.add(nextProps.classNamePrefix + '--opened');
	      }
	    }
	
	    /**
	     * Keyboard event listener
	     *
	     * @param {Event} event Keyboard event
	     */
	
	  }, {
	    key: '_handleKeyboardInput',
	    value: function _handleKeyboardInput(event) {
	      log('Keyboard input captured (keyCode=' + event.keyCode + ')');
	
	      // Left arrow
	      if (event.keyCode === 37) {
	        this._handlePrev();
	        // Right arrow
	      } else if (event.keyCode === 39) {
	        this._handleNext();
	        // Esc
	      } else if (event.keyCode === 27) {
	        this._handleClose();
	      }
	    }
	
	    /**
	     * Handle close event
	     */
	
	  }, {
	    key: '_handleClose',
	    value: function _handleClose() {
	      log('Handle Close');
	
	      // If props.onClose is supplied, call it and stop here
	      if (this.props.onClose) {
	        this.props.onClose();
	        return;
	      }
	
	      // If API is disabled only the parent can control the slideshow
	      // through props.onClose
	      if (this.props.enableApi) {
	        this.close();
	      }
	    }
	
	    /**
	     * Handle prev event
	     */
	
	  }, {
	    key: '_handlePrev',
	    value: function _handlePrev() {
	      var currentSlide = this.state.currentSlide;
	      var prevSlide = currentSlide - 1;
	
	      // Make sure there's a slide before the current one
	      if (currentSlide <= 0) {
	        return;
	      }
	
	      log('Handle Prev');
	
	      // If props.onPrev is supplied, call it and stop here
	      if (this.props.onPrev) {
	        this.props.onPrev(prevSlide);
	        return;
	      }
	
	      // If API is disabled only the parent can control the slideshow
	      // through props.onPrev
	      if (this.props.enableApi) {
	        this._goTo(prevSlide);
	      }
	    }
	
	    /**
	     * Handle next event
	     */
	
	  }, {
	    key: '_handleNext',
	    value: function _handleNext() {
	      var currentSlide = this.state.currentSlide;
	      var nextSlide = currentSlide + 1;
	
	      // Make sure there's a slide after the current one
	      if (nextSlide >= this.props.slides.length) {
	        return;
	      }
	
	      log('Handle Next');
	
	      // If props.onNext is supplied, call it and stop here
	      if (this.props.onNext) {
	        this.props.onNext(nextSlide);
	        return;
	      }
	
	      // If API is disabled, only the parent component can control the slideshow
	      // through props.onNext
	      if (this.props.enableApi) {
	        this._goTo(nextSlide);
	      }
	    }
	  }, {
	    key: '_goToPrev',
	    value: function _goToPrev() {
	      var currentSlide = this.state.currentSlide;
	      var prevSlide = currentSlide - 1;
	
	      if (currentSlide <= 0) {
	        return;
	      }
	
	      this._goTo(prevSlide);
	    }
	  }, {
	    key: '_goToNext',
	    value: function _goToNext() {
	      var currentSlide = this.state.currentSlide;
	      var nextSlide = currentSlide + 1;
	
	      if (nextSlide >= this.props.slides.length) {
	        return;
	      }
	
	      this._goTo(nextSlide);
	    }
	  }, {
	    key: '_goTo',
	    value: function _goTo(index) {
	      if (this.props.slides.length === 0) {
	        return;
	      }
	
	      // Make sure the slide exists
	      if (index < 0 || index >= this.props.slides.length) {
	        throw new Error('Invalid index \'' + index + '\' supplied to SimpleModalSlideshow::goTo()');
	      }
	
	      log('Go to slide ' + index);
	
	      // Update state with the new index and animation direction
	      this.setState({
	        currentSlide: index,
	        slideAnimationDirection: index < this.state.currentSlide ? 'right' : 'left'
	      });
	    }
	  }, {
	    key: '_close',
	    value: function _close() {
	      log('Close');
	
	      // Remove class from html tag
	      document.documentElement.classList.remove(this.props.classNamePrefix + '--opened');
	
	      // Remove keyboard event listener
	      document.removeEventListener('keydown', this._handleKeyboardInput);
	
	      // Update state
	      this.setState({
	        open: false
	      });
	    }
	  }, {
	    key: '_open',
	    value: function _open(index) {
	      log('Open');
	
	      // Add a class to the body (to disable background scroll)
	      document.documentElement.classList.add(this.props.classNamePrefix + '--opened');
	
	      // Enable keyboard event listener
	      document.addEventListener('keydown', this._handleKeyboardInput);
	
	      // If an index is given, jump to the slide before opening
	      if (index !== undefined) {
	        this._goTo(index);
	      }
	
	      // Update state
	      this.setState({
	        open: true
	      });
	    }
	
	    /**
	     * Go to previous slide
	     */
	
	  }, {
	    key: 'goToPrev',
	    value: function goToPrev() {
	      if (!this.props.enableApi) {
	        throw new Error('SimpleModalSlideshow API is disabled');
	      }
	
	      this._goToPrev();
	    }
	
	    /**
	     * Go to next slide
	     */
	
	  }, {
	    key: 'goToNext',
	    value: function goToNext() {
	      if (!this.props.enableApi) {
	        throw new Error('SimpleModalSlideshow API is disabled');
	      }
	
	      this._goToNext();
	    }
	
	    /**
	     * Go to a specific slide
	     *
	     * @param {Int} index Slide index to go to
	     */
	
	  }, {
	    key: 'goTo',
	    value: function goTo(index) {
	      if (!this.props.enableApi) {
	        throw new Error('SimpleModalSlideshow API is disabled');
	      }
	
	      this._goTo(index);
	    }
	
	    /**
	     * Open the slideshow
	     *
	     * @param {Int} index If specified, the given slide will be opened
	     */
	
	  }, {
	    key: 'open',
	    value: function open(index) {
	      if (!this.props.enableApi) {
	        throw new Error('SimpleModalSlideshow API is disabled');
	      }
	
	      this._open(index);
	    }
	
	    /**
	     * Close the slideshow
	     */
	
	  }, {
	    key: 'close',
	    value: function close() {
	      if (!this.props.enableApi) {
	        throw new Error('SimpleModalSlideshow API is disabled');
	      }
	
	      this._close();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var modal = null;
	
	      // Modal is added to the DOM only if it has a slide to display
	      if (this.props.slides.length > 0 && this.state.open) {
	        modal = _react2.default.createElement(_SimpleModal2.default, {
	          key: 'modal-slideshow',
	          slide: this.props.slides[this.state.currentSlide],
	          slideIndex: this.state.currentSlide,
	          slideAnimations: this.props.slideAnimations,
	          slideAnimationDirection: this.state.slideAnimationDirection,
	          slideTransitionEnterTimeout: this.props.slideTransitionEnterTimeout,
	          slideTransitionLeaveTimeout: this.props.slideTransitionLeaveTimeout,
	          showPrev: this.state.currentSlide > 0,
	          showNext: this.state.currentSlide < this.props.slides.length - 1,
	          onPrev: this._handlePrev.bind(this),
	          onNext: this._handleNext.bind(this),
	          onClose: this._handleClose.bind(this),
	          classNamePrefix: this.props.classNamePrefix
	        });
	      }
	
	      return _react2.default.createElement(
	        _reactAddonsCssTransitionGroup2.default,
	        {
	          component: 'div',
	          transitionName: this.props.classNamePrefix + '__modal',
	          transitionEnter: this.props.modalAnimations,
	          transitionLeave: this.props.modalAnimations,
	          transitionEnterTimeout: this.props.modalTransitionEnterTimeout,
	          transitionLeaveTimeout: this.props.modalTransitionLeaveTimeout
	        },
	        modal
	      );
	    }
	  }]);
	
	  return SimpleModalSlideshow;
	}(_react.Component);
	
	exports.default = SimpleModalSlideshow;
	
	
	SimpleModalSlideshow.propTypes = {
	  // Slides
	  slides: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
	    media: _react2.default.PropTypes.node.isRequired,
	    content: _react2.default.PropTypes.node
	  })).isRequired,
	
	  // Controls
	  open: _react2.default.PropTypes.bool,
	  currentSlide: _react2.default.PropTypes.number,
	
	  // Options
	  enableApi: _react2.default.PropTypes.bool,
	  classNamePrefix: _react2.default.PropTypes.string,
	
	  // Animations
	  modalAnimations: _react2.default.PropTypes.bool,
	  slideAnimations: _react2.default.PropTypes.bool,
	  modalTransitionEnterTimeout: _react2.default.PropTypes.number,
	  modalTransitionLeaveTimeout: _react2.default.PropTypes.number,
	  slideTransitionEnterTimeout: _react2.default.PropTypes.number,
	  slideTransitionLeaveTimeout: _react2.default.PropTypes.number,
	
	  // Event listeners
	  onClose: _react2.default.PropTypes.func,
	  onPrev: _react2.default.PropTypes.func,
	  onNext: _react2.default.PropTypes.func
	};
	
	SimpleModalSlideshow.defaultProps = {
	  open: false,
	  currentSlide: 0,
	  enableApi: false,
	  classNamePrefix: 'modal-slideshow',
	  modalAnimations: true,
	  slideAnimations: true,
	  modalTransitionEnterTimeout: 300,
	  modalTransitionLeaveTimeout: 300,
	  slideTransitionEnterTimeout: 300,
	  slideTransitionLeaveTimeout: 300
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-addons-css-transition-group");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(4);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return 'WebkitAppearance' in document.documentElement.style ||
	  // is firebug? http://stackoverflow.com/a/398120/376773
	  window.console && (console.firebug || console.exception && console.table) ||
	  // is firefox >= v31?
	  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function (v) {
	  return JSON.stringify(v);
	};
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function (match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch (e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch (e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(5);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {}
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function (val, options) {
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long ? long(val) : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactAddonsCssTransitionGroup = __webpack_require__(2);
	
	var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);
	
	var _SimpleSlide = __webpack_require__(7);
	
	var _SimpleSlide2 = _interopRequireDefault(_SimpleSlide);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SimpleModal = function (_Component) {
	  _inherits(SimpleModal, _Component);
	
	  function SimpleModal() {
	    _classCallCheck(this, SimpleModal);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleModal).apply(this, arguments));
	  }
	
	  _createClass(SimpleModal, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: this.props.classNamePrefix },
	        _react2.default.createElement(
	          'a',
	          {
	            className: this.props.classNamePrefix + '__close',
	            onClick: this.props.onClose
	          },
	          'Close'
	        ),
	        _react2.default.createElement(
	          _reactAddonsCssTransitionGroup2.default,
	          {
	            component: 'div',
	            transitionName: {
	              enter: this.props.classNamePrefix + '__slide-enter' + ('-' + this.props.slideAnimationDirection),
	              enterActive: this.props.classNamePrefix + '__slide-enter' + ('-' + this.props.slideAnimationDirection + '-active'),
	              leave: this.props.classNamePrefix + '__slide-leave' + ('-' + this.props.slideAnimationDirection),
	              leaveActive: this.props.classNamePrefix + '__slide-leave' + ('-' + this.props.slideAnimationDirection + '-active')
	            },
	            transitionEnter: this.props.slideAnimations,
	            transitionLeave: this.props.slideAnimations,
	            transitionEnterTimeout: this.props.slideTransitionEnterTimeout,
	            transitionLeaveTimeout: this.props.slideTransitionLeaveTimeout
	          },
	          _react2.default.createElement(_SimpleSlide2.default, _extends({}, this.props, {
	            key: this.props.slideIndex
	          }))
	        )
	      );
	    }
	  }]);
	
	  return SimpleModal;
	}(_react.Component);
	
	exports.default = SimpleModal;
	
	
	SimpleModal.propTypes = {
	  slide: _react2.default.PropTypes.object,
	  slideIndex: _react2.default.PropTypes.number,
	  slideAnimations: _react2.default.PropTypes.bool,
	  slideAnimationDirection: _react2.default.PropTypes.string,
	  showPrev: _react2.default.PropTypes.bool,
	  showNext: _react2.default.PropTypes.bool,
	  onPrev: _react2.default.PropTypes.func,
	  onNext: _react2.default.PropTypes.func,
	  onClose: _react2.default.PropTypes.func,
	  classNamePrefix: _react2.default.PropTypes.string,
	  slideTransitionEnterTimeout: _react2.default.PropTypes.number,
	  slideTransitionLeaveTimeout: _react2.default.PropTypes.number
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SimpleSlide = function (_Component) {
	  _inherits(SimpleSlide, _Component);
	
	  function SimpleSlide() {
	    _classCallCheck(this, SimpleSlide);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleSlide).apply(this, arguments));
	  }
	
	  _createClass(SimpleSlide, [{
	    key: 'render',
	    value: function render() {
	      var prev = this.props.showPrev ? _react2.default.createElement(
	        'a',
	        {
	          className: this.props.classNamePrefix + '__controls--prev',
	          onClick: this.props.onPrev
	        },
	        'Previous'
	      ) : null;
	
	      var next = this.props.showNext ? _react2.default.createElement(
	        'a',
	        {
	          className: this.props.classNamePrefix + '__controls--next',
	          onClick: this.props.onNext
	        },
	        'Next'
	      ) : null;
	
	      return _react2.default.createElement(
	        'div',
	        { className: this.props.classNamePrefix + '__slide' },
	        _react2.default.createElement(
	          'div',
	          { className: this.props.classNamePrefix + '__media' },
	          this.props.slide.media,
	          _react2.default.createElement(
	            'div',
	            { className: this.props.classNamePrefix + '__controls' },
	            prev,
	            next
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: this.props.classNamePrefix + '__content' },
	          this.props.slide.content
	        )
	      );
	    }
	  }]);
	
	  return SimpleSlide;
	}(_react.Component);
	
	exports.default = SimpleSlide;
	
	
	SimpleSlide.propTypes = {
	  slide: _react2.default.PropTypes.object,
	  showPrev: _react2.default.PropTypes.bool,
	  showNext: _react2.default.PropTypes.bool,
	  onPrev: _react2.default.PropTypes.func,
	  onNext: _react2.default.PropTypes.func,
	  onClose: _react2.default.PropTypes.func,
	  classNamePrefix: _react2.default.PropTypes.string
	};

/***/ }
/******/ ]);
//# sourceMappingURL=SimpleModalSlideshow.js.map