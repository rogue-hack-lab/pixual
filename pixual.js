var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    canvas2 = document.getElementById('canvas2'),
    ctx2 = canvas2.getContext('2d'),
    rows = 2,
    cols = 2,
    elemLeft = ctx2.offsetLeft,
    elemTop = ctx2.offsetTop;
    
    var diffx, diffy;
    
    
function loop() {
    diffx = Math.floor(Math.random()*cols);
    diffy = Math.floor(Math.random()*rows);
    cw = canvas.width / cols;
    ch = canvas.height / rows;
    console.log('x: ' + diffx + ' y: '+diffy);
    for(var y = 0; y < rows; y++) {
        for(var x = 0; x < cols; x++) {
            color = getRandomColor();
            ctx.fillStyle = color;
            ctx.fillRect(x * cw, y * ch, cw, ch);
            if( x == diffx & y == diffy){color = getRandomColor();}
            ctx2.fillStyle = color;
            ctx2.fillRect(x * cw, y * ch, cw, ch);
            //console.log(cw +' '+ ch);
        }
    }
};

canvas.addEventListener('click', function(event) {
    checkClick(event,this);
}, false);

canvas2.addEventListener('click', function(event) {
    checkClick(event,this);
}, false);

loop();

function checkClick (event,canvas_ref) {
    var x = event.pageX - canvas_ref.offsetLeft,
        y = event.pageY - canvas_ref.offsetTop;
    console.log(Math.floor(x/cw), Math.floor(y/ch));
    if(diffx == Math.floor(x/cw) & diffy == Math.floor(y/ch)) {
        //alert('Win');
        rows++;
        cols++;
        loop();
    }
}

function getRandomColor() {
    return 'rgb(' + 
        ((Math.random() * 255)|0) + ',' +
        ((Math.random() * 255)|0) + ',' +
        ((Math.random() * 255)|0) + ')';
}

function countdown( elementName, minutes, seconds )
{
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits( n )
    {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer()
    {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            element.innerHTML = "countdown's over!";
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }

    element = document.getElementById( elementName );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
}

countdown( "countdown", 1, 0 );