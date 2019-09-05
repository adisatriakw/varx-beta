$(document).ready(function() {
    $('.card-scroll').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        prevArrow:
        "<button type='button' class='slick-prev'><i class='icon icon-arrow-left' aria-hidden='true'></i></button>",
        nextArrow:
        "<button type='button' class='slick-next'><i class='icon icon-arrow-right' aria-hidden='true'></i></button>",
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            },
        },
        ],
    })
});