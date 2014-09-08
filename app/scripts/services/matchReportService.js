'use strict';

angular.module('fifaLeagueApp')
  .service('matchReportService', function ($firebase, $q, seasonReportService) {
    var raceReportUrl = 'https://fifaleague.firebaseio.com/matchReports/';

    this.getRaceReport = function (id) {
      return $firebase(new Firebase(raceReportUrl + id));
    };

    this.getHistoricRaceReport = function (season, id) {
      var deferred = $q.defer();

      seasonReportService.getHistoricSeason(season).then(function(data) {
        deferred.resolve(data[id]);
      });

      return deferred.promise;
    };

    this.saveMatchReport = function (report) {
      var ref = new Firebase(raceReportUrl + report.id + '/');

      ref.update(angular.copy(report));
    };
      
    this.getNextMatchId = function () {
      var raceReports = seasonReportService.getCurrentSeason(),
          deferred = $q.defer();

      raceReports.$on('loaded', function(raceReports) {
        if (raceReports) {
          deferred.resolve(raceReports.length);
        } else {
          deferred.resolve(0);
        }
      });
        
      return deferred.promise;
    };
  });
