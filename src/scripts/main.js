require([ 'mods/example' ], function(Example) {

	var text = 'Hello ';

	document.body.innerHTML = text + Example.name + '!';

});