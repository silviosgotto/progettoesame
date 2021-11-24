import * as Tone from 'tone'


module.exports = class RhythmSound{
    constructor(arrDur, bpm, url){
        this.arrDur = arrDur;
        this.bpm = bpm;
        this.url = url;
        this.sampler = new Tone.Player(this.url).toDestination();
        this.part = new Tone.Part(((time) => {
            this.sampler.start(time);
          }), []).start(0);
    }

    createPart(){
        var bpm = 60/this.bpm;
        for (var j = 0; j<this.arrDur.length; j++){
            this.arrDur[j] = this.arrDur[j]*bpm;
            this.part.add({time: this.arrDur[j]});
        }
        this.part.loopStart=0;
        this.part.loopEnd=this.arrDur[this.arrDur.length-1];
        this.part.loop = true;
    }
}

