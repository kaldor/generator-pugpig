module.exports = function( config ) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ['mocha','requirejs'],

    // list of files / patterns to load in the browser
    files: [
      {pattern: 'test/lib/*.js', included: false},
      {pattern: 'app/bower_components/**/*.js', included: false},
      {pattern: 'app/scripts/**/*.js', included: false},
      {pattern: 'test/unit/**/*.test.js', included: false},
      // test main require module last
      'test/test-main.js'
    ],

    preprocessors: {
      'app/scripts/**/*.js': 'coverage'
    },

    autoWatch: true,

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    reporters: ['progress','coverage'],

    // web server port
    port: 9876,

    // cli runner port
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // Start these browsers, currently available:
    // - Chrome
    // - PhantomJS
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
