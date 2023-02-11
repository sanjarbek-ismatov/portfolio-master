const { exec } = require("child_process");
require("colors");
const config = require("./esbuild.config.js");
function esbuildInstaller() {
  exec("npx esbuild --version", (err, stdout, stdeer) => {
    if (err) {
      console.log("esbuild not found!".underline.red);
      console.log("esbuild installing...".yellow);
      exec("npm i -g esbuild", (err, stdout, stdeer) => {
        if (err) {
          console.log("installation failed with:".bgRed.white);
          console.log(err);
        }
        if (stdeer) {
          console.log("esbuild installed!".green);
        }
      });
    }
    if (stdeer) {
      return true;
    } else {
      process.exit(1);
    }
  });
}
esbuildInstaller();
exec(
  `esbuild ${config.input} ${config.bundle ? "--bundle" : ""} ${
    config.minimized ? "--minify" : ""
  } --packages=${config.packages} --platform=${config.platform} --outfile=${
    config.output
  }`,
  (err, stdout, stdeer) => {
    if (err) {
      console.log("Something went wrong".bgRed.white);
    }
    console.log("Compiling...".yellow);
    if (stdeer) {
      console.log(("Build finished! check: " + config.output).bgGreen.white);
    }
    process.exit(0);
  }
);
