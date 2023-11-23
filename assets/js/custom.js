(function ($) {
  $(".lazyload").lazyload({
    threshold: 200,
    placeholder:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
  });
  let html_dir = false;
  if ($("html").attr("dir") == "rtl") {
    html_dir = true;
  }
  $(".owl-carousel.defult-six").owlCarousel({
    rtl: html_dir,
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: { items: 1, dots: true, loop: true, autoplay: true },
      400: { items: 2, dots: true, loop: true, autoplay: true },
      768: { items: 3, loop: true, autoplay: true },
      992: { items: 4, loop: true, autoplay: true },
      1200: { items: 5, loop: true, autoplay: true },
      1300: { items: 6, nav: false, loop: false, dots: false },
    },
  });
  $(".owl-carousel.defult-three").owlCarousel({
    rtl: html_dir,
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: { items: 1, loop: true, autoplay: true },
      992: { items: 3, nav: false, loop: false, dots: false },
    },
  });
  $(".owl-carousel.defult-two").owlCarousel({
    rtl: html_dir,
    loop: true,
    autoplay: true,
    dots: true,
    autoplayHoverPause: true,
    items: 1,
  });
  $(".owl-carousel.defult-three-cust").owlCarousel({
    rtl: html_dir,
    loop: true,
    autoplay: true,
    dots: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: { items: 1, center: true },
      600: { items: 2, margin: 15 },
    },
  });
  $(".carousel-full-items.owl-carousel").owlCarousel({
    rtl: html_dir,
    center: true,
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 },
    },
  });
  $(".scroll-down").click(function () {
    $("html, body").animate(
      { scrollTop: $(".why-orbex-wrapper").offset().top },
      1000
    );
  });
  function check_header_menu() {
    let wWidth = $(window).width();
    let wHeight = $(window).height();
    if (wWidth > 991) {
      $("#wrapper-navbar").addClass("full-screen");
      $("#wrapper-navbar").removeClass("mobile-screen");
      $(".mobile-height-wrap").removeAttr("style");
    } else {
      $("#wrapper-navbar").addClass("mobile-screen");
      $("#wrapper-navbar").removeClass("full-screen");
      $(".mobile-height-wrap").css("height", wHeight - 21);
    }
  }
  check_header_menu();
  $(window).on("resize", function () {
    check_header_menu();
  });
  $("span.tm-close-menu").click(function () {
    new BSN.Collapse(".navbar-toggler").hide();
  });
  $(document).mouseup(function (e) {
    if (
      $(".mobile-screen div#navbarNavDropdown").attr("aria-expanded") == "true"
    ) {
      var container = $(
        ".mobile-screen div#navbarNavDropdown[aria-expanded='true']"
      );
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        new BSN.Collapse(".navbar-toggler").hide();
      }
    }
  });
  $(".footer-cst-menu-full ul:first-child>li>a").on("click", function (e) {
    e.preventDefault();
    if ($(window).width() < 992) {
      $(this).toggleClass("active");
      $(this).next("ul.sub-menu").slideToggle();
      $(".footer-cst-menu-full ul>li>a")
        .not(this)
        .next("ul.sub-menu")
        .slideUp();
      $(".footer-cst-menu-full ul>li>a").not(this).removeClass("active");
    }
  });
  if ($(".market-int-box")[0]) {
    $(".market-int-box").each(function () {
      let marketName = $(".inner-top-wrapper").attr("data-market-trigg");
      let marketNameBoxParent = $(this);
      let marketNameBoxData = $(marketNameBoxParent).attr("data-market-name");
      if (marketName == marketNameBoxData) {
        $(marketNameBoxParent).addClass("active");
      }
    });
  }
  if ($(".swap-top-holder")[0]) {
    let swap_file = $(".inner-top-wrapper").attr("data-swap-url");
    $(".swap-top-holder a").attr("href", swap_file);
    $(".swap-top-holder a").attr("target", "_blank");
  }
  $(".collapse-inner-tabs a").click(function () {
    let target = $(this).attr("data-target");
    $(this).addClass("active");
    $(".collapse-inner-tabs a").not(this).removeClass("active");
    $('.tabs-content[data-content= "' + target + '"] ').show();
    $('.tabs-content[data-content!= "' + target + '"] ').hide();
  });
  $(".table-number-of-items select").on("change", function () {
    let show_item = $(this).val() - 1;
    $(this)
      .parents(".table-service")
      .next(".table-scroll")
      .find("table.table.orbex-table")
      .find("tbody tr")
      .removeAttr("style");
    $(this)
      .parents(".table-service")
      .next(".table-scroll")
      .find("table.table.orbex-table")
      .find('tbody tr:gt("' + show_item + '")')
      .hide();
  });
  $(".table-find-items input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(this)
      .parents(".table-service")
      .next(".table-scroll")
      .find("table.table.orbex-table")
      .find("tbody tr")
      .filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
  });
  if ($(".table-find-items input")[0]) {
    $(".table-find-items input").each(function () {
      let placeHolder = $(this)
        .parents(".table-service")
        .next(".table-scroll")
        .find("table.table.orbex-table")
        .find("tbody tr:first-child td:first-child")
        .text();
      $(this).attr("placeholder", placeHolder);
    });
  }
  let white_register_height =
    $(".form-register-new-wrapper").innerHeight() + 100;
  $(".register-form-intro").css({ "min-height": white_register_height + "px" });
})(jQuery);
var WPMLLanguageSwitcherDropdownClick = (function () {
  "use strict";
  var e = ".js-wpml-ls-legacy-dropdown-click",
    t = !1,
    i = function (e) {
      var i = this.querySelectorAll(".js-wpml-ls-sub-menu")[0];
      return (
        "visible" === i.style.visibility
          ? ((i.style.visibility = "hidden"),
            document.removeEventListener("click", n))
          : ((i.style.visibility = "visible"),
            document.addEventListener("click", n),
            (t = !0)),
        !1
      );
    },
    n = function () {
      if (!t)
        for (var i = document.querySelectorAll(e), n = 0; n < i.length; n++) {
          i[n].querySelectorAll(".js-wpml-ls-sub-menu")[0].style.visibility =
            "hidden";
        }
      t = !1;
    },
    l = function (e) {
      var t = e || window.event;
      t.preventDefault && t.preventDefault(), (t.returnValue = !1);
    };
  return {
    init: function () {
      for (var t = document.querySelectorAll(e), n = 0; n < t.length; n++)
        t[n].addEventListener("click", i);
      for (
        var r = document.querySelectorAll(e + " a.js-wpml-ls-item-toggle"),
          c = 0;
        c < r.length;
        c++
      )
        r[c].addEventListener("click", l);
    },
  };
})();
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  WPMLLanguageSwitcherDropdownClick.init();
});



// Particles Js 


$.getScript("https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js", function(){
    particlesJS('particles-js',
      {
        "particles": {
          "number": {
            "value": 100,
            "density": {
              "enable": true,
              "value_area": 500
            }
          },
          "color": {
            "value": "#b1c900"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 100
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": false,
          "background_color": "#b61924",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      }
    );

});


AOS.init({
  duration: 1200,
})


