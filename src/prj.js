////////////////////////////////////////////////////////////////////////
                              /*INIT*/
////////////////////////////////////////////////////////////////////////

const canvas = document.getElementById('canvas');
const ctxq = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;


////////////////////////////////////////////////////////////////////////
                              /*DOTS*/
////////////////////////////////////////////////////////////////////////

function getPosDot() {
  var rand = Math.random();
  if (rand >= 0 && rand<= 0.5){
    var x = w * Math.random();
    var y = h/2 * Math.random();
}
  else{
    var x = w * Math.random();
    var y = h/2 + ( h/2 * Math.random());
  }
  var posDot = [];
  posDot = [x, y];
  return posDot;
}



////////////////////////////////////////////////////////////////////////
                              /*NEURONI*/
////////////////////////////////////////////////////////////////////////

class Neurons{
  constructor(n, width, height, ctx){
    this.n = n;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.posNeu = [];
  }

  setPosNeu(){
    const pos = [];
    for(var i = 0; i < this.n; i++){
        var [x, y] = [this.width*Math.random(), this.height*Math.random()];
        pos[i] = [x, y];
    }
    this.posNeu = pos;
    return pos;
  }
  
  initNeurons(pos){
    for(var i = 0; i < pos.length; i++){
      this.ctx.arc(pos[i][0], pos[i][1], 5, 0, 2 * Math.PI, true);
      this.ctx.strokeStyle = "red";
      this.ctx.stroke();
      if ( i == 0){
          this.ctx.moveTo(pos[i][0], pos[i][1]);
          this.ctx.stroke();
      }
      else{
          this.ctx.lineTo(pos[i][0], pos[i][1]);
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
      }
    }
  }

  init(){
    var posNeu = this.setPosNeu();
    this.initNeurons(posNeu);
  }
  
  learning(posDot){
    var min = 0;
    var distmin = 0;
    for(var i = 0; i < this.posNeu.length; i++){
      var x1 = this.posNeu[i][0];
      var y1 = this.posNeu[i][1];
      var x2 = posDot[0];
      var y2 = posDot[1];
      var dist = Math.hypot(x2 - x1, y2 - y1);
      if (i == 0){
          distmin = dist;
          min = i;
      }
      else if (dist < distmin){
          min = i;
          distmin = dist;
      }
    }
  }

  
}

const n1 = new Neurons(100, w, h, ctxq);
n1.init();

function start(){
  var posDot = [];
  posDot = getPosDot();
  n1.learning(posDot);
}

//setInterval(() => start(), 1000) //set interval con getposdot

