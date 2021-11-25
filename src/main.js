import MelodicNeurons from './MelodicNeurons.js';
import RhythmNeurons from './RhythmNeurons';
import RhythmSound from './RhythmSound';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import * as Tone from 'tone';
import { Context, TransportTime } from 'tone';

const PlayButt = document.getElementById('rhythm-button');
PlayButt.disabled = "";





//prova
const soundctx = new Context();
var arrprova = [0, 1, 2, 3];
var bpm = Tone.Transport.bpm.value = 120;

kickurl = document.getElementById("kickSample").src;
snareurl = document.getElementById("snareSample").src;
hihaturl = document.getElementById("hihatSample").src;
E808url = document.getElementById("808Sample").src;
clickurl = document.getElementById("clickSample").src;

console.log(kickurl);
console.log(snareurl);
console.log(hihaturl);

//click
const clickGain = new Tone.Gain(0).toDestination();
const PlayClick = document.getElementById('click-button');
PlayClick.disabled = "";
arrclick = [0, 1];
const click = new RhythmSound(arrclick, bpm, clickurl);
click.createPart();



const h = parseFloat(document.getElementById("rect").clientHeight);
const w = parseFloat(document.getElementById("rect").clientWidth);
const l = parseFloat(document.getElementById("melodic").clientWidth);

//prova neuroni ritmo
const n = 16;
const Rect = SVG().addTo('#rect').size(w, h);
const nRect = new RhythmNeurons(n, w, h, Rect, "rect");

const Tri = SVG().addTo('#tri').size(w, h);
const nTri = new RhythmNeurons(n, w, h, Tri, "tri");

const Pent = SVG().addTo("#pent").size(w, h);
const nPent = new RhythmNeurons(n, w, h, Pent, "pent");

nRect.initNeurons();
nTri.initNeurons();
nPent.initNeurons();

//prova neuroni melodici

const Mel = SVG().addTo('#melodic').size(l, l);
const nMel = new MelodicNeurons(16, l, Mel, "petmin");

nMel.initNeurons();



//start
function start(Neurons, id){
    if(Neurons.getEps() <= 0.15){
        cancelAnimationFrame(id);
        PlayButt.disabled = "";
        PlayClick.disabled = "";
        const RhythmPart1 = new RhythmSound(nRect.calcDistNormNeu(), bpm, E808url);
        const RhythmPart2 = new RhythmSound(nTri.calcDistNormNeu(), bpm, snareurl);
        const RhythmPart3 = new RhythmSound(nPent.calcDistNormNeu(), bpm, hihaturl);
        /* RhythmPart1.createPart();
        RhythmPart2.createPart();
        RhythmPart3.createPart(); */
    }
    else{
        Neurons.render();
        id = window.requestAnimationFrame(start.bind(window, Neurons, id));
    }
    
}

 
//rhythm
var id1 = window.requestAnimationFrame(start.bind(window, nRect, id1));
var id2 = window.requestAnimationFrame(start.bind(window, nTri, id2));
var id3 = window.requestAnimationFrame(start.bind(window, nPent, id3));

//melody

var id4 = window.requestAnimationFrame(start.bind(window, nMel, id4)); 

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