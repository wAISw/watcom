;(function () {
    "use strict";

    angular
        .module('kpiTime', [])
        .controller('kpiTimeCtrl', kpiTimeCtrl)
        .directive('kpiTimeDirective', kpiTimeDirective);

    // @ngInject
    function kpiTimeCtrl($http) {
        var s = this;
        s.getInfo = function () {
            return $http({
                method: 'GET',
                url: 'templates/time.html'
            });
        }
    }

    // @ngInject
    function kpiTimeDirective($compile) {
        return {
            restrict: 'A',
            controller: 'kpiTimeCtrl',
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
