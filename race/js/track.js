var levelOne = [1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 5, 1, 1, 1, 1, 1, 5, 0, 0, 5, 1, 1, 1, 1, 1, 5, 0, 1,
	1, 0, 1, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 1, 0, 1,
	1, 0, 1, 4, 4, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 4, 4, 1, 0, 1,
	1, 0, 1, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 1, 0, 1,
	1, 0, 1, 4, 4, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 4, 4, 1, 0, 1,
	1, 2, 1, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 1, 2, 1,
	1, 1, 5, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 5, 1, 1,
	1, 0, 0, 0, 1, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 1, 0, 0, 0, 1,
	5, 0, 5, 0, 5, 0, 1, 4, 5, 3, 3, 5, 4, 1, 0, 5, 0, 5, 0, 5,
	1, 0, 1, 0, 0, 0, 1, 4, 1, 0, 0, 1, 4, 1, 0, 0, 0, 1, 0, 1,
	1, 0, 1, 1, 1, 1, 1, 1, 5, 0, 0, 5, 1, 1, 1, 1, 1, 1, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER_START = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

class Track {
	constructor() {
		this.TRACK_W = 40;
		this.TRACK_H = 40;
		this.TRACK_COLS = 20;
		this.TRACK_ROWS =20;
		this.trackGrid = [];
	}

	returnTileTypeAtColRow(col, row) {
		if (col >= 0 && col < this.TRACK_COLS &&
			row >= 0 && row < this.TRACK_ROWS) {
			var trackIndexUnderCord = col + this.TRACK_COLS * row;
			return this.trackGrid[trackIndexUnderCord];
		} else {
			return TRACK_WALL;
		}
	}

	carTrackHandling(whichCar) {
		var carTrackCol = Math.floor(whichCar.x / this.TRACK_W);
		var carTrackRow = Math.floor(whichCar.y / this.TRACK_H);

		if (carTrackCol >= 0 && carTrackCol < this.TRACK_COLS &&
			carTrackRow >= 0 && carTrackRow < this.TRACK_ROWS) {
			var tileHere = this.returnTileTypeAtColRow(carTrackCol, carTrackRow);

			if (tileHere === TRACK_GOAL) {
				loadLevel(levelOne);
				alert(`${whichCar.name} WINS!!`);
			} else if (tileHere !== TRACK_ROAD) {
				whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
				whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
			}
		}
	}

	drawTracks() {
		var arrayIndex = 0;
		for (var eachRow = 0; eachRow < this.TRACK_ROWS; eachRow++) {
			for (var eachCol = 0; eachCol < this.TRACK_COLS; eachCol++) {
				var useImg = trackImg[this.trackGrid[arrayIndex]];

				if (useImg) {
					canvasContext.drawImage(useImg, this.TRACK_W * eachCol, this.TRACK_H * eachRow);
				} else {
					canvasContext.drawImage(trackImg[0], this.TRACK_W * eachCol, this.TRACK_H * eachRow);
				}
				arrayIndex++;
			}
		}
	}
}
