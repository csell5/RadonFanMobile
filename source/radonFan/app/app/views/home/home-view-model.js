var observable = require("data/observable");
var observableArray = require("data/observable-array");
var everlive = require('../../lib/everlive/everlive.all.min');
var moment = require('../../lib/moment');

var homeViewModel = function (source)
{
    this._statusItems = new observableArray.ObservableArray([]); 
    this._statusItemsRequested = false;
    this._currentItem = new observable.Observable();
}

Object.defineProperty(homeViewModel.prototype, "stackStatusItems", {
    get: function () 
    {
      if (!this._statusItemsRequested) {

        var that = this;
        getStackStatusFromEL( function (data) {
           data.result.forEach(function( status ) {      
              status.CreatedAt = moment(status.CreatedAt).format( "h:mm:ss a" );
              that._statusItems.push( status );
            });

          that._statusItemsRequested = true;
          
        }); 
      }
      return this._statusItems;        
    }
});

homeViewModel.prototype.refreshStackStatus = function () {
  //Clear out the grid...
  while (this._statusItems.length) {
    this._statusItems.pop();
  }

  var that = this;
  getStackStatusFromEL( function (data) {
    data.result.forEach(function( status ) {      
      status.CreatedAt = moment(status.CreatedAt).format( "h:mm:ss a" );
      that._statusItems.push( status );
    });
  }); 
};

//Example Payload
//{"IndoorTemp":"54","OutdoorTemp":"40","PSI":62,"Device":"test","CreatedAt":"2015-03-13T12:56:04.154Z","ModifiedAt":"2015-03-13T12:56:04.154Z","CreatedBy":"00000000-0000-0000-0000-000000000000","ModifiedBy":"00000000-0000-0000-0000-000000000000","Owner":"00000000-0000-0000-0000-000000000000","Id":"4eb689a0-c980-11e4-86e6-9701422b62b9","Meta":{"Permissions":{"CanRead":true,"CanUpdate":true,"CanDelete":true}}}  

function getStackStatusFromEL(callback) {
    var el = new everlive(global.TELERIK_BAAS_KEY);
    var query = new everlive.Query();
    
    query.where().gt('CreatedAt', moment().subtract(1, 'days')).done().select('Device', 'IndoorTemp', 'OutdoorTemp', 'PSI', 'CreatedAt', 'ModifiedAt').orderDesc('CreatedAt');
    var contentType = el.data('StackStatus');

    contentType.get(query).then(
      function (data) { 
        callback(data);
      }, 
      function(err) {
        alert(err.message);
    });
}

exports.homeViewModel = homeViewModel;