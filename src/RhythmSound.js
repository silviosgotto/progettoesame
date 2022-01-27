import * as Tone from 'tone'


module.exports = class RhythmSound{
    constructor(arrDur, bpm, url, metrica, ctx, vol, sol){
        this.arrDur = arrDur;
        this.bpm = bpm;
        this.url = url;
        this.metrica = metrica;
        this.count = 0;
        this.ctx = ctx;
        this.vol = vol;
        this.sol = sol;
        this.sampler = new Tone.Player(this.url).chain(vol, sol);
        this.part = new Tone.Part(((time) => {
            this.sampler.start(time);
            Tone.Draw.schedule(()=> {
                if(this.count == 0){
                    this.ctx.get(this.arrDur.length-1+this.count).css({fill: "white"});
                    this.ctx.get((this.arrDur.length-1)*2).css({fill: "red"});
                }
                else{
                    this.ctx.get(this.arrDur.length-1+this.count).css({fill: "white"});
                    this.ctx.get(this.arrDur.length-1+this.count-1).css({fill: "red"});
                }
                
                this.count++;
                if(this.count == this.arrDur.length){
                    this.count = 0;
                }
            });
          }), []).start(0);
    }

    getarrDur(){
        return this.arrDur;
    }

    rightLoop(){
        var loopEnd = this.arrDur.at(-1)
        if (loopEnd % this.metrica == 0){
            loopEnd = loopEnd + this.metrica
        }
        else{
            loopEnd = Math.ceil(this.arrDur.at(-1))
            if (loopEnd % this.metrica != 0) {
                loopEnd = loopEnd + (this.metrica - (loopEnd % this.metrica))
            }
        }
        return loopEnd
    }

    createPart(){
        var bpm = 60/this.bpm;
        this.part.loopStart=0;
        this.part.loopEnd = this.rightLoop()*bpm;
        for (var j = 0; j<this.arrDur.length; j++){
            this.arrDur[j] = this.arrDur[j]*bpm;
            this.part.add({time: this.arrDur[j]});
        }
        this.part.loop = true;
        //console.log(this.arrDur);
    }
}

