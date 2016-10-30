import './index.pug'
import './index.less'
import _ from 'lodash'
import ResumeSearch from './ResumeSearch.js'
import resume from './resume.js'

$(document).ready(function() {
  let resumeOptions = {
    inputSelector: '#resume-search-bar',
    outputSelector: '#resume-search-results'
  }
  let Resume = new ResumeSearch(resumeOptions, resume)

  let $navigationLinks = $('nav a.nav-link'),
    $smoothScrollLinks = $('a.nav-link'),
    scrollOptions = [],
    windowHeight

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
    for (let i = 0; i < $navigationLinks.length; i++) {
      let $currLink = $($navigationLinks[i])
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

  $smoothScrollLinks.click(function(e) {
    e.preventDefault()
    $('document').off('scroll')

    let $link = $(this),
      target = this.hash,
      $target = $($link.attr('href'))

    $('html body').stop().animate({
      'scrollTop': $target.offset().top
    }, {
      duration: 700,
      specialEasing: {
        scrollTop: 'swing'
      },
      complete: function() {
        window.location.hash = target
        $(document).on('scroll', onScroll)
      }
    })
  })

  $('#view-all').click(function(e) {
    Resume.viewAllClicked($(this))
  })

  $(document).scroll(onScroll)
  $(window).resize(onResize)
  init()
})
