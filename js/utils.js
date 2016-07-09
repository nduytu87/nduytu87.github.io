// external js: isotope.pkgd.js


// init Isotope
var $grid = $('.grid').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
   });

// filter functions
var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function () {
        var number = $(this).find('.number').text();
        return parseInt(number, 10) > 50;
    },
    // show if name ends with -ium
    ium: function () {
        var name = $(this).find('.name').text();
        return name.match(/ium$/);
    }
};

// bind filter button click
$('#filters').on('click', 'a', function () {
    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });
});


// change is-checked class on buttons
$('.button-group').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'a', function () {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
});

$(document).ready(function () {

    $.getJSON('data/portfolio.json', function (data) {
        console.log(data +'test');
        var showData = $('.grid');
        
        var items = data.portfolios.map(function (item) {
            return '<div class="col-sm-4 portfolio-item'+item.class+'">\
                <a href="#portfolioModal' + item.class + item.name.toLowerCase() + '" class="portfolio-link" data-toggle="modal">\
                    <div class="caption">\
                        <div class="caption-content">\
                            <i class="fa fa-search-plus fa-3x"></i>\
                        </div>\
                    </div>\
                    <img src="img/portfolio/'+item.image[0]+'" class="img-responsive" alt="">\
                </a>\
            </div>'
        });

        showData.empty();

        if (items.length) {
            var content = items.join('');
            showData.append(content);
        }
    });
});