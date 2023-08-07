import * as THREE from 'three';

export default class Hut {
    constructor(_option) {
        this.resources = _option.resources;
        this.time = _option.time;
        this.debug = _option.debug;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        if (this.debug) {
            this.debugFolder = this.debug.addFolder('hut');
            this.debugFolder.open();
        }

        this.setHut();
    }

    setHut() {
        this.gltf = this.resources.items.hut;
        this.gltf.scene.scale.set(0.015, 0.015, 0.015);
        this.container.add(this.gltf.scene);

        if (this.debug) {
            this.debugFolder.add(this.gltf.scene, 'visible').name('visible');
            this.debugFolder.add(this.gltf.scene.position, 'z')
                .step(0.001).min(-2).max(2)
                .name('positionZ');
        }
    }
}
