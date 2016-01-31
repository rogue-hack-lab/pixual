var canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d'),
canvas2 = document.getElementById('canvas2'),
ctx2 = canvas2.getContext('2d'),
level = 2,
elemLeft = ctx2.offsetLeft,
elemTop = ctx2.offsetTop
goodClickBonus = 0,
badClickPenalty = -1,
score = 0,
gameActive = false;

var diffx, diffy;
var element, endTime, hours, mins, msLeft, time;

var webSafeColors = ['00','33','66','99','cc','ff'];
var random = function() {
	return Math.floor(Math.random()*6);
}

drawBoxes();

function startGame () {
	$('#startGame').hide();
	$('#newGame').hide();
	$('#stats').show();
	$('#resetGame').show();
	$('#points').html('0');
	gameActive = true;
	$('#canvas').show();
	$('#canvas2').show();
	level = 2;
	score = 0;
	drawBoxes();
	countdown( "countdown", 1, 0 );
}

function levelUp() {
	time = new Date( msLeft );
	score += ((level-1) * time.getUTCSeconds());
	$('#points').html(score);
	level++;
	drawBoxes();
}

function oops () {
	endTime += badClickPenalty*1000;
	updateTimer();
}

function endGame () {
	$('#newGame').show();
	$('#resetGame').hide();
	gameActive = false;
}

function drawBoxes () {
	diffx = Math.floor(Math.random()*level);
	diffy = Math.floor(Math.random()*level);

	cw = canvas.width / level;
	ch = canvas.height / level;

	console.log('+ x: ' + diffx + ' y: '+diffy);

	for(var y = 0; y < level; y++) {
		for(var x = 0; x < level; x++) {
			var color;
			color = getRandomColor(color);
			ctx.fillStyle = color;
			ctx.fillRect(x * cw, y * ch, cw, ch);
			if( x == diffx & y == diffy){
				//color = getRandomColor();
				color = getRandomColor(color);
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
	if (gameActive == true) {
		var x = event.pageX - canvas_ref.offsetLeft,
		y = event.pageY - canvas_ref.offsetTop;
		
		var clickx = Math.floor(x/cw),
		clicky = Math.floor(y/ch);
		
		console.log('- x: ' + clickx + ' y: '+clicky);

		if(diffx == clickx & diffy == clicky) {
			levelUp();
		}else{
			oops();
		}	
	}
}

function getRandomColor(color) {
	do {
		var r = webSafeColors[random()];
		var g = webSafeColors[random()];
		var b = webSafeColors[random()];
		if ("#"+r+g+b === color) {console.log("DUPLICATE CAUGHT");}
	}
	while ("#"+r+g+b === color);
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

/ * not fully working yet -Mica */
function resizePlayArea() {
    var playArea = document.getElementById('playArea');
    var widthToHeight = 4 / 2;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        playArea.style.height = newHeight + 'px';
        playArea.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        playArea.style.width = newWidth + 'px';
        playArea.style.height = newHeight + 'px';
    }

    var playCanvas = document.getElementById('canvas');
    playCanvas.width = newWidth;
    playCanvas.height = newHeight;

		var playCanvas2 = document.getElementById('canvas2');
		playCanvas2.width = newWidth;
		playCanvas2.height = newHeight;
}

window.addEventListener('resize', resizePlayArea, false);
window.addEventListener('orientationchange', resizePlayArea, false);
