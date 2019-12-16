const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_BOTTOM = 40;

const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;
const KEY_A = 65;

var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	blueCar.setUpInput(KEY_UP, KEY_RIGHT, KEY_BOTTOM, KEY_LEFT);
	greenCar.setUpInput(KEY_W, KEY_D, KEY_S, KEY_A);
}

function keySet(e, whichCar, setTo) {
	if (e.keyCode == whichCar.controlKeyLeft) {
		whichCar.keyHeld_TurnLeft = setTo;
	}

	if (e.keyCode == whichCar.controlKeyRight) {
		whichCar.keyHeld_TurnRight = setTo;
	}

	if (e.keyCode == whichCar.controlKeyUp) {
		whichCar.keyHeld_Gas = setTo;
	}

	if (e.keyCode == whichCar.controlKeyDown) {
		whichCar.keyHeld_Reverse = setTo;
	}
}

function keyPressed(event) {
	keySet(event, blueCar, true);
	keySet(event, greenCar, true);
	event.preventDefault();
}

function keyReleased(event) {
	keySet(event, blueCar, false);
	keySet(event, greenCar, false);
}