'use strict';

angular.module('fifaLeagueApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/rules', {
        templateUrl: 'views/rules.html'
      })
      .when('/tv', {
        templateUrl: 'views/tv.html'
      })
      .when('/fixtures', {
        templateUrl: 'views/fixtures.html'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .when('/player/:id', {
        templateUrl: 'views/player-view.html',
        controller: 'PlayerViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

$(document).tooltip();