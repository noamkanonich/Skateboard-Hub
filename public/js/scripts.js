(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
      this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 72,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 75,
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Magnific popup calls
  $("#gallery").magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Loading image #%curr%...",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1],
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    },
  });

  // add item to cart
  var cart_list = [];
  var total_money = 0;
  $(".product-item").click(function () {
    var product_name = this.id;

    if (cart_list.includes(product_name)) {
      return;
    } else {
      cart_list.push(product_name);
      total_money = total_money + parseInt(price);
    }
  });

  var i = 1;
  var list = document.getElementById("product-list");

  // Show cart list
  $(".show-cart").click(function () {
    cart_list.forEach((product) => {
      list.innerHTML += "<li>" + product + i++ + "</li>";
    });
  });

  // ADDING TO CART
  var i = 1;
  var list = document.getElementById("product-list");
  var add = document.getElementById("addProduct");
  var remove = document.getElementById("removeProduct");
  var product = document.getElementById("");

  add.addEventListener("click", function () {
    var itemsByTagName = document.getElementsByTagName("li");
    list.innerHTML += "<li>item " + i++ + "</li>";
  });

  remove.removeEventListener("click", function () {
    var itemsByTagName = document.getElementsByTagName("li");
    list.innerHTML += "<p></p>";
  });
})(jQuery);

var clicked = false;
$(".checkall").on("click", function () {
  $(".checkhour").prop("checked", !clicked);
  clicked = !clicked;
  this.innerHTML = clicked ? "Deselect" : "Select";
});

var hide = false;
function toggleProducts() {
  var x = document.getElementById("more");
  if (x.style.display === "none") {
    x.style.display = "block";
    x.addClass += "row";
    hide = false;
    document.getElementById("showmore").innerHTML = "Show Less";
  } else {
    x.style.display = "none";
    hide = true;
    document.getElementById("showmore").innerHTML = "Show More";
  }
}

// check if there is any checked input in form
function check() {
  if ($("#cart-form input:checkbox:checked").length > 0) {
    alert("GOOD");
    document.getElementById("cart-form").submit();
  } else {
    alert("");
  }
}
