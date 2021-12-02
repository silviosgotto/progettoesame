import MelodicNeurons from './MelodicNeurons.js';
import RhythmNeurons from './RhythmNeurons';
import RhythmSound from './RhythmSound';
import MelodicSound from './MelodicSound';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import * as Tone from 'tone';
import { Context, TransportTime } from 'tone';

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


const PlayButt = document.getElementById('rhythm-button');
PlayButt.disabled = true;




//ToneJs
Tone.Transport.bpm.value = 120;
var bpm = Tone.Transport.bpm.value;

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
        metricRhythm1 = MetricDictionary[shape1];
        nrPad1 = new RhythmNeurons(n1, w1, h1, rPad1, shape1, bpm);
        console.log(nrPad1);
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
        metricRhythm2 = MetricDictionary[shape2];
        console.log(metricRhythm2);
        nrPad2 = new RhythmNeurons(n2, w2, h2, rPad2, shape2, bpm);
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
        metricRhythm3 = MetricDictionary[shape3];
        console.log(metricRhythm3);
        nrPad3 = new RhythmNeurons(n3, w3, h3, rPad3, shape3, bpm);
        document.getElementById('init3').classList.add('disabledNeurons');
        document.getElementById('afterInit3').classList.remove('disabledNeurons');
        nrPad3.initNeurons();
    }
}




var arrPart = [];

//rhythm
function startLearning(){
    var RhythmPart1;
    var RhythmPart2;
    var RhythmPart3;
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
    
}


//prova neuroni melodici
/* const mPad = SVG().addTo('#melodic-pad').size(500, 500);
const nmPad = new MelodicNeurons(8, lmel, mPad, "esa");

nmPad.initNeurons(); 

var id4 = window.requestAnimationFrame(start.bind(window, nmPad, id4)); */

//start
function startRhythm(Part, Neurons, sound, metric, id){
    if(Neurons.getEps() <= 0.15){
        cancelAnimationFrame(id);
        if(Neurons.getShape() == "rect"){
            var a = Neurons.getCtx().rect(4, 4).attr({x: 0, y: 0}).css({fill: "white"})
        }
        else if(Neurons.getShape() == "tri"){
            var a = Neurons.getCtx().rect(4, 4).attr({x: Neurons.getWidth()/2-2, y: 0}).css({fill: "white"})
        }
        else{
            var a = Neurons.getCtx().rect(4, 4).attr({x: Neurons.getWidth()/2-2, y: Neurons.getHeight()-Neurons.getWidth()/(1+2*Math.cos(72/180*Math.PI))*(Math.sin(72/180*Math.PI)+Math.cos(54/180*Math.PI))}).css({fill: "white"})
        }
        
        Neurons.visualClick(a);
        PlayButt.disabled = "";
        PlayClick.disabled = "";
        Part = new RhythmSound(Neurons.calcDistNormNeu(), bpm, sound, metric, Neurons.getCtx());
        //const MelodicPart = new MelodicSound(nmPad.calcDistNormNeu(), nmPad.calcPosPad(), bpm, 4, 440);
        Part.createPart();
        arrPart.push(Part.getarrDur());
        console.log(arrPart)
        //MelodicPart.createPart(); 
    }
    else{
        Neurons.render();
        id = window.requestAnimationFrame(startRhythm.bind(window, Part, Neurons, sound, metric, id));
    }
    
}

 
const learningButton = document.getElementById("neurons-button");
learningButton.onclick = () => startLearning();

 //melody
function play(){
    Tone.start();
    var currTime = Tone.now();
    Tone.Transport.start(currTime);
}

function setClickGain(){
    if(clickGain.gain.getValueAtTime(Tone.now()) == 0){
        clickGain.gain.setValueAtTime(1, Tone.now());
    }
    else{
        clickGain.gain.setValueAtTime(0, Tone.now());
    }
    console.log(clickGain.gain.getValueAtTime(Tone.now()))
}
//bottone
PlayButt.onclick = () => play();

PlayClick.onclick = () => setClickGain();