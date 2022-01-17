import * as Tone from 'tone'

module.exports = class HarmonicSound{
    constructor(arrDur, leMel, bpm, metrica, BaseNote, ctx, PolySynth, arrPosMel, arrDurMel, mode){
        this.arrDur = arrDur;
        this.leMel = leMel; //loopend melodic
        this.bpm = bpm;
        this.metrica = metrica;
        this.BaseNote = BaseNote;
        this.ctx = ctx;
        this.PolySynth = PolySynth;
        this.count = 0;
        this.arrPosMel = arrPosMel;
        this.arrDurMel = arrDurMel;
        this.mode = mode;           
        this.part;
        this.melnotes = [];
        this.chords = {
            "ionic": [[1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
                    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1]]
        }
    }

    initPart(){
        this.part = new Tone.Part(((time, value) => {
            this.PolySynth.triggerAttackRelease(value.note, "8n", time);
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

    arrayProd(a, b){
        var dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
        return dot(a, b);
    }

    findChord(){
        var j = 0;
        for(let i = 1; i <= this.arrDur.length; i++){
            var time = 0;
            var notesInTime = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            if(i == this.arrDur.length){
                while(j < this.arrPosMel.length){
                    notesInTime[(this.arrPosMel[j]-1)%12]++;
                    j++;
                }
            }
            else{
                time = this.arrDur[i];
                while(this.arrDurMel[j] < time){
                    notesInTime[(this.arrPosMel[j]-1)%12]++;
                    j++;
                }
            }
            this.melnotes.push(notesInTime);
            console.log(notesInTime);
        }


        for(let k = 0; k<this.melnotes.length; k++){
            var max = 0;
            var sum = 0;
            var index = 0;
            for(let z = 0; z<this.chords[this.mode].length; z++){
                sum = this.arrayProd(this.melnotes[k], this.chords[this.mode][z]);
                if(sum > max){
                    max = sum;
                    index = z;
                }
                else if(sum == max){
                    let rand = Math.random();
                    if(rand > 0.5){
                        max = sum;
                        index = z;
                    }
                }
            }
            var chords = []
            for(let y = 0; y<this.chords[this.mode][index].length; y++){
                if(this.chords[this.mode][index][y] != 0){
                    chords.push(this.BaseNote*Math.pow(2, y/12));
                }
            }
            this.melnotes[k] = chords;
        }

    }

    rightLoop(){
        var loopEnd = this.arrDur.at(-1);
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
        //console.log("loopend harmony: ", this.part.loopEnd);
        var rapple = this.leMel/this.part.loopEnd;
        this.part.loopEnd = this.leMel;
        
        for (var j = 0; j<this.arrDur.length; j++){
            this.arrDur[j] = this.arrDur[j]*bpm*rapple;
        }
        this.findChord();
        for (var i = 0; i<this.arrDur.length; i++){
            this.part.add({time: this.arrDur[i], note: this.melnotes[i]});
        }
        this.part.loop = true;
    }

}