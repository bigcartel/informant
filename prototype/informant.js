/*
 * Informant : informant.js
 * @requires Prototype 1.6+
 *
 * The Informant spies on your forms and warns people if they try to leave
 * a form that has been changed but not saved.
 *
 * No copyright. Go nuts.
 *
 */

Element.addMethods({	
	hasSubmitButton: function(element) {
		var id = $(element).identify();
		return $$('#' + id + ' input[type="submit"]', '#' + id + ' input[type="image"]', '#' + id + ' button').length > 0;
	}	
});

var Informant = {
	
	message: "All unsaved changes will be lost.", // this message goes inside the existing browser alert
	
	skipClass: "uninformed", // put this class on your forms if you don't want them watched
	
	delay: 1000, // some forms require time to hide certain fields, etc.
	
	initialize: function() {
		
		// grab all forms that don't have the skip class, and have a submit button
		// forms submitted through javascript don't trigger the onSubmit event
		// so we ignore them too
		this.forms = $$('form:not([class~=' + this.skipClass + '])').reject(function(form) {
			return !form.hasSubmitButton();
		}.bind(this));
		
		if(this.forms.length === 0) { return; }
				
		this.forms.each(function(form) {
			form.before  = form.serialize();
			form.unsaved = function(){ return this.before != this.serialize(); };
			Event.observe(form, 'submit', function(event){ form.before = form.serialize(); });
		});
		
		// can't observe this in Safari, so we'll ram that bad boy on there
		window.onbeforeunload = function() {			
			if(this.unsaved()) { return this.message; }
		}.bind(this);
	},
		
	unsaved: function() {
		return this.forms.find(function(form){ return form.unsaved(); }) !== undefined;
	}

};

document.observe('dom:loaded', function() {
	setTimeout(function(){ Informant.initialize(); }, Informant.delay);
});
