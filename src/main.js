import MelodicNeurons from './MelodicNeurons.js';
import RhythmNeurons from './RhythmNeurons';
import RhythmSound from './RhythmSound';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import * as Tone from 'tone';
import { Context, TransportTime } from 'tone';

const PlayButt = document.getElementById('rhythm-button');
PlayButt.disabled = "";





//prova
var bpm = Tone.Transport.bpm.value = 60;

kickurl = document.getElementById("kickSample").src;
snareurl = document.getElementById("snareSample").src;
hihaturl = document.getElementById("hihatSample").src;
E808url = document.getElementById("808Sample").src;
clickurl = document.getElementById("clickSample").src;

//click
const clickGain = new Tone.Gain(0).toDestination();
const PlayClick = document.getElementById('click-button');
PlayClick.disabled = "";
arrclick = [0, 1];
const click = new RhythmSound(arrclick, bpm, clickurl, 1);
//click.createPart();



const h = parseFloat(document.getElementById("rhythm-pad1").clientHeight);
const w = parseFloat(document.getElementById("rhythm-pad1").clientWidth);
const l = parseFloat(document.getElementById("rhythm-pad3").clientWidth);

//prova neuroni ritmo
const n1 = 8;
const n2 = 8;
const n3 = 8;

const rPad1 = SVG().addTo('#rhythm-pad1').size(w, h);
const nrPad1 = new RhythmNeurons(n1, w, h, rPad1, "rect");

const rPad2 = SVG().addTo('#rhythm-pad2').size(w, h);
const nrPad2 = new RhythmNeurons(n2, w, h, rPad2, "rect");

const rPad3 = SVG().addTo("#rhythm-pad3").size(w, h);
const nrPad3 = new RhythmNeurons(n3, w, h, rPad3, "rect");


function initNeuronsPad(Neurons){
    Neurons.initNeurons();
}

nrPad1.initNeurons();
nrPad2.initNeurons();
nrPad3.initNeurons();

//rhythm
var id1 = window.requestAnimationFrame(start.bind(window, nrPad1, id1));
var id2 = window.requestAnimationFrame(start.bind(window, nrPad2, id2));
var id3 = window.requestAnimationFrame(start.bind(window, nrPad3, id3));

//prova neuroni melodici

/* const Mel = SVG().addTo('#melodic').size(l, l);
const nMel = new MelodicNeurons(16, l, Mel, "petmin");

nMel.initNeurons(); */



//start
function start(Neurons, id){
    if(Neurons.getEps() <= 0.15){
        cancelAnimationFrame(id);
        PlayButt.disabled = "";
        PlayClick.disabled = "";
        const RhythmPart1 = new RhythmSound(nrPad1.calcDistNormNeu(), bpm, kickurl, 4);
        const RhythmPart2 = new RhythmSound(nrPad2.calcDistNormNeu(), bpm, snareurl, 4);
        const RhythmPart3 = new RhythmSound(nrPad3.calcDistNormNeu(), bpm, hihaturl, 4);
        RhythmPart1.createPart();
        RhythmPart2.createPart();
        RhythmPart3.createPart(); 
    }
    else{
        Neurons.render();
        id = window.requestAnimationFrame(start.bind(window, Neurons, id));
    }
    
}

 


/* //melody

var id4 = window.requestAnimationFrame(start.bind(window, nMel, id4));  */

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