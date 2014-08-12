/* global jasmine, describe, it, expect, beforeEach, afterEach */

var proxyquire = require('proxyquireify')(require);

var EventEmitterMock = (function() {
    function EventEmitter() {

    }

    EventEmitter.prototype.emit = jasmine.createSpy('EventEmitter.prototype.emit');

    EventEmitter.prototype.on = jasmine.createSpy('EventEmitter.prototype.on');

    return EventEmitter;
})();


var Example = proxyquire('./example', {
    './events': {
        EventsEmitter: EventEmitterMock
    }
});


describe('Example class test', function() {

    it('Should be a function', function() {
        expect(typeof Example).toBe('function');

        expect(function() {
            new Example();
        }).not.toThrow();
    });

});


describe('Example instance test', function() {
    var example;

    beforeEach(function() {
        example = new Example();
    });

    afterEach(function() {
        example = null;
    });


    it('Should be an object with `doSomething` method', function() {
        expect(typeof example).toBe('object');

        expect(example.doSomething).toBeDefined();
    });

});


describe('Example.prototype.doSomething test', function() {
    var example;

    beforeEach(function() {
        example = new Example();

        EventEmitterMock.prototype.emit.calls.reset();
        EventEmitterMock.prototype.on.calls.reset();
    });

    afterEach(function() {
        example = null;
    });

    it('Should emit signal "done" after time passed as argument', function(done) {
        expect(typeof example).toBe('object');

        expect(function() {
            example.doSomething(1000);
        }).not.toThrow();

        setTimeout(function() {
            expect(EventEmitterMock.prototype.emit.calls.count()).toBe(1);
            expect(EventEmitterMock.prototype.emit.calls.argsFor(0)[0]).toBe('done');

            done();
        }, 1000);
    });

});