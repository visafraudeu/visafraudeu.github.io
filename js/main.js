(function (window, $, undefined) {

	$(function () {
		$(document).on('click', 'a', function () {
			ga('send', 'event', 'Link', 'click', $(this).attr('href'));
		});
		
		var $gallery = $('.gallery');
		var $textLinks = $('a[href^="doc"]');
		if ($gallery.length) {
			$textLinks.each(function (index, el) {
				var $this = $(el);
				var url = $this.attr('href');

				if ($gallery.find('a[href="'+url+'"]').length) {
					return;
				}
				var $div = $('<div class="gallery-thumbnail">');
				var $link = $('<a>');
				var thumbUrl = url.replace('doc/','thumb/');
				if (thumbUrl.split('.').pop() !== 'png') {
					thumbUrl = thumbUrl.slice(0, -4) + '.jpg';
				}
				$('<img>').attr('src',thumbUrl).appendTo($link);
				$link.attr('href',$this.attr('href')).appendTo($div);
				$div.appendTo($($gallery.get(index % 2)));
			});
			//todo: implement height detection
			$('.gallery-right div:last-child').appendTo($('.gallery-left'));
			//$('.gallery-left div:last-child').appendTo($('.gallery-right'));
		}
		
		
		$("a[href^=doc]").each(function () {
			var $this = $(this);
			if ($this.attr('href').split('.').pop() === 'pdf') {
				$this.addClass('fancybox.iframe');
			}
			$this.fancybox();
		});
		
		if ($gallery.length) {
			$('a[href^=doc]').hover(function () {
				var $this = $(this);
				var url = $this.attr('href');
				$gallery.find('a[href="'+url+'"]').closest('.gallery-thumbnail').addClass('hover');
			}, function () {
				var $this = $(this);
				var url = $this.attr('href');
				$gallery.find('a[href="'+url+'"]').closest('.gallery-thumbnail').removeClass('hover');
			});
		}
	});

})(window, jQuery);