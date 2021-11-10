
/*
SPAWN PUNTINI
*/

var w = document.getElementById('canvas').width;
var h = document.getElementById('canvas').height;
console.log(w, h);
function getPos(){
  return [w * Math.random(), h * Math.random()];
}

function positions(){
  var [x, y] = getPos(); 
  return [x, y];
}

const c = document.getElementById('canvas');

function point(x, y, canvas){
  canvas.beginPath();
  canvas.arc(x, y, 1, 0, 2 * Math.PI, true);
  canvas.stroke();
}

ctx = c.getContext("2d");
const pos = [];

for (j = 0; j < 2000; j++){
  pos[j] = positions();
  console.log(pos[j][0], pos[j][1]);
  point(pos[j][0], pos[j][1], ctx);
}



