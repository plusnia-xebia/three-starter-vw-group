import * as THREE from 'three';

export default class Table {
    constructor(_option) {
        this.resources = _option.resources;
        this.time = _option.time;
        this.debug = _option.debug;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        if (this.debug) {
            this.debugFolder = this.debug.addFolder('table');
            this.debugFolder.open();
        }

        this.setTable();
    }

    setTable() {
        this.gltf = this.resources.items.table;
        this.gltf.scene.scale.set(0.45, 0.45, 0.45);
        this.gltf.scene.position.set(-1, 0, 0.15);
        this.container.add(this.gltf.scene);

        if (this.debug) {
            this.debugFolder.add(this.gltf.scene, 'visible').name('visible');
            this.debugFolder.add(this.gltf.scene.position, 'z')
                .step(0.001).min(-2).max(2)
                .name('positionZ');
        }
    }
}
