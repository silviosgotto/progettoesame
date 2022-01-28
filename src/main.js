import MelodicNeurons from './MelodicNeurons.js';
import RhythmNeurons from './RhythmNeurons.js';
import RhythmSound from './RhythmSound.js';
import MelodicSound from './MelodicSound.js';
import HarmonicNeurons from './HarmonicNeurons.js';
import HarmonicSound from './HarmonicSound.js';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import * as Tone from 'tone';
import { Popover } from 'bootstrap';
import { Context, dbToGain, Phaser, Solo, TransportTime } from 'tone';
import * as bootstrap from 'bootstrap';


var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

popoverList[0].show();
setTimeout(function(){
    popoverList[0].hide();
}, 3000)

const rulesModal = new bootstrap.Modal(document.getElementById("rulesModal"));
const spanBlob = document.getElementById("rules");
spanBlob.onclick = function(){
    console.log("ciao");
    rulesModal.show();
}

console.log(`%c Designed With Love By Us `, "background: #0055CC; color: #CCFF00");
const SoundDictionary = {
    "kick": document.getElementById("kickSample").src,
    "808": document.getElementById("808Sample").src,
    "snare": document.getElementById("snareSample").src,
    "hihat": document.getElementById("hihatSample").src
}

const MetricDictionary = {
    "rect": 4,
    "tri": 3,
    "pent": 5
}

const FreqencyDictionary = {
    "C": 130.81,
    "C#": 138.59,
    "D": 146.83,
    "D#": 155.56,
    "E": 164.81,
    "F": 174.61,
    "F#": 185.00,
    "G": 196.00,
    "G#": 207.65,
    "A": 220.00,
    "A#": 233.08,
    "B": 246.94
}


const PlayButt = document.getElementById('rhythm-button');
const learningButton = document.getElementById("neurons-button");
PlayButt.disabled = true;
learningButton.disabled = true;


//ToneJs
Tone.Transport.bpm.value = 120;
var bpm = Tone.Transport.bpm.value
var bpmValue = document.getElementById("bpmValue")
bpmValue.value = Tone.Transport.bpm.value;
document.getElementById("bpmValuespan").innerText = bpmValue.value;
bpmValue.oninput = function(){
    Tone.Transport.bpm.value = bpmValue.value;
    bpm = bpmValue.value;
    document.getElementById("bpmValuespan").innerText = bpmValue.value;
}




const lmel = parseFloat(document.getElementById("melodic-pad").clientWidth);

//prova neuroni ritmo

var nrPad1 = new RhythmNeurons(0, 0, 0, "", "", bpm, 0, 0);
var nrPad2 = new RhythmNeurons(0, 0, 0, "", "", bpm, 0, 0);
var nrPad3 = new RhythmNeurons(0, 0, 0, "", "", bpm, 0, 0);
var soundRhythm1;
var soundRhythm2;
var soundRhythm3;
var metricRhythm1;
var metricRhythm2;
var metricRhythm3;
var nmPad = new MelodicNeurons(0, 0, "", "");
var metricMelodic;
var modeMelodic;
var BaseNote;
var nhPad = new HarmonicNeurons(0, 0, "", bpm);


function ToggleSolo(SoloArr, Solo){
    for(let i = 0; i < SoloArr.length; i++){
        if(SoloArr[i] == Solo){
            Solo.solo = !(Solo.solo);
        }
        else{
            SoloArr[i].solo = false;
        }
    }
}

//Panner Rhythm
const PanRhy1 = new Tone.Panner(0);
const PanSlideRhy1 = document.getElementById("PanSlideRhy1");
PanSlideRhy1.value = 0;
PanSlideRhy1.oninput = function(){
    PanRhy1.set({
        pan: PanSlideRhy1.value
    })
}
const ResetButtonRhy1 = document.getElementById("ResRhy1");
ResetButtonRhy1.onclick = function(){
    PanSlideRhy1.value = 0;
    PanRhy1.set({
        pan: PanSlideRhy1.value
    });
}

const PanRhy2 = new Tone.Panner(0);
const PanSlideRhy2 = document.getElementById("PanSlideRhy2");
PanSlideRhy2.value = 0;
PanSlideRhy2.oninput = function(){
    PanRhy2.set({
        pan: PanSlideRhy2.value
    })
}
const ResetButtonRhy2 = document.getElementById("ResRhy2");
ResetButtonRhy2.onclick = function(){
    PanSlideRhy2.value = 0;
    PanRhy2.set({
        pan: PanSlideRhy2.value
    });
}

const PanRhy3 = new Tone.Panner(0);
const PanSlideRhy3 = document.getElementById("PanSlideRhy3");
PanSlideRhy3.value = 0;
PanSlideRhy3.oninput = function(){
    PanRhy3.set({
        pan: PanSlideRhy3.value
    })
}
const ResetButtonRhy3 = document.getElementById("ResRhy3");
ResetButtonRhy3.onclick = function(){
    PanSlideRhy3.value = 0;
    PanRhy3.set({
        pan: PanSlideRhy3.value
    });
}

//Panner Melodico
const PanMel = new Tone.Panner(0);
const PanSlideMel = document.getElementById("PanSlideMel");
PanSlideMel.value = 0;
PanSlideMel.oninput = function(){
    PanMel.set({
        pan: PanSlideMel.value
    })
}
const ResetButtonMel = document.getElementById("ResMel");
ResetButtonMel.onclick = function(){
    PanSlideMel.value = 0;
    PanMel.set({
        pan: PanSlideMel.value
    });
}

//Panner Melodico
const PanHarm = new Tone.Panner(0);
const PanSlideHarm = document.getElementById("PanSlideHarm");
PanSlideHarm.value = 0;
PanSlideHarm.oninput = function(){
    PanHarm.set({
        pan: PanSlideHarm.value
    })
}
const ResetButtonHarm = document.getElementById("ResHarm");
ResetButtonHarm.onclick = function(){
    PanSlideHarm.value = 0;
    PanHarm.set({
        pan: PanSlideHarm.value
    });
}

//FeedBack Delay
const delay = new Tone.FeedbackDelay({
    wet:0,
    delayTime: "4n",
    feedback: 0
})
const WetDelSlider = document.getElementById("WetDelay");
const SpanWet = document.getElementById("WetDelSpan");
WetDelSlider.value = 0;
WetDelSlider.oninput = function(){
    if(WetDelSlider.value == 0){
        document.getElementById("delon").classList.add("effect-off");
        document.getElementById("delon").classList.remove("effect-on");
    }
    else{
        document.getElementById("delon").classList.add("effect-on");
        document.getElementById("delon").classList.remove("effect-off");
    }
    delay.set({wet: WetDelSlider.value});
    SpanWet.innerText = WetDelSlider.value;
}
const FeedDelSlider = document.getElementById("FeedbackDelay");
const SpanFeedDel = document.getElementById("FeedbackDelSpan");
FeedDelSlider.value = 0;
FeedDelSlider.oninput = function(){
    delay.set({feedback: FeedDelSlider.value});
    SpanFeedDel.innerText = FeedDelSlider.value;
}
const NoteSelect = document.getElementById("selectNoteDelay");
NoteSelect.onchange = function(){
    delay.set({delayTime: NoteSelect.value});
}

//Distortion
const distortion = new Tone.Distortion({
    wet: 0,
    distortion: 0.1
})
const WetDistSlider = document.getElementById("WetDist");
const SpanWetDist = document.getElementById("WetDistSpan");
WetDistSlider.value = 0;
WetDistSlider.oninput = function(){
    if(WetDistSlider.value == 0){
        document.getElementById("diston").classList.add("effect-off");
        document.getElementById("diston").classList.remove("effect-on");
    }
    else{
        document.getElementById("diston").classList.add("effect-on");
        document.getElementById("diston").classList.remove("effect-off");
    }
    distortion.set({wet: WetDistSlider.value});
    SpanWetDist.innerText = WetDistSlider.value;
}
const DistSlider = document.getElementById("Dist");
const SpanDist = document.getElementById("DistSpan");
DistSlider.value = 0;
DistSlider.oninput = function(){
    distortion.set({distortion: DistSlider.value});
    SpanDist.innerText = DistSlider.value;
}

//Tremolo
const tremolo = new Tone.Tremolo({
    wet: 0,
    frequency: 1,
    depth: 0,
    spread: 180
}).toDestination().start();
const WetTremSlider = document.getElementById("WetTrem");
const SpanWetTrem = document.getElementById("WetTremSpan");
WetTremSlider.value = 0;
WetTremSlider.oninput = function(){
    if(WetTremSlider.value == 0){
        document.getElementById("tremon").classList.add("effect-off");
        document.getElementById("tremon").classList.remove("effect-on");
    }
    else{
        document.getElementById("tremon").classList.add("effect-on");
        document.getElementById("tremon").classList.remove("effect-off");
    }
    tremolo.set({
        wet: WetTremSlider.value
    })
    SpanWetTrem.innerText = WetTremSlider.value;
}
const FreqTremSlider = document.getElementById("FreqTrem");
const SpanFreqTrem = document.getElementById("FreqTremSpan");
FreqTremSlider.value = 1;
FreqTremSlider.oninput = function(){
    tremolo.set({
        frequency: FreqTremSlider.value
    })
    SpanFreqTrem.innerText = FreqTremSlider.value;
}
const DepthTremSlider = document.getElementById("DepthTrem");
const SpanDepthTrem = document.getElementById("DepthTremSpan");
DepthTremSlider.value = 0;
DepthTremSlider.oninput = function(){
    tremolo.set({
        depth: DepthTremSlider.value
    })
    SpanDepthTrem.innerText = DepthTremSlider.value;
}
const SpreadTremSlider = document.getElementById("SpreadTrem");
const SpanSpreadTrem = document.getElementById("SpreadTremSpan");
SpreadTremSlider.value = 180;
SpreadTremSlider.oninput = function(){
    tremolo.set({
        spread: SpreadTremSlider.value
    })
    SpanSpreadTrem.innerText = SpreadTremSlider.value;
}

//Phaser
const phaser = new Tone.Phaser({
    wet: 0,
    frequency: 1,
    baseFrequency: 150,
    octaves: 2
})
const WetPhaSlider = document.getElementById("WetPha");
const SpanWetPha = document.getElementById("WetPhaSpan");
WetPhaSlider.value = 0;
WetPhaSlider.oninput = function(){
    if(WetPhaSlider.value == 0){
        document.getElementById("phaon").classList.add("effect-off");
        document.getElementById("phaon").classList.remove("effect-on");
    }
    else{
        document.getElementById("phaon").classList.add("effect-on");
        document.getElementById("phaon").classList.remove("effect-off");
    }
    phaser.set({
        wet: WetPhaSlider.value
    })
    SpanWetPha.innerText = WetPhaSlider.value;
}
const FreqPhaSlider = document.getElementById("FreqPha");
const SpanFreqPha = document.getElementById("FreqPhaSpan");
FreqPhaSlider.value = 1;
FreqPhaSlider.oninput = function(){
    phaser.set({
        frequency: FreqPhaSlider.value
    })
    SpanFreqPha.innerText = FreqPhaSlider.value;
}

const OctPhaSlider = document.getElementById("OctPha");
const SpanOctPha = document.getElementById("OctPhaSpan");
OctPhaSlider.value = 1;
OctPhaSlider.oninput = function(){
    phaser.set({
        octaves: OctPhaSlider.value
    })
    SpanOctPha.innerText = OctPhaSlider.value;
}

const BFPhaSlider = document.getElementById("BFPha");
const SpanBFPha = document.getElementById("BFPhaSpan");
BFPhaSlider.value = 100;
BFPhaSlider.oninput = function(){
    phaser.set({
        baseFrequency: BFPhaSlider.value
    })
    SpanBFPha.innerText = BFPhaSlider.value;
}




//Volumi Solo e Mute Melodico
var SoloArr = [];
const VolMel = new Tone.Volume(-10)
const SoloMel = new Tone.Solo(); //.toDestination();
SoloArr.push(SoloMel);
const SliderVolMel = document.getElementById("VolMel");
SliderVolMel.value = VolMel.volume.value;
const ButtSoloMel = document.getElementById("solo-mel");
const MuteMel = document.getElementById("mute-mel");
SliderVolMel.oninput = function(){
    VolMel.volume.value = SliderVolMel.value;
}
ButtSoloMel.onclick = function(){
    ToggleSolo(SoloArr, SoloMel);
}
MuteMel.onclick = function(){
    VolMel.mute = !VolMel.mute;
}

//volumi Solo e Mute armonico
const VolHarm = new Tone.Volume(-10)
const SoloHarm = new Tone.Solo().toDestination();
SoloArr.push(SoloHarm);
const SliderVolHarm = document.getElementById("VolHarm");
SliderVolHarm.value = VolHarm.volume.value;
const ButtSoloHarm = document.getElementById("solo-harm");
const MuteHarm = document.getElementById("mute-harm");
SliderVolHarm.oninput = function(){
    VolHarm.volume.value = SliderVolHarm.value;
}
ButtSoloHarm.onclick = function(){
    ToggleSolo(SoloArr, SoloHarm);
}
MuteHarm.onclick = function(){
    VolHarm.mute = !VolHarm.mute;
}

//Volumi Solo e Mute Ritmo
const VolRhy1 = new Tone.Volume(-10);
const VolRhy2 = new Tone.Volume(-10);
const VolRhy3 = new Tone.Volume(-10);
const SoloRhy1 = new Tone.Solo().toDestination();
const SoloRhy2 = new Tone.Solo().toDestination();
const SoloRhy3 = new Tone.Solo().toDestination();
SoloArr.push(SoloRhy1, SoloRhy2, SoloRhy3);
const SliderVolRhy1 = document.getElementById("VolRhy1");
SliderVolRhy1.value = VolRhy1.volume.value;
const SliderVolRhy2 = document.getElementById("VolRhy2");
SliderVolRhy2.value = VolRhy2.volume.value;
const SliderVolRhy3 = document.getElementById("VolRhy3");
SliderVolRhy3.value = VolRhy3.volume.value;
const ButtSoloRhy1 = document.getElementById("solo1");
const ButtSoloRhy2 = document.getElementById("solo2");
const ButtSoloRhy3 = document.getElementById("solo3");
const MuteRhy1 = document.getElementById("mute1");
const MuteRhy2 = document.getElementById("mute2");
const MuteRhy3 = document.getElementById("mute3");
SliderVolRhy1.oninput = function(){
    VolRhy1.volume.value = SliderVolRhy1.value;
}
SliderVolRhy2.oninput = function(){
    VolRhy2.volume.value = SliderVolRhy2.value;
}
SliderVolRhy3.oninput = function(){
    VolRhy3.volume.value = SliderVolRhy3.value;
}
ButtSoloRhy1.onclick = function(){
    ToggleSolo(SoloArr, SoloRhy1);
}
ButtSoloRhy2.onclick = function(){
    ToggleSolo(SoloArr, SoloRhy2);
}
ButtSoloRhy3.onclick = function(){
    ToggleSolo(SoloArr, SoloRhy3);
}
MuteRhy1.onclick = function(){
    VolRhy1.mute = !VolRhy1.mute;
}
MuteRhy2.onclick = function(){
    VolRhy2.mute = !VolRhy2.mute;
}
MuteRhy3.onclick = function(){
    VolRhy3.mute = !VolRhy3.mute;
}

var synth = new Tone.PolySynth().set({
    envelope: {
        attack: 0.5,
        decay: 0.5,
        sustain: 0.5,
        release: 0.5
    },
    maxPolyphony: 32
}).chain(phaser, distortion, delay, PanMel, VolMel, SoloMel, tremolo);

const MelWave = document.getElementById("selectWaveMel");
MelWave.onchange = function(){
    synth.set({oscillator: {
        type: MelWave.value
    }});
}

const HarmWave = document.getElementById("selectWaveHarm");
HarmWave.onchange = function(){
    synth2.set({oscillator: {
        type: HarmWave.value
    }});
}

var synth2 = new Tone.PolySynth().set({
    envelope: {
    attack: 0.5,
    decay: 0.2,
    sustain: 1.0,
    release: 4
    },
    maxPolyphony: 32
}).chain(VolHarm, PanHarm, SoloHarm);

var atkValue = document.getElementById("atkslider")
atkValue.value = synth.get().envelope.attack;
atkValue.onchange = () => {
    synth.set({envelope: {
        attack: parseFloat(atkValue.value)
    }})
}

var decayValue = document.getElementById("decayslider")
decayValue.value = synth.get().envelope.decay;
decayValue.onchange = () => {
    synth.set({envelope: {
        decay: parseFloat(decayValue.value)
    }}) 
}

var susValue = document.getElementById("susslider")
susValue.value = synth.get().envelope.sustain;
susValue.onchange = () => {
    synth.set({envelope: {
        sustain: parseFloat(susValue.value)
    }}) 
}

var relValue = document.getElementById("relslider")
relValue.value = synth.get().envelope.release;
relValue.onchange = () => {
    synth.set({envelope: {
        release: parseFloat(relValue.value)
    }})
}

initrPad1Butt = document.getElementById('initNeuronsPad1');
initrPad1Butt.onclick = function(){
    const n1 = document.getElementById("NeuronsPad1").value;
    const h1 = 200;
    const w1 = 200;
    const shape1 = document.getElementById("selectShape1").value;
    soundRhythm1 = SoundDictionary[document.getElementById("soundP1").value];
    if(n1<4 || n1>32 || shape1 == "Metric" || soundRhythm1 == undefined){
        document.getElementById("errorMessage1").innerText = "Compilare correttamente tutti i campi!"
        return;
    }
    else{
        const rPad1 = SVG().addTo("#rhythm-pad1").size(w1, h1);
        document.getElementById("rhythm-pad1").classList.add(shape1);
        //document.getElementById("clickPad1").children[0].classList.add("click"+shape1);
        metricRhythm1 = MetricDictionary[shape1];
        nrPad1 = new RhythmNeurons("1", n1, w1, h1, rPad1, shape1, Tone.Transport.bpm.value, VolRhy1, SoloRhy1, PanRhy1);
        document.getElementById('init1').classList.add('disabledNeurons');
        document.getElementById('afterInit1').classList.remove('disabledNeurons');
        nrPad1.initNeurons();
        if(learningButton.disabled){
            learningButton.disabled = "";
        }
    }
}

initrPad2Butt = document.getElementById('initNeuronsPad2');
initrPad2Butt.onclick = function(){
    const n2 = document.getElementById("NeuronsPad2").value;
    const h2 = 200;
    const w2 = 200;
    const shape2 = document.getElementById("selectShape2").value;
    soundRhythm2 = SoundDictionary[document.getElementById("soundP2").value];
    if(n2<4 || n2>32 || shape2 == "Metric" || soundRhythm2 == undefined){
        document.getElementById("errorMessage2").innerText = "Compilare correttamente tutti i campi!"
        return;
    }
    else{
        const rPad2 = SVG().addTo("#rhythm-pad2").size(w2, h2);
        document.getElementById("rhythm-pad2").classList.add(shape2);
        //document.getElementById("clickPad2").children[0].classList.add("click"+shape2);
        metricRhythm2 = MetricDictionary[shape2];
        //console.log(metricRhythm2);
        nrPad2 = new RhythmNeurons("2", n2, w2, h2, rPad2, shape2, Tone.Transport.bpm.value, VolRhy2, SoloRhy2, PanRhy2);
        document.getElementById('init2').classList.add('disabledNeurons');
        document.getElementById('afterInit2').classList.remove('disabledNeurons');
        nrPad2.initNeurons();
        if(learningButton.disabled){
            learningButton.disabled = "";
        }
    }
}


initrPad3Butt = document.getElementById('initNeuronsPad3');
initrPad3Butt.onclick = function(){
    const n3 = document.getElementById("NeuronsPad3").value;
    const h3 = 200;
    const w3 = 200;
    const shape3 = document.getElementById("selectShape3").value;
    soundRhythm3 = SoundDictionary[document.getElementById("soundP3").value];
    if(n3<4 || n3>32 || shape3 == "Metric" || soundRhythm3 == undefined){
        document.getElementById("errorMessage3").innerText = "Compilare correttamente tutti i campi!"
        return;
    }
    else{
        const rPad3 = SVG().addTo("#rhythm-pad3").size(w3, h3);
        document.getElementById("rhythm-pad3").classList.add(shape3);
        //document.getElementById("clickPad3").children[0].classList.add("click"+shape3);
        metricRhythm3 = MetricDictionary[shape3];
        //console.log(metricRhythm3);
        nrPad3 = new RhythmNeurons("3", n3, w3, h3, rPad3, shape3, Tone.Transport.bpm.value, VolRhy3, SoloRhy3, PanRhy3);
        document.getElementById('init3').classList.add('disabledNeurons');
        document.getElementById('afterInit3').classList.remove('disabledNeurons');
        nrPad3.initNeurons();
        if(learningButton.disabled){
            learningButton.disabled = "";
        }
    }
}

var actMel = false;
initmPadButt = document.getElementById("initMelodicPad");
initmPadButt.onclick = function(){
    const nm = document.getElementById("NeuronsPadMel").value;
    const lm = 200;
    metricMelodic = parseFloat(document.getElementById("selectMetricMel").value);
    console.log(metricMelodic);
    const wavem = document.getElementById("selectWaveMel").value;
    modeMelodic = document.getElementById("selectScaleMel").value;
    BaseNote = FreqencyDictionary[document.getElementById("selectKeyMel").value];

    if(nm<4 || nm>32 || metricMelodic == 0 || wavem == "Wave Type" || modeMelodic == "Scale" || BaseNote == undefined){
        document.getElementById("errorMessagem").innerText = "Compilare correttamente tutti i campi!"
        return;
    }
    else{
        document.getElementById("selectScaleMel").disabled = "disabled";
        document.getElementById("selectKeyMel").disabled = "disabled";
        synth.set({oscillator: {
            type: wavem
        }});
        const mPad = SVG().addTo("#melodic-pad").size(lm,lm);
        nmPad = new MelodicNeurons(nm, lm, mPad, modeMelodic);
        document.getElementById('init-mel').classList.add('disabledNeurons');
        document.getElementById('afterInit-mel').classList.remove('disabledNeurons');
        nmPad.initNeurons();
        actMel = true;
        if(learningButton.disabled){
            learningButton.disabled = "";
        }
    }
}

inithPadButt = document.getElementById("initNeuronsPadHarm");
inithPadButt.onclick = function(){
    const nh = document.getElementById("NeuronsPadHarm").value;
    const lh = 200;
    const waveh = document.getElementById("selectWaveHarm").value;
    if(nh<4 || nh>12 || actMel == false || waveh == "Wave Type"){
        document.getElementById("errorMessageh").innerText = "Compilare correttamente tutti i campi!\nQuesto Pad necessita l'inizializzazione del Pad Melidico"
        return;
    }
    else{
        const hPad = SVG().addTo("#harmonic-pad1").size(lh,lh);
        synth2.set({oscillator: {
            type: waveh
        }});
        nhPad = new HarmonicNeurons(nh, lh, hPad, Tone.Transport.bpm.value);
        document.getElementById('Harmonicinit').classList.add('disabledNeurons');
        document.getElementById('afterInitHarm').classList.remove('disabledNeurons');
        nhPad.initNeurons();
        if(learningButton.disabled){
            learningButton.disabled = "";
        }
    }
}




var arrPart = [];

//rhythm

function startLearning(){
    var RhythmPart1;
    var RhythmPart2;
    var RhythmPart3;
    var MelodicPart;
    var HarmonicPart;
    if(nrPad1.getN() != 0){
        var id1 = window.requestAnimationFrame(startRhythm.bind(window, RhythmPart1, nrPad1, soundRhythm1, metricRhythm1, id1));
    }
    else{
        console.log("RhythmPad1 not initialized")
    }

    if(nrPad2.getN() != 0){
        var id2 = window.requestAnimationFrame(startRhythm.bind(window, RhythmPart2, nrPad2, soundRhythm2, metricRhythm2, id2));
    }
    else{
        console.log("RhythmPad2 not initialized")
    }
    
    if(nrPad3.getN() != 0){
        var id3 = window.requestAnimationFrame(startRhythm.bind(window, RhythmPart3, nrPad3, soundRhythm3, metricRhythm3, id3));
    }
    else{
        console.log("RhythmPad3 not initialized")
    }
    if(nmPad.getN()!= 0){
        var id4 = window.requestAnimationFrame(startMelodic.bind(window, MelodicPart, nmPad, BaseNote, metricMelodic, id4));
    }
    else{
        console.log("MelodicPad not initialized")
    }
    if(nhPad.getN()!=0){
        console.log(metricMelodic);
        var id5 = window.requestAnimationFrame(startHarmonic.bind(window, HarmonicPart, nhPad, metricMelodic, BaseNote, id5));
    }
    else{
        console.log("Harmonic Pad not inizialized");
    }
    
}

var loopEnd = 0;

//start
var melodicDurr = 0;
var melodicPos = 0;
function startMelodic(Part, Neurons, bn, metric, id){
    if(Neurons.getEps()<=0.15){
        cancelAnimationFrame(id);
        PlayButt.disabled = "";
        melodicDurr = Neurons.calcDistNormNeu();
        melodicPos = Neurons.calcPosPad();
        Part = new MelodicSound(melodicDurr, melodicPos, Tone.Transport.bpm.value, metric, bn, Neurons.getCtx(), synth);
        Part.initPart();
        Part.createPart();
        loopEnd = Part.getLoopEnd();
    }
    else{
        Neurons.render();
        id = window.requestAnimationFrame(startMelodic.bind(window, Part, Neurons, bn, metric, id));
    }
}

function startHarmonic(Part, Neurons, metric, bn, id){
    if(Neurons.getEps()<=0.15){
        cancelAnimationFrame(id);
        PlayButt.disabled = "";
        Part = new HarmonicSound(Neurons.calcDistNormNeu(), loopEnd, Tone.Transport.bpm.value, metric, bn, Neurons.getCtx(), synth2, melodicPos,  melodicDurr, modeMelodic);
        Part.initPart();
        Part.createPart();
    }
    else{
        Neurons.render();
        id = window.requestAnimationFrame(startHarmonic.bind(window, Part, Neurons, metric, bn, id));
    }
}

function startRhythm(Part, Neurons, sound, metric, id){
    if(Neurons.getEps() <= 0.15){
        cancelAnimationFrame(id);
        if(Neurons.getShape() == "rect"){
            //console.log(document.getElementById("clickPad1"))
            document.getElementById("clickPad"+Neurons.getPad()).style.display="";
            var a = SVG(document.getElementById("clickPad"+Neurons.getPad()).children[0]);
            a.attr({cx: 6, cy: 7.5});
        }
        else if(Neurons.getShape() == "tri"){
            document.getElementById("clickPad"+Neurons.getPad()).style.display="";
            var a = SVG(document.getElementById("clickPad"+Neurons.getPad()).children[0]);
            a.attr({cx: Neurons.getWidth()/2+6, cy: 11});
        }
        else{
            /* var a = Neurons.getCtx().rect(4, 4).attr({x: Neurons.getWidth()/2-2, y: Neurons.getHeight()-Neurons.getWidth()/(1+2*Math.cos(72/180*Math.PI))*(Math.sin(72/180*Math.PI)+Math.cos(54/180*Math.PI))}).css({fill: "white"}) */
            document.getElementById("clickPad"+Neurons.getPad()).style.display="";
            var a = SVG(document.getElementById("clickPad"+Neurons.getPad()).children[0]);
            a.attr({cx: Neurons.getWidth()/2+5, cy: 8+Neurons.getHeight()-Neurons.getWidth()/(1+2*Math.cos(72/180*Math.PI))*(Math.sin(72/180*Math.PI)+Math.cos(54/180*Math.PI))})
        }
        
        Neurons.visualClick(a);
        PlayButt.disabled = "";
        //PlayClick.disabled = "";
        Part = new RhythmSound(Neurons.calcDistNormNeu(), Tone.Transport.bpm.value, sound, metric, Neurons.getCtx(), Neurons.getVol(), Neurons.getSol(), Neurons.getPan());
        //const MelodicPart = new MelodicSound(nmPad.calcDistNormNeu(), nmPad.calcPosPad(), bpm, 4, 440);
        Part.createPart();
        arrPart.push(Part.getarrDur());
        //console.log(arrPart)
        //MelodicPart.createPart(); 
    }
    else{
        Neurons.render();
        id = window.requestAnimationFrame(startRhythm.bind(window, Part, Neurons, sound, metric, id));
    }
    
}

//learning button
var learning = false;
learningButton.onclick = () => {
    if(!learning){
        startLearning();
        learningButton.innerText = '↻';
        learning = true;
    }
    else{
        window.location.reload();
    }
}

//Play/Pause Button
var playing = false;
function play(){
    PlayButt.innerText = "Pause";
    var currTime = Tone.now();
    Tone.Transport.start(currTime);
}
PlayButt.onclick = async () => {
    await Tone.start();
    if(!playing){
        playing = true;
        play();

    }
    else{
        Tone.Transport.pause(Tone.now());
        PlayButt.innerText = "Play";
        playing = false;
    }
}





//effects bitcrusher, chorus, delay