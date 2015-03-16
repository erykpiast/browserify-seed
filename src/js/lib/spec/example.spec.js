/* global describe, it */

import { assert } from 'chai';

import Example from '../example';

describe('Example class API test', () => {

    it('is function that can be instantiated', () => {

        assert.doesNotThrow(() => {
            new Example();
        });

    });

});