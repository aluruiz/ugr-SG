 
class MySphere extends MyObject {
  constructor() {
    super();
    	
    // Un Mesh se compone de geometría y material
    this.geometry = new THREE.SphereGeometry (0.5,5,5);
	
	var radius;
	var resolucion_X;
	var resolucion_Y;
  }
  
  createGUI () {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.radius = 0.5;
      this.resolucion_X = 5;
      this.resolucion_Y = 5;
	  this.sombPlan = false;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
		this.radius = 0.5;
		this.resolucion_X = 5;
		this.resolucion_Y = 5;
		this.sombPlan = false;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ('Controles la esfera');
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radius', 0.1, 2.0, 0.1).name ('Radio: ').listen();
    folder.add (this.guiControls, 'resolucion_X', 3, 20, 1).name ('Resolucion X: ').listen();
    folder.add (this.guiControls, 'resolucion_Y', 3, 20, 1).name ('Resolucion Y: ').listen();
    folder.add (this.guiControls, 'sombPlan').name ('Sombreado plano: ').listen();
            
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    if(this.radius !=  this.guiControls.radius || this.resolucion_X != this.guiControls.resolucion_X || this.resolucion_Y != this.guiControls.resolucion_Y) {
		this.radius = this.guiControls.radius;
		this.resolucion_X = this.guiControls.resolucion_X;
		this.resolucion_Y = this.guiControls.resolucion_Y;
	    this.geometry = new THREE.SphereGeometry (this.radius,this.resolucion_X,this.resolucion_Y);
		this.geometry.needsUpdate = true;
	}
	
	if(this.material.flatShading != this.guiControls.sombPlan) {
		this.material.needsUpdate = true;
		this.material.flatShading = this.guiControls.sombPlan;
	}
  }
}