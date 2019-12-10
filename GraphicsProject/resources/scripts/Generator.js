"use strict";

let scene, camera, renderer;
let cameraControls;

let sceneLights = [];
let sceneObjects = [];

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

console.log("I LIVE!");

init();
render();

function init()
{
	console.log("initializing...");
	scene = new THREE.Scene();
	initRenderer();
	initScene();
}

function render()
{
	console.log("rendering...");
	renderer.render(scene, camera);
	handleWindowResize();
	console.log("...done");
}

function initRenderer()
{
	console.log("creating renderer...");
	renderer = new THREE.WebGLRenderer({
		antialias : true,
		alpha : true,
		depth : true
	});
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(new THREE.Color(0xFFFFFF), 1);
	renderer.setPixelRatio(window.devicePixelRatio);
	document.body.appendChild(renderer.domElement);
	console.log("...done");
}

function initScene()
{
	console.log("creating scene...");
	
	initCamera();

	console.log("creating lighting...");
		initLighting();
	console.log("...done");

	console.log("adding temporary object...");
		// Basic Object to have something to look at
		let geometry = new THREE.SphereBufferGeometry(2.0, 16, 16);
		let material = new THREE.MeshBasicMaterial();
		material.color = new THREE.Color(0x222324);
		material.wireframe = true;

		let sphere = new THREE.Mesh(geometry, material);
		scene.add(sphere);
	console.log("...done");

	console.log("...done");
}

function initCamera()
{
	console.log("creating camera...");
	camera = new THREE.PerspectiveCamera(90, WIDTH/HEIGHT, 1, 1000);
	camera.position.set(0, 10, 0);
	camera.lookAt(scene.position);
	console.log("...done");
	cameraControls = new THREE.FirstPersonControls(camera, renderer.domElement);
	cameraControls.addEventListener("change", 
									function ()
									{
										camera.updateProjectionMatrix();
										render();
									});

}

function initLighting()
{
	console.log("TODO: add lighting");
	// nothing right now
}

function handleWindowResize()
{
	window.addEventListener("resize",
							function ()
							{
								WIDTH = window.innerWidth;
								HEIGHT = window.innerHeight;
								renderer.setSize(WIDTH, HEIGHT);
								camera.aspect = WIDTH / HEIGHT;
								camera.updateProjectionMatrix();
								render();
							})
}