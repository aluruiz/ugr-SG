
class Figuras extends THREE.Object3D {
  constructor(gui) {
    super();
    this.tiempoAnterior = Date.now();
    this.velocidad = 10;
    this.material = new THREE.MeshNormalMaterial({flatShading: true});
    this.transparent = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true})
    this.aux = new THREE.Object3D();

    this.aux.bola = new THREE.Mesh(new THREE.SphereGeometry(1,8,6), this.material);
    this.cilindro = new THREE.Mesh(new THREE.CylinderGeometry(5,5,20,32), this.transparent);
    
    this.aux.bola.position.set(-6,0,0);
    
    this.aux.add(this.aux.bola);

    this.add(this.aux);
    this.add(this.cilindro);

  }

  update () {
    this.aux.rotation.y+=0.01;
    var tiempoActual = Date.now();
    var segundosTranscurridos = (tiempoActual-this.tiempoAnterior)/1000;
    this.aux.position.y += this.velocidad * segundosTranscurridos;
    this.tiempoAnterior = tiempoActual;

    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    /*this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);*/
  }
}
