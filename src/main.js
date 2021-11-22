import MelodicNeurons from './MelodicNeurons.js';
import RhythmNeurons from './RhythmNeurons';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';



const h = parseFloat(document.getElementById("rect").clientHeight);
const w = parseFloat(document.getElementById("rect").clientWidth);
const l = parseFloat(document.getElementById("melodic").clientWidth);

//prova neuroni ritmo
const n = 32;
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
        console.log(Neurons.getEps());
        cancelAnimationFrame(id);
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