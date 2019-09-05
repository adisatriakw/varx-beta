$(document).ready(function(){
    $(".navbar-toggler, .menu-overlay").on("click", function(){
        $(".mobile-menu, .menu-overlay").toggleClass("open");
    })
});