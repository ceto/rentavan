const handlebars = require('handlebars');
module.exports = function(icon) {
    var iconaddr=(icon=='')?'dot-empty':icon;
    var svg = '<svg><use xlink:href="/assets/img/svg-icons.svg#icon-'+ iconaddr +'"></use></svg>';
    return new handlebars.SafeString(svg);
}