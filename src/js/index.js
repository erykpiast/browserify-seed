module.exports = (function() {

    var Example = require('./lib/example');


    var example = new Example();

    example.on('done', function(result) {
        (alert || console.log)(result);
    });

    function run() {
        example.doSomething(1000);
    }

    return {
        run: run
    };

})();