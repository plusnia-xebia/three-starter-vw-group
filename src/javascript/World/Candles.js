import * as THREE from 'three';

export default class Candles {
    constructor(_option) {
        this.resources = _option.resources;
        this.time = _option.time;
        this.debug = _option.debug;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        if (this.debug) {
            this.debugFolder = this.debug.addFolder('candles');
            this.debugFolder.open();
        }

        this.setCandles();
        this.setLights();
    }

    setCandles() {
        this.gltf = this.resources.items.candles;
        this.gltf.scene.scale.set(0.012, 0.012, 0.012);
        this.gltf.scene.position.set(-1.6, 0, -1.35);
        this.container.add(this.gltf.scene);

        if (this.debug) {
            this.debugFolder.add(this.gltf.scene, 'visible').name('visible');
            this.debugFolder.add(this.gltf.scene.position, 'z')
                .step(0.001).min(-2).max(2)
                .name('positionZ');
            this.debugFolder.add(this.gltf.scene.position, 'x')
                .step(0.001).min(-2).max(2)
                .name('positionX');
        }
    }

    setLights() {
        const flameModel01 = this.gltf.scene.getObjectByName('flame_01');
        const flameModel02 = this.gltf.scene.getObjectByName('flame_02');

        const light01 = new THREE.PointLight(0xffffff, 1, 100);
        light01.position.set(0, 0, 0);
        flameModel01.add(light01);

        const light02 = new THREE.PointLight(0xffffff, 0.5, 100);
        light02.position.set(0, 0, 0);
        flameModel02.add(light02);

        if (this.debug) {
            const lightsDebugFolder = this.debugFolder.addFolder('lights');
            lightsDebugFolder.add(light01, 'intensity').step(0.001).min(0).max(2)
                .name('Light01 intensity');
            lightsDebugFolder.add(light02, 'intensity').step(0.001).min(0).max(2)
                .name('Light02 intensity');
        }
    }
}
