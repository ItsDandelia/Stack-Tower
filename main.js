import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();
scene.background =  new THREE.Color(0xff00ff);

var camera = new THREE.PerspectiveCamera (75, window.innerWidth/window.innerHeight , 0.1, 1000);
camera.position.set(3,2.5,3);

var axis = new THREE.AxesHelper(1000);
scene.add(axis);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new OrbitControls(camera, renderer.domElement);

var static_geometry = new THREE.BoxGeometry(1,0.1,1);
var static_material = [
    new THREE.MeshBasicMaterial ( {color: 0xbdb76b}),
    new THREE.MeshBasicMaterial ( {color: 0xffff00}),
    new THREE.MeshBasicMaterial ({color: 0xffff00} ),
    new THREE.MeshBasicMaterial ( { color: 0xffff00}),
    new THREE.MeshBasicMaterial ({color: 0xbdb76b} ),
    new THREE.MeshBasicMaterial({color: 0xffff00} )
]

var block_material = new THREE.MeshFaceMaterial (static_material);
var stack = new THREE.Mesh(static_geometry, block_material);
stack.position.set(0.5,0,0.5);
scene.add(stack);

var static_block = function(){
    var geometry = new THREE.BoxGeometry(1,0.1,1);
    var material = [
        new THREE.MeshBasicMaterial ( {color: 0xbdb76b}),
        new THREE.MeshBasicMaterial ( {color: 0xffff00}),
        new THREE.MeshBasicMaterial ({color: 0xffff00} ),
        new THREE.MeshBasicMaterial ( { color: 0xffff00}),
        new THREE.MeshBasicMaterial ({color: 0xbdb76b} ),
        new THREE.MeshBasicMaterial({color: 0xffff00} )
    ]
    
    var block_material = new THREE.MeshFaceMaterial (material);
    var stacks = new THREE.Mesh(geometry, block_material);
    //stack.position.set(0.5,0.15,0.5);
    stacks.position.y = 0.15;
    stacks.position.z = 0.5;
    stacks.position.x = -1;
    
    scene.add(stacks);
    return stacks;
}
var stacks=static_block();
var flag =0;   
var moving_block = function(){
    var current_pos = stacks.position.x;
    //console.log(current_pos);    
    
    if (flag==0){
            stacks.position.x = stacks.position.x + 0.01;
            //console.log(stacks.position.x);
            if (stacks.position.x>=1.5){
                flag=1;
            }
    } else if (flag==1){
            stacks.position.x = stacks.position.x - 0.01;
            if (stacks.position.x<=-1){
                console.log('third',flag)
                flag=0;
            }
    } else if (flag == -1){
        stacks.position.x = stacks.position.x;
    }
    
}

// window.addEventListener("keydown",function(event){
//     if (event.keyCode===32){
//         console.log('spacebar pressed');
//     }
// });

window.addEventListener('click', onMouseMove, false);

function onMouseMove(event){
    flag = -1;
    var x1, x2, reformed_size;
    console.log(stacks.position.x);
    console.log(stack.position.x-0.5);
    if (stacks.position.x < (stack.position.x-0.5)){
        console.log('I am resizing');
        x1 = stacks.position.x + 0.5;
        x2 = stack.position.x - 0.5;
        console.log('x1',x1,x2);
       // reformed_size = x1 - x2;
        reformed_size = ( x1 - x2);
        console.log(stacks.position.x);
        console.log(reformed_size);
        stacks.scale.set(reformed_size, stacks.scale.y, stacks.scale.z);
        console.log(stacks.scale);
        //stack.scale.x = 0.75;
        console.log(stack.position.x+0.5);
        //stacks.position.x = (x1 +x2) / 2;
        stacks.position.y -= 0.05;
    }
    

}
console.log(flag);  
function animate(){
    if (flags==0){
        console.log('moving')
        moving_block();
    }
    controls.update();
    renderer.render (scene, camera);
    requestAnimationFrame(animate);
}
animate();
