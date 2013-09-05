//-------------------------------------------------------------------------
//
// Licensed Materials - Property of IBM
// (C) Copyright IBM Corp. 2012  All Rights Reserved
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
//
//-------------------------------------------------------------------------
// Module: dwl/has/worklight
//-------------------------------------------------------------------------
//	Has rules defined by this class.
//--------------------------------------------------------------------
//	"worklight"						Returns true if running under Worklight, else false
//	"worklight-device"				Returns device name, else "browser"
//	"worklight-hybrid"				Returns device name, else false
//	"worklight-android"				Returns true if an Android based device, else false
//	"worklight-iphone"				Returns true if an Iphone device, else false
//	"worklight-ipad"				Returns true if an Ipad device, else false
//	"worklight-ios"					Returns device name if an IOS based, else false
//	"worklight-tablet"				Returns device name if Ipad or Android (with TabletSize), else false
//	"worklight-webapp"				Returns true if loaded as mobile web app, else false
//	"worklight-preview"				Returns preview type, else false
//	"worklight-preview-android"		Returns true if previewing Android environment, else false
//	"worklight-preview-ipad"		Returns true if previewing Ipad environment, else false
//	"worklight-preview-iphone"		Returns true if previewing Iphone environment, else false
//	"worklight-preview-ios"			Returns preview type if previewing IOS environment, else false
//	"worklight-preview-tablet"		Returns preview type if previewing IPad or Android with TabletSize, else false
//	"worklight-preview-webapp"		Returns true if previewing Mobile Web App environment, else false
//	"worklight-phone-size"			Returns true if minimum display size < 500px, else false
//	"worklight-tablet-size"			Returns true if minimum display size > 500px, else false
//	"worklight-tablet-like"			Returns true if "wlTablet" or size > 1024px, else false
//	"worklight-mobile-browser"		Returns mobile type if not hybrid and UA is mobile, else false
//	"worklight-desktop-browser"		Returns user agent if not hybrid and UA not mobile, else false
//  "worklight-jsonstore"           Returns true is Worklight JSON store is supported.
//--------------------------------------------------------------------

define([
    "dojo/_base/lang",
    "dojo/has"
], function(lang, has) {

	//--------------------------------------------------------------------
	var MODULE = "dwl/has/worklight";
	//console.log("Worklight - Has setup");

	var wl = {};


	wl.tabletSize = 500;
	wl.desktopSize = 1024;

	wl.hasTests = [
	    "worklight",
	    "worklight-device",
	    "worklight-hybrid",
	    "worklight-android",
	    "worklight-iphone",
	    "worklight-ipad",
	    "worklight-ios",
	    "worklight-tablet",
	    "worklight-webapp",
	    "worklight-preview",
	    "worklight-preview-android",
	    "worklight-preview-ipad",
	    "worklight-preview-iphone",
	    "worklight-preview-ios",
	    "worklight-preview-tablet",
	    "worklight-preview-webapp",
	    "worklight-phone-size",
	    "worklight-tablet-size",
	    "worklight-tablet-like",
	    "worklight-mobile-browser",
	    "worklight-desktop-browser",
	    "worklight-jsonstore"
	];

	//--------------------------------------------------------------------
	has.add("worklight", function() {
		return !!(window["WL"] && window["WL"].Client);
	});

	//--------------------------------------------------------------------
	has.add("worklight-android", function() {
		if ( has("worklight") ) {
			return  (WL.Client.getEnvironment() == WL.Environment.ANDROID );
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-iphone", function() {
		if ( has("worklight") ) {
			return ( WL.Client.getEnvironment() == WL.Environment.IPHONE );
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-ipad", function() {
		if ( has("worklight") ) {
			return ( WL.Client.getEnvironment() == WL.Environment.IPAD );
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-ios", function() {
		if ( has("worklight") ) {
			var dev = has("worklight-hybrid");
			return ( dev && (dev == WL.Environment.IPHONE || dev == WL.Environment.IPAD) ) ? dev : false;
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-webapp", function() {
		if ( has("worklight") ) {
			return ( WL.Client.getEnvironment() == WL.Environment.WEB_APP );
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-tablet", function() {
		if ( has("worklight") ) {
			var dev = has("worklight-hybrid");
			return ( dev && dev == WL.Environment.IPAD || (dev == WL.Environment.ANDROID && has("worklight-tablet-size") ) ) ? dev : false;
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-hybrid", function() {
		if ( has("worklight") ) {
			if ( has("worklight-android") ) { return WL.Environment.ANDROID; }
			if ( has("worklight-iphone" ) ) { return WL.Environment.IPHONE;  }
			if ( has("worklight-ipad"   ) ) { return WL.Environment.IPAD;    }
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-device", function() {
		return has("worklight-hybrid") || "browser";
	});

	//--------------------------------------------------------------------
	has.add("worklight-preview", function() {
		if ( has("worklight") ) {
			if ( WL.Environment.PREVIEW === WL.Client.getEnvironment() ) {
				if ( location.href.match(/\/preview\/.*\/android\//)      ) { return WL.Environment.ANDROID;  }
				if ( location.href.match(/\/preview\/.*\/ipad\//)         ) { return WL.Environment.IPAD;     }
				if ( location.href.match(/\/preview\/.*\/iphone\//)       ) { return WL.Environment.IPHONE;   }
				if ( location.href.match(/\/preview\/.*\/mobilewebapp\//) ) { return WL.Environment.WEB_APP;  }
				return true;
			}
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-preview-android", function() {
		if ( has("worklight") ) {
			return ( has("worklight-preview") == WL.Environment.ANDROID );
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-preview-ipad", function() {
		if ( has("worklight") ) {
			return (has("worklight-preview") == WL.Environment.IPAD );
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-preview-iphone", function() {
		if ( has("worklight") ) {
			return ( has("worklight-preview") == WL.Environment.IPHONE );
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-preview-ios", function() {
		if ( has("worklight") ) {
			var pre = has("worklight-preview");
			return ( pre == WL.Environment.IPHONE || pre == WL.Environment.IPAD ) ? pre : false;
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-preview-tablet", function() {
		if ( has("worklight") ) {
			var pre = has("worklight-preview");
			return ( pre == WL.Environment.IPAD || (pre == WL.Environment.ANDROID && has("worklight-tablet-size")) ) ? pre : false;
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-preview-webapp", function() {
		if ( has("worklight") ) {
			return ( has("worklight-preview") == WL.Environment.WEB_APP );
		}
		return false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-phone-size", function() {
		var sz = Math.min(window.innerHeight, window.innerWidth);
		return !!( has("worklight") && sz < wl.tabletSize );
	});

	//--------------------------------------------------------------------
	has.add("worklight-tablet-size", function() {
		var sz = Math.min(window.innerHeight, window.innerWidth);
		return !!( has("worklight") && sz >= wl.tabletSize && sz < 1024 );
	});

	//--------------------------------------------------------------------
	has.add("worklight-tablet-like", function() {
		return ( has("worklight-tablet") || has("worklight-preview-tablet") );
	});

	//--------------------------------------------------------------------
	has.add("worklight-mobile-browser", function() {
		var ua = navigator.userAgent.match(/("android"|"blackberry"|"iPad"|"iPhone")/i);
		return (!has("worklight-hybrid") && ua) ? navigator.userAgent : false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-desktop-browser", function() {
		var ua = navigator.userAgent.match(/("android"|"blackberry"|"iPad"|"iPhone")/i);
		return (!has("worklight-hybrid") && !ua) ? navigator.userAgent : false;
	});

	//--------------------------------------------------------------------
	has.add("worklight-jsonstore", function() {
		return (has("worklight-hybrid") && typeof WL.JSONStore !== 'undefined');
	});

	//--------------------------------------------------------------------
	wl.dumpHasTests = function() {
		var F = MODULE+".dumpHasTests(): ";
		var tests = {};
		for( var i = 0; i < wl.hasTests.length; i++ ) {
			var t = wl.hasTests[i];
			tests[t] = has(t);
		}
		//console.log(F, tests );
		return tests;
	};

	return wl;
});
