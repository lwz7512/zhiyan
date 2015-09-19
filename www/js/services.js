angular.module('starter.services', [])
//FIX, read json data in device @2015/0919
.factory('DataSource', function() {
  // Might use a resource here that returns a JSON array
  
  return {
    getRootURL: function() {
      var url = "http://www.release.la/yanhuang/";
      
      return url;
    }
  };
});
