
class Figuras extends THREE.Object3D {
  constructor(gui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);

    this.box = this.createBox();
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.box);
    this.box.position.y = 0.5;
  }

  createBox(){
    var boxFinal = new THREE.Object3D();
    // Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxGeometry (1,1,1);
    // Como material se crea uno a partir de un color
    var boxMat = new THREE.MeshNormalMaterial({color: 0xCF0000});
    // Ya podemos construir el Mesh
    boxFinal.box = new THREE.Mesh (boxGeom, boxMat);
    //Ejes
    var boxEjes = new THREE.AxisHelper();

    boxFinal.add(boxFinal.box);
    boxFinal.add(boxEjes);

    return boxFinal;
  }

  createGUI (gui) {
    this.guiControls = {
      sizeX: 1,
      sizeY: 1,
      sizeZ: 1,

      rotX: 0.0,
      rotY: 0.0,
      rotZ: 0.0,

      posX: 0.0,
      posY: 0.0,
      posZ: 0.0,
    };

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Controles");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();

    folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name ('Rotación X : ').listen();
    folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1).name ('Rotación Y : ').listen();
    folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();

    folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
    folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
    folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();


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
