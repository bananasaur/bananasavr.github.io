import './index.pug'
import './index.less'

$(document).ready(function() {
  let $navLinks = $('nav a.nav-link')
  let scrollOptions = []
  let windowHeight;

  function onScroll() {
    let scrollPos = $(window).scrollTop()
    let navShowPos = scrollOptions[1].min / 1.5

    if (scrollPos >= navShowPos) {
      $('nav').removeClass('hidden')
    } else {
      $('nav').addClass('hidden')
    }

    for (let i = 0; i < scrollOptions.length; i++) {
      if (scrollOptions[i].min - scrollOptions[i].offset <= scrollPos
        && scrollOptions[i].max - scrollOptions[i].offset > scrollPos) {
        scrollOptions[i].target.addClass('active')
      } else {
        scrollOptions[i].target.removeClass('active')
      }
    }
  }

  function getScrollPos() {
    for (let i = 0; i < $navLinks.length; i++) {
      let $currLink = $($navLinks[i])
      let $refElement = $($currLink.attr('href'))

      scrollOptions[i] = {
        target: $currLink.parent(),
        offset: $refElement.height() / 2,
        min: $refElement.position().top,
        max: $refElement.position().top + $refElement.height()
      }
    }
  }

  function onResize() {
    sizeToWindow('#header')
    getScrollPos()
  }

  function sizeToWindow(selector) {
    windowHeight = $(window).height()
    $(selector).css('height', windowHeight)
  }

  function init() {
    onResize()
  }

  $('#menu-icon').click(function() {
    $('.header-social-container').toggleClass('active')
    $(this).html('menu')

    if ($('.header-social-container').hasClass('active')) $(this).html('close')
  })

  $('#arrow-icon').click(function() {
    $(window).scrollTop(windowHeight)
  })

  $(document).scroll(onScroll)
  $(window).resize(onResize)
  init()
})
