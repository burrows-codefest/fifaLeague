'use strict';

angular.module('fifaLeagueApp')
    .controller('AdminCtrl', function ($scope, $location, matchReportService, playerService) {
      var ref = new Firebase('https://fifaleague.firebaseio.com/'),
          date = new Date().getTime();

      $scope.loggedIn = false;

      var auth = new FirebaseSimpleLogin(ref, function (error, user) {
        if (error) {
          console.log(error);
        } else if (user) {
          $scope.loggedIn = true;
        } else {
          $scope.loggedIn = false;
        }
      });

      $scope.login = function(userEmail, userPassword) {
        auth.login('password', {
          email: userEmail,
          password: userPassword
        });
      };

      $scope.logout = function() {
        auth.logout();
      };

      $scope.report = {};

      matchReportService.getNextMatchId().then(function (data) {
        $scope.report.id = data;
      });

      $scope.report.publishedDate = date;
      $scope.players = playerService.getDrivers();

      $scope.submitMatchReport = function () {
        matchReportService.saveMatchReport($scope.report);
        $location.path('/results/');
      };
    });
