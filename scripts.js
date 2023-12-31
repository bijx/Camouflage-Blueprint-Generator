import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

let currentCamoId = 1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x501537, 0.3);

document.body.appendChild(renderer.domElement);

camera.position.z = 8;

const ambientLight = new THREE.AmbientLight(0x404040, 100);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// LOAD MODEL
const loader = new GLTFLoader();
let loadedModel;

async function pickRandomWeapon() {
  try {
    // Fetch the JSON data from the specified file
    const response = await fetch('assets/modified_weapons.json');
    const data = await response.json();

    // Filter out the weapons that belong to the "Assault Rifle" or "Sniper Rifle" classes
    const weapons = data.weapons.filter(
      (weapon) =>
        weapon.class === 'Assault Rifle' ||
        weapon.class === 'Sniper' ||
        weapon.class === 'SMG' ||
        weapon.class === 'Pistol' ||
        weapon.class === 'LMG'
    );

    // If there are no weapons, return null or throw an error
    if (weapons.length === 0) {
      return null;
    }

    // Pick a random weapon
    const randomIndex = Math.floor(Math.random() * weapons.length);
    return weapons[randomIndex];
  } catch (error) {
    console.error('Error fetching or processing the weapons data:', error);
    throw error;
  }
}

function applyTexture(camoId = null) {
  let textureId = camoId ? camoId : Math.floor(Math.random() * 57) + 1;
  currentCamoId = textureId;
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(
    `camos/${textureId}.png`,
    function () {
      texture.flipY = false;
      const material = new THREE.MeshBasicMaterial({
        map: texture,
      });

      loadedModel.scene.traverse(function (child) {
        if (child.isMesh && child.name.includes('CAMO')) {
          child.material = material;
        }
      });
    },
    undefined,
    function (err) {
      console.error('An error happened.');
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  if (loadedModel && loadedModel.scene) {
    loadedModel.scene.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}
animate();

async function newWeapon() {
  let weaponInfo = await pickRandomWeapon();
  if (weaponInfo) {
    document.querySelector('.weapon-title').textContent = weaponInfo.weaponName;
    document.querySelector('.weapon-class').textContent = weaponInfo.class;
    document.querySelector('.weapon-desc').textContent = weaponInfo.description;

    loadModel(weaponInfo); // Load the appropriate model

    // Restart the fade-in animation
    const infoBox = document.querySelector('.info-box');
    infoBox.style.animation = 'none'; // Reset the animation
    setTimeout(() => {
      infoBox.style.animation = ''; // Re-apply the animation
    }, 10); // Short delay to ensure the style update is applied
  }
}

document.getElementById('generate').addEventListener('click', newWeapon);

newWeapon();

function loadModel(weaponObj) {
  let modelPath;
  const weaponClass = weaponObj.class;
  const preferredCamoId = weaponObj.preferredTextureId;

  if (weaponClass === 'Assault Rifle') {
    modelPath = 'models/ar.glb';
  } else if (weaponClass === 'Sniper') {
    modelPath = 'models/sniper.glb';
  } else if (weaponClass === 'SMG') {
    modelPath = 'models/smg.glb';
  } else if (weaponClass === 'Pistol') {
    modelPath = 'models/pistol.glb';
  } else if (weaponClass === 'LMG') {
    modelPath = 'models/lmg.glb';
  } else {
    console.error('Unknown weapon class:', weaponClass);
    return;
  }

  scene.clear();
  const ambientLight = new THREE.AmbientLight(0x404040, 100);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  loader.load(
    modelPath,
    function (gltf) {
      // If a model was previously loaded, remove it
      if (loadedModel) {
        scene.remove(loadedModel.scene);
      }

      loadedModel = gltf;
      gltf.scene.rotation.set(0, 180, 0);
      scene.add(gltf.scene);
      applyTexture(preferredCamoId); // Apply texture after loading the model
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function updateDownloadLink() {
  // Create the path
  const imageUrl = `./camos/${currentCamoId}.png`;

  // Get the anchor element by its ID
  const downloadLink = document.getElementById('downloadButton');

  // Set the href attribute
  downloadLink.href = imageUrl;

  // Optionally set the download attribute for renaming, if desired
  downloadLink.setAttribute('download', `camo_${currentCamoId}.png`);
}

document
  .getElementById('download-button')
  .addEventListener('click', updateDownloadLink);
