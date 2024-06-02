const gulp = require("gulp");
const HubRegistry = require("gulp-hub");
var FwdRef = require("undertaker-forward-reference");

gulp.registry(FwdRef());

const cheerio = require("cheerio");
const rimraf = require("rimraf");
const fs = require("fs");
const { exec } = require("child_process");

gulp.task(
  "default",
  gulp.series("build", "dist", function (done) {
    console.log("completed");
    done();
  })
);

gulp.task("build", function (cb) {
  exec("npm run build", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task("dist", function (cb) {
  //remove old dist files from laravel public folder
  // gulp.src('./../ecombackend/public/client', {read: false}).pipe(clean({force: true}));
  rimraf.sync("./../ecombackend/public/client");

  console.log("here");

  //copy dist folder into laravel public folder
  gulp
    .src([
      "./dist/ecomfrontend/**/*",
      "!./dist/ecomfrontend/index.html",
      "!./dist/ecomfrontend/stats.json",
    ])
    .pipe(gulp.dest("./../ecombackend/public/client"));

  const $ = cheerio.load(
    fs.readFileSync("./dist/ecomfrontend/index.html", "utf8")
  );

  //get script tags that need to be injected  into main laravel view
  const scripts = $("script")
    .map(function (i, el) {
      const src = ["runtime", "polyfills", "scripts", "main"];
      if (src.some((e) => el.attribs.src.includes(e)))
        el.attribs.src = `client/${el.attribs.src}`;
      return $("<div>").append($(el)).html();
    })
    .toArray();

  //get css tags that need to be injected into main laravel view
  const styles = $("link")
    .map(function (i, el) {
      if ($(el).attr("href").indexOf("styles.") > -1)
        el.attribs.href = `client/${el.attribs.href}`;
      if (
        ($(el).attr("rel").includes("stylesheet") &&
          !$(el).attr("href").includes("https") && !($(el).attr("href").indexOf("styles.") > -1)) ||
          $(el).attr("rel") == "icon" 
      )
        el.attribs.href = `client${el.attribs.href.slice(1)}`;
      return $("<div>").append($(el)).html();
    })
    .toArray();

  //get styles tags that need to be injected into main laravel view
  const customStyle = $("style")
    .map(function (i, el) {
      // return $('div').append($(el)).html();
      return $(el).clone().appendTo("div");
    })
    .toArray();

  //get noscript tags that need to be injected into main laravel view
  const noScript = $("noscript")
    .map(function (i, el) {
      return $(el).clone().appendTo("div");
    })
    .toArray();

  //js scripts replace regex
  const jsSearch =
    /{{--angular scripts begin--}}[\s\S]*{{--angular scripts end--}}/;
  const jsReplaceStr =
    "{{--angular scripts begin--}}" +
    "\n\t\t" +
    scripts.join("\n\t\t") +
    "\n\t" +
    noScript.join("\n\t\t") +
    "\n\t{{--angular scripts end--}}";

  //css styles replace regex
  const cssSearch =
    /{{--angular styles begin--}}[\s\S]*{{--angular styles end--}}/;
  const cssReplaceStr =
    "{{--angular styles begin--}}" +
    "\n\t\t" +
    styles.join("\n\t\t") +
    "\n\t{{--angular styles end--}}";

  const customStyleSearch =
    /{{--angular custom style begin--}}[\s\S]*{{--angular custom style end--}}/;
  const customStyleReplaceStr =
    "{{--angular custom style begin--}}" +
    "\n\t\t" +
    customStyle.join("\n\t\t") +
    "\n\t{{--angular custom style end--}}";

  const laravelViewPath = "./../ecombackend/resources/views/welcome.blade.php";

  //replace app stylesheet links and js script tags with new ones
  let content = fs.readFileSync(laravelViewPath, "utf8");
  content = content
    .replace(jsSearch, jsReplaceStr)
    .replace(cssSearch, cssReplaceStr)
    .replace(customStyleSearch, customStyleReplaceStr);

  fs.writeFileSync(laravelViewPath, content, "utf8");
  cb();
});

gulp.task("watch", function () {
  gulp.watch("src/**", gulp.series("default"));
});
