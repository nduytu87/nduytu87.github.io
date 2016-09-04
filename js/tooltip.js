(function ($) {

    $.fn.tooltip = function (options) {
        this.append('<div class="tooltipText ' + options.position + ' ">Tooltip</div>');
    };

}(jQuery));