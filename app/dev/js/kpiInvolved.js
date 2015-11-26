;(function () {
    "use strict";

    angular
        .module('kpiInvolved', [])
        .controller('kpiInvolvedCtrl', kpiInvolvedCtrl)
        .directive('kpiInvolvedDirective', kpiInvolvedDirective);

    // @ngInject
    function kpiInvolvedCtrl($http) {
        var s = this;
        s.getInfo = function () {
            return $http({
                method: 'GET',
                url: 'templates/involved.html'
            });
        }
    }

    // @ngInject
    function kpiInvolvedDirective($compile) {
        return {
            restrict: 'A',
            controller: 'kpiInvolvedCtrl',
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
