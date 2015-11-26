;(function () {
    "use strict";

    angular
        .module('kpiLoyal', [])
        .controller('kpiLoyalCtrl', kpiLoyalCtrl)
        .directive('kpiLoyalDirective', kpiLoyalDirective);

    // @ngInject
    function kpiLoyalCtrl($http) {
        var s = this;
        s.getInfo = function () {
            return $http({
                method: 'GET',
                url: 'templates/loyal.html'
            });
        }
    }

    // @ngInject
    function kpiLoyalDirective($compile) {
        return {
            restrict: 'A',
            controller: 'kpiLoyalCtrl',
            link: function (scope, elem, attr, ctrl) {
                setTimeout(function () {
                    ctrl
                        .getInfo()
                        .then(function successCallback(response) {
                            $compile(elem.append(response.data));
                        }, function errorCallback(response) {
                            alert("что то пошло не так!");
                        });
                }, 5000);
            }
        };
    }

})();
