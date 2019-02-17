// Benji Leavitt
// 02/20/2019

var gl;
var canvas;
var levelTime;

var shipShader;
var wallShader;
var finishShader;

var up;
var down;
var left;
var right;

var lockKeys = false;

var mspf;

var start = true;

var level;
var levels;
var numPassed;
var scores;

var frameNum;

var clock;

var ship;

var timeLabel;
var parLabel;
var levelLabel;

var scoreSheet;

function init()
{
    timeLabel = document.getElementById("time-label");
    parLabel = document.getElementById("par-label");
    levelLabel = document.getElementById("levelnum-label");
    scoreSheet = document.getElementById("scores");

    up = false;
    down = false;
    right = false;
    left = false;

    mspf = 16;
    levelTime = 0;
    ship = Object.create(Ship);
    ship.x_location = 0.0;
    ship.y_location = 0.0;

    level = 0;

    // set above 0 for TEST MODE
    numPassed = 0;

    levels = [];
    scores = [];
    buildLevels();

    initGraphics();

    initLevel();
}

function initGraphics()
{
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl)
        alert( "WebGL is not available" );
    gl.viewport( 0, 0, 800, 800 );   // x, y, width, height
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.disable(gl.DEPTH_TEST);

    shipShader = initShaders(gl, "ship-v-shader", "ship-f-shader");
    wallShader = initShaders(gl, "wall-v-shader", "wall-f-shader");
    finishShader = initShaders(gl, "wall-v-shader", "finish-f-shader");
}

function run()
{
    start = false;
    frameNum = 0;
    clock = setInterval(frame, mspf, mspf);
}

function initLevel()
{
    ship.x_location = levels[level].start_location[0];
    ship.y_location = levels[level].start_location[1];
    ship.direction = levels[level].start_direction;

    levelLabel.innerHTML = "Level " + level;
    parLabel.innerHTML = "Par Time: " + Number((levels[level].par_time / 1000.0)).toFixed(2) + "s";
    timeLabel.innerHTML = "Time: " + Number(levelTime / 1000.0).toFixed(2) + "s";

    drawWalls();
    drawShip();
    buildScoresheet();
}

function failLevel()
{
    lockKeys = true;
    clearInterval(clock);
    initLevel();
    levelTime = 0.0;
    start = true;
}

function passLevel()
{
    if(scores[level] == null || scores[level] > levelTime)
        scores[level] = levelTime;
    buildScoresheet();

    if(level == numPassed)
        numPassed = level+1;

    lockKeys = true;
    console.log("Passed Level.");

    nextLevel();
}

function frame(msperframe)
{
    console.log(level + ", " + numPassed);

    levelTime += msperframe;
    timeLabel.innerHTML = "Time: " + Number(levelTime / 1000.0).toFixed(2) + "s";
    frameNum++;
    shipMovement();

    if(shipCaptured())
        passLevel();

    if(shipCollision())
        failLevel();

    gl.clear( gl.COLOR_BUFFER_BIT );
    drawWalls();
    drawShip();

}

function buildScoresheet()
{
    var scoreText = "";

    for(var i = 0; i < numPassed; i++)
    {
        scoreText += i + ") ";

        if(scores[i] > levels[i].par_time)
            scoreText += '<span style="color: #DD0000;">' + Number(scores[i] / 1000.0).toFixed(2) + "s</span>";
        else
            scoreText += Number(scores[i] / 1000.0).toFixed(2) + "s";

        scoreText += " / " + Number(levels[i].par_time / 1000.0).toFixed(2) + "s<br/>";
    }

    scoreSheet.innerHTML = scoreText;
}

function drawShip()
{
    gl.useProgram(shipShader);

    var tMat = translateShape(ship.x_location, ship.y_location);
    var rMat = rotateShape(-ship.direction);

    //console.log(dotMat3(tMat, rMat));

    var shipBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shipBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(ship.vertices), gl.STATIC_DRAW);

    var pointStepAttr = gl.getAttribLocation(shipShader, "pointStep");
    gl.vertexAttribPointer(pointStepAttr, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(pointStepAttr);

    var transformMat = dotMat3(tMat, rMat);//translateShape(ship.x_location, ship.y_location)
    M = gl.getUniformLocation(shipShader, "M");
    gl.uniformMatrix3fv(M, false, transformMat);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, ship.vertices.length);
}

function drawWalls()
{
    gl.useProgram(wallShader);

    var wallBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, wallBuffer);

    for(var i = 0; i < levels[level].walls.length; i++)
    {
        gl.bufferData(gl.ARRAY_BUFFER, flatten(levels[level].walls[i]), gl.STATIC_DRAW);

        var pointStepAtt = gl.getAttribLocation(wallShader, "pointStep");
        gl.vertexAttribPointer(pointStepAtt, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(pointStepAtt);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, levels[level].walls[i].length);
    }

    gl.useProgram(finishShader);

    gl.bufferData(gl.ARRAY_BUFFER, flatten(levels[level].finish_box), gl.STATIC_DRAW);
    var pointStepAtt = gl.getAttribLocation(finishShader, "pointStep");
    gl.vertexAttribPointer(pointStepAtt, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(pointStepAtt);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function shipMovement()
{
    if(up && !down)
    {
        if(ship.speed >= 0)
            ship.accelerateTo(ship.acc_rate, ship.max_speed, ship.acc_rate, true);
        else
            ship.accelerateTo(ship.acc_rate, 0.0, ship.acc_rate, true);
    }
    else if(!up && !down)
    {
        ship.accelerateTo(ship.coast_rate, 0.0, ship.acc_rate, true);
    }

    else if(!up && down)
    {
        if(ship.speed <= 0)
            ship.accelerateTo(ship.acc_rate, -ship.max_speed, ship.acc_rate, true);
        else
            ship.accelerateTo(ship.acc_rate, 0.0, ship.acc_rate, true);
    }
    else if(up && down)
    {

        ship.accelerateTo(ship.coast_rate, 0.0, ship.acc_rate, true);
    }

    if(right == true)
    {
        ship.rotate(-1.0);
    }
    if(left == true)
    {
        ship.rotate(1.0);
    }

    ship.move();
}

function reset()
{
    start = true;
}

function nextLevel()
{
    clearInterval(clock);

    if(level >= levels.length-1)
        return;

    if(level < numPassed)
        level++;

    start = true;
    levelTime = 0.0;
    initLevel();
}

function previousLevel()
{

    clearInterval(clock);

    if(level <= 0)
        return;

    level--;
    start = true;
    levelTime = 0.0;
    initLevel();
}
