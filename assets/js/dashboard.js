(function ($) {
  let html_dir = false;
  if ($("html").attr("dir") == "rtl") {
    html_dir = true;
  }
  function dashboardNews() {
    var language = $("#home-blog-data").attr("data-lang");
    var url = "";
    $.ajax({ type: "GET", url: url })
      .done(function (response) {
        var items = [];
        for (var item in response) {
          let title = response[item]["title"]["rendered"];
          let guid = response[item]["guid"]["rendered"];
          let image =
            response[item]["_embedded"]["wp:featuredmedia"][0]["source_url"];
          let termName = response[item]["_embedded"]["wp:term"][0][0]["name"];
          let youtubeUrl = response[item]["acf"]["youtube_url"];
          let itemFree = response[item]["acf"]["is_free"];
          let isVideo = "";
          let isFree = "";
          if (image == undefined) {
            image = "/assets/img/Asset-2.png";
          }
          if (youtubeUrl != "") {
            isVideo = "video";
          }
          if (itemFree != false) {
            isFree = "notFree";
          }
          items.push(
            "<div class='item'><div class='blog-data-box box-deafult-style position-relative'><div class='blog-img-attr " +
              isVideo +
              " " +
              isFree +
              "'><img src='" +
              image +
              "' loading='lazy' alt='" +
              title +
              "'/></div><h5 class='text-center text-primary p-3 mb-4'>" +
              termName +
              "</h5><a target='_blank' title='" +
              title +
              "' href=" +
              guid +
              " class='stretched-link'></a></div></div>"
          );
        }
        items = items.join("");
        var finalData =
          "<div class='blog-carousel owl-carousel owl-theme'>" +
          items +
          "</div>";
        $(".blog-data-here").append(finalData);
        $(".blog-carousel.owl-carousel").owlCarousel({
          rtl: html_dir,
          center: true,
          loop: true,
          margin: 20,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: true,
          responsive: {
            0: { items: 1 },
            400: { items: 2 },
            768: { items: 3 },
            992: { items: 4 },
          },
        });
        $(".blog-data-here").removeClass("loading");
      })
      .fail(function () {
        console.error("Error: News API No Response");
      });
  }
  function dashboardCurrency() {
    var currencyTab = "";
    var currencyTabs = [];
    var currencyItem = "";
    var currencyItems = [];
    const accountUrl = $("#currency-response").attr("account-url");
    const btnBuy = $("#currency-response").attr("btn-buy");
    const btnSell = $("#currency-response").attr("btn-sell");
    $.ajax({
      type: "GET",
      url: "https://www.leapardsmarket.com/en/currency-response?_=1633519199106",
    })
      .done(function (response) {
        Object.entries(response).forEach(([key, val], index) => {
          currencyTab =
            index == 0
              ? '<div class="col market-top-btn-hold fs-21 active" data-cur-key="' +
                key.replace(/ /g, "_") +
                '">' +
                key +
                "</div>"
              : '<div class="col market-top-btn-hold fs-21" data-cur-key="' +
                key.replace(/ /g, "_") +
                '">' +
                key +
                "</div>";
          currencyTabs.push(currencyTab);
          Object.entries(val).forEach(([key2, item]) => {
            currencyItem =
              '<tr style="display: none;" class="currency-item" data-cur-item="' +
              item.Category.replace(/ /g, "_") +
              '">\n' +
              "<td>" +
              item.Symbol +
              "</td>\n" +
              "<td>" +
              item.Bid +
              "</td>\n" +
              "<td>" +
              item.Ask +
              "</td>\n" +
              '<td><a href="' +
              accountUrl +
              '" class="txt-dec-none leapards-btn-fill empty">' +
              btnSell +
              "</a></td>\n" +
              '<td><a href="' +
              accountUrl +
              '" class="txt-dec-none leapards-btn-fill empty buy">' +
              btnBuy +
              "</a></td>\n" +
              "</tr>";
            currencyItems.push(currencyItem);
          });
        });
        $("#currency-tabs-response").append(currencyTabs);
        $("#currency-response table tbody").append(currencyItems);
        $(".market-top-btn-hold").click(function () {
          let target = $(this).attr("data-cur-key");
          $(this).addClass("active");
          $(".market-top-btn-hold").not(this).removeClass("active");
          $(
            '#currency-response table tbody tr[data-cur-item= "' +
              target +
              '"] '
          ).show();
          $(
            '#currency-response table tbody tr[data-cur-item!= "' +
              target +
              '"] '
          ).hide();
        });
        $(".market-top-btn-hold.active").trigger("click");
        $("#currency-response").removeClass("loading");
      })
      .fail(function () {
        console.error("Error: Currency API No Response");
      });
  }
  let slider_count = $(".carousel-item").length;
  if ($(".carouselHome")[0]) {
    let slider_count_final;
    if (slider_count > 0 && slider_count < 10) {
      slider_count_final = "0" + slider_count;
    }
    $(".totla-caro-item").html(slider_count_final);
    document
      .querySelector(".carouselHome")
      .addEventListener("slide.bs.carousel", (event) => {
        let activ_item = event.relatedTarget.getAttribute("data-num");
        let activ_item_final;
        if (activ_item > 0 && activ_item < 10) {
          activ_item_final = "0" + activ_item;
        }
        $(".activ-item").html(activ_item_final);
      });
  }
  $(document).ready(function () {
    $.ajaxSetup({ cache: false });
    setTimeout(function () {
      if (slider_count > 1) {
        new BSN.Carousel("#myCarousel").cycle();
        new BSN.Carousel("#myCarousel").slideTo(1);
      }
    }, 3000);
    let lastScrollTop = 0;
    $(window).on("scroll", function () {
      st = $(this).scrollTop();
      if ($(window).scrollTop()) {
        if (st < lastScrollTop) {
          $("body>header").addClass("fixed-head");
          $("body>header").addClass("hideHead");
        } else {
          $("body>header").removeClass("hideHead");
          $("body>header").removeClass("fixed-head");
        }
      } else {
        $("body>header").removeClass("hideHead");
        $("body>header").removeClass("fixed-head");
      }
      lastScrollTop = st;
    });
  });
})(jQuery);
