 
class MyOctahedron extends MyObject {
  constructor() {
    super();
    
	var radius;
	var detail;
	
    this.geometry = new THREE.OctahedronGeometry (0.5,0);
  }
  
  createGUI () {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
	  this.radius = 0.5
      this.detail = 0;
	  this.sombPlan = false;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
		this.radius = 0.5;
		this.detail = 0;
		this.sombPlan = false;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ('Controles del octahedro');
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radius', 0.1, 2.0, 0.1).name ('Radio: ').listen();
    folder.add (this.guiControls, 'detail', 0, 4, 1).name ('Detalle: ').listen();
    folder.add (this.guiControls, 'sombPlan').name ('Sombreado plano: ').listen();
            
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
	if(this.radius !=  this.guiControls.radius || this.detail != this.guiControls.detail) {
		this.radius = this.guiControls.radius;
		this.detail = this.guiControls.detail;
	    this.geometry = new THREE.OctahedronGeometry (this.radius,this.detail);
		this.geometry.needsUpdate = true;
	}

	if(this.material.flatShading != this.guiControls.sombPlan) {
		this.material.needsUpdate = true;
		this.material.flatShading = this.guiControls.sombPlan;
	}
  }
}