var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return /\.test\.js$/.test(file);
});

require.config({
  baseUrl: '/base',
  paths: {
    chai: 'test/lib/chai',
    sinon: 'test/lib/sinon'
  },
  shim: {}
});

require({
  deps: tests,
  callback: window.__karma__.start
});

window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments));}};