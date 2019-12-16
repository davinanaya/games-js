var carImg = document.createElement('img');
var car2Img = document.createElement('img');
var trackImg = [];
var imgsToLoad = 0;

function countLoadedImgAndLunchIfReady() {
	imgsToLoad--;
	if (!imgsToLoad) {
		imgLoadingDone_StartGame();
	}
}

function beginLoadImg(img, fileName) {
	img.onload = countLoadedImgAndLunchIfReady();
	img.src = `images/${fileName}`;
}

function loadImgForTrackCode(trackCode, fileName) {
	trackImg[trackCode] = document.createElement('img');
	beginLoadImg(trackImg[trackCode], fileName);
}

function loadImages() {
	var imageList = [
		{ img: carImg, fileName: 'player1car.png' },
		{ img: car2Img, fileName: 'player2car.png' },

		{ trackType: TRACK_ROAD, fileName: 'track_road.png' },
		{ trackType: TRACK_WALL, fileName: 'track_wall.png' },
		{ trackType: TRACK_TREE, fileName: 'track_tree.png' },
		{ trackType: TRACK_GOAL, fileName: 'track_goal.png' },
		{ trackType: TRACK_FLAG, fileName: 'track_flag.png' },
	];

	imgsToLoad = imageList.length;

	for (value of imageList) {
		if (value.img) {
			beginLoadImg(value.img, value.fileName);
		} else {
			loadImgForTrackCode(value.trackType, value.fileName);
		}
	}
}
