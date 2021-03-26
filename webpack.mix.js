const mix = require("laravel-mix");

mix
  .setPublicPath("./")
  .postCss("assets/css/popup.css", "dist/css")
  .options({ processCssUrls: false });
