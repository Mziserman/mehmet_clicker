/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*! p5.js v0.5.4 October 01, 2016 */
 !function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.p5=a()}}(function(){var define,module,exports;return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){},{}],2:[function(a,b,c){"use strict";c.argument=function(a,b){if(!a)throw new Error(b)},c.assert=c.argument},{}],3:[function(a,b,c){"use strict";function d(a,b,c,d,e){a.beginPath(),a.moveTo(b,c),a.lineTo(d,e),a.stroke()}c.line=d},{}],4:[function(a,b,c){"use strict";function d(a){this.font=a}function e(a){this.cmap=a}function f(a,b){this.encoding=a,this.charset=b}function g(a){var b;switch(a.version){case 1:this.names=c.standardNames.slice();break;case 2:for(this.names=new Array(a.numberOfGlyphs),b=0;b<a.numberOfGlyphs;b++)a.glyphNameIndex[b]<c.standardNames.length?this.names[b]=c.standardNames[a.glyphNameIndex[b]]:this.names[b]=a.names[a.glyphNameIndex[b]-c.standardNames.length];break;case 2.5:for(this.names=new Array(a.numberOfGlyphs),b=0;b<a.numberOfGlyphs;b++)this.names[b]=c.standardNames[b+a.glyphNameIndex[b]];break;case 3:this.names=[]}}function h(a){for(var b,c=a.tables.cmap.glyphIndexMap,d=Object.keys(c),e=0;e<d.length;e+=1){var f=d[e],g=c[f];b=a.glyphs.get(g),b.addUnicode(parseInt(f))}for(e=0;e<a.glyphs.length;e+=1)b=a.glyphs.get(e),a.cffEncoding?b.name=a.cffEncoding.charset[e]:b.name=a.glyphNames.glyphIndexToName(e)}var i=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","266 ff","onedotenleader","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall","001.000","001.001","001.002","001.003","Black","Bold","Book","Light","Medium","Regular","Roman","Semibold"],j=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","","endash","dagger","daggerdbl","periodcentered","","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","","questiondown","","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","","ring","cedilla","","hungarumlaut","ogonek","caron","emdash","","","","","","","","","","","","","","","","","AE","","ordfeminine","","","","","Lslash","Oslash","OE","ordmasculine","","","","","","ae","","","","dotlessi","","","lslash","oslash","oe","germandbls"],k=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","","asuperior","bsuperior","centsuperior","dsuperior","esuperior","","","isuperior","","","lsuperior","msuperior","nsuperior","osuperior","","","rsuperior","ssuperior","tsuperior","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdownsmall","centoldstyle","Lslashsmall","","","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","","Dotaccentsmall","","","Macronsmall","","","figuredash","hypheninferior","","","Ogoneksmall","Ringsmall","Cedillasmall","","","","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],l=[".notdef",".null","nonmarkingreturn","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","nonbreakingspace","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron","Lslash","lslash","Scaron","scaron","Zcaron","zcaron","brokenbar","Eth","eth","Yacute","yacute","Thorn","thorn","minus","multiply","onesuperior","twosuperior","threesuperior","onehalf","onequarter","threequarters","franc","Gbreve","gbreve","Idotaccent","Scedilla","scedilla","Cacute","cacute","Ccaron","ccaron","dcroat"];d.prototype.charToGlyphIndex=function(a){var b=a.charCodeAt(0),c=this.font.glyphs;if(!c)return null;for(var d=0;d<c.length;d+=1)for(var e=c.get(d),f=0;f<e.unicodes.length;f+=1)if(e.unicodes[f]===b)return d},e.prototype.charToGlyphIndex=function(a){return this.cmap.glyphIndexMap[a.charCodeAt(0)]||0},f.prototype.charToGlyphIndex=function(a){var b=a.charCodeAt(0),c=this.encoding[b];return this.charset.indexOf(c)},g.prototype.nameToGlyphIndex=function(a){return this.names.indexOf(a)},g.prototype.glyphIndexToName=function(a){return this.names[a]},c.cffStandardStrings=i,c.cffStandardEncoding=j,c.cffExpertEncoding=k,c.standardNames=l,c.DefaultEncoding=d,c.CmapEncoding=e,c.CffEncoding=f,c.GlyphNames=g,c.addGlyphNames=h},{}],5:[function(a,b,c){"use strict";function d(a){a=a||{},this.familyName=a.familyName||" ",this.styleName=a.styleName||" ",this.designer=a.designer||" ",this.designerURL=a.designerURL||" ",this.manufacturer=a.manufacturer||" ",this.manufacturerURL=a.manufacturerURL||" ",this.license=a.license||" ",this.licenseURL=a.licenseURL||" ",this.version=a.version||"Version 0.1",this.description=a.description||" ",this.copyright=a.copyright||" ",this.trademark=a.trademark||" ",this.unitsPerEm=a.unitsPerEm||1e3,this.ascender=a.ascender,this.descender=a.descender,this.supported=!0,this.glyphs=new h.GlyphSet(this,a.glyphs||[]),this.encoding=new g.DefaultEncoding(this),this.tables={}}var e=a("./path"),f=a("./tables/sfnt"),g=a("./encoding"),h=a("./glyphset");d.prototype.hasChar=function(a){return null!==this.encoding.charToGlyphIndex(a)},d.prototype.charToGlyphIndex=function(a){return this.encoding.charToGlyphIndex(a)},d.prototype.charToGlyph=function(a){var b=this.charToGlyphIndex(a),c=this.glyphs.get(b);return c||(c=this.glyphs.get(0)),c},d.prototype.stringToGlyphs=function(a){for(var b=[],c=0;c<a.length;c+=1){var d=a[c];b.push(this.charToGlyph(d))}return b},d.prototype.nameToGlyphIndex=function(a){return this.glyphNames.nameToGlyphIndex(a)},d.prototype.nameToGlyph=function(a){var b=this.nametoGlyphIndex(a),c=this.glyphs.get(b);return c||(c=this.glyphs.get(0)),c},d.prototype.glyphIndexToName=function(a){return this.glyphNames.glyphIndexToName?this.glyphNames.glyphIndexToName(a):""},d.prototype.getKerningValue=function(a,b){a=a.index||a,b=b.index||b;var c=this.getGposKerningValue;return c?c(a,b):this.kerningPairs[a+","+b]||0},d.prototype.forEachGlyph=function(a,b,c,d,e,f){if(this.supported){b=void 0!==b?b:0,c=void 0!==c?c:0,d=void 0!==d?d:72,e=e||{};for(var g=void 0===e.kerning?!0:e.kerning,h=1/this.unitsPerEm*d,i=this.stringToGlyphs(a),j=0;j<i.length;j+=1){var k=i[j];if(f(k,b,c,d,e),k.advanceWidth&&(b+=k.advanceWidth*h),g&&j<i.length-1){var l=this.getKerningValue(k,i[j+1]);b+=l*h}}}},d.prototype.getPath=function(a,b,c,d,f){var g=new e.Path;return this.forEachGlyph(a,b,c,d,f,function(a,b,c,d){var e=a.getPath(b,c,d);g.extend(e)}),g},d.prototype.draw=function(a,b,c,d,e,f){this.getPath(b,c,d,e,f).draw(a)},d.prototype.drawPoints=function(a,b,c,d,e,f){this.forEachGlyph(b,c,d,e,f,function(b,c,d,e){b.drawPoints(a,c,d,e)})},d.prototype.drawMetrics=function(a,b,c,d,e,f){this.forEachGlyph(b,c,d,e,f,function(b,c,d,e){b.drawMetrics(a,c,d,e)})},d.prototype.validate=function(){function a(a,b){a||c.push(b)}function b(b){a(d[b]&&d[b].trim().length>0,"No "+b+" specified.")}var c=[],d=this;b("familyName"),b("weightName"),b("manufacturer"),b("copyright"),b("version"),a(this.unitsPerEm>0,"No unitsPerEm specified.")},d.prototype.toTables=function(){return f.fontToTable(this)},d.prototype.toBuffer=function(){for(var a=this.toTables(),b=a.encode(),c=new ArrayBuffer(b.length),d=new Uint8Array(c),e=0;e<b.length;e++)d[e]=b[e];return c},d.prototype.download=function(){var a=this.familyName.replace(/\s/g,"")+"-"+this.styleName+".otf",b=this.toBuffer();window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem,window.requestFileSystem(window.TEMPORARY,b.byteLength,function(c){c.root.getFile(a,{create:!0},function(a){a.createWriter(function(c){var d=new DataView(b),e=new Blob([d],{type:"font/opentype"});c.write(e),c.addEventListener("writeend",function(){location.href=a.toURL()},!1)})})},function(a){throw a})},c.Font=d},{"./encoding":4,"./glyphset":7,"./path":10,"./tables/sfnt":25}],6:[function(a,b,c){"use strict";function d(a,b){var c=b||{commands:[]};return{configurable:!0,get:function(){return"function"==typeof c&&(c=c()),c},set:function(a){c=a}}}function e(a){this.bindConstructorValues(a)}var f=a("./check"),g=a("./draw"),h=a("./path");e.prototype.bindConstructorValues=function(a){this.index=a.index||0,this.name=a.name||null,this.unicode=a.unicode||void 0,this.unicodes=a.unicodes||void 0!==a.unicode?[a.unicode]:[],a.xMin&&(this.xMin=a.xMin),a.yMin&&(this.yMin=a.yMin),a.xMax&&(this.xMax=a.xMax),a.yMax&&(this.yMax=a.yMax),a.advanceWidth&&(this.advanceWidth=a.advanceWidth),Object.defineProperty(this,"path",d(this,a.path))},e.prototype.addUnicode=function(a){0===this.unicodes.length&&(this.unicode=a),this.unicodes.push(a)},e.prototype.getPath=function(a,b,c){a=void 0!==a?a:0,b=void 0!==b?b:0,c=void 0!==c?c:72;for(var d=1/this.path.unitsPerEm*c,e=new h.Path,f=this.path.commands,g=0;g<f.length;g+=1){var i=f[g];"M"===i.type?e.moveTo(a+i.x*d,b+-i.y*d):"L"===i.type?e.lineTo(a+i.x*d,b+-i.y*d):"Q"===i.type?e.quadraticCurveTo(a+i.x1*d,b+-i.y1*d,a+i.x*d,b+-i.y*d):"C"===i.type?e.curveTo(a+i.x1*d,b+-i.y1*d,a+i.x2*d,b+-i.y2*d,a+i.x*d,b+-i.y*d):"Z"===i.type&&e.closePath()}return e},e.prototype.getContours=function(){if(void 0===this.points)return[];for(var a=[],b=[],c=0;c<this.points.length;c+=1){var d=this.points[c];b.push(d),d.lastPointOfContour&&(a.push(b),b=[])}return f.argument(0===b.length,"There are still points left in the current contour."),a},e.prototype.getMetrics=function(){for(var a=this.path.commands,b=[],c=[],d=0;d<a.length;d+=1){var e=a[d];"Z"!==e.type&&(b.push(e.x),c.push(e.y)),("Q"===e.type||"C"===e.type)&&(b.push(e.x1),c.push(e.y1)),"C"===e.type&&(b.push(e.x2),c.push(e.y2))}var f={xMin:Math.min.apply(null,b),yMin:Math.min.apply(null,c),xMax:Math.max.apply(null,b),yMax:Math.max.apply(null,c),leftSideBearing:0};return f.rightSideBearing=this.advanceWidth-f.leftSideBearing-(f.xMax-f.xMin),f},e.prototype.draw=function(a,b,c,d){this.getPath(b,c,d).draw(a)},e.prototype.drawPoints=function(a,b,c,d){function e(b,c,d,e){var f=2*Math.PI;a.beginPath();for(var g=0;g<b.length;g+=1)a.moveTo(c+b[g].x*e,d+b[g].y*e),a.arc(c+b[g].x*e,d+b[g].y*e,2,0,f,!1);a.closePath(),a.fill()}b=void 0!==b?b:0,c=void 0!==c?c:0,d=void 0!==d?d:24;for(var f=1/this.path.unitsPerEm*d,g=[],h=[],i=this.path,j=0;j<i.commands.length;j+=1){var k=i.commands[j];void 0!==k.x&&g.push({x:k.x,y:-k.y}),void 0!==k.x1&&h.push({x:k.x1,y:-k.y1}),void 0!==k.x2&&h.push({x:k.x2,y:-k.y2})}a.fillStyle="blue",e(g,b,c,f),a.fillStyle="red",e(h,b,c,f)},e.prototype.drawMetrics=function(a,b,c,d){var e;b=void 0!==b?b:0,c=void 0!==c?c:0,d=void 0!==d?d:24,e=1/this.path.unitsPerEm*d,a.lineWidth=1,a.strokeStyle="black",g.line(a,b,-1e4,b,1e4),g.line(a,-1e4,c,1e4,c);var f=this.xMin||0,h=this.yMin||0,i=this.xMax||0,j=this.yMax||0,k=this.advanceWidth||0;a.strokeStyle="blue",g.line(a,b+f*e,-1e4,b+f*e,1e4),g.line(a,b+i*e,-1e4,b+i*e,1e4),g.line(a,-1e4,c+-h*e,1e4,c+-h*e),g.line(a,-1e4,c+-j*e,1e4,c+-j*e),a.strokeStyle="green",g.line(a,b+k*e,-1e4,b+k*e,1e4)},c.Glyph=e},{"./check":2,"./draw":3,"./path":10}],7:[function(a,b,c){"use strict";function d(a,b){if(this.font=a,this.glyphs={},Array.isArray(b))for(var c=0;c<b.length;c++)this.glyphs[c]=b[c];this.length=b&&b.length||0}function e(a,b){return new h.Glyph({index:b,font:a})}function f(a,b,c,d,e,f){return function(){var g=new h.Glyph({index:b,font:a});return g.path=function(){c(g,d,e);var b=f(a.glyphs,g);return b.unitsPerEm=a.unitsPerEm,b},g}}function g(a,b,c,d){return function(){var e=new h.Glyph({index:b,font:a});return e.path=function(){var b=c(a,e,d);return b.unitsPerEm=a.unitsPerEm,b},e}}var h=a("./glyph");d.prototype.get=function(a){return"function"==typeof this.glyphs[a]&&(this.glyphs[a]=this.glyphs[a]()),this.glyphs[a]},d.prototype.push=function(a,b){this.glyphs[a]=b,this.length++},c.GlyphSet=d,c.glyphLoader=e,c.ttfGlyphLoader=f,c.cffGlyphLoader=g},{"./glyph":6}],8:[function(a,b,c){"use strict";function d(a){for(var b=new ArrayBuffer(a.length),c=new Uint8Array(b),d=0;d<a.length;d+=1)c[d]=a[d];return b}function e(b,c){var e=a("fs");e.readFile(b,function(a,b){return a?c(a.message):void c(null,d(b))})}function f(a,b){var c=new XMLHttpRequest;c.open("get",a,!0),c.responseType="arraybuffer",c.onload=function(){return 200!==c.status?b("Font could not be loaded: "+c.statusText):b(null,c.response)},c.send()}function g(a){var b,c,d,e,f,g,h,k=new j.Font,m=new DataView(a,0),A=l.getFixed(m,0);if(1===A)k.outlinesFormat="truetype";else{if(A=l.getTag(m,0),"OTTO"!==A)throw new Error("Unsupported OpenType version "+A);k.outlinesFormat="cff"}for(var B=l.getUShort(m,4),C=12,D=0;B>D;D+=1){var E=l.getTag(m,C),F=l.getULong(m,C+8);switch(E){case"cmap":k.tables.cmap=n.parse(m,F),k.encoding=new i.CmapEncoding(k.tables.cmap),k.encoding||(k.supported=!1);break;case"head":k.tables.head=r.parse(m,F),k.unitsPerEm=k.tables.head.unitsPerEm,b=k.tables.head.indexToLocFormat;break;case"hhea":k.tables.hhea=s.parse(m,F),k.ascender=k.tables.hhea.ascender,k.descender=k.tables.hhea.descender,k.numberOfHMetrics=k.tables.hhea.numberOfHMetrics;break;case"hmtx":c=F;break;case"maxp":k.tables.maxp=w.parse(m,F),k.numGlyphs=k.tables.maxp.numGlyphs;break;case"name":k.tables.name=x.parse(m,F),k.familyName=k.tables.name.fontFamily,k.styleName=k.tables.name.fontSubfamily;break;case"OS/2":k.tables.os2=y.parse(m,F);break;case"post":k.tables.post=z.parse(m,F),k.glyphNames=new i.GlyphNames(k.tables.post);break;case"glyf":d=F;break;case"loca":e=F;break;case"CFF ":f=F;break;case"kern":g=F;break;case"GPOS":h=F}C+=16}if(d&&e){var G=0===b,H=v.parse(m,e,k.numGlyphs,G);k.glyphs=p.parse(m,d,H,k),t.parse(m,c,k.numberOfHMetrics,k.numGlyphs,k.glyphs),i.addGlyphNames(k)}else f?(o.parse(m,f,k),i.addGlyphNames(k)):k.supported=!1;return k.supported&&(g?k.kerningPairs=u.parse(m,g):k.kerningPairs={},h&&q.parse(m,h,k)),k}function h(a,b){var c="undefined"==typeof window,d=c?e:f;d(a,function(a,c){if(a)return b(a);var d=g(c);return d.supported?b(null,d):b("Font is not supported (is this a Postscript font?)")})}var i=a("./encoding"),j=a("./font"),k=a("./glyph"),l=a("./parse"),m=a("./path"),n=a("./tables/cmap"),o=a("./tables/cff"),p=a("./tables/glyf"),q=a("./tables/gpos"),r=a("./tables/head"),s=a("./tables/hhea"),t=a("./tables/hmtx"),u=a("./tables/kern"),v=a("./tables/loca"),w=a("./tables/maxp"),x=a("./tables/name"),y=a("./tables/os2"),z=a("./tables/post");c._parse=l,c.Font=j.Font,c.Glyph=k.Glyph,c.Path=m.Path,c.parse=g,c.load=h},{"./encoding":4,"./font":5,"./glyph":6,"./parse":9,"./path":10,"./tables/cff":12,"./tables/cmap":13,"./tables/glyf":14,"./tables/gpos":15,"./tables/head":16,"./tables/hhea":17,"./tables/hmtx":18,"./tables/kern":19,"./tables/loca":20,"./tables/maxp":21,"./tables/name":22,"./tables/os2":23,"./tables/post":24,fs:1}],9:[function(a,b,c){"use strict";function d(a,b){this.data=a,this.offset=b,this.relativeOffset=0}c.getByte=function(a,b){return a.getUint8(b)},c.getCard8=c.getByte,c.getUShort=function(a,b){return a.getUint16(b,!1)},c.getCard16=c.getUShort,c.getShort=function(a,b){return a.getInt16(b,!1)},c.getULong=function(a,b){return a.getUint32(b,!1)},c.getFixed=function(a,b){var c=a.getInt16(b,!1),d=a.getUint16(b+2,!1);return c+d/65535},c.getTag=function(a,b){for(var c="",d=b;b+4>d;d+=1)c+=String.fromCharCode(a.getInt8(d));return c},c.getOffset=function(a,b,c){for(var d=0,e=0;c>e;e+=1)d<<=8,d+=a.getUint8(b+e);return d},c.getBytes=function(a,b,c){for(var d=[],e=b;c>e;e+=1)d.push(a.getUint8(e));return d},c.bytesToString=function(a){for(var b="",c=0;c<a.length;c+=1)b+=String.fromCharCode(a[c]);return b};var e={"byte":1,uShort:2,"short":2,uLong:4,fixed:4,longDateTime:8,tag:4};d.prototype.parseByte=function(){var a=this.data.getUint8(this.offset+this.relativeOffset);return this.relativeOffset+=1,a},d.prototype.parseChar=function(){var a=this.data.getInt8(this.offset+this.relativeOffset);return this.relativeOffset+=1,a},d.prototype.parseCard8=d.prototype.parseByte,d.prototype.parseUShort=function(){var a=this.data.getUint16(this.offset+this.relativeOffset);return this.relativeOffset+=2,a},d.prototype.parseCard16=d.prototype.parseUShort,d.prototype.parseSID=d.prototype.parseUShort,d.prototype.parseOffset16=d.prototype.parseUShort,d.prototype.parseShort=function(){var a=this.data.getInt16(this.offset+this.relativeOffset);return this.relativeOffset+=2,a},d.prototype.parseF2Dot14=function(){var a=this.data.getInt16(this.offset+this.relativeOffset)/16384;return this.relativeOffset+=2,a},d.prototype.parseULong=function(){var a=c.getULong(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,a},d.prototype.parseFixed=function(){var a=c.getFixed(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,a},d.prototype.parseOffset16List=d.prototype.parseUShortList=function(a){for(var b=new Array(a),d=this.data,e=this.offset+this.relativeOffset,f=0;a>f;f++)b[f]=c.getUShort(d,e),e+=2;return this.relativeOffset+=2*a,b},d.prototype.parseString=function(a){var b=this.data,c=this.offset+this.relativeOffset,d="";this.relativeOffset+=a;for(var e=0;a>e;e++)d+=String.fromCharCode(b.getUint8(c+e));return d},d.prototype.parseTag=function(){return this.parseString(4)},d.prototype.parseLongDateTime=function(){var a=c.getULong(this.data,this.offset+this.relativeOffset+4);return this.relativeOffset+=8,a},d.prototype.parseFixed=function(){var a=c.getULong(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,a/65536},d.prototype.parseVersion=function(){var a=c.getUShort(this.data,this.offset+this.relativeOffset),b=c.getUShort(this.data,this.offset+this.relativeOffset+2);return this.relativeOffset+=4,a+b/4096/10},d.prototype.skip=function(a,b){void 0===b&&(b=1),this.relativeOffset+=e[a]*b},c.Parser=d},{}],10:[function(a,b,c){"use strict";function d(){this.commands=[],this.fill="black",this.stroke=null,this.strokeWidth=1}d.prototype.moveTo=function(a,b){this.commands.push({type:"M",x:a,y:b})},d.prototype.lineTo=function(a,b){this.commands.push({type:"L",x:a,y:b})},d.prototype.curveTo=d.prototype.bezierCurveTo=function(a,b,c,d,e,f){this.commands.push({type:"C",x1:a,y1:b,x2:c,y2:d,x:e,y:f})},d.prototype.quadTo=d.prototype.quadraticCurveTo=function(a,b,c,d){this.commands.push({type:"Q",x1:a,y1:b,x:c,y:d})},d.prototype.close=d.prototype.closePath=function(){this.commands.push({type:"Z"})},d.prototype.extend=function(a){a.commands&&(a=a.commands),Array.prototype.push.apply(this.commands,a)},d.prototype.draw=function(a){a.beginPath();for(var b=0;b<this.commands.length;b+=1){var c=this.commands[b];"M"===c.type?a.moveTo(c.x,c.y):"L"===c.type?a.lineTo(c.x,c.y):"C"===c.type?a.bezierCurveTo(c.x1,c.y1,c.x2,c.y2,c.x,c.y):"Q"===c.type?a.quadraticCurveTo(c.x1,c.y1,c.x,c.y):"Z"===c.type&&a.closePath()}this.fill&&(a.fillStyle=this.fill,a.fill()),this.stroke&&(a.strokeStyle=this.stroke,a.lineWidth=this.strokeWidth,a.stroke())},d.prototype.toPathData=function(a){function b(b){return Math.round(b)===b?""+Math.round(b):b.toFixed(a)}function c(){for(var a="",c=0;c<arguments.length;c+=1){var d=arguments[c];d>=0&&c>0&&(a+=" "),a+=b(d)}return a}a=void 0!==a?a:2;for(var d="",e=0;e<this.commands.length;e+=1){var f=this.commands[e];"M"===f.type?d+="M"+c(f.x,f.y):"L"===f.type?d+="L"+c(f.x,f.y):"C"===f.type?d+="C"+c(f.x1,f.y1,f.x2,f.y2,f.x,f.y):"Q"===f.type?d+="Q"+c(f.x1,f.y1,f.x,f.y):"Z"===f.type&&(d+="Z")}return d},d.prototype.toSVG=function(a){var b='<path d="';return b+=this.toPathData(a),b+='"',this.fill&"black"!==this.fill&&(b+=null===this.fill?' fill="none"':' fill="'+this.fill+'"'),this.stroke&&(b+=' stroke="'+this.stroke+'" stroke-width="'+this.strokeWidth+'"'),b+="/>"},c.Path=d},{}],11:[function(a,b,c){"use strict";function d(a,b,c){var d;for(d=0;d<b.length;d+=1){var e=b[d];this[e.name]=e.value}if(this.tableName=a,this.fields=b,c){var f=Object.keys(c);for(d=0;d<f.length;d+=1){var g=f[d],h=c[g];void 0!==this[g]&&(this[g]=h)}}}var e=a("./check"),f=a("./types").encode,g=a("./types").sizeOf;d.prototype.sizeOf=function(){for(var a=0,b=0;b<this.fields.length;b+=1){var c=this.fields[b],d=this[c.name];if(void 0===d&&(d=c.value),"function"==typeof d.sizeOf)a+=d.sizeOf();else{var f=g[c.type];e.assert("function"==typeof f,"Could not find sizeOf function for field"+c.name),a+=f(d)}}return a},d.prototype.encode=function(){return f.TABLE(this)},c.Table=d},{"./check":2,"./types":26}],12:[function(a,b,c){"use strict";function d(a,b){if(a===b)return!0;if(Array.isArray(a)&&Array.isArray(b)){if(a.length!==b.length)return!1;for(var c=0;c<a.length;c+=1)if(!d(a[c],b[c]))return!1;return!0}return!1}function e(a,b,c){var d,e,f,g=[],h=[],i=J.getCard16(a,b);if(0!==i){var j=J.getByte(a,b+2);e=b+(i+1)*j+2;var k=b+3;for(d=0;i+1>d;d+=1)g.push(J.getOffset(a,k,j)),k+=j;f=e+g[i]}else f=b+2;for(d=0;d<g.length-1;d+=1){var l=J.getBytes(a,e+g[d],e+g[d+1]);c&&(l=c(l)),h.push(l)}return{objects:h,startOffset:b,endOffset:f}}function f(a){for(var b="",c=15,d=["0","1","2","3","4","5","6","7","8","9",".","E","E-",null,"-"];;){var e=a.parseByte(),f=e>>4,g=15&e;if(f===c)break;if(b+=d[f],g===c)break;b+=d[g]}return parseFloat(b)}function g(a,b){var c,d,e,g;if(28===b)return c=a.parseByte(),d=a.parseByte(),c<<8|d;if(29===b)return c=a.parseByte(),d=a.parseByte(),e=a.parseByte(),g=a.parseByte(),c<<24|d<<16|e<<8|g;if(30===b)return f(a);if(b>=32&&246>=b)return b-139;if(b>=247&&250>=b)return c=a.parseByte(),256*(b-247)+c+108;if(b>=251&&254>=b)return c=a.parseByte(),256*-(b-251)-c-108;throw new Error("Invalid b0 "+b)}function h(a){for(var b={},c=0;c<a.length;c+=1){var d,e=a[c][0],f=a[c][1];if(d=1===f.length?f[0]:f,b.hasOwnProperty(e))throw new Error("Object "+b+" already has key "+e);b[e]=d}return b}function i(a,b,c){b=void 0!==b?b:0;var d=new J.Parser(a,b),e=[],f=[];for(c=void 0!==c?c:a.length;d.relativeOffset<c;){var i=d.parseByte();21>=i?(12===i&&(i=1200+d.parseByte()),e.push([i,f]),f=[]):f.push(g(d,i))}return h(e)}function j(a,b){return b=390>=b?H.cffStandardStrings[b]:a[b-391]}function k(a,b,c){for(var d={},e=0;e<b.length;e+=1){var f=b[e],g=a[f.op];void 0===g&&(g=void 0!==f.value?f.value:null),"SID"===f.type&&(g=j(c,g)),d[f.name]=g}return d}function l(a,b){var c={};return c.formatMajor=J.getCard8(a,b),c.formatMinor=J.getCard8(a,b+1),c.size=J.getCard8(a,b+2),c.offsetSize=J.getCard8(a,b+3),c.startOffset=b,c.endOffset=b+4,c}function m(a,b){var c=i(a,0,a.byteLength);return k(c,M,b)}function n(a,b,c,d){var e=i(a,b,c);return k(e,N,d)}function o(a,b,c,d){var e,f,g,h=new J.Parser(a,b);c-=1;var i=[".notdef"],k=h.parseCard8();if(0===k)for(e=0;c>e;e+=1)f=h.parseSID(),i.push(j(d,f));else if(1===k)for(;i.length<=c;)for(f=h.parseSID(),g=h.parseCard8(),e=0;g>=e;e+=1)i.push(j(d,f)),f+=1;else{if(2!==k)throw new Error("Unknown charset format "+k);for(;i.length<=c;)for(f=h.parseSID(),g=h.parseCard16(),e=0;g>=e;e+=1)i.push(j(d,f)),f+=1}return i}function p(a,b,c){var d,e,f={},g=new J.Parser(a,b),h=g.parseCard8();if(0===h){var i=g.parseCard8();for(d=0;i>d;d+=1)e=g.parseCard8(),f[e]=d}else{if(1!==h)throw new Error("Unknown encoding format "+h);var j=g.parseCard8();for(e=1,d=0;j>d;d+=1)for(var k=g.parseCard8(),l=g.parseCard8(),m=k;k+l>=m;m+=1)f[m]=e,e+=1}return new H.CffEncoding(f,c)}function q(a,b,c){function d(a,b){p&&k.closePath(),k.moveTo(a,b),p=!0}function e(){
var b;b=l.length%2!==0,b&&!n&&(o=l.shift()+a.nominalWidthX),m+=l.length>>1,l.length=0,n=!0}function f(c){for(var s,t,u,v,w,x,y,z,A,B,C,D,E=0;E<c.length;){var F=c[E];switch(E+=1,F){case 1:e();break;case 3:e();break;case 4:l.length>1&&!n&&(o=l.shift()+a.nominalWidthX,n=!0),r+=l.pop(),d(q,r);break;case 5:for(;l.length>0;)q+=l.shift(),r+=l.shift(),k.lineTo(q,r);break;case 6:for(;l.length>0&&(q+=l.shift(),k.lineTo(q,r),0!==l.length);)r+=l.shift(),k.lineTo(q,r);break;case 7:for(;l.length>0&&(r+=l.shift(),k.lineTo(q,r),0!==l.length);)q+=l.shift(),k.lineTo(q,r);break;case 8:for(;l.length>0;)g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+l.shift(),k.curveTo(g,h,i,j,q,r);break;case 10:w=l.pop()+a.subrsBias,x=a.subrs[w],x&&f(x);break;case 11:return;case 12:switch(F=c[E],E+=1,F){case 35:g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),y=i+l.shift(),z=j+l.shift(),A=y+l.shift(),B=z+l.shift(),C=A+l.shift(),D=B+l.shift(),q=C+l.shift(),r=D+l.shift(),l.shift(),k.curveTo(g,h,i,j,y,z),k.curveTo(A,B,C,D,q,r);break;case 34:g=q+l.shift(),h=r,i=g+l.shift(),j=h+l.shift(),y=i+l.shift(),z=j,A=y+l.shift(),B=j,C=A+l.shift(),D=r,q=C+l.shift(),k.curveTo(g,h,i,j,y,z),k.curveTo(A,B,C,D,q,r);break;case 36:g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),y=i+l.shift(),z=j,A=y+l.shift(),B=j,C=A+l.shift(),D=B+l.shift(),q=C+l.shift(),k.curveTo(g,h,i,j,y,z),k.curveTo(A,B,C,D,q,r);break;case 37:g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),y=i+l.shift(),z=j+l.shift(),A=y+l.shift(),B=z+l.shift(),C=A+l.shift(),D=B+l.shift(),Math.abs(C-q)>Math.abs(D-r)?q=C+l.shift():r=D+l.shift(),k.curveTo(g,h,i,j,y,z),k.curveTo(A,B,C,D,q,r);break;default:console.log("Glyph "+b.index+": unknown operator 1200"+F),l.length=0}break;case 14:l.length>0&&!n&&(o=l.shift()+a.nominalWidthX,n=!0),p&&(k.closePath(),p=!1);break;case 18:e();break;case 19:case 20:e(),E+=m+7>>3;break;case 21:l.length>2&&!n&&(o=l.shift()+a.nominalWidthX,n=!0),r+=l.pop(),q+=l.pop(),d(q,r);break;case 22:l.length>1&&!n&&(o=l.shift()+a.nominalWidthX,n=!0),q+=l.pop(),d(q,r);break;case 23:e();break;case 24:for(;l.length>2;)g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+l.shift(),k.curveTo(g,h,i,j,q,r);q+=l.shift(),r+=l.shift(),k.lineTo(q,r);break;case 25:for(;l.length>6;)q+=l.shift(),r+=l.shift(),k.lineTo(q,r);g=q+l.shift(),h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+l.shift(),k.curveTo(g,h,i,j,q,r);break;case 26:for(l.length%2&&(q+=l.shift());l.length>0;)g=q,h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i,r=j+l.shift(),k.curveTo(g,h,i,j,q,r);break;case 27:for(l.length%2&&(r+=l.shift());l.length>0;)g=q+l.shift(),h=r,i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j,k.curveTo(g,h,i,j,q,r);break;case 28:s=c[E],t=c[E+1],l.push((s<<24|t<<16)>>16),E+=2;break;case 29:w=l.pop()+a.gsubrsBias,x=a.gsubrs[w],x&&f(x);break;case 30:for(;l.length>0&&(g=q,h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+(1===l.length?l.shift():0),k.curveTo(g,h,i,j,q,r),0!==l.length);)g=q+l.shift(),h=r,i=g+l.shift(),j=h+l.shift(),r=j+l.shift(),q=i+(1===l.length?l.shift():0),k.curveTo(g,h,i,j,q,r);break;case 31:for(;l.length>0&&(g=q+l.shift(),h=r,i=g+l.shift(),j=h+l.shift(),r=j+l.shift(),q=i+(1===l.length?l.shift():0),k.curveTo(g,h,i,j,q,r),0!==l.length);)g=q,h=r+l.shift(),i=g+l.shift(),j=h+l.shift(),q=i+l.shift(),r=j+(1===l.length?l.shift():0),k.curveTo(g,h,i,j,q,r);break;default:32>F?console.log("Glyph "+b.index+": unknown operator "+F):247>F?l.push(F-139):251>F?(s=c[E],E+=1,l.push(256*(F-247)+s+108)):255>F?(s=c[E],E+=1,l.push(256*-(F-251)-s-108)):(s=c[E],t=c[E+1],u=c[E+2],v=c[E+3],E+=4,l.push((s<<24|t<<16|u<<8|v)/65536))}}}var g,h,i,j,k=new K.Path,l=[],m=0,n=!1,o=a.defaultWidthX,p=!1,q=0,r=0;return f(c),b.advanceWidth=o,k}function r(a){var b;return b=a.length<1240?107:a.length<33900?1131:32768}function s(a,b,c){c.tables.cff={};var d=l(a,b),f=e(a,d.endOffset,J.bytesToString),g=e(a,f.endOffset),h=e(a,g.endOffset,J.bytesToString),i=e(a,h.endOffset);c.gsubrs=i.objects,c.gsubrsBias=r(c.gsubrs);var j=new DataView(new Uint8Array(g.objects[0]).buffer),k=m(j,h.objects);c.tables.cff.topDict=k;var s=b+k["private"][1],t=n(a,s,k["private"][0],h.objects);if(c.defaultWidthX=t.defaultWidthX,c.nominalWidthX=t.nominalWidthX,0!==t.subrs){var u=s+t.subrs,v=e(a,u);c.subrs=v.objects,c.subrsBias=r(c.subrs)}else c.subrs=[],c.subrsBias=0;var w=e(a,b+k.charStrings);c.nGlyphs=w.objects.length;var x=o(a,b+k.charset,c.nGlyphs,h.objects);0===k.encoding?c.cffEncoding=new H.CffEncoding(H.cffStandardEncoding,x):1===k.encoding?c.cffEncoding=new H.CffEncoding(H.cffExpertEncoding,x):c.cffEncoding=p(a,b+k.encoding,x),c.encoding=c.encoding||c.cffEncoding,c.glyphs=new I.GlyphSet(c);for(var y=0;y<c.nGlyphs;y+=1){var z=w.objects[y];c.glyphs.push(y,I.cffGlyphLoader(c,y,q,z))}}function t(a,b){var c,d=H.cffStandardStrings.indexOf(a);return d>=0&&(c=d),d=b.indexOf(a),d>=0?c=d+H.cffStandardStrings.length:(c=H.cffStandardStrings.length+b.length,b.push(a)),c}function u(){return new L.Table("Header",[{name:"major",type:"Card8",value:1},{name:"minor",type:"Card8",value:0},{name:"hdrSize",type:"Card8",value:4},{name:"major",type:"Card8",value:1}])}function v(a){var b=new L.Table("Name INDEX",[{name:"names",type:"INDEX",value:[]}]);b.names=[];for(var c=0;c<a.length;c+=1)b.names.push({name:"name_"+c,type:"NAME",value:a[c]});return b}function w(a,b,c){for(var e={},f=0;f<a.length;f+=1){var g=a[f],h=b[g.name];void 0===h||d(h,g.value)||("SID"===g.type&&(h=t(h,c)),e[g.op]={name:g.name,type:g.type,value:h})}return e}function x(a,b){var c=new L.Table("Top DICT",[{name:"dict",type:"DICT",value:{}}]);return c.dict=w(M,a,b),c}function y(a){var b=new L.Table("Top DICT INDEX",[{name:"topDicts",type:"INDEX",value:[]}]);return b.topDicts=[{name:"topDict_0",type:"TABLE",value:a}],b}function z(a){var b=new L.Table("String INDEX",[{name:"strings",type:"INDEX",value:[]}]);b.strings=[];for(var c=0;c<a.length;c+=1)b.strings.push({name:"string_"+c,type:"STRING",value:a[c]});return b}function A(){return new L.Table("Global Subr INDEX",[{name:"subrs",type:"INDEX",value:[]}])}function B(a,b){for(var c=new L.Table("Charsets",[{name:"format",type:"Card8",value:0}]),d=0;d<a.length;d+=1){var e=a[d],f=t(e,b);c.fields.push({name:"glyph_"+d,type:"SID",value:f})}return c}function C(a){var b=[],c=a.path;b.push({name:"width",type:"NUMBER",value:a.advanceWidth});for(var d=0,e=0,f=0;f<c.commands.length;f+=1){var g,h,i=c.commands[f];if("Q"===i.type){var j=1/3,k=2/3;i={type:"C",x:i.x,y:i.y,x1:j*d+k*i.x1,y1:j*e+k*i.y1,x2:j*i.x+k*i.x1,y2:j*i.y+k*i.y1}}if("M"===i.type)g=Math.round(i.x-d),h=Math.round(i.y-e),b.push({name:"dx",type:"NUMBER",value:g}),b.push({name:"dy",type:"NUMBER",value:h}),b.push({name:"rmoveto",type:"OP",value:21}),d=Math.round(i.x),e=Math.round(i.y);else if("L"===i.type)g=Math.round(i.x-d),h=Math.round(i.y-e),b.push({name:"dx",type:"NUMBER",value:g}),b.push({name:"dy",type:"NUMBER",value:h}),b.push({name:"rlineto",type:"OP",value:5}),d=Math.round(i.x),e=Math.round(i.y);else if("C"===i.type){var l=Math.round(i.x1-d),m=Math.round(i.y1-e),n=Math.round(i.x2-i.x1),o=Math.round(i.y2-i.y1);g=Math.round(i.x-i.x2),h=Math.round(i.y-i.y2),b.push({name:"dx1",type:"NUMBER",value:l}),b.push({name:"dy1",type:"NUMBER",value:m}),b.push({name:"dx2",type:"NUMBER",value:n}),b.push({name:"dy2",type:"NUMBER",value:o}),b.push({name:"dx",type:"NUMBER",value:g}),b.push({name:"dy",type:"NUMBER",value:h}),b.push({name:"rrcurveto",type:"OP",value:8}),d=Math.round(i.x),e=Math.round(i.y)}}return b.push({name:"endchar",type:"OP",value:14}),b}function D(a){for(var b=new L.Table("CharStrings INDEX",[{name:"charStrings",type:"INDEX",value:[]}]),c=0;c<a.length;c+=1){var d=a.get(c),e=C(d);b.charStrings.push({name:d.name,type:"CHARSTRING",value:e})}return b}function E(a,b){var c=new L.Table("Private DICT",[{name:"dict",type:"DICT",value:{}}]);return c.dict=w(N,a,b),c}function F(a){var b=new L.Table("Private DICT INDEX",[{name:"privateDicts",type:"INDEX",value:[]}]);return b.privateDicts=[{name:"privateDict_0",type:"TABLE",value:a}],b}function G(a,b){for(var c,d=new L.Table("CFF ",[{name:"header",type:"TABLE"},{name:"nameIndex",type:"TABLE"},{name:"topDictIndex",type:"TABLE"},{name:"stringIndex",type:"TABLE"},{name:"globalSubrIndex",type:"TABLE"},{name:"charsets",type:"TABLE"},{name:"charStringsIndex",type:"TABLE"},{name:"privateDictIndex",type:"TABLE"}]),e=1/b.unitsPerEm,f={version:b.version,fullName:b.fullName,familyName:b.familyName,weight:b.weightName,fontMatrix:[e,0,0,e,0,0],charset:999,encoding:0,charStrings:999,"private":[0,999]},g={},h=[],i=1;i<a.length;i+=1)c=a.get(i),h.push(c.name);var j=[];d.header=u(),d.nameIndex=v([b.postScriptName]);var k=x(f,j);d.topDictIndex=y(k),d.globalSubrIndex=A(),d.charsets=B(h,j),d.charStringsIndex=D(a);var l=E(g,j);d.privateDictIndex=F(l),d.stringIndex=z(j);var m=d.header.sizeOf()+d.nameIndex.sizeOf()+d.topDictIndex.sizeOf()+d.stringIndex.sizeOf()+d.globalSubrIndex.sizeOf();return f.charset=m,f.encoding=0,f.charStrings=f.charset+d.charsets.sizeOf(),f["private"][1]=f.charStrings+d.charStringsIndex.sizeOf(),k=x(f,j),d.topDictIndex=y(k),d}var H=a("../encoding"),I=a("../glyphset"),J=a("../parse"),K=a("../path"),L=a("../table"),M=[{name:"version",op:0,type:"SID"},{name:"notice",op:1,type:"SID"},{name:"copyright",op:1200,type:"SID"},{name:"fullName",op:2,type:"SID"},{name:"familyName",op:3,type:"SID"},{name:"weight",op:4,type:"SID"},{name:"isFixedPitch",op:1201,type:"number",value:0},{name:"italicAngle",op:1202,type:"number",value:0},{name:"underlinePosition",op:1203,type:"number",value:-100},{name:"underlineThickness",op:1204,type:"number",value:50},{name:"paintType",op:1205,type:"number",value:0},{name:"charstringType",op:1206,type:"number",value:2},{name:"fontMatrix",op:1207,type:["real","real","real","real","real","real"],value:[.001,0,0,.001,0,0]},{name:"uniqueId",op:13,type:"number"},{name:"fontBBox",op:5,type:["number","number","number","number"],value:[0,0,0,0]},{name:"strokeWidth",op:1208,type:"number",value:0},{name:"xuid",op:14,type:[],value:null},{name:"charset",op:15,type:"offset",value:0},{name:"encoding",op:16,type:"offset",value:0},{name:"charStrings",op:17,type:"offset",value:0},{name:"private",op:18,type:["number","offset"],value:[0,0]}],N=[{name:"subrs",op:19,type:"offset",value:0},{name:"defaultWidthX",op:20,type:"number",value:0},{name:"nominalWidthX",op:21,type:"number",value:0}];c.parse=s,c.make=G},{"../encoding":4,"../glyphset":7,"../parse":9,"../path":10,"../table":11}],13:[function(a,b,c){"use strict";function d(a,b){var c,d={};d.version=i.getUShort(a,b),h.argument(0===d.version,"cmap table version should be 0."),d.numTables=i.getUShort(a,b+2);var e=-1;for(c=0;c<d.numTables;c+=1){var f=i.getUShort(a,b+4+8*c),g=i.getUShort(a,b+4+8*c+2);if(3===f&&(1===g||0===g)){e=i.getULong(a,b+4+8*c+4);break}}if(-1===e)return null;var j=new i.Parser(a,b+e);d.format=j.parseUShort(),h.argument(4===d.format,"Only format 4 cmap tables are supported."),d.length=j.parseUShort(),d.language=j.parseUShort();var k;d.segCount=k=j.parseUShort()>>1,j.skip("uShort",3),d.glyphIndexMap={};var l=new i.Parser(a,b+e+14),m=new i.Parser(a,b+e+16+2*k),n=new i.Parser(a,b+e+16+4*k),o=new i.Parser(a,b+e+16+6*k),p=b+e+16+8*k;for(c=0;k-1>c;c+=1)for(var q,r=l.parseUShort(),s=m.parseUShort(),t=n.parseShort(),u=o.parseUShort(),v=s;r>=v;v+=1)0!==u?(p=o.offset+o.relativeOffset-2,p+=u,p+=2*(v-s),q=i.getUShort(a,p),0!==q&&(q=q+t&65535)):q=v+t&65535,d.glyphIndexMap[v]=q;return d}function e(a,b,c){a.segments.push({end:b,start:b,delta:-(b-c),offset:0})}function f(a){a.segments.push({end:65535,start:65535,delta:1,offset:0})}function g(a){var b,c=new j.Table("cmap",[{name:"version",type:"USHORT",value:0},{name:"numTables",type:"USHORT",value:1},{name:"platformID",type:"USHORT",value:3},{name:"encodingID",type:"USHORT",value:1},{name:"offset",type:"ULONG",value:12},{name:"format",type:"USHORT",value:4},{name:"length",type:"USHORT",value:0},{name:"language",type:"USHORT",value:0},{name:"segCountX2",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0}]);for(c.segments=[],b=0;b<a.length;b+=1){for(var d=a.get(b),g=0;g<d.unicodes.length;g+=1)e(c,d.unicodes[g],b);c.segments=c.segments.sort(function(a,b){return a.start-b.start})}f(c);var h;h=c.segments.length,c.segCountX2=2*h,c.searchRange=2*Math.pow(2,Math.floor(Math.log(h)/Math.log(2))),c.entrySelector=Math.log(c.searchRange/2)/Math.log(2),c.rangeShift=c.segCountX2-c.searchRange;var i=[],k=[],l=[],m=[],n=[];for(b=0;h>b;b+=1){var o=c.segments[b];i=i.concat({name:"end_"+b,type:"USHORT",value:o.end}),k=k.concat({name:"start_"+b,type:"USHORT",value:o.start}),l=l.concat({name:"idDelta_"+b,type:"SHORT",value:o.delta}),m=m.concat({name:"idRangeOffset_"+b,type:"USHORT",value:o.offset}),void 0!==o.glyphId&&(n=n.concat({name:"glyph_"+b,type:"USHORT",value:o.glyphId}))}return c.fields=c.fields.concat(i),c.fields.push({name:"reservedPad",type:"USHORT",value:0}),c.fields=c.fields.concat(k),c.fields=c.fields.concat(l),c.fields=c.fields.concat(m),c.fields=c.fields.concat(n),c.length=14+2*i.length+2+2*k.length+2*l.length+2*m.length+2*n.length,c}var h=a("../check"),i=a("../parse"),j=a("../table");c.parse=d,c.make=g},{"../check":2,"../parse":9,"../table":11}],14:[function(a,b,c){"use strict";function d(a,b,c,d,e){var f;return(b&d)>0?(f=a.parseByte(),0===(b&e)&&(f=-f),f=c+f):f=(b&e)>0?c:c+a.parseShort(),f}function e(a,b,c){var e=new m.Parser(b,c);a.numberOfContours=e.parseShort(),a.xMin=e.parseShort(),a.yMin=e.parseShort(),a.xMax=e.parseShort(),a.yMax=e.parseShort();var f,g;if(a.numberOfContours>0){var h,i=a.endPointIndices=[];for(h=0;h<a.numberOfContours;h+=1)i.push(e.parseUShort());for(a.instructionLength=e.parseUShort(),a.instructions=[],h=0;h<a.instructionLength;h+=1)a.instructions.push(e.parseByte());var j=i[i.length-1]+1;for(f=[],h=0;j>h;h+=1)if(g=e.parseByte(),f.push(g),(8&g)>0)for(var l=e.parseByte(),n=0;l>n;n+=1)f.push(g),h+=1;if(k.argument(f.length===j,"Bad flags."),i.length>0){var o,p=[];if(j>0){for(h=0;j>h;h+=1)g=f[h],o={},o.onCurve=!!(1&g),o.lastPointOfContour=i.indexOf(h)>=0,p.push(o);var q=0;for(h=0;j>h;h+=1)g=f[h],o=p[h],o.x=d(e,g,q,2,16),q=o.x;var r=0;for(h=0;j>h;h+=1)g=f[h],o=p[h],o.y=d(e,g,r,4,32),r=o.y}a.points=p}else a.points=[]}else if(0===a.numberOfContours)a.points=[];else{a.isComposite=!0,a.points=[],a.components=[];for(var s=!0;s;){f=e.parseUShort();var t={glyphIndex:e.parseUShort(),xScale:1,scale01:0,scale10:0,yScale:1,dx:0,dy:0};(1&f)>0?(t.dx=e.parseShort(),t.dy=e.parseShort()):(t.dx=e.parseChar(),t.dy=e.parseChar()),(8&f)>0?t.xScale=t.yScale=e.parseF2Dot14():(64&f)>0?(t.xScale=e.parseF2Dot14(),t.yScale=e.parseF2Dot14()):(128&f)>0&&(t.xScale=e.parseF2Dot14(),t.scale01=e.parseF2Dot14(),t.scale10=e.parseF2Dot14(),t.yScale=e.parseF2Dot14()),a.components.push(t),s=!!(32&f)}}}function f(a,b){for(var c=[],d=0;d<a.length;d+=1){var e=a[d],f={x:b.xScale*e.x+b.scale01*e.y+b.dx,y:b.scale10*e.x+b.yScale*e.y+b.dy,onCurve:e.onCurve,lastPointOfContour:e.lastPointOfContour};c.push(f)}return c}function g(a){for(var b=[],c=[],d=0;d<a.length;d+=1){var e=a[d];c.push(e),e.lastPointOfContour&&(b.push(c),c=[])}return k.argument(0===c.length,"There are still points left in the current contour."),b}function h(a){var b=new n.Path;if(!a)return b;for(var c=g(a),d=0;d<c.length;d+=1){var e,f,h=c[d],i=h[0],j=h[h.length-1];i.onCurve?(e=null,f=!0):(i=j.onCurve?j:{x:(i.x+j.x)/2,y:(i.y+j.y)/2},e=i,f=!1),b.moveTo(i.x,i.y);for(var k=f?1:0;k<h.length;k+=1){var l=h[k],m=0===k?i:h[k-1];if(m.onCurve&&l.onCurve)b.lineTo(l.x,l.y);else if(m.onCurve&&!l.onCurve)e=l;else if(m.onCurve||l.onCurve){if(m.onCurve||!l.onCurve)throw new Error("Invalid state.");b.quadraticCurveTo(e.x,e.y,l.x,l.y),e=null}else{var o={x:(m.x+l.x)/2,y:(m.y+l.y)/2};b.quadraticCurveTo(m.x,m.y,o.x,o.y),e=l}}i!==j&&(e?b.quadraticCurveTo(e.x,e.y,i.x,i.y):b.lineTo(i.x,i.y))}return b.closePath(),b}function i(a,b){if(b.isComposite)for(var c=0;c<b.components.length;c+=1){var d=b.components[c],e=a.get(d.glyphIndex);if(e.points){var g=f(e.points,d);b.points=b.points.concat(g)}}return h(b.points)}function j(a,b,c,d){var f,g=new l.GlyphSet(d);for(f=0;f<c.length-1;f+=1){var h=c[f],j=c[f+1];h!==j?g.push(f,l.ttfGlyphLoader(d,f,e,a,b+h,i)):g.push(f,l.glyphLoader(d,f))}return g}var k=a("../check"),l=a("../glyphset"),m=a("../parse"),n=a("../path");c.parse=j},{"../check":2,"../glyphset":7,"../parse":9,"../path":10}],15:[function(a,b,c){"use strict";function d(a,b){for(var c=new k.Parser(a,b),d=c.parseUShort(),e=[],f=0;d>f;f++)e[c.parseTag()]={offset:c.parseUShort()};return e}function e(a,b){var c=new k.Parser(a,b),d=c.parseUShort(),e=c.parseUShort();if(1===d)return c.parseUShortList(e);if(2===d){for(var f=[];e--;)for(var g=c.parseUShort(),h=c.parseUShort(),i=c.parseUShort(),j=g;h>=j;j++)f[i++]=j;return f}}function f(a,b){var c=new k.Parser(a,b),d=c.parseUShort();if(1===d){var e=c.parseUShort(),f=c.parseUShort(),g=c.parseUShortList(f);return function(a){return g[a-e]||0}}if(2===d){for(var h=c.parseUShort(),i=[],j=[],l=[],m=0;h>m;m++)i[m]=c.parseUShort(),j[m]=c.parseUShort(),l[m]=c.parseUShort();return function(a){for(var b=0,c=i.length-1;c>b;){var d=b+c+1>>1;a<i[d]?c=d-1:b=d}return i[b]<=a&&a<=j[b]?l[b]||0:0}}}function g(a,b){var c,d,g=new k.Parser(a,b),h=g.parseUShort(),i=g.parseUShort(),j=e(a,b+i),l=g.parseUShort(),m=g.parseUShort();if(4===l&&0===m){var n={};if(1===h){for(var o=g.parseUShort(),p=[],q=g.parseOffset16List(o),r=0;o>r;r++){var s=q[r],t=n[s];if(!t){t={},g.relativeOffset=s;for(var u=g.parseUShort();u--;){var v=g.parseUShort();l&&(c=g.parseShort()),m&&(d=g.parseShort()),t[v]=c}}p[j[r]]=t}return function(a,b){var c=p[a];return c?c[b]:void 0}}if(2===h){for(var w=g.parseUShort(),x=g.parseUShort(),y=g.parseUShort(),z=g.parseUShort(),A=f(a,b+w),B=f(a,b+x),C=[],D=0;y>D;D++)for(var E=C[D]=[],F=0;z>F;F++)l&&(c=g.parseShort()),m&&(d=g.parseShort()),E[F]=c;var G={};for(D=0;D<j.length;D++)G[j[D]]=1;return function(a,b){if(G[a]){var c=A(a),d=B(b),e=C[c];return e?e[d]:void 0}}}}}function h(a,b){var c=new k.Parser(a,b),d=c.parseUShort(),e=c.parseUShort(),f=16&e,h=c.parseUShort(),i=c.parseOffset16List(h),j={lookupType:d,lookupFlag:e,markFilteringSet:f?c.parseUShort():-1};if(2===d){for(var l=[],m=0;h>m;m++)l.push(g(a,b+i[m]));j.getKerningValue=function(a,b){for(var c=l.length;c--;){var d=l[c](a,b);if(void 0!==d)return d}return 0}}return j}function i(a,b,c){var e=new k.Parser(a,b),f=e.parseFixed();j.argument(1===f,"Unsupported GPOS table version."),d(a,b+e.parseUShort()),d(a,b+e.parseUShort());var g=e.parseUShort();e.relativeOffset=g;for(var i=e.parseUShort(),l=e.parseOffset16List(i),m=b+g,n=0;i>n;n++){var o=h(a,m+l[n]);2!==o.lookupType||c.getGposKerningValue||(c.getGposKerningValue=o.getKerningValue)}}var j=a("../check"),k=a("../parse");c.parse=i},{"../check":2,"../parse":9}],16:[function(a,b,c){"use strict";function d(a,b){var c={},d=new g.Parser(a,b);return c.version=d.parseVersion(),c.fontRevision=Math.round(1e3*d.parseFixed())/1e3,c.checkSumAdjustment=d.parseULong(),c.magicNumber=d.parseULong(),f.argument(1594834165===c.magicNumber,"Font header has wrong magic number."),c.flags=d.parseUShort(),c.unitsPerEm=d.parseUShort(),c.created=d.parseLongDateTime(),c.modified=d.parseLongDateTime(),c.xMin=d.parseShort(),c.yMin=d.parseShort(),c.xMax=d.parseShort(),c.yMax=d.parseShort(),c.macStyle=d.parseUShort(),c.lowestRecPPEM=d.parseUShort(),c.fontDirectionHint=d.parseShort(),c.indexToLocFormat=d.parseShort(),c.glyphDataFormat=d.parseShort(),c}function e(a){return new h.Table("head",[{name:"version",type:"FIXED",value:65536},{name:"fontRevision",type:"FIXED",value:65536},{name:"checkSumAdjustment",type:"ULONG",value:0},{name:"magicNumber",type:"ULONG",value:1594834165},{name:"flags",type:"USHORT",value:0},{name:"unitsPerEm",type:"USHORT",value:1e3},{name:"created",type:"LONGDATETIME",value:0},{name:"modified",type:"LONGDATETIME",value:0},{name:"xMin",type:"SHORT",value:0},{name:"yMin",type:"SHORT",value:0},{name:"xMax",type:"SHORT",value:0},{name:"yMax",type:"SHORT",value:0},{name:"macStyle",type:"USHORT",value:0},{name:"lowestRecPPEM",type:"USHORT",value:0},{name:"fontDirectionHint",type:"SHORT",value:2},{name:"indexToLocFormat",type:"SHORT",value:0},{name:"glyphDataFormat",type:"SHORT",value:0}],a)}var f=a("../check"),g=a("../parse"),h=a("../table");c.parse=d,c.make=e},{"../check":2,"../parse":9,"../table":11}],17:[function(a,b,c){"use strict";function d(a,b){var c={},d=new f.Parser(a,b);return c.version=d.parseVersion(),c.ascender=d.parseShort(),c.descender=d.parseShort(),c.lineGap=d.parseShort(),c.advanceWidthMax=d.parseUShort(),c.minLeftSideBearing=d.parseShort(),c.minRightSideBearing=d.parseShort(),c.xMaxExtent=d.parseShort(),c.caretSlopeRise=d.parseShort(),c.caretSlopeRun=d.parseShort(),c.caretOffset=d.parseShort(),d.relativeOffset+=8,c.metricDataFormat=d.parseShort(),c.numberOfHMetrics=d.parseUShort(),c}function e(a){return new g.Table("hhea",[{name:"version",type:"FIXED",value:65536},{name:"ascender",type:"FWORD",value:0},{name:"descender",type:"FWORD",value:0},{name:"lineGap",type:"FWORD",value:0},{name:"advanceWidthMax",type:"UFWORD",value:0},{name:"minLeftSideBearing",type:"FWORD",value:0},{name:"minRightSideBearing",type:"FWORD",value:0},{name:"xMaxExtent",type:"FWORD",value:0},{name:"caretSlopeRise",type:"SHORT",value:1},{name:"caretSlopeRun",type:"SHORT",value:0},{name:"caretOffset",type:"SHORT",value:0},{name:"reserved1",type:"SHORT",value:0},{name:"reserved2",type:"SHORT",value:0},{name:"reserved3",type:"SHORT",value:0},{name:"reserved4",type:"SHORT",value:0},{name:"metricDataFormat",type:"SHORT",value:0},{name:"numberOfHMetrics",type:"USHORT",value:0}],a)}var f=a("../parse"),g=a("../table");c.parse=d,c.make=e},{"../parse":9,"../table":11}],18:[function(a,b,c){"use strict";function d(a,b,c,d,e){for(var g,h,i=new f.Parser(a,b),j=0;d>j;j+=1){c>j&&(g=i.parseUShort(),h=i.parseShort());var k=e.get(j);k.advanceWidth=g,k.leftSideBearing=h}}function e(a){for(var b=new g.Table("hmtx",[]),c=0;c<a.length;c+=1){var d=a.get(c),e=d.advanceWidth||0,f=d.leftSideBearing||0;b.fields.push({name:"advanceWidth_"+c,type:"USHORT",value:e}),b.fields.push({name:"leftSideBearing_"+c,type:"SHORT",value:f})}return b}var f=a("../parse"),g=a("../table");c.parse=d,c.make=e},{"../parse":9,"../table":11}],19:[function(a,b,c){"use strict";function d(a,b){var c={},d=new f.Parser(a,b),g=d.parseUShort();e.argument(0===g,"Unsupported kern table version."),d.skip("uShort",1);var h=d.parseUShort();e.argument(0===h,"Unsupported kern sub-table version."),d.skip("uShort",2);var i=d.parseUShort();d.skip("uShort",3);for(var j=0;i>j;j+=1){var k=d.parseUShort(),l=d.parseUShort(),m=d.parseShort();c[k+","+l]=m}return c}var e=a("../check"),f=a("../parse");c.parse=d},{"../check":2,"../parse":9}],20:[function(a,b,c){"use strict";function d(a,b,c,d){for(var f=new e.Parser(a,b),g=d?f.parseUShort:f.parseULong,h=[],i=0;c+1>i;i+=1){var j=g.call(f);d&&(j*=2),h.push(j)}return h}var e=a("../parse");c.parse=d},{"../parse":9}],21:[function(a,b,c){"use strict";function d(a,b){var c={},d=new f.Parser(a,b);return c.version=d.parseVersion(),c.numGlyphs=d.parseUShort(),1===c.version&&(c.maxPoints=d.parseUShort(),c.maxContours=d.parseUShort(),c.maxCompositePoints=d.parseUShort(),c.maxCompositeContours=d.parseUShort(),c.maxZones=d.parseUShort(),c.maxTwilightPoints=d.parseUShort(),c.maxStorage=d.parseUShort(),c.maxFunctionDefs=d.parseUShort(),c.maxInstructionDefs=d.parseUShort(),c.maxStackElements=d.parseUShort(),c.maxSizeOfInstructions=d.parseUShort(),c.maxComponentElements=d.parseUShort(),c.maxComponentDepth=d.parseUShort()),c}function e(a){return new g.Table("maxp",[{name:"version",type:"FIXED",value:20480},{name:"numGlyphs",type:"USHORT",value:a}])}var f=a("../parse"),g=a("../table");c.parse=d,c.make=e},{"../parse":9,"../table":11}],22:[function(a,b,c){"use strict";function d(a,b){var c={},d=new j.Parser(a,b);c.format=d.parseUShort();for(var e=d.parseUShort(),f=d.offset+d.parseUShort(),g=0,h=0;e>h;h++){var i=d.parseUShort(),k=d.parseUShort(),m=d.parseUShort(),n=d.parseUShort(),o=l[n],p=d.parseUShort(),q=d.parseUShort();if(3===i&&1===k&&1033===m){for(var r=[],s=p/2,t=0;s>t;t++,q+=2)r[t]=j.getShort(a,f+q);var u=String.fromCharCode.apply(null,r);o?c[o]=u:(g++,c["unknown"+g]=u)}}return 1===c.format&&(c.langTagCount=d.parseUShort()),c}function e(a,b,c,d,e,f){return new k.Table("NameRecord",[{name:"platformID",type:"USHORT",value:a},{name:"encodingID",type:"USHORT",value:b},{name:"languageID",type:"USHORT",value:c},{name:"nameID",type:"USHORT",value:d},{name:"length",type:"USHORT",value:e},{name:"offset",type:"USHORT",value:f}])}function f(a,b,c,d){var f=i.STRING(c);return a.records.push(e(1,0,0,b,f.length,d)),a.strings.push(f),d+=f.length}function g(a,b,c,d){var f=i.UTF16(c);return a.records.push(e(3,1,1033,b,f.length,d)),a.strings.push(f),d+=f.length}function h(a){var b=new k.Table("name",[{name:"format",type:"USHORT",value:0},{name:"count",type:"USHORT",value:0},{name:"stringOffset",type:"USHORT",value:0}]);b.records=[],b.strings=[];var c,d,e=0;for(c=0;c<l.length;c+=1)void 0!==a[l[c]]&&(d=a[l[c]],e=f(b,c,d,e));for(c=0;c<l.length;c+=1)void 0!==a[l[c]]&&(d=a[l[c]],e=g(b,c,d,e));for(b.count=b.records.length,b.stringOffset=6+12*b.count,c=0;c<b.records.length;c+=1)b.fields.push({name:"record_"+c,type:"TABLE",value:b.records[c]});for(c=0;c<b.strings.length;c+=1)b.fields.push({name:"string_"+c,type:"LITERAL",value:b.strings[c]});return b}var i=a("../types").encode,j=a("../parse"),k=a("../table"),l=["copyright","fontFamily","fontSubfamily","uniqueID","fullName","version","postScriptName","trademark","manufacturer","designer","description","manufacturerURL","designerURL","licence","licenceURL","reserved","preferredFamily","preferredSubfamily","compatibleFullName","sampleText","postScriptFindFontName","wwsFamily","wwsSubfamily"];c.parse=d,c.make=h},{"../parse":9,"../table":11,"../types":26}],23:[function(a,b,c){"use strict";function d(a){for(var b=0;b<i.length;b+=1){var c=i[b];if(a>=c.begin&&a<c.end)return b}return-1}function e(a,b){var c={},d=new g.Parser(a,b);c.version=d.parseUShort(),c.xAvgCharWidth=d.parseShort(),c.usWeightClass=d.parseUShort(),c.usWidthClass=d.parseUShort(),c.fsType=d.parseUShort(),c.ySubscriptXSize=d.parseShort(),c.ySubscriptYSize=d.parseShort(),c.ySubscriptXOffset=d.parseShort(),c.ySubscriptYOffset=d.parseShort(),c.ySuperscriptXSize=d.parseShort(),c.ySuperscriptYSize=d.parseShort(),c.ySuperscriptXOffset=d.parseShort(),c.ySuperscriptYOffset=d.parseShort(),c.yStrikeoutSize=d.parseShort(),c.yStrikeoutPosition=d.parseShort(),c.sFamilyClass=d.parseShort(),c.panose=[];for(var e=0;10>e;e++)c.panose[e]=d.parseByte();return c.ulUnicodeRange1=d.parseULong(),c.ulUnicodeRange2=d.parseULong(),c.ulUnicodeRange3=d.parseULong(),c.ulUnicodeRange4=d.parseULong(),c.achVendID=String.fromCharCode(d.parseByte(),d.parseByte(),d.parseByte(),d.parseByte()),c.fsSelection=d.parseUShort(),c.usFirstCharIndex=d.parseUShort(),c.usLastCharIndex=d.parseUShort(),c.sTypoAscender=d.parseShort(),c.sTypoDescender=d.parseShort(),c.sTypoLineGap=d.parseShort(),c.usWinAscent=d.parseUShort(),c.usWinDescent=d.parseUShort(),c.version>=1&&(c.ulCodePageRange1=d.parseULong(),c.ulCodePageRange2=d.parseULong()),c.version>=2&&(c.sxHeight=d.parseShort(),c.sCapHeight=d.parseShort(),c.usDefaultChar=d.parseUShort(),c.usBreakChar=d.parseUShort(),c.usMaxContent=d.parseUShort()),c}function f(a){return new h.Table("OS/2",[{name:"version",type:"USHORT",value:3},{name:"xAvgCharWidth",type:"SHORT",value:0},{name:"usWeightClass",type:"USHORT",value:0},{name:"usWidthClass",type:"USHORT",value:0},{name:"fsType",type:"USHORT",value:0},{name:"ySubscriptXSize",type:"SHORT",value:650},{name:"ySubscriptYSize",type:"SHORT",value:699},{name:"ySubscriptXOffset",type:"SHORT",value:0},{name:"ySubscriptYOffset",type:"SHORT",value:140},{name:"ySuperscriptXSize",type:"SHORT",value:650},{name:"ySuperscriptYSize",type:"SHORT",value:699},{name:"ySuperscriptXOffset",type:"SHORT",value:0},{name:"ySuperscriptYOffset",type:"SHORT",value:479},{name:"yStrikeoutSize",type:"SHORT",value:49},{name:"yStrikeoutPosition",type:"SHORT",value:258},{name:"sFamilyClass",type:"SHORT",value:0},{name:"bFamilyType",type:"BYTE",value:0},{name:"bSerifStyle",type:"BYTE",value:0},{name:"bWeight",type:"BYTE",value:0},{name:"bProportion",type:"BYTE",value:0},{name:"bContrast",type:"BYTE",value:0},{name:"bStrokeVariation",type:"BYTE",value:0},{name:"bArmStyle",type:"BYTE",value:0},{name:"bLetterform",type:"BYTE",value:0},{name:"bMidline",type:"BYTE",value:0},{name:"bXHeight",type:"BYTE",value:0},{name:"ulUnicodeRange1",type:"ULONG",value:0},{name:"ulUnicodeRange2",type:"ULONG",value:0},{name:"ulUnicodeRange3",type:"ULONG",value:0},{name:"ulUnicodeRange4",type:"ULONG",value:0},{name:"achVendID",type:"CHARARRAY",value:"XXXX"},{name:"fsSelection",type:"USHORT",value:0},{name:"usFirstCharIndex",type:"USHORT",value:0},{name:"usLastCharIndex",type:"USHORT",value:0},{name:"sTypoAscender",type:"SHORT",value:0},{name:"sTypoDescender",type:"SHORT",value:0},{name:"sTypoLineGap",type:"SHORT",value:0},{name:"usWinAscent",type:"USHORT",value:0},{name:"usWinDescent",type:"USHORT",value:0},{name:"ulCodePageRange1",type:"ULONG",value:0},{name:"ulCodePageRange2",type:"ULONG",value:0},{name:"sxHeight",type:"SHORT",value:0},{name:"sCapHeight",type:"SHORT",value:0},{name:"usDefaultChar",type:"USHORT",value:0},{name:"usBreakChar",type:"USHORT",value:0},{name:"usMaxContext",type:"USHORT",value:0}],a)}var g=a("../parse"),h=a("../table"),i=[{begin:0,end:127},{begin:128,end:255},{begin:256,end:383},{begin:384,end:591},{begin:592,end:687},{begin:688,end:767},{begin:768,end:879},{begin:880,end:1023},{begin:11392,end:11519},{begin:1024,end:1279},{begin:1328,end:1423},{begin:1424,end:1535},{begin:42240,end:42559},{begin:1536,end:1791},{begin:1984,end:2047},{begin:2304,end:2431},{begin:2432,end:2559},{begin:2560,end:2687},{begin:2688,end:2815},{begin:2816,end:2943},{begin:2944,end:3071},{begin:3072,end:3199},{begin:3200,end:3327},{begin:3328,end:3455},{begin:3584,end:3711},{begin:3712,end:3839},{begin:4256,end:4351},{begin:6912,end:7039},{begin:4352,end:4607},{begin:7680,end:7935},{begin:7936,end:8191},{begin:8192,end:8303},{begin:8304,end:8351},{begin:8352,end:8399},{begin:8400,end:8447},{begin:8448,end:8527},{begin:8528,end:8591},{begin:8592,end:8703},{begin:8704,end:8959},{begin:8960,end:9215},{begin:9216,end:9279},{begin:9280,end:9311},{begin:9312,end:9471},{begin:9472,end:9599},{begin:9600,end:9631},{begin:9632,end:9727},{begin:9728,end:9983},{begin:9984,end:10175},{begin:12288,end:12351},{begin:12352,end:12447},{begin:12448,end:12543},{begin:12544,end:12591},{begin:12592,end:12687},{begin:43072,end:43135},{begin:12800,end:13055},{begin:13056,end:13311},{begin:44032,end:55215},{begin:55296,end:57343},{begin:67840,end:67871},{begin:19968,end:40959},{begin:57344,end:63743},{begin:12736,end:12783},{begin:64256,end:64335},{begin:64336,end:65023},{begin:65056,end:65071},{begin:65040,end:65055},{begin:65104,end:65135},{begin:65136,end:65279},{begin:65280,end:65519},{begin:65520,end:65535},{begin:3840,end:4095},{begin:1792,end:1871},{begin:1920,end:1983},{begin:3456,end:3583},{begin:4096,end:4255},{begin:4608,end:4991},{begin:5024,end:5119},{begin:5120,end:5759},{begin:5760,end:5791},{begin:5792,end:5887},{begin:6016,end:6143},{begin:6144,end:6319},{begin:10240,end:10495},{begin:40960,end:42127},{begin:5888,end:5919},{begin:66304,end:66351},{begin:66352,end:66383},{begin:66560,end:66639},{begin:118784,end:119039},{begin:119808,end:120831},{begin:1044480,end:1048573},{begin:65024,end:65039},{begin:917504,end:917631},{begin:6400,end:6479},{begin:6480,end:6527},{begin:6528,end:6623},{begin:6656,end:6687},{begin:11264,end:11359},{begin:11568,end:11647},{begin:19904,end:19967},{begin:43008,end:43055},{begin:65536,end:65663},{begin:65856,end:65935},{begin:66432,end:66463},{begin:66464,end:66527},{begin:66640,end:66687},{begin:66688,end:66735},{begin:67584,
end:67647},{begin:68096,end:68191},{begin:119552,end:119647},{begin:73728,end:74751},{begin:119648,end:119679},{begin:7040,end:7103},{begin:7168,end:7247},{begin:7248,end:7295},{begin:43136,end:43231},{begin:43264,end:43311},{begin:43312,end:43359},{begin:43520,end:43615},{begin:65936,end:65999},{begin:66e3,end:66047},{begin:66208,end:66271},{begin:127024,end:127135}];c.unicodeRanges=i,c.getUnicodeRange=d,c.parse=e,c.make=f},{"../parse":9,"../table":11}],24:[function(a,b,c){"use strict";function d(a,b){var c,d={},e=new g.Parser(a,b);switch(d.version=e.parseVersion(),d.italicAngle=e.parseFixed(),d.underlinePosition=e.parseShort(),d.underlineThickness=e.parseShort(),d.isFixedPitch=e.parseULong(),d.minMemType42=e.parseULong(),d.maxMemType42=e.parseULong(),d.minMemType1=e.parseULong(),d.maxMemType1=e.parseULong(),d.version){case 1:d.names=f.standardNames.slice();break;case 2:for(d.numberOfGlyphs=e.parseUShort(),d.glyphNameIndex=new Array(d.numberOfGlyphs),c=0;c<d.numberOfGlyphs;c++)d.glyphNameIndex[c]=e.parseUShort();for(d.names=[],c=0;c<d.numberOfGlyphs;c++)if(d.glyphNameIndex[c]>=f.standardNames.length){var h=e.parseChar();d.names.push(e.parseString(h))}break;case 2.5:for(d.numberOfGlyphs=e.parseUShort(),d.offset=new Array(d.numberOfGlyphs),c=0;c<d.numberOfGlyphs;c++)d.offset[c]=e.parseChar()}return d}function e(){return new h.Table("post",[{name:"version",type:"FIXED",value:196608},{name:"italicAngle",type:"FIXED",value:0},{name:"underlinePosition",type:"FWORD",value:0},{name:"underlineThickness",type:"FWORD",value:0},{name:"isFixedPitch",type:"ULONG",value:0},{name:"minMemType42",type:"ULONG",value:0},{name:"maxMemType42",type:"ULONG",value:0},{name:"minMemType1",type:"ULONG",value:0},{name:"maxMemType1",type:"ULONG",value:0}])}var f=a("../encoding"),g=a("../parse"),h=a("../table");c.parse=d,c.make=e},{"../encoding":4,"../parse":9,"../table":11}],25:[function(a,b,c){"use strict";function d(a){return Math.log(a)/Math.log(2)|0}function e(a){for(;a.length%4!==0;)a.push(0);for(var b=0,c=0;c<a.length;c+=4)b+=(a[c]<<24)+(a[c+1]<<16)+(a[c+2]<<8)+a[c+3];return b%=Math.pow(2,32)}function f(a,b,c,d){return new l.Table("Table Record",[{name:"tag",type:"TAG",value:void 0!==a?a:""},{name:"checkSum",type:"ULONG",value:void 0!==b?b:0},{name:"offset",type:"ULONG",value:void 0!==c?c:0},{name:"length",type:"ULONG",value:void 0!==d?d:0}])}function g(a){var b=new l.Table("sfnt",[{name:"version",type:"TAG",value:"OTTO"},{name:"numTables",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0}]);b.tables=a,b.numTables=a.length;var c=Math.pow(2,d(b.numTables));b.searchRange=16*c,b.entrySelector=d(c),b.rangeShift=16*b.numTables-b.searchRange;for(var g=[],h=[],i=b.sizeOf()+f().sizeOf()*b.numTables;i%4!==0;)i+=1,h.push({name:"padding",type:"BYTE",value:0});for(var j=0;j<a.length;j+=1){var m=a[j];k.argument(4===m.tableName.length,"Table name"+m.tableName+" is invalid.");var n=m.sizeOf(),o=f(m.tableName,e(m.encode()),i,n);for(g.push({name:o.tag+" Table Record",type:"TABLE",value:o}),h.push({name:m.tableName+" table",type:"TABLE",value:m}),i+=n,k.argument(!isNaN(i),"Something went wrong calculating the offset.");i%4!==0;)i+=1,h.push({name:"padding",type:"BYTE",value:0})}return g.sort(function(a,b){return a.value.tag>b.value.tag?1:-1}),b.fields=b.fields.concat(g),b.fields=b.fields.concat(h),b}function h(a,b,c){for(var d=0;d<b.length;d+=1){var e=a.charToGlyphIndex(b[d]);if(e>0){var f=a.glyphs.get(e);return f.getMetrics()}}return c}function i(a){for(var b=0,c=0;c<a.length;c+=1)b+=a[c];return b/a.length}function j(a){for(var b,c=[],d=[],f=[],j=[],k=[],l=[],v=[],w=0,x=0,y=0,z=0,A=0,B=0;B<a.glyphs.length;B+=1){var C=a.glyphs.get(B),D=0|C.unicode;(b>D||null===b)&&(b=D),D>w&&(w=D);var E=t.getUnicodeRange(D);if(32>E)x|=1<<E;else if(64>E)y|=1<<E-32;else if(96>E)z|=1<<E-64;else{if(!(123>E))throw new Error("Unicode ranges bits > 123 are reserved for internal usage");A|=1<<E-96}if(".notdef"!==C.name){var F=C.getMetrics();c.push(F.xMin),d.push(F.yMin),f.push(F.xMax),j.push(F.yMax),l.push(F.leftSideBearing),v.push(F.rightSideBearing),k.push(C.advanceWidth)}}var G={xMin:Math.min.apply(null,c),yMin:Math.min.apply(null,d),xMax:Math.max.apply(null,f),yMax:Math.max.apply(null,j),advanceWidthMax:Math.max.apply(null,k),advanceWidthAvg:i(k),minLeftSideBearing:Math.min.apply(null,l),maxLeftSideBearing:Math.max.apply(null,l),minRightSideBearing:Math.min.apply(null,v)};G.ascender=void 0!==a.ascender?a.ascender:G.yMax,G.descender=void 0!==a.descender?a.descender:G.yMin;var H=o.make({unitsPerEm:a.unitsPerEm,xMin:G.xMin,yMin:G.yMin,xMax:G.xMax,yMax:G.yMax}),I=p.make({ascender:G.ascender,descender:G.descender,advanceWidthMax:G.advanceWidthMax,minLeftSideBearing:G.minLeftSideBearing,minRightSideBearing:G.minRightSideBearing,xMaxExtent:G.maxLeftSideBearing+(G.xMax-G.xMin),numberOfHMetrics:a.glyphs.length}),J=r.make(a.glyphs.length),K=t.make({xAvgCharWidth:Math.round(G.advanceWidthAvg),usWeightClass:500,usWidthClass:5,usFirstCharIndex:b,usLastCharIndex:w,ulUnicodeRange1:x,ulUnicodeRange2:y,ulUnicodeRange3:z,ulUnicodeRange4:A,sTypoAscender:G.ascender,sTypoDescender:G.descender,sTypoLineGap:0,usWinAscent:G.ascender,usWinDescent:-G.descender,sxHeight:h(a,"xyvw",{yMax:0}).yMax,sCapHeight:h(a,"HIKLEFJMNTZBDPRAGOQSUVWXY",G).yMax,usBreakChar:a.hasChar(" ")?32:0}),L=q.make(a.glyphs),M=m.make(a.glyphs),N=a.familyName+" "+a.styleName,O=a.familyName.replace(/\s/g,"")+"-"+a.styleName,P=s.make({copyright:a.copyright,fontFamily:a.familyName,fontSubfamily:a.styleName,uniqueID:a.manufacturer+":"+N,fullName:N,version:a.version,postScriptName:O,trademark:a.trademark,manufacturer:a.manufacturer,designer:a.designer,description:a.description,manufacturerURL:a.manufacturerURL,designerURL:a.designerURL,license:a.license,licenseURL:a.licenseURL,preferredFamily:a.familyName,preferredSubfamily:a.styleName}),Q=u.make(),R=n.make(a.glyphs,{version:a.version,fullName:N,familyName:a.familyName,weightName:a.styleName,postScriptName:O,unitsPerEm:a.unitsPerEm}),S=[H,I,J,K,P,M,Q,R,L],T=g(S),U=T.encode(),V=e(U),W=T.fields,X=!1;for(B=0;B<W.length;B+=1)if("head table"===W[B].name){W[B].value.checkSumAdjustment=2981146554-V,X=!0;break}if(!X)throw new Error("Could not find head table with checkSum to adjust.");return T}var k=a("../check"),l=a("../table"),m=a("./cmap"),n=a("./cff"),o=a("./head"),p=a("./hhea"),q=a("./hmtx"),r=a("./maxp"),s=a("./name"),t=a("./os2"),u=a("./post");c.computeCheckSum=e,c.make=g,c.fontToTable=j},{"../check":2,"../table":11,"./cff":12,"./cmap":13,"./head":16,"./hhea":17,"./hmtx":18,"./maxp":21,"./name":22,"./os2":23,"./post":24}],26:[function(a,b,c){"use strict";function d(a){return function(){return a}}var e=a("./check"),f=32768,g=2147483648,h={},i={},j={};i.BYTE=function(a){return e.argument(a>=0&&255>=a,"Byte value should be between 0 and 255."),[a]},j.BYTE=d(1),i.CHAR=function(a){return[a.charCodeAt(0)]},j.BYTE=d(1),i.CHARARRAY=function(a){for(var b=[],c=0;c<a.length;c+=1)b.push(a.charCodeAt(c));return b},j.CHARARRAY=function(a){return a.length},i.USHORT=function(a){return[a>>8&255,255&a]},j.USHORT=d(2),i.SHORT=function(a){return a>=f&&(a=-(2*f-a)),[a>>8&255,255&a]},j.SHORT=d(2),i.UINT24=function(a){return[a>>16&255,a>>8&255,255&a]},j.UINT24=d(3),i.ULONG=function(a){return[a>>24&255,a>>16&255,a>>8&255,255&a]},j.ULONG=d(4),i.LONG=function(a){return a>=g&&(a=-(2*g-a)),[a>>24&255,a>>16&255,a>>8&255,255&a]},j.LONG=d(4),i.FIXED=i.ULONG,j.FIXED=j.ULONG,i.FWORD=i.SHORT,j.FWORD=j.SHORT,i.UFWORD=i.USHORT,j.UFWORD=j.USHORT,i.LONGDATETIME=function(){return[0,0,0,0,0,0,0,0]},j.LONGDATETIME=d(8),i.TAG=function(a){return e.argument(4===a.length,"Tag should be exactly 4 ASCII characters."),[a.charCodeAt(0),a.charCodeAt(1),a.charCodeAt(2),a.charCodeAt(3)]},j.TAG=d(4),i.Card8=i.BYTE,j.Card8=j.BYTE,i.Card16=i.USHORT,j.Card16=j.USHORT,i.OffSize=i.BYTE,j.OffSize=j.BYTE,i.SID=i.USHORT,j.SID=j.USHORT,i.NUMBER=function(a){return a>=-107&&107>=a?[a+139]:a>=108&&1131>=a?(a-=108,[(a>>8)+247,255&a]):a>=-1131&&-108>=a?(a=-a-108,[(a>>8)+251,255&a]):a>=-32768&&32767>=a?i.NUMBER16(a):i.NUMBER32(a)},j.NUMBER=function(a){return i.NUMBER(a).length},i.NUMBER16=function(a){return[28,a>>8&255,255&a]},j.NUMBER16=d(2),i.NUMBER32=function(a){return[29,a>>24&255,a>>16&255,a>>8&255,255&a]},j.NUMBER32=d(4),i.REAL=function(a){var b=a.toString(),c=/\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(b);if(c){var d=parseFloat("1e"+((c[2]?+c[2]:0)+c[1].length));b=(Math.round(a*d)/d).toString()}var e,f,g="";for(e=0,f=b.length;f>e;e+=1){var h=b[e];g+="e"===h?"-"===b[++e]?"c":"b":"."===h?"a":"-"===h?"e":h}g+=1&g.length?"f":"ff";var i=[30];for(e=0,f=g.length;f>e;e+=2)i.push(parseInt(g.substr(e,2),16));return i},j.REAL=function(a){return i.REAL(a).length},i.NAME=i.CHARARRAY,j.NAME=j.CHARARRAY,i.STRING=i.CHARARRAY,j.STRING=j.CHARARRAY,i.UTF16=function(a){for(var b=[],c=0;c<a.length;c+=1)b.push(0),b.push(a.charCodeAt(c));return b},j.UTF16=function(a){return 2*a.length},i.INDEX=function(a){var b,c=1,d=[c],e=[],f=0;for(b=0;b<a.length;b+=1){var g=i.OBJECT(a[b]);Array.prototype.push.apply(e,g),f+=g.length,c+=g.length,d.push(c)}if(0===e.length)return[0,0];var h=[],j=1+Math.floor(Math.log(f)/Math.log(2))/8|0,k=[void 0,i.BYTE,i.USHORT,i.UINT24,i.ULONG][j];for(b=0;b<d.length;b+=1){var l=k(d[b]);Array.prototype.push.apply(h,l)}return Array.prototype.concat(i.Card16(a.length),i.OffSize(j),h,e)},j.INDEX=function(a){return i.INDEX(a).length},i.DICT=function(a){for(var b=[],c=Object.keys(a),d=c.length,e=0;d>e;e+=1){var f=parseInt(c[e],0),g=a[f];b=b.concat(i.OPERAND(g.value,g.type)),b=b.concat(i.OPERATOR(f))}return b},j.DICT=function(a){return i.DICT(a).length},i.OPERATOR=function(a){return 1200>a?[a]:[12,a-1200]},i.OPERAND=function(a,b){var c=[];if(Array.isArray(b))for(var d=0;d<b.length;d+=1)e.argument(a.length===b.length,"Not enough arguments given for type"+b),c=c.concat(i.OPERAND(a[d],b[d]));else if("SID"===b)c=c.concat(i.NUMBER(a));else if("offset"===b)c=c.concat(i.NUMBER32(a));else if("number"===b)c=c.concat(i.NUMBER(a));else{if("real"!==b)throw new Error("Unknown operand type "+b);c=c.concat(i.REAL(a))}return c},i.OP=i.BYTE,j.OP=j.BYTE;var k="function"==typeof WeakMap&&new WeakMap;i.CHARSTRING=function(a){if(k&&k.has(a))return k.get(a);for(var b=[],c=a.length,d=0;c>d;d+=1){var e=a[d];b=b.concat(i[e.type](e.value))}return k&&k.set(a,b),b},j.CHARSTRING=function(a){return i.CHARSTRING(a).length},i.OBJECT=function(a){var b=i[a.type];return e.argument(void 0!==b,"No encoding function for type "+a.type),b(a.value)},i.TABLE=function(a){for(var b=[],c=a.fields.length,d=0;c>d;d+=1){var f=a.fields[d],g=i[f.type];e.argument(void 0!==g,"No encoding function for field type "+f.type);var h=a[f.name];void 0===h&&(h=f.value);var j=g(h);b=b.concat(j)}return b},i.LITERAL=function(a){return a},j.LITERAL=function(a){return a.length},c.decode=h,c.encode=i,c.sizeOf=j},{"./check":2}],27:[function(_dereq_,module,exports){!function(a,b,c){"undefined"!=typeof module&&module.exports?module.exports=c():"function"==typeof define&&define.amd?define(c):b[a]=c()}("reqwest",this,function(){function succeed(a){var b=protocolRe.exec(a.url);return b=b&&b[1]||window.location.protocol,httpsRe.test(b)?twoHundo.test(a.request.status):!!a.request.response}function handleReadyState(a,b,c){return function(){return a._aborted?c(a.request):a._timedOut?c(a.request,"Request is aborted: timeout"):void(a.request&&4==a.request[readyState]&&(a.request.onreadystatechange=noop,succeed(a)?b(a.request):c(a.request)))}}function setHeaders(a,b){var c,d=b.headers||{};d.Accept=d.Accept||defaultHeaders.accept[b.type]||defaultHeaders.accept["*"];var e="function"==typeof FormData&&b.data instanceof FormData;b.crossOrigin||d[requestedWith]||(d[requestedWith]=defaultHeaders.requestedWith),d[contentType]||e||(d[contentType]=b.contentType||defaultHeaders.contentType);for(c in d)d.hasOwnProperty(c)&&"setRequestHeader"in a&&a.setRequestHeader(c,d[c])}function setCredentials(a,b){"undefined"!=typeof b.withCredentials&&"undefined"!=typeof a.withCredentials&&(a.withCredentials=!!b.withCredentials)}function generalCallback(a){lastValue=a}function urlappend(a,b){return a+(/\?/.test(a)?"&":"?")+b}function handleJsonp(a,b,c,d){var e=uniqid++,f=a.jsonpCallback||"callback",g=a.jsonpCallbackName||reqwest.getcallbackPrefix(e),h=new RegExp("((^|\\?|&)"+f+")=([^&]+)"),i=d.match(h),j=doc.createElement("script"),k=0,l=-1!==navigator.userAgent.indexOf("MSIE 10.0");return i?"?"===i[3]?d=d.replace(h,"$1="+g):g=i[3]:d=urlappend(d,f+"="+g),win[g]=generalCallback,j.type="text/javascript",j.src=d,j.async=!0,"undefined"==typeof j.onreadystatechange||l||(j.htmlFor=j.id="_reqwest_"+e),j.onload=j.onreadystatechange=function(){return j[readyState]&&"complete"!==j[readyState]&&"loaded"!==j[readyState]||k?!1:(j.onload=j.onreadystatechange=null,j.onclick&&j.onclick(),b(lastValue),lastValue=void 0,head.removeChild(j),void(k=1))},head.appendChild(j),{abort:function(){j.onload=j.onreadystatechange=null,c({},"Request is aborted: timeout",{}),lastValue=void 0,head.removeChild(j),k=1}}}function getRequest(a,b){var c,d=this.o,e=(d.method||"GET").toUpperCase(),f="string"==typeof d?d:d.url,g=d.processData!==!1&&d.data&&"string"!=typeof d.data?reqwest.toQueryString(d.data):d.data||null,h=!1;return"jsonp"!=d.type&&"GET"!=e||!g||(f=urlappend(f,g),g=null),"jsonp"==d.type?handleJsonp(d,a,b,f):(c=d.xhr&&d.xhr(d)||xhr(d),c.open(e,f,d.async===!1?!1:!0),setHeaders(c,d),setCredentials(c,d),win[xDomainRequest]&&c instanceof win[xDomainRequest]?(c.onload=a,c.onerror=b,c.onprogress=function(){},h=!0):c.onreadystatechange=handleReadyState(this,a,b),d.before&&d.before(c),h?setTimeout(function(){c.send(g)},200):c.send(g),c)}function Reqwest(a,b){this.o=a,this.fn=b,init.apply(this,arguments)}function setType(a){return a.match("json")?"json":a.match("javascript")?"js":a.match("text")?"html":a.match("xml")?"xml":void 0}function init(o,fn){function complete(a){for(o.timeout&&clearTimeout(self.timeout),self.timeout=null;self._completeHandlers.length>0;)self._completeHandlers.shift()(a)}function success(resp){var type=o.type||resp&&setType(resp.getResponseHeader("Content-Type"));resp="jsonp"!==type?self.request:resp;var filteredResponse=globalSetupOptions.dataFilter(resp.responseText,type),r=filteredResponse;try{resp.responseText=r}catch(e){}if(r)switch(type){case"json":try{resp=win.JSON?win.JSON.parse(r):eval("("+r+")")}catch(err){return error(resp,"Could not parse JSON in response",err)}break;case"js":resp=eval(r);break;case"html":resp=r;break;case"xml":resp=resp.responseXML&&resp.responseXML.parseError&&resp.responseXML.parseError.errorCode&&resp.responseXML.parseError.reason?null:resp.responseXML}for(self._responseArgs.resp=resp,self._fulfilled=!0,fn(resp),self._successHandler(resp);self._fulfillmentHandlers.length>0;)resp=self._fulfillmentHandlers.shift()(resp);complete(resp)}function timedOut(){self._timedOut=!0,self.request.abort()}function error(a,b,c){for(a=self.request,self._responseArgs.resp=a,self._responseArgs.msg=b,self._responseArgs.t=c,self._erred=!0;self._errorHandlers.length>0;)self._errorHandlers.shift()(a,b,c);complete(a)}this.url="string"==typeof o?o:o.url,this.timeout=null,this._fulfilled=!1,this._successHandler=function(){},this._fulfillmentHandlers=[],this._errorHandlers=[],this._completeHandlers=[],this._erred=!1,this._responseArgs={};var self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){timedOut()},o.timeout)),o.success&&(this._successHandler=function(){o.success.apply(o,arguments)}),o.error&&this._errorHandlers.push(function(){o.error.apply(o,arguments)}),o.complete&&this._completeHandlers.push(function(){o.complete.apply(o,arguments)}),this.request=getRequest.call(this,success,error)}function reqwest(a,b){return new Reqwest(a,b)}function normalize(a){return a?a.replace(/\r?\n/g,"\r\n"):""}function serial(a,b){var c,d,e,f,g=a.name,h=a.tagName.toLowerCase(),i=function(a){a&&!a.disabled&&b(g,normalize(a.attributes.value&&a.attributes.value.specified?a.value:a.text))};if(!a.disabled&&g)switch(h){case"input":/reset|button|image|file/i.test(a.type)||(c=/checkbox/i.test(a.type),d=/radio/i.test(a.type),e=a.value,(!(c||d)||a.checked)&&b(g,normalize(c&&""===e?"on":e)));break;case"textarea":b(g,normalize(a.value));break;case"select":if("select-one"===a.type.toLowerCase())i(a.selectedIndex>=0?a.options[a.selectedIndex]:null);else for(f=0;a.length&&f<a.length;f++)a.options[f].selected&&i(a.options[f])}}function eachFormElement(){var a,b,c=this,d=function(a,b){var d,e,f;for(d=0;d<b.length;d++)for(f=a[byTag](b[d]),e=0;e<f.length;e++)serial(f[e],c)};for(b=0;b<arguments.length;b++)a=arguments[b],/input|select|textarea/i.test(a.tagName)&&serial(a,c),d(a,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var a={};return eachFormElement.apply(function(b,c){b in a?(a[b]&&!isArray(a[b])&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c},arguments),a}function buildParams(a,b,c,d){var e,f,g,h=/\[\]$/;if(isArray(b))for(f=0;b&&f<b.length;f++)g=b[f],c||h.test(a)?d(a,g):buildParams(a+"["+("object"==typeof g?f:"")+"]",g,c,d);else if(b&&"[object Object]"===b.toString())for(e in b)buildParams(a+"["+e+"]",b[e],c,d);else d(a,b)}var win=window,doc=document,httpsRe=/^http/,protocolRe=/(^\w+):\/\//,twoHundo=/^(20\d|1223)$/,byTag="getElementsByTagName",readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",head=doc[byTag]("head")[0],uniqid=0,callbackPrefix="reqwest_"+ +new Date,lastValue,xmlHttpRequest="XMLHttpRequest",xDomainRequest="XDomainRequest",noop=function(){},isArray="function"==typeof Array.isArray?Array.isArray:function(a){return a instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",requestedWith:xmlHttpRequest,accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"}},xhr=function(a){if(a.crossOrigin===!0){var b=win[xmlHttpRequest]?new XMLHttpRequest:null;if(b&&"withCredentials"in b)return b;if(win[xDomainRequest])return new XDomainRequest;throw new Error("Browser does not support cross-origin requests")}return win[xmlHttpRequest]?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},globalSetupOptions={dataFilter:function(a){return a}};return Reqwest.prototype={abort:function(){this._aborted=!0,this.request.abort()},retry:function(){init.call(this,this.o,this.fn)},then:function(a,b){return a=a||function(){},b=b||function(){},this._fulfilled?this._responseArgs.resp=a(this._responseArgs.resp):this._erred?b(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(a),this._errorHandlers.push(b)),this},always:function(a){return this._fulfilled||this._erred?a(this._responseArgs.resp):this._completeHandlers.push(a),this},fail:function(a){return this._erred?a(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(a),this},"catch":function(a){return this.fail(a)}},reqwest.serializeArray=function(){var a=[];return eachFormElement.apply(function(b,c){a.push({name:b,value:c})},arguments),a},reqwest.serialize=function(){if(0===arguments.length)return"";var a,b,c=Array.prototype.slice.call(arguments,0);return a=c.pop(),a&&a.nodeType&&c.push(a)&&(a=null),a&&(a=a.type),b="map"==a?serializeHash:"array"==a?reqwest.serializeArray:serializeQueryString,b.apply(null,c)},reqwest.toQueryString=function(a,b){var c,d,e=b||!1,f=[],g=encodeURIComponent,h=function(a,b){b="function"==typeof b?b():null==b?"":b,f[f.length]=g(a)+"="+g(b)};if(isArray(a))for(d=0;a&&d<a.length;d++)h(a[d].name,a[d].value);else for(c in a)a.hasOwnProperty(c)&&buildParams(c,a[c],e,h);return f.join("&").replace(/%20/g,"+")},reqwest.getcallbackPrefix=function(){return callbackPrefix},reqwest.compat=function(a,b){return a&&(a.type&&(a.method=a.type)&&delete a.type,a.dataType&&(a.type=a.dataType),a.jsonpCallback&&(a.jsonpCallbackName=a.jsonpCallback)&&delete a.jsonpCallback,a.jsonp&&(a.jsonpCallback=a.jsonp)),new Reqwest(a,b)},reqwest.ajaxSetup=function(a){a=a||{};for(var b in a)globalSetupOptions[b]=a[b]},reqwest})},{}],28:[function(a,b,c){"use strict";var d=a("./core/core");a("./color/p5.Color"),a("./core/p5.Element"),a("./typography/p5.Font"),a("./core/p5.Graphics"),a("./core/p5.Renderer2D"),a("./image/p5.Image"),a("./math/p5.Vector"),a("./io/p5.TableRow"),a("./io/p5.Table"),a("./io/p5.XML"),a("./color/creating_reading"),a("./color/setting"),a("./core/constants"),a("./utilities/conversion"),a("./utilities/array_functions"),a("./utilities/string_functions"),a("./core/environment"),a("./image/image"),a("./image/loading_displaying"),a("./image/pixels"),a("./io/files"),a("./events/keyboard"),a("./events/acceleration"),a("./events/mouse"),a("./utilities/time_date"),a("./events/touch"),a("./math/math"),a("./math/calculation"),a("./math/random"),a("./math/noise"),a("./math/trigonometry"),a("./core/rendering"),a("./core/2d_primitives"),a("./core/attributes"),a("./core/curves"),a("./core/vertex"),a("./core/structure"),a("./core/transform"),a("./typography/attributes"),a("./typography/loading_displaying"),a("./webgl/p5.RendererGL"),a("./webgl/p5.Geometry"),a("./webgl/p5.RendererGL.Retained"),a("./webgl/p5.RendererGL.Immediate"),a("./webgl/primitives"),a("./webgl/loading"),a("./webgl/p5.Matrix"),a("./webgl/material"),a("./webgl/light"),a("./webgl/shader"),a("./webgl/camera"),a("./webgl/interaction");var e=function(){window.PHANTOMJS||window.mocha||(window.setup&&"function"==typeof window.setup||window.draw&&"function"==typeof window.draw)&&!d.instance&&new d};"complete"===document.readyState?e():window.addEventListener("load",e,!1),b.exports=d},{"./color/creating_reading":30,"./color/p5.Color":31,"./color/setting":32,"./core/2d_primitives":33,"./core/attributes":34,"./core/constants":36,"./core/core":37,"./core/curves":38,"./core/environment":39,"./core/p5.Element":41,"./core/p5.Graphics":42,"./core/p5.Renderer2D":44,"./core/rendering":45,"./core/structure":47,"./core/transform":48,"./core/vertex":49,"./events/acceleration":50,"./events/keyboard":51,"./events/mouse":52,"./events/touch":53,"./image/image":55,"./image/loading_displaying":56,"./image/p5.Image":57,"./image/pixels":58,"./io/files":59,"./io/p5.Table":60,"./io/p5.TableRow":61,"./io/p5.XML":62,"./math/calculation":63,"./math/math":64,"./math/noise":65,"./math/p5.Vector":66,"./math/random":68,"./math/trigonometry":69,"./typography/attributes":70,"./typography/loading_displaying":71,"./typography/p5.Font":72,"./utilities/array_functions":73,"./utilities/conversion":74,"./utilities/string_functions":75,"./utilities/time_date":76,"./webgl/camera":77,"./webgl/interaction":78,"./webgl/light":79,"./webgl/loading":80,"./webgl/material":81,"./webgl/p5.Geometry":82,"./webgl/p5.Matrix":83,"./webgl/p5.RendererGL":86,"./webgl/p5.RendererGL.Immediate":84,"./webgl/p5.RendererGL.Retained":85,"./webgl/primitives":87,"./webgl/shader":88}],29:[function(a,b,c){"use strict";var d=a("../core/core");d.ColorConversion={},d.ColorConversion._hsbaToHSLA=function(a){var b=a[0],c=a[1],d=a[2],e=(2-c)*d/2;return 0!==e&&(1===e?c=0:.5>e?c/=2-c:c=c*d/(2-2*e)),[b,c,e,a[3]]},d.ColorConversion._hsbaToRGBA=function(a){var b=6*a[0],c=a[1],d=a[2],e=[];if(0===c)e=[d,d,d,a[3]];else{var f,g,h,i=Math.floor(b),j=d*(1-c),k=d*(1-c*(b-i)),l=d*(1-c*(1+i-b));1===i?(f=k,g=d,h=j):2===i?(f=j,g=d,h=l):3===i?(f=j,g=k,h=d):4===i?(f=l,g=j,h=d):5===i?(f=d,g=j,h=k):(f=d,g=l,h=j),e=[f,g,h,a[3]]}return e},d.ColorConversion._hslaToHSBA=function(a){var b,c=a[0],d=a[1],e=a[2];return b=.5>e?(1+d)*e:e+d-e*d,d=2*(b-e)/b,[c,d,b,a[3]]},d.ColorConversion._hslaToRGBA=function(a){var b=6*a[0],c=a[1],d=a[2],e=[];if(0===c)e=[d,d,d,a[3]];else{var f;f=.5>d?(1+c)*d:d+c-d*c;var g=2*d-f,h=function(a,b,c){return 0>a?a+=6:a>=6&&(a-=6),1>a?b+(c-b)*a:3>a?c:4>a?b+(c-b)*(4-a):b};e=[h(b+2,g,f),h(b,g,f),h(b-2,g,f),a[3]]}return e},d.ColorConversion._rgbaToHSBA=function(a){var b,c,d=a[0],e=a[1],f=a[2],g=Math.max(d,e,f),h=g-Math.min(d,e,f);return 0===h?(b=0,c=0):(c=h/g,d===g?b=(e-f)/h:e===g?b=2+(f-d)/h:f===g&&(b=4+(d-e)/h),0>b?b+=6:b>=6&&(b-=6)),[b/6,c,g,a[3]]},d.ColorConversion._rgbaToHSLA=function(a){var b,c,d=a[0],e=a[1],f=a[2],g=Math.max(d,e,f),h=Math.min(d,e,f),i=g+h,j=g-h;return 0===j?(b=0,c=0):(c=1>i?j/i:j/(2-j),d===g?b=(e-f)/j:e===g?b=2+(f-d)/j:f===g&&(b=4+(d-e)/j),0>b?b+=6:b>=6&&(b-=6)),[b/6,c,i/2,a[3]]},b.exports=d.ColorConversion},{"../core/core":37}],30:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("../core/constants");a("./p5.Color"),d.prototype.alpha=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getAlpha();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.blue=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getBlue();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.brightness=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getBrightness();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.color=function(){return arguments[0]instanceof d.Color?arguments[0]:arguments[0]instanceof Array?this instanceof d.Renderer?new d.Color(this,arguments[0]):new d.Color(this._renderer,arguments[0]):this instanceof d.Renderer?new d.Color(this,arguments):new d.Color(this._renderer,arguments)},d.prototype.green=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getGreen();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.hue=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getHue();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.lerpColor=function(a,b,c){var d,f,g,h,i,j,k=this._renderer._colorMode,l=this._renderer._colorMaxes;if(k===e.RGB)i=a.levels.map(function(a){return a/255}),j=b.levels.map(function(a){return a/255});else if(k===e.HSB)a._getBrightness(),b._getBrightness(),i=a.hsba,j=b.hsba;else{if(k!==e.HSL)throw new Error(k+"cannot be used for interpolation.");a._getLightness(),b._getLightness(),i=a.hsla,j=b.hsla}return c=Math.max(Math.min(c,1),0),d=this.lerp(i[0],j[0],c),f=this.lerp(i[1],j[1],c),g=this.lerp(i[2],j[2],c),h=this.lerp(i[3],j[3],c),d*=l[k][0],f*=l[k][1],g*=l[k][2],h*=l[k][3],this.color(d,f,g,h)},d.prototype.lightness=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getLightness();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.red=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getRed();throw new Error("Needs p5.Color or pixel array as argument.")},d.prototype.saturation=function(a){if(a instanceof d.Color||a instanceof Array)return this.color(a)._getSaturation();throw new Error("Needs p5.Color or pixel array as argument.")},b.exports=d},{"../core/constants":36,"../core/core":37,"./p5.Color":31}],31:[function(a,b,c){var d=a("../core/core"),e=a("../core/constants"),f=a("./color_conversion");d.Color=function(a,b){if(this.mode=a._colorMode,this.maxes=a._colorMaxes,this.mode!==e.RGB&&this.mode!==e.HSL&&this.mode!==e.HSB)throw new Error(this.mode+" is an invalid colorMode.");return this._array=d.Color._parseInputs.apply(a,b),this.levels=this._array.map(function(a){return Math.round(255*a)}),this},d.Color.prototype.toString=function(){var a=this.levels,b=this._array[3];return"rgba("+a[0]+","+a[1]+","+a[2]+","+b+")"},d.Color.prototype._getAlpha=function(){return this._array[3]*this.maxes[this.mode][3]},d.Color.prototype._getBlue=function(){return this._array[2]*this.maxes[e.RGB][2]},d.Color.prototype._getBrightness=function(){return this.hsba||(this.hsba=f._rgbaToHSBA(this._array)),this.hsba[2]*this.maxes[e.HSB][2]},d.Color.prototype._getGreen=function(){return this._array[1]*this.maxes[e.RGB][1]},d.Color.prototype._getHue=function(){return this.mode===e.HSB?(this.hsba||(this.hsba=f._rgbaToHSBA(this._array)),this.hsba[0]*this.maxes[e.HSB][0]):(this.hsla||(this.hsla=f._rgbaToHSLA(this._array)),this.hsla[0]*this.maxes[e.HSL][0])},d.Color.prototype._getLightness=function(){return this.hsla||(this.hsla=f._rgbaToHSLA(this._array)),this.hsla[2]*this.maxes[e.HSL][2]},d.Color.prototype._getRed=function(){return this._array[0]*this.maxes[e.RGB][0]},d.Color.prototype._getSaturation=function(){return this.mode===e.HSB?(this.hsba||(this.hsba=f._rgbaToHSBA(this._array)),this.hsba[1]*this.maxes[e.HSB][1]):(this.hsla||(this.hsla=f._rgbaToHSLA(this._array)),this.hsla[1]*this.maxes[e.HSL][1])};var g={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},h=/\s*/,i=/(\d{1,3})/,j=/((?:\d+(?:\.\d+)?)|(?:\.\d+))/,k=new RegExp(j.source+"%"),l={HEX3:/^#([a-f0-9])([a-f0-9])([a-f0-9])$/i,HEX6:/^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i,RGB:new RegExp(["^rgb\\(",i.source,",",i.source,",",i.source,"\\)$"].join(h.source),"i"),RGB_PERCENT:new RegExp(["^rgb\\(",k.source,",",k.source,",",k.source,"\\)$"].join(h.source),"i"),RGBA:new RegExp(["^rgba\\(",i.source,",",i.source,",",i.source,",",j.source,"\\)$"].join(h.source),"i"),
RGBA_PERCENT:new RegExp(["^rgba\\(",k.source,",",k.source,",",k.source,",",j.source,"\\)$"].join(h.source),"i"),HSL:new RegExp(["^hsl\\(",i.source,",",k.source,",",k.source,"\\)$"].join(h.source),"i"),HSLA:new RegExp(["^hsla\\(",i.source,",",k.source,",",k.source,",",j.source,"\\)$"].join(h.source),"i"),HSB:new RegExp(["^hsb\\(",i.source,",",k.source,",",k.source,"\\)$"].join(h.source),"i"),HSBA:new RegExp(["^hsba\\(",i.source,",",k.source,",",k.source,",",j.source,"\\)$"].join(h.source),"i")};d.Color._parseInputs=function(){var a=arguments.length,b=this._colorMode,c=this._colorMaxes,h=[];if(a>=3)return h[0]=arguments[0]/c[b][0],h[1]=arguments[1]/c[b][1],h[2]=arguments[2]/c[b][2],"number"==typeof arguments[3]?h[3]=arguments[3]/c[b][3]:h[3]=1,h=h.map(function(a){return Math.max(Math.min(a,1),0)}),b===e.HSL?f._hslaToRGBA(h):b===e.HSB?f._hsbaToRGBA(h):h;if(1===a&&"string"==typeof arguments[0]){var i=arguments[0].trim().toLowerCase();if(g[i])return d.Color._parseInputs.apply(this,[g[i]]);if(l.HEX3.test(i))return h=l.HEX3.exec(i).slice(1).map(function(a){return parseInt(a+a,16)/255}),h[3]=1,h;if(l.HEX6.test(i))return h=l.HEX6.exec(i).slice(1).map(function(a){return parseInt(a,16)/255}),h[3]=1,h;if(l.RGB.test(i))return h=l.RGB.exec(i).slice(1).map(function(a){return a/255}),h[3]=1,h;if(l.RGB_PERCENT.test(i))return h=l.RGB_PERCENT.exec(i).slice(1).map(function(a){return parseFloat(a)/100}),h[3]=1,h;if(l.RGBA.test(i))return h=l.RGBA.exec(i).slice(1).map(function(a,b){return 3===b?parseFloat(a):a/255});if(l.RGBA_PERCENT.test(i))return h=l.RGBA_PERCENT.exec(i).slice(1).map(function(a,b){return 3===b?parseFloat(a):parseFloat(a)/100});if(l.HSL.test(i)?(h=l.HSL.exec(i).slice(1).map(function(a,b){return 0===b?parseInt(a,10)/360:parseInt(a,10)/100}),h[3]=1):l.HSLA.test(i)&&(h=l.HSLA.exec(i).slice(1).map(function(a,b){return 0===b?parseInt(a,10)/360:3===b?parseFloat(a):parseInt(a,10)/100})),h.length)return f._hslaToRGBA(h);if(l.HSB.test(i)?(h=l.HSB.exec(i).slice(1).map(function(a,b){return 0===b?parseInt(a,10)/360:parseInt(a,10)/100}),h[3]=1):l.HSBA.test(i)&&(h=l.HSBA.exec(i).slice(1).map(function(a,b){return 0===b?parseInt(a,10)/360:3===b?parseFloat(a):parseInt(a,10)/100})),h.length)return f._hsbaToRGBA(h);h=[1,1,1,1]}else{if(1!==a&&2!==a||"number"!=typeof arguments[0])throw new Error(arguments+"is not a valid color representation.");h[0]=arguments[0]/c[b][2],h[1]=arguments[0]/c[b][2],h[2]=arguments[0]/c[b][2],"number"==typeof arguments[1]?h[3]=arguments[1]/c[b][3]:h[3]=1,h=h.map(function(a){return Math.max(Math.min(a,1),0)})}return h},b.exports=d.Color},{"../core/constants":36,"../core/core":37,"./color_conversion":29}],32:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("../core/constants");a("./p5.Color"),d.prototype.background=function(){return arguments[0]instanceof d.Image?this.image(arguments[0],0,0,this.width,this.height):this._renderer.background.apply(this._renderer,arguments),this},d.prototype.clear=function(){return this._renderer.clear(),this},d.prototype.colorMode=function(){if(arguments[0]===e.RGB||arguments[0]===e.HSB||arguments[0]===e.HSL){this._renderer._colorMode=arguments[0];var a=this._renderer._colorMaxes[this._renderer._colorMode];2===arguments.length?(a[0]=arguments[1],a[1]=arguments[1],a[2]=arguments[1],a[3]=arguments[1]):4===arguments.length?(a[0]=arguments[1],a[1]=arguments[2],a[2]=arguments[3]):5===arguments.length&&(a[0]=arguments[1],a[1]=arguments[2],a[2]=arguments[3],a[3]=arguments[4])}return this},d.prototype.fill=function(){return this._renderer._setProperty("_fillSet",!0),this._renderer._setProperty("_doFill",!0),this._renderer.fill.apply(this._renderer,arguments),this},d.prototype.noFill=function(){return this._renderer._setProperty("_doFill",!1),this},d.prototype.noStroke=function(){return this._renderer._setProperty("_doStroke",!1),this},d.prototype.stroke=function(){return this._renderer._setProperty("_strokeSet",!0),this._renderer._setProperty("_doStroke",!0),this._renderer.stroke.apply(this._renderer,arguments),this},b.exports=d},{"../core/constants":36,"../core/core":37,"./p5.Color":31}],33:[function(a,b,c){"use strict";var d=a("./core"),e=a("./constants"),f=a("./canvas");a("./error_helpers"),d.prototype.arc=function(a,b,c,d,f,g,h){for(var i=new Array(arguments.length),j=0;j<i.length;++j)i[j]=arguments[j];if(!this._renderer._doStroke&&!this._renderer._doFill)return this;for(this._angleMode===e.DEGREES&&(f=this.radians(f),g=this.radians(g));0>f;)f+=e.TWO_PI;for(;0>g;)g+=e.TWO_PI;return f%=e.TWO_PI,g%=e.TWO_PI,g===f&&(g+=e.TWO_PI),f=f<=e.HALF_PI?Math.atan(c/d*Math.tan(f)):f>e.HALF_PI&&f<=3*e.HALF_PI?Math.atan(c/d*Math.tan(f))+e.PI:Math.atan(c/d*Math.tan(f))+e.TWO_PI,g=g<=e.HALF_PI?Math.atan(c/d*Math.tan(g)):g>e.HALF_PI&&g<=3*e.HALF_PI?Math.atan(c/d*Math.tan(g))+e.PI:Math.atan(c/d*Math.tan(g))+e.TWO_PI,f>g&&(g+=e.TWO_PI),c=Math.abs(c),d=Math.abs(d),this._renderer.arc(a,b,c,d,f,g,h),this},d.prototype.ellipse=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];if(3===a.length&&a.push(a[2]),a[2]<0&&(a[2]=Math.abs(a[2])),a[3]<0&&(a[3]=Math.abs(a[3])),!this._renderer._doStroke&&!this._renderer._doFill)return this;var c=f.modeAdjust(a[0],a[1],a[2],a[3],this._renderer._ellipseMode);return a[0]=c.x,a[1]=c.y,a[2]=c.w,a[3]=c.h,this._renderer.ellipse(a),this},d.prototype.line=function(){if(!this._renderer._doStroke)return this;for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];return this._renderer.isP3D?this._renderer.line(a[0],a[1],a[2],a[3],a[4],a[5]):this._renderer.line(a[0],a[1],a[2],a[3]),this},d.prototype.point=function(){if(!this._renderer._doStroke)return this;for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];return this._renderer.isP3D?this._renderer.point(a[0],a[1],a[2]):this._renderer.point(a[0],a[1]),this},d.prototype.quad=function(){if(!this._renderer._doStroke&&!this._renderer._doFill)return this;for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];return this._renderer.isP3D?this._renderer.quad(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11]):this._renderer.quad(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]),this},d.prototype.rect=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];if(this._renderer._doStroke||this._renderer._doFill){var c=f.modeAdjust(a[0],a[1],a[2],a[3],this._renderer._rectMode);return a[0]=c.x,a[1]=c.y,a[2]=c.w,a[3]=c.h,this._renderer.rect(a),this}},d.prototype.triangle=function(){if(!this._renderer._doStroke&&!this._renderer._doFill)return this;for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];return this._renderer.triangle(a),this},b.exports=d},{"./canvas":35,"./constants":36,"./core":37,"./error_helpers":40}],34:[function(a,b,c){"use strict";var d=a("./core"),e=a("./constants");d.prototype.ellipseMode=function(a){return(a===e.CORNER||a===e.CORNERS||a===e.RADIUS||a===e.CENTER)&&(this._renderer._ellipseMode=a),this},d.prototype.noSmooth=function(){return this._renderer.noSmooth(),this},d.prototype.rectMode=function(a){return(a===e.CORNER||a===e.CORNERS||a===e.RADIUS||a===e.CENTER)&&(this._renderer._rectMode=a),this},d.prototype.smooth=function(){return this._renderer.smooth(),this},d.prototype.strokeCap=function(a){return(a===e.ROUND||a===e.SQUARE||a===e.PROJECT)&&this._renderer.strokeCap(a),this},d.prototype.strokeJoin=function(a){return(a===e.ROUND||a===e.BEVEL||a===e.MITER)&&this._renderer.strokeJoin(a),this},d.prototype.strokeWeight=function(a){return this._renderer.strokeWeight(a),this},b.exports=d},{"./constants":36,"./core":37}],35:[function(a,b,c){var d=a("./constants");b.exports={modeAdjust:function(a,b,c,e,f){return f===d.CORNER?{x:a,y:b,w:c,h:e}:f===d.CORNERS?{x:a,y:b,w:c-a,h:e-b}:f===d.RADIUS?{x:a-c,y:b-e,w:2*c,h:2*e}:f===d.CENTER?{x:a-.5*c,y:b-.5*e,w:c,h:e}:void 0},arcModeAdjust:function(a,b,c,e,f){return f===d.CORNER?{x:a+.5*c,y:b+.5*e,w:c,h:e}:f===d.CORNERS?{x:a,y:b,w:c+a,h:e+b}:f===d.RADIUS?{x:a,y:b,w:2*c,h:2*e}:f===d.CENTER?{x:a,y:b,w:c,h:e}:void 0}}},{"./constants":36}],36:[function(a,b,c){var d=Math.PI;b.exports={P2D:"p2d",WEBGL:"webgl",ARROW:"default",CROSS:"crosshair",HAND:"pointer",MOVE:"move",TEXT:"text",WAIT:"wait",HALF_PI:d/2,PI:d,QUARTER_PI:d/4,TAU:2*d,TWO_PI:2*d,DEGREES:"degrees",RADIANS:"radians",CORNER:"corner",CORNERS:"corners",RADIUS:"radius",RIGHT:"right",LEFT:"left",CENTER:"center",TOP:"top",BOTTOM:"bottom",BASELINE:"alphabetic",POINTS:0,LINES:1,LINE_STRIP:3,LINE_LOOP:2,TRIANGLES:4,TRIANGLE_FAN:6,TRIANGLE_STRIP:5,QUADS:"quads",QUAD_STRIP:"quad_strip",CLOSE:"close",OPEN:"open",CHORD:"chord",PIE:"pie",PROJECT:"square",SQUARE:"butt",ROUND:"round",BEVEL:"bevel",MITER:"miter",RGB:"rgb",HSB:"hsb",HSL:"hsl",AUTO:"auto",ALT:18,BACKSPACE:8,CONTROL:17,DELETE:46,DOWN_ARROW:40,ENTER:13,ESCAPE:27,LEFT_ARROW:37,OPTION:18,RETURN:13,RIGHT_ARROW:39,SHIFT:16,TAB:9,UP_ARROW:38,BLEND:"normal",ADD:"lighter",DARKEST:"darken",LIGHTEST:"lighten",DIFFERENCE:"difference",EXCLUSION:"exclusion",MULTIPLY:"multiply",SCREEN:"screen",REPLACE:"source-over",OVERLAY:"overlay",HARD_LIGHT:"hard-light",SOFT_LIGHT:"soft-light",DODGE:"color-dodge",BURN:"color-burn",THRESHOLD:"threshold",GRAY:"gray",OPAQUE:"opaque",INVERT:"invert",POSTERIZE:"posterize",DILATE:"dilate",ERODE:"erode",BLUR:"blur",NORMAL:"normal",ITALIC:"italic",BOLD:"bold",_DEFAULT_TEXT_FILL:"#000000",_DEFAULT_LEADMULT:1.25,_CTX_MIDDLE:"middle",LINEAR:"linear",QUADRATIC:"quadratic",BEZIER:"bezier",CURVE:"curve",_DEFAULT_STROKE:"#000000",_DEFAULT_FILL:"#FFFFFF"}},{}],37:[function(a,b,c){"use strict";a("./shim");var d=a("./constants"),e=function(a,b,c){2===arguments.length&&"boolean"==typeof b&&(c=b,b=void 0),this._setupDone=!1,this._pixelDensity=Math.ceil(window.devicePixelRatio)||1,this._userNode=b,this._curElement=null,this._elements=[],this._requestAnimId=0,this._preloadCount=0,this._isGlobal=!1,this._loop=!0,this._styles=[],this._defaultCanvasSize={width:100,height:100},this._events={mousemove:null,mousedown:null,mouseup:null,dragend:null,dragover:null,click:null,mouseover:null,mouseout:null,keydown:null,keyup:null,keypress:null,touchstart:null,touchmove:null,touchend:null,resize:null,blur:null},this._events.wheel=null,this._loadingScreenId="p5_loading",window.DeviceOrientationEvent&&(this._events.deviceorientation=null),window.DeviceMotionEvent&&!window._isNodeWebkit&&(this._events.devicemotion=null),this._start=function(){this._userNode&&"string"==typeof this._userNode&&(this._userNode=document.getElementById(this._userNode)),this.createCanvas(this._defaultCanvasSize.width,this._defaultCanvasSize.height,"p2d",!0);var a=this.preload||window.preload;if(a){var b=document.getElementById(this._loadingScreenId);if(!b){b=document.createElement("div"),b.innerHTML="Loading...",b.style.position="absolute",b.id=this._loadingScreenId;var c=this._userNode||document.body;c.appendChild(b)}for(var d in this._preloadMethods){this._preloadMethods[d]=this._preloadMethods[d]||e;var f=this._preloadMethods[d];(f===e.prototype||f===e)&&(f=this._isGlobal?window:this),this._registeredPreloadMethods[d]=f[d],f[d]=this._wrapPreload(f,d)}a(),this._runIfPreloadsAreDone()}else this._setup(),this._runFrames(),this._draw()}.bind(this),this._runIfPreloadsAreDone=function(){var a=this._isGlobal?window:this;if(0===a._preloadCount){var b=document.getElementById(a._loadingScreenId);b&&b.parentNode.removeChild(b),a._setup(),a._runFrames(),a._draw()}},this._decrementPreload=function(){var a=this._isGlobal?window:this;a._setProperty("_preloadCount",a._preloadCount-1),a._runIfPreloadsAreDone()},this._wrapPreload=function(a,b){return function(){this._incrementPreload();for(var c=new Array(arguments.length),d=0;d<c.length;++d)c[d]=arguments[d];return c.push(this._decrementPreload.bind(this)),this._registeredPreloadMethods[b].apply(a,c)}.bind(this)},this._incrementPreload=function(){var a=this._isGlobal?window:this;a._setProperty("_preloadCount",a._preloadCount+1)},this._setup=function(){var a=this._isGlobal?window:this;if("function"==typeof a.preload)for(var b in this._preloadMethods)a[b]=this._preloadMethods[b][b],a[b]&&this&&(a[b]=a[b].bind(this));"function"==typeof a.setup&&a.setup();for(var c=document.getElementsByTagName("canvas"),d=0;d<c.length;d++){var e=c[d];"true"===e.dataset.hidden&&(e.style.visibility="",delete e.dataset.hidden)}this._setupDone=!0}.bind(this),this._draw=function(){var a=window.performance.now(),b=a-this._lastFrameTime,c=1e3/this._targetFrameRate,d=5;(!this._loop||b>=c-d)&&(this._setProperty("frameCount",this.frameCount+1),this.redraw(),this._updateMouseCoords(),this._updateTouchCoords(),this._frameRate=1e3/(a-this._lastFrameTime),this._lastFrameTime=a),this._loop&&(this._requestAnimId=window.requestAnimationFrame(this._draw))}.bind(this),this._runFrames=function(){this._updateInterval&&clearInterval(this._updateInterval)}.bind(this),this._setProperty=function(a,b){this[a]=b,this._isGlobal&&(window[a]=b)}.bind(this),this.remove=function(){if(this._curElement){this._loop=!1,this._requestAnimId&&window.cancelAnimationFrame(this._requestAnimId);for(var a in this._events)window.removeEventListener(a,this._events[a]);for(var b=0;b<this._elements.length;b++){var c=this._elements[b];c.elt.parentNode&&c.elt.parentNode.removeChild(c.elt);for(var d in c._events)c.elt.removeEventListener(d,c._events[d])}var f=this;if(this._registeredMethods.remove.forEach(function(a){"undefined"!=typeof a&&a.call(f)}),this._isGlobal){for(var g in e.prototype)try{delete window[g]}catch(h){window[g]=void 0}for(var i in this)if(this.hasOwnProperty(i))try{delete window[i]}catch(h){window[i]=void 0}}}}.bind(this),this._registeredMethods.init.forEach(function(a){"undefined"!=typeof a&&a.call(this)},this);var d=this._createFriendlyGlobalFunctionBinder();if(a)a(this);else{this._isGlobal=!0,e.instance=this;for(var f in e.prototype)if("function"==typeof e.prototype[f]){var g=f.substring(2);this._events.hasOwnProperty(g)||(Math.hasOwnProperty(f)&&Math[f]===e.prototype[f]?d(f,e.prototype[f]):d(f,e.prototype[f].bind(this)))}else d(f,e.prototype[f]);for(var h in this)this.hasOwnProperty(h)&&d(h,this[h])}for(var i in this._events){var j=this["_on"+i];if(j){var k=j.bind(this);window.addEventListener(i,k),this._events[i]=k}}var l=function(){this._setProperty("focused",!0)}.bind(this),m=function(){this._setProperty("focused",!1)}.bind(this);window.addEventListener("focus",l),window.addEventListener("blur",m),this.registerMethod("remove",function(){window.removeEventListener("focus",l),window.removeEventListener("blur",m)}),c?this._start():"complete"===document.readyState?this._start():window.addEventListener("load",this._start.bind(this),!1)};e.instance=null,e.disableFriendlyErrors=!1;for(var f in d)e.prototype[f]=d[f];e.prototype._preloadMethods={loadJSON:e.prototype,loadImage:e.prototype,loadStrings:e.prototype,loadXML:e.prototype,loadShape:e.prototype,loadTable:e.prototype,loadFont:e.prototype,loadModel:e.prototype},e.prototype._registeredMethods={init:[],pre:[],post:[],remove:[]},e.prototype._registeredPreloadMethods={},e.prototype.registerPreloadMethod=function(a,b){e.prototype._preloadMethods.hasOwnProperty(a)||(e.prototype._preloadMethods[a]=b)},e.prototype.registerMethod=function(a,b){e.prototype._registeredMethods.hasOwnProperty(a)||(e.prototype._registeredMethods[a]=[]),e.prototype._registeredMethods[a].push(b)},e.prototype._createFriendlyGlobalFunctionBinder=function(a){a=a||{};var b=a.globalObject||window,c=a.log||console.log.bind(console),d={print:!0};return function(a,f){if(!e.disableFriendlyErrors,1)b[a]=f;else try{if(a in b&&!(a in d))throw new Error('global "'+a+'" already exists');Object.defineProperty(b,a,{configurable:!0,enumerable:!0,get:function(){return f},set:function(d){Object.defineProperty(b,a,{configurable:!0,enumerable:!0,value:d,writable:!0}),c('You just changed the value of "'+a+"\", which was a p5 function. This could cause problems later if you're not careful.")}})}catch(g){c('p5 had problems creating the global function "'+a+'", possibly because your code is already using that name as a variable. You may want to rename your variable to something else.'),b[a]=f}}},b.exports=e},{"./constants":36,"./shim":46}],38:[function(a,b,c){"use strict";var d=a("./core");a("./error_helpers");var e=20,f=20;d.prototype.bezier=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];return this._renderer.isP3D?this._validateParameters("bezier",a,["Number","Number","Number","Number","Number","Number","Number","Number","Number","Number","Number","Number"]):this._validateParameters("bezier",a,["Number","Number","Number","Number","Number","Number","Number","Number"]),this._renderer._doStroke?(this._renderer.isP3D?(a.push(e),this._renderer.bezier(a)):this._renderer.bezier(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]),this):this},d.prototype.bezierDetail=function(a){return e=a,this},d.prototype.bezierPoint=function(a,b,c,d,e){var f=1-e;return Math.pow(f,3)*a+3*Math.pow(f,2)*e*b+3*f*Math.pow(e,2)*c+Math.pow(e,3)*d},d.prototype.bezierTangent=function(a,b,c,d,e){var f=1-e;return 3*d*Math.pow(e,2)-3*c*Math.pow(e,2)+6*c*f*e-6*b*f*e+3*b*Math.pow(f,2)-3*a*Math.pow(f,2)},d.prototype.curve=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];return this._renderer.isP3D?this._validateParameters("curve",a,["Number","Number","Number","Number","Number","Number","Number","Number","Number","Number","Number","Number"]):this._validateParameters("curve",a,["Number","Number","Number","Number","Number","Number","Number","Number"]),this._renderer._doStroke?(this._renderer.isP3D?(a.push(f),this._renderer.curve(a)):this._renderer.curve(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]),this):this},d.prototype.curveDetail=function(a){return f=a,this},d.prototype.curveTightness=function(a){this._renderer._curveTightness=a},d.prototype.curvePoint=function(a,b,c,d,e){var f=e*e*e,g=e*e,h=-.5*f+g-.5*e,i=1.5*f-2.5*g+1,j=-1.5*f+2*g+.5*e,k=.5*f-.5*g;return a*h+b*i+c*j+d*k},d.prototype.curveTangent=function(a,b,c,d,e){var f=e*e,g=-3*f/2+2*e-.5,h=9*f/2-5*e,i=-9*f/2+4*e+.5,j=3*f/2-e;return a*g+b*h+c*i+d*j},b.exports=d},{"./core":37,"./error_helpers":40}],39:[function(a,b,c){"use strict";function d(){return window.innerWidth||document.documentElement&&document.documentElement.clientWidth||document.body&&document.body.clientWidth||0}function e(){return window.innerHeight||document.documentElement&&document.documentElement.clientHeight||document.body&&document.body.clientHeight||0}function f(a){var b=document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled;if(!b)throw new Error("Fullscreen not enabled in this browser.");a.requestFullscreen?a.requestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullscreen?a.webkitRequestFullscreen():a.msRequestFullscreen&&a.msRequestFullscreen()}function g(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()}var h=a("./core"),i=a("./constants"),j=[i.ARROW,i.CROSS,i.HAND,i.MOVE,i.TEXT,i.WAIT];h.prototype._frameRate=0,h.prototype._lastFrameTime=window.performance.now(),h.prototype._targetFrameRate=60;var k=window.print;window.console&&console.log?h.prototype.print=function(a){try{if(0===arguments.length)k();else if(arguments.length>1)console.log.apply(console,arguments);else{var b=JSON.parse(JSON.stringify(a));console.log(b)}}catch(c){console.log(a)}}:h.prototype.print=function(){},h.prototype.frameCount=0,h.prototype.focused=document.hasFocus(),h.prototype.cursor=function(a,b,c){var d="auto",e=this._curElement.elt;if(j.indexOf(a)>-1)d=a;else if("string"==typeof a){var f="";b&&c&&"number"==typeof b&&"number"==typeof c&&(f=b+" "+c),d="http://"!==a.substring(0,6)?"url("+a+") "+f+", auto":/\.(cur|jpg|jpeg|gif|png|CUR|JPG|JPEG|GIF|PNG)$/.test(a)?"url("+a+") "+f+", auto":a}e.style.cursor=d},h.prototype.frameRate=function(a){return"number"!=typeof a||0>=a?this._frameRate:(this._setProperty("_targetFrameRate",a),this._runFrames(),this)},h.prototype.getFrameRate=function(){return this.frameRate()},h.prototype.setFrameRate=function(a){return this.frameRate(a)},h.prototype.noCursor=function(){this._curElement.elt.style.cursor="none"},h.prototype.displayWidth=screen.width,h.prototype.displayHeight=screen.height,h.prototype.windowWidth=d(),h.prototype.windowHeight=e(),h.prototype._onresize=function(a){this._setProperty("windowWidth",d()),this._setProperty("windowHeight",e());var b,c=this._isGlobal?window:this;"function"==typeof c.windowResized&&(b=c.windowResized(a),void 0===b||b||a.preventDefault())},h.prototype.width=0,h.prototype.height=0,h.prototype.fullscreen=function(a){return"undefined"==typeof a?document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement:void(a?f(document.documentElement):g())},h.prototype.pixelDensity=function(a){return"number"!=typeof a?this._pixelDensity:(this._pixelDensity=a,void this.resizeCanvas(this.width,this.height,!0))},h.prototype.displayDensity=function(){return window.devicePixelRatio},h.prototype.getURL=function(){return location.href},h.prototype.getURLPath=function(){return location.pathname.split("/").filter(function(a){return""!==a})},h.prototype.getURLParams=function(){for(var a,b=/[?&]([^&=]+)(?:[&=])([^&=]+)/gim,c={};null!=(a=b.exec(location.search));)a.index===b.lastIndex&&b.lastIndex++,c[a[1]]=a[2];return c},b.exports=h},{"./constants":36,"./core":37}],40:[function(a,b,c){"use strict";function d(a,b,c){if(a.match(/^p5\./)){var d=a.split(".");return c instanceof i[d[1]]}return"Boolean"===a||a.toLowerCase()===b||r.indexOf(a)>-1&&q(c)}function e(a,b,c){j&&(f(),j=!1),"undefined"===o(c)?c="#B40033":"number"===o(c)&&(c=w[c])}function f(){var a="transparent",b="#ED225D",c="#ED225D",d="white";console.log("%c    _ \n /\\| |/\\ \n \\ ` ' /  \n / , . \\  \n \\/|_|\\/ \n\n%c> p5.js says: Welcome! This is your friendly debugger. To turn me off switch to using “p5.min.js”.","background-color:"+a+";color:"+b+";","background-color:"+c+";color:"+d+";")}function g(){var b={},c=function(a){return Object.getOwnPropertyNames(a).filter(function(a){return"_"===a[0]?!1:a in b?!1:(b[a]=!0,!0)}).map(function(b){var c;return c="function"==typeof a[b]?"function":b===b.toUpperCase()?"constant":"variable",{name:b,type:c}})};y=[].concat(c(i.prototype),c(a("./constants"))),y.sort(function(a,b){return b.name.length-a.name.length})}function h(a,b){b||(b=console.log.bind(console)),y||g(),y.some(function(c){return a.message&&-1!==a.message.indexOf(c.name)?(b("%cDid you just try to use p5.js's "+c.name+("function"===c.type?"() ":" ")+c.type+"? If so, you may want to move it into your sketch's setup() function.\n\nFor more details, see: "+z,"color: #B40033"),!0):void 0})}for(var i=a("./core"),j=!1,k={},l=k.toString,m=["Boolean","Number","String","Function","Array","Date","RegExp","Object","Error"],n=0;n<m.length;n++)k["[object "+m[n]+"]"]=m[n].toLowerCase();var o=function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?k[l.call(a)]||"object":typeof a},p=Array.isArray||function(a){return"array"===o(a)},q=function(a){return!p(a)&&a-parseFloat(a)+1>=0},r=["Number","Integer","Number/Constant"],s=0,t=1,u=2,v=3,w=["#2D7BB6","#EE9900","#4DB200","#C83C00"];i.prototype._validateParameters=function(a,b,c){p(c[0])||(c=[c]);for(var f,g=Math.abs(b.length-c[0].length),h=0,i=1,j=c.length;j>i;i++){var k=Math.abs(b.length-c[i].length);g>=k&&(h=i,g=k)}var l="X";g>0&&(f="You wrote "+a+"(",b.length>0&&(f+=l+Array(b.length).join(","+l)),f+="). "+a+" was expecting "+c[h].length+" parameters. Try "+a+"(",c[h].length>0&&(f+=l+Array(c[h].length).join(","+l)),f+=").",c.length>1&&(f+=" "+a+" takes different numbers of parameters depending on what you want to do. Click this link to learn more: "),e(f,a,s));for(var m=0;m<c.length;m++)for(var n=0;n<c[m].length&&n<b.length;n++){var q=c[m][n],r=o(b[n]);"undefined"===r||null===r?e("It looks like "+a+" received an empty variable in spot #"+(n+1)+". If not intentional, this is often a problem with scope: [link to scope].",a,t):"*"===q||d(q,r,b[n])||(f=a+" was expecting a "+q.toLowerCase()+" for parameter #"+(n+1)+", received ",f+="string"===r?'"'+b[n]+'"':b[n],f+=" instead.",c.length>1&&(f+=" "+a+" takes different numbers of parameters depending on what you want to do. Click this link to learn more:"),e(f,a,u))}},i.prototype._validateParameters=function(){return!0};var x={0:{fileType:"image",method:"loadImage",message:" hosting the image online,"},1:{fileType:"XML file",method:"loadXML"},2:{fileType:"table file",method:"loadTable"},3:{fileType:"text file",method:"loadStrings"},4:{fileType:"font",method:"loadFont",message:" hosting the font online,"}};i._friendlyFileLoadError=function(a,b){var c=x[a],d="It looks like there was a problem loading your "+c.fileType+". Try checking if the file path%c ["+b+"] %cis correct,"+(c.message||"")+" or running a local server.";e(d,c.method,v)};var y=null,z="https://github.com/processing/p5.js/wiki/Frequently-Asked-Questions#why-cant-i-assign-variables-using-p5-functions-and-variables-before-setup";i.prototype._helpForMisusedAtTopLevelCode=h,"complete"!==document.readyState&&(window.addEventListener("error",h,!1),window.addEventListener("load",function(){window.removeEventListener("error",h,!1)})),b.exports=i},{"./constants":36,"./core":37}],41:[function(a,b,c){function d(a,b,c){var d=b.bind(c);c.elt.addEventListener(a,d,!1),c._events[a]=d}var e=a("./core");e.Element=function(a,b){this.elt=a,this._pInst=b,this._events={},this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight},e.Element.prototype.parent=function(a){return 0===arguments.length?this.elt.parentNode:("string"==typeof a?("#"===a[0]&&(a=a.substring(1)),a=document.getElementById(a)):a instanceof e.Element&&(a=a.elt),a.appendChild(this.elt),this)},e.Element.prototype.id=function(a){return 0===arguments.length?this.elt.id:(this.elt.id=a,this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight,this)},e.Element.prototype["class"]=function(a){return 0===arguments.length?this.elt.className:(this.elt.className=a,this)},e.Element.prototype.mousePressed=function(a){return d("mousedown",a,this),d("touchstart",a,this),this},e.Element.prototype.mouseWheel=function(a){return d("wheel",a,this),this},e.Element.prototype.mouseReleased=function(a){return d("mouseup",a,this),d("touchend",a,this),this},e.Element.prototype.mouseClicked=function(a){return d("click",a,this),this},e.Element.prototype.mouseMoved=function(a){return d("mousemove",a,this),d("touchmove",a,this),this},e.Element.prototype.mouseOver=function(a){return d("mouseover",a,this),this},e.Element.prototype.changed=function(a){return d("change",a,this),this},e.Element.prototype.input=function(a){return d("input",a,this),this},e.Element.prototype.mouseOut=function(a){return d("mouseout",a,this),this},e.Element.prototype.touchStarted=function(a){return d("touchstart",a,this),d("mousedown",a,this),this},e.Element.prototype.touchMoved=function(a){return d("touchmove",a,this),d("mousemove",a,this),this},e.Element.prototype.touchEnded=function(a){return d("touchend",a,this),d("mouseup",a,this),this},e.Element.prototype.dragOver=function(a){return d("dragover",a,this),this},e.Element.prototype.dragLeave=function(a){return d("dragleave",a,this),this},e.Element.prototype.drop=function(a,b){function c(b){var c=new e.File(b);return function(b){c.data=b.target.result,a(c)}}return window.File&&window.FileReader&&window.FileList&&window.Blob?(d("dragover",function(a){a.stopPropagation(),a.preventDefault()},this),d("dragleave",function(a){a.stopPropagation(),a.preventDefault()},this),arguments.length>1&&d("drop",b,this),d("drop",function(a){a.stopPropagation(),a.preventDefault();for(var b=a.dataTransfer.files,d=0;d<b.length;d++){var e=b[d],f=new FileReader;f.onload=c(e),e.type.indexOf("text")>-1?f.readAsText(e):f.readAsDataURL(e)}},this)):console.log("The File APIs are not fully supported in this browser."),this},e.Element.prototype._setProperty=function(a,b){this[a]=b},b.exports=e.Element},{"./core":37}],42:[function(a,b,c){var d=a("./core"),e=a("./constants");d.Graphics=function(a,b,c,f){var g=c||e.P2D,h=document.createElement("canvas"),i=this._userNode||document.body;i.appendChild(h),d.Element.call(this,h,f,!1),this._styles=[],this.width=a,this.height=b,this._pixelDensity=f._pixelDensity,g===e.WEBGL?this._renderer=new d.RendererGL(h,this,!1):this._renderer=new d.Renderer2D(h,this,!1),this._renderer.resize(a,b),this._renderer._applyDefaults(),f._elements.push(this);for(var j in d.prototype)this[j]||("function"==typeof d.prototype[j]?this[j]=d.prototype[j].bind(this):this[j]=d.prototype[j]);return this},d.Graphics.prototype=Object.create(d.Element.prototype),b.exports=d.Graphics},{"./constants":36,"./core":37}],43:[function(a,b,c){function d(a){var b=0,c=0;if(a.offsetParent){do b+=a.offsetLeft,c+=a.offsetTop;while(a=a.offsetParent)}else b+=a.offsetLeft,c+=a.offsetTop;return[b,c]}var e=a("./core"),f=a("../core/constants");e.Renderer=function(a,b,c){e.Element.call(this,a,b),this.canvas=a,this._pInst=b,c?(this._isMainCanvas=!0,this._pInst._setProperty("_curElement",this),this._pInst._setProperty("canvas",this.canvas),this._pInst._setProperty("width",this.width),this._pInst._setProperty("height",this.height)):(this.canvas.style.display="none",this._styles=[]),this._textSize=12,this._textLeading=15,this._textFont="sans-serif",this._textStyle=f.NORMAL,this._textAscent=null,this._textDescent=null,this._rectMode=f.CORNER,this._ellipseMode=f.CENTER,this._curveTightness=0,this._imageMode=f.CORNER,this._tint=null,this._doStroke=!0,this._doFill=!0,this._strokeSet=!1,this._fillSet=!1,this._colorMode=f.RGB,this._colorMaxes={rgb:[255,255,255,255],hsb:[360,100,100,1],hsl:[360,100,100,1]}},e.Renderer.prototype=Object.create(e.Element.prototype),e.Renderer.prototype.resize=function(a,b){this.width=a,this.height=b,this.elt.width=a*this._pInst._pixelDensity,this.elt.height=b*this._pInst._pixelDensity,this.elt.style.width=a+"px",this.elt.style.height=b+"px",this._isMainCanvas&&(this._pInst._setProperty("width",this.width),this._pInst._setProperty("height",this.height))},e.Renderer.prototype.textLeading=function(a){return arguments.length&&arguments[0]?(this._setProperty("_textLeading",a),this):this._textLeading},e.Renderer.prototype.textSize=function(a){return arguments.length&&arguments[0]?(this._setProperty("_textSize",a),this._setProperty("_textLeading",a*f._DEFAULT_LEADMULT),this._applyTextProperties()):this._textSize},e.Renderer.prototype.textStyle=function(a){return arguments.length&&arguments[0]?((a===f.NORMAL||a===f.ITALIC||a===f.BOLD)&&this._setProperty("_textStyle",a),this._applyTextProperties()):this._textStyle},e.Renderer.prototype.textAscent=function(){return null===this._textAscent&&this._updateTextMetrics(),this._textAscent},e.Renderer.prototype.textDescent=function(){return null===this._textDescent&&this._updateTextMetrics(),this._textDescent},e.Renderer.prototype._applyDefaults=function(){return this},e.Renderer.prototype._isOpenType=function(a){return a=a||this._textFont,"object"==typeof a&&a.font&&a.font.supported},e.Renderer.prototype._updateTextMetrics=function(){if(this._isOpenType())return this._setProperty("_textAscent",this._textFont._textAscent()),this._setProperty("_textDescent",this._textFont._textDescent()),this;var a=document.createElement("span");a.style.fontFamily=this._textFont,a.style.fontSize=this._textSize+"px",a.innerHTML="ABCjgq|";var b=document.createElement("div");b.style.display="inline-block",b.style.width="1px",b.style.height="0px";var c=document.createElement("div");c.appendChild(a),c.appendChild(b),c.style.height="0px",c.style.overflow="hidden",document.body.appendChild(c),b.style.verticalAlign="baseline";var e=d(b),f=d(a),g=e[1]-f[1];b.style.verticalAlign="bottom",e=d(b),f=d(a);var h=e[1]-f[1],i=h-g;
return document.body.removeChild(c),this._setProperty("_textAscent",g),this._setProperty("_textDescent",i),this},b.exports=e.Renderer},{"../core/constants":36,"./core":37}],44:[function(a,b,c){var d=a("./core"),e=a("./canvas"),f=a("./constants"),g=a("../image/filters");a("./p5.Renderer");var h="rgba(0,0,0,0)";d.Renderer2D=function(a,b,c){return d.Renderer.call(this,a,b,c),this.drawingContext=this.canvas.getContext("2d"),this._pInst._setProperty("drawingContext",this.drawingContext),this},d.Renderer2D.prototype=Object.create(d.Renderer.prototype),d.Renderer2D.prototype._applyDefaults=function(){this.drawingContext.fillStyle=f._DEFAULT_FILL,this.drawingContext.strokeStyle=f._DEFAULT_STROKE,this.drawingContext.lineCap=f.ROUND,this.drawingContext.font="normal 12px sans-serif"},d.Renderer2D.prototype.resize=function(a,b){d.Renderer.prototype.resize.call(this,a,b),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity)},d.Renderer2D.prototype.background=function(){if(this.drawingContext.save(),this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity),arguments[0]instanceof d.Image)this._pInst.image(arguments[0],0,0,this.width,this.height);else{var a=this.drawingContext.fillStyle,b=this._pInst.color.apply(this,arguments),c=b.toString();this.drawingContext.fillStyle=c,this.drawingContext.fillRect(0,0,this.width,this.height),this.drawingContext.fillStyle=a}this.drawingContext.restore()},d.Renderer2D.prototype.clear=function(){this.drawingContext.clearRect(0,0,this.width,this.height)},d.Renderer2D.prototype.fill=function(){var a=this.drawingContext,b=this._pInst.color.apply(this,arguments);a.fillStyle=b.toString()},d.Renderer2D.prototype.stroke=function(){var a=this.drawingContext,b=this._pInst.color.apply(this,arguments);a.strokeStyle=b.toString()},d.Renderer2D.prototype.image=function(a,b,c,e,f,g,h,i,j){var k;try{this._tint&&(d.MediaElement&&a instanceof d.MediaElement&&a.loadPixels(),a.canvas&&(k=this._getTintedImageCanvas(a))),k||(k=a.canvas||a.elt),this.drawingContext.drawImage(k,b,c,e,f,g,h,i,j)}catch(l){if("NS_ERROR_NOT_AVAILABLE"!==l.name)throw l}},d.Renderer2D.prototype._getTintedImageCanvas=function(a){if(!a.canvas)return a;var b=g._toPixels(a.canvas),c=document.createElement("canvas");c.width=a.canvas.width,c.height=a.canvas.height;for(var d=c.getContext("2d"),e=d.createImageData(a.canvas.width,a.canvas.height),f=e.data,h=0;h<b.length;h+=4){var i=b[h],j=b[h+1],k=b[h+2],l=b[h+3];f[h]=i*this._tint[0]/255,f[h+1]=j*this._tint[1]/255,f[h+2]=k*this._tint[2]/255,f[h+3]=l*this._tint[3]/255}return d.putImageData(e,0,0),c},d.Renderer2D.prototype.blendMode=function(a){this.drawingContext.globalCompositeOperation=a},d.Renderer2D.prototype.blend=function(){var a=this.drawingContext.globalCompositeOperation,b=arguments[arguments.length-1],c=Array.prototype.slice.call(arguments,0,arguments.length-1);this.drawingContext.globalCompositeOperation=b,this._pInst?this._pInst.copy.apply(this._pInst,c):this.copy.apply(this,c),this.drawingContext.globalCompositeOperation=a},d.Renderer2D.prototype.copy=function(){var a,b,c,e,f,g,h,i,j;if(9===arguments.length)a=arguments[0],b=arguments[1],c=arguments[2],e=arguments[3],f=arguments[4],g=arguments[5],h=arguments[6],i=arguments[7],j=arguments[8];else{if(8!==arguments.length)throw new Error("Signature not supported");a=this._pInst,b=arguments[0],c=arguments[1],e=arguments[2],f=arguments[3],g=arguments[4],h=arguments[5],i=arguments[6],j=arguments[7]}d.Renderer2D._copyHelper(a,b,c,e,f,g,h,i,j)},d.Renderer2D._copyHelper=function(a,b,c,d,e,f,g,h,i){a.canvas||a.loadPixels();var j=a.canvas.width/a.width;this.drawingContext.drawImage(a.canvas,j*b,j*c,j*d,j*e,f,g,h,i)},d.Renderer2D.prototype.get=function(a,b,c,e){if(void 0===a&&void 0===b&&void 0===c&&void 0===e?(a=0,b=0,c=this.width,e=this.height):void 0===c&&void 0===e&&(c=1,e=1),0>a+c||0>b+e||a>this.width||b>this.height)return[0,0,0,255];var f=this._pInst||this,g=f._pixelDensity;a=Math.floor(a),b=Math.floor(b);var h=a*g,i=b*g;if(1===c&&1===e){var j=this.drawingContext.getImageData(h,i,1,1).data;return[j[0],j[1],j[2],j[3]]}var k=Math.min(c,f.width),l=Math.min(e,f.height),m=k*g,n=l*g,o=new d.Image(k,l);return o.canvas.getContext("2d").drawImage(this.canvas,h,i,m,n,0,0,k,l),o},d.Renderer2D.prototype.loadPixels=function(){var a=this._pixelDensity||this._pInst._pixelDensity,b=this.width*a,c=this.height*a,d=this.drawingContext.getImageData(0,0,b,c);this._pInst?(this._pInst._setProperty("imageData",d),this._pInst._setProperty("pixels",d.data)):(this._setProperty("imageData",d),this._setProperty("pixels",d.data))},d.Renderer2D.prototype.set=function(a,b,c){if(a=Math.floor(a),b=Math.floor(b),c instanceof d.Image)this.drawingContext.save(),this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity),this.drawingContext.drawImage(c.canvas,a,b),this.loadPixels.call(this._pInst),this.drawingContext.restore();else{var e=this._pInst||this,f=0,g=0,h=0,i=0,j=4*(b*e._pixelDensity*this.width*e._pixelDensity+a*e._pixelDensity);if(e.imageData||e.loadPixels.call(e),"number"==typeof c)j<e.pixels.length&&(f=c,g=c,h=c,i=255);else if(c instanceof Array){if(c.length<4)throw new Error("pixel array must be of the form [R, G, B, A]");j<e.pixels.length&&(f=c[0],g=c[1],h=c[2],i=c[3])}else c instanceof d.Color&&j<e.pixels.length&&(f=c.levels[0],g=c.levels[1],h=c.levels[2],i=c.levels[3]);for(var k=0;k<e._pixelDensity;k++)for(var l=0;l<e._pixelDensity;l++)j=4*((b*e._pixelDensity+l)*this.width*e._pixelDensity+(a*e._pixelDensity+k)),e.pixels[j]=f,e.pixels[j+1]=g,e.pixels[j+2]=h,e.pixels[j+3]=i}},d.Renderer2D.prototype.updatePixels=function(a,b,c,d){var e=this._pixelDensity||this._pInst._pixelDensity;void 0===a&&void 0===b&&void 0===c&&void 0===d&&(a=0,b=0,c=this.width,d=this.height),c*=e,d*=e,this._pInst?this.drawingContext.putImageData(this._pInst.imageData,a,b,0,0,c,d):this.drawingContext.putImageData(this.imageData,a,b,0,0,c,d)},d.Renderer2D.prototype._acuteArcToBezier=function(a,b){var c=b/2,d=Math.cos(c),e=Math.sin(c),f=1/Math.tan(c),g=a+c,h=Math.cos(g),i=Math.sin(g),j=(4-d)/3,k=e+(d-j)*f;return{ax:Math.cos(a),ay:Math.sin(a),bx:j*h+k*i,by:j*i-k*h,cx:j*h-k*i,cy:j*i+k*h,dx:Math.cos(a+b),dy:Math.sin(a+b)}},d.Renderer2D.prototype.arc=function(a,b,c,d,g,h,i){for(var j=this.drawingContext,k=e.arcModeAdjust(a,b,c,d,this._ellipseMode),l=k.w/2,m=k.h/2,n=1e-5,o=0,p=[];h-g>n;)o=Math.min(h-g,f.HALF_PI),p.push(this._acuteArcToBezier(g,o)),g+=o;return this._doFill&&(j.beginPath(),p.forEach(function(a,b){0===b&&j.moveTo(k.x+a.ax*l,k.y+a.ay*m),j.bezierCurveTo(k.x+a.bx*l,k.y+a.by*m,k.x+a.cx*l,k.y+a.cy*m,k.x+a.dx*l,k.y+a.dy*m)}),(i===f.PIE||null==i)&&j.lineTo(k.x,k.y),j.closePath(),j.fill()),this._doStroke&&(j.beginPath(),p.forEach(function(a,b){0===b&&j.moveTo(k.x+a.ax*l,k.y+a.ay*m),j.bezierCurveTo(k.x+a.bx*l,k.y+a.by*m,k.x+a.cx*l,k.y+a.cy*m,k.x+a.dx*l,k.y+a.dy*m)}),i===f.PIE?(j.lineTo(k.x,k.y),j.closePath()):i===f.CHORD&&j.closePath(),j.stroke()),this},d.Renderer2D.prototype.ellipse=function(a){var b=this.drawingContext,c=this._doFill,d=this._doStroke,e=a[0],f=a[1],g=a[2],i=a[3];if(c&&!d){if(b.fillStyle===h)return this}else if(!c&&d&&b.strokeStyle===h)return this;var j=.5522847498,k=g/2*j,l=i/2*j,m=e+g,n=f+i,o=e+g/2,p=f+i/2;b.beginPath(),b.moveTo(e,p),b.bezierCurveTo(e,p-l,o-k,f,o,f),b.bezierCurveTo(o+k,f,m,p-l,m,p),b.bezierCurveTo(m,p+l,o+k,n,o,n),b.bezierCurveTo(o-k,n,e,p+l,e,p),b.closePath(),c&&b.fill(),d&&b.stroke()},d.Renderer2D.prototype.line=function(a,b,c,d){var e=this.drawingContext;return this._doStroke?e.strokeStyle===h?this:(e.lineWidth%2===1&&e.translate(.5,.5),e.beginPath(),e.moveTo(a,b),e.lineTo(c,d),e.stroke(),e.lineWidth%2===1&&e.translate(-.5,-.5),this):this},d.Renderer2D.prototype.point=function(a,b){var c=this.drawingContext,d=c.strokeStyle,e=c.fillStyle;return this._doStroke?c.strokeStyle===h?this:(a=Math.round(a),b=Math.round(b),c.fillStyle=d,c.lineWidth>1?(c.beginPath(),c.arc(a,b,c.lineWidth/2,0,f.TWO_PI,!1),c.fill()):c.fillRect(a,b,1,1),void(c.fillStyle=e)):this},d.Renderer2D.prototype.quad=function(a,b,c,d,e,f,g,i){var j=this.drawingContext,k=this._doFill,l=this._doStroke;if(k&&!l){if(j.fillStyle===h)return this}else if(!k&&l&&j.strokeStyle===h)return this;return j.beginPath(),j.moveTo(a,b),j.lineTo(c,d),j.lineTo(e,f),j.lineTo(g,i),j.closePath(),k&&j.fill(),l&&j.stroke(),this},d.Renderer2D.prototype.rect=function(a){var b=a[0],c=a[1],d=a[2],e=a[3],f=a[4],g=a[5],i=a[6],j=a[7],k=this.drawingContext,l=this._doFill,m=this._doStroke;if(l&&!m){if(k.fillStyle===h)return this}else if(!l&&m&&k.strokeStyle===h)return this;if(this._doStroke&&k.lineWidth%2===1&&k.translate(.5,.5),k.beginPath(),"undefined"==typeof f)k.rect(b,c,d,e);else{"undefined"==typeof g&&(g=f),"undefined"==typeof i&&(i=g),"undefined"==typeof j&&(j=i);var n=d/2,o=e/2;2*f>d&&(f=n),2*f>e&&(f=o),2*g>d&&(g=n),2*g>e&&(g=o),2*i>d&&(i=n),2*i>e&&(i=o),2*j>d&&(j=n),2*j>e&&(j=o),k.beginPath(),k.moveTo(b+f,c),k.arcTo(b+d,c,b+d,c+e,g),k.arcTo(b+d,c+e,b,c+e,i),k.arcTo(b,c+e,b,c,j),k.arcTo(b,c,b+d,c,f),k.closePath()}return this._doFill&&k.fill(),this._doStroke&&k.stroke(),this._doStroke&&k.lineWidth%2===1&&k.translate(-.5,-.5),this},d.Renderer2D.prototype.triangle=function(a){var b=this.drawingContext,c=this._doFill,d=this._doStroke,e=a[0],f=a[1],g=a[2],i=a[3],j=a[4],k=a[5];if(c&&!d){if(b.fillStyle===h)return this}else if(!c&&d&&b.strokeStyle===h)return this;b.beginPath(),b.moveTo(e,f),b.lineTo(g,i),b.lineTo(j,k),b.closePath(),c&&b.fill(),d&&b.stroke()},d.Renderer2D.prototype.endShape=function(a,b,c,d,e,g,h){if(0===b.length)return this;if(!this._doStroke&&!this._doFill)return this;var i,j=a===f.CLOSE;j&&!g&&b.push(b[0]);var k,l,m=b.length;if(!c||h!==f.POLYGON&&null!==h)if(!d||h!==f.POLYGON&&null!==h)if(!e||h!==f.POLYGON&&null!==h)if(h===f.POINTS)for(k=0;m>k;k++)i=b[k],this._doStroke&&this._pInst.stroke(i[6]),this._pInst.point(i[0],i[1]);else if(h===f.LINES)for(k=0;m>k+1;k+=2)i=b[k],this._doStroke&&this._pInst.stroke(b[k+1][6]),this._pInst.line(i[0],i[1],b[k+1][0],b[k+1][1]);else if(h===f.TRIANGLES)for(k=0;m>k+2;k+=3)i=b[k],this.drawingContext.beginPath(),this.drawingContext.moveTo(i[0],i[1]),this.drawingContext.lineTo(b[k+1][0],b[k+1][1]),this.drawingContext.lineTo(b[k+2][0],b[k+2][1]),this.drawingContext.lineTo(i[0],i[1]),this._doFill&&(this._pInst.fill(b[k+2][5]),this.drawingContext.fill()),this._doStroke&&(this._pInst.stroke(b[k+2][6]),this.drawingContext.stroke()),this.drawingContext.closePath();else if(h===f.TRIANGLE_STRIP)for(k=0;m>k+1;k++)i=b[k],this.drawingContext.beginPath(),this.drawingContext.moveTo(b[k+1][0],b[k+1][1]),this.drawingContext.lineTo(i[0],i[1]),this._doStroke&&this._pInst.stroke(b[k+1][6]),this._doFill&&this._pInst.fill(b[k+1][5]),m>k+2&&(this.drawingContext.lineTo(b[k+2][0],b[k+2][1]),this._doStroke&&this._pInst.stroke(b[k+2][6]),this._doFill&&this._pInst.fill(b[k+2][5])),this._doFillStrokeClose();else if(h===f.TRIANGLE_FAN){if(m>2)for(this.drawingContext.beginPath(),this.drawingContext.moveTo(b[0][0],b[0][1]),this.drawingContext.lineTo(b[1][0],b[1][1]),this.drawingContext.lineTo(b[2][0],b[2][1]),this._doFill&&this._pInst.fill(b[2][5]),this._doStroke&&this._pInst.stroke(b[2][6]),this._doFillStrokeClose(),k=3;m>k;k++)i=b[k],this.drawingContext.beginPath(),this.drawingContext.moveTo(b[0][0],b[0][1]),this.drawingContext.lineTo(b[k-1][0],b[k-1][1]),this.drawingContext.lineTo(i[0],i[1]),this._doFill&&this._pInst.fill(i[5]),this._doStroke&&this._pInst.stroke(i[6]),this._doFillStrokeClose()}else if(h===f.QUADS)for(k=0;m>k+3;k+=4){for(i=b[k],this.drawingContext.beginPath(),this.drawingContext.moveTo(i[0],i[1]),l=1;4>l;l++)this.drawingContext.lineTo(b[k+l][0],b[k+l][1]);this.drawingContext.lineTo(i[0],i[1]),this._doFill&&this._pInst.fill(b[k+3][5]),this._doStroke&&this._pInst.stroke(b[k+3][6]),this._doFillStrokeClose()}else if(h===f.QUAD_STRIP){if(m>3)for(k=0;m>k+1;k+=2)i=b[k],this.drawingContext.beginPath(),m>k+3?(this.drawingContext.moveTo(b[k+2][0],b[k+2][1]),this.drawingContext.lineTo(i[0],i[1]),this.drawingContext.lineTo(b[k+1][0],b[k+1][1]),this.drawingContext.lineTo(b[k+3][0],b[k+3][1]),this._doFill&&this._pInst.fill(b[k+3][5]),this._doStroke&&this._pInst.stroke(b[k+3][6])):(this.drawingContext.moveTo(i[0],i[1]),this.drawingContext.lineTo(b[k+1][0],b[k+1][1])),this._doFillStrokeClose()}else{for(this.drawingContext.beginPath(),this.drawingContext.moveTo(b[0][0],b[0][1]),k=1;m>k;k++)i=b[k],i.isVert&&(i.moveTo?this.drawingContext.moveTo(i[0],i[1]):this.drawingContext.lineTo(i[0],i[1]));this._doFillStrokeClose()}else{for(this.drawingContext.beginPath(),k=0;m>k;k++)b[k].isVert?b[k].moveTo?this.drawingContext.moveTo([0],b[k][1]):this.drawingContext.lineTo(b[k][0],b[k][1]):this.drawingContext.quadraticCurveTo(b[k][0],b[k][1],b[k][2],b[k][3]);this._doFillStrokeClose()}else{for(this.drawingContext.beginPath(),k=0;m>k;k++)b[k].isVert?b[k].moveTo?this.drawingContext.moveTo(b[k][0],b[k][1]):this.drawingContext.lineTo(b[k][0],b[k][1]):this.drawingContext.bezierCurveTo(b[k][0],b[k][1],b[k][2],b[k][3],b[k][4],b[k][5]);this._doFillStrokeClose()}else if(m>3){var n=[],o=1-this._curveTightness;for(this.drawingContext.beginPath(),this.drawingContext.moveTo(b[1][0],b[1][1]),k=1;m>k+2;k++)i=b[k],n[0]=[i[0],i[1]],n[1]=[i[0]+(o*b[k+1][0]-o*b[k-1][0])/6,i[1]+(o*b[k+1][1]-o*b[k-1][1])/6],n[2]=[b[k+1][0]+(o*b[k][0]-o*b[k+2][0])/6,b[k+1][1]+(o*b[k][1]-o*b[k+2][1])/6],n[3]=[b[k+1][0],b[k+1][1]],this.drawingContext.bezierCurveTo(n[1][0],n[1][1],n[2][0],n[2][1],n[3][0],n[3][1]);j&&this.drawingContext.lineTo(b[k+1][0],b[k+1][1]),this._doFillStrokeClose()}return c=!1,d=!1,e=!1,g=!1,j&&b.pop(),this},d.Renderer2D.prototype.noSmooth=function(){return"imageSmoothingEnabled"in this.drawingContext?this.drawingContext.imageSmoothingEnabled=!1:"mozImageSmoothingEnabled"in this.drawingContext?this.drawingContext.mozImageSmoothingEnabled=!1:"webkitImageSmoothingEnabled"in this.drawingContext?this.drawingContext.webkitImageSmoothingEnabled=!1:"msImageSmoothingEnabled"in this.drawingContext&&(this.drawingContext.msImageSmoothingEnabled=!1),this},d.Renderer2D.prototype.smooth=function(){return"imageSmoothingEnabled"in this.drawingContext?this.drawingContext.imageSmoothingEnabled=!0:"mozImageSmoothingEnabled"in this.drawingContext?this.drawingContext.mozImageSmoothingEnabled=!0:"webkitImageSmoothingEnabled"in this.drawingContext?this.drawingContext.webkitImageSmoothingEnabled=!0:"msImageSmoothingEnabled"in this.drawingContext&&(this.drawingContext.msImageSmoothingEnabled=!0),this},d.Renderer2D.prototype.strokeCap=function(a){return(a===f.ROUND||a===f.SQUARE||a===f.PROJECT)&&(this.drawingContext.lineCap=a),this},d.Renderer2D.prototype.strokeJoin=function(a){return(a===f.ROUND||a===f.BEVEL||a===f.MITER)&&(this.drawingContext.lineJoin=a),this},d.Renderer2D.prototype.strokeWeight=function(a){return"undefined"==typeof a||0===a?this.drawingContext.lineWidth=1e-4:this.drawingContext.lineWidth=a,this},d.Renderer2D.prototype._getFill=function(){return this.drawingContext.fillStyle},d.Renderer2D.prototype._getStroke=function(){return this.drawingContext.strokeStyle},d.Renderer2D.prototype.bezier=function(a,b,c,d,e,f,g,h){return this._pInst.beginShape(),this._pInst.vertex(a,b),this._pInst.bezierVertex(c,d,e,f,g,h),this._pInst.endShape(),this},d.Renderer2D.prototype.curve=function(a,b,c,d,e,f,g,h){return this._pInst.beginShape(),this._pInst.curveVertex(a,b),this._pInst.curveVertex(c,d),this._pInst.curveVertex(e,f),this._pInst.curveVertex(g,h),this._pInst.endShape(),this},d.Renderer2D.prototype._doFillStrokeClose=function(){this._doFill&&this.drawingContext.fill(),this._doStroke&&this.drawingContext.stroke(),this.drawingContext.closePath()},d.Renderer2D.prototype.applyMatrix=function(a,b,c,d,e,f){this.drawingContext.transform(a,b,c,d,e,f)},d.Renderer2D.prototype.resetMatrix=function(){return this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity),this},d.Renderer2D.prototype.rotate=function(a){this.drawingContext.rotate(a)},d.Renderer2D.prototype.scale=function(a,b){return this.drawingContext.scale(a,b),this},d.Renderer2D.prototype.shearX=function(a){return this._pInst._angleMode===f.DEGREES&&(a=this._pInst.degrees(a)),this.drawingContext.transform(1,0,this._pInst.tan(a),1,0,0),this},d.Renderer2D.prototype.shearY=function(a){return this._pInst._angleMode===f.DEGREES&&(a=this._pInst.degrees(a)),this.drawingContext.transform(1,this._pInst.tan(a),0,1,0,0),this},d.Renderer2D.prototype.translate=function(a,b){return this.drawingContext.translate(a,b),this},d.Renderer2D.prototype.text=function(a,b,c,d,e){var g,h,i,j,k,l,m,n,o,p,q=this._pInst,r=Number.MAX_VALUE;if(this._doFill||this._doStroke){if("string"!=typeof a&&(a=a.toString()),a=a.replace(/(\t)/g,"  "),g=a.split("\n"),"undefined"!=typeof d){for(o=0,i=0;i<g.length;i++)for(k="",n=g[i].split(" "),h=0;h<n.length;h++)l=k+n[h]+" ",m=this.textWidth(l),m>d?(k=n[h]+" ",o+=q.textLeading()):k=l;switch(this._rectMode===f.CENTER&&(b-=d/2,c-=e/2),this.drawingContext.textAlign){case f.CENTER:b+=d/2;break;case f.RIGHT:b+=d}if("undefined"!=typeof e){switch(this.drawingContext.textBaseline){case f.BOTTOM:c+=e-o;break;case f._CTX_MIDDLE:c+=(e-o)/2;break;case f.BASELINE:p=!0,this.drawingContext.textBaseline=f.TOP}r=c+e-q.textAscent()}for(i=0;i<g.length;i++){for(k="",n=g[i].split(" "),h=0;h<n.length;h++)l=k+n[h]+" ",m=this.textWidth(l),m>d&&k.length>0?(this._renderText(q,k,b,c,r),k=n[h]+" ",c+=q.textLeading()):k=l;this._renderText(q,k,b,c,r),c+=q.textLeading()}}else{var s=0,t=q.textAlign().vertical;for(t===f.CENTER?s=(g.length-1)*q.textLeading()/2:t===f.BOTTOM&&(s=(g.length-1)*q.textLeading()),j=0;j<g.length;j++)this._renderText(q,g[j],b,c-s,r),c+=q.textLeading()}return p&&(this.drawingContext.textBaseline=f.BASELINE),q}},d.Renderer2D.prototype._renderText=function(a,b,c,d,e){return d>=e?void 0:(a.push(),this._isOpenType()?this._textFont._renderPath(b,c,d,{renderer:this}):(this._doStroke&&this._strokeSet&&this.drawingContext.strokeText(b,c,d),this._doFill&&(this.drawingContext.fillStyle=this._fillSet?this.drawingContext.fillStyle:f._DEFAULT_TEXT_FILL,this.drawingContext.fillText(b,c,d))),a.pop(),a)},d.Renderer2D.prototype.textWidth=function(a){return this._isOpenType()?this._textFont._textWidth(a,this._textSize):this.drawingContext.measureText(a).width},d.Renderer2D.prototype.textAlign=function(a,b){if(arguments.length)return(a===f.LEFT||a===f.RIGHT||a===f.CENTER)&&(this.drawingContext.textAlign=a),(b===f.TOP||b===f.BOTTOM||b===f.CENTER||b===f.BASELINE)&&(b===f.CENTER?this.drawingContext.textBaseline=f._CTX_MIDDLE:this.drawingContext.textBaseline=b),this._pInst;var c=this.drawingContext.textBaseline;return c===f._CTX_MIDDLE&&(c=f.CENTER),{horizontal:this.drawingContext.textAlign,vertical:c}},d.Renderer2D.prototype._applyTextProperties=function(){var a,b=this._pInst;return this._setProperty("_textAscent",null),this._setProperty("_textDescent",null),a=this._textFont,this._isOpenType()&&(a=this._textFont.font.familyName,this._setProperty("_textStyle",this._textFont.font.styleName)),this.drawingContext.font=this._textStyle+" "+this._textSize+"px "+a,b},d.Renderer2D.prototype.push=function(){this.drawingContext.save()},d.Renderer2D.prototype.pop=function(){this.drawingContext.restore()},b.exports=d.Renderer2D},{"../image/filters":54,"./canvas":35,"./constants":36,"./core":37,"./p5.Renderer":43}],45:[function(a,b,c){var d=a("./core"),e=a("./constants");a("./p5.Graphics"),a("./p5.Renderer2D"),a("../webgl/p5.RendererGL");var f="defaultCanvas0";d.prototype.createCanvas=function(a,b,c){var g,h,i=c||e.P2D;if(arguments[3]&&(g="boolean"==typeof arguments[3]?arguments[3]:!1),i===e.WEBGL)h=document.getElementById(f),h&&h.parentNode.removeChild(h),h=document.createElement("canvas"),h.id=f;else if(g){h=document.createElement("canvas");for(var j=0;document.getElementById("defaultCanvas"+j);)j++;f="defaultCanvas"+j,h.id=f}else h=this.canvas;return this._setupDone||(h.dataset.hidden=!0,h.style.visibility="hidden"),this._userNode?this._userNode.appendChild(h):document.body.appendChild(h),i===e.WEBGL?(this._setProperty("_renderer",new d.RendererGL(h,this,!0)),this._isdefaultGraphics=!0):this._isdefaultGraphics||(this._setProperty("_renderer",new d.Renderer2D(h,this,!0)),this._isdefaultGraphics=!0),this._renderer.resize(a,b),this._renderer._applyDefaults(),g&&this._elements.push(this._renderer),this._renderer},d.prototype.resizeCanvas=function(a,b,c){if(this._renderer){var d={};for(var e in this.drawingContext){var f=this.drawingContext[e];"object"!=typeof f&&"function"!=typeof f&&(d[e]=f)}this._renderer.resize(a,b);for(var g in d)this.drawingContext[g]=d[g];c||this.redraw()}},d.prototype.noCanvas=function(){this.canvas&&this.canvas.parentNode.removeChild(this.canvas)},d.prototype.createGraphics=function(a,b,c){return new d.Graphics(a,b,c,this)},d.prototype.blendMode=function(a){if(a!==e.BLEND&&a!==e.DARKEST&&a!==e.LIGHTEST&&a!==e.DIFFERENCE&&a!==e.MULTIPLY&&a!==e.EXCLUSION&&a!==e.SCREEN&&a!==e.REPLACE&&a!==e.OVERLAY&&a!==e.HARD_LIGHT&&a!==e.SOFT_LIGHT&&a!==e.DODGE&&a!==e.BURN&&a!==e.ADD&&a!==e.NORMAL)throw new Error("Mode "+a+" not recognized.");this._renderer.blendMode(a)},b.exports=d},{"../webgl/p5.RendererGL":86,"./constants":36,"./core":37,"./p5.Graphics":42,"./p5.Renderer2D":44}],46:[function(a,b,c){window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a,b){window.setTimeout(a,1e3/60)}}(),window.performance=window.performance||{},window.performance.now=function(){var a=Date.now();return window.performance.now||window.performance.mozNow||window.performance.msNow||window.performance.oNow||window.performance.webkitNow||function(){return Date.now()-a}}(),function(){"use strict";"undefined"==typeof Uint8ClampedArray||Uint8ClampedArray.prototype.slice||Object.defineProperty(Uint8ClampedArray.prototype,"slice",{value:Array.prototype.slice,writable:!0,configurable:!0,enumerable:!1})}()},{}],47:[function(a,b,c){"use strict";var d=a("./core");d.prototype.exit=function(){throw"exit() not implemented, see remove()"},d.prototype.noLoop=function(){this._loop=!1},d.prototype.loop=function(){this._loop=!0,this._draw()},d.prototype.push=function(){this._renderer.push(),this._styles.push({_doStroke:this._renderer._doStroke,_strokeSet:this._renderer._strokeSet,_doFill:this._renderer._doFill,_fillSet:this._renderer._fillSet,_tint:this._renderer._tint,_imageMode:this._renderer._imageMode,_rectMode:this._renderer._rectMode,_ellipseMode:this._renderer._ellipseMode,_colorMode:this._renderer._colorMode,_textFont:this._renderer._textFont,_textLeading:this._renderer._textLeading,_textSize:this._renderer._textSize,_textStyle:this._renderer._textStyle})},d.prototype.pop=function(){this._renderer.pop();var a=this._styles.pop();for(var b in a)this._renderer[b]=a[b]},d.prototype.pushStyle=function(){throw new Error("pushStyle() not used, see push()")},d.prototype.popStyle=function(){throw new Error("popStyle() not used, see pop()")},d.prototype.redraw=function(){this.resetMatrix(),this._renderer.isP3D&&this._renderer._update();var a=1;if(1===arguments.length)try{parseInt(arguments[0])>1&&(a=parseInt(arguments[0]))}catch(b){}var c=this.setup||window.setup,d=this.draw||window.draw;if("function"==typeof d){"undefined"==typeof c&&this.scale(this._pixelDensity,this._pixelDensity);for(var e=this,f=function(a){a.call(e)},g=0;a>g;g++)this._registeredMethods.pre.forEach(f),d(),this._registeredMethods.post.forEach(f)}},d.prototype.size=function(){var a="size() is not a valid p5 function, to set the size of the ";throw a+="drawing canvas, please use createCanvas() instead"},b.exports=d},{"./core":37}],48:[function(a,b,c){"use strict";var d=a("./core"),e=a("./constants");d.prototype.applyMatrix=function(a,b,c,d,e,f){return this._renderer.applyMatrix(a,b,c,d,e,f),this},d.prototype.popMatrix=function(){throw new Error("popMatrix() not used, see pop()")},d.prototype.printMatrix=function(){throw new Error("printMatrix() not implemented")},d.prototype.pushMatrix=function(){throw new Error("pushMatrix() not used, see push()")},d.prototype.resetMatrix=function(){return this._renderer.resetMatrix(),this},d.prototype.rotate=function(){for(var a,b=new Array(arguments.length),c=0;c<b.length;++c)b[c]=arguments[c];return this._angleMode===e.DEGREES?a=this.radians(b[0]):this._angleMode===e.RADIANS&&(a=b[0]),b.length>1?this._renderer.rotate(a,b[1]):this._renderer.rotate(a),this},d.prototype.rotateX=function(a){for(var b=new Array(arguments.length),c=0;c<b.length;++c)b[c]=arguments[c];if(!this._renderer.isP3D)throw"not supported in p2d. Please use webgl mode";return this._validateParameters("rotateX",b,[["Number"]]),this._renderer.rotateX(a),this},d.prototype.rotateY=function(a){if(!this._renderer.isP3D)throw"not supported in p2d. Please use webgl mode";for(var b=new Array(arguments.length),c=0;c<b.length;++c)b[c]=arguments[c];return this._validateParameters("rotateY",b,[["Number"]]),this._renderer.rotateY(a),this},d.prototype.rotateZ=function(a){if(!this._renderer.isP3D)throw"not supported in p2d. Please use webgl mode";for(var b=new Array(arguments.length),c=0;c<b.length;++c)b[c]=arguments[c];return this._validateParameters("rotateZ",b,[["Number"]]),this._renderer.rotateZ(a),this},d.prototype.scale=function(){for(var a,b,c,e=new Array(arguments.length),f=0;f<e.length;f++)e[f]=arguments[f];return e[0]instanceof d.Vector?(a=e[0].x,b=e[0].y,c=e[0].z):e[0]instanceof Array?(a=e[0][0],b=e[0][1],c=e[0][2]||1):1===e.length?a=b=c=e[0]:(a=e[0],b=e[1],c=e[2]||1),this._renderer.isP3D?this._renderer.scale.call(this._renderer,a,b,c):this._renderer.scale.call(this._renderer,a,b),this},d.prototype.shearX=function(a){return this._angleMode===e.DEGREES&&(a=this.radians(a)),this._renderer.shearX(a),this},d.prototype.shearY=function(a){return this._angleMode===e.DEGREES&&(a=this.radians(a)),this._renderer.shearY(a),this},d.prototype.translate=function(a,b,c){for(var d=new Array(arguments.length),e=0;e<d.length;++e)d[e]=arguments[e];return this._renderer.isP3D?(this._validateParameters("translate",d,[["Number","Number","Number"]]),this._renderer.translate(a,b,c)):(this._validateParameters("translate",d,[["Number","Number"]]),this._renderer.translate(a,b)),this},b.exports=d},{"./constants":36,"./core":37}],49:[function(a,b,c){"use strict";var d=a("./core"),e=a("./constants"),f=null,g=[],h=[],i=!1,j=!1,k=!1,l=!1,m=!0;d.prototype.beginContour=function(){return h=[],l=!0,this},d.prototype.beginShape=function(a){return f=a===e.POINTS||a===e.LINES||a===e.TRIANGLES||a===e.TRIANGLE_FAN||a===e.TRIANGLE_STRIP||a===e.QUADS||a===e.QUAD_STRIP?a:null,this._renderer.isP3D?this._renderer.beginShape(a):(g=[],h=[]),this},d.prototype.bezierVertex=function(a,b,c,d,e,f){if(0===g.length)throw"vertex() must be used once before calling bezierVertex()";i=!0;for(var j=[],k=0;k<arguments.length;k++)j[k]=arguments[k];return j.isVert=!1,l?h.push(j):g.push(j),this},d.prototype.curveVertex=function(a,b){return j=!0,this.vertex(a,b),this},d.prototype.endContour=function(){var a=h[0].slice();a.isVert=h[0].isVert,a.moveTo=!1,h.push(a),m&&(g.push(g[0]),m=!1);for(var b=0;b<h.length;b++)g.push(h[b]);return this},d.prototype.endShape=function(a){if(this._renderer.isP3D)this._renderer.endShape(a,j,i,k,l,f);else{if(0===g.length)return this;if(!this._renderer._doStroke&&!this._renderer._doFill)return this;var b=a===e.CLOSE;b&&!l&&g.push(g[0]),this._renderer.endShape(a,g,j,i,k,l,f),j=!1,i=!1,k=!1,l=!1,m=!0,b&&g.pop()}return this},d.prototype.quadraticVertex=function(a,b,c,d){if(this._contourInited){var f={};return f.x=a,f.y=b,f.x3=c,f.y3=d,f.type=e.QUADRATIC,this._contourVertices.push(f),this}if(!(g.length>0))throw"vertex() must be used once before calling quadraticVertex()";k=!0;for(var i=[],j=0;j<arguments.length;j++)i[j]=arguments[j];return i.isVert=!1,l?h.push(i):g.push(i),this},d.prototype.vertex=function(a,b,c){for(var d=new Array(arguments.length),e=0;e<d.length;++e)d[e]=arguments[e];if(this._renderer.isP3D)this._validateParameters("vertex",d,[["Number","Number","Number"]]),this._renderer.vertex(arguments[0],arguments[1],arguments[2]);else{this._validateParameters("vertex",d,[["Number","Number"],["Number","Number","Number"]]);var f=[];f.isVert=!0,f[0]=a,f[1]=b,f[2]=0,f[3]=0,f[4]=0,f[5]=this._renderer._getFill(),f[6]=this._renderer._getStroke(),c&&(f.moveTo=c),l?(0===h.length&&(f.moveTo=!0),h.push(f)):g.push(f)}return this},b.exports=d},{"./constants":36,"./core":37}],50:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.deviceOrientation=void 0,d.prototype.accelerationX=0,d.prototype.accelerationY=0,d.prototype.accelerationZ=0,d.prototype.pAccelerationX=0,d.prototype.pAccelerationY=0,d.prototype.pAccelerationZ=0,d.prototype._updatePAccelerations=function(){this._setProperty("pAccelerationX",this.accelerationX),this._setProperty("pAccelerationY",this.accelerationY),this._setProperty("pAccelerationZ",this.accelerationZ)},d.prototype.rotationX=0,d.prototype.rotationY=0,d.prototype.rotationZ=0,d.prototype.pRotationX=0,d.prototype.pRotationY=0,d.prototype.pRotationZ=0;var e,f,g,h=0,i=0,j=0,k="clockwise",l="clockwise",m="clockwise";d.prototype._updatePRotations=function(){this._setProperty("pRotationX",this.rotationX),this._setProperty("pRotationY",this.rotationY),this._setProperty("pRotationZ",this.rotationZ)},d.prototype.turnAxis=void 0;var n=.5,o=30;d.prototype.setMoveThreshold=function(a){"number"==typeof a&&(n=a)},d.prototype.setShakeThreshold=function(a){"number"==typeof a&&(o=a)},d.prototype._ondeviceorientation=function(a){this._updatePRotations(),this._setProperty("rotationX",a.beta),this._setProperty("rotationY",a.gamma),this._setProperty("rotationZ",a.alpha),this._handleMotion()},d.prototype._ondevicemotion=function(a){this._updatePAccelerations(),this._setProperty("accelerationX",2*a.acceleration.x),this._setProperty("accelerationY",2*a.acceleration.y),this._setProperty("accelerationZ",2*a.acceleration.z),this._handleMotion()},d.prototype._handleMotion=function(){90===window.orientation||-90===window.orientation?this._setProperty("deviceOrientation","landscape"):0===window.orientation?this._setProperty("deviceOrientation","portrait"):void 0===window.orientation&&this._setProperty("deviceOrientation","undefined");var a=this.deviceMoved||window.deviceMoved;"function"==typeof a&&(Math.abs(this.accelerationX-this.pAccelerationX)>n||Math.abs(this.accelerationY-this.pAccelerationY)>n||Math.abs(this.accelerationZ-this.pAccelerationZ)>n)&&a();var b=this.deviceTurned||window.deviceTurned;if("function"==typeof b){var c=this.rotationX+180,d=this.pRotationX+180,p=h+180;c-d>0&&270>c-d||-270>c-d?k="clockwise":(0>c-d||c-d>270)&&(k="counter-clockwise"),k!==e&&(p=c),Math.abs(c-p)>90&&Math.abs(c-p)<270&&(p=c,this._setProperty("turnAxis","X"),b()),e=k,h=p-180;var q=this.rotationY+180,r=this.pRotationY+180,s=i+180;q-r>0&&270>q-r||-270>q-r?l="clockwise":(0>q-r||q-this.pRotationY>270)&&(l="counter-clockwise"),l!==f&&(s=q),Math.abs(q-s)>90&&Math.abs(q-s)<270&&(s=q,this._setProperty("turnAxis","Y"),b()),f=l,i=s-180,this.rotationZ-this.pRotationZ>0&&this.rotationZ-this.pRotationZ<270||this.rotationZ-this.pRotationZ<-270?m="clockwise":(this.rotationZ-this.pRotationZ<0||this.rotationZ-this.pRotationZ>270)&&(m="counter-clockwise"),m!==g&&(j=this.rotationZ),Math.abs(this.rotationZ-j)>90&&Math.abs(this.rotationZ-j)<270&&(j=this.rotationZ,this._setProperty("turnAxis","Z"),b()),g=m,this._setProperty("turnAxis",void 0)}var t=this.deviceShaken||window.deviceShaken;if("function"==typeof t){var u,v;null!==this.pAccelerationX&&(u=Math.abs(this.accelerationX-this.pAccelerationX),v=Math.abs(this.accelerationY-this.pAccelerationY)),u+v>o&&t()}},b.exports=d},{"../core/core":37}],51:[function(a,b,c){"use strict";var d=a("../core/core"),e={};d.prototype.isKeyPressed=!1,
d.prototype.keyIsPressed=!1,d.prototype.key="",d.prototype.keyCode=0,d.prototype._onkeydown=function(a){if(!e[a.which]){this._setProperty("isKeyPressed",!0),this._setProperty("keyIsPressed",!0),this._setProperty("keyCode",a.which),e[a.which]=!0;var b=String.fromCharCode(a.which);b||(b=a.which),this._setProperty("key",b);var c=this.keyPressed||window.keyPressed;if("function"==typeof c&&!a.charCode){var d=c(a);d===!1&&a.preventDefault()}}},d.prototype._onkeyup=function(a){var b=this.keyReleased||window.keyReleased;this._setProperty("isKeyPressed",!1),this._setProperty("keyIsPressed",!1),this._setProperty("_lastKeyCodeTyped",null),e[a.which]=!1;var c=String.fromCharCode(a.which);if(c||(c=a.which),this._setProperty("key",c),this._setProperty("keyCode",a.which),"function"==typeof b){var d=b(a);d===!1&&a.preventDefault()}},d.prototype._onkeypress=function(a){if(a.which!==this._lastKeyCodeTyped){this._setProperty("keyCode",a.which),this._setProperty("_lastKeyCodeTyped",a.which),this._setProperty("key",String.fromCharCode(a.which));var b=this.keyTyped||window.keyTyped;if("function"==typeof b){var c=b(a);c===!1&&a.preventDefault()}}},d.prototype._onblur=function(a){e={}},d.prototype.keyIsDown=function(a){return e[a]},b.exports=d},{"../core/core":37}],52:[function(a,b,c){"use strict";function d(a,b){var c=a.getBoundingClientRect();return{x:b.clientX-c.left,y:b.clientY-c.top,winX:b.clientX,winY:b.clientY}}var e=a("../core/core"),f=a("../core/constants");e.prototype._hasMouseInteracted=!1,e.prototype.mouseX=0,e.prototype.mouseY=0,e.prototype.pmouseX=0,e.prototype.pmouseY=0,e.prototype.winMouseX=0,e.prototype.winMouseY=0,e.prototype.pwinMouseX=0,e.prototype.pwinMouseY=0,e.prototype.mouseButton=0,e.prototype.mouseIsPressed=!1,e.prototype.isMousePressed=!1,e.prototype._updateNextMouseCoords=function(a){var b=this.mouseX,c=this.mouseY,e=this.winMouseX,f=this.winMouseY;if("touchstart"===a.type||"touchmove"===a.type||"touchend"===a.type||a.touches)b=this.touchX,c=this.touchY,e=this.winTouchX,f=this.winTouchY;else if(null!==this._curElement){var g=d(this._curElement.elt,a);b=g.x,c=g.y,e=g.winX,f=g.winY}this._setProperty("mouseX",b),this._setProperty("mouseY",c),this._setProperty("winMouseX",e),this._setProperty("winMouseY",f),this._hasMouseInteracted||(this._updateMouseCoords(),this._setProperty("_hasMouseInteracted",!0))},e.prototype._updateMouseCoords=function(){this._setProperty("pmouseX",this.mouseX),this._setProperty("pmouseY",this.mouseY),this._setProperty("pwinMouseX",this.winMouseX),this._setProperty("pwinMouseY",this.winMouseY)},e.prototype._setMouseButton=function(a){1===a.button?this._setProperty("mouseButton",f.CENTER):2===a.button?this._setProperty("mouseButton",f.RIGHT):this._setProperty("mouseButton",f.LEFT)},e.prototype._onmousemove=function(a){var b,c=this._isGlobal?window:this;this._updateNextMouseCoords(a),this._updateNextTouchCoords(a),this.isMousePressed?"function"==typeof c.mouseDragged?(b=c.mouseDragged(a),b===!1&&a.preventDefault()):"function"==typeof c.touchMoved&&(b=c.touchMoved(a),b===!1&&a.preventDefault()):"function"==typeof c.mouseMoved&&(b=c.mouseMoved(a),b===!1&&a.preventDefault())},e.prototype._onmousedown=function(a){var b,c=this._isGlobal?window:this;this._setProperty("isMousePressed",!0),this._setProperty("mouseIsPressed",!0),this._setMouseButton(a),this._updateNextMouseCoords(a),this._updateNextTouchCoords(a),"function"==typeof c.mousePressed?(b=c.mousePressed(a),b===!1&&a.preventDefault()):"function"==typeof c.touchStarted&&(b=c.touchStarted(a),b===!1&&a.preventDefault())},e.prototype._onmouseup=function(a){var b,c=this._isGlobal?window:this;this._setProperty("isMousePressed",!1),this._setProperty("mouseIsPressed",!1),"function"==typeof c.mouseReleased?(b=c.mouseReleased(a),b===!1&&a.preventDefault()):"function"==typeof c.touchEnded&&(b=c.touchEnded(a),b===!1&&a.preventDefault())},e.prototype._ondragend=e.prototype._onmouseup,e.prototype._ondragover=e.prototype._onmousemove,e.prototype._onclick=function(a){var b=this._isGlobal?window:this;if("function"==typeof b.mouseClicked){var c=b.mouseClicked(a);c===!1&&a.preventDefault()}},e.prototype._onwheel=function(a){var b=this._isGlobal?window:this;if("function"==typeof b.mouseWheel){a.delta=a.deltaY;var c=b.mouseWheel(a);c===!1&&a.preventDefault()}},b.exports=e},{"../core/constants":36,"../core/core":37}],53:[function(a,b,c){"use strict";function d(a,b,c){c=c||0;var d=a.getBoundingClientRect(),e=b.touches[c]||b.changedTouches[c];return{x:e.clientX-d.left,y:e.clientY-d.top,winX:e.clientX,winY:e.clientY,id:e.identifier}}var e=a("../core/core");e.prototype._hasTouchInteracted=!1,e.prototype.touchX=0,e.prototype.touchY=0,e.prototype.ptouchX=0,e.prototype.ptouchY=0,e.prototype.winTouchX=0,e.prototype.winTouchY=0,e.prototype.pwinTouchX=0,e.prototype.pwinTouchY=0,e.prototype.touches=[],e.prototype.touchIsDown=!1,e.prototype._updateNextTouchCoords=function(a){var b=this.touchX,c=this.touchY,e=this.winTouchX,f=this.winTouchY;if("mousedown"!==a.type&&"mousemove"!==a.type&&"mouseup"!==a.type&&a.touches){if(null!==this._curElement){var g=d(this._curElement.elt,a,0);b=g.x,c=g.y,e=g.winX,f=g.winY;for(var h=[],i=0;i<a.touches.length;i++)h[i]=d(this._curElement.elt,a,i);this._setProperty("touches",h)}}else b=this.mouseX,c=this.mouseY,e=this.winMouseX,f=this.winMouseY;this._setProperty("touchX",b),this._setProperty("touchY",c),this._setProperty("winTouchX",e),this._setProperty("winTouchY",f),this._hasTouchInteracted||(this._updateTouchCoords(),this._setProperty("_hasTouchInteracted",!0))},e.prototype._updateTouchCoords=function(){this._setProperty("ptouchX",this.touchX),this._setProperty("ptouchY",this.touchY),this._setProperty("pwinTouchX",this.winTouchX),this._setProperty("pwinTouchY",this.winTouchY)},e.prototype._ontouchstart=function(a){var b,c=this._isGlobal?window:this;this._updateNextTouchCoords(a),this._updateNextMouseCoords(a),this._setProperty("touchIsDown",!0),"function"==typeof c.touchStarted?(b=c.touchStarted(a),b===!1&&a.preventDefault()):"function"==typeof c.mousePressed&&(b=c.mousePressed(a),b===!1&&a.preventDefault())},e.prototype._ontouchmove=function(a){var b,c=this._isGlobal?window:this;this._updateNextTouchCoords(a),this._updateNextMouseCoords(a),"function"==typeof c.touchMoved?(b=c.touchMoved(a),b===!1&&a.preventDefault()):"function"==typeof c.mouseDragged&&(b=c.mouseDragged(a),b===!1&&a.preventDefault())},e.prototype._ontouchend=function(a){this._updateNextTouchCoords(a),this._updateNextMouseCoords(a),0===this.touches.length&&this._setProperty("touchIsDown",!1);var b,c=this._isGlobal?window:this;"function"==typeof c.touchEnded?(b=c.touchEnded(a),b===!1&&a.preventDefault()):"function"==typeof c.mouseReleased&&(b=c.mouseReleased(a),b===!1&&a.preventDefault())},b.exports=e},{"../core/core":37}],54:[function(a,b,c){"use strict";function d(a){var b=3.5*a|0;if(b=1>b?1:248>b?b:248,g!==b){g=b,h=1+g<<1,i=new Int32Array(h),j=new Array(h);for(var c=0;h>c;c++)j[c]=new Int32Array(256);for(var d,e,f,k,l=1,m=b-1;b>l;l++){i[b+l]=i[m]=e=m*m,f=j[b+l],k=j[m--];for(var n=0;256>n;n++)f[n]=k[n]=e*n}d=i[b]=b*b,f=j[b];for(var o=0;256>o;o++)f[o]=d*o}}function e(a,b){for(var c=f._toPixels(a),e=a.width,k=a.height,l=e*k,m=new Int32Array(l),n=0;l>n;n++)m[n]=f._getARGB(c,n);var o,p,q,r,s,t,u,v,w,x,y=new Int32Array(l),z=new Int32Array(l),A=new Int32Array(l),B=new Int32Array(l),C=0;d(b);var D,E,F,G;for(E=0;k>E;E++){for(D=0;e>D;D++){if(r=q=p=s=o=0,t=D-g,0>t)x=-t,t=0;else{if(t>=e)break;x=0}for(F=x;h>F&&!(t>=e);F++){var H=m[t+C];G=j[F],s+=G[(-16777216&H)>>>24],p+=G[(16711680&H)>>16],q+=G[(65280&H)>>8],r+=G[255&H],o+=i[F],t++}u=C+D,y[u]=s/o,z[u]=p/o,A[u]=q/o,B[u]=r/o}C+=e}for(C=0,v=-g,w=v*e,E=0;k>E;E++){for(D=0;e>D;D++){if(r=q=p=s=o=0,0>v)x=u=-v,t=D;else{if(v>=k)break;x=0,u=v,t=D+w}for(F=x;h>F&&!(u>=k);F++)G=j[F],s+=G[y[t]],p+=G[z[t]],q+=G[A[t]],r+=G[B[t]],o+=i[F],u++,t+=e;m[D+C]=s/o<<24|p/o<<16|q/o<<8|r/o}C+=e,w+=e,v++}f._setPixels(c,m)}var f={};f._toPixels=function(a){return a instanceof ImageData?a.data:a.getContext("2d").getImageData(0,0,a.width,a.height).data},f._getARGB=function(a,b){var c=4*b;return a[c+3]<<24&4278190080|a[c]<<16&16711680|a[c+1]<<8&65280|255&a[c+2]},f._setPixels=function(a,b){for(var c=0,d=0,e=a.length;e>d;d++)c=4*d,a[c+0]=(16711680&b[d])>>>16,a[c+1]=(65280&b[d])>>>8,a[c+2]=255&b[d],a[c+3]=(4278190080&b[d])>>>24},f._toImageData=function(a){return a instanceof ImageData?a:a.getContext("2d").getImageData(0,0,a.width,a.height)},f._createImageData=function(a,b){return f._tmpCanvas=document.createElement("canvas"),f._tmpCtx=f._tmpCanvas.getContext("2d"),this._tmpCtx.createImageData(a,b)},f.apply=function(a,b,c){var d=a.getContext("2d"),e=d.getImageData(0,0,a.width,a.height),f=b(e,c);f instanceof ImageData?d.putImageData(f,0,0,0,0,a.width,a.height):d.putImageData(e,0,0,0,0,a.width,a.height)},f.threshold=function(a,b){var c=f._toPixels(a);void 0===b&&(b=.5);for(var d=Math.floor(255*b),e=0;e<c.length;e+=4){var g,h=c[e],i=c[e+1],j=c[e+2],k=.2126*h+.7152*i+.0722*j;g=k>=d?255:0,c[e]=c[e+1]=c[e+2]=g}},f.gray=function(a){for(var b=f._toPixels(a),c=0;c<b.length;c+=4){var d=b[c],e=b[c+1],g=b[c+2],h=.2126*d+.7152*e+.0722*g;b[c]=b[c+1]=b[c+2]=h}},f.opaque=function(a){for(var b=f._toPixels(a),c=0;c<b.length;c+=4)b[c+3]=255;return b},f.invert=function(a){for(var b=f._toPixels(a),c=0;c<b.length;c+=4)b[c]=255-b[c],b[c+1]=255-b[c+1],b[c+2]=255-b[c+2]},f.posterize=function(a,b){var c=f._toPixels(a);if(2>b||b>255)throw new Error("Level must be greater than 2 and less than 255 for posterize");for(var d=b-1,e=0;e<c.length;e+=4){var g=c[e],h=c[e+1],i=c[e+2];c[e]=255*(g*b>>8)/d,c[e+1]=255*(h*b>>8)/d,c[e+2]=255*(i*b>>8)/d}},f.dilate=function(a){for(var b,c,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t=f._toPixels(a),u=0,v=t.length?t.length/4:0,w=new Int32Array(v);v>u;)for(b=u,c=u+a.width;c>u;)d=e=f._getARGB(t,u),i=u-1,h=u+1,j=u-a.width,k=u+a.width,b>i&&(i=u),h>=c&&(h=u),0>j&&(j=0),k>=v&&(k=u),n=f._getARGB(t,j),m=f._getARGB(t,i),o=f._getARGB(t,k),l=f._getARGB(t,h),g=77*(d>>16&255)+151*(d>>8&255)+28*(255&d),q=77*(m>>16&255)+151*(m>>8&255)+28*(255&m),p=77*(l>>16&255)+151*(l>>8&255)+28*(255&l),r=77*(n>>16&255)+151*(n>>8&255)+28*(255&n),s=77*(o>>16&255)+151*(o>>8&255)+28*(255&o),q>g&&(e=m,g=q),p>g&&(e=l,g=p),r>g&&(e=n,g=r),s>g&&(e=o,g=s),w[u++]=e;f._setPixels(t,w)},f.erode=function(a){for(var b,c,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t=f._toPixels(a),u=0,v=t.length?t.length/4:0,w=new Int32Array(v);v>u;)for(b=u,c=u+a.width;c>u;)d=e=f._getARGB(t,u),i=u-1,h=u+1,j=u-a.width,k=u+a.width,b>i&&(i=u),h>=c&&(h=u),0>j&&(j=0),k>=v&&(k=u),n=f._getARGB(t,j),m=f._getARGB(t,i),o=f._getARGB(t,k),l=f._getARGB(t,h),g=77*(d>>16&255)+151*(d>>8&255)+28*(255&d),q=77*(m>>16&255)+151*(m>>8&255)+28*(255&m),p=77*(l>>16&255)+151*(l>>8&255)+28*(255&l),r=77*(n>>16&255)+151*(n>>8&255)+28*(255&n),s=77*(o>>16&255)+151*(o>>8&255)+28*(255&o),g>q&&(e=m,g=q),g>p&&(e=l,g=p),g>r&&(e=n,g=r),g>s&&(e=o,g=s),w[u++]=e;f._setPixels(t,w)};var g,h,i,j;f.blur=function(a,b){e(a,b)},b.exports=f},{}],55:[function(a,b,c){"use strict";var d=a("../core/core"),e=[];d.prototype.createImage=function(a,b){return new d.Image(a,b)},d.prototype.saveCanvas=function(){var a,b,c;if(3===arguments.length?(a=arguments[0],b=arguments[1],c=arguments[2]):2===arguments.length?"object"==typeof arguments[0]?(a=arguments[0],b=arguments[1]):(b=arguments[0],c=arguments[1]):1===arguments.length&&("object"==typeof arguments[0]?a=arguments[0]:b=arguments[0]),a instanceof d.Element&&(a=a.elt),a instanceof HTMLCanvasElement||(a=null),c||(c=d.prototype._checkFileExtension(b,c)[1],""===c&&(c="png")),a||this._curElement&&this._curElement.elt&&(a=this._curElement.elt),d.prototype._isSafari()){var e="Hello, Safari user!\n";e+="Now capturing a screenshot...\n",e+="To save this image,\n",e+="go to File --> Save As.\n",alert(e),window.location.href=a.toDataURL()}else{var f;if("undefined"==typeof c)c="png",f="image/png";else switch(c){case"png":f="image/png";break;case"jpeg":f="image/jpeg";break;case"jpg":f="image/jpeg";break;default:f="image/png"}var g="image/octet-stream",h=a.toDataURL(f);h=h.replace(f,g),d.prototype.downloadFile(h,b,c)}},d.prototype.saveFrames=function(a,b,c,f,g){var h=c||3;h=d.prototype.constrain(h,0,15),h=1e3*h;var i=f||15;i=d.prototype.constrain(i,0,22);var j=0,k=d.prototype._makeFrame,l=this._curElement.elt,m=setInterval(function(){k(a+j,b,l),j++},1e3/i);setTimeout(function(){if(clearInterval(m),g)g(e);else for(var a=0;a<e.length;a++){var b=e[a];d.prototype.downloadFile(b.imageData,b.filename,b.ext)}e=[]},h+.01)},d.prototype._makeFrame=function(a,b,c){var d;d=this?this._curElement.elt:c;var f;if(b)switch(b.toLowerCase()){case"png":f="image/png";break;case"jpeg":f="image/jpeg";break;case"jpg":f="image/jpeg";break;default:f="image/png"}else b="png",f="image/png";var g="image/octet-stream",h=d.toDataURL(f);h=h.replace(f,g);var i={};i.imageData=h,i.filename=a,i.ext=b,e.push(i)},b.exports=d},{"../core/core":37}],56:[function(a,b,c){"use strict";function d(a,b){return a>0&&b>a?a:b}var e=a("../core/core"),f=a("./filters"),g=a("../core/canvas"),h=a("../core/constants");a("../core/error_helpers"),e.prototype.loadImage=function(a,b,c){var d=new Image,f=new e.Image(1,1,this),g=e._getDecrementPreload.apply(this,arguments);return d.onload=function(){f.width=f.canvas.width=d.width,f.height=f.canvas.height=d.height,f.drawingContext.drawImage(d,0,0),"function"==typeof b&&b(f),g&&b!==g&&g()},d.onerror=function(a){e._friendlyFileLoadError(0,d.src),"function"==typeof c&&c!==g&&c(a)},0!==a.indexOf("data:image/")&&(d.crossOrigin="Anonymous"),d.src=a,f},e.prototype.image=function(a,b,c,e,f,h,i,j,k){if(arguments.length<=5)if(h=b||0,i=c||0,b=0,c=0,a.elt&&a.elt.videoWidth&&!a.canvas){var l=a.elt.videoWidth,m=a.elt.videoHeight;j=e||a.elt.width,k=f||a.elt.width*m/l,e=l,f=m}else j=e||a.width,k=f||a.height,e=a.width,f=a.height;else{if(9!==arguments.length)throw"Wrong number of arguments to image()";b=b||0,c=c||0,e=d(e,a.width),f=d(f,a.height),h=h||0,i=i||0,j=j||a.width,k=k||a.height}var n=g.modeAdjust(h,i,j,k,this._renderer._imageMode);this._renderer.image(a,b,c,e,f,n.x,n.y,n.w,n.h)},e.prototype.tint=function(){var a=this.color.apply(this,arguments);this._renderer._tint=a.levels},e.prototype.noTint=function(){this._renderer._tint=null},e.prototype._getTintedImageCanvas=function(a){if(!a.canvas)return a;var b=f._toPixels(a.canvas),c=document.createElement("canvas");c.width=a.canvas.width,c.height=a.canvas.height;for(var d=c.getContext("2d"),e=d.createImageData(a.canvas.width,a.canvas.height),g=e.data,h=0;h<b.length;h+=4){var i=b[h],j=b[h+1],k=b[h+2],l=b[h+3];g[h]=i*this._renderer._tint[0]/255,g[h+1]=j*this._renderer._tint[1]/255,g[h+2]=k*this._renderer._tint[2]/255,g[h+3]=l*this._renderer._tint[3]/255}return d.putImageData(e,0,0),c},e.prototype.imageMode=function(a){(a===h.CORNER||a===h.CORNERS||a===h.CENTER)&&(this._renderer._imageMode=a)},b.exports=e},{"../core/canvas":35,"../core/constants":36,"../core/core":37,"../core/error_helpers":40,"./filters":54}],57:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("./filters");d.Image=function(a,b){this.width=a,this.height=b,this.canvas=document.createElement("canvas"),this.canvas.width=this.width,this.canvas.height=this.height,this.drawingContext=this.canvas.getContext("2d"),this._pixelDensity=1,this.isTexture=!1,this.pixels=[]},d.Image.prototype._setProperty=function(a,b){this[a]=b},d.Image.prototype.loadPixels=function(){d.Renderer2D.prototype.loadPixels.call(this)},d.Image.prototype.updatePixels=function(a,b,c,e){d.Renderer2D.prototype.updatePixels.call(this,a,b,c,e)},d.Image.prototype.get=function(a,b,c,e){return d.Renderer2D.prototype.get.call(this,a,b,c,e)},d.Image.prototype.set=function(a,b,c){d.Renderer2D.prototype.set.call(this,a,b,c)},d.Image.prototype.resize=function(a,b){0===a&&0===b?(a=this.canvas.width,b=this.canvas.height):0===a?a=this.canvas.width*b/this.canvas.height:0===b&&(b=this.canvas.height*a/this.canvas.width),a=Math.floor(a),b=Math.floor(b);var c=document.createElement("canvas");c.width=a,c.height=b,c.getContext("2d").drawImage(this.canvas,0,0,this.canvas.width,this.canvas.height,0,0,c.width,c.height),this.canvas.width=this.width=a,this.canvas.height=this.height=b,this.drawingContext.drawImage(c,0,0,a,b,0,0,a,b),this.pixels.length>0&&this.loadPixels()},d.Image.prototype.copy=function(){d.prototype.copy.apply(this,arguments)},d.Image.prototype.mask=function(a){void 0===a&&(a=this);var b=this.drawingContext.globalCompositeOperation,c=1;a instanceof d.Renderer&&(c=a._pInst._pixelDensity);var e=[a,0,0,c*a.width,c*a.height,0,0,this.width,this.height];this.drawingContext.globalCompositeOperation="destination-in",d.Image.prototype.copy.apply(this,e),this.drawingContext.globalCompositeOperation=b},d.Image.prototype.filter=function(a,b){e.apply(this.canvas,e[a.toLowerCase()],b)},d.Image.prototype.blend=function(){d.prototype.blend.apply(this,arguments)},d.Image.prototype.save=function(a,b){var c;if(b)switch(b.toLowerCase()){case"png":c="image/png";break;case"jpeg":c="image/jpeg";break;case"jpg":c="image/jpeg";break;default:c="image/png"}else b="png",c="image/png";var e="image/octet-stream",f=this.canvas.toDataURL(c);f=f.replace(c,e),d.prototype.downloadFile(f,a,b)},b.exports=d.Image},{"../core/core":37,"./filters":54}],58:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("./filters");a("../color/p5.Color"),d.prototype.pixels=[],d.prototype.blend=function(){this._renderer?this._renderer.blend.apply(this._renderer,arguments):d.Renderer2D.prototype.blend.apply(this,arguments)},d.prototype.copy=function(){d.Renderer2D._copyHelper.apply(this,arguments)},d.prototype.filter=function(a,b){e.apply(this.canvas,e[a.toLowerCase()],b)},d.prototype.get=function(a,b,c,d){return this._renderer.get(a,b,c,d)},d.prototype.loadPixels=function(){this._renderer.loadPixels()},d.prototype.set=function(a,b,c){this._renderer.set(a,b,c)},d.prototype.updatePixels=function(a,b,c,d){0!==this.pixels.length&&this._renderer.updatePixels(a,b,c,d)},b.exports=d},{"../color/p5.Color":31,"../core/core":37,"./filters":54}],59:[function(a,b,c){"use strict";function d(a,b){var c={};if(b=b||[],"undefined"==typeof b)for(var d=0;d<a.length;d++)b[d.toString()]=d;for(var e=0;e<b.length;e++){var f=b[e],g=a[e];c[f]=g}return c}function e(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function f(a,b){b&&b!==!0&&"true"!==b||(b=""),a||(a="untitled");var c="";return a&&a.indexOf(".")>-1&&(c=a.split(".").pop()),b&&c!==b&&(c=b,a=a+"."+c),[a,c]}function g(a){document.body.removeChild(a.target)}var h=a("../core/core"),i=a("reqwest"),j=a("opentype.js");a("../core/error_helpers"),h._getDecrementPreload=function(){var a=arguments[arguments.length-1];return(window.preload||this&&this.preload)&&"function"==typeof a?a:null},h.prototype.loadFont=function(a,b,c){var d=new h.Font(this),e=h._getDecrementPreload.apply(this,arguments);return j.load(a,function(f,g){if(f)return"undefined"!=typeof c&&c!==e?c(f):(h._friendlyFileLoadError(4,a),void console.error(f,a));d.font=g,"undefined"!=typeof b&&b(d),e&&b!==e&&e();var i,j,k=["ttf","otf","woff","woff2"],l=a.split("\\").pop().split("/").pop(),m=l.lastIndexOf("."),n=1>m?null:l.substr(m+1);k.indexOf(n)>-1&&(i=l.substr(0,m),j=document.createElement("style"),j.appendChild(document.createTextNode("\n@font-face {\nfont-family: "+i+";\nsrc: url("+a+");\n}\n")),document.head.appendChild(j))}),d},h.prototype.createInput=function(){throw"not yet implemented"},h.prototype.createReader=function(){throw"not yet implemented"},h.prototype.loadBytes=function(){throw"not yet implemented"},h.prototype.loadJSON=function(){for(var a,b=arguments[0],c=arguments[1],d=h._getDecrementPreload.apply(this,arguments),e={},f="json",g=2;g<arguments.length;g++){var j=arguments[g];"string"==typeof j?("jsonp"===j||"json"===j)&&(f=j):"function"==typeof j&&(a=j)}return i({url:b,type:f,crossOrigin:!0,error:function(b){a?a(b):console.log(b.statusText)},success:function(a){for(var b in a)e[b]=a[b];"undefined"!=typeof c&&c(a),d&&c!==d&&d()}}),e},h.prototype.loadStrings=function(a,b,c){var d=[],e=new XMLHttpRequest,f=h._getDecrementPreload.apply(this,arguments);return e.addEventListener("error",function(a){c?c(a):console.log(a.responseText)}),e.open("GET",a,!0),e.onreadystatechange=function(){if(4===e.readyState)if(200===e.status){var a=e.responseText.match(/[^\r\n]+/g);for(var g in a)d[g]=a[g];"undefined"!=typeof b&&b(d),f&&b!==f&&f()}else c?c(e):console.log(e.statusText)},e.send(null),d},h.prototype.loadTable=function(a){for(var b=null,c=[],e=!1,f=",",g=!1,j=h._getDecrementPreload.apply(this,arguments),k=1;k<arguments.length;k++)if("function"==typeof arguments[k]&&arguments[k]!==j)b=arguments[k];else if("string"==typeof arguments[k])if(c.push(arguments[k]),"header"===arguments[k]&&(e=!0),"csv"===arguments[k]){if(g)throw new Error("Cannot set multiple separator types.");f=",",g=!0}else if("tsv"===arguments[k]){if(g)throw new Error("Cannot set multiple separator types.");f="	",g=!0}var l=new h.Table;return i({url:a,crossOrigin:!0,type:"csv"}).then(function(a){a=a.responseText;for(var c,g={},i=0,m=1,n=2,o=4,p='"',q="\r",r="\n",s=[],t=0,u=null,v=function(){g.escaped=!1,u=[],x()},w=function(){g.currentState=o,s.push(u),u=null},x=function(){g.currentState=i,g.token=""},y=function(){u.push(g.token),x()};;){if(c=a[t++],null==c){if(g.escaped)throw new Error("Unclosed quote in file.");if(u){y(),w();break}}if(null===u&&v(),g.currentState===i){if(c===p){g.escaped=!0,g.currentState=m;continue}g.currentState=m}g.currentState===m&&g.escaped?c===p?a[t]===p?(g.token+=p,t++):(g.escaped=!1,g.currentState=n):g.token+=c:c===q?(a[t]===r&&t++,y(),w()):c===r?(y(),w()):c===f?y():g.currentState===m&&(g.token+=c)}if(e)l.columns=s.shift();else for(k=0;k<s[0].length;k++)l.columns[k]="null";var z;for(k=0;k<s.length&&(k!==s.length-1||1!==s[k].length||"undefined"!==s[k][0]);k++)z=new h.TableRow,z.arr=s[k],z.obj=d(s[k],l.columns),l.addRow(z);null!==b&&b(l),j&&b!==j&&j()}).fail(function(c,d){h._friendlyFileLoadError(2,a),"function"==typeof b&&b!==j&&b(!1)}),l},h.prototype.parseXML=function(a){var b,c=new h.XML;if(a.children.length){for(b=0;b<a.children.length;b++){var d=parseXML(a.children[b]);c.addChild(d)}c.setName(a.nodeName),c._setCont(a.textContent),c._setAttributes(a);for(var e=0;e<c.children.length;e++)c.children[e].parent=c;return c}return c.setName(a.nodeName),c._setCont(a.textContent),c._setAttributes(a),c},h.prototype.loadXML=function(a,b,c){var d={},e=h._getDecrementPreload.apply(this,arguments);return i({url:a,type:"xml",crossOrigin:!0,error:function(a){c?c(a):console.log(a.statusText)}}).then(function(a){var c=parseXML(a.documentElement);for(var f in c)d[f]=c[f];"undefined"!=typeof b&&b(d),e&&b!==e&&e()}),d},h.prototype.selectFolder=function(){throw"not yet implemented"},h.prototype.selectInput=function(){throw"not yet implemented"},h.prototype.httpGet=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];a.push("GET"),h.prototype.httpDo.apply(this,a)},h.prototype.httpPost=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];a.push("POST"),h.prototype.httpDo.apply(this,a)},h.prototype.httpDo=function(){if("object"==typeof arguments[0])i(arguments[0]);else{for(var a,b,c="GET",d=arguments[0],e={},f="",g=1;g<arguments.length;g++){var h=arguments[g];"string"==typeof h?"GET"===h||"POST"===h||"PUT"===h?c=h:f=h:"object"==typeof h?e=h:"function"==typeof h&&(a?b=h:a=h)}""===f&&(f=-1!==d.indexOf("json")?"json":-1!==d.indexOf("xml")?"xml":"text"),i({url:d,method:c,data:e,type:f,crossOrigin:!0,success:function(b){"undefined"!=typeof a&&a("text"===f?b.response:b)},error:function(a){b?b(a):console.log(a.statusText)}})}},window.URL=window.URL||window.webkitURL,h.prototype._pWriters=[],h.prototype.beginRaw=function(){throw"not yet implemented"},h.prototype.beginRecord=function(){throw"not yet implemented"},h.prototype.createOutput=function(){throw"not yet implemented"},h.prototype.createWriter=function(a,b){var c;for(var d in h.prototype._pWriters)if(h.prototype._pWriters[d].name===a)return c=new h.PrintWriter(a+window.millis(),b),h.prototype._pWriters.push(c),c;return c=new h.PrintWriter(a,b),h.prototype._pWriters.push(c),c},h.prototype.endRaw=function(){throw"not yet implemented"},h.prototype.endRecord=function(){throw"not yet implemented"},h.PrintWriter=function(a,b){var c=this;this.name=a,this.content="",this.print=function(a){this.content+=a},this.print=function(a){this.content+=a+"\n"},this.flush=function(){this.content=""},this.close=function(){var d=[];d.push(this.content),h.prototype.writeFile(d,a,b);for(var e in h.prototype._pWriters)h.prototype._pWriters[e].name===this.name&&h.prototype._pWriters.splice(e,1);c.flush(),c={}}},h.prototype.saveBytes=function(){throw"not yet implemented"},h.prototype.save=function(a,b,c){var d=arguments,e=this._curElement.elt;if(0===d.length)return void h.prototype.saveCanvas(e);if(d[0]instanceof h.Renderer||d[0]instanceof h.Graphics)return void h.prototype.saveCanvas(d[0].elt,d[1],d[2]);if(1===d.length&&"string"==typeof d[0])h.prototype.saveCanvas(e,d[0]);else{var g=f(d[1],d[2])[1];switch(g){case"json":return void h.prototype.saveJSON(d[0],d[1],d[2]);case"txt":return void h.prototype.saveStrings(d[0],d[1],d[2]);default:d[0]instanceof Array?h.prototype.saveStrings(d[0],d[1],d[2]):d[0]instanceof h.Table?h.prototype.saveTable(d[0],d[1],d[2],d[3]):d[0]instanceof h.Image?h.prototype.saveCanvas(d[0].canvas,d[1]):d[0]instanceof h.SoundFile&&h.prototype.saveSound(d[0],d[1],d[2],d[3])}}},h.prototype.saveJSON=function(a,b,c){var d;d=c?JSON.stringify(a):JSON.stringify(a,void 0,2),console.log(d),this.saveStrings(d.split("\n"),b,"json")},h.prototype.saveJSONObject=h.prototype.saveJSON,h.prototype.saveJSONArray=h.prototype.saveJSON,h.prototype.saveStream=function(){throw"not yet implemented"},h.prototype.saveStrings=function(a,b,c){for(var d=c||"txt",e=this.createWriter(b,d),f=0;f<a.length;f++)f<a.length-1?e.print(a[f]):e.print(a[f]);e.close(),e.flush()},h.prototype.saveXML=function(){throw"not yet implemented"},h.prototype.selectOutput=function(){throw"not yet implemented"},h.prototype.saveTable=function(a,b,c){var d=this.createWriter(b,c),f=a.columns,g=",";if("tsv"===c&&(g="	"),"html"!==c){if("0"!==f[0])for(var h=0;h<f.length;h++)h<f.length-1?d.print(f[h]+g):d.print(f[h]);for(var i=0;i<a.rows.length;i++){var j;for(j=0;j<a.rows[i].arr.length;j++)j<a.rows[i].arr.length-1?d.print(a.rows[i].arr[j]+g):i<a.rows.length-1?d.print(a.rows[i].arr[j]):d.print(a.rows[i].arr[j])}}else{d.print("<html>"),d.print("<head>");var k='  <meta http-equiv="content-type" content';if(k+='="text/html;charset=utf-8" />',d.print(k),d.print("</head>"),d.print("<body>"),d.print("  <table>"),"0"!==f[0]){d.print("    <tr>");for(var l=0;l<f.length;l++){var m=e(f[l]);d.print("      <td>"+m),d.print("      </td>")}d.print("    </tr>")}for(var n=0;n<a.rows.length;n++){d.print("    <tr>");for(var o=0;o<a.columns.length;o++){var p=a.rows[n].getString(o),q=e(p);d.print("      <td>"+q),d.print("      </td>")}d.print("    </tr>")}d.print("  </table>"),d.print("</body>"),d.print("</html>")}d.close(),d.flush()},h.prototype.writeFile=function(a,b,c){var d="application/octet-stream";h.prototype._isSafari()&&(d="text/plain");var e=new Blob(a,{type:d}),f=window.URL.createObjectURL(e);h.prototype.downloadFile(f,b,c)},h.prototype.downloadFile=function(a,b,c){var d=f(b,c),e=d[0],i=d[1],j=document.createElement("a");if(j.href=a,j.download=e,j.onclick=g,j.style.display="none",document.body.appendChild(j),h.prototype._isSafari()){var k="Hello, Safari user! To download this file...\n";k+="1. Go to File --> Save As.\n",k+='2. Choose "Page Source" as the Format.\n',k+='3. Name it with this extension: ."'+i+'"',alert(k)}j.click(),a=null},h.prototype._checkFileExtension=f,h.prototype._isSafari=function(){var a=Object.prototype.toString.call(window.HTMLElement);return a.indexOf("Constructor")>0},b.exports=h},{"../core/core":37,"../core/error_helpers":40,"opentype.js":8,reqwest:27}],60:[function(a,b,c){"use strict";var d=a("../core/core");d.Table=function(a){this.columns=[],this.rows=[]},d.Table.prototype.addRow=function(a){var b=a||new d.TableRow;if("undefined"==typeof b.arr||"undefined"==typeof b.obj)throw"invalid TableRow: "+b;return b.table=this,this.rows.push(b),b},d.Table.prototype.removeRow=function(a){this.rows[a].table=null;var b=this.rows.splice(a+1,this.rows.length);this.rows.pop(),this.rows=this.rows.concat(b)},d.Table.prototype.getRow=function(a){return this.rows[a]},d.Table.prototype.getRows=function(){return this.rows},d.Table.prototype.findRow=function(a,b){if("string"==typeof b){for(var c=0;c<this.rows.length;c++)if(this.rows[c].obj[b]===a)return this.rows[c]}else for(var d=0;d<this.rows.length;d++)if(this.rows[d].arr[b]===a)return this.rows[d];return null},d.Table.prototype.findRows=function(a,b){var c=[];if("string"==typeof b)for(var d=0;d<this.rows.length;d++)this.rows[d].obj[b]===a&&c.push(this.rows[d]);else for(var e=0;e<this.rows.length;e++)this.rows[e].arr[b]===a&&c.push(this.rows[e]);return c},d.Table.prototype.matchRow=function(a,b){if("number"==typeof b){for(var c=0;c<this.rows.length;c++)if(this.rows[c].arr[b].match(a))return this.rows[c]}else for(var d=0;d<this.rows.length;d++)if(this.rows[d].obj[b].match(a))return this.rows[d];return null},d.Table.prototype.matchRows=function(a,b){var c=[];if("number"==typeof b)for(var d=0;d<this.rows.length;d++)this.rows[d].arr[b].match(a)&&c.push(this.rows[d]);else for(var e=0;e<this.rows.length;e++)this.rows[e].obj[b].match(a)&&c.push(this.rows[e]);return c},d.Table.prototype.getColumn=function(a){var b=[];if("string"==typeof a)for(var c=0;c<this.rows.length;c++)b.push(this.rows[c].obj[a]);else for(var d=0;d<this.rows.length;d++)b.push(this.rows[d].arr[a]);return b},d.Table.prototype.clearRows=function(){delete this.rows,this.rows=[]},d.Table.prototype.addColumn=function(a){var b=a||null;this.columns.push(b)},d.Table.prototype.getColumnCount=function(){return this.columns.length},d.Table.prototype.getRowCount=function(){return this.rows.length},d.Table.prototype.removeTokens=function(a,b){for(var c=function(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")},d=[],e=0;e<a.length;e++)d.push(c(a.charAt(e)));var f=new RegExp(d.join("|"),"g");if("undefined"==typeof b)for(var g=0;g<this.columns.length;g++)for(var h=0;h<this.rows.length;h++){var i=this.rows[h].arr[g];i=i.replace(f,""),this.rows[h].arr[g]=i,this.rows[h].obj[this.columns[g]]=i}else if("string"==typeof b)for(var j=0;j<this.rows.length;j++){var k=this.rows[j].obj[b];k=k.replace(f,""),this.rows[j].obj[b]=k;var l=this.columns.indexOf(b);this.rows[j].arr[l]=k}else for(var m=0;m<this.rows.length;m++){var n=this.rows[m].arr[b];n=n.replace(f,""),this.rows[m].arr[b]=n,this.rows[m].obj[this.columns[b]]=n}},d.Table.prototype.trim=function(a){var b=new RegExp(" ","g");if("undefined"==typeof a)for(var c=0;c<this.columns.length;c++)for(var d=0;d<this.rows.length;d++){var e=this.rows[d].arr[c];e=e.replace(b,""),this.rows[d].arr[c]=e,this.rows[d].obj[this.columns[c]]=e}else if("string"==typeof a)for(var f=0;f<this.rows.length;f++){var g=this.rows[f].obj[a];g=g.replace(b,""),this.rows[f].obj[a]=g;var h=this.columns.indexOf(a);this.rows[f].arr[h]=g}else for(var i=0;i<this.rows.length;i++){var j=this.rows[i].arr[a];j=j.replace(b,""),this.rows[i].arr[a]=j,this.rows[i].obj[this.columns[a]]=j}},d.Table.prototype.removeColumn=function(a){var b,c;"string"==typeof a?(b=a,c=this.columns.indexOf(a),console.log("string")):(c=a,b=this.columns[a]);var d=this.columns.splice(c+1,this.columns.length);this.columns.pop(),this.columns=this.columns.concat(d);for(var e=0;e<this.rows.length;e++){var f=this.rows[e].arr,g=f.splice(c+1,f.length);f.pop(),this.rows[e].arr=f.concat(g),delete this.rows[e].obj[b]}},d.Table.prototype.set=function(a,b,c){this.rows[a].set(b,c)},d.Table.prototype.setNum=function(a,b,c){this.rows[a].setNum(b,c)},d.Table.prototype.setString=function(a,b,c){this.rows[a].setString(b,c);
},d.Table.prototype.get=function(a,b){return this.rows[a].get(b)},d.Table.prototype.getNum=function(a,b){return this.rows[a].getNum(b)},d.Table.prototype.getString=function(a,b){return this.rows[a].getString(b)},d.Table.prototype.getObject=function(a){for(var b,c,d,e={},f=0;f<this.rows.length;f++)if(b=this.rows[f].obj,"string"==typeof a){if(c=this.columns.indexOf(a),!(c>=0))throw'This table has no column named "'+a+'"';d=b[a],e[d]=b}else e[f]=this.rows[f].obj;return e},d.Table.prototype.getArray=function(){for(var a=[],b=0;b<this.rows.length;b++)a.push(this.rows[b].arr);return a},b.exports=d.Table},{"../core/core":37}],61:[function(a,b,c){"use strict";var d=a("../core/core");d.TableRow=function(a,b){var c=[],d={};a&&(b=b||",",c=a.split(b));for(var e=0;e<c.length;e++){var f=e,g=c[e];d[f]=g}this.arr=c,this.obj=d,this.table=null},d.TableRow.prototype.set=function(a,b){if("string"==typeof a){var c=this.table.columns.indexOf(a);if(!(c>=0))throw'This table has no column named "'+a+'"';this.obj[a]=b,this.arr[c]=b}else{if(!(a<this.table.columns.length))throw"Column #"+a+" is out of the range of this table";this.arr[a]=b;var d=this.table.columns[a];this.obj[d]=b}},d.TableRow.prototype.setNum=function(a,b){var c=parseFloat(b,10);this.set(a,c)},d.TableRow.prototype.setString=function(a,b){var c=b.toString();this.set(a,c)},d.TableRow.prototype.get=function(a){return"string"==typeof a?this.obj[a]:this.arr[a]},d.TableRow.prototype.getNum=function(a){var b;if(b="string"==typeof a?parseFloat(this.obj[a],10):parseFloat(this.arr[a],10),"NaN"===b.toString())throw"Error: "+this.obj[a]+" is NaN (Not a Number)";return b},d.TableRow.prototype.getString=function(a){return"string"==typeof a?this.obj[a].toString():this.arr[a].toString()},b.exports=d.TableRow},{"../core/core":37}],62:[function(a,b,c){"use strict";var d=a("../core/core");d.XML=function(){this.name=null,this.attributes={},this.children=[],this.parent=null,this.content=null},d.XML.prototype.getParent=function(){return this.parent},d.XML.prototype.getName=function(){return this.name},d.XML.prototype.setName=function(a){this.name=a},d.XML.prototype.hasChildren=function(){return this.children.length>0},d.XML.prototype.listChildren=function(){return this.children.map(function(a){return a.name})},d.XML.prototype.getChildren=function(a){return a?this.children.filter(function(b){return b.name===a}):this.children},d.XML.prototype.getChild=function(a){return"string"==typeof a?this.children.find(function(b){return b.name===a}):this.children[a]},d.XML.prototype.addChild=function(a){a instanceof d.XML&&this.children.push(a)},d.XML.prototype.removeChild=function(a){var b=-1;if("string"==typeof a){for(var c=0;c<this.children.length;c++)if(this.children[c].name===a){b=c;break}}else b=a;-1!==b&&this.children.splice(b,1)},d.XML.prototype.getAttributeCount=function(){return Object.keys(this.attributes).length},d.XML.prototype.listAttributes=function(){return Object.keys(this.attributes)},d.XML.prototype.hasAttribute=function(a){return this.attributes[a]?!0:!1},d.XML.prototype.getNumber=function(a,b){return Number(this.attributes[a])||b||0},d.XML.prototype.getString=function(a,b){return String(this.attributes[a])||b||null},d.XML.prototype.setAttribute=function(a,b){this.attributes[a]&&(this.attributes[a]=b)},d.XML.prototype.getContent=function(a){return this.content||a||null},d.XML.prototype.setContent=function(a){this.children.length||(this.content=a)},d.XML.prototype._setCont=function(a){var b;b=a,b=b.replace(/\s\s+/g,","),this.content=b},d.XML.prototype._setAttributes=function(a){var b,c={};for(b=0;b<a.attributes.length;b++)c[a.attributes[b].nodeName]=a.attributes[b].nodeValue;this.attributes=c},b.exports=d.XML},{"../core/core":37}],63:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.abs=Math.abs,d.prototype.ceil=Math.ceil,d.prototype.constrain=function(a,b,c){return Math.max(Math.min(a,c),b)},d.prototype.dist=function(a,b,c,d,e,f){return 4===arguments.length?Math.sqrt((c-a)*(c-a)+(d-b)*(d-b)):6===arguments.length?Math.sqrt((d-a)*(d-a)+(e-b)*(e-b)+(f-c)*(f-c)):void 0},d.prototype.exp=Math.exp,d.prototype.floor=Math.floor,d.prototype.lerp=function(a,b,c){return c*(b-a)+a},d.prototype.log=Math.log,d.prototype.mag=function(a,b){return Math.sqrt(a*a+b*b)},d.prototype.map=function(a,b,c,d,e){return(a-b)/(c-b)*(e-d)+d},d.prototype.max=function(){return arguments[0]instanceof Array?Math.max.apply(null,arguments[0]):Math.max.apply(null,arguments)},d.prototype.min=function(){return arguments[0]instanceof Array?Math.min.apply(null,arguments[0]):Math.min.apply(null,arguments)},d.prototype.norm=function(a,b,c){return this.map(a,b,c,0,1)},d.prototype.pow=Math.pow,d.prototype.round=Math.round,d.prototype.sq=function(a){return a*a},d.prototype.sqrt=Math.sqrt,b.exports=d},{"../core/core":37}],64:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.createVector=function(a,b,c){return this instanceof d?new d.Vector(this,arguments):new d.Vector(a,b,c)},b.exports=d},{"../core/core":37}],65:[function(a,b,c){"use strict";var d,e=a("../core/core"),f=4,g=1<<f,h=8,i=1<<h,j=4095,k=4,l=.5,m=function(a){return.5*(1-Math.cos(a*Math.PI))};e.prototype.noise=function(a,b,c){if(b=b||0,c=c||0,null==d){d=new Array(j+1);for(var e=0;j+1>e;e++)d[e]=Math.random()}0>a&&(a=-a),0>b&&(b=-b),0>c&&(c=-c);for(var n,o,p,q,r,s=Math.floor(a),t=Math.floor(b),u=Math.floor(c),v=a-s,w=b-t,x=c-u,y=0,z=.5,A=0;k>A;A++){var B=s+(t<<f)+(u<<h);n=m(v),o=m(w),p=d[B&j],p+=n*(d[B+1&j]-p),q=d[B+g&j],q+=n*(d[B+g+1&j]-q),p+=o*(q-p),B+=i,q=d[B&j],q+=n*(d[B+1&j]-q),r=d[B+g&j],r+=n*(d[B+g+1&j]-r),q+=o*(r-q),p+=m(x)*(q-p),y+=p*z,z*=l,s<<=1,v*=2,t<<=1,w*=2,u<<=1,x*=2,v>=1&&(s++,v--),w>=1&&(t++,w--),x>=1&&(u++,x--)}return y},e.prototype.noiseDetail=function(a,b){a>0&&(k=a),b>0&&(l=b)},e.prototype.noiseSeed=function(a){var b=function(){var a,b,c=4294967296,d=1664525,e=1013904223;return{setSeed:function(d){b=a=(null==d?Math.random()*c:d)>>>0},getSeed:function(){return a},rand:function(){return b=(d*b+e)%c,b/c}}}();b.setSeed(a),d=new Array(j+1);for(var c=0;j+1>c;c++)d[c]=b.rand()},b.exports=e},{"../core/core":37}],66:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("./polargeometry"),f=a("../core/constants");d.Vector=function(){var a,b,c;arguments[0]instanceof d?(this.p5=arguments[0],a=arguments[1][0]||0,b=arguments[1][1]||0,c=arguments[1][2]||0):(a=arguments[0]||0,b=arguments[1]||0,c=arguments[2]||0),this.x=a,this.y=b,this.z=c},d.Vector.prototype.toString=function(){return"p5.Vector Object : ["+this.x+", "+this.y+", "+this.z+"]"},d.Vector.prototype.set=function(a,b,c){return a instanceof d.Vector?(this.x=a.x||0,this.y=a.y||0,this.z=a.z||0,this):a instanceof Array?(this.x=a[0]||0,this.y=a[1]||0,this.z=a[2]||0,this):(this.x=a||0,this.y=b||0,this.z=c||0,this)},d.Vector.prototype.copy=function(){return this.p5?new d.Vector(this.p5,[this.x,this.y,this.z]):new d.Vector(this.x,this.y,this.z)},d.Vector.prototype.add=function(a,b,c){return a instanceof d.Vector?(this.x+=a.x||0,this.y+=a.y||0,this.z+=a.z||0,this):a instanceof Array?(this.x+=a[0]||0,this.y+=a[1]||0,this.z+=a[2]||0,this):(this.x+=a||0,this.y+=b||0,this.z+=c||0,this)},d.Vector.prototype.sub=function(a,b,c){return a instanceof d.Vector?(this.x-=a.x||0,this.y-=a.y||0,this.z-=a.z||0,this):a instanceof Array?(this.x-=a[0]||0,this.y-=a[1]||0,this.z-=a[2]||0,this):(this.x-=a||0,this.y-=b||0,this.z-=c||0,this)},d.Vector.prototype.mult=function(a){return this.x*=a||0,this.y*=a||0,this.z*=a||0,this},d.Vector.prototype.div=function(a){return this.x/=a,this.y/=a,this.z/=a,this},d.Vector.prototype.mag=function(){return Math.sqrt(this.magSq())},d.Vector.prototype.magSq=function(){var a=this.x,b=this.y,c=this.z;return a*a+b*b+c*c},d.Vector.prototype.dot=function(a,b,c){return a instanceof d.Vector?this.dot(a.x,a.y,a.z):this.x*(a||0)+this.y*(b||0)+this.z*(c||0)},d.Vector.prototype.cross=function(a){var b=this.y*a.z-this.z*a.y,c=this.z*a.x-this.x*a.z,e=this.x*a.y-this.y*a.x;return this.p5?new d.Vector(this.p5,[b,c,e]):new d.Vector(b,c,e)},d.Vector.prototype.dist=function(a){var b=a.copy().sub(this);return b.mag()},d.Vector.prototype.normalize=function(){return 0===this.mag()?this:this.div(this.mag())},d.Vector.prototype.limit=function(a){var b=this.magSq();return b>a*a&&(this.div(Math.sqrt(b)),this.mult(a)),this},d.Vector.prototype.setMag=function(a){return this.normalize().mult(a)},d.Vector.prototype.heading=function(){var a=Math.atan2(this.y,this.x);return this.p5?this.p5._angleMode===f.RADIANS?a:e.radiansToDegrees(a):a},d.Vector.prototype.rotate=function(a){this.p5&&this.p5._angleMode===f.DEGREES&&(a=e.degreesToRadians(a));var b=this.heading()+a,c=this.mag();return this.x=Math.cos(b)*c,this.y=Math.sin(b)*c,this},d.Vector.prototype.lerp=function(a,b,c,e){return a instanceof d.Vector?this.lerp(a.x,a.y,a.z,b):(this.x+=(a-this.x)*e||0,this.y+=(b-this.y)*e||0,this.z+=(c-this.z)*e||0,this)},d.Vector.prototype.array=function(){return[this.x||0,this.y||0,this.z||0]},d.Vector.prototype.equals=function(a,b,c){var e,f,g;return a instanceof d.Vector?(e=a.x||0,f=a.y||0,g=a.z||0):a instanceof Array?(e=a[0]||0,f=a[1]||0,g=a[2]||0):(e=a||0,f=b||0,g=c||0),this.x===e&&this.y===f&&this.z===g},d.Vector.fromAngle=function(a){return this.p5&&this.p5._angleMode===f.DEGREES&&(a=e.degreesToRadians(a)),this.p5?new d.Vector(this.p5,[Math.cos(a),Math.sin(a),0]):new d.Vector(Math.cos(a),Math.sin(a),0)},d.Vector.random2D=function(){var a;return a=this.p5?this.p5._angleMode===f.DEGREES?this.p5.random(360):this.p5.random(f.TWO_PI):Math.random()*Math.PI*2,this.fromAngle(a)},d.Vector.random3D=function(){var a,b;this.p5?(a=this.p5.random(0,f.TWO_PI),b=this.p5.random(-1,1)):(a=Math.random()*Math.PI*2,b=2*Math.random()-1);var c=Math.sqrt(1-b*b)*Math.cos(a),e=Math.sqrt(1-b*b)*Math.sin(a);return this.p5?new d.Vector(this.p5,[c,e,b]):new d.Vector(c,e,b)},d.Vector.add=function(a,b,c){return c?c.set(a):c=a.copy(),c.add(b),c},d.Vector.sub=function(a,b,c){return c?c.set(a):c=a.copy(),c.sub(b),c},d.Vector.mult=function(a,b,c){return c?c.set(a):c=a.copy(),c.mult(b),c},d.Vector.div=function(a,b,c){return c?c.set(a):c=a.copy(),c.div(b),c},d.Vector.dot=function(a,b){return a.dot(b)},d.Vector.cross=function(a,b){return a.cross(b)},d.Vector.dist=function(a,b){return a.dist(b)},d.Vector.lerp=function(a,b,c,d){return d?d.set(a):d=a.copy(),d.lerp(b,c),d},d.Vector.angleBetween=function(a,b){var c=Math.acos(a.dot(b)/(a.mag()*b.mag()));return this.p5&&this.p5._angleMode===f.DEGREES&&(c=e.radiansToDegrees(c)),c},d.Vector.mag=function(a){var b=a.x,c=a.y,d=a.z,e=b*b+c*c+d*d;return Math.sqrt(e)},b.exports=d.Vector},{"../core/constants":36,"../core/core":37,"./polargeometry":67}],67:[function(a,b,c){b.exports={degreesToRadians:function(a){return 2*Math.PI*a/360},radiansToDegrees:function(a){return 360*a/(2*Math.PI)}}},{}],68:[function(a,b,c){"use strict";var d=a("../core/core"),e=!1,f=function(){var a,b,c=4294967296,d=1664525,e=1013904223;return{setSeed:function(d){b=a=(null==d?Math.random()*c:d)>>>0},getSeed:function(){return a},rand:function(){return b=(d*b+e)%c,b/c}}}();d.prototype.randomSeed=function(a){f.setSeed(a),e=!0},d.prototype.random=function(a,b){var c;if(c=e?f.rand():Math.random(),"undefined"==typeof a)return c;if("undefined"==typeof b)return a instanceof Array?a[Math.floor(c*a.length)]:c*a;if(a>b){var d=a;a=b,b=d}return c*(b-a)+a};var g,h=!1;d.prototype.randomGaussian=function(a,b){var c,d,e,f;if(h)c=g,h=!1;else{do d=this.random(2)-1,e=this.random(2)-1,f=d*d+e*e;while(f>=1);f=Math.sqrt(-2*Math.log(f)/f),c=d*f,g=e*f,h=!0}var i=a||0,j=b||1;return c*j+i},b.exports=d},{"../core/core":37}],69:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("./polargeometry"),f=a("../core/constants");d.prototype._angleMode=f.RADIANS,d.prototype.acos=function(a){return this._angleMode===f.RADIANS?Math.acos(a):e.radiansToDegrees(Math.acos(a))},d.prototype.asin=function(a){return this._angleMode===f.RADIANS?Math.asin(a):e.radiansToDegrees(Math.asin(a))},d.prototype.atan=function(a){return this._angleMode===f.RADIANS?Math.atan(a):e.radiansToDegrees(Math.atan(a))},d.prototype.atan2=function(a,b){return this._angleMode===f.RADIANS?Math.atan2(a,b):e.radiansToDegrees(Math.atan2(a,b))},d.prototype.cos=function(a){return this._angleMode===f.RADIANS?Math.cos(a):Math.cos(this.radians(a))},d.prototype.sin=function(a){return this._angleMode===f.RADIANS?Math.sin(a):Math.sin(this.radians(a))},d.prototype.tan=function(a){return this._angleMode===f.RADIANS?Math.tan(a):Math.tan(this.radians(a))},d.prototype.degrees=function(a){return e.radiansToDegrees(a)},d.prototype.radians=function(a){return e.degreesToRadians(a)},d.prototype.angleMode=function(a){(a===f.DEGREES||a===f.RADIANS)&&(this._angleMode=a)},b.exports=d},{"../core/constants":36,"../core/core":37,"./polargeometry":67}],70:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.textAlign=function(a,b){return this._renderer.textAlign.apply(this._renderer,arguments)},d.prototype.textLeading=function(a){return this._renderer.textLeading.apply(this._renderer,arguments)},d.prototype.textSize=function(a){return this._renderer.textSize.apply(this._renderer,arguments)},d.prototype.textStyle=function(a){return this._renderer.textStyle.apply(this._renderer,arguments)},d.prototype.textWidth=function(a){return 0===a.length?0:this._renderer.textWidth.apply(this._renderer,arguments)},d.prototype.textAscent=function(){return this._renderer.textAscent()},d.prototype.textDescent=function(){return this._renderer.textDescent()},d.prototype._updateTextMetrics=function(){return this._renderer._updateTextMetrics()},b.exports=d},{"../core/core":37}],71:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("../core/constants");a("../core/error_helpers"),d.prototype.text=function(a,b,c,d,e){for(var f=new Array(arguments.length),g=0;g<f.length;++g)f[g]=arguments[g];return this._validateParameters("text",f,[["*","Number","Number"],["*","Number","Number","Number","Number"]]),this._renderer._doFill||this._renderer._doStroke?this._renderer.text.apply(this._renderer,arguments):this},d.prototype.textFont=function(a,b){if(arguments.length){if(!a)throw Error("null font passed to textFont");return this._renderer._setProperty("_textFont",a),b&&(this._renderer._setProperty("_textSize",b),this._renderer._setProperty("_textLeading",b*e._DEFAULT_LEADMULT)),this._renderer._applyTextProperties()}return this},b.exports=d},{"../core/constants":36,"../core/core":37,"../core/error_helpers":40}],72:[function(a,b,c){"use strict";function d(a,b){for(var c=h(b,{sampleFactor:.1,simplifyThreshold:0}),d=n(a,0,1),f=d/(d*c.sampleFactor),g=[],i=0;d>i;i+=f)g.push(n(a,i));return c.simplifyThreshold&&e(g,c.simplifyThreshold),g}function e(a,b){b="undefined"==typeof b?0:b;for(var c=0,d=a.length-1;a.length>3&&d>=0;--d)j(i(a,d-1),i(a,d),i(a,d+1),b)&&(a.splice(d%a.length,1),c++);return c}function f(a){for(var b,c=[],d=0;d<a.length;d++)"M"===a[d].type&&(b&&c.push(b),b=[]),b.push(g(a[d]));return c.push(b),c}function g(a){var b=[a.type];return"M"===a.type||"L"===a.type?b.push(a.x,a.y):"C"===a.type?b.push(a.x1,a.y1,a.x2,a.y2,a.x,a.y):"Q"===a.type&&b.push(a.x1,a.y1,a.x,a.y),b}function h(a,b){if("object"!=typeof a)a=b;else for(var c in b)"undefined"==typeof a[c]&&(a[c]=b[c]);return a}function i(a,b){var c=a.length;return a[0>b?b%c+c:b%c]}function j(a,b,c,d){if(!d)return 0===k(a,b,c);"undefined"==typeof j.tmpPoint1&&(j.tmpPoint1=[],j.tmpPoint2=[]);var e=j.tmpPoint1,f=j.tmpPoint2;e.x=b.x-a.x,e.y=b.y-a.y,f.x=c.x-b.x,f.y=c.y-b.y;var g=e.x*f.x+e.y*f.y,h=Math.sqrt(e.x*e.x+e.y*e.y),i=Math.sqrt(f.x*f.x+f.y*f.y),l=Math.acos(g/(h*i));return d>l}function k(a,b,c){return(b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1])}function l(a,b,c,d,e,f,g,h,i){var j=1-i,k=Math.pow(j,3),l=Math.pow(j,2),m=i*i,n=m*i,o=k*a+3*l*i*c+3*j*i*i*e+n*g,p=k*b+3*l*i*d+3*j*i*i*f+n*h,q=a+2*i*(c-a)+m*(e-2*c+a),r=b+2*i*(d-b)+m*(f-2*d+b),s=c+2*i*(e-c)+m*(g-2*e+c),t=d+2*i*(f-d)+m*(h-2*f+d),u=j*a+i*c,v=j*b+i*d,w=j*e+i*g,x=j*f+i*h,y=90-180*Math.atan2(q-s,r-t)/Math.PI;return(q>s||t>r)&&(y+=180),{x:o,y:p,m:{x:q,y:r},n:{x:s,y:t},start:{x:u,y:v},end:{x:w,y:x},alpha:y}}function m(a,b,c,d,e,f,g,h,i){return null==i?u(a,b,c,d,e,f,g,h):l(a,b,c,d,e,f,g,h,v(a,b,c,d,e,f,g,h,i))}function n(a,b,c){a=p(a);for(var d,e,f,g,h,i="",j={},k=0,n=0,o=a.length;o>n;n++){if(f=a[n],"M"===f[0])d=+f[1],e=+f[2];else{if(g=m(d,e,f[1],f[2],f[3],f[4],f[5],f[6]),k+g>b&&!c)return h=m(d,e,f[1],f[2],f[3],f[4],f[5],f[6],b-k),{x:h.x,y:h.y,alpha:h.alpha};k+=g,d=+f[5],e=+f[6]}i+=f.shift()+f}return j.end=i,h=c?k:l(d,e,f[0],f[1],f[2],f[3],f[4],f[5],1),h.alpha&&(h={x:h.x,y:h.y,alpha:h.alpha}),h}function o(a){var b=[],c=0,d=0,e=0,f=0,g=0;"M"===a[0][0]&&(c=+a[0][1],d=+a[0][2],e=c,f=d,g++,b[0]=["M",c,d]);for(var h,i,j,k=3===a.length&&"M"===a[0][0]&&"R"===a[1][0].toUpperCase()&&"Z"===a[2][0].toUpperCase(),l=g,m=a.length;m>l;l++){if(b.push(i=[]),j=a[l],j[0]!==String.prototype.toUpperCase.call(j[0]))switch(i[0]=String.prototype.toUpperCase.call(j[0]),i[0]){case"A":i[1]=j[1],i[2]=j[2],i[3]=j[3],i[4]=j[4],i[5]=j[5],i[6]=+(j[6]+c),i[7]=+(j[7]+d);break;case"V":i[1]=+j[1]+d;break;case"H":i[1]=+j[1]+c;break;case"R":h=[c,d].concat(j.slice(1));for(var n=2,o=h.length;o>n;n++)h[n]=+h[n]+c,h[++n]=+h[n]+d;b.pop(),b=b.concat(r(h,k));break;case"M":e=+j[1]+c,f=+j[2]+d;break;default:for(n=1,o=j.length;o>n;n++)i[n]=+j[n]+(n%2?c:d)}else if("R"===j[0])h=[c,d].concat(j.slice(1)),b.pop(),b=b.concat(r(h,k)),i=["R"].concat(j.slice(-2));else for(var p=0,q=j.length;q>p;p++)i[p]=j[p];switch(i[0]){case"Z":c=e,d=f;break;case"H":c=i[1];break;case"V":d=i[1];break;case"M":e=i[i.length-2],f=i[i.length-1];break;default:c=i[i.length-2],d=i[i.length-1]}}return b}function p(a,b){for(var c=o(a),d=b&&o(b),e={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},f={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},g=(function(a,b,c){var d,e,f={T:1,Q:1};if(!a)return["C",b.x,b.y,b.x,b.y,b.x,b.y];switch(a[0]in f||(b.qx=b.qy=null),a[0]){case"M":b.X=a[1],b.Y=a[2];break;case"A":a=["C"].concat(q.apply(0,[b.x,b.y].concat(a.slice(1))));break;case"S":"C"===c||"S"===c?(d=2*b.x-b.bx,e=2*b.y-b.by):(d=b.x,e=b.y),a=["C",d,e].concat(a.slice(1));break;case"T":"Q"===c||"T"===c?(b.qx=2*b.x-b.qx,b.qy=2*b.y-b.qy):(b.qx=b.x,b.qy=b.y),a=["C"].concat(t(b.x,b.y,b.qx,b.qy,a[1],a[2]));break;case"Q":b.qx=a[1],b.qy=a[2],a=["C"].concat(t(b.x,b.y,a[1],a[2],a[3],a[4]));break;case"L":a=["C"].concat(s(b.x,b.y,a[1],a[2]));break;case"H":a=["C"].concat(s(b.x,b.y,a[1],b.y));break;case"V":a=["C"].concat(s(b.x,b.y,b.x,a[1]));break;case"Z":a=["C"].concat(s(b.x,b.y,b.X,b.Y))}return a}),h=function(a,b){if(a[b].length>7){a[b].shift();for(var e=a[b];e.length;)j[b]="A",d&&(k[b]="A"),a.splice(b++,0,["C"].concat(e.splice(0,6)));a.splice(b,1),p=Math.max(c.length,d&&d.length||0)}},i=function(a,b,e,f,g){a&&b&&"M"===a[g][0]&&"M"!==b[g][0]&&(b.splice(g,0,["M",f.x,f.y]),e.bx=0,e.by=0,e.x=a[g][1],e.y=a[g][2],p=Math.max(c.length,d&&d.length||0))},j=[],k=[],l="",m="",n=0,p=Math.max(c.length,d&&d.length||0);p>n;n++){c[n]&&(l=c[n][0]),"C"!==l&&(j[n]=l,n&&(m=j[n-1])),c[n]=g(c[n],e,m),"A"!==j[n]&&"C"===l&&(j[n]="C"),h(c,n),d&&(d[n]&&(l=d[n][0]),"C"!==l&&(k[n]=l,n&&(m=k[n-1])),d[n]=g(d[n],f,m),"A"!==k[n]&&"C"===l&&(k[n]="C"),h(d,n)),i(c,d,e,f,n),i(d,c,f,e,n);var r=c[n],u=d&&d[n],v=r.length,w=d&&u.length;e.x=r[v-2],e.y=r[v-1],e.bx=parseFloat(r[v-4])||e.x,e.by=parseFloat(r[v-3])||e.y,f.bx=d&&(parseFloat(u[w-4])||f.x),f.by=d&&(parseFloat(u[w-3])||f.y),f.x=d&&u[w-2],f.y=d&&u[w-1]}return d?[c,d]:c}function q(a,b,c,d,e,f,g,h,i,j){var k,l,m,n,o,p=Math.PI,r=120*p/180,s=p/180*(+e||0),t=[],u=function(a,b,c){var d=a*Math.cos(c)-b*Math.sin(c),e=a*Math.sin(c)+b*Math.cos(c);return{x:d,y:e}};if(j)k=j[0],l=j[1],m=j[2],n=j[3];else{o=u(a,b,-s),a=o.x,b=o.y,o=u(h,i,-s),h=o.x,i=o.y;var v=(a-h)/2,w=(b-i)/2,x=v*v/(c*c)+w*w/(d*d);x>1&&(x=Math.sqrt(x),c=x*c,d=x*d);var y=c*c,z=d*d,A=(f===g?-1:1)*Math.sqrt(Math.abs((y*z-y*w*w-z*v*v)/(y*w*w+z*v*v)));m=A*c*w/d+(a+h)/2,n=A*-d*v/c+(b+i)/2,k=Math.asin(((b-n)/d).toFixed(9)),l=Math.asin(((i-n)/d).toFixed(9)),k=m>a?p-k:k,l=m>h?p-l:l,0>k&&(k=2*p+k),0>l&&(l=2*p+l),g&&k>l&&(k-=2*p),!g&&l>k&&(l-=2*p)}var B=l-k;if(Math.abs(B)>r){var C=l,D=h,E=i;l=k+r*(g&&l>k?1:-1),h=m+c*Math.cos(l),i=n+d*Math.sin(l),t=q(h,i,c,d,e,0,g,D,E,[l,C,m,n])}B=l-k;var F=Math.cos(k),G=Math.sin(k),H=Math.cos(l),I=Math.sin(l),J=Math.tan(B/4),K=4/3*c*J,L=4/3*d*J,M=[a,b],N=[a+K*G,b-L*F],O=[h+K*I,i-L*H],P=[h,i];if(N[0]=2*M[0]-N[0],N[1]=2*M[1]-N[1],j)return[N,O,P].concat(t);t=[N,O,P].concat(t).join().split(",");for(var Q=[],R=0,S=t.length;S>R;R++)Q[R]=R%2?u(t[R-1],t[R],s).y:u(t[R],t[R+1],s).x;return Q}function r(a,b){for(var c=[],d=0,e=a.length;e-2*!b>d;d+=2){var f=[{x:+a[d-2],y:+a[d-1]},{x:+a[d],y:+a[d+1]},{x:+a[d+2],y:+a[d+3]},{x:+a[d+4],y:+a[d+5]}];b?d?e-4===d?f[3]={x:+a[0],y:+a[1]}:e-2===d&&(f[2]={x:+a[0],y:+a[1]},f[3]={x:+a[2],y:+a[3]}):f[0]={x:+a[e-2],y:+a[e-1]}:e-4===d?f[3]=f[2]:d||(f[0]={x:+a[d],y:+a[d+1]}),c.push(["C",(-f[0].x+6*f[1].x+f[2].x)/6,(-f[0].y+6*f[1].y+f[2].y)/6,(f[1].x+6*f[2].x-f[3].x)/6,(f[1].y+6*f[2].y-f[3].y)/6,f[2].x,f[2].y])}return c}function s(a,b,c,d){return[a,b,c,d,c,d]}function t(a,b,c,d,e,f){var g=1/3,h=2/3;return[g*a+h*c,g*b+h*d,g*e+h*c,g*f+h*d,e,f]}function u(a,b,c,d,e,f,g,h,i){null==i&&(i=1),i=i>1?1:0>i?0:i;for(var j=i/2,k=12,l=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],m=0,n=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],o=0;k>o;o++){var p=j*l[o]+j,q=w(p,a,c,e,g),r=w(p,b,d,f,h),s=q*q+r*r;m+=n[o]*Math.sqrt(s)}return j*m}function v(a,b,c,d,e,f,g,h,i){if(!(0>i||u(a,b,c,d,e,f,g,h)<i)){var j,k=1,l=k/2,m=k-l,n=.01;for(j=u(a,b,c,d,e,f,g,h,m);Math.abs(j-i)>n;)l/=2,m+=(i>j?1:-1)*l,j=u(a,b,c,d,e,f,g,h,m);return m}}function w(a,b,c,d,e){var f=-3*b+9*c-9*d+3*e,g=a*f+6*b-12*c+6*d;return a*g-3*b+3*c}function x(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];b=a.length;for(var c="";b--;)c+=a[b]===Object(a[b])?JSON.stringify(a[b]):a[b];return c}var y=a("../core/core"),z=a("../core/constants");y.Font=function(a){this.parent=a,this.cache={},this.font=void 0},y.Font.prototype.list=function(){throw"not yet implemented"},y.Font.prototype.textBounds=function(a,b,c,d,e){b=void 0!==b?b:0,c=void 0!==c?c:0,d=d||this.parent._renderer._textSize;var f=e&&e.renderer&&e.renderer._pInst||this.parent,g=f._renderer.drawingContext,h=g.textAlign||z.LEFT,i=g.textBaseline||z.BASELINE,j=this.cache[x("textBounds",a,b,c,d,h,i)];if(!j){var k,l,m,n,o=[],p=[],q=this,r=this._scale(d);this.font.forEachGlyph(a,b,c,d,e,function(a,b,c,e){o.push(b),p.push(c);var f=a.getMetrics();"space"!==a.name?(o.push(b+f.xMax*r),p.push(c+-f.yMin*r),p.push(c+-f.yMax*r)):o.push(b+q.font.charToGlyph(" ").advanceWidth*q._scale(d))}),k=Math.min.apply(null,o),l=Math.min.apply(null,p),m=Math.max.apply(null,o),n=Math.max.apply(null,p),j={x:k,y:l,h:n-l,w:m-k,advance:k-b};var s=j.w+j.advance,t=this._handleAlignment(f,g,a,j.x,j.y,s);j.x=t.x,j.y=t.y,this.cache[x("textBounds",a,b,c,d,h,i)]=j}return j},y.Font.prototype.textToPoints=function(a,b,c,e,g){var h=0,i=[],j=this._getGlyphs(a);e=e||this.parent._renderer._textSize;for(var k=0;k<j.length;k++){for(var l=j[k].getPath(b,c,e),m=f(l.commands),n=0;n<m.length;n++)for(var o=d(m[n],g),p=0;p<o.length;p++)o[p].x+=h,i.push(o[p]);h+=j[k].advanceWidth*this._scale(e)}return i},y.Font.prototype._getGlyphs=function(a){return this.font.stringToGlyphs(a)},y.Font.prototype._getPath=function(a,b,c,d){var e=d&&d.renderer&&d.renderer._pInst||this.parent,f=e._renderer.drawingContext,g=this._handleAlignment(e,f,a,b,c);return this.font.getPath(a,g.x,g.y,e._renderer._textSize,d)},y.Font.prototype._getPathData=function(a,b,c,d){var e=3;return"string"==typeof a&&arguments.length>2?a=this._getPath(a,b,c,d):"object"==typeof b&&(d=b),d&&"number"==typeof d.decimals&&(e=d.decimals),a.toPathData(e)},y.Font.prototype._getSVG=function(a,b,c,d){var e=3;return"string"==typeof a&&arguments.length>2?a=this._getPath(a,b,c,d):"object"==typeof b&&(d=b),d&&("number"==typeof d.decimals&&(e=d.decimals),"number"==typeof d.strokeWidth&&(a.strokeWidth=d.strokeWidth),"undefined"!=typeof d.fill&&(a.fill=d.fill),"undefined"!=typeof d.stroke&&(a.stroke=d.stroke)),a.toSVG(e)},y.Font.prototype._renderPath=function(a,b,c,d){var e,f=d&&d.renderer||this.parent._renderer,g=f.drawingContext;e="object"==typeof a&&a.commands?a.commands:this._getPath(a,b,c,d).commands,g.beginPath();for(var h=0;h<e.length;h+=1){var i=e[h];"M"===i.type?g.moveTo(i.x,i.y):"L"===i.type?g.lineTo(i.x,i.y):"C"===i.type?g.bezierCurveTo(i.x1,i.y1,i.x2,i.y2,i.x,i.y):"Q"===i.type?g.quadraticCurveTo(i.x1,i.y1,i.x,i.y):"Z"===i.type&&g.closePath()}return f._doStroke&&f._strokeSet&&g.stroke(),f._doFill&&(g.fillStyle=f._fillSet?g.fillStyle:z._DEFAULT_TEXT_FILL,g.fill()),this},y.Font.prototype._textWidth=function(a,b){if(" "===a)return this.font.charToGlyph(" ").advanceWidth*this._scale(b);var c=this.textBounds(a,0,0,b);return c.w+c.advance},y.Font.prototype._textAscent=function(a){return this.font.ascender*this._scale(a)},y.Font.prototype._textDescent=function(a){return-this.font.descender*this._scale(a)},y.Font.prototype._scale=function(a){return 1/this.font.unitsPerEm*(a||this.parent._renderer._textSize)},y.Font.prototype._handleAlignment=function(a,b,c,d,e,f){var g=a._renderer._textSize,h=this._textAscent(g),i=this._textDescent(g);return f=void 0!==f?f:this._textWidth(c,g),b.textAlign===z.CENTER?d-=f/2:b.textAlign===z.RIGHT&&(d-=f),b.textBaseline===z.TOP?e+=h:b.textBaseline===z._CTX_MIDDLE?e+=h/2:b.textBaseline===z.BOTTOM&&(e-=i),{x:d,y:e}},b.exports=y.Font},{"../core/constants":36,"../core/core":37}],73:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.append=function(a,b){return a.push(b),a},d.prototype.arrayCopy=function(a,b,c,d,e){var f,g;"undefined"!=typeof e?(g=Math.min(e,a.length),f=d,a=a.slice(b,g+b)):("undefined"!=typeof c?(g=c,g=Math.min(g,a.length)):g=a.length,f=0,c=b,a=a.slice(0,g)),Array.prototype.splice.apply(c,[f,g].concat(a))},d.prototype.concat=function(a,b){return a.concat(b)},d.prototype.reverse=function(a){return a.reverse()},d.prototype.shorten=function(a){return a.pop(),a},d.prototype.shuffle=function(a,b){var c=ArrayBuffer&&ArrayBuffer.isView&&ArrayBuffer.isView(a);a=b||c?a:a.slice();for(var d,e,f=a.length;f>1;)d=Math.random()*f|0,e=a[--f],a[f]=a[d],a[d]=e;return a},d.prototype.sort=function(a,b){var c=b?a.slice(0,Math.min(b,a.length)):a,d=b?a.slice(Math.min(b,a.length)):[];return c="string"==typeof c[0]?c.sort():c.sort(function(a,b){return a-b}),c.concat(d)},d.prototype.splice=function(a,b,c){return Array.prototype.splice.apply(a,[c,0].concat(b)),a},d.prototype.subset=function(a,b,c){return"undefined"!=typeof c?a.slice(b,b+c):a.slice(b,a.length)},b.exports=d},{"../core/core":37}],74:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype["float"]=function(a){return parseFloat(a)},d.prototype["int"]=function(a,b){return"string"==typeof a?(b=b||10,parseInt(a,b)):"number"==typeof a?0|a:"boolean"==typeof a?a?1:0:a instanceof Array?a.map(function(a){return d.prototype["int"](a,b)}):void 0},d.prototype.str=function(a){return a instanceof Array?a.map(d.prototype.str):String(a)},d.prototype["boolean"]=function(a){return"number"==typeof a?0!==a:"string"==typeof a?"true"===a.toLowerCase():"boolean"==typeof a?a:a instanceof Array?a.map(d.prototype["boolean"]):void 0},d.prototype["byte"]=function(a){var b=d.prototype["int"](a,10);return"number"==typeof b?(b+128)%256-128:b instanceof Array?b.map(d.prototype["byte"]):void 0},d.prototype["char"]=function(a){return"number"!=typeof a||isNaN(a)?a instanceof Array?a.map(d.prototype["char"]):"string"==typeof a?d.prototype["char"](parseInt(a,10)):void 0:String.fromCharCode(a)},d.prototype.unchar=function(a){return"string"==typeof a&&1===a.length?a.charCodeAt(0):a instanceof Array?a.map(d.prototype.unchar):void 0},d.prototype.hex=function(a,b){if(b=void 0===b||null===b?b=8:b,a instanceof Array)return a.map(function(a){return d.prototype.hex(a,b)});if("number"==typeof a){0>a&&(a=4294967295+a+1);for(var c=Number(a).toString(16).toUpperCase();c.length<b;)c="0"+c;return c.length>=b&&(c=c.substring(c.length-b,c.length)),c}},d.prototype.unhex=function(a){return a instanceof Array?a.map(d.prototype.unhex):parseInt("0x"+a,16)},b.exports=d},{"../core/core":37}],75:[function(a,b,c){"use strict";function d(){var a=arguments[0],b=0>a,c=b?a.toString().substring(1):a.toString(),d=c.indexOf("."),e=-1!==d?c.substring(0,d):c,f=-1!==d?c.substring(d+1):"",g=b?"-":"";if(3===arguments.length){var h="";(-1!==d||arguments[2]-f.length>0)&&(h="."),f.length>arguments[2]&&(f=f.substring(0,arguments[2]));for(var i=0;i<arguments[1]-e.length;i++)g+="0";g+=e,g+=h,g+=f;for(var j=0;j<arguments[2]-f.length;j++)g+="0";return g}for(var k=0;k<Math.max(arguments[1]-e.length,0);k++)g+="0";return g+=c}function e(){var a=arguments[0].toString(),b=a.indexOf("."),c=-1!==b?a.substring(b):"",d=-1!==b?a.substring(0,b):a;if(d=d.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),0===arguments[1])c="";else if(void 0!==arguments[1])if(arguments[1]>c.length){c+=-1===b?".":"";for(var e=arguments[1]-c.length+1,f=0;e>f;f++)c+="0"}else c=c.substring(0,arguments[1]+1);return d+c}function f(){return parseFloat(arguments[0])>0?"+"+arguments[0].toString():arguments[0].toString()}function g(){return parseFloat(arguments[0])>0?" "+arguments[0].toString():arguments[0].toString()}var h=a("../core/core");h.prototype.join=function(a,b){return a.join(b)},h.prototype.match=function(a,b){return a.match(b)},h.prototype.matchAll=function(a,b){for(var c=new RegExp(b,"g"),d=c.exec(a),e=[];null!==d;)e.push(d),d=c.exec(a);return e},h.prototype.nf=function(){if(arguments[0]instanceof Array){var a=arguments[1],b=arguments[2];return arguments[0].map(function(c){return d(c,a,b)})}var c=Object.prototype.toString.call(arguments[0]);return"[object Arguments]"===c?3===arguments[0].length?this.nf(arguments[0][0],arguments[0][1],arguments[0][2]):2===arguments[0].length?this.nf(arguments[0][0],arguments[0][1]):this.nf(arguments[0][0]):d.apply(this,arguments)},h.prototype.nfc=function(){if(arguments[0]instanceof Array){var a=arguments[1];return arguments[0].map(function(b){return e(b,a)})}return e.apply(this,arguments)},h.prototype.nfp=function(){var a=this.nf.apply(this,arguments);return a instanceof Array?a.map(f):f(a)},h.prototype.nfs=function(){var a=this.nf.apply(this,arguments);return a instanceof Array?a.map(g):g(a)},h.prototype.split=function(a,b){return a.split(b)},h.prototype.splitTokens=function(){var a,b,c,d;return d=arguments[1],arguments.length>1?(c=/\]/g.exec(d),b=/\[/g.exec(d),b&&c?(d=d.slice(0,c.index)+d.slice(c.index+1),b=/\[/g.exec(d),d=d.slice(0,b.index)+d.slice(b.index+1),a=new RegExp("[\\["+d+"\\]]","g")):c?(d=d.slice(0,c.index)+d.slice(c.index+1),a=new RegExp("["+d+"\\]]","g")):b?(d=d.slice(0,b.index)+d.slice(b.index+1),a=new RegExp("["+d+"\\[]","g")):a=new RegExp("["+d+"]","g")):a=/\s/g,arguments[0].split(a).filter(function(a){return a})},h.prototype.trim=function(a){return a instanceof Array?a.map(this.trim):a.trim()},b.exports=h},{"../core/core":37}],76:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.day=function(){return(new Date).getDate()},d.prototype.hour=function(){return(new Date).getHours()},d.prototype.minute=function(){return(new Date).getMinutes()},d.prototype.millis=function(){return window.performance.now()},d.prototype.month=function(){return(new Date).getMonth()+1},d.prototype.second=function(){return(new Date).getSeconds()},d.prototype.year=function(){return(new Date).getFullYear()},b.exports=d},{"../core/core":37}],77:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.camera=function(a,b,c){for(var d=new Array(arguments.length),e=0;e<d.length;++e)d[e]=arguments[e];this._validateParameters("camera",d,["Number","Number","Number"]),this._renderer.translate(-a,-b,-c)},d.prototype.perspective=function(a,b,c,e){for(var f=new Array(arguments.length),g=0;g<f.length;++g)f[g]=arguments[g];this._validateParameters("perspective",f,["Number","Number","Number","Number"]),this._renderer.uPMatrix=d.Matrix.identity(),
this._renderer.uPMatrix.perspective(a,b,c,e),this._renderer._curCamera="custom"},d.prototype.ortho=function(a,b,c,e,f,g){for(var h=new Array(arguments.length),i=0;i<h.length;++i)h[i]=arguments[i];this._validateParameters("ortho",h,["Number","Number","Number","Number","Number","Number"]),a/=this.width,b/=this.width,e/=this.height,c/=this.height,this._renderer.uPMatrix=d.Matrix.identity(),this._renderer.uPMatrix.ortho(a,b,c,e,f,g),this._renderer._curCamera="custom"},b.exports=d},{"../core/core":37}],78:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.orbitControl=function(){return this.mouseIsPressed&&(this.rotateY((this.mouseX-this.width/2)/(this.width/2)),this.rotateX((this.mouseY-this.height/2)/(this.width/2))),this},b.exports=d},{"../core/core":37}],79:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.ambientLight=function(a,b,c,d){var e=this._renderer.GL,f=this._renderer._getShader("lightVert","lightTextureFrag");e.useProgram(f),f.uAmbientColor=e.getUniformLocation(f,"uAmbientColor["+this._renderer.ambientLightCount+"]");var g=this._renderer._pInst.color.apply(this._renderer._pInst,arguments),h=g._array;return e.uniform3f(f.uAmbientColor,h[0],h[1],h[2]),f.uMaterialColor=e.getUniformLocation(f,"uMaterialColor"),e.uniform4f(f.uMaterialColor,1,1,1,1),this._renderer.ambientLightCount++,f.uAmbientLightCount=e.getUniformLocation(f,"uAmbientLightCount"),e.uniform1i(f.uAmbientLightCount,this._renderer.ambientLightCount),this},d.prototype.directionalLight=function(a,b,c,d,e,f,g){var h=this._renderer.GL,i=this._renderer._getShader("lightVert","lightTextureFrag");h.useProgram(i),i.uDirectionalColor=h.getUniformLocation(i,"uDirectionalColor["+this._renderer.directionalLightCount+"]");var j=this._renderer._pInst.color.apply(this._renderer._pInst,[a,b,c]),k=j._array;h.uniform3f(i.uDirectionalColor,k[0],k[1],k[2]);for(var l,m,n,o=new Array(arguments.length),p=0;p<o.length;++p)o[p]=arguments[p];if("number"==typeof o[o.length-1])l=o[o.length-3],m=o[o.length-2],n=o[o.length-1];else try{l=o[o.length-1].x,m=o[o.length-1].y,n=o[o.length-1].z}catch(q){throw q}return i.uLightingDirection=h.getUniformLocation(i,"uLightingDirection["+this._renderer.directionalLightCount+"]"),h.uniform3f(i.uLightingDirection,l,m,n),i.uMaterialColor=h.getUniformLocation(i,"uMaterialColor"),h.uniform4f(i.uMaterialColor,1,1,1,1),this._renderer.directionalLightCount++,i.uDirectionalLightCount=h.getUniformLocation(i,"uDirectionalLightCount"),h.uniform1i(i.uDirectionalLightCount,this._renderer.directionalLightCount),this},d.prototype.pointLight=function(a,b,c,d,e,f,g){var h=this._renderer.GL,i=this._renderer._getShader("lightVert","lightTextureFrag");h.useProgram(i),i.uPointLightColor=h.getUniformLocation(i,"uPointLightColor["+this._renderer.pointLightCount+"]");var j=this._renderer._pInst.color.apply(this._renderer._pInst,[a,b,c]),k=j._array;h.uniform3f(i.uPointLightColor,k[0],k[1],k[2]);for(var l,m,n,o=new Array(arguments.length),p=0;p<o.length;++p)o[p]=arguments[p];if("number"==typeof o[o.length-1])l=o[o.length-3],m=o[o.length-2],n=o[o.length-1];else try{l=o[o.length-1].x,m=o[o.length-1].y,n=o[o.length-1].z}catch(q){throw q}return i.uPointLightLocation=h.getUniformLocation(i,"uPointLightLocation["+this._renderer.pointLightCount+"]"),h.uniform3f(i.uPointLightLocation,l,m,n),i.uMaterialColor=h.getUniformLocation(i,"uMaterialColor"),h.uniform4f(i.uMaterialColor,1,1,1,1),this._renderer.pointLightCount++,i.uPointLightCount=h.getUniformLocation(i,"uPointLightCount"),h.uniform1i(i.uPointLightCount,this._renderer.pointLightCount),this},b.exports=d},{"../core/core":37}],80:[function(a,b,c){"use strict";function d(a,b){for(var c={v:[],vt:[],vn:[]},d={},f=0;f<b.length;++f){var g=b[f].trim().split(/\b\s+/);if(g.length>0)if("v"===g[0]||"vn"===g[0]){var h=new e.Vector(parseFloat(g[1]),parseFloat(g[2]),parseFloat(g[3]));c[g[0]].push(h)}else if("vt"===g[0]){var i=[parseFloat(g[1]),parseFloat(g[2])];c[g[0]].push(i)}else if("f"===g[0])for(var j=3;j<g.length;++j){for(var k=[],l=[1,j-1,j],m=0;m<l.length;++m){var n=g[l[m]],o=0;if(void 0!==d[n])o=d[n];else{for(var p=n.split("/"),q=0;q<p.length;q++)p[q]=parseInt(p[q])-1;o=d[n]=a.vertices.length,a.vertices.push(c.v[p[0]].copy()),c.vt[p[1]]?a.uvs.push(c.vt[p[1]].slice()):a.uvs.push([0,0]),c.vn[p[2]]&&a.vertexNormals.push(c.vn[p[2]].copy())}k.push(o)}a.faces.push(k)}}return 0===a.vertexNormals.length&&a.computeNormals(),a}var e=a("../core/core");a("./p5.Geometry"),e.prototype.loadModel=function(){var a,b,c,f=arguments[0];"boolean"==typeof arguments[1]?(a=arguments[1],b=arguments[2],c=arguments[3]):(a=!1,b=arguments[1],c=arguments[2]);var g=new e.Geometry;return g.gid=f+"|"+a,this.loadStrings(f,function(c){d(g,c),a&&g.normalize(),"function"==typeof b&&b(g)}.bind(this),c),g},e.prototype.model=function(a){a.vertices.length>0&&(this._renderer.geometryInHash(a.gid)||this._renderer.createBuffers(a.gid,a),this._renderer.drawBuffers(a.gid))},b.exports=e},{"../core/core":37,"./p5.Geometry":82}],81:[function(a,b,c){"use strict";var d=a("../core/core");d.prototype.normalMaterial=function(){return this._renderer._getShader("normalVert","normalFrag"),this},d.prototype.texture=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];var c=this._renderer.GL,e=this._renderer._getShader("lightVert","lightTextureFrag");c.useProgram(e);var f;if(a[0].isTexture)a[0]instanceof d.Graphics||"undefined"!=typeof d.MediaElement&&a[0]instanceof d.MediaElement?f=a[0].elt:a[0]instanceof d.Image&&(f=a[0].canvas),this._renderer._bind.call(this,a[0].tex,f);else{if(a[0]instanceof d.Image)f=a[0].canvas;else if("undefined"!=typeof d.MediaElement&&a[0]instanceof d.MediaElement){if(!a[0].loadedmetadata)return;f=a[0].elt}else a[0]instanceof d.Graphics&&(f=a[0].elt);var g=c.createTexture();a[0]._setProperty("tex",g),a[0]._setProperty("isTexture",!0),this._renderer._bind.call(this,g,f)}return c.activeTexture(c.TEXTURE0),c.bindTexture(c.TEXTURE_2D,a[0].tex),c.uniform1i(c.getUniformLocation(e,"isTexture"),!0),c.uniform1i(c.getUniformLocation(e,"uSampler"),0),this},d.RendererGL.prototype._bind=function(a,b){var c=this._renderer.GL;c.bindTexture(c.TEXTURE_2D,a),c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL,!0),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,b),c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL,!0),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,c.LINEAR),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE),c.bindTexture(c.TEXTURE_2D,null)},d.prototype.ambientMaterial=function(a,b,c,d){var e=this._renderer.GL,f=this._renderer._getShader("lightVert","lightTextureFrag");e.useProgram(f),f.uMaterialColor=e.getUniformLocation(f,"uMaterialColor");var g=this._renderer._applyColorBlend.apply(this._renderer,arguments);return e.uniform4f(f.uMaterialColor,g[0],g[1],g[2],g[3]),f.uSpecular=e.getUniformLocation(f,"uSpecular"),e.uniform1i(f.uSpecular,!1),e.uniform1i(e.getUniformLocation(f,"isTexture"),!1),this},d.prototype.specularMaterial=function(a,b,c,d){var e=this._renderer.GL,f=this._renderer._getShader("lightVert","lightTextureFrag");e.useProgram(f),e.uniform1i(e.getUniformLocation(f,"isTexture"),!1),f.uMaterialColor=e.getUniformLocation(f,"uMaterialColor");var g=this._renderer._applyColorBlend.apply(this._renderer,arguments);return e.uniform4f(f.uMaterialColor,g[0],g[1],g[2],g[3]),f.uSpecular=e.getUniformLocation(f,"uSpecular"),e.uniform1i(f.uSpecular,!0),this},d.RendererGL.prototype._applyColorBlend=function(a,b,c,d){var e=this.GL,f=this._pInst.color.apply(this._pInst,arguments),g=f._array;return g[g.length-1]<1?(e.depthMask(!1),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA)):(e.depthMask(!0),e.disable(e.BLEND)),g},b.exports=d},{"../core/core":37}],82:[function(a,b,c){"use strict";var d=a("../core/core");d.Geometry=function(a,b,c){return this.vertices=[],this.vertexNormals=[],this.faces=[],this.uvs=[],this.detailX=void 0!==a?a:1,this.detailY=void 0!==b?b:1,c instanceof Function&&c.call(this),this},d.Geometry.prototype.computeFaces=function(){for(var a,b,c,d,e=this.detailX+1,f=0;f<this.detailY;f++)for(var g=0;g<this.detailX;g++)a=f*e+g,b=f*e+g+1,c=(f+1)*e+g+1,d=(f+1)*e+g,this.faces.push([a,b,d]),this.faces.push([d,b,c]);return this},d.Geometry.prototype._getFaceNormal=function(a,b){var c=this.faces[a],e=this.vertices[c[b%3]],f=this.vertices[c[(b+1)%3]],g=this.vertices[c[(b+2)%3]],h=d.Vector.cross(d.Vector.sub(f,e),d.Vector.sub(g,e)),i=d.Vector.mag(h)/(d.Vector.mag(d.Vector.sub(f,e))*d.Vector.mag(d.Vector.sub(g,e)));return h=h.normalize(),h.mult(Math.asin(i))},d.Geometry.prototype.computeNormals=function(){for(var a=0;a<this.vertices.length;a++){for(var b=new d.Vector,c=0;c<this.faces.length;c++)(this.faces[c][0]===a||this.faces[c][1]===a||this.faces[c][2]===a)&&(b=b.add(this._getFaceNormal(c,a)));b=b.normalize(),this.vertexNormals.push(b)}return this},d.Geometry.prototype.averageNormals=function(){for(var a=0;a<=this.detailY;a++){var b=this.detailX+1,c=d.Vector.add(this.vertexNormals[a*b],this.vertexNormals[a*b+this.detailX]);c=d.Vector.div(c,2),this.vertexNormals[a*b]=c,this.vertexNormals[a*b+this.detailX]=c}return this},d.Geometry.prototype.averagePoleNormals=function(){for(var a=new d.Vector(0,0,0),b=0;b<this.detailX;b++)a.add(this.vertexNormals[b]);for(a=d.Vector.div(a,this.detailX),b=0;b<this.detailX;b++)this.vertexNormals[b]=a;for(a=new d.Vector(0,0,0),b=this.vertices.length-1;b>this.vertices.length-1-this.detailX;b--)a.add(this.vertexNormals[b]);for(a=d.Vector.div(a,this.detailX),b=this.vertices.length-1;b>this.vertices.length-1-this.detailX;b--)this.vertexNormals[b]=a;return this},d.Geometry.prototype.normalize=function(){if(this.vertices.length>0){for(var a=this.vertices[0].copy(),b=this.vertices[0].copy(),c=0;c<this.vertices.length;c++)a.x=Math.max(a.x,this.vertices[c].x),b.x=Math.min(b.x,this.vertices[c].x),a.y=Math.max(a.y,this.vertices[c].y),b.y=Math.min(b.y,this.vertices[c].y),a.z=Math.max(a.z,this.vertices[c].z),b.z=Math.min(b.z,this.vertices[c].z);var e=d.Vector.lerp(a,b,.5),f=d.Vector.sub(a,b),g=Math.max(Math.max(f.x,f.y),f.z),h=200/g;for(c=0;c<this.vertices.length;c++)this.vertices[c].sub(e),this.vertices[c].mult(h)}return this},b.exports=d.Geometry},{"../core/core":37}],83:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("../math/polargeometry"),f=a("../core/constants"),g="undefined"!=typeof Float32Array?Float32Array:Array;d.Matrix=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];return a[0]instanceof d?(this.p5=a[0],"mat3"===a[1]?this.mat3=a[2]||new g([1,0,0,0,1,0,0,0,1]):this.mat4=a[1]||new g([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])):"mat3"===a[0]?this.mat3=a[1]||new g([1,0,0,0,1,0,0,0,1]):this.mat4=a[0]||new g([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this},d.Matrix.prototype.set=function(a){return a instanceof d.Matrix?(this.mat4=a.mat4,this):a instanceof g?(this.mat4=a,this):this},d.Matrix.prototype.get=function(){return new d.Matrix(this.mat4)},d.Matrix.prototype.copy=function(){var a=new d.Matrix;return a.mat4[0]=this.mat4[0],a.mat4[1]=this.mat4[1],a.mat4[2]=this.mat4[2],a.mat4[3]=this.mat4[3],a.mat4[4]=this.mat4[4],a.mat4[5]=this.mat4[5],a.mat4[6]=this.mat4[6],a.mat4[7]=this.mat4[7],a.mat4[8]=this.mat4[8],a.mat4[9]=this.mat4[9],a.mat4[10]=this.mat4[10],a.mat4[11]=this.mat4[11],a.mat4[12]=this.mat4[12],a.mat4[13]=this.mat4[13],a.mat4[14]=this.mat4[14],a.mat4[15]=this.mat4[15],a},d.Matrix.identity=function(){return new d.Matrix},d.Matrix.prototype.transpose=function(a){var b,c,e,f,h,i;return a instanceof d.Matrix?(b=a.mat4[1],c=a.mat4[2],e=a.mat4[3],f=a.mat4[6],h=a.mat4[7],i=a.mat4[11],this.mat4[0]=a.mat4[0],this.mat4[1]=a.mat4[4],this.mat4[2]=a.mat4[8],this.mat4[3]=a.mat4[12],this.mat4[4]=b,this.mat4[5]=a.mat4[5],this.mat4[6]=a.mat4[9],this.mat4[7]=a.mat4[13],this.mat4[8]=c,this.mat4[9]=f,this.mat4[10]=a.mat4[10],this.mat4[11]=a.mat4[14],this.mat4[12]=e,this.mat4[13]=h,this.mat4[14]=i,this.mat4[15]=a.mat4[15]):a instanceof g&&(b=a[1],c=a[2],e=a[3],f=a[6],h=a[7],i=a[11],this.mat4[0]=a[0],this.mat4[1]=a[4],this.mat4[2]=a[8],this.mat4[3]=a[12],this.mat4[4]=b,this.mat4[5]=a[5],this.mat4[6]=a[9],this.mat4[7]=a[13],this.mat4[8]=c,this.mat4[9]=f,this.mat4[10]=a[10],this.mat4[11]=a[14],this.mat4[12]=e,this.mat4[13]=h,this.mat4[14]=i,this.mat4[15]=a[15]),this},d.Matrix.prototype.invert=function(a){var b,c,e,f,h,i,j,k,l,m,n,o,p,q,r,s;a instanceof d.Matrix?(b=a.mat4[0],c=a.mat4[1],e=a.mat4[2],f=a.mat4[3],h=a.mat4[4],i=a.mat4[5],j=a.mat4[6],k=a.mat4[7],l=a.mat4[8],m=a.mat4[9],n=a.mat4[10],o=a.mat4[11],p=a.mat4[12],q=a.mat4[13],r=a.mat4[14],s=a.mat4[15]):a instanceof g&&(b=a[0],c=a[1],e=a[2],f=a[3],h=a[4],i=a[5],j=a[6],k=a[7],l=a[8],m=a[9],n=a[10],o=a[11],p=a[12],q=a[13],r=a[14],s=a[15]);var t=b*i-c*h,u=b*j-e*h,v=b*k-f*h,w=c*j-e*i,x=c*k-f*i,y=e*k-f*j,z=l*q-m*p,A=l*r-n*p,B=l*s-o*p,C=m*r-n*q,D=m*s-o*q,E=n*s-o*r,F=t*E-u*D+v*C+w*B-x*A+y*z;return F?(F=1/F,this.mat4[0]=(i*E-j*D+k*C)*F,this.mat4[1]=(e*D-c*E-f*C)*F,this.mat4[2]=(q*y-r*x+s*w)*F,this.mat4[3]=(n*x-m*y-o*w)*F,this.mat4[4]=(j*B-h*E-k*A)*F,this.mat4[5]=(b*E-e*B+f*A)*F,this.mat4[6]=(r*v-p*y-s*u)*F,this.mat4[7]=(l*y-n*v+o*u)*F,this.mat4[8]=(h*D-i*B+k*z)*F,this.mat4[9]=(c*B-b*D-f*z)*F,this.mat4[10]=(p*x-q*v+s*t)*F,this.mat4[11]=(m*v-l*x-o*t)*F,this.mat4[12]=(i*A-h*C-j*z)*F,this.mat4[13]=(b*C-c*A+e*z)*F,this.mat4[14]=(q*u-p*w-r*t)*F,this.mat4[15]=(l*w-m*u+n*t)*F,this):null},d.Matrix.prototype.invert3x3=function(){var a=this.mat3[0],b=this.mat3[1],c=this.mat3[2],d=this.mat3[3],e=this.mat3[4],f=this.mat3[5],g=this.mat3[6],h=this.mat3[7],i=this.mat3[8],j=i*e-f*h,k=-i*d+f*g,l=h*d-e*g,m=a*j+b*k+c*l;return m?(m=1/m,this.mat3[0]=j*m,this.mat3[1]=(-i*b+c*h)*m,this.mat3[2]=(f*b-c*e)*m,this.mat3[3]=k*m,this.mat3[4]=(i*a-c*g)*m,this.mat3[5]=(-f*a+c*d)*m,this.mat3[6]=l*m,this.mat3[7]=(-h*a+b*g)*m,this.mat3[8]=(e*a-b*d)*m,this):null},d.Matrix.prototype.transpose3x3=function(a){var b=a[1],c=a[2],d=a[5];return this.mat3[1]=a[3],this.mat3[2]=a[6],this.mat3[3]=b,this.mat3[5]=a[7],this.mat3[6]=c,this.mat3[7]=d,this},d.Matrix.prototype.inverseTranspose=function(a){return void 0===this.mat3?console.error("sorry, this function only works with mat3"):(this.mat3[0]=a.mat4[0],this.mat3[1]=a.mat4[1],this.mat3[2]=a.mat4[2],this.mat3[3]=a.mat4[4],this.mat3[4]=a.mat4[5],this.mat3[5]=a.mat4[6],this.mat3[6]=a.mat4[8],this.mat3[7]=a.mat4[9],this.mat3[8]=a.mat4[10]),this.invert3x3().transpose3x3(this.mat3),this},d.Matrix.prototype.determinant=function(){var a=this.mat4[0]*this.mat4[5]-this.mat4[1]*this.mat4[4],b=this.mat4[0]*this.mat4[6]-this.mat4[2]*this.mat4[4],c=this.mat4[0]*this.mat4[7]-this.mat4[3]*this.mat4[4],d=this.mat4[1]*this.mat4[6]-this.mat4[2]*this.mat4[5],e=this.mat4[1]*this.mat4[7]-this.mat4[3]*this.mat4[5],f=this.mat4[2]*this.mat4[7]-this.mat4[3]*this.mat4[6],g=this.mat4[8]*this.mat4[13]-this.mat4[9]*this.mat4[12],h=this.mat4[8]*this.mat4[14]-this.mat4[10]*this.mat4[12],i=this.mat4[8]*this.mat4[15]-this.mat4[11]*this.mat4[12],j=this.mat4[9]*this.mat4[14]-this.mat4[10]*this.mat4[13],k=this.mat4[9]*this.mat4[15]-this.mat4[11]*this.mat4[13],l=this.mat4[10]*this.mat4[15]-this.mat4[11]*this.mat4[14];return a*l-b*k+c*j+d*i-e*h+f*g},d.Matrix.prototype.mult=function(a){var b=new g(16),c=new g(16);a instanceof d.Matrix?c=a.mat4:a instanceof g&&(c=a);var e=this.mat4[0],f=this.mat4[1],h=this.mat4[2],i=this.mat4[3];return b[0]=e*c[0]+f*c[4]+h*c[8]+i*c[12],b[1]=e*c[1]+f*c[5]+h*c[9]+i*c[13],b[2]=e*c[2]+f*c[6]+h*c[10]+i*c[14],b[3]=e*c[3]+f*c[7]+h*c[11]+i*c[15],e=this.mat4[4],f=this.mat4[5],h=this.mat4[6],i=this.mat4[7],b[4]=e*c[0]+f*c[4]+h*c[8]+i*c[12],b[5]=e*c[1]+f*c[5]+h*c[9]+i*c[13],b[6]=e*c[2]+f*c[6]+h*c[10]+i*c[14],b[7]=e*c[3]+f*c[7]+h*c[11]+i*c[15],e=this.mat4[8],f=this.mat4[9],h=this.mat4[10],i=this.mat4[11],b[8]=e*c[0]+f*c[4]+h*c[8]+i*c[12],b[9]=e*c[1]+f*c[5]+h*c[9]+i*c[13],b[10]=e*c[2]+f*c[6]+h*c[10]+i*c[14],b[11]=e*c[3]+f*c[7]+h*c[11]+i*c[15],e=this.mat4[12],f=this.mat4[13],h=this.mat4[14],i=this.mat4[15],b[12]=e*c[0]+f*c[4]+h*c[8]+i*c[12],b[13]=e*c[1]+f*c[5]+h*c[9]+i*c[13],b[14]=e*c[2]+f*c[6]+h*c[10]+i*c[14],b[15]=e*c[3]+f*c[7]+h*c[11]+i*c[15],this.mat4=b,this},d.Matrix.prototype.scale=function(){for(var a,b,c,e=new Array(arguments.length),f=0;f<e.length;++f)e[f]=arguments[f];e[0]instanceof d.Vector?(a=e[0].x,b=e[0].y,c=e[0].z):e[0]instanceof Array&&(a=e[0][0],b=e[0][1],c=e[0][2]);var h=new g(16);return h[0]=this.mat4[0]*a,h[1]=this.mat4[1]*a,h[2]=this.mat4[2]*a,h[3]=this.mat4[3]*a,h[4]=this.mat4[4]*b,h[5]=this.mat4[5]*b,h[6]=this.mat4[6]*b,h[7]=this.mat4[7]*b,h[8]=this.mat4[8]*c,h[9]=this.mat4[9]*c,h[10]=this.mat4[10]*c,h[11]=this.mat4[11]*c,h[12]=this.mat4[12],h[13]=this.mat4[13],h[14]=this.mat4[14],h[15]=this.mat4[15],this.mat4=h,this},d.Matrix.prototype.rotate=function(a,b){var c,g,h,i,j;this.p5?this.p5._angleMode===f.DEGREES&&(i=e.degreesToRadians(a)):i=a,b instanceof d.Vector?(c=b.x,g=b.y,h=b.z):b instanceof Array&&(c=b[0],g=b[1],h=b[2]),j=Math.sqrt(c*c+g*g+h*h),c*=1/j,g*=1/j,h*=1/j;var k=this.mat4[0],l=this.mat4[1],m=this.mat4[2],n=this.mat4[3],o=this.mat4[4],p=this.mat4[5],q=this.mat4[6],r=this.mat4[7],s=this.mat4[8],t=this.mat4[9],u=this.mat4[10],v=this.mat4[11],w=Math.sin(i),x=Math.cos(i),y=1-x,z=c*c*y+x,A=g*c*y+h*w,B=h*c*y-g*w,C=c*g*y-h*w,D=g*g*y+x,E=h*g*y+c*w,F=c*h*y+g*w,G=g*h*y-c*w,H=h*h*y+x;return this.mat4[0]=k*z+o*A+s*B,this.mat4[1]=l*z+p*A+t*B,this.mat4[2]=m*z+q*A+u*B,this.mat4[3]=n*z+r*A+v*B,this.mat4[4]=k*C+o*D+s*E,this.mat4[5]=l*C+p*D+t*E,this.mat4[6]=m*C+q*D+u*E,this.mat4[7]=n*C+r*D+v*E,this.mat4[8]=k*F+o*G+s*H,this.mat4[9]=l*F+p*G+t*H,this.mat4[10]=m*F+q*G+u*H,this.mat4[11]=n*F+r*G+v*H,this},d.Matrix.prototype.translate=function(a){var b=a[0],c=a[1],d=a[2]||0;this.mat4[12]=this.mat4[0]*b+this.mat4[4]*c+this.mat4[8]*d+this.mat4[12],this.mat4[13]=this.mat4[1]*b+this.mat4[5]*c+this.mat4[9]*d+this.mat4[13],this.mat4[14]=this.mat4[2]*b+this.mat4[6]*c+this.mat4[10]*d+this.mat4[14],this.mat4[15]=this.mat4[3]*b+this.mat4[7]*c+this.mat4[11]*d+this.mat4[15]},d.Matrix.prototype.rotateX=function(a){this.rotate(a,[1,0,0])},d.Matrix.prototype.rotateY=function(a){this.rotate(a,[0,1,0])},d.Matrix.prototype.rotateZ=function(a){this.rotate(a,[0,0,1])},d.Matrix.prototype.perspective=function(a,b,c,d){var e=1/Math.tan(a/2),f=1/(c-d);return this.mat4[0]=e/b,this.mat4[1]=0,this.mat4[2]=0,this.mat4[3]=0,this.mat4[4]=0,this.mat4[5]=e,this.mat4[6]=0,this.mat4[7]=0,this.mat4[8]=0,this.mat4[9]=0,this.mat4[10]=(d+c)*f,this.mat4[11]=-1,this.mat4[12]=0,this.mat4[13]=0,this.mat4[14]=2*d*c*f,this.mat4[15]=0,this},d.Matrix.prototype.ortho=function(a,b,c,d,e,f){var g=1/(a-b),h=1/(c-d),i=1/(e-f);return this.mat4[0]=-2*g,this.mat4[1]=0,this.mat4[2]=0,this.mat4[3]=0,this.mat4[4]=0,this.mat4[5]=-2*h,this.mat4[6]=0,this.mat4[7]=0,this.mat4[8]=0,this.mat4[9]=0,this.mat4[10]=2*i,this.mat4[11]=0,this.mat4[12]=(a+b)*g,this.mat4[13]=(d+c)*h,this.mat4[14]=(f+e)*i,this.mat4[15]=1,this},b.exports=d.Matrix},{"../core/constants":36,"../core/core":37,"../math/polargeometry":67}],84:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("../core/constants");d.RendererGL.prototype.beginShape=function(a){return this.immediateMode.shapeMode=void 0!==a?a:e.LINE_STRIP,void 0===this.immediateMode.vertexPositions?(this.immediateMode.vertexPositions=[],this.immediateMode.vertexColors=[],this.immediateMode.vertexBuffer=this.GL.createBuffer(),this.immediateMode.colorBuffer=this.GL.createBuffer()):(this.immediateMode.vertexPositions.length=0,this.immediateMode.vertexColors.length=0),this.isImmediateDrawing=!0,this},d.RendererGL.prototype.vertex=function(a,b,c){this.immediateMode.vertexPositions.push(a,b,c);var d=this.curFillColor||[.5,.5,.5,1];return this.immediateMode.vertexColors.push(d[0],d[1],d[2],d[3]),this},d.RendererGL.prototype.endShape=function(a,b,c,d,f,g){var h=this.GL;if(this._bindImmediateBuffers(this.immediateMode.vertexPositions,this.immediateMode.vertexColors),a)if("fill"===this.drawMode)switch(this.immediateMode.shapeMode){case e.LINE_STRIP:this.immediateMode.shapeMode=e.TRIANGLE_FAN;break;case e.LINES:this.immediateMode.shapeMode=e.TRIANGLE_FAN;break;case e.TRIANGLES:this.immediateMode.shapeMode=e.TRIANGLE_FAN}else switch(this.immediateMode.shapeMode){case e.LINE_STRIP:this.immediateMode.shapeMode=e.LINE_LOOP;break;case e.LINES:this.immediateMode.shapeMode=e.LINE_LOOP}if(this.immediateMode.shapeMode===e.QUADS||this.immediateMode.shapeMode===e.QUAD_STRIP)throw new Error("sorry, "+this.immediateMode.shapeMode+" not yet implemented in webgl mode.");return h.enable(h.BLEND),h.drawArrays(this.immediateMode.shapeMode,0,this.immediateMode.vertexPositions.length/3),this.immediateMode.vertexPositions.length=0,this.immediateMode.vertexColors.length=0,this.isImmediateDrawing=!1,this},d.RendererGL.prototype._bindImmediateBuffers=function(a,b){this._setDefaultCamera();var c=this.GL,d=this._getCurShaderId(),e=this.mHash[d];return e.vertexPositionAttribute=c.getAttribLocation(e,"aPosition"),c.enableVertexAttribArray(e.vertexPositionAttribute),c.bindBuffer(c.ARRAY_BUFFER,this.immediateMode.vertexBuffer),c.bufferData(c.ARRAY_BUFFER,new Float32Array(a),c.DYNAMIC_DRAW),c.vertexAttribPointer(e.vertexPositionAttribute,3,c.FLOAT,!1,0,0),e.vertexColorAttribute=c.getAttribLocation(e,"aVertexColor"),c.enableVertexAttribArray(e.vertexColorAttribute),c.bindBuffer(c.ARRAY_BUFFER,this.immediateMode.colorBuffer),c.bufferData(c.ARRAY_BUFFER,new Float32Array(b),c.DYNAMIC_DRAW),c.vertexAttribPointer(e.vertexColorAttribute,4,c.FLOAT,!1,0,0),this._setMatrixUniforms(d),this},d.RendererGL.prototype._getColorVertexShader=function(){var a,b=this.GL,c="immediateVert|vertexColorFrag";return this.materialInHash(c)?a=this.mHash[c]:(a=this._initShaders("immediateVert","vertexColorFrag",!0),this.mHash[c]=a,a.vertexColorAttribute=b.getAttribLocation(a,"aVertexColor"),b.enableVertexAttribArray(a.vertexColorAttribute)),a},b.exports=d.RendererGL},{"../core/constants":36,"../core/core":37}],85:[function(a,b,c){"use strict";function d(a){return a.length>0?a.reduce(function(a,b){return a.concat(b)}):[]}function e(a){return d(a.map(function(a){return[a.x,a.y,a.z]}))}var f=a("../core/core"),g=0;f.RendererGL.prototype._initBufferDefaults=function(a){if(g++,g>1e3){var b=Object.keys(this.gHash)[0];delete this.gHash[b],g--}var c=this.GL;this.gHash[a]={},this.gHash[a].vertexBuffer=c.createBuffer(),this.gHash[a].normalBuffer=c.createBuffer(),this.gHash[a].uvBuffer=c.createBuffer(),this.gHash[a].indexBuffer=c.createBuffer()},f.RendererGL.prototype.createBuffers=function(a,b){var c=this.GL;this._setDefaultCamera(),this._initBufferDefaults(a);var f=this.mHash[this._getCurShaderId()];this.gHash[a].numberOfItems=3*b.faces.length,c.bindBuffer(c.ARRAY_BUFFER,this.gHash[a].vertexBuffer),c.bufferData(c.ARRAY_BUFFER,new Float32Array(e(b.vertices)),c.STATIC_DRAW),f.vertexPositionAttribute=c.getAttribLocation(f,"aPosition"),c.enableVertexAttribArray(f.vertexPositionAttribute),c.vertexAttribPointer(f.vertexPositionAttribute,3,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this.gHash[a].normalBuffer),c.bufferData(c.ARRAY_BUFFER,new Float32Array(e(b.vertexNormals)),c.STATIC_DRAW),f.vertexNormalAttribute=c.getAttribLocation(f,"aNormal"),c.enableVertexAttribArray(f.vertexNormalAttribute),c.vertexAttribPointer(f.vertexNormalAttribute,3,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this.gHash[a].uvBuffer),c.bufferData(c.ARRAY_BUFFER,new Float32Array(d(b.uvs)),c.STATIC_DRAW),f.textureCoordAttribute=c.getAttribLocation(f,"aTexCoord"),c.enableVertexAttribArray(f.textureCoordAttribute),c.vertexAttribPointer(f.textureCoordAttribute,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this.gHash[a].indexBuffer),c.bufferData(c.ELEMENT_ARRAY_BUFFER,new Uint16Array(d(b.faces)),c.STATIC_DRAW)},f.RendererGL.prototype.drawBuffers=function(a){this._setDefaultCamera();var b=this.GL,c=this._getCurShaderId(),d=this.mHash[c];return b.bindBuffer(b.ARRAY_BUFFER,this.gHash[a].vertexBuffer),b.vertexAttribPointer(d.vertexPositionAttribute,3,b.FLOAT,!1,0,0),b.bindBuffer(b.ARRAY_BUFFER,this.gHash[a].normalBuffer),b.vertexAttribPointer(d.vertexNormalAttribute,3,b.FLOAT,!1,0,0),b.bindBuffer(b.ARRAY_BUFFER,this.gHash[a].uvBuffer),b.vertexAttribPointer(d.textureCoordAttribute,2,b.FLOAT,!1,0,0),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,this.gHash[a].indexBuffer),this._setMatrixUniforms(c),b.drawElements(b.TRIANGLES,this.gHash[a].numberOfItems,b.UNSIGNED_SHORT,0),this},b.exports=f.RendererGL},{"../core/core":37}],86:[function(a,b,c){"use strict";var d=a("../core/core"),e=a("./shader");a("../core/p5.Renderer"),a("./p5.Matrix");var f=[],g=1e3,h={alpha:!0,depth:!0,stencil:!0,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1};d.RendererGL=function(a,b,c){return d.Renderer.call(this,a,b,c),this._initContext(),this.isP3D=!0,this.GL=this.drawingContext,this.ambientLightCount=0,this.directionalLightCount=0,this.pointLightCount=0,this._curCamera=null,this.uMVMatrix=new d.Matrix,this.uPMatrix=new d.Matrix,this.uNMatrix=new d.Matrix("mat3"),this.gHash={},this.mHash={},this.isImmediateDrawing=!1,this.immediateMode={},this.curFillColor=[.5,.5,.5,1],this.curStrokeColor=[.5,.5,.5,1],this.pointSize=5,this},d.RendererGL.prototype=Object.create(d.Renderer.prototype),d.RendererGL.prototype._initContext=function(){try{if(this.drawingContext=this.canvas.getContext("webgl",h)||this.canvas.getContext("experimental-webgl",h),null===this.drawingContext)throw new Error("Error creating webgl context");console.log("p5.RendererGL: enabled webgl context");var a=this.drawingContext;a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.viewport(0,0,a.drawingBufferWidth,a.drawingBufferHeight)}catch(b){throw new Error(b)}},d.RendererGL.prototype._setDefaultCamera=function(){if(null===this._curCamera){var a=this.width,b=this.height;this.uPMatrix=d.Matrix.identity(),this.uPMatrix.perspective(60/180*Math.PI,a/b,.1,100),this._curCamera="default"}},d.RendererGL.prototype._update=function(){this.uMVMatrix=d.Matrix.identity(),this.translate(0,0,-(this.height/2)/Math.tan(30*Math.PI/180)),this.ambientLightCount=0,this.directionalLightCount=0,this.pointLightCount=0},d.RendererGL.prototype.background=function(){var a=this.GL,b=this._pInst.color.apply(this._pInst,arguments),c=b.levels[0]/255,d=b.levels[1]/255,e=b.levels[2]/255,f=b.levels[3]/255;a.clearColor(c,d,e,f),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT)},d.RendererGL.prototype._initShaders=function(a,b,c){var d=this.GL,f=d.createShader(d.VERTEX_SHADER);if(d.shaderSource(f,e[a]),d.compileShader(f),!d.getShaderParameter(f,d.COMPILE_STATUS))return alert("Yikes! An error occurred compiling the shaders:"+d.getShaderInfoLog(f)),null;var g=d.createShader(d.FRAGMENT_SHADER);if(d.shaderSource(g,e[b]),d.compileShader(g),!d.getShaderParameter(g,d.COMPILE_STATUS))return alert("Darn! An error occurred compiling the shaders:"+d.getShaderInfoLog(g)),null;var h=d.createProgram();return d.attachShader(h,f),d.attachShader(h,g),d.linkProgram(h),d.getProgramParameter(h,d.LINK_STATUS)||alert("Snap! Error linking shader program"),this._getLocation(h,c),h},d.RendererGL.prototype._getLocation=function(a,b){var c=this.GL;c.useProgram(a),a.uResolution=c.getUniformLocation(a,"uResolution"),c.uniform1f(a.uResolution,g),a.uPMatrixUniform=c.getUniformLocation(a,"uProjectionMatrix"),a.uMVMatrixUniform=c.getUniformLocation(a,"uModelViewMatrix"),void 0===b&&(a.uNMatrixUniform=c.getUniformLocation(a,"uNormalMatrix"),a.samplerUniform=c.getUniformLocation(a,"uSampler"))},d.RendererGL.prototype._setUniform1f=function(a,b,c){var d=this.GL,e=this.mHash[a];return d.useProgram(e),e[b]=d.getUniformLocation(e,b),d.uniform1f(e[b],c),this},d.RendererGL.prototype._setMatrixUniforms=function(a){var b=this.GL,c=this.mHash[a];b.useProgram(c),b.uniformMatrix4fv(c.uPMatrixUniform,!1,this.uPMatrix.mat4),b.uniformMatrix4fv(c.uMVMatrixUniform,!1,this.uMVMatrix.mat4),this.uNMatrix.inverseTranspose(this.uMVMatrix),b.uniformMatrix3fv(c.uNMatrixUniform,!1,this.uNMatrix.mat3)},d.RendererGL.prototype._getShader=function(a,b,c){var d=a+"|"+b;if(!this.materialInHash(d)){var e=this._initShaders(a,b,c);this.mHash[d]=e}return this.curShaderId=d,this.mHash[this.curShaderId]},d.RendererGL.prototype._getCurShaderId=function(){var a,b;return"fill"!==this.drawMode&&void 0===this.curShaderId?(a="normalVert|normalFrag",b=this._initShaders("normalVert","normalFrag"),this.mHash[a]=b,this.curShaderId=a):this.isImmediateDrawing&&"fill"===this.drawMode&&(a="immediateVert|vertexColorFrag",b=this._initShaders("immediateVert","vertexColorFrag"),this.mHash[a]=b,this.curShaderId=a),this.curShaderId},d.RendererGL.prototype.fill=function(a,b,c,d){var e,f=this.GL,g=this._applyColorBlend.apply(this,arguments);return this.curFillColor=g,this.drawMode="fill",this.isImmediateDrawing?(e=this._getShader("immediateVert","vertexColorFrag"),f.useProgram(e)):(e=this._getShader("normalVert","basicFrag"),f.useProgram(e),e.uMaterialColor=f.getUniformLocation(e,"uMaterialColor"),f.uniform4f(e.uMaterialColor,g[0],g[1],g[2],g[3])),this},d.RendererGL.prototype.stroke=function(a,b,c,d){var e=this._pInst.color.apply(this._pInst,arguments),f=e._array;return this.curStrokeColor=f,this.drawMode="stroke",this},d.RendererGL.prototype._strokeCheck=function(){if("stroke"===this.drawMode)throw new Error("stroke for shapes in 3D not yet implemented, use fill for now :(")},d.RendererGL.prototype.strokeWeight=function(a){return this.pointSize=a,this},d.RendererGL.prototype.geometryInHash=function(a){return void 0!==this.gHash[a]},d.RendererGL.prototype.materialInHash=function(a){return void 0!==this.mHash[a]},d.RendererGL.prototype.resize=function(a,b){var c=this.GL;d.Renderer.prototype.resize.call(this,a,b),c.viewport(0,0,c.drawingBufferWidth,c.drawingBufferHeight),"default"===this._curCamera&&(this._curCamera=null,this._setDefaultCamera())},d.RendererGL.prototype.clear=function(){var a=this.GL;a.clearColor(arguments[0],arguments[1],arguments[2],arguments[3]),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT)},d.RendererGL.prototype.translate=function(a,b,c){return a/=g,b=-b/g,c/=g,this.uMVMatrix.translate([a,b,c]),this},d.RendererGL.prototype.scale=function(a,b,c){return this.uMVMatrix.scale([a,b,c]),this},d.RendererGL.prototype.rotate=function(a,b){return this.uMVMatrix.rotate(a,b),this},d.RendererGL.prototype.rotateX=function(a){return this.rotate(a,[1,0,0]),this},d.RendererGL.prototype.rotateY=function(a){return this.rotate(a,[0,1,0]),this},d.RendererGL.prototype.rotateZ=function(a){return this.rotate(a,[0,0,1]),this},d.RendererGL.prototype.push=function(){f.push(this.uMVMatrix.copy())},d.RendererGL.prototype.pop=function(){if(0===f.length)throw new Error("Invalid popMatrix!");this.uMVMatrix=f.pop()},d.RendererGL.prototype.resetMatrix=function(){return this.uMVMatrix=d.Matrix.identity(),this.translate(0,0,-800),this},d.RendererGL.prototype._applyTextProperties=function(){console.error("text commands not yet implemented in webgl")},b.exports=d.RendererGL},{"../core/core":37,"../core/p5.Renderer":43,"./p5.Matrix":83,"./shader":88}],87:[function(a,b,c){"use strict";var d=a("../core/core");a("./p5.Geometry"),d.prototype.plane=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];var c=a[0]||50,e=a[1]||c,f="number"==typeof a[2]?a[2]:1,g="number"==typeof a[3]?a[3]:1,h="plane|"+c+"|"+e+"|"+f+"|"+g;if(!this._renderer.geometryInHash(h)){var i=function(){for(var a,b,f,g=0;g<=this.detailY;g++){b=g/this.detailY;for(var h=0;h<=this.detailX;h++)a=h/this.detailX,f=new d.Vector(c*a-c/2,e*b-e/2,0),this.vertices.push(f),this.uvs.push([a,b])}},j=new d.Geometry(f,g,i);j.computeFaces().computeNormals(),this._renderer.createBuffers(h,j)}this._renderer.drawBuffers(h)},d.prototype.box=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];var c=a[0]||50,e=a[1]||c,f=a[2]||c,g="number"==typeof a[3]?a[3]:4,h="number"==typeof a[4]?a[4]:4,i="box|"+c+"|"+e+"|"+f+"|"+g+"|"+h;if(!this._renderer.geometryInHash(i)){var j=function(){for(var a=[[0,4,2,6],[1,3,5,7],[0,1,4,5],[2,6,3,7],[0,2,1,3],[4,5,6,7]],b=0,g=0;g<a.length;g++){
for(var h=a[g],i=4*g,j=0;4>j;j++){var k=h[j],l=new d.Vector((2*(1&k)-1)*c/2,((2&k)-1)*e/2,((4&k)/2-1)*f/2);this.vertices.push(l),this.uvs.push([1&j,(2&j)/2]),b++}this.faces.push([i,i+1,i+2]),this.faces.push([i+2,i+1,i+3])}},k=new d.Geometry(g,h,j);k.computeNormals(),this._renderer.createBuffers(i,k)}return this._renderer.drawBuffers(i),this},d.prototype.sphere=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];var c=a[0]||50,e="number"==typeof a[1]?a[1]:24,f="number"==typeof a[2]?a[2]:16,g="sphere|"+c+"|"+e+"|"+f;if(!this._renderer.geometryInHash(g)){var h=function(){for(var a,b,e,f=0;f<=this.detailY;f++){b=f/this.detailY;for(var g=0;g<=this.detailX;g++){a=g/this.detailX;var h=2*Math.PI*a,i=Math.PI*b-Math.PI/2;e=new d.Vector(c*Math.cos(i)*Math.sin(h),c*Math.sin(i),c*Math.cos(i)*Math.cos(h)),this.vertices.push(e),this.uvs.push([a,b])}}},i=new d.Geometry(e,f,h);i.computeFaces().computeNormals().averageNormals().averagePoleNormals(),this._renderer.createBuffers(g,i)}return this._renderer.drawBuffers(g),this};var e=function(a,b,c,e,f,g,h){e=3>e?3:e,f=1>f?1:f,g=void 0===g?!0:g,h=void 0===h?!0:h;var i,j,k=(g?2:0)+(h?2:0),l=e+1,m=Math.atan2(a-b,c),n=g?-2:0,o=f+(h?2:0);for(i=n;o>=i;++i){var p,q=i/f,r=c*q;for(0>i?(r=0,q=1,p=a):i>f?(r=c,q=1,p=b):p=a+(b-a)*(i/f),(-2===i||i===f+2)&&(p=0,q=0),r-=c/2,j=0;l>j;++j)this.vertices.push(new d.Vector(Math.sin(j*Math.PI*2/e)*p,r,Math.cos(j*Math.PI*2/e)*p)),this.vertexNormals.push(new d.Vector(0>i||i>f?0:Math.sin(j*Math.PI*2/e)*Math.cos(m),0>i?-1:i>f?1:Math.sin(m),0>i||i>f?0:Math.cos(j*Math.PI*2/e)*Math.cos(m))),this.uvs.push([j/e,q])}for(i=0;f+k>i;++i)for(j=0;e>j;++j)this.faces.push([l*(i+0)+0+j,l*(i+0)+1+j,l*(i+1)+1+j]),this.faces.push([l*(i+0)+0+j,l*(i+1)+1+j,l*(i+1)+0+j])};d.prototype.cylinder=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];var c=a[0]||50,f=a[1]||c,g="number"==typeof a[2]?a[2]:24,h="number"==typeof a[3]?a[3]:16,i="cylinder|"+c+"|"+f+"|"+g+"|"+h;if(!this._renderer.geometryInHash(i)){var j=new d.Geometry(g,h);e.call(j,c,c,f,g,h,!0,!0),j.computeNormals(),this._renderer.createBuffers(i,j)}return this._renderer.drawBuffers(i),this},d.prototype.cone=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];var c=a[0]||50,f=a[1]||c,g="number"==typeof a[2]?a[2]:24,h="number"==typeof a[3]?a[3]:16,i="cone|"+c+"|"+f+"|"+g+"|"+h;if(!this._renderer.geometryInHash(i)){var j=new d.Geometry(g,h);e.call(j,c,0,f,g,h,!0,!0),j.computeNormals(),this._renderer.createBuffers(i,j)}return this._renderer.drawBuffers(i),this},d.prototype.ellipsoid=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];var c="number"==typeof a[3]?a[3]:24,e="number"==typeof a[4]?a[4]:24,f=a[0]||50,g=a[1]||f,h=a[2]||f,i="ellipsoid|"+f+"|"+g+"|"+h+"|"+c+"|"+e;if(!this._renderer.geometryInHash(i)){var j=function(){for(var a,b,c,e=0;e<=this.detailY;e++){b=e/this.detailY;for(var i=0;i<=this.detailX;i++){a=i/this.detailX;var j=2*Math.PI*a,k=Math.PI*b-Math.PI/2;c=new d.Vector(f*Math.cos(k)*Math.sin(j),g*Math.sin(k),h*Math.cos(k)*Math.cos(j)),this.vertices.push(c),this.uvs.push([a,b])}}},k=new d.Geometry(c,e,j);k.computeFaces().computeNormals(),this._renderer.createBuffers(i,k)}return this._renderer.drawBuffers(i),this},d.prototype.torus=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];var c="number"==typeof a[2]?a[2]:24,e="number"==typeof a[3]?a[3]:16,f=a[0]||50,g=a[1]||10,h="torus|"+f+"|"+g+"|"+c+"|"+e;if(!this._renderer.geometryInHash(h)){var i=function(){for(var a,b,c,e=0;e<=this.detailY;e++){b=e/this.detailY;for(var h=0;h<=this.detailX;h++){a=h/this.detailX;var i=2*Math.PI*a,j=2*Math.PI*b;c=new d.Vector((f+g*Math.cos(j))*Math.cos(i),(f+g*Math.cos(j))*Math.sin(i),g*Math.sin(j)),this.vertices.push(c),this.uvs.push([a,b])}}},j=new d.Geometry(c,e,i);j.computeFaces().computeNormals().averageNormals(),this._renderer.createBuffers(h,j)}return this._renderer.drawBuffers(h),this},d.RendererGL.prototype.point=function(a,b,c){return console.log("point not yet implemented in webgl"),this},d.RendererGL.prototype.triangle=function(a){var b=a[0],c=a[1],e=a[2],f=a[3],g=a[4],h=a[5],i="tri|"+b+"|"+c+"|"+e+"|"+f+"|"+g+"|"+h;if(!this.geometryInHash(i)){var j=function(){var a=[];a.push(new d.Vector(b,c,0)),a.push(new d.Vector(e,f,0)),a.push(new d.Vector(g,h,0)),this.vertices=a,this.faces=[[0,1,2]],this.uvs=[[0,0],[0,1],[1,1]]},k=new d.Geometry(1,1,j);k.computeNormals(),this.createBuffers(i,k)}return this.drawBuffers(i),this},d.RendererGL.prototype.ellipse=function(a){var b=a[0],c=a[1],e=a[2],f=a[3],g=a[4]||24,h=a[5]||16,i="ellipse|"+a[0]+"|"+a[1]+"|"+a[2]+"|"+a[3];if(!this.geometryInHash(i)){var j=function(){for(var a,g,h,i=b+.5*e,j=c+.5*f,k=0;k<=this.detailY;k++){g=k/this.detailY;for(var l=0;l<=this.detailX;l++){a=l/this.detailX;var m=2*Math.PI*a;if(0===g)h=new d.Vector(i,j,0);else{var n=i+.5*e*Math.cos(m),o=j+.5*f*Math.sin(m);h=new d.Vector(n,o,0)}this.vertices.push(h),this.uvs.push([a,g])}}},k=new d.Geometry(g,h,j);k.computeFaces().computeNormals(),this.createBuffers(i,k)}return this.drawBuffers(i),this},d.RendererGL.prototype.rect=function(a){var b="rect|"+a[0]+"|"+a[1]+"|"+a[2]+"|"+a[3],c=a[0],e=a[1],f=a[2],g=a[3],h=a[4]||24,i=a[5]||16;if(!this.geometryInHash(b)){var j=function(){for(var a,b,h,i=0;i<=this.detailY;i++){b=i/this.detailY;for(var j=0;j<=this.detailX;j++)a=j/this.detailX,h=new d.Vector(c+f*a,e+g*b,0),this.vertices.push(h),this.uvs.push([a,b])}},k=new d.Geometry(h,i,j);k.computeFaces().computeNormals(),this.createBuffers(b,k)}return this.drawBuffers(b),this},d.RendererGL.prototype.quad=function(){for(var a=new Array(arguments.length),b=0;b<a.length;++b)a[b]=arguments[b];var c=a[0],e=a[1],f=a[2],g=a[3],h=a[4],i=a[5],j=a[6],k=a[7],l="quad|"+c+"|"+e+"|"+f+"|"+g+"|"+h+"|"+i+"|"+j+"|"+k;if(!this.geometryInHash(l)){var m=function(){this.vertices.push(new d.Vector(c,e,0)),this.vertices.push(new d.Vector(f,g,0)),this.vertices.push(new d.Vector(h,i,0)),this.vertices.push(new d.Vector(j,k,0)),this.uvs.push([0,0],[1,0],[1,1],[0,1])},n=new d.Geometry(2,2,m);n.computeNormals(),n.faces=[[0,1,2],[2,3,0]],this.createBuffers(l,n)}return this.drawBuffers(l),this},d.RendererGL.prototype.bezier=function(a){var b=a[12]||20;this.beginShape();for(var c=[0,0,0,0],d=[0,0,0],e=0;b>=e;e++)c[0]=Math.pow(1-e/b,3),c[1]=3*(e/b)*Math.pow(1-e/b,2),c[2]=3*Math.pow(e/b,2)*(1-e/b),c[3]=Math.pow(e/b,3),d[0]=a[0]*c[0]+a[3]*c[1]+a[6]*c[2]+a[9]*c[3],d[1]=a[1]*c[0]+a[4]*c[1]+a[7]*c[2]+a[10]*c[3],d[2]=a[2]*c[0]+a[5]*c[1]+a[8]*c[2]+a[11]*c[3],this.vertex(d[0],d[1],d[2]);return this.endShape(),this},d.RendererGL.prototype.curve=function(a){var b=a[12];this.beginShape();for(var c=[0,0,0,0],d=[0,0,0],e=0;b>=e;e++)c[0]=.5*Math.pow(e/b,3),c[1]=.5*Math.pow(e/b,2),c[2]=e/b*.5,c[3]=.5,d[0]=c[0]*(-a[0]+3*a[3]-3*a[6]+a[9])+c[1]*(2*a[0]-5*a[3]+4*a[6]-a[9])+c[2]*(-a[0]+a[6])+2*c[3]*a[3],d[1]=c[0]*(-a[1]+3*a[4]-3*a[7]+a[10])+c[1]*(2*a[1]-5*a[4]+4*a[7]-a[10])+c[2]*(-a[1]+a[7])+2*c[3]*a[4],d[2]=c[0]*(-a[2]+3*a[5]-3*a[8]+a[11])+c[1]*(2*a[2]-5*a[5]+4*a[8]-a[11])+c[2]*(-a[2]+a[8])+2*c[3]*a[5],this.vertex(d[0],d[1],d[2]);return this.endShape(),this},b.exports=d},{"../core/core":37,"./p5.Geometry":82}],88:[function(a,b,c){b.exports={immediateVert:"attribute vec3 aPosition;\nattribute vec4 aVertexColor;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform float uResolution;\nuniform float uPointSize;\n\nvarying vec4 vColor;\nvoid main(void) {\n  vec4 positionVec4 = vec4(aPosition / uResolution *vec3(1.0, -1.0, 1.0), 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vColor = aVertexColor;\n  gl_PointSize = uPointSize;\n}\n",vertexColorVert:"attribute vec3 aPosition;\nattribute vec4 aVertexColor;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform float uResolution;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  vec4 positionVec4 = vec4(aPosition / uResolution * vec3(1.0, -1.0, 1.0), 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vColor = aVertexColor;\n}\n",vertexColorFrag:"precision mediump float;\nvarying vec4 vColor;\nvoid main(void) {\n  gl_FragColor = vColor;\n}",normalVert:"attribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexCoord;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat3 uNormalMatrix;\nuniform float uResolution;\n\nvarying vec3 vVertexNormal;\nvarying highp vec2 vVertTexCoord;\n\nvoid main(void) {\n  vec4 positionVec4 = vec4(aPosition / uResolution * vec3(1.0, -1.0, 1.0), 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vVertexNormal = vec3( uNormalMatrix * aNormal );\n  vVertTexCoord = aTexCoord;\n}\n",normalFrag:"precision mediump float;\nvarying vec3 vVertexNormal;\nvoid main(void) {\n  gl_FragColor = vec4(vVertexNormal, 1.0);\n}",basicFrag:"precision mediump float;\nvarying vec3 vVertexNormal;\nuniform vec4 uMaterialColor;\nvoid main(void) {\n  gl_FragColor = uMaterialColor;\n}",lightVert:"attribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexCoord;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat3 uNormalMatrix;\nuniform float uResolution;\nuniform int uAmbientLightCount;\nuniform int uDirectionalLightCount;\nuniform int uPointLightCount;\n\nuniform vec3 uAmbientColor[8];\nuniform vec3 uLightingDirection[8];\nuniform vec3 uDirectionalColor[8];\nuniform vec3 uPointLightLocation[8];\nuniform vec3 uPointLightColor[8];\nuniform bool uSpecular;\n\nvarying vec3 vVertexNormal;\nvarying vec2 vVertTexCoord;\nvarying vec3 vLightWeighting;\n\nvec3 ambientLightFactor = vec3(0.0, 0.0, 0.0);\nvec3 directionalLightFactor = vec3(0.0, 0.0, 0.0);\nvec3 pointLightFactor = vec3(0.0, 0.0, 0.0);\nvec3 pointLightFactor2 = vec3(0.0, 0.0, 0.0);\n\nvoid main(void){\n\n  vec4 positionVec4 = vec4(aPosition / uResolution, 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n\n  vec3 vertexNormal = vec3( uNormalMatrix * aNormal );\n  vVertexNormal = vertexNormal;\n  vVertTexCoord = aTexCoord;\n\n  vec4 mvPosition = uModelViewMatrix * vec4(aPosition / uResolution, 1.0);\n  vec3 eyeDirection = normalize(-mvPosition.xyz);\n\n  float shininess = 32.0;\n  float specularFactor = 2.0;\n  float diffuseFactor = 0.3;\n\n  for(int i = 0; i < 8; i++){\n    if(uAmbientLightCount == i) break;\n    ambientLightFactor += uAmbientColor[i];\n  }\n\n  for(int j = 0; j < 8; j++){\n    if(uDirectionalLightCount == j) break;\n    vec3 dir = uLightingDirection[j];\n    float directionalLightWeighting = max(dot(vertexNormal, dir), 0.0);\n    directionalLightFactor += uDirectionalColor[j] * directionalLightWeighting;\n  }\n\n  for(int k = 0; k < 8; k++){\n    if(uPointLightCount == k) break;\n    vec3 loc = uPointLightLocation[k];\n    //loc = loc / uResolution;\n    vec3 lightDirection = normalize(loc - mvPosition.xyz);\n\n    float directionalLightWeighting = max(dot(vertexNormal, lightDirection), 0.0);\n    pointLightFactor += uPointLightColor[k] * directionalLightWeighting;\n\n    //factor2 for specular\n    vec3 reflectionDirection = reflect(-lightDirection, vertexNormal);\n    float specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), shininess);\n\n    pointLightFactor2 += uPointLightColor[k] * (specularFactor * specularLightWeighting\n      +  directionalLightWeighting * diffuseFactor);\n  }\n\n  if(!uSpecular){\n    vLightWeighting =  ambientLightFactor + directionalLightFactor + pointLightFactor;\n  }else{\n    vLightWeighting = ambientLightFactor + directionalLightFactor + pointLightFactor2;\n  }\n\n}\n",lightTextureFrag:"precision mediump float;\n\nuniform vec4 uMaterialColor;\nuniform sampler2D uSampler;\nuniform bool isTexture;\n\nvarying vec3 vLightWeighting;\nvarying highp vec2 vVertTexCoord;\n\nvoid main(void) {\n  if(!isTexture){\n    gl_FragColor = vec4(vec3(uMaterialColor.rgb * vLightWeighting), uMaterialColor.a);\n  }else{\n    vec4 textureColor = texture2D(uSampler, vVertTexCoord);\n    if(vLightWeighting == vec3(0., 0., 0.)){\n      gl_FragColor = textureColor;\n    }else{\n      gl_FragColor = vec4(vec3(textureColor.rgb * vLightWeighting), textureColor.a);\n    }\n  }\n}"}},{}]},{},[28])(28)});
/*! tether 1.4.0 */


(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.Tether = factory();
  }
}(this, function(require, exports, module) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TetherBase = undefined;
if (typeof TetherBase === 'undefined') {
  TetherBase = { modules: [] };
}

var zeroElement = null;

// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
// if the element lies within a nested document (<frame> or <iframe>-like).
function getActualBoundingClientRect(node) {
  var boundingRect = node.getBoundingClientRect();

  // The original object returned by getBoundingClientRect is immutable, so we clone it
  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
  var rect = {};
  for (var k in boundingRect) {
    rect[k] = boundingRect[k];
  }

  if (node.ownerDocument !== document) {
    var _frameElement = node.ownerDocument.defaultView.frameElement;
    if (_frameElement) {
      var frameRect = getActualBoundingClientRect(_frameElement);
      rect.top += frameRect.top;
      rect.bottom += frameRect.top;
      rect.left += frameRect.left;
      rect.right += frameRect.left;
    }
  }

  return rect;
}

function getScrollParents(el) {
  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = getComputedStyle(el) || {};
  var position = computedStyle.position;
  var parents = [];

  if (position === 'fixed') {
    return [el];
  }

  var parent = el;
  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
    var style = undefined;
    try {
      style = getComputedStyle(parent);
    } catch (err) {}

    if (typeof style === 'undefined' || style === null) {
      parents.push(parent);
      return parents;
    }

    var _style = style;
    var overflow = _style.overflow;
    var overflowX = _style.overflowX;
    var overflowY = _style.overflowY;

    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        parents.push(parent);
      }
    }
  }

  parents.push(el.ownerDocument.body);

  // If the node is within a frame, account for the parent window scroll
  if (el.ownerDocument !== document) {
    parents.push(el.ownerDocument.defaultView);
  }

  return parents;
}

var uniqueId = (function () {
  var id = 0;
  return function () {
    return ++id;
  };
})();

var zeroPosCache = {};
var getOrigin = function getOrigin() {
  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
  // jitter as the user scrolls that messes with our ability to detect if two positions
  // are equivilant or not.  We place an element at the top left of the page that will
  // get the same jitter, so we can cancel the two out.
  var node = zeroElement;
  if (!node || !document.body.contains(node)) {
    node = document.createElement('div');
    node.setAttribute('data-tether-id', uniqueId());
    extend(node.style, {
      top: 0,
      left: 0,
      position: 'absolute'
    });

    document.body.appendChild(node);

    zeroElement = node;
  }

  var id = node.getAttribute('data-tether-id');
  if (typeof zeroPosCache[id] === 'undefined') {
    zeroPosCache[id] = getActualBoundingClientRect(node);

    // Clear the cache when this position call is done
    defer(function () {
      delete zeroPosCache[id];
    });
  }

  return zeroPosCache[id];
};

function removeUtilElements() {
  if (zeroElement) {
    document.body.removeChild(zeroElement);
  }
  zeroElement = null;
};

function getBounds(el) {
  var doc = undefined;
  if (el === document) {
    doc = document;
    el = document.documentElement;
  } else {
    doc = el.ownerDocument;
  }

  var docEl = doc.documentElement;

  var box = getActualBoundingClientRect(el);

  var origin = getOrigin();

  box.top -= origin.top;
  box.left -= origin.left;

  if (typeof box.width === 'undefined') {
    box.width = document.body.scrollWidth - box.left - box.right;
  }
  if (typeof box.height === 'undefined') {
    box.height = document.body.scrollHeight - box.top - box.bottom;
  }

  box.top = box.top - docEl.clientTop;
  box.left = box.left - docEl.clientLeft;
  box.right = doc.body.clientWidth - box.width - box.left;
  box.bottom = doc.body.clientHeight - box.height - box.top;

  return box;
}

function getOffsetParent(el) {
  return el.offsetParent || document.documentElement;
}

var _scrollBarSize = null;
function getScrollBarSize() {
  if (_scrollBarSize) {
    return _scrollBarSize;
  }
  var inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  extend(outer.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  var widthContained = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var widthScroll = inner.offsetWidth;

  if (widthContained === widthScroll) {
    widthScroll = outer.clientWidth;
  }

  document.body.removeChild(outer);

  var width = widthContained - widthScroll;

  _scrollBarSize = { width: width, height: width };
  return _scrollBarSize;
}

function extend() {
  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var args = [];

  Array.prototype.push.apply(args, arguments);

  args.slice(1).forEach(function (obj) {
    if (obj) {
      for (var key in obj) {
        if (({}).hasOwnProperty.call(obj, key)) {
          out[key] = obj[key];
        }
      }
    }
  });

  return out;
}

function removeClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.remove(cls);
      }
    });
  } else {
    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
    var className = getClassName(el).replace(regex, ' ');
    setClassName(el, className);
  }
}

function addClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.add(cls);
      }
    });
  } else {
    removeClass(el, name);
    var cls = getClassName(el) + (' ' + name);
    setClassName(el, cls);
  }
}

function hasClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    return el.classList.contains(name);
  }
  var className = getClassName(el);
  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
}

function getClassName(el) {
  // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
  // completely separately SVGAnimatedString base classes
  if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
    return el.className.baseVal;
  }
  return el.className;
}

function setClassName(el, className) {
  el.setAttribute('class', className);
}

function updateClasses(el, add, all) {
  // Of the set of 'all' classes, we need the 'add' classes, and only the
  // 'add' classes to be set.
  all.forEach(function (cls) {
    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
      removeClass(el, cls);
    }
  });

  add.forEach(function (cls) {
    if (!hasClass(el, cls)) {
      addClass(el, cls);
    }
  });
}

var deferred = [];

var defer = function defer(fn) {
  deferred.push(fn);
};

var flush = function flush() {
  var fn = undefined;
  while (fn = deferred.pop()) {
    fn();
  }
};

var Evented = (function () {
  function Evented() {
    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: 'on',
    value: function on(event, handler, ctx) {
      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if (typeof this.bindings === 'undefined') {
        this.bindings = {};
      }
      if (typeof this.bindings[event] === 'undefined') {
        this.bindings[event] = [];
      }
      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
    }
  }, {
    key: 'once',
    value: function once(event, handler, ctx) {
      this.on(event, handler, ctx, true);
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
        return;
      }

      if (typeof handler === 'undefined') {
        delete this.bindings[event];
      } else {
        var i = 0;
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(event) {
      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
        var i = 0;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        while (i < this.bindings[event].length) {
          var _bindings$event$i = this.bindings[event][i];
          var handler = _bindings$event$i.handler;
          var ctx = _bindings$event$i.ctx;
          var once = _bindings$event$i.once;

          var context = ctx;
          if (typeof context === 'undefined') {
            context = this;
          }

          handler.apply(context, args);

          if (once) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }]);

  return Evented;
})();

TetherBase.Utils = {
  getActualBoundingClientRect: getActualBoundingClientRect,
  getScrollParents: getScrollParents,
  getBounds: getBounds,
  getOffsetParent: getOffsetParent,
  extend: extend,
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  updateClasses: updateClasses,
  defer: defer,
  flush: flush,
  uniqueId: uniqueId,
  Evented: Evented,
  getScrollBarSize: getScrollBarSize,
  removeUtilElements: removeUtilElements
};
/* globals TetherBase, performance */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof TetherBase === 'undefined') {
  throw new Error('You must include the utils.js file before tether.js');
}

var _TetherBase$Utils = TetherBase.Utils;
var getScrollParents = _TetherBase$Utils.getScrollParents;
var getBounds = _TetherBase$Utils.getBounds;
var getOffsetParent = _TetherBase$Utils.getOffsetParent;
var extend = _TetherBase$Utils.extend;
var addClass = _TetherBase$Utils.addClass;
var removeClass = _TetherBase$Utils.removeClass;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;
var flush = _TetherBase$Utils.flush;
var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
var removeUtilElements = _TetherBase$Utils.removeUtilElements;

function within(a, b) {
  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return a + diff >= b && b >= a - diff;
}

var transformKey = (function () {
  if (typeof document === 'undefined') {
    return '';
  }
  var el = document.createElement('div');

  var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
  for (var i = 0; i < transforms.length; ++i) {
    var key = transforms[i];
    if (el.style[key] !== undefined) {
      return key;
    }
  }
})();

var tethers = [];

var position = function position() {
  tethers.forEach(function (tether) {
    tether.position(false);
  });
  flush();
};

function now() {
  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
    return performance.now();
  }
  return +new Date();
}

(function () {
  var lastCall = null;
  var lastDuration = null;
  var pendingTimeout = null;

  var tick = function tick() {
    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
      // We voluntarily throttle ourselves if we can't manage 60fps
      lastDuration = Math.min(lastDuration - 16, 250);

      // Just in case this is the last event, remember to position just once more
      pendingTimeout = setTimeout(tick, 250);
      return;
    }

    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
      // Some browsers call events a little too frequently, refuse to run more than is reasonable
      return;
    }

    if (pendingTimeout != null) {
      clearTimeout(pendingTimeout);
      pendingTimeout = null;
    }

    lastCall = now();
    position();
    lastDuration = now() - lastCall;
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
      window.addEventListener(event, tick);
    });
  }
})();

var MIRROR_LR = {
  center: 'center',
  left: 'right',
  right: 'left'
};

var MIRROR_TB = {
  middle: 'middle',
  top: 'bottom',
  bottom: 'top'
};

var OFFSET_MAP = {
  top: 0,
  left: 0,
  middle: '50%',
  center: '50%',
  bottom: '100%',
  right: '100%'
};

var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (left === 'auto') {
    left = MIRROR_LR[relativeToAttachment.left];
  }

  if (top === 'auto') {
    top = MIRROR_TB[relativeToAttachment.top];
  }

  return { left: left, top: top };
};

var attachmentToOffset = function attachmentToOffset(attachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
    left = OFFSET_MAP[attachment.left];
  }

  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
    top = OFFSET_MAP[attachment.top];
  }

  return { left: left, top: top };
};

function addOffset() {
  var out = { top: 0, left: 0 };

  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
    offsets[_key] = arguments[_key];
  }

  offsets.forEach(function (_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (typeof top === 'string') {
      top = parseFloat(top, 10);
    }
    if (typeof left === 'string') {
      left = parseFloat(left, 10);
    }

    out.top += top;
    out.left += left;
  });

  return out;
}

function offsetToPx(offset, size) {
  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
  }
  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
  }

  return offset;
}

var parseOffset = function parseOffset(value) {
  var _value$split = value.split(' ');

  var _value$split2 = _slicedToArray(_value$split, 2);

  var top = _value$split2[0];
  var left = _value$split2[1];

  return { top: top, left: left };
};
var parseAttachment = parseOffset;

var TetherClass = (function (_Evented) {
  _inherits(TetherClass, _Evented);

  function TetherClass(options) {
    var _this = this;

    _classCallCheck(this, TetherClass);

    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
    this.position = this.position.bind(this);

    tethers.push(this);

    this.history = [];

    this.setOptions(options, false);

    TetherBase.modules.forEach(function (module) {
      if (typeof module.initialize !== 'undefined') {
        module.initialize.call(_this);
      }
    });

    this.position();
  }

  _createClass(TetherClass, [{
    key: 'getClass',
    value: function getClass() {
      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var classes = this.options.classes;

      if (typeof classes !== 'undefined' && classes[key]) {
        return this.options.classes[key];
      } else if (this.options.classPrefix) {
        return this.options.classPrefix + '-' + key;
      } else {
        return key;
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      var _this2 = this;

      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      var defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto',
        classPrefix: 'tether'
      };

      this.options = extend(defaults, options);

      var _options = this.options;
      var element = _options.element;
      var target = _options.target;
      var targetModifier = _options.targetModifier;

      this.element = element;
      this.target = target;
      this.targetModifier = targetModifier;

      if (this.target === 'viewport') {
        this.target = document.body;
        this.targetModifier = 'visible';
      } else if (this.target === 'scroll-handle') {
        this.target = document.body;
        this.targetModifier = 'scroll-handle';
      }

      ['element', 'target'].forEach(function (key) {
        if (typeof _this2[key] === 'undefined') {
          throw new Error('Tether Error: Both element and target must be defined');
        }

        if (typeof _this2[key].jquery !== 'undefined') {
          _this2[key] = _this2[key][0];
        } else if (typeof _this2[key] === 'string') {
          _this2[key] = document.querySelector(_this2[key]);
        }
      });

      addClass(this.element, this.getClass('element'));
      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('target'));
      }

      if (!this.options.attachment) {
        throw new Error('Tether Error: You must provide an attachment');
      }

      this.targetAttachment = parseAttachment(this.options.targetAttachment);
      this.attachment = parseAttachment(this.options.attachment);
      this.offset = parseOffset(this.options.offset);
      this.targetOffset = parseOffset(this.options.targetOffset);

      if (typeof this.scrollParents !== 'undefined') {
        this.disable();
      }

      if (this.targetModifier === 'scroll-handle') {
        this.scrollParents = [this.target];
      } else {
        this.scrollParents = getScrollParents(this.target);
      }

      if (!(this.options.enabled === false)) {
        this.enable(pos);
      }
    }
  }, {
    key: 'getTargetBounds',
    value: function getTargetBounds() {
      if (typeof this.targetModifier !== 'undefined') {
        if (this.targetModifier === 'visible') {
          if (this.target === document.body) {
            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
          } else {
            var bounds = getBounds(this.target);

            var out = {
              height: bounds.height,
              width: bounds.width,
              top: bounds.top,
              left: bounds.left
            };

            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
            out.height = Math.min(innerHeight, out.height);
            out.height -= 2;

            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
            out.width = Math.min(innerWidth, out.width);
            out.width -= 2;

            if (out.top < pageYOffset) {
              out.top = pageYOffset;
            }
            if (out.left < pageXOffset) {
              out.left = pageXOffset;
            }

            return out;
          }
        } else if (this.targetModifier === 'scroll-handle') {
          var bounds = undefined;
          var target = this.target;
          if (target === document.body) {
            target = document.documentElement;

            bounds = {
              left: pageXOffset,
              top: pageYOffset,
              height: innerHeight,
              width: innerWidth
            };
          } else {
            bounds = getBounds(target);
          }

          var style = getComputedStyle(target);

          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

          var scrollBottom = 0;
          if (hasBottomScroll) {
            scrollBottom = 15;
          }

          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

          var out = {
            width: 15,
            height: height * 0.975 * (height / target.scrollHeight),
            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
          };

          var fitAdj = 0;
          if (height < 408 && this.target === document.body) {
            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
          }

          if (this.target !== document.body) {
            out.height = Math.max(out.height, 24);
          }

          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

          if (this.target === document.body) {
            out.height = Math.max(out.height, 24);
          }

          return out;
        }
      } else {
        return getBounds(this.target);
      }
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this._cache = {};
    }
  }, {
    key: 'cache',
    value: function cache(k, getter) {
      // More than one module will often need the same DOM info, so
      // we keep a cache which is cleared on each position call
      if (typeof this._cache === 'undefined') {
        this._cache = {};
      }

      if (typeof this._cache[k] === 'undefined') {
        this._cache[k] = getter.call(this);
      }

      return this._cache[k];
    }
  }, {
    key: 'enable',
    value: function enable() {
      var _this3 = this;

      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('enabled'));
      }
      addClass(this.element, this.getClass('enabled'));
      this.enabled = true;

      this.scrollParents.forEach(function (parent) {
        if (parent !== _this3.target.ownerDocument) {
          parent.addEventListener('scroll', _this3.position);
        }
      });

      if (pos) {
        this.position();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      var _this4 = this;

      removeClass(this.target, this.getClass('enabled'));
      removeClass(this.element, this.getClass('enabled'));
      this.enabled = false;

      if (typeof this.scrollParents !== 'undefined') {
        this.scrollParents.forEach(function (parent) {
          parent.removeEventListener('scroll', _this4.position);
        });
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this5 = this;

      this.disable();

      tethers.forEach(function (tether, i) {
        if (tether === _this5) {
          tethers.splice(i, 1);
        }
      });

      // Remove any elements we were using for convenience from the DOM
      if (tethers.length === 0) {
        removeUtilElements();
      }
    }
  }, {
    key: 'updateAttachClasses',
    value: function updateAttachClasses(elementAttach, targetAttach) {
      var _this6 = this;

      elementAttach = elementAttach || this.attachment;
      targetAttach = targetAttach || this.targetAttachment;
      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
        // updateAttachClasses can be called more than once in a position call, so
        // we need to clean up after ourselves such that when the last defer gets
        // ran it doesn't add any extra classes from previous calls.
        this._addAttachClasses.splice(0, this._addAttachClasses.length);
      }

      if (typeof this._addAttachClasses === 'undefined') {
        this._addAttachClasses = [];
      }
      var add = this._addAttachClasses;

      if (elementAttach.top) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
      }
      if (elementAttach.left) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
      }
      if (targetAttach.top) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
      }
      if (targetAttach.left) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
      }

      var all = [];
      sides.forEach(function (side) {
        all.push(_this6.getClass('element-attached') + '-' + side);
        all.push(_this6.getClass('target-attached') + '-' + side);
      });

      defer(function () {
        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
          return;
        }

        updateClasses(_this6.element, _this6._addAttachClasses, all);
        if (!(_this6.options.addTargetClasses === false)) {
          updateClasses(_this6.target, _this6._addAttachClasses, all);
        }

        delete _this6._addAttachClasses;
      });
    }
  }, {
    key: 'position',
    value: function position() {
      var _this7 = this;

      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
      // tethers (in which case call Tether.Utils.flush yourself when you're done)

      if (!this.enabled) {
        return;
      }

      this.clearCache();

      // Turn 'auto' attachments into the appropriate corner or edge
      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

      this.updateAttachClasses(this.attachment, targetAttachment);

      var elementPos = this.cache('element-bounds', function () {
        return getBounds(_this7.element);
      });

      var width = elementPos.width;
      var height = elementPos.height;

      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
        var _lastSize = this.lastSize;

        // We cache the height and width to make it possible to position elements that are
        // getting hidden.
        width = _lastSize.width;
        height = _lastSize.height;
      } else {
        this.lastSize = { width: width, height: height };
      }

      var targetPos = this.cache('target-bounds', function () {
        return _this7.getTargetBounds();
      });
      var targetSize = targetPos;

      // Get an actual px offset from the attachment
      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

      // Add the manually provided offset
      offset = addOffset(offset, manualOffset);
      targetOffset = addOffset(targetOffset, manualTargetOffset);

      // It's now our goal to make (element position + offset) == (target position + target offset)
      var left = targetPos.left + targetOffset.left - offset.left;
      var top = targetPos.top + targetOffset.top - offset.top;

      for (var i = 0; i < TetherBase.modules.length; ++i) {
        var _module2 = TetherBase.modules[i];
        var ret = _module2.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset,
          scrollbarSize: scrollbarSize,
          attachment: this.attachment
        });

        if (ret === false) {
          return false;
        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
          continue;
        } else {
          top = ret.top;
          left = ret.left;
        }
      }

      // We describe the position three different ways to give the optimizer
      // a chance to decide the best possible way to position the element
      // with the fewest repaints.
      var next = {
        // It's position relative to the page (absolute positioning when
        // the element is a child of the body)
        page: {
          top: top,
          left: left
        },

        // It's position relative to the viewport (fixed positioning)
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };

      var doc = this.target.ownerDocument;
      var win = doc.defaultView;

      var scrollbarSize = undefined;
      if (win.innerHeight > doc.documentElement.clientHeight) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.bottom -= scrollbarSize.height;
      }

      if (win.innerWidth > doc.documentElement.clientWidth) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.right -= scrollbarSize.width;
      }

      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
        next.page.bottom = doc.body.scrollHeight - top - height;
        next.page.right = doc.body.scrollWidth - left - width;
      }

      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
        (function () {
          var offsetParent = _this7.cache('target-offsetparent', function () {
            return getOffsetParent(_this7.target);
          });
          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
            return getBounds(offsetParent);
          });
          var offsetParentStyle = getComputedStyle(offsetParent);
          var offsetParentSize = offsetPosition;

          var offsetBorder = {};
          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
          });

          offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
          offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
              // We're within the visible part of the target's scroll parent
              var scrollTop = offsetParent.scrollTop;
              var scrollLeft = offsetParent.scrollLeft;

              // It's position relative to the target's offset parent (absolute positioning when
              // the element is moved to be a child of the target's offset parent).
              next.offset = {
                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
              };
            }
          }
        })();
      }

      // We could also travel up the DOM and try each containing context, rather than only
      // looking at the body, but we're gonna get diminishing returns.

      this.move(next);

      this.history.unshift(next);

      if (this.history.length > 3) {
        this.history.pop();
      }

      if (flushChanges) {
        flush();
      }

      return true;
    }

    // THE ISSUE
  }, {
    key: 'move',
    value: function move(pos) {
      var _this8 = this;

      if (!(typeof this.element.parentNode !== 'undefined')) {
        return;
      }

      var same = {};

      for (var type in pos) {
        same[type] = {};

        for (var key in pos[type]) {
          var found = false;

          for (var i = 0; i < this.history.length; ++i) {
            var point = this.history[i];
            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
              found = true;
              break;
            }
          }

          if (!found) {
            same[type][key] = true;
          }
        }
      }

      var css = { top: '', left: '', right: '', bottom: '' };

      var transcribe = function transcribe(_same, _pos) {
        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
        if (gpu !== false) {
          var yPos = undefined,
              xPos = undefined;
          if (_same.top) {
            css.top = 0;
            yPos = _pos.top;
          } else {
            css.bottom = 0;
            yPos = -_pos.bottom;
          }

          if (_same.left) {
            css.left = 0;
            xPos = _pos.left;
          } else {
            css.right = 0;
            xPos = -_pos.right;
          }

          if (window.matchMedia) {
            // HubSpot/tether#207
            var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
            if (!retina) {
              xPos = Math.round(xPos);
              yPos = Math.round(yPos);
            }
          }

          css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';

          if (transformKey !== 'msTransform') {
            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
            // but IE9 doesn't support 3d transforms and will choke.
            css[transformKey] += " translateZ(0)";
          }
        } else {
          if (_same.top) {
            css.top = _pos.top + 'px';
          } else {
            css.bottom = _pos.bottom + 'px';
          }

          if (_same.left) {
            css.left = _pos.left + 'px';
          } else {
            css.right = _pos.right + 'px';
          }
        }
      };

      var moved = false;
      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, pos.page);
      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, pos.viewport);
      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
        (function () {
          css.position = 'absolute';
          var offsetParent = _this8.cache('target-offsetparent', function () {
            return getOffsetParent(_this8.target);
          });

          if (getOffsetParent(_this8.element) !== offsetParent) {
            defer(function () {
              _this8.element.parentNode.removeChild(_this8.element);
              offsetParent.appendChild(_this8.element);
            });
          }

          transcribe(same.offset, pos.offset);
          moved = true;
        })();
      } else {
        css.position = 'absolute';
        transcribe({ top: true, left: true }, pos.page);
      }

      if (!moved) {
        if (this.options.bodyElement) {
          this.options.bodyElement.appendChild(this.element);
        } else {
          var offsetParentIsBody = true;
          var currentNode = this.element.parentNode;
          while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
            if (getComputedStyle(currentNode).position !== 'static') {
              offsetParentIsBody = false;
              break;
            }

            currentNode = currentNode.parentNode;
          }

          if (!offsetParentIsBody) {
            this.element.parentNode.removeChild(this.element);
            this.element.ownerDocument.body.appendChild(this.element);
          }
        }
      }

      // Any css change will trigger a repaint, so let's avoid one if nothing changed
      var writeCSS = {};
      var write = false;
      for (var key in css) {
        var val = css[key];
        var elVal = this.element.style[key];

        if (elVal !== val) {
          write = true;
          writeCSS[key] = val;
        }
      }

      if (write) {
        defer(function () {
          extend(_this8.element.style, writeCSS);
          _this8.trigger('repositioned');
        });
      }
    }
  }]);

  return TetherClass;
})(Evented);

TetherClass.modules = [];

TetherBase.position = position;

var Tether = extend(TetherClass, TetherBase);
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var extend = _TetherBase$Utils.extend;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

function getBoundingRect(tether, to) {
  if (to === 'scrollParent') {
    to = tether.scrollParents[0];
  } else if (to === 'window') {
    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
  }

  if (to === document) {
    to = to.documentElement;
  }

  if (typeof to.nodeType !== 'undefined') {
    (function () {
      var node = to;
      var size = getBounds(to);
      var pos = size;
      var style = getComputedStyle(to);

      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

      // Account any parent Frames scroll offset
      if (node.ownerDocument !== document) {
        var win = node.ownerDocument.defaultView;
        to[0] += win.pageXOffset;
        to[1] += win.pageYOffset;
        to[2] += win.pageXOffset;
        to[3] += win.pageYOffset;
      }

      BOUNDS_FORMAT.forEach(function (side, i) {
        side = side[0].toUpperCase() + side.substr(1);
        if (side === 'Top' || side === 'Left') {
          to[i] += parseFloat(style['border' + side + 'Width']);
        } else {
          to[i] -= parseFloat(style['border' + side + 'Width']);
        }
      });
    })();
  }

  return to;
}

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;
    var targetAttachment = _ref.targetAttachment;

    if (!this.options.constraints) {
      return true;
    }

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
      var _lastSize = this.lastSize;

      // Handle the item getting hidden as a result of our positioning without glitching
      // the classes in and out
      width = _lastSize.width;
      height = _lastSize.height;
    }

    var targetSize = this.cache('target-bounds', function () {
      return _this.getTargetBounds();
    });

    var targetHeight = targetSize.height;
    var targetWidth = targetSize.width;

    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

    this.options.constraints.forEach(function (constraint) {
      var outOfBoundsClass = constraint.outOfBoundsClass;
      var pinnedClass = constraint.pinnedClass;

      if (outOfBoundsClass) {
        allClasses.push(outOfBoundsClass);
      }
      if (pinnedClass) {
        allClasses.push(pinnedClass);
      }
    });

    allClasses.forEach(function (cls) {
      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
        allClasses.push(cls + '-' + side);
      });
    });

    var addClasses = [];

    var tAttachment = extend({}, targetAttachment);
    var eAttachment = extend({}, this.attachment);

    this.options.constraints.forEach(function (constraint) {
      var to = constraint.to;
      var attachment = constraint.attachment;
      var pin = constraint.pin;

      if (typeof attachment === 'undefined') {
        attachment = '';
      }

      var changeAttachX = undefined,
          changeAttachY = undefined;
      if (attachment.indexOf(' ') >= 0) {
        var _attachment$split = attachment.split(' ');

        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

        changeAttachY = _attachment$split2[0];
        changeAttachX = _attachment$split2[1];
      } else {
        changeAttachX = changeAttachY = attachment;
      }

      var bounds = getBoundingRect(_this, to);

      if (changeAttachY === 'target' || changeAttachY === 'both') {
        if (top < bounds[1] && tAttachment.top === 'top') {
          top += targetHeight;
          tAttachment.top = 'bottom';
        }

        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
          top -= targetHeight;
          tAttachment.top = 'top';
        }
      }

      if (changeAttachY === 'together') {
        if (tAttachment.top === 'top') {
          if (eAttachment.top === 'bottom' && top < bounds[1]) {
            top += targetHeight;
            tAttachment.top = 'bottom';

            top += height;
            eAttachment.top = 'top';
          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
            top -= height - targetHeight;
            tAttachment.top = 'bottom';

            eAttachment.top = 'bottom';
          }
        }

        if (tAttachment.top === 'bottom') {
          if (eAttachment.top === 'top' && top + height > bounds[3]) {
            top -= targetHeight;
            tAttachment.top = 'top';

            top -= height;
            eAttachment.top = 'bottom';
          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
            top += height - targetHeight;
            tAttachment.top = 'top';

            eAttachment.top = 'top';
          }
        }

        if (tAttachment.top === 'middle') {
          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';
          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }
        }
      }

      if (changeAttachX === 'target' || changeAttachX === 'both') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          left += targetWidth;
          tAttachment.left = 'right';
        }

        if (left + width > bounds[2] && tAttachment.left === 'right') {
          left -= targetWidth;
          tAttachment.left = 'left';
        }
      }

      if (changeAttachX === 'together') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          if (eAttachment.left === 'right') {
            left += targetWidth;
            tAttachment.left = 'right';

            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';

            left -= width;
            eAttachment.left = 'right';
          }
        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
          if (eAttachment.left === 'left') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left += width;
            eAttachment.left = 'left';
          }
        } else if (tAttachment.left === 'center') {
          if (left + width > bounds[2] && eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (left < bounds[0] && eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          }
        }
      }

      if (changeAttachY === 'element' || changeAttachY === 'both') {
        if (top < bounds[1] && eAttachment.top === 'bottom') {
          top += height;
          eAttachment.top = 'top';
        }

        if (top + height > bounds[3] && eAttachment.top === 'top') {
          top -= height;
          eAttachment.top = 'bottom';
        }
      }

      if (changeAttachX === 'element' || changeAttachX === 'both') {
        if (left < bounds[0]) {
          if (eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'center') {
            left += width / 2;
            eAttachment.left = 'left';
          }
        }

        if (left + width > bounds[2]) {
          if (eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'center') {
            left -= width / 2;
            eAttachment.left = 'right';
          }
        }
      }

      if (typeof pin === 'string') {
        pin = pin.split(',').map(function (p) {
          return p.trim();
        });
      } else if (pin === true) {
        pin = ['top', 'left', 'right', 'bottom'];
      }

      pin = pin || [];

      var pinned = [];
      var oob = [];

      if (top < bounds[1]) {
        if (pin.indexOf('top') >= 0) {
          top = bounds[1];
          pinned.push('top');
        } else {
          oob.push('top');
        }
      }

      if (top + height > bounds[3]) {
        if (pin.indexOf('bottom') >= 0) {
          top = bounds[3] - height;
          pinned.push('bottom');
        } else {
          oob.push('bottom');
        }
      }

      if (left < bounds[0]) {
        if (pin.indexOf('left') >= 0) {
          left = bounds[0];
          pinned.push('left');
        } else {
          oob.push('left');
        }
      }

      if (left + width > bounds[2]) {
        if (pin.indexOf('right') >= 0) {
          left = bounds[2] - width;
          pinned.push('right');
        } else {
          oob.push('right');
        }
      }

      if (pinned.length) {
        (function () {
          var pinnedClass = undefined;
          if (typeof _this.options.pinnedClass !== 'undefined') {
            pinnedClass = _this.options.pinnedClass;
          } else {
            pinnedClass = _this.getClass('pinned');
          }

          addClasses.push(pinnedClass);
          pinned.forEach(function (side) {
            addClasses.push(pinnedClass + '-' + side);
          });
        })();
      }

      if (oob.length) {
        (function () {
          var oobClass = undefined;
          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
            oobClass = _this.options.outOfBoundsClass;
          } else {
            oobClass = _this.getClass('out-of-bounds');
          }

          addClasses.push(oobClass);
          oob.forEach(function (side) {
            addClasses.push(oobClass + '-' + side);
          });
        })();
      }

      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
        eAttachment.left = tAttachment.left = false;
      }
      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
        eAttachment.top = tAttachment.top = false;
      }

      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
        _this.updateAttachClasses(eAttachment, tAttachment);
        _this.trigger('update', {
          attachment: eAttachment,
          targetAttachment: tAttachment
        });
      }
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return { top: top, left: left };
  }
});
/* globals TetherBase */

'use strict';

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    var targetPos = this.getTargetBounds();

    var bottom = top + height;
    var right = left + width;

    var abutted = [];
    if (top <= targetPos.bottom && bottom >= targetPos.top) {
      ['left', 'right'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === left || targetPosSide === right) {
          abutted.push(side);
        }
      });
    }

    if (left <= targetPos.right && right >= targetPos.left) {
      ['top', 'bottom'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === top || targetPosSide === bottom) {
          abutted.push(side);
        }
      });
    }

    var allClasses = [];
    var addClasses = [];

    var sides = ['left', 'top', 'right', 'bottom'];
    allClasses.push(this.getClass('abutted'));
    sides.forEach(function (side) {
      allClasses.push(_this.getClass('abutted') + '-' + side);
    });

    if (abutted.length) {
      addClasses.push(this.getClass('abutted'));
    }

    abutted.forEach(function (side) {
      addClasses.push(_this.getClass('abutted') + '-' + side);
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return true;
  }
});
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

TetherBase.modules.push({
  position: function position(_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (!this.options.shift) {
      return;
    }

    var shift = this.options.shift;
    if (typeof this.options.shift === 'function') {
      shift = this.options.shift.call(this, { top: top, left: left });
    }

    var shiftTop = undefined,
        shiftLeft = undefined;
    if (typeof shift === 'string') {
      shift = shift.split(' ');
      shift[1] = shift[1] || shift[0];

      var _shift = shift;

      var _shift2 = _slicedToArray(_shift, 2);

      shiftTop = _shift2[0];
      shiftLeft = _shift2[1];

      shiftTop = parseFloat(shiftTop, 10);
      shiftLeft = parseFloat(shiftLeft, 10);
    } else {
      shiftTop = shift.top;
      shiftLeft = shift.left;
    }

    top += shiftTop;
    left += shiftLeft;

    return { top: top, left: left };
  }
});
return Tether;

}));
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */


var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href') || '';
        selector = /^#[a-z]/i.test(selector) ? selector : null;
      }

      return selector;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    // getters

    // public

    Alert.prototype.close = function close(element) {
      element = element || this._element;

      var rootElement = this._getRootElement(element);
      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    Alert.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Alert.prototype._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = $(selector)[0];
      }

      if (!parent) {
        parent = $(element).closest('.' + ClassName.ALERT)[0];
      }

      return parent;
    };

    Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);

      $(element).trigger(closeEvent);
      return closeEvent;
    };

    Alert.prototype._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(ClassName.SHOW);

      if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);
        return;
      }

      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Alert.prototype._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    };

    // static

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    // getters

    // public

    Button.prototype.toggle = function toggle() {
      var triggerChangeEvent = true;
      var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = $(this._element).find(Selector.INPUT)[0];

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
        }
      }

      this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName.ACTIVE);
      }
    };

    Button.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // static

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    // getters

    // public

    Carousel.prototype.next = function next() {
      if (this._isSliding) {
        throw new Error('Carousel is sliding');
      }
      this._slide(Direction.NEXT);
    };

    Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      if (!document.hidden) {
        this.next();
      }
    };

    Carousel.prototype.prev = function prev() {
      if (this._isSliding) {
        throw new Error('Carousel is sliding');
      }
      this._slide(Direction.PREVIOUS);
    };

    Carousel.prototype.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    Carousel.prototype.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    Carousel.prototype.to = function to(index) {
      var _this = this;

      this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

      this._slide(direction, this._items[index]);
    };

    Carousel.prototype.dispose = function dispose() {
      $(this._element).off(EVENT_KEY);
      $.removeData(this._element, DATA_KEY);

      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    };

    // private

    Carousel.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Carousel.prototype._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
        $(this._element).on(Event.MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(Event.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }
    };

    Carousel.prototype._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;
        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
        default:
          return;
      }
    };

    Carousel.prototype._getItemIndex = function _getItemIndex(element) {
      this._items = $.makeArray($(element).parent().find(Selector.ITEM));
      return this._items.indexOf(element);
    };

    Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREVIOUS;
      var activeIndex = this._getItemIndex(activeElement);
      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREVIOUS ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;

      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var slideEvent = $.Event(Event.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName
      });

      $(this._element).trigger(slideEvent);

      return slideEvent;
    };

    Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName.ACTIVE);
        }
      }
    };

    Carousel.prototype._slide = function _slide(direction, element) {
      var _this3 = this;

      var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var isCycling = Boolean(this._interval);

      var directionalClassName = void 0;
      var orderClassName = void 0;
      var eventDirectionName = void 0;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName.LEFT;
        orderClassName = ClassName.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName.RIGHT;
        orderClassName = ClassName.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName
      });

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

        $(nextElement).addClass(orderClassName);

        Util.reflow(nextElement);

        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);

        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + ' ' + orderClassName).addClass(ClassName.ACTIVE);

          $(activeElement).removeClass(ClassName.ACTIVE + ' ' + orderClassName + ' ' + directionalClassName);

          _this3._isSliding = false;

          setTimeout(function () {
            return $(_this3._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        $(activeElement).removeClass(ClassName.ACTIVE);
        $(nextElement).addClass(ClassName.ACTIVE);

        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    };

    // static

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Default, $(this).data());

        if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
          $.extend(_config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (data[action] === undefined) {
            throw new Error('No method named "' + action + '"');
          }
          data[action]();
        } else if (_config.interval) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
        return;
      }

      var config = $.extend({}, $(target).data(), $(this).data());
      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.card > .show, .card > .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    // public

    Collapse.prototype.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show() {
      var _this = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if ($(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives = void 0;
      var activesData = void 0;

      if (this._parent) {
        actives = $.makeArray($(this._parent).find(Selector.ACTIVES));
        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

      this._element.style[dimension] = 0;
      this._element.setAttribute('aria-expanded', true);

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = 'scroll' + capitalizedDimension;

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

      this._element.style[dimension] = this._element[scrollSize] + 'px';
    };

    Collapse.prototype.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if (!$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();
      var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

      this._element.style[dimension] = this._element[offsetDimension] + 'px';

      Util.reflow(this._element);

      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      this._element.setAttribute('aria-expanded', false);

      if (this._triggerArray.length) {
        $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);
        $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    Collapse.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };

    // private

    Collapse.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    Collapse.prototype._getParent = function _getParent() {
      var _this3 = this;

      var parent = $(this._config.parent)[0];
      var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

      $(parent).find(selector).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });

      return parent;
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.SHOW);
        element.setAttribute('aria-expanded', isOpen);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    };

    // static

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);
        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    var target = Collapse._getTargetFromElement(this);
    var data = $(target).data(DATA_KEY);
    var config = data ? 'toggle' : $(this).data();

    Collapse._jQueryInterface.call($(target), config);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUSIN_DATA_API: 'focusin' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    BACKDROP: 'dropdown-backdrop',
    DISABLED: 'disabled',
    SHOW: 'show'
  };

  var Selector = {
    BACKDROP: '.dropdown-backdrop',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    ROLE_MENU: '[role="menu"]',
    ROLE_LISTBOX: '[role="listbox"]',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = function () {
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this._element = element;

      this._addEventListeners();
    }

    // getters

    // public

    Dropdown.prototype.toggle = function toggle() {
      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return false;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return false;
      }

      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

        // if mobile we use a backdrop because click events don't delegate
        var dropdown = document.createElement('div');
        dropdown.className = ClassName.BACKDROP;
        $(dropdown).insertBefore(this);
        $(dropdown).on('click', Dropdown._clearMenus);
      }

      var relatedTarget = {
        relatedTarget: this
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return false;
      }

      this.focus();
      this.setAttribute('aria-expanded', true);

      $(parent).toggleClass(ClassName.SHOW);
      $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

      return false;
    };

    Dropdown.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
    };

    // private

    Dropdown.prototype._addEventListeners = function _addEventListeners() {
      $(this._element).on(Event.CLICK, this.toggle);
    };

    // static

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Dropdown(this);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config].call(this);
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
        return;
      }

      var backdrop = $(Selector.BACKDROP)[0];
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));

      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (!$(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'focusin') && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue;
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent = void 0;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.FOCUSIN_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    // getters

    // public

    Modal.prototype.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    Modal.prototype.show = function show(relatedTarget) {
      var _this = this;

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }
      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });

      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();
      this._setScrollbar();

      $(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();
      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });

      $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    Modal.prototype.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);
      if (transition) {
        this._isTransitioning = true;
      }

      var hideEvent = $.Event(Event.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;

      this._setEscapeEvent();
      this._setResizeEvent();

      $(document).off(Event.FOCUSIN);

      $(this._element).removeClass(ClassName.SHOW);

      $(this._element).off(Event.CLICK_DISMISS);
      $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        this._hideModal();
      }
    };

    Modal.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      $(window, document, this._element, this._backdrop).off(EVENT_KEY);

      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._originalBodyPadding = null;
      this._scrollbarWidth = null;
    };

    // private

    Modal.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Modal.prototype._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // don't move modals dom position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.scrollTop = 0;

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }
        _this3._isTransitioning = false;
        $(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        transitionComplete();
      }
    };

    Modal.prototype._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      $(document).off(Event.FOCUSIN) // guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && !$(_this4._element).has(event.target).length) {
          _this4._element.focus();
        }
      });
    };

    Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    Modal.prototype._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $(window).on(Event.RESIZE, function (event) {
          return _this6._handleUpdate(event);
        });
      } else {
        $(window).off(Event.RESIZE);
      }
    };

    Modal.prototype._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', 'true');
      this._isTransitioning = false;
      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);
        _this7._resetAdjustments();
        _this7._resetScrollbar();
        $(_this7._element).trigger(Event.HIDDEN);
      });
    };

    Modal.prototype._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    Modal.prototype._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        var doAnimate = Util.supportsTransitionEnd() && animate;

        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          $(this._backdrop).addClass(animate);
        }

        $(this._backdrop).appendTo(document.body);

        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }
          if (event.target !== event.currentTarget) {
            return;
          }
          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (doAnimate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!doAnimate) {
          callback();
          return;
        }

        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    };

    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------

    Modal.prototype._handleUpdate = function _handleUpdate() {
      this._adjustDialog();
    };

    Modal.prototype._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + 'px';
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    Modal.prototype._checkScrollbar = function _checkScrollbar() {
      this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    Modal.prototype._setScrollbar = function _setScrollbar() {
      var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

      this._originalBodyPadding = document.body.style.paddingRight || '';

      if (this._isBodyOverflowing) {
        document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetScrollbar = function _resetScrollbar() {
      document.body.style.paddingRight = this._originalBodyPadding;
    };

    Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    };

    // static

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this9 = this;

    var target = void 0;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this9).is(':visible')) {
          _this9.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    NAV_LINK: 'nav-link',
    NAV: 'nav',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    LIST_ITEM: '.list-item',
    LI: 'li',
    LI_DROPDOWN: 'li.dropdown',
    NAV_LINKS: '.nav-link',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = function () {
    function ScrollSpy(element, config) {
      var _this = this;

      _classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, function (event) {
        return _this._process(event);
      });

      this.refresh();
      this._process();
    }

    // getters

    // public

    ScrollSpy.prototype.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

      this._offsets = [];
      this._targets = [];

      this._scrollHeight = this._getScrollHeight();

      var targets = $.makeArray($(this._selector));

      targets.map(function (element) {
        var target = void 0;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = $(targetSelector)[0];
        }

        if (target && (target.offsetWidth || target.offsetHeight)) {
          // todo (fat): remove sketch reliance on jQuery position/offset
          return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
        }
        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);
        _this2._targets.push(item[1]);
      });
    };

    ScrollSpy.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._scrollElement).off(EVENT_KEY);

      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    };

    // private

    ScrollSpy.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');
        if (!id) {
          id = Util.getUID(NAME);
          $(config.target).attr('id', id);
        }
        config.target = '#' + id;
      }

      Util.typeCheckConfig(NAME, config, DefaultType);

      return config;
    };

    ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight;
    };

    ScrollSpy.prototype._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;
      var scrollHeight = this._getScrollHeight();
      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }
        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    ScrollSpy.prototype._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',');
      queries = queries.map(function (selector) {
        return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
      });

      var $link = $(queries.join(','));

      if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        $link.addClass(ClassName.ACTIVE);
      } else {
        // todo (fat) this is kinda sus...
        // recursively add actives to tested nav-links
        $link.parents(Selector.LI).find('> ' + Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
      }

      $(this._scrollElement).trigger(Event.ACTIVATE, {
        relatedTarget: target
      });
    };

    ScrollSpy.prototype._clear = function _clear() {
      $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
    };

    // static

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    A: 'a',
    LI: 'li',
    DROPDOWN: '.dropdown',
    LIST: 'ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)',
    FADE_CHILD: '> .nav-item .fade, > .fade',
    ACTIVE: '.active',
    ACTIVE_CHILD: '> .nav-item > .active, > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    // getters

    // public

    Tab.prototype.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var target = void 0;
      var previous = void 0;
      var listElement = $(this._element).closest(Selector.LIST)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        previous = $.makeArray($(listElement).find(Selector.ACTIVE));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event.HIDE, {
        relatedTarget: this._element
      });

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $(selector)[0];
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event.HIDDEN, {
          relatedTarget: _this._element
        });

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: previous
        });

        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    Tab.prototype.dispose = function dispose() {
      $.removeClass(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Tab.prototype._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var active = $(container).find(Selector.ACTIVE_CHILD)[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

      var complete = function complete() {
        return _this2._transitionComplete(element, active, isTransitioning, callback);
      };

      if (active && isTransitioning) {
        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      if (active) {
        $(active).removeClass(ClassName.SHOW);
      }
    };

    Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
      if (active) {
        $(active).removeClass(ClassName.ACTIVE);

        var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        active.setAttribute('aria-expanded', false);
      }

      $(element).addClass(ClassName.ACTIVE);
      element.setAttribute('aria-expanded', true);

      if (isTransitioning) {
        Util.reflow(element);
        $(element).addClass(ClassName.SHOW);
      } else {
        $(element).removeClass(ClassName.FADE);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
        if (dropdownElement) {
          $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    };

    // static

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($) {

  /**
   * Check for Tether dependency
   * Tether - http://tether.io/
   */
  if (typeof Tether === 'undefined') {
    throw new Error('Bootstrap tooltips require Tether (http://tether.io/)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tether';

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: '0 0',
    constraints: [],
    container: false
  };

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: 'string',
    constraints: 'array',
    container: '(string|element|boolean)'
  };

  var AttachmentMap = {
    TOP: 'bottom center',
    RIGHT: 'middle left',
    BOTTOM: 'top center',
    LEFT: 'middle right'
  };

  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner'
  };

  var TetherClass = {
    element: false,
    enabled: false
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._isTransitioning = false;
      this._tether = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    // getters

    // public

    Tooltip.prototype.enable = function enable() {
      this._isEnabled = true;
    };

    Tooltip.prototype.disable = function disable() {
      this._isEnabled = false;
    };

    Tooltip.prototype.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    Tooltip.prototype.toggle = function toggle(event) {
      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {

        if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
          this._leave(null, this);
          return;
        }

        this._enter(null, this);
      }
    };

    Tooltip.prototype.dispose = function dispose() {
      clearTimeout(this._timeout);

      this.cleanupTether();

      $.removeData(this.element, this.constructor.DATA_KEY);

      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;
      this._tether = null;

      this.element = null;
      this.config = null;
      this.tip = null;
    };

    Tooltip.prototype.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        if (this._isTransitioning) {
          throw new Error('Tooltip is transitioning');
        }
        $(this.element).trigger(showEvent);

        var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);

        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        var container = this.config.container === false ? document.body : $(this.config.container);

        $(tip).data(this.constructor.DATA_KEY, this).appendTo(container);

        $(this.element).trigger(this.constructor.Event.INSERTED);

        this._tether = new Tether({
          attachment: attachment,
          element: tip,
          target: this.element,
          classes: TetherClass,
          classPrefix: CLASS_PREFIX,
          offset: this.config.offset,
          constraints: this.config.constraints,
          addTargetClasses: false
        });

        Util.reflow(tip);
        this._tether.position();

        $(tip).addClass(ClassName.SHOW);

        var complete = function complete() {
          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          _this._isTransitioning = false;

          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
          return;
        }

        complete();
      }
    };

    Tooltip.prototype.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);
      if (this._isTransitioning) {
        throw new Error('Tooltip is transitioning');
      }
      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2.element.removeAttribute('aria-describedby');
        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);
        _this2._isTransitioning = false;
        _this2.cleanupTether();

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName.SHOW);

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    // protected

    Tooltip.prototype.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    Tooltip.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Tooltip.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    Tooltip.prototype.setElementContent = function setElementContent($element, content) {
      var html = this.config.html;
      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
        // content is a DOM node or a jQuery
        if (html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }
      } else {
        $element[html ? 'html' : 'text'](content);
      }
    };

    Tooltip.prototype.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    };

    Tooltip.prototype.cleanupTether = function cleanupTether() {
      if (this._tether) {
        this._tether.destroy();
      }
    };

    // private

    Tooltip.prototype._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    Tooltip.prototype._setListeners = function _setListeners() {
      var _this3 = this;

      var triggers = this.config.trigger.split(' ');

      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
            return _this3.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;

          $(_this3.element).on(eventIn, _this3.config.selector, function (event) {
            return _this3._enter(event);
          }).on(eventOut, _this3.config.selector, function (event) {
            return _this3._leave(event);
          });
        }

        $(_this3.element).closest('.modal').on('hide.bs.modal', function () {
          return _this3.hide();
        });
      });

      if (this.config.selector) {
        this.config = $.extend({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    Tooltip.prototype._fixTitle = function _fixTitle() {
      var titleType = _typeof(this.element.getAttribute('data-original-title'));
      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    Tooltip.prototype._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    Tooltip.prototype._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    Tooltip.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

      if (config.delay && typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    // static

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
}(jQuery); /* global Tether */
;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TITLE: '.popover-title',
    CONTENT: '.popover-content'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
    }

    // overrides

    Popover.prototype.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    Popover.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Popover.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      // we use append for html objects to maintain js events
      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
      this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    // private

    Popover.prototype._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
    };

    // static

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: 'VERSION',


      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  }(Tooltip);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}(jQuery);











/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error, error1;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
$(document).ready(function() {  
  App.game = App.cable.subscriptions.create("GameChannel", {
    connected: function() {
      // Called when the subscription is ready for use on the server
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
    },

    received: function(data) {
      if (data.score != undefined) {
        $('.loader').css('display', 'none')
        $('.score').html(data.score)
      }
      if (data.bonus) {
        bubble(data.bonus)
      }
      if (data.bonus_id != undefined) {
        $('.level_up_bonuses div[data-id="' + data.bonus_id + '"]')
          .find('span.level').html(data.level)
        $('.level_up_bonuses div[data-id="' + data.bonus_id + '"]')
          .find('span.price').html(data.price)
        $('.level_up_bonuses div[data-id="' + data.bonus_id + '"]')
          .find('span.click_bonus').html(data.click_bonus)
      }
      if (data.auto_clicker_bonus_id != undefined) {
        $('.level_up_auto_bonuses div[data-id="' + data.auto_clicker_bonus_id + '"]')
          .find('span.level').html(data.level)
        $('.level_up_auto_bonuses div[data-id="' + data.auto_clicker_bonus_id + '"]')
          .find('span.price').html(data.price)
        $('.level_up_auto_bonuses div[data-id="' + data.auto_clicker_bonus_id + '"]')
          .find('span.click_bonus').html(data.click_bonus)
      }

      if (data.completion != undefined) {
        $('.percent_completion.' + data.team_name).html("(" + data.completion + " %)")
      }
      if (data.team_name != undefined) {
        console.log(data)
        $('.indicator.' + data.team_name).css('width', data.completion + "%")
      }
    },

    click: function(team_id) {
      return this.perform('click');
    },

    level_up: function(bonus_id) {
      return this.perform('level_up', {bonus_id: bonus_id})
    },

    level_up_auto: function(bonus_id) {
      return this.perform('level_up_auto', {bonus_id: bonus_id})
    }
  });
})

$(document).on('click', '#clicker', function(e) {
  e.preventDefault();
  App.game.click()
})

$(document).on('click', '.level_up_bonuses a', function(e) {
  bonus_id = $(e.target).parents('div').data("id")
  App.game.level_up(bonus_id)
  e.preventDefault()
})

$(document).on('click', '.level_up_auto_bonuses a', function(e) {
  bonus_id = $(e.target).parents('div').data("id")
  App.game.level_up_auto(bonus_id)
  e.preventDefault()
})
;
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var mouseX, mouseY;
var bubbles = [];
var toRemove = [];
$(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
})


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    $('#defaultCanvas0').css({'position': 'absolute', 'bottom': 0,
		'right': 0,
		'left': 0,
		'top': 0,
		'z-index': 20,
		'pointer-events': 'none'})
    textAlign(CENTER)
    textSize(16);
    colorMode('RGBA')
}

function draw() {
	clear()
    for (var i = 0; i < bubbles.length; i++) {
    	b = bubbles[i]
    	if (b.alpha <= 0) {
    		toRemove.push(i)
		}
    	// fill(255, 59, 158, b.alpha)
    	// stroke(255, 59, 158, b.alpha + 30)
    	// ellipse(b.x, b.y, 80, 80)
    	b.update_position()
	   	fill(255, 255, 255, b.alpha)
    	text("+ " + Math.floor(b.bonus), b.x, b.y + 4)
    }
    for (var i = 0; i < toRemove.length; i++) {
		bubbles.splice(toRemove[i], 1)
    }
    toRemove = [];
}

function bubble(bonus) {
	if (bubbles.length < 30) {
		b = new Bubble(bonus)
		b.index = bubbles.push(b)
	}
}

Bubble = function(bonus) {
	this.init(bonus)
}
Bubble.prototype.init = function(bonus) {
	this.x = mouseX
	this.y = mouseY
	this.bonus = bonus
	this.speed = Math.random(7, 10)
	this.alpha = 350
	this.decay = -1
	this.angle = Math.random(0, 2*Math.PI)
}

Bubble.prototype.update_position = function() {
	this.x += cos(this.angle) * this.speed
	this.y += sin(this.angle) * this.speed
	this.alpha += this.decay
}
;
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
;
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//







;
