//=======================================================================
// 
//  Informant : informant.js : Version 1.1 : 4/11/2008
//  By Indie Labs (indielabs.com)
//
//  The Informant spies on your forms and warns people if they try to leave
//  a form that has been changed but not saved.
// 
//  Learn more at: http://indielabs.com/entries/the-informant/
// 
//  Requires Prototype 1.6+ : http://prototypejs.org
// 
//  Copyright (c) 2005-2008 Indie Labs, LLC. All rights reserved.
// 
//  Permission is hereby granted, free of charge, to any person obtaining
//  a copy of this software and associated documentation files (the
//  "Software"), to deal in the Software without restriction, including
//  without limitation the rights to use, copy, modify, merge, publish,
//  distribute, sublicense, and/or sell copies of the Software, and to
//  permit persons to whom the Software is furnished to do so, subject to
//  the following conditions:
//
//  The above copyright notice and this permission notice shall be
//  included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
//  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
//  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
//  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
//  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//  
//=======================================================================

Element.addMethods({	
	hasSubmitButton: function(element) {
		var id = $(element).identify();
		return $$('#' + id + ' input[type="submit"]', '#' + id + ' input[type="image"]', '#' + id + ' button').length > 0;
	}	
});

var Informant = {
	
	message: "All unsaved changes will be lost.", // this message goes inside the existing browser alert
	
	skipClass: "uninformed", // put this class on your forms if you don't want them watched
	
	delay: 1000, // some forms require time to hide certain fields, etc
	
	initialize: function() {
		
		// grab all forms that don't have the skip class, and have a submit button
		// forms submitted through javascript don't trigger the onSubmit event
		// so we ignore them too
		this.forms = $$('form:not([class~=' + this.skipClass + '])').reject(function(form) {
			return !form.hasSubmitButton();
		}.bind(this));
		
		if(this.forms.length == 0) return;
				
		this.forms.each(function(form) {
			form.before  = form.serialize();
			form.unsaved = function(){ return this.before != this.serialize(); }
			Event.observe(form, 'submit', function(event){ form.before = form.serialize(); });
		});
		
		// can't observe this in Safari, so we'll ram that bad boy on there
		window.onbeforeunload = function() {
			if(this.unsaved()) return this.message;
		}.bind(this);
	},
		
	unsaved: function() {
		return this.forms.find(function(form){ return form.unsaved(); }) != null;
	}

};

document.observe('dom:loaded', function() {
	setTimeout('Informant.initialize()', Informant.delay);
});