// Set up!
var canvas = document.getElementById("pulsar_map");
var dataTable = document.getElementById('data');
var pulsarSelectTable = document.getElementById('pulsar-selector');

var context = canvas.getContext("2d");

var PAD = 50; // padding between canvas edge and drawing

var GALACTIC_CENTER ={};
GALACTIC_CENTER.x = canvas.width-PAD;
GALACTIC_CENTER.y = canvas.height/2;
GALACTIC_CENTER.dist = GALACTIC_CENTER.x *2/3;  // TODO: determine this dynamically using pulsar distances

KPC_TO_GCR = 1/7.611;  // conversion from kiloparsecs to galactic-center ratio units
S_TO_H_UNITS = 1420405752;  // conversion from seconds to Hydrogen spin-flip transition times

var EARTH = {};
EARTH.x = GALACTIC_CENTER.x - GALACTIC_CENTER.dist;
EARTH.y = GALACTIC_CENTER.y;
EARTH.r = 2; // radius of circle [px]

var PULSARS = pulsarSet('empty');
document.getElementById('original').checked = true;  // because drawMape('original') is called in onload

// Draw the center point
context.fillStyle = "black";

context.strokeStyle = "black";
context.lineWidth = 0.2;

context.font="10px Courier";
var LINE_HEIGHT = 10;  // height of a text line
var Y_SHIFT = -2;  //amount to move up before drawing text
var X_SHIFT = 5;  // amount to move right before drawing text
context.textAlign = 'left';

function drawMap(type){
    // select correct pulsar info
    PULSARS = new pulsarSet( type );
        
    // Use the identity matrix to reset transforms
    context.setTransform(1, 0, 0, 1, 0, 0);
    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.beginPath();
    context.arc(EARTH.x, EARTH.y, EARTH.r, 0, 2*Math.PI);
    context.closePath();
    context.fill();

    // draw line to galactic center
    drawLine(context, 1, 0);
    context.save();
    context.translate(GALACTIC_CENTER.x, GALACTIC_CENTER.y);
    context.fillText('|', -3, LINE_HEIGHT / 2 + Y_SHIFT );
    context.restore();
                  
    PULSARS.drawPulsars(context);
    
}

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

// pulsarSet "class"
function pulsarSet( type ){
    if (type == 'voyager' || type == 'pioneer' || type == 'original'){
        console.log('original voyager/pioneer pulsar set selected');
        $('#customize').hide();
        $('#data').show();
        this.list =[new Pulsar('J1731-4744', .27, 0, 17,   1178486506),
                      new Pulsar('J1456-6843', .02, 0, -49,  374101871),
                      new Pulsar('J1243-6423', .56, 0, 58,   551117432),
                      new Pulsar('J0835-4510', .15, 0, 95,  126726823),
                      new Pulsar('J0953+0755', .01, 0, 129,  359455043),
                      new Pulsar('J0826+2637', .02,	0, 162,  753751947),
                      new Pulsar('J0534+2200', .18, 0, 174,  47057538),
                      new Pulsar('J0528+2200', .11, 0, 177,  5320116676),
                      new Pulsar('J0332+5434', .07, 0, -145, 1014906390),
                      new Pulsar('J2219+4754', .10, 0, -97,  764842161),
                      new Pulsar('J2018+2839', .03, 0, -68,  792520205),
                      new Pulsar('J1935+1616', .40, 0, -52,  509549854),
                      new Pulsar('J1932+1059', .01, 0, 45,   321746104),
                      new Pulsar('J1645-0317', .04, 0, -16,  550675372)];
        this.makeDataTable();
    } else if (type == 'original-1989' || type == '1989'){
        console.log('original voyager/pioneer set with updated values for June 1989 selected');
        $('#customize').hide();
        $('#data').show();
        this.list =[new Pulsar('J1731-4744', 0.6539219551,  0, 18.15548387,   1178693580),
                      new Pulsar('J1456-6843', 0.0590855341,  0, -47.68774194,  374101942.8),
                      new Pulsar('J1243-6423', 1.509657075,   0, 57.97677419,   551800534.7),
                      new Pulsar('J0835-4510', 0.03807646827, 0, 95.83612903,  126882551.9),
                      new Pulsar('J0953+0755', 0.03413480489, 0, 122.8277419,  359455215.9),
                      new Pulsar('J0826+2637', 0.04727368283, 0, 151.803871,  753753243),
                      new Pulsar('J0534+2200', 0.26264617,    0, 173.2103226,  46993720.94),
                      new Pulsar('J0528+2200', 0.2993036395,  0, 174.1548387,  5320147752),
                      new Pulsar('J0332+5434', 0.1391407174,  0, -144.9883871, 1014907891),
                      new Pulsar('J2219+4754', 0.321639732,   0, -97.76064516,  764844211.8),
                      new Pulsar('J2018+2839', 0.1273551439,  0, -68.09290323,  792520332.8),
                      new Pulsar('J1935+1616', 0.5974247799,  0, -52.27290323,  509554102),
                      new Pulsar('J1932+1059', 0.04727368283, 0, 46.4516129,   321746951.7),
                      new Pulsar('J1645-0317', 0.3820785705,  0, -23.78064516,  550676677)];
        this.makeDataTable();                      
    } else if (type == '7yl4r') {
        console.log('custom set "7yl4r" selected');
        $('#customize').hide();
        $('#data').show();
        this.list =[new Pulsar('J1731-4744', 0.6539219551,  0, 18.15548387,   1178693580),
                      new Pulsar('J1456-6843', 0.0590855341,  0, -47.68774194,  374101942.8),

                      new Pulsar('J0835-4510', 0.03807646827, 0, 95.83612903,  126882551.9),
                      new Pulsar('J0953+0755', 0.03413480489, 0, 122.8277419,  359455215.9),
                      new Pulsar('J0826+2637', 0.04727368283, 0, 151.803871,  753753243),
                      new Pulsar('J0534+2200', 0.26264617,    0, 173.2103226,  46993720.94),

                      new Pulsar('J0332+5434', 0.1391407174,  0, -144.9883871, 1014907891),
                      new Pulsar('J2219+4754', 0.321639732,   0, -97.76064516,  764844211.8),
                      new Pulsar('J2018+2839', 0.1273551439,  0, -68.09290323,  792520332.8),
                      new Pulsar('J1935+1616', 0.5974247799,  0, -52.27290323,  509554102),
                      new Pulsar('J1932+1059', 0.04727368283, 0, 46.4516129,   321746951.7),
                      new Pulsar('J1645-0317', 0.3820785705,  0, -23.78064516,  550676677)];
        this.makeDataTable();                      
    } else if (type =='custom'){
        $("#customize").show();
        $("#data").hide();
        this.list = [];
        this.loadPulsarFile();
    } else if (type == 'all'){
        // shows all known pulsars in the db (hold on to your butts)
        console.log('using all pulsars in the set... Hold on to your butts.');
        $('#customize').hide();
        $('#data').prepend('Loading alotta data... Hold on to your butts.<br><br>')
        $('#data').show();
        this.loadPulsarFile();
        this.list = this.allPulsars;
        this.makeDataTable();
    } else {
        console.log('unknown pulsar set "'+type.toString()+'". empty pulsar set created.');
        this.list = [];
    }
}
pulsarSet.prototype.makeDataTable = function(){
    var TABLE_HEAD = 'PULSARS USED: <br> <table> <tr> <td>name</td> <td>distance [ratio of A* distance]</td> <td>z-coord [ratio of A* distance]</td> <td>degrees from A*</td> <td>period [H-transitions]</td></tr>';
    var TABLE_FOOT = '</table>';
    var html = TABLE_HEAD;
    for (index = 0; index < this.list.length; ++index) {
        html += this.list[index].getTableRow();
    }
    html += TABLE_FOOT;
    dataTable.innerHTML = html;
};
pulsarSet.prototype.loadPulsarFile = function(){
    // loads up the pulsar list file and makes the options table
    if (this.allPulsars){
        this.makePulsarOptionsTable();
        return;
    } else {
        var allList = [];  // store this for access inside callback
        $.get('/pulsarMap/pulsarTable.csv', function(dat) {
            var data = $.csv.toArrays(dat);
            for(var row in data) {
                var gal_x = data[row][11];
                var gal_y = data[row][12];
                var angle = (Math.tan( gal_y / gal_x ) * 180/Math.PI)%360;
                if (row == 0) {
                    allList = [ new Pulsar (data[row][1], data[row][9]*KPC_TO_GCR, data[row][10]*KPC_TO_GCR, angle, data[row][3]*S_TO_H_UNITS)];
                } else {
                    allList.push( new Pulsar (data[row][1], data[row][9]*KPC_TO_GCR, data[row][10]*KPC_TO_GCR, angle, data[row][3]*S_TO_H_UNITS));
                }
                // set galactic coords to reduce computation later
                //allList[allList.length-1]._x = EARTH.x + gal_x*KPC_TO_GCR*GALACTIC_CENTER.dist;
                //allList[allList.length-1]._y = EARTH.y + gal_y*KPC_TO_GCR*GALACTIC_CENTER.dist;
            }
            // NOTE: had to reference this as a global because the ajax call 
            PULSARS.allPulsars = allList;
            PULSARS.makePulsarOptionsTable();
        });
    }
};
pulsarSet.prototype.makePulsarOptionsTable = function(){
    // NOTE: don't call this until allPulsars is loaded!
    var TABLE_HEAD = 'PULSARS: <br> <table> <tr> <td>use?</td><td>name</td> <td>distance [ratio of A* distance]</td> <td>z-coord [ratio of A* distance]</td> <td>degrees from A*</td> <td>period [H-transitions]</td></tr>';
    var TABLE_FOOT = '</table>';
    var html = TABLE_HEAD;
    for (index = 0; index < this.allPulsars.length; ++index) {
        html += "<tr><td><input type='checkbox' onclick='PULSARS.togglePulsar("+index+")'></td>";
        html += this.allPulsars[index].getTableRow().slice(4);
    }
    html += TABLE_FOOT;
    pulsarSelectTable.innerHTML = html;
    };
pulsarSet.prototype.togglePulsar = function( ind ){
    // turns on or off pulsar with given index
    if (this.isInSet(this.allPulsars[ind].name)){
        console.log('removing pulsar "'+this.allPulsars[ind].name+'" from set.');
        this.removePulsar(this.allPulsars[ind].name);
    } else {
        console.log('adding pulsar "'+this.allPulsars[ind].name+'" to set.');
        this.addPulsar(this.allPulsars[ind]);
    }
};
pulsarSet.prototype.isInSet = function( pulsar_name ){
    // returns true if given pulsar is already in the set
    for (index = 0; index < this.list.length; ++index) {
        if (this.list[index].name == pulsar_name){
            return true;
        }
    } // else
    return false;
};
pulsarSet.prototype.addPulsar = function( pulsar_obj ){
    // adds the pulsar object and updates the map
    this.list.push(pulsar_obj);
    pulsar_obj.draw(context);
};
pulsarSet.prototype.removePulsar = function( pulsar_name){
    // removes a pulsar object from the list and updates the map
    console.log("TODO: remove pulsar");
}
pulsarSet.prototype.drawPulsars = function(ctx){
    // draws pulsar lines, z coords and binary 
    for (index = 0; index < this.list.length; ++index) {
        this.list[index].draw(ctx);
    }
}

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
    ctx.translate(this.x(), this.y());
    ctx.rotate(Math.PI * this.angle / 180);
    
    this.tweakBinaryPosition(ctx);
    
    ctx.fillText(this.getPeriodBinary(), X_SHIFT, LINE_HEIGHT / 2 + Y_SHIFT);
    
    ctx.restore();  
};
Pulsar.prototype.tweakBinaryPosition = function(ctx){
    // moves the location of the given context from the line endpoint to the point where the binary should be drawn
    if (this.y() + 3*PAD > canvas.height || 
        this.y() - 3*PAD < 0 ||
        this.x() - 3*PAD < 0 ){
        ctx.translate(-4*PAD, -9);
    } else {
        return;
    }
};
Pulsar.prototype.getPeriodBinary = function(){ 
    this.binary = this.period.toString(2);
    this.bin    = this.binary.replace(/0/g, '-').replace(/1/g, '|');
    return this.bin;
};
Pulsar.prototype.getTableRow = function(){
    var sep = '</td><td>'
    return '<tr><td>'+this.name.toString()+sep+this.dist.toString()+sep+this.z.toString()+sep+this.angle+sep+this.period+'</td></tr>';
};
Pulsar.prototype.draw = function( ctx ){
    // draws the pulsar line, z coord and rot period binary
    this.drawLine(ctx);
    this.drawPeriod(ctx);
    // TODO: draw z-axis marker
};
