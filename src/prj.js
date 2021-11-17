////////////////////////////////////////////////////////////////////////
                              /*INIT*/
////////////////////////////////////////////////////////////////////////
const c = new AudioContext();
var bpm = 240;
var oscillators = [];

const kick = document.getElementById('kick');
const ctxKick = kick.getContext("2d");
const wKick = kick.width;
const hKick = kick.height;

const snare = document.getElementById('snare');
const ctxSnare = snare.getContext("2d");
const wSnare = snare.width;
const hSnare = snare.height;

const PlayButt = document.getElementById('play');
PlayButt.disabled = "disabled";

////////////////////////////////////////////////////////////////////////
                              /*NEURONI*/
////////////////////////////////////////////////////////////////////////

class Neurons{
  constructor(n, width, height, ctx, shape){
    this.n = n;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.posNeu = [];
    this.shape = shape;
    this.sigma = 20;
    this.eps = 0.2;
    this.count = 0;
  }

  getShape(){
    return this.shape;
  }

  getposNeu(){
    return this.posNeu;
  }

  getEps(){
    return this.eps;
  }

  getId(){
    return thi.id;
  }

  setPosNeu(){
    if(this.shape == "rect"){
      for(var i = 0; i < this.n; i++){
        var [x, y] = [(this.width)*Math.random(), (this.height)*Math.random()];
        this.posNeu[i] = [x, y];
      }
    }
    else if(this.shape == "tri"){
      for(var i = 0; i < this.n; i++){
        var a = Math.random();
        var b = Math.random();
        var asqrt = Math.sqrt(a);
        var [x, y] = [(1 - asqrt) * 0 + asqrt * (1 - b) * (this.width / 2) + asqrt * b * this.width,  (1 - asqrt) * this.height + asqrt * (1 - b) * 0 + asqrt * b * this.height]
        this.posNeu[i] = [x, y];
      }
    }
  }

  init(){
    this.setPosNeu();
    this.drawNeurons();
  }

  drawNeurons(){
    this.ctx.beginPath();
    for(var i = 0; i < this.posNeu.length; i++){
      this.ctx.arc(this.posNeu[i][0], this.posNeu[i][1], 1, 0, 2 * Math.PI, true);
    }
    this.ctx.stroke();
  }

  getPosDot() {
    if(this.shape == "rect"){
      var x = this.width * Math.random();
      var y = this.height * Math.random();
      return [x, y];
    }
    else if(this.shape == "tri"){
      var r1 = Math.random();
      var r2 = Math.random();
      var sqrtr1 = Math.sqrt(r1);
    
      var x = (1 - sqrtr1) * 0 + (sqrtr1 * (1 - r2) * this.width) / 2 + sqrtr1 * r2 * this.width;
      var y = (1 - sqrtr1) * this.height + sqrtr1 * (1 - r2) * 0 + sqrtr1 * r2 * this.height;
      return [x, y];
    }
  }
  
  learning(){
    var min = 0;
    var distmin = 0;
    let posDot = this.getPosDot();
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
    this.drawNeurons();
    if (this.count % 5 == 0){
      this.sigma = 0.95 * this.sigma;
      this.eps = 0.999 * this.eps;
    }
    this.count++;
  }

  normalizeArray(arr){
    let min = Math.min(...arr);
    let max = Math.max(...arr);

    for(let i = 0; i<arr.length; i++){
      arr[i] = (arr[i]-min)/(max-min);
      if (arr[i] >= 0 && arr[i] < 0.25){
        arr[i] = 1;
      }
      else if( arr[i] >= 0.25 && arr[i]<0.50){
        arr[i] = 2;
      }
      else if(arr[i] >= 0.50 && arr[i] < 0.75){
        arr[i] = 3;
      }
      else{
        arr[i] = 4;
      }
    }
    return arr;
  }

  calcDistNormNeu(){
    var dist = [];
    for(var i = 1; i<this.posNeu.length; i++){
      let x2 = this.posNeu[i][0];
      let y2 = this.posNeu[i][1];
      let x1 = this.posNeu[i-1][0];
      let y1 = this.posNeu[i-1][1];
      dist[i-1] = Math.hypot(x2 - x1, y2 - y1);
    }
    this.normalizeArray(dist);
    return dist;
  }
}


////////////////////////////////////////////////////////////////////////
                            /*OSCILLATOR*/
////////////////////////////////////////////////////////////////////////

class Oscillator{
  constructor(ctx, frequency, arrDist){
    this.ctx = ctx;
    this.frequency = frequency;
    this.arrDist = arrDist;
    this.i = 0;
  }

  initOsc(){
    let o = this.ctx.createOscillator();
    o.frequency.value = this.frequency;
    o.connect(this.ctx.destination);
    let startTime = c.currentTime;
    console.log(startTime);
    o.start(startTime);
    o.stop(startTime + 0.1);
  }

  play(){
    this.initOsc();
    this.i++;
    if(this.i < this.arrDist.length){
      setTimeout(() => this.play(), (60/bpm)*1000*this.arrDist[this.i-1]);
    }
    else{
      this.i = 0;
      return;
    }
  }
}

var n = 32;
const n1 = new Neurons(n, wKick, hKick, ctxKick, "rect");
const n2 = new Neurons(n, wSnare, hSnare, ctxSnare, "tri");
n1.init();
n2.init();

function startLearning(Neurons, canvas, ctx, id, freq){
  if (Neurons.getEps() <= 0.1){
    clearInterval(id);
    console.log(Neurons.calcDistNormNeu());
    const osc = new Oscillator(c, freq, Neurons.calcDistNormNeu());
    oscillators.push(osc);
    PlayButt.disabled = "";

  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Neurons.learning();
}

function createOsc(){
  var idKick = setInterval(() => startLearning(n1, kick, ctxKick, idKick, 261.63), 2);
  var idSnare = setInterval(() => startLearning(n2, snare, ctxSnare, idSnare, 440), 2);
} 
createOsc();


function startPlaying(){
  console.log(oscillators); //fare la funzione suono
  var time = c.currentTime;
  for (var i = 0; i<oscillators.length; i++){
    oscillators[i].play();
  }
}


PlayButt.onclick = () => startPlaying();









