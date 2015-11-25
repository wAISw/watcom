;(function () {
    "use strict";

    angular
        .module('kpiPeople', [])
        .controller('kpiPeopleCtrl', kpiPeopleCtrl)
        .directive('kpiPeopleDirective', kpiPeopleDirective);

    // @ngInject
    function kpiPeopleCtrl($http) {
        var s = this;
        s.getInfo = function () {
            return $http({
                method: 'GET',
                url: 'templates/people.html'
            });
        }
    }

    // @ngInject
    function kpiPeopleDirective($compile) {
        return {
            restrict: 'A',
            controller: 'kpiPeopleCtrl',
            link: function (scope, elem, attr, ctrl) {
                setTimeout(function () {
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
