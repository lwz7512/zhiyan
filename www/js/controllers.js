/**
 * page controllers define @2015/09/19
 */
angular.module('starter.controllers', [])

.controller('GlobalCtrl', function($scope, $rootScope, $log, $ionicLoading, $ionicPopup){
  $log.debug('app started....');
  
    // Setup the loader
  $scope.show = function() {
    $ionicLoading.show({
//      template: 'loading...',
      template: '<ion-spinner icon="lines" class="spinner-stable"></ion-spinner>',//ionic 1.0.1@2015/07/25
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 50,
      showDelay: 0
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };
  
  $scope.alert = function(msg){
    var alertPopup = $ionicPopup.alert({
      title: '应用提示',
      template: msg,
      okText: '好的',
    });
  };


  $scope.$on('refresh', function(event){
    $scope.show();
  });
  $scope.$on('complete', function(event){
    $scope.hide();
  });
  $scope.$on('error', function(event, msg){
    $scope.hide();
    $scope.alert(msg);
  });
  
})

.controller('EditorChooseCtrl', function($scope, $rootScope, $log, $http, DataSource) {
  $scope.articles = [];
    
  $scope.refresh = function(){
    var choosenArtURL = DataSource.getRootURL()+'data/home_best.json';
    //console.log(choosenArtURL);
    $http.get(choosenArtURL).
    success(function(result){
      var articles = JSON.parse(result);
      //TODO, process url
      for(var i in articles){
        var articlePath = articles[i]['href'].split('/');
        var pageName = articlePath[articlePath.length-1];
        articles[i]['id'] = pageName.split('.')[0];
      }
      $scope.articles = articles;
      //$log.debug($scope.articles);
      $rootScope.$broadcast('complete');
    }).
    error(function(result){
      $rootScope.$broadcast('error', "加载文件失败!");
    });
  };
  
  $scope.refresh();
  $rootScope.$broadcast('refresh');
})

.controller('ArtDetailCtrl', function($scope, $rootScope, $log, $stateParams, $http, DataSource) {
  $scope.art_title = 'loading...';
  var pageId = $stateParams.pageId;
  var articleURL = DataSource.getRootURL()+'articles/'+pageId+'.html.json';
  //lazy load to ease page transition
  //@2015/09/18
  setTimeout(function(){
     $http.get(articleURL).
      success(function(result){
        var artJSON = JSON.parse(result);
        //$log.debug(artJSON);
        $scope.art_content = artJSON.content;
        $scope.art_title = artJSON.title;
        $scope.art_source = artJSON.source;
      }).
      error(function(e){
        $rootScope.$broadcast('error', "加载文件失败!");
      });
  }, 300);
 
})

.controller('HotsCtrl', function($scope, $rootScope, $log, $http, DataSource) {
  $scope.articles = [];
  $http.get(DataSource.getRootURL()+'data/home_rank.json').
  success(function(result){
    var articles = JSON.parse(result);
    //TODO, process url
    for(var i in articles){
      var articlePath = articles[i]['href'].split('/');
      var pageName = articlePath[articlePath.length-1];
      articles[i]['id'] = pageName.split('.')[0];
    }
    $scope.articles = articles;
    //$log.debug($scope.articles);
    $rootScope.$broadcast('complete');
  }).
  error(function(result){
    $rootScope.$broadcast('error', "加载文件失败!");
  });
  $rootScope.$broadcast('refresh');
})

.controller('BookStoreCtrl', function($scope, $rootScope, $log, $http, DataSource) {
  $scope.books = [];
  $http.get(DataSource.getRootURL()+'data/store.json').
  success(function(result){
    var books = JSON.parse(result);
    //TODO, process url
    for(var i in books){
      var href = books[i]['href'];
      books[i]['id'] = href.split('/')[1].split('.')[0];
    }
    $scope.books = books;
    //$log.debug($scope.books);
    $rootScope.$broadcast('complete');
  }).
  error(function(result){
    $rootScope.$broadcast('error', "加载文件失败!");
  });
  $rootScope.$broadcast('refresh');
})

.controller('BookDetailCtrl', function($scope, $rootScope, $log, $stateParams, $http, DataSource) {
  $scope.book_title = 'loading...';
  var pageId = $stateParams.bookId;
  var bookDetailURL = DataSource.getRootURL()+'books/'+pageId+'.html';
  //lazy load to ease page transition
  //@2015/09/18
  setTimeout(function(){
     $http.get(bookDetailURL).
      success(function(result){
        //$log.debug(result);
        $scope.book_content = result;
       $rootScope.$broadcast('complete');
      }).
      error(function(e){
        $rootScope.$broadcast('error', "加载文件失败!");
      });
  }, 300);
  $rootScope.$broadcast('refresh');
})

.controller('ContactUsCtrl', function($scope, $rootScope, $log){
  $log.debug('do nothing currently...');
});
