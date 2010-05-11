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
		
		var inform = false;
		
		$(window).unbind(options.eventKey).bind(options.eventKey, function() {			
			if(inform) {
				return options.message;
			}
		});
		
		return this.each(function() {
			$(this).change(function() {
				inform = true;
			}).submit(function() {
				inform = false;
			});
		});
	};
	
	$.fn.informant.defaults = {
		message: 'All unsaved changes will be lost.',
		eventKey: 'beforeunload.informant'
	};

})(jQuery);
