// Set up!
var a_canvas = document.getElementById("a");
var context = a_canvas.getContext("2d");

// size of canvas TODO: set by getting canvas attributes
var XS = 800;
var YS = 800;

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

// TODO: draw pulsar lines

// TODO: draw pulsar rot. period text
//context.font = "30px Garamond";
//context.fillText("Hello, World!",15,175);

// TODO: draw z-axis marker
