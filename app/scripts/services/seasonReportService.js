'use strict';

angular.module('fifaLeagueApp')
  .service('seasonReportService', function ($firebase) {
    var seasonReportUrl = 'https://fifaleague.firebaseio.com/matchReports/';

    this.getCurrentSeason = function () {
      return $firebase(new Firebase(seasonReportUrl));
    };
  });
