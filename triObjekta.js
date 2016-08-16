var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 15;
var x1 = canvas.width/2;
var y1 = canvas.height-30;
var x2 = canvas.width/3;
var y2 = canvas.height-60;
var x3 = canvas.width/4;
var y3 = canvas.height-90;

var dx = 2;
var dy1 = -0.2;
var dy2 = -0.2;
var dy3 = -0.2;
var ballSpeed = 0.2;

var holeRadius = 25;
var holeX = 80;
var holeY = 105;
var holeColor = ["#0095DD", "#FF3030", "#00AD00"];
var holeColorChoice = 0;

var score = 0;

var dragOne = false;
var dragTwo = false;
var dragThree = false;
var escPressed = true;

var playX = canvas.width/2-50;
var playY = canvas.height/2;
var playW = 50;
var playH = 50;
var settingsX = canvas.width/2;
var settingsY = canvas.height/2;
var settingsW = 50;
var settingsH = 50;
var exitX = canvas.width-50;
var exitY = 0;
var exitW = 50;
var exitH = 50;

var gamePaused;
var newGame = true;

var buttonWidth = [96,260,182,160];
var buttonHeight = [40,40,40,40];

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);
document.addEventListener("keydown", menuHandler, false);

function resetGlobalVariables(){
    score = 0;
    ballSpeed = 0.2;
    x1 = canvas.width/2;
    y1 = canvas.height-30;
    x2 = canvas.width/3;
    y2 = canvas.height-60;
    x3 = canvas.width/4;
    y3 = canvas.height-90;
    dy1 = -0.2;
    dy2 = -0.2;
    dy3 = -0.2;
}

function drawMenu(){

var bgImage = document.createElement("img");
var logoImage = document.createElement("img");
var playImage = document.createElement("img");
var settingsImage = document.createElement("img");
var exitImage = document.createElement("img");
var baloonImage = document.createElement("img");

bgImage.src = "Images/Background.jpg";
logoImage.src = "Images/logo.png";
playImage.src = "Images/play.png";
settingsImage.src = "Images/settings.png";
exitImage.src = "Images/exit.png";
baloonImage.src = "Images/baloon.jpg";

bgImage.onload = function(){
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
};
logoImage.onload = function(){
    ctx.drawImage(logoImage, 0, 0, 50, 50);
};
playImage.onload = function(){
    ctx.drawImage(playImage, playX, playY, playW, playH);
};
settingsImage.onload = function(){
    ctx.drawImage(settingsImage, settingsX, settingsY, settingsW, settingsH);
};
exitImage.onload = function(){
    ctx.drawImage(exitImage, exitX, exitY, exitW, exitH);
};


}

function mouseMoveHandler(e){
    if (dragOne && escPressed === false){
        x1 = e.clientX - canvas.offsetLeft;
        y1 = e.clientY - canvas.offsetTop;
    }else if (dragTwo && escPressed === false){
        x2 = e.clientX - canvas.offsetLeft;
        y2 = e.clientY - canvas.offsetTop;
    }else if (dragThree && escPressed === false){
        x3 = e.clientX - canvas.offsetLeft;
        y3 = e.clientY - canvas.offsetTop;
    }
}
function mouseDownHandler(e){
    if ((e.clientX - canvas.offsetLeft < x1+ballRadius && e.clientX - canvas.offsetLeft > x1-ballRadius)  && (e.clientY - canvas.offsetTop < y1+ballRadius && e.clientY - canvas.offsetTop > y1-ballRadius)){
        dragOne = true;
        dy1 = 0;          
    }else if ((e.clientX - canvas.offsetLeft < x2+ballRadius && e.clientX - canvas.offsetLeft > x2-ballRadius)  && (e.clientY - canvas.offsetTop < y2+ballRadius && e.clientY - canvas.offsetTop > y2-ballRadius)){
        dragTwo = true;
        dy2 = 0;
    }else if ((e.clientX - canvas.offsetLeft < x3+ballRadius && e.clientX - canvas.offsetLeft > x3-ballRadius)  && (e.clientY - canvas.offsetTop < y3+ballRadius && e.clientY - canvas.offsetTop > y3-ballRadius)){
        dragThree = true;
        dy3 = 0;
    }
    if(escPressed === true){
        if((e.clientX - canvas.offsetLeft < playX+playW && e.clientX - canvas.offsetLeft > playX-playW)  && (e.clientY - canvas.offsetTop < playY+playH && e.clientY - canvas.offsetTop > playY-playH)){
            if(newGame){
                resetGlobalVariables();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                newGame = false;
            }
            gamePaused = setInterval(draw, 10);
            escPressed = false;
        }else if((e.clientX - canvas.offsetLeft < settingsX+settingsW && e.clientX - canvas.offsetLeft > settingsX-settingsW)  && (e.clientY - canvas.offsetTop < settingsY+settingsH && e.clientY - canvas.offsetTop > settingsY-settingsH)){
            alert("Open settings");
            escPressed = false;
        }else if((e.clientX - canvas.offsetLeft < exitX+exitW && e.clientX - canvas.offsetLeft > exitX-exitW)  && (e.clientY - canvas.offsetTop < exitY+exitH && e.clientY - canvas.offsetTop > exitY-exitH)){
            alert("Close game");
            escPressed = false;
        }
    }
}
function mouseUpHandler(e){
    dragOne = false;
    dragTwo = false;
    dragThree = false;
    dy1 = -ballSpeed;
    dy2 = -ballSpeed;
    dy3 = -ballSpeed;
}
function menuHandler(e){
    if(e.keyCode == 27 && escPressed === false){
        clearInterval(gamePaused);
        escPressed = true;
        drawMenu();
    }else if (e.keyCode == 27 && escPressed === true){
        gamePaused = setInterval(draw, 10);
        escPressed = false;
    }
}
function drawBallOne(){
    ctx.beginPath();
    ctx.arc(x1, y1, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBallTwo(){
    ctx.beginPath();
    ctx.arc(x2, y2, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#FF3030";
    ctx.fill();
    ctx.closePath();
}
function drawBallThree(){
    ctx.beginPath();
    ctx.arc(x3, y3, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#00AD00";
    ctx.fill();
    ctx.closePath();
}
function drawHole(){
    ctx.beginPath();
    ctx.arc(holeX, holeY, holeRadius, 0, Math.PI*2);
    ctx.fillStyle = holeColor[holeColorChoice];
    ctx.fill();
    ctx.closePath();
}
function randomPick(){
    holeX = Math.floor((Math.random() * (canvas.width-2*holeRadius))+1)+holeRadius;
    holeY = Math.floor((Math.random() * (canvas.height-2*holeRadius))+1)+holeRadius;
    holeColorChoice =  Math.floor(Math.random() * 3);
}
function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var d12 = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
    var d23 = Math.sqrt( (x2-x3)*(x2-x3) + (y2-y3)*(y2-y3) );
    var d31 = Math.sqrt( (x3-x1)*(x3-x1) + (y3-y1)*(y3-y1) );
    if (d12 < ballRadius*2){
        if(x1 < x2){
            if (dragOne || (dragThree && d31 < ballRadius*2)){
                x2 = x2 + (ballRadius*2 - d12);
            }else if(dragTwo || (dragThree && d23 < ballRadius*2)){
                x1 = x1 - (ballRadius*2 - d12);
            }
        }else if(x1 >= x2){
            if (dragOne || (dragThree && d31 < ballRadius*2)){
                x2 = x2 - (ballRadius*2 - d12);
            }else if(dragTwo || (dragThree && d23 < ballRadius*2)){
                x1 = x1 + (ballRadius*2 - d12);
            }
        }
    }
    if (d23 < ballRadius*2){
        if(x2 < x3){
            if (dragTwo || (dragOne && d12 < ballRadius*2)){
                x3 = x3 + (ballRadius*2 - d23);
            }else if(dragThree || (dragOne && d31 < ballRadius*2)){
                x2 = x2 - (ballRadius*2 - d23);
            }
        }else if(x2 >= x3){
            if (dragTwo || (dragOne && d12 < ballRadius*2)){
                x3 = x3 - (ballRadius*2 - d23);
            }else if(dragThree || (dragOne && d31 < ballRadius*2)){
                x2 = x2 + (ballRadius*2 - d23);
            }
        }
    }    
    if (d31< ballRadius*2){
        if(x3 < x1){
            if (dragThree || (dragTwo && d23 < ballRadius*2)){
                x1 = x1 + (ballRadius*2 - d31);
            }else if(dragOne || (dragTwo && d12 < ballRadius*2)){
                x3 = x3 - (ballRadius*2 - d31);
            }
        }else if(x3 >= x1){
            if (dragThree || (dragTwo && d23 < ballRadius*2)){
                x1 = x1 - (ballRadius*2 - d31);
            }else if(dragOne || (dragTwo && d12 < ballRadius*2)){
                x3 = x3 + (ballRadius*2 - d31);
            }
        }
    }  
    if(x1-ballRadius > holeX-holeRadius && x1+ballRadius < holeX+holeRadius && y1-ballRadius > holeY-holeRadius && y1+ballRadius < holeY+holeRadius && holeColorChoice === 0 && dragOne === false){
        randomPick();
        x1 = canvas.width/2 - ballRadius;
        y1 = canvas.height - 2*ballRadius;
        score++;
        ballSpeed = ballSpeed + 0.1;
    }
    if(x2-ballRadius > holeX-holeRadius && x2+ballRadius < holeX+holeRadius && y2-ballRadius > holeY-holeRadius && y2+ballRadius < holeY+holeRadius && holeColorChoice === 1 && dragTwo === false){
        randomPick();
        x2 = canvas.width/2 + 2*ballRadius;
        y2 = canvas.height - 2*ballRadius;
        score++;
        ballSpeed = ballSpeed + 0.1;
    }
    if(x3-ballRadius > holeX-holeRadius && x3+ballRadius < holeX+holeRadius && y3-ballRadius > holeY-holeRadius && y3+ballRadius < holeY+holeRadius && holeColorChoice === 2 && dragThree === false){
        randomPick();
        x3 = canvas.width/3 - ballRadius;
        y3 = canvas.height - 2*ballRadius;
        score++;
        ballSpeed = ballSpeed + 0.1;
    }
    drawHole();
    drawBallOne();															
    drawBallTwo();
    drawBallThree();
    drawScore();                                                        
    if(x1 + dx > canvas.width-ballRadius || x1 + dx < ballRadius || y1 + dy1 < ballRadius ||  y1 + dy1 > canvas.height-ballRadius || x2 + dx > canvas.width-ballRadius || x2 + dx < ballRadius || y2 + dy2 < ballRadius ||  y2 + dy2 > canvas.height-ballRadius || x3 + dx > canvas.width-ballRadius || x3 + dx < ballRadius || y3 + dy3 < ballRadius ||  y3 + dy3 > canvas.height-ballRadius) {
        drawMenu();
        newGame = true;
        escPressed = true;
        clearInterval(gamePaused);
    }
    y1 += dy1;
    y2 += dy2;
    y3 += dy3;
}


//    requestAnimationFrame(draw);        // umsto setInterval(draw, 10); koristimo ovu funkciju unutar draw funkicje.
// gamePaused = setInterval(draw, 10);
drawMenu();
//draw();                                 // Takodje moramo da pozovemo draw funkicju na kraju naseg programa tamo gde bi stajalo setInterval(draw, 10);

