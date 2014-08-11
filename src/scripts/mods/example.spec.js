define([ 'mods/example' ], function(Example) {

	describe('Example module test', function() {
		it('should exist', function() {
			expect(Example).toBeDefined();
			expect(typeof Example).toBe('object');
		});

		it('should have name property', function() {
			expect(Example.name).toBeDefined();
			expect(Example.name).toBe('Example');
		});
	});

});