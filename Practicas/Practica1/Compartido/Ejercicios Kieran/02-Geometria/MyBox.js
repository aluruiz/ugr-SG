 
class MyBox extends MyObject {
  constructor() {
    super();
    
    // Un Mesh se compone de geometría y material
    this.geometry = new THREE.BoxGeometry (1,1,1);
  }
  
  createGUI () {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;
	  this.sombPlan = false;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;
		this.sombPlan = false;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ('Controles del cubo');
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 4.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 4.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 4.0, 0.1).name ('Tamaño Z : ').listen();
    folder.add (this.guiControls, 'sombPlan').name ('Sombreado plano: ').listen();
            
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);

	if(this.material.flatShading != this.guiControls.sombPlan) {
		this.material.needsUpdate = true;
		this.material.flatShading = this.guiControls.sombPlan;
	}
  }
}