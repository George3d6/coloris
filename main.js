const Coloris = (function() {
	'use strcit';
	function init(element, options) {
		/* Configuration options */
		if (typeof(options) === 'undefined') {
			options = {};
		}

		if (typeof(options['colors']) === 'undefined') {
			options['colors'] = [[253,216,53]
			,[255, 125,86]
			,[229,57,53]
			,[67,160,71]
			,[0, 178,255]
			,[0, 126,216]
			,[94,53,177]
			,[86,66,60]];
		}

		if (typeof(options['max_intensity']) === 'undefined') {
			options['max_intensity'] = 255;
		}

		if (typeof(options['min_intensity']) === 'undefined') {
			options['min_intensity'] = 0;
		}

		if (typeof(options['variants']) === 'undefined') {
			options['variants'] = 7;
		}

		const color_modifier = (options['max_intensity'] - options['min_intensity'])/options['variants']

		/* Insert into the element */
		element.insertAdjacentHTML('beforeend','<div class="base-colors"></div>');
		element.insertAdjacentHTML('beforeend','<div class="varied-colors"></div>');

		for (i = 0; i < options['colors'].length; i++) {
			element.getElementsByClassName('base-colors')[0].insertAdjacentHTML('beforeend','<div class="color-circle" data-color="' + options['colors'][i].join(',') + '" style="background-color: rgb(' +options['colors'][i].join(',') + ');"></div>');
		}

		const color_circles = element.getElementsByClassName('color-circle');
		for (var i = 0; i < color_circles.length; i++) {
			const color_circle = color_circles[i];
			color_circle.addEventListener('click', function () {

				try {
					element.getElementsByClassName('color-circle active')[0].classList.remove('active');
				} catch {}


				for (var i = 0; i < element.getElementsByClassName('color-var').length; i++) {
					element.getElementsByClassName('color-var')[i].classList.remove('visible');
					element.getElementsByClassName('color-var')[i].classList.remove('active');
				}

				element.getElementsByClassName('varied-colors')[0].innerHTML = '';

				const color = color_circle.getAttribute('data-color').split(',');
				for (var i = 0; i < options['variants']; i++) {
					const new_color = [];

					for (var x = 0; x < color.length; x++) {
						var color_variation = (Number(color[x]) - 100) + (color_modifier * i + options['min_intensity']);
						new_color.push(Math.ceil(color_variation));
					}

					document.getElementsByClassName('varied-colors')[0].insertAdjacentHTML('beforeend','<div data-color="' + new_color + '" class="color-var" style="background-color: rgb(' + new_color + ');"></div>');
				}

				const color_var_eles = element.getElementsByClassName('color-var');
				for (var i = 0; i < color_var_eles.length; i++) {
					color_var_eles[i].style.transition = 'transform ' + (120 / 1000) + 's ' + ((30 / 1000) * i) + 's';
				}

				for (var i = 0; i < element.getElementsByClassName('color-var').length; i++) {
					element.getElementsByClassName('color-var')[i].classList.add('visible');
				}

				for (var i = 0; i < color_var_eles.length; i++) {
					const ele = color_var_eles[i];
					ele.addEventListener('click', () => {
						element.value = `rgb(${ele.getAttribute('data-color')})`;
						element.dispatchEvent(new Event('input'));
					});
				}

			});
		}
		color_circles[0].click();
	}
	return init;
}());
