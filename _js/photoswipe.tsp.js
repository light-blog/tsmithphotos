/**
 * @file photoswipe.js
 * Include this site's setup and init for Photoswipe. We get the
 * library's primary and skin JS/CSS through the node module package.
 */
(function(){
  'use strict';

  // A container for all gallery items on this page
  var items = [];

  function galleryItems() {
    var photos = document.querySelectorAll('.album a');
    var total = photos.length;

    for (var i = 0; i < total; i++) {
      var photo = photos[i]; // This element is the link tag, not the thumbnail image.
      
      // Include only elements
      if (photo.nodeType !== 1) { continue; }

      var size = photo.getAttribute('data-size').split('x');

      var item = {
        src: photo.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
        msrc: photo.getAttribute('href').replace('original', 'medium'),
        camera: photo.getAttribute('data-camera'),
        exposure: photo.getAttribute('data-exposure'),
        title: ' ', // @TODO: Implement title. But remember that PhotoSwipe will not show the caption element without title being non-empty.
      };

      items.push(item);
    }
  }

  document.addEventListener("DOMContentLoaded", galleryItems);

  function launchLightbox(e) {
    e.preventDefault();

    var pswpElement = document.querySelectorAll('.pswp')[0];

    // Get the <li> of the link
    var parent = this.parentNode;

    // Get the <ul> of the link
    var list = parent.parentNode;

    // Need to get the index of this LI within the UL
    var index = Array.prototype.indexOf.call(list.children, parent);

    // define options (if needed)
    var options = {
      index: index,
      addCaptionHTMLFn: function(item, captionEl, isFake) {
        captionEl.children[0].innerHTML = ['<span class="camera">', item.camera, '</span><span class="exposure">', item.exposure, '</span>'].join(' ');
        return true;
      },
    };

    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  // Loop through photos in the album and attach the above initializer
  var photos = document.querySelectorAll(".album a");
  for (var i = 0; i < photos.length; i++) {
    var current = photos[i];
    current.addEventListener('click', launchLightbox, false);
  }
  
})();
