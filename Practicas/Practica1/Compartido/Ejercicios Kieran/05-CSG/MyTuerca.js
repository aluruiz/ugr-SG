 
class MyTuerca extends THREE.Mesh {
  constructor() {
	super();

	this.material = new THREE.MeshNormalMaterial();
	
	var smallC = new THREE.CylinderGeometry(0.9,0.9,1,32);
	var bigC = new THREE.CylinderGeometry(1.5,1.5,1,6);
	var ringC;
	
	bigC.translate(0,0.5,0);
	smallC.translate(0,0.5,0);
	
	//Aplicación de BSP	
	var smallBSP = new ThreeBSP(smallC);
	var bigBSP = new ThreeBSP(bigC);
	
	for(var i = 0; i < 5; i++) {
		ringC = (new THREE.CylinderGeometry(1,1,0.1,32));
		ringC.translate(0,i/5.0,0);
		var ringBSP = new ThreeBSP(ringC);
		smallBSP = smallBSP.union (ringBSP);
	}

	var finalBSP = bigBSP.subtract (smallBSP);

	var result = finalBSP.toMesh(this.material);
	result.geometry.computeFaceNormals();
	result.geometry.computeVertexNormals();

	this.applyMatrix (new THREE.Matrix4().makeTranslation(0,-0.5,0));
	this.geometry = result.geometry;	
  }
}