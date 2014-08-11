if (!Function.prototype.bind) {
    // @source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1);
        var fToBind = this;
        var NOP = function () {};
        var fBound = function () {
            return fToBind.apply(this instanceof NOP && (oThis ?
                        this :
                        oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments))));
        };

        NOP.prototype = this.prototype;
        fBound.prototype = new NOP();

        return fBound;
    };
}


var tests = Object.keys(window.__karma__.files).filter(function (file) {
    return /\.spec\.js$/.test(file);
});

require.config({
    baseUrl: '/base/src/scripts',
    deps: tests,
    callback: window.__karma__.start
});