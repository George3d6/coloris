const Coloris = (function() {
	'use strcit';
	const css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = `
	.base-colors,
	.varied-colors {
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 48px;
	}

	.color-circle,
	.color-var {
	float: left;
	border-radius: 50%;
	cursor: pointer;
	}

	.color-circle {
		width: 26px;
		height: 26px;
		margin: 10px;
	}

	.color-circle.active {
		transform: scale(1.4, 1.4);
	}

	.color-var {
		width: 36px;
		height: 36px;
		margin: 8px;
	}
	.color-var.visible {
		transform: scale(1, 1);
		transition: transform 0.4s 0.02s;
	}
	.color-var.active {
		transform: scale(1.3, 1.3);
		transition: transform 0.4s 0.02s;
	}

	@keyframes growColorVar {
		from {
		  transform: scale(0);
		}
		to {
		  transform: scale(1);
		}
	  }`;

	document.body.appendChild(css);

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

		if (typeof(options['switch_animation_time_factor']) === 'undefined') {
			options['switch_animation_time_factor'] = 0.06;
		}

		const color_modifier = (options['max_intensity'] - options['min_intensity'])/options['variants']

		/* Insert the two containers and base colors */
		element.insertAdjacentHTML('beforeend','<div class="base-colors"></div>');
		element.insertAdjacentHTML('beforeend','<div class="varied-colors"></div>');
		const varied_colors_ele = element.getElementsByClassName('varied-colors')[0];

		for (i = 0; i < options['colors'].length; i++) {
			element.getElementsByClassName('base-colors')[0].insertAdjacentHTML('beforeend','<div class="color-circle" data-color="' + options['colors'][i].join(',') + '" style="background-color: rgb(' +options['colors'][i].join(',') + ');"></div>');
		}

		/* Add listeners to the base color circles */
		const color_circles = element.getElementsByClassName('color-circle');
		for (var i = 0; i < color_circles.length; i++) {
			const color_circle = color_circles[i];
			color_circle.addEventListener('click', function () {
				try {
					element.getElementsByClassName('color-circle active')[0].classList.remove('active');
				} catch {}

				color_circle.classList.add('active');

				varied_colors_ele.innerHTML = '';

				const color = color_circle.getAttribute('data-color').split(',');
				for (var i = 0; i < options['variants']; i++) {
					const new_color = [];

					for (var x = 0; x < color.length; x++) {
						var color_variation = (Number(color[x]) - 100) + (color_modifier * i + options['min_intensity']);
						new_color.push(Math.ceil(color_variation));
					}

					varied_colors_ele.insertAdjacentHTML('beforeend','<div data-color="' + new_color + '" class="color-var" style="background-color: rgb(' + new_color + ');"></div>');
				}

				const color_var_eles = element.getElementsByClassName('color-var');

				for (var i = 0; i < color_var_eles.length; i++) {
					element.getElementsByClassName('color-var')[i].classList.add('visible');
					color_var_eles[i].style.animation = `growColorVar ${i*options['switch_animation_time_factor'] + options['variants']*options['switch_animation_time_factor']}s`;
				}

				for (var i = 0; i < color_var_eles.length; i++) {
					const ele = color_var_eles[i];
					ele.addEventListener('click', () => {
						try {
							element.getElementsByClassName('color-var active')[0].classList.remove('active');
						} catch {}
						void ele.offsetWidth;
						ele.classList.add('active');
						element.value = `rgb(${ele.getAttribute('data-color')})`;
						element.dispatchEvent(new Event('input'));
					});
				}
			});
		}
	}
	return init;
}());
