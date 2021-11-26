import * as Tone from 'tone'


module.exports = class RhythmSound{
    constructor(arrDur, bpm, url, metrica){
        this.arrDur = arrDur;
        this.bpm = bpm;
        this.url = url;
        this.metrica = metrica;
        this.sampler = new Tone.Player(this.url).toDestination();
        this.part = new Tone.Part(((time) => {
            this.sampler.start(time);
          }), []).start(0);
    }

    rightLoop(){
        var loopEnd = Math.ceil(this.arrDur.at(-1))
        if (loopEnd % this.metrica != 0) {
            loopEnd = loopEnd + (this.metrica - (loopEnd % this.metrica))
        }
        return loopEnd
    }

    createPart(){
        var bpm = 60/this.bpm;
        for (var j = 0; j<this.arrDur.length; j++){
            this.arrDur[j] = this.arrDur[j]*bpm;
            this.part.add({time: this.arrDur[j]});
        }
        this.part.loopStart=0;
        this.part.loopEnd = this.rightLoop();
        this.part.loop = true;
        console.log(this.arrDur);
        console.log(this.rightLoop())
    }
}

