import $ from 'jquery';
import 'what-input';
import Headroom from "headroom.js";

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

var mySiteHeader = document.querySelector('.siteheader');
if (mySiteHeader) {
    var siteheaderheadroom = new Headroom(mySiteHeader, {
        offset : 76,
        // tolerance : {
        //     up : 76,
        //     down : 0
        // },
        classes : {
            // when element is initialised
            initial : "headroom",
            // when scrolling up
            pinned : "siteheader--pinned",
            // when scrolling down
            unpinned : "siteheader--unpinned",
            // when above offset
            top : "siteheader--top",
            // when below offset
            notTop : "siteheader--not-top",
            // when at bottom of scoll area
            bottom : "siteheader--bottom",
            // when not at bottom of scroll area
            notBottom : "siteheader--not-bottom",
            // when frozen method has been called
            frozen: "siteheader--frozen"
        },
    });
    siteheaderheadroom.init();
}

var mySitemheader = document.querySelector('.sitemheader');
if (mySitemheader) {
    var sitemheaderheadroom = new Headroom(mySitemheader, {
        offset : 56,
        classes : {
            initial : "headroom",
            pinned : "sitemheader--pinned",
            unpinned : "sitemheader--unpinned",
            top : "sitemheader--top",
            notTop : "sitemheader--not-top",
            bottom : "sitemheader--bottom",
            notBottom : "sitemheader--not-bottom",
            frozen: "sitemheader--frozen"
        },
    });
    sitemheaderheadroom.init();
}


$('.js-mobilenavpanelopen').on('click', function(e) {
    e.preventDefault();
    $('body').addClass('is-frozen');
    $('body').addClass('mobilenavpanel-is-open');
});

$('.js-allopen').on('click', function(e) {
    e.preventDefault();
    $('body').addClass('is-frozen');
    $('body').addClass('mobilenavpanel-is-open');
});

$('.js-mobilenavpanelclose').on('click', function(e) {
    e.preventDefault();
    $('body').removeClass('is-frozen');
    $('body').removeClass('mobilenavpanel-is-open');
});

$('.js-allclose').on('click', function(e) {
    e.preventDefault();
    $('body').removeClass('is-frozen');
    $('body').removeClass('mobilenavpanel-is-open');
});