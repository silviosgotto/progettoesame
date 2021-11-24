module.exports = class MelodicNeurons{
    constructor(n, l, ctx, mode){
        this.n = n;
        this.l = l;
        this.ctx = ctx;
        this.mode = mode;
        this.posNeu = [];
        this.sigma = 20;
        this.eps = 0.2;
        this.count = 0;
        this.scale = '{"arm":[{"x":0,"y":0},{"x":2,"y":0},{"x":3,"y":0},{"x":0,"y":1},{"x":2,"y":1},{"x":3,"y":1},{"x":1,"y":2},{"x":2,"y":2},{"x":4,"y":2},{"x":0,"y":3},{"x":2,"y":3},{"x":4,"y":3},{"x":0,"y":4},{"x":3,"y":4},{"x":4,"y":4}],' +
        '"semid":[{"x":0,"y":0},{"x":1,"y":0},{"x":3,"y":0},{"x":4,"y":0},{"x":1,"y":1},{"x":2,"y":1},{"x":4,"y":1},{"x":0,"y":2},{"x":2,"y":2},{"x":3,"y":2},{"x":0,"y":3},{"x":1,"y":3},{"x":3,"y":3},{"x":4,"y":3},{"x":1,"y":4},{"x":2,"y":4},{"x":4,"y":4}],'+
        '"dim":[{"x":0,"y":0},{"x":2,"y":0},{"x":3,"y":0},{"x":0,"y":1},{"x":1,"y":1},{"x":3,"y":1},{"x":4,"y":1},{"x":1,"y":2},{"x":2,"y":2},{"x":4,"y":2},{"x":0,"y":3},{"x":2,"y":3},{"x":3,"y":3},{"x":0,"y":4},{"x":1,"y":4},{"x":3,"y":4},{"x":4,"y":4}],'+
        '"esa":[{"x":0,"y":0},{"x":2,"y":0},{"x":4,"y":0},{"x":1,"y":1},{"x":3,"y":1},{"x":0,"y":2},{"x":2,"y":2},{"x":4,"y":2},{"x":1,"y":3},{"x":3,"y":3},{"x":0,"y":4},{"x":2,"y":4},{"x":4,"y":4}],'+
        '"blues":[{"x":0,"y":0},{"x":0,"y":0},{"x":3,"y":0},{"x":0,"y":1},{"x":1,"y":1},{"x":2,"y":1},{"x":0,"y":2},{"x":2,"y":2},{"x":0,"y":3},{"x":2,"y":3},{"x":3,"y":3},{"x":4,"y":3},{"x":2,"y":4},{"x":4,"y":4}],'+
        '"petmin":[{"x":0,"y":0},{"x":3,"y":0},{"x":0,"y":1},{"x":2,"y":1},{"x":0,"y":2},{"x":2,"y":2},{"x":0,"y":3},{"x":2,"y":3},{"x":4,"y":3},{"x":2,"y":4},{"x":4,"y":4}],'+
        '"petmag":[{"x":0,"y":0},{"x":2,"y":0},{"x":4,"y":0},{"x":2,"y":1},{"x":4,"y":1},{"x":2,"y":2},{"x":4,"y":2},{"x":1,"y":3},{"x":4,"y":3},{"x":1,"y":4},{"x":4,"y":4}],'+
        '"ionic":[{"x":0,"y":0},{"x":2,"y":0},{"x":4,"y":0},{"x":0,"y":1},{"x":2,"y":1},{"x":4,"y":1},{"x":1,"y":2},{"x":2,"y":2},{"x":4,"y":2},{"x":1,"y":3},{"x":2,"y":3},{"x":4,"y":3},{"x":1,"y":4},{"x":3,"y":4},{"x":4,"y":4}],'+
        '"doric":[{"x":0,"y":0},{"x":2,"y":0},{"x":3,"y":0},{"x":0,"y":1},{"x":2,"y":1},{"x":4,"y":1},{"x":0,"y":2},{"x":2,"y":2},{"x":4,"y":2},{"x":0,"y":3},{"x":2,"y":3},{"x":4,"y":3},{"x":1,"y":4},{"x":2,"y":4},{"x":4,"y":4}],'+
        '"frigian":[{"x":0,"y":0},{"x":1,"y":0},{"x":3,"y":0},{"x":0,"y":1},{"x":2,"y":1},{"x":3,"y":1},{"x":0,"y":2},{"x":2,"y":2},{"x":3,"y":2},{"x":0,"y":3},{"x":2,"y":3},{"x":4,"y":3},{"x":0,"y":4},{"x":2,"y":4},{"x":4,"y":4}],'+
        '"lydian":[{"x":0,"y":0},{"x":2,"y":0},{"x":4,"y":0},{"x":1,"y":1},{"x":2,"y":1},{"x":4,"y":1},{"x":1,"y":2},{"x":2,"y":2},{"x":4,"y":2},{"x":1,"y":3},{"x":3,"y":3},{"x":4,"y":3},{"x":1,"y":4},{"x":3,"y":4},{"x":4,"y":4}],'+
        '"mixolydian":[{"x":0,"y":0},{"x":2,"y":0},{"x":4,"y":0},{"x":0,"y":1},{"x":2,"y":1},{"x":4,"y":1},{"x":0,"y":2},{"x":2,"y":2},{"x":4,"y":2},{"x":1,"y":3},{"x":2,"y":3},{"x":4,"y":3},{"x":1,"y":4},{"x":2,"y":4},{"x":4,"y":4}],'+
        '"eolian":[{"x":0,"y":0},{"x":2,"y":0},{"x":3,"y":0},{"x":0,"y":1},{"x":2,"y":1},{"x":3,"y":1},{"x":0,"y":2},{"x":2,"y":2},{"x":4,"y":2},{"x":0,"y":3},{"x":2,"y":3},{"x":4,"y":3},{"x":0,"y":4},{"x":2,"y":4},{"x":4,"y":4}],'+
        '"locrian":[{"x":0,"y":0},{"x":1,"y":0},{"x":3,"y":0},{"x":0,"y":1},{"x":1,"y":1},{"x":3,"y":1},{"x":0,"y":2},{"x":2,"y":2},{"x":3,"y":2},{"x":0,"y":3},{"x":2,"y":3},{"x":3,"y":3},{"x":0,"y":4},{"x":2,"y":4},{"x":4,"y":4}]}'
    }

    getN(){
        return this.n;
    }

    getL(){
        return this.l;
    }

    getCtx(){
        return this.ctx;
    }

    getPosNeu(){
        return this.posNeu;
    }

    getMode(){
        return this.mode;
    }

    getEps(){
        return this.eps;
    }

    initPosNeu(){
        for(let i = 0; i < this.n; i++){
            let [x, y] = [(this.l)*Math.random(), (this.l)*Math.random()];
            this.posNeu[i] = [x, y];
        }
    }

    drawNeurons(){
        for(var i = 1; i < this.posNeu.length; i++){
            if(i == this.posNeu.length -1 ){
                this.ctx.circle(10).attr({cx: this.posNeu[i][0], cy: this.posNeu[i][1]}).css({fill: "hsl("+this.count/4+", 100%, 50%)"});
            }
          this.ctx.circle(10).attr({cx: this.posNeu[i-1][0], cy: this.posNeu[i-1][1]}).css({fill: "hsl("+this.count/4+", 100%, 50%)"});
          this.ctx.line(this.posNeu[i][0], this.posNeu[i][1], this.posNeu[i-1][0], this.posNeu[i-1][1]).css({stroke: "hsl("+this.count/4+", 100%, 50%)", width:"4px"});
        }
    }

    initNeurons(){
        this.initPosNeu();
        this.drawNeurons();
    }

    setPosDotMode(){
        var scale = JSON.parse(this.scale);
        var i = Math.floor(Math.random() * scale[this.mode].length);
        var Sx = parseFloat(scale[this.mode][i].x/5);
        var Sy = parseFloat(scale[this.mode][i].y/5);
        var x = this.l/5 * Math.random() + (Sx * this.l);
        var y = this.l/5 * Math.random() + (Sy * this.l);
        return [x, y];
    }

    learning(){
        var min = 0;
        var distmin = 0;
        let posDot = this.setPosDotMode();
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

    render(){
        this.ctx.clear();
        this.learning();
        this.drawNeurons();
    }

    calcPosPad() {
        var PosPad = []
        var b = true
        var n = 1
        for(var i = 0; i < this.posNeu.length; i++){
            b = true
            n = 1
            for(var j = 1; j <= 5; j++){
                for(var k = 1; k <= 5; k++){
                    if(b){
                        if(this.posNeu[i][0] <= k*this.l/5 && this.posNeu[i][1] <= j*this.l/5){
                            PosPad[i] = n
                            b = false
                        }
                        n++
                    }
                }
            }
        }
        return PosPad
    }
}