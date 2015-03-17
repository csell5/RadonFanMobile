var vmModule = require("./home-view-model");
var frameModule = require("ui/frame");

var _page,
	_vm;

// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    _page = args.object;

    _vm = new vmModule.homeViewModel();
    _page.bindingContext = _vm;
}
exports.pageLoaded = pageLoaded;

function refreshStatus (args) {
	var activityIndicator = _page.getViewById("activityIndicator")
	activityIndicator.busy = true;

	_vm.refreshStackStatus();
	
	activityIndicator.busy = false;
}
exports.refreshStatus = refreshStatus;

function listViewItemTap(args) {
    var topmost = frameModule.topmost();
    var navigationEntry = {
        moduleName: "app/views/statusDetails/statusDetail",
        context: args.view.bindingContext
    };

    topmost.navigate(navigationEntry);
}
exports.listViewItemTap = listViewItemTap;
