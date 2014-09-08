'use strict';

angular.module('fifaLeagueApp')
  .controller('MainCtrl', function ($scope, playerService) {
    var player, players;

    $scope.standings = [];

    players = playerService.getDrivers();

    for (player in players) {
      $scope.standings.push(playerService.getPlayerWithStats(players[player].id));
    }
  });
