 
class MyTorus extends MyObject {
  constructor() {
    super();
    
	var res_gra;
	var res_peq;
	var rad_gra
	var rad_peq;
	
    // Un Mesh se compone de geometría y material
    this.geometry = new THREE.TorusGeometry (0.5,0.2,3,3);
  }
  
  createGUI () {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.rad_gra = 0.5;
      this.rad_peq = 0.2;
      this.res_gra = 3;
	  this.res_peq  = 3;
	  this.sombPlan = false;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
		this.rad_gra = 0.5;
		this.rad_peq = 0.2;
		this.res_gra = 3;
		this.res_peq  = 3;
		this.sombPlan = false;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ('Controles del toro');
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'rad_gra', 0.1, 2.0, 0.1).name ('Radio toro: ').listen();
    folder.add (this.guiControls, 'rad_peq', 0.05, 1.0, 0.05).name ('Radio tubo: ').listen();
    folder.add (this.guiControls, 'res_gra', 3, 20, 1).name ('Resolucion toro: ').listen();
    folder.add (this.guiControls, 'res_peq', 3, 20, 1).name ('Resolucion tubo: ').listen();
    folder.add (this.guiControls, 'sombPlan').name ('Sombreado plano: ').listen();
            
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    if(this.rad_gra !=  this.guiControls.rad_gra || this.rad_peq != this.guiControls.rad_peq || this.res_gra != this.guiControls.res_gra || this.res_peq != this.guiControls.res_peq) {
		this.rad_gra = this.guiControls.rad_gra;
		this.rad_peq = this.guiControls.rad_peq;
		this.res_gra = this.guiControls.res_gra;
		this.res_peq = this.guiControls.res_peq;
	    this.geometry = new THREE.TorusGeometry (this.rad_gra,this.rad_peq,this.res_peq,this.res_gra);
		this.geometry.needsUpdate = true;
	}
	
	if(this.material.flatShading != this.guiControls.sombPlan) {
		this.material.needsUpdate = true;
		this.material.flatShading = this.guiControls.sombPlan;
	}
  }
}