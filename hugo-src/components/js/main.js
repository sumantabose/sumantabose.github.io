/*
Phantom by HTML5 UP
html5up.net | @n33co
Free for persona and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
		$body = $('body');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-loading');
			}, 100);
		});

		// Touch?
		if (skel.vars.touch)
		$body.addClass('is-touch');

		// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
		$form.find('textarea').each(function() {

			var $this = $(this),
			$wrapper = $('<div class="textarea-wrapper"></div>'),
			$submits = $this.find('input[type="submit"]');

			$this
			.wrap($wrapper)
			.attr('rows', 1)
			.css('overflow', 'hidden')
			.css('resize', 'none')
			.on('keydown', function(event) {

				if (event.keyCode == 13
					&&	event.ctrlKey) {

						event.preventDefault();
						event.stopPropagation();

						$(this).blur();

					}

				})
				.on('blur focus', function() {
					$this.val($.trim($this.val()));
				})
				.on('input blur focus --init', function() {

					$wrapper
					.css('height', $this.height());

					$this
					.css('height', 'auto')
					.css('height', $this.prop('scrollHeight') + 'px');

				})
				.on('keyup', function(event) {

					if (event.keyCode == 9)
					$this
					.select();

				})
				.triggerHandler('--init');

				// Fix.
				if (skel.vars.browser == 'ie'
				||	skel.vars.mobile)
				$this
				.css('max-height', '10em')
				.css('overflow-y', 'auto');

			});

			// Fix: Placeholder polyfill.
			$form.placeholder();

			// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

			// Menu.
			var $menu = $('#menu');

			$menu.wrapInner('<div class="inner"></div>');

			$menu._locked = false;

			$menu._lock = function() {

				if ($menu._locked)
				return false;

				$menu._locked = true;

				window.setTimeout(function() {
					$menu._locked = false;
				}, 350);

				return true;

			};

			$menu._show = function() {

				if ($menu._lock())
				$body.addClass('is-menu-visible');

			};

			$menu._hide = function() {

				if ($menu._lock())
				$body.removeClass('is-menu-visible');

			};

			$menu._toggle = function() {

				if ($menu._lock())
				$body.toggleClass('is-menu-visible');

			};

			$menu
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
				$menu._hide();

				// Redirect.
				if (href == '#menu')
				return;

				window.setTimeout(function() {
					window.location.href = href;
				}, 350);

			})
			.append('<a class="close" href="#menu">Close</a>');

			$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
				$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
				$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
				if (event.keyCode == 27)
				$menu._hide();

			});


			//code to let the tiles highlight on a touch device (instead of hover)
			if (skel.vars.touch) {
				$(window).scroll(function() {
					$('article').each(function(index) {
						$centervp = $(window).height() / 2;
						var $div = $( this );
						if ( $div.is( ':in-viewport(' + $centervp + ')' ) ) {
							$div.addClass("in-viewport");
						} else {
							$div.removeClass("in-viewport");
						}
					});
				});
			}

			//Fluidbox
			$('a[data-fluidbox]').fluidbox({
				stackIndex: 10000
			});


			//Formspree.io
			var contactform =  document.getElementById('contactform');
			contactform.setAttribute('action', '//formspree.io/' + 'martijn' + '@' + 'mtbhomer' + '.' + 'com');


		});

		//Masonry grid
		var $masonry_container = $('.masonry-grid').imagesLoaded( function() {
			// init Masonry after all images have loaded
			$masonry_container.masonry({
				// options...
				itemSelector: '.masonry-item',
				columnWidth: '.masonry-sizer',
				gutter: '.masonry-gutter-sizer',
				percentPosition: true
			});
		});


		//set-up video
		$('.inner').fitVids();

		$('.mix-container').mixItUp({
			selectors: {
				target: '.mix-item'
			},
			animation: {
				enable: false,
				effects: 'fade',
				duration: 300,
				queue: false
			},
			controls: {
				enable: false
			},
			callbacks: {
				onMixLoad: function(){
					$(this).mixItUp('setOptions', {
						animation: {
							enable: true
						},
					});
				},
				onMixStart: function(state, futureState) {

					//make all the visible upper borders 1px.
					$.each( futureState.$show, function( key, value ) {
						var showItem = $(value);
						showItem.css({"border-top":"solid 1px #c9c9c9", "padding": "0.5em 0"});
					});

					//now hide the top-border of the first element which is shown
					var firstItem = $(futureState.$show[0]);
					firstItem.css({"border-top":"0", "padding": "0.5em 0"});

					//hide or show the year header if there are no elements to show
					if(futureState.totalShow == 0) {
						$(this).prev().fadeOut(300);
						$(this).css({"margin":"0"});
					} else {
						$(this).prev().fadeIn(300);
						$(this).css({"margin":"0 0 2em 0"});
					}
				},

				onMixBusy: function(state){
					console.log('MixItUp busy');
				}
			},
		});

		$('select[name=filter-category]').change(function() {
			$('.mix-container').mixItUp('filter', this.value);
		});

		//when clicked on arrow show full citation
		$('.reference-toggle').click(function(e)
		{
			//togle visibity of the reference
			$element = $(event.target).parent().parent().next()

			//change text of arrow
			if($element.is(':visible')){
				$(event.target).text(' Show Full Citation');
				$(event.target).parent().removeClass("fa-caret-up").addClass( "fa-caret-down" );
			}else{
				$(event.target).text(' Hide Full Citation');
				$(event.target).parent().removeClass("fa-caret-down").addClass( "fa-caret-up" );
			}

			$element.slideToggle("fast");

			// Cancel the default action
			e.preventDefault();

		});

		//code to get download count from Google URL shortner API
		if ($('.phd-thesis').length){
			url="https://www.googleapis.com/urlshortener/v1/url";
			data = {
				key:"AIzaSyBBHmqY3OqWOSZJ-uZvnG0pEOh8ojL1Few",
				shortUrl:"http://goo.gl/5vWkke",
				projection:"FULL"
			};
			$.getJSON(url, data, function(data, textStatus){
				if(data.status=="OK"){
					download_count = data.analytics.allTime.shortUrlClicks;
					$('.phd-thesis').text("Download the PhD Thesis (Downloaded " + download_count + " times)");
				}
			});
		}

		if (!skel.vars.touch) {
			$('.logo')
			.mouseover(function() {
				$(this).find('.logo-state').css("display","none");
				$(this).find('.logo-state-hover').css("display","inline-block");
				//	$(this).attr("src", "fullImageUrl/whateverOver.gif");
				////$(this).parent().css('z-index', 3000);
			})
			.mouseout(function() {
				$(this).find('.logo-state').css("display","inline-block");
				$(this).find('.logo-state-hover').css("display","none");
			});
		}

	})(jQuery);
