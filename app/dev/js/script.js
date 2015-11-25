;(function () {
    "use strict";

    angular
        .module('main', [
            'kpiIndex',
            'kpiInvolved',
            'kpiLoyal',
            'kpiNew',
            'kpiPeople',
            'kpiTime'
        ])
        .controller('mainCtrl', mainCtrl)
        .directive('mainDirective', mainDirective);

    // @ngInject
    function mainCtrl() {
        var s = this;
    }

    // @ngInject
    function mainDirective() {
        return {
            restrict: 'A',
            controller: 'mainCtrl',
            link: function (scope, elem, attr, ctrl) {
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
