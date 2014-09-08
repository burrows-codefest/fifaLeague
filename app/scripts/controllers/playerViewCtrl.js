'use strict';

angular.module('fifaLeagueApp')
  .controller('PlayerViewCtrl', function ($scope, $routeParams, playerService) {
    $scope.player = playerService.getPlayerWithStats($routeParams.id);
  });
