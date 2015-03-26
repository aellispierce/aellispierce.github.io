/*
	Big Picture by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.init({
		reset: 'full',
		breakpoints: {
			'max': { range: '*', href: 'css/style.css', containers: 1440, viewport: { scalable: false }, grid: { gutters: 40 } },
			'wide': { range: '-1920', href: 'css/style-wide.css', containers: 1360 },
			'normal': { range: '-1680', href: 'css/style-normal.css', containers: 1200 },
			'narrow': { range: '-1280', href: 'css/style-narrow.css', containers: 960 },
			'narrower': { range: '-1000', href: 'css/style-narrower.css', containers: '95%' },
			'mobile': { range: '-736', href: 'css/style-mobile.css', grid: { gutters: 20 } },
			'mobile-narrow': { range: '-480', containers: '95%!', grid: { collapse: true } }
		}
	});

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

		var resizeTimeout, resizeScrollTimeout;

		$window
			.resize(function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				window.clearTimeout(resizeTimeout);

				resizeTimeout = window.setTimeout(function() {

					// Update scrolly links.
						$('a[href^=#]').scrolly({
							speed: 1500,
							offset: $header.outerHeight() - 1
						});

					// Re-enable animations/transitions.
						window.setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.load(function() {
				$window.trigger('resize');
			});
})(jQuery);
