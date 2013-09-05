var profile = (function(){
	var testResourceRe = /\/tests\//,

		copyOnly = function(filename, mid){
			var list = {
				// these are test modules that are not intended to ever be built
				"dwl/env/mock":1,		// Normal JS file, Non AMD based
				"dwl/dwl.profile":1,
				"dwl/package.json":1,
				"dwl/tests":1
			};
			return (mid in list) || /^dwl\/resources\//.test(mid) || /(png|jpg|jpeg|gif|tiff)$/.test(filename);
		},

		excludes = [
			"secure",
			"data/(demos|ItemExplorer|StoreExplorer|restListener)",
			"drawing/plugins/drawing/Silverlight",
			"editor/plugins/(ResizeTableColumn|SpellCheck)",
			"embed/(IE)",
			"flash/_base",
			"help",
			"image/(Gallery|SlideShow|ThumbnailPicker)",
			"jq",
			"jsonPath/query",
			"lang/(aspect|async|docs|observable|oo|typed|functional/(binrec|curry|linrec|listcomp|multirec|numrec|tailrec|util|zip))",
			"layout/(BorderContainer|dnd|ext-dijit)",
			"mobile/app/",
			"rails",
			"robot",
			"socket/Reconnect",
			"sql/",
			"storage/",
			"widget/(AnalogGauge|BarGauge|DataPresentation|DocTester|DynamicTooltip|FeedPortlet|FilePicker|gauge|Iterator|Loader|RollingList|SortList)",
			"wire/",
			"xmpp"
		],

		excludesRe = new RegExp(("^dojox/(" + excludes.join("|") + ")").replace(/\//, "\\/")),

		usesDojoProvideEtAl = function(mid){
			return excludesRe.test(mid);
		};

	return {
		resourceTags:{
			test: function(filename, mid){
				return testResourceRe.test(mid);
			},

			copyOnly: function(filename, mid){
				return copyOnly(filename, mid);
			},

			ignore: function(filename, mid) {
				return /dwl\/build/.test(mid) || /dwl\/(build-)*jsdoc/.test(mid) || /dwl\/demos/.test(mid);
			},

			amd: function(filename, mid){
				return !testResourceRe.test(mid) && !copyOnly(filename, mid) && !usesDojoProvideEtAl(mid) && /\.js$/.test(filename);
			}
		},

		trees:[
			[".", ".", /(\/\.)|(~$)/]
		]
	};
})();
