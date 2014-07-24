// Set up!
var a_canvas = document.getElementById("a");
var context = a_canvas.getContext("2d");

// size of canvas TODO: set by getting canvas attributes
var XS = 1200;
var YS = 800;

var PAD = 50; // padding between canvas edge and drawing

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
  ctx.moveTo(EARTH.x, EARTH.y);
  var cartesian = polar2cartesian(dir, dist);
  ctx.lineTo(EARTH.x + cartesian.mX*GALACTIC_CENTER.dist,
             EARTH.y + cartesian.mY*GALACTIC_CENTER.dist);
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
  ctx.moveTo(EARTH.x, EARTH.y);
  ctx.lineTo(this.x(), this.y());
  ctx.stroke();
};
Pulsar.prototype.setCoords = function(){
    var cartesian = polar2cartesian(this.angle, this.dist);
    this._x = EARTH.x + cartesian.mX*GALACTIC_CENTER.dist;
    this._y = EARTH.y + cartesian.mY*GALACTIC_CENTER.dist;
}
Pulsar.prototype.x = function(){
    if (this._x){
        return this._x;
    } else {
        this.setCoords();
        return this._x;
    }
};
Pulsar.prototype.y = function(){
    if (this._y){
        return this._y;
    } else {
        this.setCoords();
        return this._y;
    }
};
Pulsar.prototype.drawPeriod = function(ctx){
    ctx.save();
    ctx.font="10px Courier";
    var LINE_HEIGHT = 10;
    ctx.translate(this.x(), this.y());
    ctx.rotate(Math.PI * this.angle / 180);
    
    this.tweakBinaryPosition(ctx);
    
    ctx.textAlign = 'left';
    ctx.fillText(this.getPeriodBinary(), 0, LINE_HEIGHT / 2);
    
    ctx.restore();  
};
Pulsar.prototype.tweakBinaryPosition = function(ctx){
    // moves the location of the given context from the line endpoint to the point where the binary should be drawn
    if (this.y() + 2*PAD > YS || 
        this.y() - 2*PAD < 0 ||
        this.x() - 2*PAD < 0 ){
        ctx.translate(-2*PAD, 10);
    } else {
        return;
    }
};
Pulsar.prototype.getPeriodBinary = function(){ 
    this.period.binary = this.period.toString(2).replace('0','-').replace('1','|');
    return this.period.binary;
};

var PULSARS =[new Pulsar('J1731-4744', .27, 0, 17, 1178486506),
              new Pulsar('J1456-6843', .02, 0, -49, 374101871),
              new Pulsar('J1243-6423', .56, 0, 58, 551117432),
              new Pulsar('J0835-4510', .15, 0, -95, 126726823),
              new Pulsar('J0953+0755', .01, 0, 129, 359455043),
              new Pulsar('J0826+2637', .02,	0, 162, 753751947),
              new Pulsar('J0534+2200', .18, 0, 174, 47057538),
              new Pulsar('J0528+2200', .11, 0, 177, 5320116676),
              new Pulsar('J0332+5434', .07, 0, -145, 1014906390),
              new Pulsar('J2219+4754', .10, 0, 97, 764842161),
              new Pulsar('J2018+2839', .03, 0, -68, 792520205),
              new Pulsar('J1935+1616', .40, 0, -52, 509549854),
              new Pulsar('J1932+1059', .01, 0, 45, 321746104),
              new Pulsar('J1645-0317', .04, 0, -16, 550675372)];

// draw line to galactic center
drawLine(context, 1, 0);
              
// draw pulsar lines
for (index = 0; index < PULSARS.length; ++index) {
    PULSARS[index].drawLine(context);
    PULSARS[index].drawPeriod(context);
}

// TODO: draw pulsar rot. period text
//context.font = "30px Garamond";
//context.fillText("Hello, World!",15,175);

// TODO: draw z-axis marker
