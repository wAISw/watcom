;(function () {
    "use strict";

    angular
        .module('kpiNew', [ ])
        .controller('kpiNewCtrl', kpiNewCtrl)
        .directive('kpiNewDirective', kpiNewDirective);

    // @ngInject
    function kpiNewCtrl($http) {
        var s = this;
        s.getInfo = function () {
            return $http({
                method: 'GET',
                url: 'templates/new.html'
            });
        }
    }

    // @ngInject
    function kpiNewDirective($compile) {
        return {
            restrict: 'A',
            controller: 'kpiNewCtrl',
            link: function (scope, elem, attr, ctrl) {
                setTimeout(function(){
                    ctrl
                        .getInfo()
                    .then(function successCallback(response) {
                        $compile(elem.append(response.data));
                    }, function errorCallback(response) {
                        alert("что то пошло не так!");
                    });
                }, 1000);
            }
        };
    }

})();
