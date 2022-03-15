var cs = ''; //control string

var map = [
  '00000000',
  '000000p0',
  '00000000',
  '00000000',
  '00000000',
  '00000000', 
  '0>000000', // > < v
  '00000000'  
];

var origin_map;

var sp = {}; //spaceship position = vị trí phi thuyền
var pp = {}; // planet position = vị trí hành tinh

function analysAndshowMap() {
  var s = '<table>';
  for (var i=0; i<map.length; i++) { // so dong 
    s += '<tr>';
    for (var j=0; j<map[i].length; j++) { // length cua '00000000' , 8 , so cot 
      if (map[i][j] === '0') s += '<td>';
      if (map[i][j] === 'p')  
      {
        s += '<td class=planet>';
        pp.row = i;
        pp.col = j;
      }
      if (map[i][j] === '^')  {
        s += '<td class=upspaceship>';
        sp.row = i;
        sp.col = j;
      }
      if (map[i][j] === '>')  {
        s += '<td class=rightspaceship>';
        sp.row = i;
        sp.col = j;
      }
      if (map[i][j] === 'v')  {
        s += '<td class=downspaceship>';
        sp.row = i;
        sp.col = j;
      }
      if (map[i][j] === '<')  {
        s += '<td class=leftspaceship>';
        sp.row = i;
        sp.col = j;
      }
      s += '</td>';
    }
    s += '</tr>';
  }
  s += '</table>';
  document.getElementById("map").innerHTML = s;
}

(function init() {
  origin_map = [...map];
  analysAndshowMap();
})();

var savemap = [];
var step = 0;

function saveMAP()
{
  step++;
  var temp = map.slice(0);
  savemap.push(temp);
  
}
function run() {
  map = [...origin_map];  
  for (var i=0; i<cs.length; i++) 
  {
    analysAndshowMap();
    if (cs[i] === 'F') 
      setTimeout(moveSpaceship, 1500);
    if (cs[i] === 'W') 
      setTimeout(rotateWSpaceship, 1500);
    if (cs[i] === 'C') 
      setTimeout(rotateCSpaceship, 1500);
    
  }
}

function notice()
{
  alert("Congratulation!! You win");
}

function addControl(t) {
  cs += t;
  saveMAP();
  if(cs.slice(-1) === 'F')
    moveSpaceship();
  if(cs.slice(-1) === 'W')
    rotateWSpaceship();
  if(cs.slice(-1) === 'C')
    rotateCSpaceship();
  if(map[pp.row][pp.col] === map[sp.row][sp.col])
    setTimeout(notice,500);
}

function undo() 
{ 
  if(step === 0)
    alert("You are from beginning!!");
  if (step < 0)
    step = 0;
  if (step > 0) 
  {
    step--;
    map = savemap[savemap.length-1];
    savemap.pop(); 
    analysAndshowMap();
  }
}

function warn()
{
  alert("You are on the edge!! Please turn left or right");
}

function moveSpaceship() 
{
  if(sp.row === 0 && map[sp.row][sp.col] === '^')
    warn();
  if(sp.row === 7 && map[sp.row][sp.col] === 'v')
    warn();
  if(sp.col === 0 && map[sp.row][sp.col] === '<')
    warn();
  if(sp.col === 7 && map[sp.row][sp.col] === '>')
    warn();
  if (map[sp.row][sp.col] === '^' && sp.row !== 0) 
  {
    var srl = map[sp.row].slice(0,sp.col); //0^000000 => 0
    var srr = map[sp.row].slice(sp.col+1); //0^000000 => 000000
    map[sp.row] = srl + '0' + srr;
    var surl = map[sp.row-1].slice(0,sp.col);
    var surr = map[sp.row-1].slice(sp.col+1); 
    map[sp.row-1] = surl + '^' + surr;
  }
  
  if (map[sp.row][sp.col] === 'v' && sp.row !== 7) 
  {
    var srl = map[sp.row].slice(0,sp.col);
    var srr = map[sp.row].slice(sp.col+1); 
    map[sp.row] = srl + '0' + srr;
    console.log(map[sp.row][sp.col]);
    var surl = map[sp.row+1].slice(0,sp.col);
    var surr = map[sp.row+1].slice(sp.col+1); 
    map[sp.row+1] = surl + 'v' + surr;
  }
  
  if (map[sp.row][sp.col] === '>' && sp.col !== 7) 
  {
    var srl = map[sp.row].slice(0,sp.col); 
    var srr = map[sp.row].slice(sp.col+2); 
    map[sp.row] = srl + '0>' + srr;
    console.log(map[sp.row][sp.col]);
  }
  
  if (map[sp.row][sp.col] === '<' && sp.col !== 0) 
  {
    var srl = map[sp.row].slice(0,sp.col-1); 
    var srr = map[sp.row].slice(sp.col+2); 
    map[sp.row] = srl + '<00' + srr;
    if(srl === '000000')
      map[sp.row] = srl + '<0' + srr;
    console.log(map[sp.row][sp.col]);
  }
  analysAndshowMap();
}

function rotateWSpaceship() // rotate counter-clockwise
{
  var tmp = map[sp.row][sp.col];
  console.log(tmp);
  switch(tmp)
  {
    case '>':
      var srl = map[sp.row].slice(0,sp.col); 
      var srr = map[sp.row].slice(sp.col+1); 
      map[sp.row] = srl + '^' + srr;
      break;
    case '^':
      var srl = map[sp.row].slice(0,sp.col);
      var srr = map[sp.row].slice(sp.col+1); 
      map[sp.row] = srl + '<' + srr;
      break;
    case '<':
      var srl = map[sp.row].slice(0,sp.col); 
      var srr = map[sp.row].slice(sp.col+1); 
      map[sp.row] = srl + 'v' + srr;
      break;
    case 'v':
      var srl = map[sp.row].slice(0,sp.col); 
      var srr = map[sp.row].slice(sp.col+1); 
      map[sp.row] = srl + '>' + srr;
      break;
  }
  analysAndshowMap();
}

function rotateCSpaceship() // rotate clockwise
{
  var tmp = map[sp.row][sp.col];
  switch(tmp)
  {
    case '>':
      var srl = map[sp.row].slice(0,sp.col); //0>000000 => 0
      var srr = map[sp.row].slice(sp.col+1); //0>000000 => 000000
      map[sp.row] = srl + 'v' + srr;
      break;
    case 'v':
      var srl = map[sp.row].slice(0,sp.col); //0>000000 => 0
      var srr = map[sp.row].slice(sp.col+1); //0>000000 => 000000
      map[sp.row] = srl + '<' + srr;
      break;
    case '<':
      var srl = map[sp.row].slice(0,sp.col); //0>000000 => 0
      var srr = map[sp.row].slice(sp.col+1); //0>000000 => 000000
      map[sp.row] = srl + '^' + srr;
      break;
    case '^':
      var srl = map[sp.row].slice(0,sp.col); //0>000000 => 0
      var srr = map[sp.row].slice(sp.col+1); //0>000000 => 000000
      map[sp.row] = srl + '>' + srr;
      break;
  }
  analysAndshowMap();
}

function showControl() {
  var s = '';
  for (var i=0; i<cs.length; i++) { //cs = 'FFCCC';
    if (cs[i] === 'F') //cs[0] == 'F'
      s += "<div class='move_forward control_button'></div>";
    if (cs[i] === 'C')
      s += "<div class='clockwise control_button'></div>";
    if (cs[i] === 'W')
      s += "<div class='counter_clockwise control_button'></div>";
  }
  document.getElementById("code").innerHTML = s;
}

