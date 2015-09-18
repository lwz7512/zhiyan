// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.choosen', {
    url: '/choosen',
    views: {
      'tab-choosen': {
        templateUrl: 'templates/editor-select.html',
        controller: 'EditorChooseCtrl'
      }
    }
  })
  .state('tab.choosen-detail', {
    url: '/choosen-detail/:pageId',
    views: {
      'tab-choosen': {
        templateUrl: 'templates/article-detail.html',
        controller: 'ArtDetailCtrl'
      }
    }
  })
  .state('tab.hots', {
      url: '/hots',
      views: {
        'tab-hots': {
          templateUrl: 'templates/hot-article.html',
          controller: 'HotsCtrl'
        }
      }
    })
  .state('tab.hot-detail', {
    url: '/hot-detail/:pageId',
    views: {
      'tab-hots': {
        templateUrl: 'templates/article-detail.html',
        controller: 'ArtDetailCtrl'
      }
    }
  })
  .state('tab.bookstore', {
    url: '/bookstore',
    views: {
      'tab-bookstore': {
        templateUrl: 'templates/book-store.html',
        controller: 'BookStoreCtrl'
      }
    }
  })
  .state('tab.book-detail', {
    url: '/book-detail/:bookId',
    views: {
      'tab-bookstore': {
        templateUrl: 'templates/book-detail.html',
        controller: 'BookDetailCtrl'
      }
    }
  })
  .state('tab.contactus', {
    url: '/contactus',
    views: {
      'tab-contactus': {
        templateUrl: 'templates/contact-us.html',
        controller: 'ContactCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/choosen');

});
