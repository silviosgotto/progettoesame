import * as Tone from 'tone'

module.exports = class MelodicSound {
    constructor(arrDur, arrPos, bpm, metrica, baseNote, ctx, synth){
        this.arrDur = arrDur;
        this.arrPos = arrPos;
        this.bpm = bpm;
        this.metrica = metrica;
        this.baseNote = baseNote;
        this.ctx = ctx;
        this.count = 0;
        this.synth = synth;
        this.part;        
    }

    initPart(){
        this.part = new Tone.Part(((time, value) => {
            this.synth.triggerAttackRelease(value.note, "8n", time);
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
        console.log(loopEnd);
        return loopEnd
    }

    createPart(){
        var bpm = 60/this.bpm;
        this.part.loopStart=0;
        this.part.loopEnd = this.rightLoop()*bpm;
        console.log("loopend mel: ", this.part.loopEnd);
        for (var j = 0; j<this.arrDur.length; j++){
            this.arrDur[j] = this.arrDur[j]*bpm;
            this.part.add({time: this.arrDur[j], note: this.baseNote*Math.pow(2, (this.arrPos[j] - 1)/12)});
        }
        this.part.loop = true;
        /* console.log(this.arrDur);
        console.log(this.metrica);
        console.log(this.part.loopEnd); */
    }

    getLoopEnd(){
        return this.part.loopEnd;
    }
}