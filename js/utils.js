
var initIsotope = function () {
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
            $buttonGroup.find('.current').removeClass('current');
            $(this).addClass('current');
        });
    });
};

$(document).ready(function () {

    $.getJSON('data/portfolio.json', function (data) {
        var listPortfolio = $('.grid');
        var listModal = $('.list-modal-port');
        var itemPortfolio = [];
        var modalPortfolio = [];

        data.portfolios.map(function (item) {
            itemPortfolio.push('<div class="col-sm-4 portfolio-item ' + item.class + '">\
                <a href="#portfolioModal' + item.class + item.id.toLowerCase() + '" class="portfolio-link" data-toggle="modal">\
                    <div class="caption">\
                        <div class="caption-content">\
                            <i class="fa fa-search-plus fa-3x"></i>\
                        </div>\
                    </div>\
                    <img src="img/portfolio/' + item.image[0] + '" class="img-responsive portfolio-crop" alt="">\
                </a>\
            </div>');
            //Carousel for model
            var carouselContent = item.image.map(function (img) {
                return '<div> <img src="img/portfolio/' + img + '" class="img-centered" alt=""> </div>';
            });
            modalPortfolio.push('<div class="portfolio-modal modal fade" id="portfolioModal' + item.class + item.id.toLowerCase() + '" tabindex="-1" role="dialog" aria-hidden="true">\
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
                                                    <div class="content-head center">\
						                                                <h3 class="center_divider">\
							                                                <em>\
							                                                <span class="head-tngl-left1"></span>\
							                                                <span class="head-tngl-left2"></span>\
							                                                <span class="head-tngl-left3"></span>\
                                                            Our Happy <span class="highlight-color">Clients</span>\
                                                            <span class="head-tngl-right1"></span>\
                                                            <span class="head-tngl-right2"></span>\
                                                            <span class="head-tngl-right3"></span>\
                                                            </em>\
                                                        </h3>\
                                                        <div class="owl-buttons">\
                                                            <div class="owl-prev">prev</div>\
                                                            <div class="owl-next">next</div>\
                                                        </div>\
                                                    </div>\
                                                    <div class="owl-carousel owl-theme">\
                                                        '+carouselContent+'\
                                                    </div>\
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

        if (itemPortfolio.length) {
            var content = itemPortfolio.join('');
            var contentModal = modalPortfolio.join('');
            listPortfolio.append(content);
            listModal.append(contentModal);
            $('.grid').isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });
            initIsotope();
            $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    1000: {
                        items: 1
                    }
                }
            });
            // Custom Navigation Events
            $(".next").click(function () {
                owl.trigger('owl.owl-next');
            })
            $(".prev").click(function () {
                owl.trigger('owl.owl-prev');
            })
        }
    });

   

});

