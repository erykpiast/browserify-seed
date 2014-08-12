module.exports = (function() {

    var Example = require('./mods/example');


    var example = new Example();

    example.on('done', function(result) {
    	console.log(result);
    });

    example.doSomething(1000);

})();