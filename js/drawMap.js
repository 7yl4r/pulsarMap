// Set up!
var a_canvas = document.getElementById("a");
var context = a_canvas.getContext("2d");

// size of canvas TODO: set by getting canvas attributes
var XS = 1100;
var YS = 600;

var PAD = 20; // padding between canvas edge and drawing

var GALACTIC_CENTER ={};
GALACTIC_CENTER.x = XS-PAD;
GALACTIC_CENTER.y = YS/2;
GALACTIC_CENTER.dist = GALACTIC_CENTER.x *2/3;  // TODO: determine this dynamically using pulsar distances

var EARTH = {};
EARTH.x = GALACTIC_CENTER.x - GALACTIC_CENTER.dist;
EARTH.y = GALACTIC_CENTER.y;
EARTH.r = 5; // radius of circle [px]

// Draw the center point
context.fillStyle = "black";
context.beginPath();
context.arc(EARTH.x, EARTH.y, EARTH.r, 0, 2*Math.PI);
context.closePath();
context.fill();

function polar2cartesian(deg, r) {
    var rad = Math.PI * deg / 180;
    return {mX: r * Math.cos(rad), mY: r * Math.sin(rad)};
}

var drawLine = function(ctx, dist, dir){
  // draws a line from Earth given number of degrees from the galactic center(right) of length dist given as percent of galactic distance
  ctx.moveTo(Earth.x, Earth.y);
  var cartesian = polar2cartesian(dir, dist);
  ctx.lineTo(cartesian.mX, cartesian.mY)
  ctx.stroke();
};

// pulsar "class"
function Pulsar(name, dist, z, angle, period){
  this.name = name;
  this.dist = dist;  // distance from galactic center on galactic plane, in units of Earth-galactic center distance
  this.z    = z;  // height above/below galactic plane
  this.angle= angle;  // angle on galactic plane from galactic center
  this.period=period;  // rotational period (in H-transition units)
}
Pulsar.prototype.drawLine = function(ctx){
  drawLine(ctx, this.dist, this.angle)
};

var PULSARS =[new Pulsar('J1731-4744', 27, 0, 17, 1178486506),
              new Pulsar('J1456-6843',  2, 0, 49, 374101871),
              new Pulsar('J1243-6423', 56, 0, 58, 551117432)];
              
// draw pulsar lines
for (index = 0; index < PULSARS.length; ++index) {
    PULSARS[index].drawLine(context);
}

// TODO: draw pulsar rot. period text
//context.font = "30px Garamond";
//context.fillText("Hello, World!",15,175);

// TODO: draw z-axis marker
