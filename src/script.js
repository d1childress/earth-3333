import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// load 
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('https://i.ibb.co/T0xQKsr/Normal-Map.png')
// debug
const gui = new dat.GUI()

// canvas
const canvas = document.querySelector('canvas.webgl')

// scene
const scene = new THREE.Scene()

// objects 
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// materials 
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;
material.color = new THREE.Color(0x4285f4)

// mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// lights 1
const pointLight = new THREE.PointLight(0xffffff, 0.7)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// default camera light 2 position
const pointLight2 = new THREE.PointLight(0xf74f, 2)
pointLight2.position.set(-1.5,-0.3,0.9)
pointLight2.intensity = 8.5
scene.add(pointLight2)
// light 1 folder
const light1 = gui.addFolder('Light 1')

// camera controls
light1.add(pointLight2.position, 'y').min(-5).max(5).step(0.3)
light1.add(pointLight2.position, 'x').min(-5).max(5).step(0.3)
light1.add(pointLight2.position, 'z').min(-5).max(5).step(0.3)
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.1)


const light1Color = {
    color: 0xffffff
}

light1.addColor(light1Color, 'color')
    .onChange(() => {
        pointLight2.color.set(light1Color.color)
    })

//const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
//scene.add(pointLightHelper)

// light 3
const pointLight3 = new THREE.PointLight(0x94e93, 2)
pointLight3.position.set(1.4,2.1,0)
pointLight3.intensity = 8.8
scene.add(pointLight3)
// light 2 folder
const light2 = gui.addFolder('Light 2')

// camera controls
light2.add(pointLight3.position, 'y').min(-5).max(5).step(0.3)
light2.add(pointLight3.position, 'x').min(-5).max(5).step(0.3)
light2.add(pointLight3.position, 'z').min(-5).max(5).step(0.3)
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.1)

const light2Color = {
    color: 0xffffff
}

light2.addColor(light2Color, 'color')
    .onChange(() => {
        pointLight3.color.set(light2Color.color)
    })

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper2)


// sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

 // camera
// base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)


// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// animate

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 2
    mouseY = (event.clientY - windowHalfY) / 2
}

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * 0.02
    targetY = mouseY * 0.02

    const elapsedTime = clock.getElapsedTime()

    // update objects
    sphere.rotation.y = .3 * elapsedTime
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)

    // update Orbital Controls
    // controls.update()

    // render
    renderer.render(scene, camera)

    // call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()