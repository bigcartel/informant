/*
 * Informant : jquery.informant.js
 * @requires jQuery 1.3+
 *
 * The Informant spies on your forms and warns people if they try to leave
 * a form that has been changed but not saved.
 *
 * No copyright. Go nuts.
 *
 */

(function($) {

	$.fn.informant = function(options) {	
		options = $.extend($.fn.informant.defaults, options);
		
		var eventKey = 'beforeunload.informant';
		var cacheKey = 'cache.informant';
		var forms = [];
		
		$(window).unbind(eventKey).bind(eventKey, function() {
			var inform = false;
			
			$.each(forms, function(i, form) {			
				if(form.data(cacheKey) != form.serialize()) {
					inform = true;
					return false;
				}
			});
			
			if(inform) {
				return options.message;
			}
		});
		
		return this.each(function() {
			var form = $(this);
			
			function cache() {
				form.data(cacheKey, form.serialize());
			}			
				
			form.submit(cache);
			cache(form);
			forms.push(form);				
		});
	};
	
	$.fn.informant.defaults = {
		message: 'All unsaved changes will be lost.'
	};

})(jQuery);
