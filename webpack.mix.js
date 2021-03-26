const mix = require("laravel-mix");

mix
  .setPublicPath("./")
  .postCss("assets/css/popup.css", "dist/css")
  .js("assets/js/background.js", "dist/js")
  .options({ processCssUrls: false });
