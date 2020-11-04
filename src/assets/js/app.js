import $ from 'jquery';
import 'what-input';

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