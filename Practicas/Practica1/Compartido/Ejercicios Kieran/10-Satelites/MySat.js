class MySat extends THREE.Mesh {
	constructor () {
		super();
		this.geometry = new THREE.CylinderGeometry(0.3,0.2,0.3,8);
		this.material = new THREE.MeshPhongMaterial({color: 0x909090});
	  }
}