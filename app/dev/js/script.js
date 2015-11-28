;(function () {
    "use strict";

    angular
        .module('main', [])
        .service('mainService', mainService)
        .controller('mainCtrl', mainCtrl)
        .controller('peopleCtrl', peopleCtrl)
        .controller('timeCtrl', timeCtrl)
        .controller('loyalCtrl', loyalCtrl)
        .controller('involvedCtrl', involvedCtrl)
        .controller('indexCtrl', indexCtrl)
        .directive('mainDirective', mainDirective);


    // @ngInject
    function mainService($http, $rootScope) {
        var typeChangesKpi = '';
        $rootScope.$on('changeKpiType', function (event, type) {
            typeChangesKpi = type;
            $rootScope.$broadcast('changeKpi', typeChangesKpi);
        });
        this.getKpi = function (kpiName) {
            return $http({
                method: 'GET',
                url: 'db/' + kpiName + '.json'
            });
        };
        this.changeKpi = function (arMsg) {
            if (arMsg != undefined) {
                this.arMsg = arMsg;
                this.arMsg.type = typeChangesKpi;
                this.setKpi(arMsg.type);
            }
        };
        this.setKpi = function () {
            $rootScope.$broadcast(typeChangesKpi);
        };
    }

    // @ngInject
    function mainCtrl(mainService, $scope) {
        var s = this;
        var resetModel = {};
        s.setKpiData = function (arMsg) {
            mainService.changeKpi(arMsg);
            $scope.kpiModel = angular.copy(resetModel);
        };
        s.setTypeOfKpi = function (type) {
            $scope.$emit('changeKpiType', type);
        }
    }

    // @ngInject
    function peopleCtrl($scope, $rootScope, mainService) {
        var s = this;
        s.type = 'people';
        $scope.$on(s.type, function () {
            if (mainService.arMsg.name)
                s.data.name = mainService.arMsg.name;
            if (mainService.arMsg.val)
                s.data.val = mainService.arMsg.val;
        });
        $scope.$on('changeKpi', function (event, data) {
            if (data == s.type)
                $rootScope.$apply($rootScope.changeKpiData = {
                    name: s.data.name,
                    val: s.data.val
                });
        });
        mainService.getKpi('people')
            .then(function (response) {
                s.data = response.data;
            }, function (response) {
                alert("что то пошло не так!");
            });
    }

    // @ngInject
    function timeCtrl($scope, $rootScope, mainService) {
        var s = this;
        s.type = 'time';
        $scope.$on(s.type, function () {
            if (mainService.arMsg.name)
                s.data.name = mainService.arMsg.name;
            if (mainService.arMsg.val)
                s.data.val = mainService.arMsg.val;
        });
        $scope.$on('changeKpi', function (event, data) {
            if (data == s.type)
                $rootScope.$apply($rootScope.changeKpiData = {
                    name: s.data.name,
                    val: s.data.val
                });
        });
        mainService.getKpi('time')
            .then(function (response) {
                s.data = response.data;
            }, function (response) {
                alert("что то пошло не так!");
            });
    }

    // @ngInject
    function loyalCtrl($scope, $rootScope, mainService) {
        var s = this;
        s.type = 'loyal';
        $scope.$on(s.type, function () {
            if (mainService.arMsg.name)
                s.data.name = mainService.arMsg.name;
            if (mainService.arMsg.val)
                s.data.val = mainService.arMsg.val;
        });
        $scope.$on('changeKpi', function (event, data) {
            if (data == s.type)
                $rootScope.$apply($rootScope.changeKpiData = {
                    name: s.data.name,
                    val: s.data.val
                });
        });
        mainService.getKpi('loyal')
            .then(function (response) {
                s.data = response.data;
            }, function (response) {
                alert("что то пошло не так!");
            });
    }

    // @ngInject
    function involvedCtrl($scope, $rootScope, mainService) {
        var s = this;
        s.type = 'involved';
        $scope.$on(s.type, function () {
            if (mainService.arMsg.name)
                s.data.name = mainService.arMsg.name;
            if (mainService.arMsg.val)
                s.data.val = mainService.arMsg.val;
        });
        $scope.$on('changeKpi', function (event, data) {
            if (data == s.type)
                $rootScope.$apply($rootScope.changeKpiData = {
                    name: s.data.name,
                    val: s.data.val
                });
        });
        mainService.getKpi('involved')
            .then(function (response) {
                s.data = response.data;
            }, function (response) {
                alert("что то пошло не так!");
            });
    }

    // @ngInject
    function indexCtrl($scope, $rootScope, mainService) {
        var s = this;
        s.type = 'index';
        $scope.$on(s.type, function () {
            if (mainService.arMsg.name)
                s.data.name = mainService.arMsg.name;
            if (mainService.arMsg.val)
                s.data.val = mainService.arMsg.val;
        });
        $scope.$on('changeKpi', function (event, data) {
            if (data == s.type)
                $rootScope.$apply($rootScope.changeKpiData = {
                    name: s.data.name,
                    val: s.data.val
                });
        });


        mainService.getKpi('index')
            .then(function (response) {
                s.data = response.data;
            }, function (response) {
                alert("что то пошло не так!");
            });
    }

    // @ngInject
    function mainDirective($compile) {
        return {
            restrict: 'A',
            controller: 'mainCtrl',
            link: function (scope, elem, attr, ctrl) {
                var template = '<div class="kpi {{ctrl.data.disabled?\'disabled\':\'\'}}" ng-controller="#ctrlName# as ctrl" data-type="{{ctrl.data.type}}">' +
                        '<div class="kpi_item">{{ctrl.data.name}}</div>' +
                        '<div class="kpi_cot"><span class="kpi_cot__val">{{ctrl.data.val}} {{ctrl.data.unit}}</span></div>' +
                        '<div class="kpi_din"><span class="kpi_din__arrow top">&#8593;</span><span class="kpi_din__num">00.00</span></div>' +
                        '</div>',
                    firstList = ['people', 'time', 'loyal', 'involved', 'index'],
                    secondList = ['people', 'time', 'loyal'];
                setTimeout(function () {
                    for (var i in firstList) {
                        $compile($('.kpi_container.first').append(template.replace(/#ctrlName#/, firstList[i] + 'Ctrl')))(scope);
                    }
                    for (var i in secondList) {
                        $compile($('.kpi_container.second').append(template.replace(/#ctrlName#/, firstList[i] + 'Ctrl')))(scope);
                    }
                }, 5000);

                var form = $("div.form_wrap"),
                    editKpi,
                    form_back = $('div.form_back');
                elem.on("dblclick", ".kpi", function () {
                    editKpi = $(this);
                    if (editKpi.hasClass('disabled')) {
                        return false;
                    }
                    form.show();
                    // запомним тип изменяемого kpi
                    var kpiType = editKpi.data('type');
                    ctrl.setTypeOfKpi(kpiType);
                    $compile(form);
                    form_back.show();
                });
                form_back.on("click", function () {
                    form.hide();
                    form_back.hide();
                });
                elem.on("click", ".kpi", function () {
                    var el = $(this);
                    if (el.hasClass('disabled')) {
                        return false;
                    } else {
                        el.toggleClass("active");
                        var type = el.data("type");
                        var linkEl = el.closest(".kpi_container")
                            .siblings(".kpi_container")
                            .find(".kpi[data-type='" + type + "']");

                        if (el.hasClass("active")) {
                            linkEl.addClass("active");
                        } else {
                            linkEl.removeClass("active");
                        }
                    }
                });
            }
        };
    }


})();
