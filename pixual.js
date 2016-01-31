var canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d'),
canvas2 = document.getElementById('canvas2'),
ctx2 = canvas2.getContext('2d'),
rows = 2,
cols = 2,
elemLeft = ctx2.offsetLeft,
elemTop = ctx2.offsetTop
goodClickBonus = 0,
badClickPenalty = 1,
score = 0;

var diffx, diffy;
var element, endTime, hours, mins, msLeft, time;

function startGame () {
	$('#startBtn').hide();
	$('#canvas').show();
	$('#canvas2').show();
	rows = 2;
	cols = 2;
	score = 0;
	drawBoxes();
	countdown( "countdown", 1, 0 );
}

function levelUp() {
	time = new Date( msLeft );
	score += ((rows-1) * time.getUTCSeconds());
	$('#points').html(score);
	rows++;
	cols++;
	drawBoxes();
}

function oops () {
	endTime -= badClickPenalty*1000;
	updateTimer();
}

function endGame () {
	$('#startBtn').show();
	$('#canvas').hide();
	$('#canvas2').hide();
}

function drawBoxes () {
	diffx = Math.floor(Math.random()*cols);
	diffy = Math.floor(Math.random()*rows);

	cw = canvas.width / cols;
	ch = canvas.height / rows;

	console.log('x: ' + diffx + ' y: '+diffy);

	for(var y = 0; y < rows; y++) {
		for(var x = 0; x < cols; x++) {
			color = getRandomColorWebsafe();
			ctx.fillStyle = color;
			ctx.fillRect(x * cw, y * ch, cw, ch);
			if( x == diffx & y == diffy){
				//color = getRandomColor();
				color = getRandomColorWebsafe();
			}
			ctx2.fillStyle = color;
			ctx2.fillRect(x * cw, y * ch, cw, ch);
		}
	}
}

canvas.addEventListener('click', function(event) {
	checkClick(event,this);
}, false);

canvas2.addEventListener('click', function(event) {
	checkClick(event,this);
}, false);

function checkClick (event,canvas_ref) {
	var x = event.pageX - canvas_ref.offsetLeft,
	y = event.pageY - canvas_ref.offsetTop;
	console.log(Math.floor(x/cw), Math.floor(y/ch));
	if(diffx == Math.floor(x/cw) & diffy == Math.floor(y/ch)) {
		levelUp();
	}else{
		oops();
	}
}

function getRandomColor() {
	//return goldenColors.getHsvGolden(0.99, 0.99).toRgbString();
	return 'rgb(' +
		((Math.random() * 255)|0) + ',' +
		((Math.random() * 255)|0) + ',' +
		((Math.random() * 255)|0) + ')';
}

function getRandomColorHex() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

var webSafeColors = ['00','33','66','99','cc','ff'];
var random = function() {
	return Math.floor(Math.random()*6);
};
function getRandomColorWebsafe() {
	var r = webSafeColors[random()];
	var g = webSafeColors[random()];
	var b = webSafeColors[random()];
	return "#"+r+g+b;
};

function twoDigits( n ){
	return (n <= 9 ? "0" + n : n);
}

function updateTimer(){
	msLeft = endTime - (+new Date);
	if ( msLeft < 1000 ) {
		element.innerHTML = "countdown's over!";
		endGame();
	} else {
		time = new Date( msLeft );
		hours = time.getUTCHours();
		mins = time.getUTCMinutes();
		element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
		setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
	}
}

function countdown( elementName, minutes, seconds ){
	element = document.getElementById( elementName );
	endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
	updateTimer();
}
