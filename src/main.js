import MelodicNeurons from './MelodicNeurons.js';
import RhythmNeurons from './RhythmNeurons.js';
import RhythmSound from './RhythmSound.js';
import MelodicSound from './MelodicSound.js';
import HarmonicNeurons from './HarmonicNeurons.js';
import HarmonicSound from './HarmonicSound.js';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import * as Tone from 'tone';
import { Context, dbToGain, TransportTime } from 'tone';
import * as bootstrap from 'bootstrap';


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
PlayButt.disabled = true;


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

clickurl = document.getElementById("clickSample").src;

//click
const clickGain = new Tone.Gain(0).toDestination();
const PlayClick = document.getElementById('click-button');
PlayClick.disabled = "";
arrclick = [0, 1];
const click = new RhythmSound(arrclick, bpm, clickurl, 1);
//click.createPart();



const lmel = parseFloat(document.getElementById("melodic-pad").clientWidth);

//prova neuroni ritmo

var nrPad1 = new RhythmNeurons(0, 0, 0, "", "", bpm);
var nrPad2 = new RhythmNeurons(0, 0, 0, "", "", bpm);
var nrPad3 = new RhythmNeurons(0, 0, 0, "", "", bpm);
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


var wd = 1;
var dt = "8n";
var fd = 0;

var delay = new Tone.FeedbackDelay({delayTime:dt, wet:wd, feedback: fd}).toDestination();

var synth = new Tone.Synth({
    volume: 3,
    envelope: {
        attack: 0.5,
        decay: 0.5,
        sustain: 0.5,
        release: 0.5
    }
}).toDestination();

var synth2 = new Tone.PolySynth({volume: -8}).set({envelope: {
    attack: 0.5,
    decay: 0.2,
    sustain: 1.0,
    release: 4
}}).toDestination();

var atkValue = document.getElementById("atkslider")
atkValue.onchange = () => {
    synth.envelope.attack = parseFloat(atkValue.value);
}

var decayValue = document.getElementById("decayslider")
decayValue.onchange = () => {
    synth.envelope.decay = parseFloat(decayValue.value);
}

var susValue = document.getElementById("susslider")
susValue.onchange = () => {
    synth.envelope.sustaun = parseFloat(susValue.value);
}

var relValue = document.getElementById("relslider")
relValue.onchange = () => {
    synth.envelope.release = parseFloat(relValue.value);
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
        nrPad1 = new RhythmNeurons("1", n1, w1, h1, rPad1, shape1, Tone.Transport.bpm.value);
        document.getElementById('init1').classList.add('disabledNeurons');
        document.getElementById('afterInit1').classList.remove('disabledNeurons');
        nrPad1.initNeurons();
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
        nrPad2 = new RhythmNeurons("2", n2, w2, h2, rPad2, shape2, Tone.Transport.bpm.value);
        document.getElementById('init2').classList.add('disabledNeurons');
        document.getElementById('afterInit2').classList.remove('disabledNeurons');
        nrPad2.initNeurons();
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
        nrPad3 = new RhythmNeurons("3", n3, w3, h3, rPad3, shape3, Tone.Transport.bpm.value);
        document.getElementById('init3').classList.add('disabledNeurons');
        document.getElementById('afterInit3').classList.remove('disabledNeurons');
        nrPad3.initNeurons();
    }
}

var actMel = false;
initmPadButt = document.getElementById("initMelodicPad");
initmPadButt.onclick = function(){
    const nm = document.getElementById("NeuronsPadMel").value;
    const lm = 200;
    metricMelodic = parseFloat(document.getElementById("selectMetricMel").value);
    const wavem = document.getElementById("selectWaveMel").value;
    synth.oscillator.type = wavem;
    modeMelodic = document.getElementById("selectScaleMel").value;
    BaseNote = FreqencyDictionary[document.getElementById("selectKeyMel").value];

    if(nm<4 || nm>32 || metricMelodic == "Metric" || wavem == "Wave Type" || modeMelodic == "Scale" || BaseNote == undefined){
        document.getElementById("errorMessagem").innerText = "Compilare correttamente tutti i campi!"
        return;
    }
    else{
        document.getElementById("selectScaleMel").disabled = "disabled";
        document.getElementById("selectKeyMel").disabled = "disabled";
        const mPad = SVG().addTo("#melodic-pad").size(lm,lm);
        nmPad = new MelodicNeurons(nm, lm, mPad, modeMelodic);
        document.getElementById('init-mel').classList.add('disabledNeurons');
        document.getElementById('afterInit-mel').classList.remove('disabledNeurons');
        nmPad.initNeurons();
        actMel = true;
    }
}

inithPadButt = document.getElementById("initNeuronsPadHarm");
inithPadButt.onclick = function(){
    const nh = document.getElementById("NeuronsPadHarm").value;
    const lh = 200;
    if(nh<4 || nh>12 || actMel == false){
        document.getElementById("errorMessageh").innerText = "Compilare correttamente tutti i campi!\nQuesto Pad necessita l'inizializzazione del Pad Melidico"
        return;
    }
    else{
        const hPad = SVG().addTo("#harmonic-pad1").size(lh,lh);
        nhPad = new HarmonicNeurons(nh, lh, hPad, Tone.Transport.bpm.value);
        document.getElementById('Harmonicinit').classList.add('disabledNeurons');
        document.getElementById('afterInitHarm').classList.remove('disabledNeurons');
        nhPad.initNeurons();
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
        PlayClick.disabled = "";
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
        PlayClick.disabled = "";
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
        PlayClick.disabled = "";
        Part = new RhythmSound(Neurons.calcDistNormNeu(), Tone.Transport.bpm.value, sound, metric, Neurons.getCtx());
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

 
const learningButton = document.getElementById("neurons-button");
learningButton.onclick = () => startLearning();



 //play butt
function play(){
    Tone.start();
    var currTime = Tone.now();
    Tone.Transport.start(currTime);
}
/* 
function setClickGain(){
    if(clickGain.gain.getValueAtTime(Tone.now()) == 0){
        clickGain.gain.setValueAtTime(1, Tone.now());
    }
    else{
        clickGain.gain.setValueAtTime(0, Tone.now());
    }
    console.log(clickGain.gain.getValueAtTime(Tone.now()))
} */
//bottone
PlayButt.onclick = () => play();

/* PlayClick.onclick = () => setClickGain(); */


