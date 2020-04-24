 
class MyObject extends THREE.Mesh {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI();
    
	//La geometría se define en subclases
	
    // Como material se crea uno a partir de un color
    this.material = new THREE.MeshNormalMaterial();
	}  
}