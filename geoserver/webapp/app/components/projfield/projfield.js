angular.module('gsApp.projfield', [
  'ui.bootstrap',
  'gsApp.core.backend'
])
.directive('projField', ['$log', '$timeout', '$modal', 'GeoServer', '_',
  'projectionModel',
    function($log, $timeout, $modal, GeoServer, _, projectionModel) {
      return {
        restrict: 'EA',
        scope: {
          proj: '=',
          defaultProj: '=',
          placeholder: '='
        },
        templateUrl: '/components/projfield/projfield.tpl.html',
        controller: function($scope, $element) {

          projectionModel.fetchProjections().then(function() {
            $scope.projList = projectionModel.getProjections();
          });

          $scope.validateProj = function() {
            GeoServer.proj.get($scope.proj.srs).then(function(result) {
              $scope.valid = result.success;
              if (result.success) {
                $scope.proj.wkt = result.data.wkt;
              }
            });
          };

          $scope.showProjWKT = function() {
            $scope.popup = $modal.open({
              templateUrl: 'projfield.modal.html',
              controller: function($scope, $modalInstance, proj) {
                $scope.wkt = proj.wkt;
                $scope.ok = function() {
                  $modalInstance.close();
                };
              },
              resolve: {
                proj: function() {
                  return $scope.proj;
                },
                placeholder: function() {
                  return $scope.placeholder;
                }
              }
            });
          };

          $scope.ok = function() {

          };

          $scope.$watch('proj.srs', function(newVal) {
            if (newVal != null) {
              if ($scope.t != null) {
                $timeout.cancel($scope.t);
              }
              $scope.t = $timeout(function() {
                $scope.validateProj();
              }, 1000);
            }
          });
        }
      };
    }])
.service('projectionModel', function(GeoServer, _) {
  var _this = this;
  this.projections = [];
  this.defaultProjections = [];

  this.getProjections = function() {
    return this.projections.concat(this.defaultProjections);
  };

  this.getDefaults = function() {
    return this.defaultProjections;
  };

  this.fetchProjections = function() {
    GeoServer.proj.get('EPSG:4326').then(function(result) {
      _this.defaultProjections.push(result.data);
    });
    GeoServer.proj.get('EPSG:3857').then(function(result) {
      _this.defaultProjections.push(result.data);
    });
    // non-default recently used projections
    return GeoServer.proj.recent().then(function(result) {
      _this.projections = _.remove(result.data,
        function(prj) {
          return (prj.srs.toLowerCase() !== 'epsg:4326' &&
            prj.srs.toLowerCase() !== 'epsg:3857');
        });
    });
  };
})
.directive('focusMe', function($timeout) {
  return {
    scope: { trigger: '=focusMe' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === true) {
          $timeout(function() {
            element[0].focus();
            scope.trigger = false;
          });
        }
      });
    }
  };
});
