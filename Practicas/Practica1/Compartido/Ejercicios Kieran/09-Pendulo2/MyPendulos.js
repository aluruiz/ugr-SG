 
class ComponenteRoja extends THREE.Mesh {
	constructor() {
		super();
		this.geometry = new THREE.CylinderGeometry(0.2, 0.2, 5, 8);
		this.material = new THREE.MeshPhongMaterial({color: 0xff0000});
	}
}

class ComponenteVerde extends THREE.Mesh {
	constructor() {
		super();
		this.geometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 8);
		this.material = new THREE.MeshPhongMaterial({color: 0x00ff00});
	}
}

class ComponenteAzul extends THREE.Mesh {
	constructor() {
		super();
		this.geometry = new THREE.CylinderGeometry(0.2, 0.2, 10, 8);
		this.material = new THREE.MeshPhongMaterial({color: 0x0000ff});
	}
}