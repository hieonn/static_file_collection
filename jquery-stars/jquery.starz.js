/**
 * Starz - jQuery Plugin
 * Pretty star rating stored in cookies
 *
 * Examples and documentation at: https://github.com/microtroll/jquery-starz
 *
 * Copyright (c) 2014 microtroll
 *
 * Version: 1.3.1
 * Requires: jQuery v2+
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

(function($) {

  $.fn.extend({

    starz: function(stars, initialRating) {

      var elements = this;
      return this.each(function() {

        if (!initialRating) {
          initialRating = 0;
        }

        var containerElement = this;
        var container = $(this);
        var starsCollection = [];
        containerElement.rating = initialRating;
        container.css('overflow', 'auto');

        for (var starIdx = 0; starIdx < stars; starIdx++) {
          var starElement = document.createElement('div');
          var star = $(starElement);
          starElement.rating = starIdx + 1;
          star.addClass('ratings-star');

          if (starIdx < initialRating) {
            star.addClass('ratings-full');
          }

          container.append(star);
          starsCollection.push(star);
                    
        }

      });

    }

  });
})(jQuery);
