'use strict';

angular.module('fifaLeagueApp')
  .controller('ResultsCtrl', function ($scope, seasonReportService) {
    var results = seasonReportService.getCurrentSeason();

    results.$on('loaded', function(raceReports) {
      console.log(raceReports);
      for (var raceReport in raceReports) {
        raceReports[raceReport].id = parseInt(raceReports[raceReport].id);
      }
      $scope.results = raceReports;
    });

  });
