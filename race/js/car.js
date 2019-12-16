const GROUNDSPEED = 0.85;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.35;
const TURN_RATE = 0.05;
const MIN_SPEED_TO_RUN = 0.4;

class Car {
	constructor() {
		this.x = 75;
		this.y = 75;
		this.ang = 0;
		this.speed = 0;
		this.myCarImg; // which img to use
		this.name = 'Untitled car';

		this.keyHeld_Gas = false;
		this.keyHeld_Reverse = false;
		this.keyHeld_TurnLeft = false;
		this.keyHeld_TurnRight = false;

		this.controlKeyUp;
		this.controlKeyRight;
		this.controlKeyDown;
		this.controlKeyLeft;
	}

	setUpInput(keyUp, keyRight, keyDown, keyLeft) {
		this.controlKeyUp = keyUp;
		this.controlKeyRight = keyRight;
		this.controlKeyDown = keyDown;
		this.controlKeyLeft = keyLeft;
	}

	reset(whichImg, carName) {
		this.name = carName;
		this.myCarImg = whichImg;
		this.speed = 0;

		var arrayIndex = 0;

		for (var eachRow = 0; eachRow < track.TRACK_ROWS; eachRow++) {
			for (var eachCol = 0; eachCol < track.TRACK_COLS; eachCol++) {
				if (track.trackGrid[arrayIndex] == TRACK_PLAYER_START) {
					track.trackGrid[arrayIndex] = TRACK_ROAD;
					this.ang = -Math.PI / 2;
					this.x = eachCol * track.TRACK_W + (track.TRACK_W / 2);
					this.y = eachRow * track.TRACK_H + (track.TRACK_H / 2);

					return;
				}
				arrayIndex++;
			}
		}
	}

	move() {
		this.speed *= GROUNDSPEED;

		if (this.keyHeld_Gas) {
			this.speed += DRIVE_POWER;
		}
		if (this.keyHeld_Reverse) {
			this.speed -= REVERSE_POWER;
		}

		// the car must be walking to be able to turn
		if (Math.abs(this.speed) > MIN_SPEED_TO_RUN) {
			if (this.keyHeld_TurnLeft) {
				this.ang -= TURN_RATE;
			}
			if (this.keyHeld_TurnRight) {
				this.ang += TURN_RATE;
			}
		}
		this.x += Math.cos(this.ang) * this.speed;
		this.y += Math.sin(this.ang) * this.speed;

		track.carTrackHandling(this);
	}

	draw() {
		drawBitmapCenteredWithRotation(this.myCarImg, this.x, this.y, this.ang);
	}
}
