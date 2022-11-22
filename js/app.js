document.addEventListener('DOMContentLoaded', function () {
	const screen = document.getElementById('canvas');
	const screenWidth = screen.clientWidth;
	const screenHeight = screen.clientHeight;
	const countButtons = document.querySelectorAll('.block-count button');
	const result = document.querySelector('.count');
	const btnPlus = document.querySelector('.btn-plus');
	const btnMinus = document.querySelector('.btn-minus');
	const btnStart = document.querySelector('.btn-start');
	const btnStop = document.querySelector('.btn-stop');

	const figures = {
		star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 0l4.96 10.56 11.040 1.68-8 8.24 1.92 11.52-9.92-5.44-9.92 5.44 1.92-11.52-8-8.24 11.040-1.68z"></path></svg>`,
		circle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 16c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z"></path></svg>`,
		square: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M0 0h32v32h-32v-32z"></path></svg>`,
		triangle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 32h-32l16-32z"></path></svg>`
	}

	const colors = ['#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'];
	const sizes = [50, 85, 100];
	const maxSize = Math.max.apply(null, sizes);
	let activeFigures = [];

	let checkCount = () => result.innerHTML = activeFigures.length;
	let randomValue = (arr) => arr[Math.floor(Math.random()*arr.length)];
	let randomFigure = (obj) => {
		const keys = Object.keys(obj);

		return obj[keys[Math.floor(Math.random() * keys.length)]];
	};
	let randomPosition = () => Math.random() * screenWidth * screenHeight;

	function creatFigure(figure, color, size, id, posTop, posLeft, endAnimatePosition) {
		elem = document.createElement('div');
		elem.className = 'figure';
		elem.style.width = size + 'px';
		elem.style.height = size + 'px';
		elem.style.left = posLeft + 'px';
		elem.style.top = posTop + 'px';
		elem.innerHTML = figure;

		elem.setAttribute('id', id);
		let figureImg = elem.querySelector('svg');

		figureImg.setAttribute('fill', color);

		const obj = {
			elem: elem,
			id: id,
			width: size,
			height: size,
			posLeft: posLeft,
			posTop: posTop
		};

		activeFigures.push(obj);
		screen.appendChild(elem);

		myAnimate();

		function myAnimate() {
			let pos = 0;
			let animeId = null;

			clearInterval(animeId);

			animeId = setInterval(frame, 10);

			function frame() {
				if (pos >= screenHeight) {
					clearInterval(animeId);
					deleteFigure();
					checkCount();
				} else {
					pos++;
					elem.style.transform = `translateY(${-screenHeight}px)`;
				}
			}
		}
	}

	function deleteFigure() {
		if (activeFigures.length) {
			activeFigures[activeFigures.length - 1].elem.remove();
			activeFigures.splice(activeFigures.length - 1, 1);
		}
	}

	screen.addEventListener('click', function(e) {
		let item = e.target;
		let itemId = item.getAttribute('id');

		if (item != screen) {
			activeFigures.forEach(function(item, index) {
				if (item.id === +itemId) {
					item.elem.remove();
					activeFigures.splice(index, 1);
				}
			});
		}

		checkCount();
	});

	function disableButtons() {
		countButtons.forEach(function(item) {
			item.setAttribute('disabled', 'disabled');
		});
	}

	function enableButtons() {
		countButtons.forEach(function(item) {
			item.removeAttribute('disabled');
		});
	}

	btnPlus.addEventListener('click', () => {
		let figure = randomFigure(figures);
		let color = randomValue(colors);
		let size = randomValue(sizes);
		let posTop = Math.floor(Math.random() * (screenHeight - maxSize));
		let posLeft = Math.floor(Math.random() * (screenWidth - maxSize));
		let id = Math.floor(Math.random() * 1000);

		creatFigure(figure, color, size, id, posTop, posLeft);
		checkCount();
	});

	btnMinus.addEventListener('click', () => {
		deleteFigure();
		checkCount();
	});

	checkCount();
	// disableButtons();

	// btnStart.addEventListener('click', () => {
	// 	enableButtons();
	// });

	btnStop.addEventListener('click', () => {
		// disableButtons();
		activeFigures = [];
		screen.innerHTML = '';
		result.innerHTML = activeFigures.length;
		checkCount();
	});
}, false);
