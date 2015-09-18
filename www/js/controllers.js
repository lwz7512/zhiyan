angular.module('starter.controllers', [])

.controller('EditorChooseCtrl', function($scope, $log, $http) {
  $scope.articles = [];
  
  $http.get('data/home_best.json').
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
  }).
  error(function(result){
    $scope.alert("加载文件失败!");
  });
  
})

.controller('ArtDetailCtrl', function($scope, $log, $stateParams, $http) {
  $scope.art_title = 'loading...';
  var pageId = $stateParams.pageId;
  var articleURL = 'articles/'+pageId+'.html.json';
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
        $log.error("load article error!");
      });
  }, 300);
 
})

.controller('HotsCtrl', function($scope, $log, $http) {
  $scope.articles = [];
  $http.get('data/home_rank.json').
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
  }).
  error(function(result){
    $scope.alert("加载文件失败!");
  });
})

.controller('BookStoreCtrl', function($scope, $log, $http) {
  $scope.books = [];
  $http.get('data/store.json').
  success(function(result){
    var books = JSON.parse(result);
    //TODO, process url
    for(var i in books){
      var href = books[i]['href'];
      books[i]['id'] = href.split('/')[1].split('.')[0];
    }
    $scope.books = books;
    //$log.debug($scope.books);
  }).
  error(function(result){
    $scope.alert("加载文件失败!");
  });
  $log.error('loading store...');
})

.controller('BookDetailCtrl', function($scope, $log, $stateParams, $http) {
  $scope.book_title = 'loading...';
  var pageId = $stateParams.bookId;
  var bookDetailURL = 'books/'+pageId+'.html';
  //lazy load to ease page transition
  //@2015/09/18
  setTimeout(function(){
     $http.get(bookDetailURL).
      success(function(result){
        //$log.debug(result);
        $scope.book_content = result;
      }).
      error(function(e){
        $log.error("load article error!");
      });
  }, 300);
 
})


.controller('ContactCtrl', function($scope, $stateParams, Chats) {
  
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
