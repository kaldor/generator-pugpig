/*global casper*/
(function() {

  'use strict';

  var root = 'http://localhost:9000';

  casper.start( root );

  casper.run(function() {
    this.test.renderResults( true );
    this.exit();
  });

}());