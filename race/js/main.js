var canvas, canvasContext;

var blueCar = new Car();
var greenCar = new Car();

var track = new Track();

window.onload = function () {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	loadImages();
}

function imgLoadingDone_StartGame() {
	window.requestAnimationFrame(updateAll);

	setupInput();
	loadLevel(levelOne);
}

function loadLevel(whichLevel) {
	track.trackGrid = [...whichLevel];
	blueCar.reset(carImg, 'Blue storm');
	greenCar.reset(car2Img, 'Green machine');
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	blueCar.move();
	greenCar.move();
}

function drawAll() {
	track.drawTracks();
	blueCar.draw();
	greenCar.draw();

	window.requestAnimationFrame(updateAll);
}
