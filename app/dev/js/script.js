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
    function mainDirective($compile) {
        return {
            restrict: 'A',
            controller: 'mainCtrl',
            link: function (scope, elem, attr, ctrl) {
                var form = $("div.form_wrap"),
                    editKpi,
                    form_back = $('div.form_back');
                elem.on("dblclick", ".kpi", function () {
                    editKpi = $(this);
                    if(editKpi.hasClass('disabled')){
                        return false;
                    }
                    form.show();
                    var kpiName = editKpi.find('.kpi_item').html(),
                        kpi_val = editKpi.find('.kpi_cot__val').html();
                    form.find("input[name='kpi_name']").val(kpiName);
                    form.find("input[name='kpi_val']").val(kpi_val);
                    form_back.show();
                });
                form_back.click(function(){
                    form_back.hide();
                    form.hide();
                });
                form.on('blur', "input", function () {
                    if($(this)[0].name=='kpi_name'){
                        editKpi.find('.kpi_item').html($(this).val());
                    }else{
                        editKpi.find('.kpi_cot__val').html($(this).val());
                    }
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
