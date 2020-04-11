
class MyBox extends THREE.Object3D {
  constructor(gui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);

    this.box = createBox();
    // Y añadirlo como hijo del Object3D (el this)
    this.add (box);

  }

  createBox(){
    var boxFinal = new THREE.Object3D();
    // Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxGeometry (1,1,1);
    // Como material se crea uno a partir de un color
    var boxMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
    // Ya podemos construir el Mesh
    boxFinal.box = new THREE.Mesh (boxGeom, boxMat);
    //Ejes
    var boxEjes = new THREE.AxisHelper();

    boxFinal.add(box);
    boxFinal.add(boxEjes);

    return boxFinal;
  }

  createGUI (gui) {
    this.guiControls = {
      variableX: 1,
      variableY: 1,
      variableZ: 1
    };



  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}
