/* --------------------------------------------------------
is-active
-------------------------------------------------------- */
$(window).scroll(function () {
  $(".js-line, .fadein").each(function () {
    var position = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll > position - windowHeight) {
      $(this).addClass("is-active");
    }
  });
});

/*
function fadeAnime() {
  $('.c-fade_trigger').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('c-fade');
    } else {
      $(this).removeClass('c-fade');
    }
  });
}

$(window).scroll(function () {
  fadeAnime();
});*/

function fadeAnime() {
  $(".c-fade_trigger").each(function () {
    var elemPos = $(this).offset().top - 100;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("c-fade");
    }
  });
}

$(window).scroll(function () {
  fadeAnime();
});

$(window).on("load", function () {
  fadeAnime();
});
