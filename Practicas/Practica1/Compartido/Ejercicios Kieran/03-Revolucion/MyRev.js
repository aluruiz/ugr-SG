 
class MyRev extends THREE.Mesh {
  constructor(line) {
    super();
	this.createGUI();
    var points = new Array();
	var angulo;
	var resolucion;
	this.points = line;
    // Un Mesh se compone de geometría y material
    this.geometry = new THREE.LatheGeometry (points,3,0,Math.PI);
	this.material = new THREE.MeshNormalMaterial();
	this.material.side =  THREE.DoubleSide;
  }
    
  createGUI () {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.angulo = 45;
      this.resolucion = 3;
	  this.sombPlan = false;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
		this.angulo = 45;
		this.resolucion = 3;
		this.sombPlan = false;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ('Controles del cuerpo de revolución');
    folder.add (this.guiControls, 'angulo', 0, 360, 1).name ('Angulo: ').listen();
    folder.add (this.guiControls, 'resolucion', 1, 20, 1).name ('Resolucion: ').listen();
    folder.add (this.guiControls, 'sombPlan').name ('Sombreado plano: ').listen();
            
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    if(this.angulo != this.guiControls.angulo || this.resolucion != this.guiControls.resolucion) {
		this.angulo = this.guiControls.angulo
		this.resolucion = this.guiControls.resolucion
		this.geometry = new THREE.LatheGeometry(this.points,this.resolucion,0,(this.angulo/360)*(Math.PI*2)); //aqui falla points y no se por que
		this.geometry.needsUpdate = true;
	}

	if(this.material.flatShading != this.guiControls.sombPlan) {
		this.material.needsUpdate = true;
		this.material.flatShading = this.guiControls.sombPlan;
	}
  }
}