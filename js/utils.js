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
        var listPortfolio = $('.grid');
        var listModal = $('.list-modal-port');
        var itemPortfolio = [];
        var modalPortfolio = [];
        
        var items = data.portfolios.map(function (item) {
            itemPortfolio.push('<div class="col-sm-4 portfolio-item ' + item.class + '">\
                <a href="#portfolioModal' + item.class + item.name.toLowerCase() + '" class="portfolio-link" data-toggle="modal">\
                    <div class="caption">\
                        <div class="caption-content">\
                            <i class="fa fa-search-plus fa-3x"></i>\
                        </div>\
                    </div>\
                    <img src="img/portfolio/'+ item.image[0] + '" class="img-responsive" alt="">\
                </a>\
            </div>');

            modalPortfolio.push('<div class="portfolio-modal modal fade" id="portfolioModal' + item.class + item.name.toLowerCase() + '" tabindex="-1" role="dialog" aria-hidden="true">\
                                <div class="modal-content">\
                                    <div class="close-modal" data-dismiss="modal">\
                                        <div class="lr">\
                                            <div class="rl">\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="container">\
                                        <div class="row">\
                                            <div class="col-lg-8 col-lg-offset-2">\
                                                <div class="modal-body">\
                                                    <h2>Project Title</h2>\
                                                    <hr class="star-primary">\
                                                    <img src="img/portfolio/' + item.image[0] + '" class="img-responsive img-centered" alt="">\
                                                    <p>Use this area of the page to describe your project. The icon above is part of a free icon set by <a href="https://sellfy.com/p/8Q9P/jV3VZ/">Flat Icons</a>. On their website, you can download their free set with 16 icons, or you can purchase the entire set with 146 icons for only $12!</p>\
                                                    <ul class="list-inline item-details">\
                                                        <li>Client:\
                                    <strong><a href="http://startbootstrap.com">Start Bootstrap</a>\
                                    </strong>\
                                </li>\
                                <li>Date:\
                                    <strong><a href="http://startbootstrap.com">April 2014</a>\
                                    </strong>\
                                </li>\
                                <li>Service:\
                                    <strong><a href="http://startbootstrap.com">Web Development</a>\
                                    </strong>\
                                </li>\
                            </ul>\
                            <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>\
                        </div>\
                        </div>\
                        </div>\
                        </div>\
                        </div>\
                        </div>')
        });

        //listPortfolio.empty();
       // listModal.empty();
        if (items.length) {
            var content = items.join('');
            var contentModal = modalPortfolio.join('');
            listPortfolio.append(content);
            listModal.append(contentModal);
        }
    });
});