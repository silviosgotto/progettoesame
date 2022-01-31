import * as Tone from 'tone'

module.exports = class RhythmNeurons{
    constructor(pad, n, width, height, ctx, shape, bpm, vol, sol, pan, player){
        this.pad = pad;
        this.n = n;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.posNeu = [];
        this.shape = shape;
        this.sigma = 20;
        this.eps = 0.2;
        this.count = 0;
        this.bpm = bpm;
        this.vol = vol;
        this.sol = sol;
        this.pan = pan;
        this.player = player;
        //this.part = this.visualClick();
    }

    //GETTER//
    getPlayer(){
        return this.player;
    }
    getPan(){
        return this.pan;
    }
    getVol(){
        return this.vol;
    }
    getSol(){
        return this.sol;
    }
    
    getPad(){
        return this.pad;
    }
    
    getN(){
        return this.n;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    getCtx(){
        return this.ctx;
    }

    getPosNeu(){
        return this.posNeu;
    }

    getShape(){
        return this.shape;
    }

    getEps(){
        return this.eps;
    }

    visualClick(fig){
        var part;
        if(this.n != 0){
            if(this.shape == "rect"){
                var i = 1;
                var circClick = fig;
                part = new Tone.Part((()=> {
                    Tone.Draw.schedule(()=>{
                        if(i == 5){
                            i = 1;
                        }
                        if(i== 1){
                            circClick.animate({
                                duration: 60/Tone.Transport.bpm.value*1000,
                                delay: 0,
                                when: 'now',
                                swing: false,
                                times: 0,
                                wait: 0
                              }).move(this.width-2, 0+2);
                        }
                        else if (i == 2){
                            circClick.animate({
                                duration: 60/Tone.Transport.bpm.value*1000,
                                delay: 0,
                                when: 'now',
                                swing: false,
                                times: 0,
                                wait: 0
                              }).move(this.width-2, this.height-2); 
                        }
                        else if (i == 3){
                            circClick.animate({
                                duration: 60/Tone.Transport.bpm.value*1000,
                                delay: 0,
                                when: 'now',
                                swing: false,
                                times: 0,
                                wait: 0
                              }).move(0, this.height-2);
                        }
                        else if(i == 4){
                            circClick.animate({
                                duration: 60/Tone.Transport.bpm.value*1000,
                                delay: 0,
                                when: 'now',
                                swing: false,
                                times: 0,
                                wait: 0
                              }).move(0+2, 0+2);
                        }
                        i++;
                    })
                }), [{time: 0},{time: 60/Tone.Transport.bpm.value},{time: 60/Tone.Transport.bpm.value*2},{time: 60/Tone.Transport.bpm.value*3}]).start(0);
                part.loopStart = 0;
                part.loopEnd = 4*(60/Tone.Transport.bpm.value);
                part.loop = true;
                return part;
            }
            else if(this.shape == "tri"){
                var i = 1;
                var circClick = fig;
                part = new Tone.Part((()=> {
                    Tone.Draw.schedule(()=>{
                        if(i == 4){
                            i = 1;
                        }
                        if(i== 1){
                            circClick.animate({
                                duration: 60/Tone.Transport.bpm.value*1000,
                                delay: 0,
                                when: 'now',
                                swing: false,
                                times: 0,
                                wait: 0
                              }).move(this.width-2, this.height-2);
                        }
                        else if (i == 2){
                            circClick.animate({
                                duration: 60/Tone.Transport.bpm.value*1000,
                                delay: 0,
                                when: 'now',
                                swing: false,
                                times: 0,
                                wait: 0
                              }).move(0+2, this.height-2);
                        }
                        else if (i == 3){
                            circClick.animate({
                                duration: 60/Tone.Transport.bpm.value*1000,
                                delay: 0,
                                when: 'now',
                                swing: false,
                                times: 0,
                                wait: 0
                              }).move(this.width/2, 0+4);
                        }
                        i++;
                    })
                }), [{time: 0},{time: 60/Tone.Transport.bpm.value},{time: 60/Tone.Transport.bpm.value*2}]).start(0);
                part.loopStart = 0;
                part.loopEnd = 3*(60/Tone.Transport.bpm.value);
                part.loop = true;
                return part;
            }
            else{
                var i = 1;
                var circClick = fig;
                var alpha = 72/180*Math.PI;
                var beta = 54/180*Math.PI;
                var l = this.width/(1+2*Math.cos(alpha));
                part = new Tone.Part((()=> {
                    Tone.Draw.schedule(()=>{
                        if(i == 6){
                            i = 1;
                        }
                        if(i== 1){
                            circClick.animate({
                                duration: 60/Tone.Transport.bpm.value*1000,
                                delay: 0,
                                when: 'now',
                                swing: false,
                                times: 0,
                                wait: 0
                              }).move(this.width-2, this.height-l*Math.sin(alpha));
                        }
                        else if (i == 2){
                            circClick.animate({
                                duration: 60/Tone.Transport.bpm.value*1000,
                                delay: 0,
                                when: 'now',
                                swing: false,
                                times: 0,
                                wait: 0
                              }).move((this.width-l*Math.cos(alpha))-2, this.height-2);
                        }
                        else if (i == 3){
                            circClick.animate({
                                duration: 60/Tone.Transport.bpm.value*1000,
                                delay: 0,
                                when: 'now',
                                swing: false,
                                times: 0,
                                wait: 0
                              }).move((this.width-l*(Math.cos(alpha)+1)), this.height-2);
                        }
                        else if (i == 4){
                            circClick.animate({
                                duration: 60/Tone.Transport.bpm.value*1000,
                                delay: 0,
                                when: 'now',
                                swing: false,
                                times: 0,
                                wait: 0
                              }).move(0+2, this.height-l*Math.sin(alpha));
                        }
                        else if (i == 5){
                            circClick.animate({
                                duration: 60/Tone.Transport.bpm.value*1000,
                                delay: 0,
                                when: 'now',
                                swing: false,
                                times: 0,
                                wait: 0
                              }).move(this.width/2, 2+this.height-l*(Math.sin(alpha)+Math.cos(beta)));
                        }
                        i++;
                    })
                }), [{time: 0},{time: 60/Tone.Transport.bpm.value},{time: 60/Tone.Transport.bpm.value*2},{time: 60/Tone.Transport.bpm.value*3},{time: 60/Tone.Transport.bpm.value*4}]).start(0);
                part.loopStart = 0;
                part.loopEnd = 5*(60/Tone.Transport.bpm.value);
                part.loop = true;
                return part;
            }
        }
        

    }

    //INIT RHYTHM NEURONS
    initPosNeu(){
        switch(this.shape){
            case 'rect':
                for(let i = 0; i < this.n; i++){
                    let [x, y] = [(this.width)*Math.random(), (this.height)*Math.random()];
                    this.posNeu[i] = [x, y];
                }
                break;
            
            case 'tri':
                for(let i = 0; i < this.n; i++){
                    let a = Math.random()/1.2 + 0.05;
                    let b = Math.random()/1.2 + 0.05;
                    let asqrt = Math.sqrt(a);
                    let x = (1 - asqrt) * 0 + asqrt * (1 - b) * (this.width / 2) + asqrt * b * this.width;
                    let y = (1 - asqrt) * this.height + asqrt * (1 - b) * 0 + asqrt * b * this.height;
                    this.posNeu[i] = [x, y];
                }
                break;

            case 'pent':
                let alpha = 72/180*Math.PI;
                let beta = 54/180*Math.PI;
                let l = this.width/(1+2*Math.cos(alpha));
                let xCm = this.width/2;
                let yCm = this.height - l*Math.tan(beta)/2;
                let xA = 0;
                let xC = this.width-l*Math.cos(alpha);
                let xB = this.width-l*(Math.cos(alpha)+1);
                let xD = this.width;
                let xE = this.width/2;
                let yA = this.height-l*Math.sin(alpha);
                let yC = this.height;
                let yB = this.height;
                let yD = this.height-l*Math.sin(alpha);
                let yE = this.height-l*(Math.sin(alpha)+Math.cos(beta));
                for(var i = 0; i < this.n; i++){
                    let rand = Math.floor(Math.random()*5);
                    if(rand == 0){
                        let a = Math.random();
                        let b = Math.random();
                        let asqrt = Math.sqrt(a);
                        var x = (1 - asqrt) * xB + asqrt * (1 - b) * xCm + asqrt * b * xC;
                        var y = (1 - asqrt) * yB + asqrt * (1 - b) * yCm + asqrt * b * yC;
                        this.posNeu[i] = [x, y];
                    }
                    else if(rand == 1){
                        let a = Math.random();
                        let b = Math.random();
                        let asqrt = Math.sqrt(a);
                        let x = (1 - asqrt) * xA + asqrt * (1 - b) * xCm + asqrt * b * xB;
                        let y = (1 - asqrt) * yA + asqrt * (1 - b) * yCm + asqrt * b * yB;
                        this.posNeu[i] = [x, y];
                    }
                    else if(rand == 2){
                        let a = Math.random();
                        let b = Math.random();
                        let asqrt = Math.sqrt(a);
                        let x = (1 - asqrt) * xE + asqrt * (1 - b) * xCm + asqrt * b * xA;
                        let y = (1 - asqrt) * yE + asqrt * (1 - b) * yCm + asqrt * b * yA;
                        this.posNeu[i] = [x, y];
                    }
                    else if(rand == 3){
                        let a = Math.random();
                        let b = Math.random();
                        let asqrt = Math.sqrt(a);
                        let x = (1 - asqrt) * xD + asqrt * (1 - b) * xCm + asqrt * b * xE;
                        let y = (1 - asqrt) * yD + asqrt * (1 - b) * yCm + asqrt * b * yE;
                        this.posNeu[i] = [x, y];
                    }
                    else if(rand == 4){
                        let a = Math.random();
                        let b = Math.random();
                        let asqrt = Math.sqrt(a);
                        let x = (1 - asqrt) * xC + asqrt * (1 - b) * xCm + asqrt * b * xD;
                        let y = (1 - asqrt) * yC + asqrt * (1 - b) * yCm + asqrt * b * yD;
                        this.posNeu[i] = [x, y];
                    }
                    else{
                        throw Error("rand Error on Pent");
                    }
                }
                break;
            default:
                throw Error("error on rhythm shape");
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

    //DOTS
    getPosDot(){
        switch(this.shape){
            case 'rect':
                var x = this.width * Math.random();
                var y = this.height * Math.random();
                /* this.ctx.beginPath();
                this.ctx.arc(x, y, 1, 0, 2 * Math.PI, true);
                this.ctx.stroke(); */
                return [x, y];

            case 'tri':
                var r1 = Math.random();
                var r2 = Math.random();
                var sqrtr1 = Math.sqrt(r1);
                var x = (1 - sqrtr1) * 0 + (sqrtr1 * (1 - r2) * this.width) / 2 + sqrtr1 * r2 * this.width;
                var y = (1 - sqrtr1) * this.height + sqrtr1 * (1 - r2) * 0 + sqrtr1 * r2 * this.height;
                /* this.ctx.beginPath();
                this.ctx.arc(x, y, 1, 0, 2 * Math.PI, true);
                this.ctx.stroke(); */
                return [x, y];

            case 'pent':
                let alpha = 72/180*Math.PI;
                let beta = 54/180*Math.PI;
                let l = this.width/(1+2*Math.cos(alpha));
                let xCm = this.width/2;
                let yCm = this.height - l*Math.tan(beta)/2;
                let xA = 0;
                let xC = this.width-l*Math.cos(alpha);
                let xB = this.width-l*(Math.cos(alpha)+1);
                let xD = this.width;
                let xE = this.width/2;
                let yA = this.height-l*Math.sin(alpha);
                let yC = this.height;
                let yB = this.height;
                let yD = this.height-l*Math.sin(alpha);
                let yE = this.height-l*(Math.sin(alpha)+Math.cos(beta));
                let rand = Math.floor(Math.random()*5);
                if(rand == 0){
                    let a = Math.random();
                    let b = Math.random();
                    let asqrt = Math.sqrt(a);
                    var x = (1 - asqrt) * xB + asqrt * (1 - b) * xCm + asqrt * b * xC;
                    var y = (1 - asqrt) * yB + asqrt * (1 - b) * yCm + asqrt * b * yC;
                }
                else if(rand == 1){
                    let a = Math.random();
                    let b = Math.random();
                    let asqrt = Math.sqrt(a);
                    var x = (1 - asqrt) * xA + asqrt * (1 - b) * xCm + asqrt * b * xB;
                    var y = (1 - asqrt) * yA + asqrt * (1 - b) * yCm + asqrt * b * yB;
                }
                else if(rand == 2){
                    let a = Math.random();
                    let b = Math.random();
                    let asqrt = Math.sqrt(a);
                    var x = (1 - asqrt) * xE + asqrt * (1 - b) * xCm + asqrt * b * xA;
                    var y = (1 - asqrt) * yE + asqrt * (1 - b) * yCm + asqrt * b * yA;
                }
                else if(rand == 3){
                    let a = Math.random();
                    let b = Math.random();
                    let asqrt = Math.sqrt(a);
                    var x = (1 - asqrt) * xD + asqrt * (1 - b) * xCm + asqrt * b * xE;
                    var y = (1 - asqrt) * yD + asqrt * (1 - b) * yCm + asqrt * b * yE;
                }
                else if(rand == 4){
                    let a = Math.random();
                    let b = Math.random();
                    let asqrt = Math.sqrt(a);
                    var x = (1 - asqrt) * xC + asqrt * (1 - b) * xCm + asqrt * b * xD;
                    var y = (1 - asqrt) * yC + asqrt * (1 - b) * yCm + asqrt * b * yD;
                }
                else{
                    throw Error("rand Dot Error on Pent");
                }

                return [x, y];
            
            default:
                throw Error("Error on Dot shape");
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
        if (this.count % 5 == 0){
          this.sigma = 0.95 * this.sigma;
          this.eps = 0.999 * this.eps;
        }
        this.count++;
    }
    
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
                if (distnorm[i-1] >= 0 && distnorm[i-1] < 1/8){
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
                }
            }  
        }
        //console.log("distnorm" + distnorm)
        return arr;
    }

    calcDistNormNeu(){
    var dist = [];
    var times =[];
    for(var i = 1; i<this.posNeu.length; i++){
        let x2 = this.posNeu[i][0];
        let y2 = this.posNeu[i][1];
        let x1 = this.posNeu[i-1][0];
        let y1 = this.posNeu[i-1][1];
        dist[i-1] = Math.hypot(x2 - x1, y2 - y1);
    }
    times = this.normalizeArray(dist);
    return times;
    }

    render(){
        this.ctx.clear();
        this.learning();
        this.drawNeurons();
    }
}
