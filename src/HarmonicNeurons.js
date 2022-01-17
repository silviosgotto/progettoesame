import * as Tone from 'tone'

module.exports = class HarmonicNeurons{
    constructor(n, l, ctx, bpm){
        this.n = n;
        this.l = l;
        this.ctx = ctx;
        this.posNeu = [];
        this.sigma = 20;
        this.eps = 0.2;
        this.count = 0;
        this.bpm = bpm;
    }

    //GETTER//
    getPad(){
        return this.pad;
    }
    
    getN(){
        return this.n;
    }

    getWidth(){
        return this.l;
    }

    getCtx(){
        return this.ctx;
    }

    getPosNeu(){
        return this.posNeu;
    }

    getEps(){
        return this.eps;
    }

    initPosNeu(){
        for(let i = 0; i < this.n; i++){
            var r = this.l/2 * Math.sqrt(Math.random());
            var theta = Math.random() * 2 * Math.PI;
            var centerX = this.l/2;
            var centerY = this.l/2;
            let [x, y] = [centerX + r * Math.cos(theta), centerY + r * Math.sin(theta)];
            this.posNeu[i] = [x, y];
        }
    }

    drawNeurons(){
        for(var j = 1; j < this.posNeu.length; j++){
            this.ctx.line(this.posNeu[j][0], this.posNeu[j][1], this.posNeu[j-1][0], this.posNeu[j-1][1]).css({stroke: "hsl("+this.count/4+", 100%, 50%)", width:"4px"});
        }
        for(var i = 1; i < this.posNeu.length; i++){
          this.ctx.circle(10).attr({cx: this.posNeu[i-1][0], cy: this.posNeu[i-1][1]}).css({fill: "hsl("+this.count/4+", 100%, 50%)"});
          if(i == this.posNeu.length -1 ){
            this.ctx.circle(10).attr({cx: this.posNeu[i][0], cy: this.posNeu[i][1]}).css({fill: "hsl("+this.count/4+", 100%, 50%)"});
            }
        }
    }

    initNeurons(){
        this.initPosNeu();
        this.drawNeurons();
    }

    getPosDot(){
        var r = this.l/2 * Math.sqrt(Math.random());
        var theta = Math.random() * 2 * Math.PI;
        var centerX = this.l/2;
        var centerY = this.l/2;
        var x = centerX + r * Math.cos(theta);
        var y = centerY + r * Math.sin(theta);
        return [x, y];
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
        if (this.count % 5 == 0){
          this.sigma = 0.95 * this.sigma;
          this.eps = 0.999 * this.eps;
        }
        this.count++;
    }

    /* normalizeOnLoop(arr, loopEnd){
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const sum = arr.reduce(reducer);
        for(let i = 0; i < arr.length; i++){
            arr[i] = arr[i]/(sum)*loopEnd;
            console.log("arr: ", arr[i]);
        }
        var arrTimes = [];
        arrTimes[0] = 0;
        for(let i = 1; i<= arr.length; i++){
            arrTimes[i] = arrTimes[i-1] + arr[i-1];
            console.log("arrTiems: ", arrTimes[i]);
        }
        //console.log("tempi: ", arrTimes);
        return arrTimes;
    } */

    normalizeArray(arr){
        let min = Math.min(...arr);
        let max = Math.max(...arr);
        let distnorm = [];
        let x = arr.length;
        arr[x] = 0
            for(let i = 0; i < arr.length; i++){
                distnorm[i] = (arr[i]-min)/(max-min)
                if(i == 0) {    
                    arr[i] = 0
                }
                else{
                    if(distnorm[i-1] >= 0 && distnorm[i-1] < 2/8){
                        arr[i] = arr[i-1] + 2/4;
                    }
                    else if(distnorm[i-1] >= 2/8 && distnorm[i-1] < 4/8){
                        arr[i] = arr[i-1] + 4/4;
                    }
                    else if(distnorm[i-1] >= 4/8 && distnorm[i-1] < 6/8){
                        arr[i] = arr[i-1] + 6/4;
                    }
                    else {
                        arr[i] = arr[i-1] + 8/4;
                    }
                    /* if (distnorm[i-1] >= 0 && distnorm[i-1] < 1/8){
                        arr[i] = arr[i-1] + 1/4;
                    }
                    else if(distnorm[i-1] >= 1/8 && distnorm[i-1] < 2/8){
                        arr[i] = arr[i-1] + 2/4;
                    }
                    else if(distnorm[i-1] >= 2/8 && distnorm[i-1] < 3/8){
                        arr[i] = arr[i-1] + 3/4;
                    }
                    else if(distnorm[i-1] >= 3/8 && distnorm[i-1] < 4/8){
                        arr[i] = arr[i-1] + 4/4;
                    }
                    else if(distnorm[i-1] >= 4/8 && distnorm[i-1] < 5/8){
                        arr[i] = arr[i-1] + 5/4;
                    }
                    else if(distnorm[i-1] >= 5/8 && distnorm[i-1] < 6/8){
                        arr[i] = arr[i-1] + 6/4;
                    }   
                    else if(distnorm[i-1] >= 6/8 && distnorm[i-1] < 7/8){
                        arr[i] = arr[i-1] + 7/4;
                    }
                    else {
                        arr[i] = arr[i-1] + 8/4;
                    } */

                }  
            }
            //console.log("distnorm" + distnorm)
            return arr;
        }

    calcDistNormNeu(/*loopEnd*/){
        var dist = [];
        var times =[];
        for(var i = 1; i<this.posNeu.length; i++){
            let x2 = this.posNeu[i][0];
            let y2 = this.posNeu[i][1];
            let x1 = this.posNeu[i-1][0];
            let y1 = this.posNeu[i-1][1];
            dist[i-1] = Math.hypot(x2 - x1, y2 - y1);
        }
        //times = this.normalizeOnLoop(dist, loopEnd);
        times = this.normalizeArray(dist);
        return times;
    }

    render(){
        this.ctx.clear();
        this.learning();
        this.drawNeurons();
    }

}