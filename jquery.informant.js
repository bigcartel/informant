(function($) {

  $.fn.informant = function(options) {
    options = $.extend($.fn.informant.defaults, options);
    
    var inform = false;
    
    $(window).on('beforeunload', function() {
      if(inform) {
        return options.message;
      }
    });
    
    return this.each(function() {
      var form = $(this);
      var before = form.serialize();
      
      form.change(function() {
        var after = form.serialize();
        inform = before != after;
      }).submit(function() {
        inform = false;
        before = form.serialize();
      });
    });
  };
  
  $.fn.informant.defaults = {
    message: 'All unsaved changes will be lost.'
  };

})(jQuery);
