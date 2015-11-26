;(function () {
    "use strict";

    angular
        .module('kpiIndex', [])
        .controller('kpiIndexCtrl', kpiIndexCtrl)
        .directive('kpiIndexDirective', kpiIndexDirective);

    // @ngInject
    function kpiIndexCtrl($http) {
        var s = this;
        s.getInfo = function () {
            return $http({
                method: 'GET',
                url: 'templates/index.html'
            });
        }
    }

    // @ngInject
    function kpiIndexDirective($compile) {
        return {
            restrict: 'A',
            controller: 'kpiIndexCtrl',
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
