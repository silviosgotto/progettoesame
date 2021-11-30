import * as Tone from 'tone'

module.exports = class MelodicSound {
    constructor(arrDur, arrPos, bpm, metrica, baseNote){
        this.arrDur = arrDur;
        this.arrPos = arrPos;
        this.bpm = bpm;
        this.metrica = metrica;
        this.baseNote = baseNote;
        this.synth = new Tone.Synth().toDestination()
        this.part = new Tone.Part(((time, value) => {
            this.synth.triggerAttackRelease(value.note, "8n", time);
          }), []).start(0);
    }

    rightLoop(){
        var loopEnd = Math.ceil(this.arrDur.at(-1));
        if (loopEnd % this.metrica != 0) {
            loopEnd = loopEnd + (this.metrica - (loopEnd % this.metrica));
        }
        return loopEnd;
    }

    createPart(){
        var bpm = 60/this.bpm;
        for (var j = 0; j<this.arrDur.length; j++){
            this.arrDur[j] = this.arrDur[j]*bpm;
            this.part.add({time: this.arrDur[j], note: this.baseNote*Math.pow(2, (this.arrPos[j] - 1)/12)});
        }
        this.part.loopStart=0;
        this.part.loopEnd = this.rightLoop();
        this.part.loop = true;
        console.log(this.arrDur);
        console.log(this.rightLoop());
    }
}