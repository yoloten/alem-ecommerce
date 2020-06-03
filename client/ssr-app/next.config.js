const withStyles = require('@webdeb/next-styles')
 
module.exports = withStyles({
  sass: true, // use .scss files
  // modules: true, // style.(m|module).css & style.(m|module).scss for module files
  sassLoaderOptions: {
    sassOptions: {
      includePaths: ["styles"], // @import 'variables'; # loads (src/styles/varialbes.scss), you got it..
    },
  },
})