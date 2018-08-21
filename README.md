# Coloris

Checkout a demo here: https://george3d6.github.io/coloris/

Coloris is a color picker I created for a website of mine.

It allows the user to chose between a few dozen (or hundreds) of colors in a quick and mobile friendly way.

Coloris is very small, standing in at 5.085KB uncompressed. It's easy to customize
and insert into your project (only a single script tag required).

I was based on [this codepen by Lewi Hussey](https://codepen.io/Lewitje/pen/zqVaPY). However, the original used a lot of Jquery and was quite inefficient and hard to read (for my taste, at any rate). So I decided to improve on it and in the process I made a bunch of style modifications.

## How do I use coloris ?

1. Include the script (main.js)... minified and cdn hosted version coming soon

2. Chose the element where you want the color picker to appear (this is just a c container, you can style it any way you want).

3. Initialize the color picker:
```
const color_picker = document.getElementById('color-picker-container') //Our container element
Coloris(color_picker);
```

4. Listen for color change inputs
```
color_picker.addEventListener('input', function() {
	console.log(color_picker.value) // This is the current selected values in rgb, e.g.: 'rgb(214,111,56)'
});
```

5. [Optional] configure coloris
```
const color_picker = document.getElementById('color-picker-container') //Our container element

const options = {
	"colors": [
		[253, 216, 53],
		[255, 125, 86],
		[12, 57, 53],
	]
	,"max_intensity":190
	,"min_intensity": 20
	,"variants": 12
	,"switch_animation_time_factor": 0.1
	}
}

Coloris(color_picker, options);
```

See a live configurable example at: https://george3d6.github.io/coloris/
