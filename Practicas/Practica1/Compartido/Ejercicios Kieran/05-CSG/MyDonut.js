 
class MyDonut extends THREE.Mesh {
  constructor() {
	super();

	this.material = new THREE.MeshNormalMaterial();
	
	var smallC = new THREE.CylinderGeometry(1,1,1,32);
	var bigC = new THREE.CylinderGeometry(2,2,1,32);
	
	//Aplicación de BSP
	var smallBSP = new ThreeBSP(smallC);
	var bigBSP = new ThreeBSP(bigC);
	
	var finalBSP = 	bigBSP.subtract (smallBSP);
	
	var result = finalBSP.toMesh(this.material);
	result.geometry.computeFaceNormals();
	result.geometry.computeVertexNormals();
	
	this.geometry = result.geometry;	

  }
}