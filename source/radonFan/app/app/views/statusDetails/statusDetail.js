
var _vm = {};
var _page;

/*
   {
	    "IndoorTemp":"54",
	    "OutdoorTemp":"71",
	    "PSI":62,
	    "Device":"test",
	    "CreatedAt":"5:45:47 pm",
	    "ModifiedAt":"2015-03-16T22:45:47.258Z","
	    Id":"2fecfda0-cc2e-11e4-a755-51cbef19687d"
	}

*/

function onNavigatedTo (args) {
    _page = args.object;
    _vm.statusDetail = _page.navigationContext;
    _page.bindingContext = _vm;
}
exports.onNavigatedTo = onNavigatedTo;