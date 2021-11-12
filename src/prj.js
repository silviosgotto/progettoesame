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
  var x = w * Math.random();
  var y = h * Math.random();
  var posDot = [];
  posDot = [x, y];
  return posDot;
}



////////////////////////////////////////////////////////////////////////
                              /*NEURONI*/
////////////////////////////////////////////////////////////////////////

class Neurons{
  constructor(n, width, height, ctx, sigma, eps){
    this.n = n;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.posNeu = [];
    this.sigma = sigma;
    this.eps = eps;
  }

  setPosNeu(){
    const pos = [];
    for(var i = 0; i < this.n; i++){
        var [x, y] = [(this.width)*Math.random(), (this.height)*Math.random()];
        pos[i] = [x, y];
    }
    this.posNeu = pos;
    return pos;
  }
  
  initNeurons(pos){
    this.ctx.beginPath();
    for(var i = 0; i < pos.length; i++){
      this.ctx.arc(pos[i][0], pos[i][1], 1, 0, 2 * Math.PI, true);
      this.ctx.strokeStyle = "red";
      this.ctx.stroke();
      /*if ( i == 0){
          this.ctx.moveTo(pos[i][0], pos[i][1]);
          //this.ctx.stroke();
      }
      else{
          this.ctx.lineTo(pos[i][0], pos[i][1]);
          this.ctx.lineWidth = 0.5;
          //this.ctx.stroke();
      }*/
      
    }
  }

  init(){
    var posNeu = this.setPosNeu();
    this.initNeurons(posNeu);
  }

  drawNeurons(posNeu){
    this.ctx.beginPath();
    for(var i = 0; i < posNeu.length; i++){
      this.ctx.arc(posNeu[i][0], posNeu[i][1], 1, 0, 2 * Math.PI, true);
    }
    this.ctx.stroke();
  }
  
  learning(posDot){
    var min = 0;
    var distmin = 0;
    var x2 = posDot[0];
    var y2 = posDot[1];
    for(var i = 0; i < this.posNeu.length; i++){
      var x1 = this.posNeu[i][0];
      var y1 = this.posNeu[i][1];
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

    for(var j = 0; j < this.posNeu.length; j++){
      this.posNeu[j][0] = this.posNeu[j][0] + this.eps * Math.exp(-Math.pow(j-min, 2) / (2 * Math.pow(this.sigma, 2))) * (x2 - this.posNeu[j][0]);
      this.posNeu[j][1] = this.posNeu[j][1] + this.eps * Math.exp(-Math.pow(j-min, 2) / (2 * Math.pow(this.sigma, 2))) * (y2 - this.posNeu[j][1]);
    }

    this.drawNeurons(this.posNeu);
    /*this.sigma = 0.9 * this.sigma;
    this.eps = 0.95 * this.eps;*/

  }
}

sigma = 25;
eps = 0.2;
const n1 = new Neurons(1000, w, h, ctxq, sigma, eps);
n1.init();

function start(){
  ctxq.clearRect(0, 0, w, h);
  var posDot = [];
  posDot = getPosDot();
  n1.learning(posDot);

}

setInterval(() => start(), 10) //set interval con getposdot

