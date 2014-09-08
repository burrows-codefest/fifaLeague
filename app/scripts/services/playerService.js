'use strict';

angular.module('fifaLeagueApp')
  .service('playerService', function ($q, seasonReportService) {
    function getDrivers () {
      var drivers = [
        {
          'id': 0,
          'name': 'Jason Jefferey',
          'gamertag': 'M1lhous3',
          'role': 'developer',
          'team': 'Real Madrid',
          'imgUrl': 'http://avatar.xboxlive.com/avatar/M1lhous3/avatar-body.png',
          'imgUrlSmall': 'http://avatar.xboxlive.com/avatar/M1lhous3/avatarpic-s.png'
        },
        {
          'id': 1,
          'name': 'Ben Chaplin',
          'gamertag': 'AxelTron',
          'role': 'developer',
          'team': 'Bayern Munich',
          'imgUrl': 'http://avatar.xboxlive.com/avatar/AxelTron/avatar-body.png',
          'imgUrlSmall': 'http://avatar.xboxlive.com/avatar/AxelTron/avatarpic-s.png'
        },
        {
          'id': 2,
          'name': 'Ben Grimwood',
          'gamertag': 'MysticTriEdge',
          'role': 'producer',
          'team': 'Borussia Dortmund',
          'imgUrl': 'http://avatar.xboxlive.com/avatar/MysticTriEdge/avatar-body.png',
          'imgUrlSmall': 'http://avatar.xboxlive.com/avatar/MysticTriEdge/avatarpic-s.png'
        },
        {
          'id': 3,
          'name': 'Thuin Khan',
          'gamertag': 'SacredMr T',
          'role': 'producer',
          'team': 'Paris Saint-Germain',
          'imgUrl': 'http://avatar.xboxlive.com/avatar/SacredMr T/avatar-body.png',
          'imgUrlSmall': 'http://avatar.xboxlive.com/avatar/SacredMr T/avatarpic-s.png'
        },
        {
          'id': 4,
          'name': 'Ricky Clegg',
          'gamertag': 'kloobe',
          'role': 'developer',
          'team': 'Man City',
          'imgUrl': 'http://avatar.xboxlive.com/avatar/kloobe/avatar-body.png',
          'imgUrlSmall': 'http://avatar.xboxlive.com/avatar/kloobe/avatarpic-s.png'
        },
        {
          'id': 5,
          'name': 'Billy Pittard',
          'gamertag': 'Bonzai Bill',
          'role': 'producer',
          'team': 'Barcelona',
          'imgUrl': 'http://avatar.xboxlive.com/avatar/Bonzai Bill/avatar-body.png',
          'imgUrlSmall': 'http://avatar.xboxlive.com/avatar/Bonzai Bill/avatarpic-s.png'
        },
        {
          'id': 6,
          'name': 'Martin Smith',
          'gamertag': 'TwinSkate081',
          'role': 'developer',
          'team': 'Chelsea',
          'imgUrl': 'http://avatar.xboxlive.com/avatar/TwinSkate081/avatar-body.png',
          'imgUrlSmall': 'http://avatar.xboxlive.com/avatar/TwinSkate081/avatarpic-s.png'
        }
      ];

      return drivers;
    }

    function getPoints() {
      var points = {};

      points.win = 3;
      points.draw = 1;
      points.loss = 0;

      return points;
    }

    function playersGameResult (playerScore, opponentScore) {
      if (playerScore > opponentScore) {
        return 'win';
      } else if (playerScore === opponentScore) {
        return 'draw';
      }
      return 'loss';
    }

    function getPlayerMatchStats (player, playerTeam, opponentTeam) {
      var points = getPoints();

      player.played += 1;
      player.goals += parseInt(playerTeam.score);
      player.conceded += parseInt(opponentTeam.score);

      if (playersGameResult(playerTeam.score, opponentTeam.score) === 'win') {
        player.wins += 1;
        player.points += points.win;
      } else if (playersGameResult(playerTeam.score, opponentTeam.score) === 'draw') {
        player.draws += 1;
        player.points += points.draw;
      } else {
        player.losses += 1;
        player.points += points.loss;
      }

      return player;
    }

    function calculateStats(matchReports, player) {
      var report;

      for (var matchReport in matchReports) {
        report = matchReports[matchReport];

        if (report.teamA.player.id === player.id) {
          player = getPlayerMatchStats(player, report.teamA, report.teamB);
        } else if (report.teamB.player.id === player.id) {
          player = getPlayerMatchStats(player, report.teamB, report.teamA);
        }
      }

      player.goalDiff = player.goals - player.conceded;

      return player;
    }

    this.getDrivers = function () {
      return getDrivers();
    };

    this.getDriver = function (id) {
      var drivers = getDrivers();

      return drivers[id];
    };

    this.getPlayerWithStats = function (id) {
      var matchReports = seasonReportService.getCurrentSeason(),
          player = this.getDriver(id);

      player.played = 0;
      player.points = 0;
      player.wins = 0;
      player.draws = 0;
      player.losses = 0;
      player.goals = 0;
      player.conceded = 0;
      player.goalDiff = 0;

      matchReports.$on('loaded', function(matchReports) {
        player = calculateStats(matchReports, player);
      });

      return player;
    };
  });