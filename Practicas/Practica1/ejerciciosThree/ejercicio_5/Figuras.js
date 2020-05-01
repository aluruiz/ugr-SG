
class Figuras extends THREE.Object3D {
  constructor(gui) {
    super();

    this.material=new THREE.MeshNormalMaterial({flatShading: true});

    this.taza = this.createTaza();
    this.escuadra = this.createEscuadra();
    this.tuerca = this.createTuerca();
    
    this.add(this.taza);
    this.add(this.escuadra);
    this.add(this.tuerca);
  }

  createTaza(){
    var cExterior = new THREE.CylinderGeometry( 15, 15, 30, 14 );
    var cInterior = new THREE.CylinderGeometry( 12.5, 12.5, 30, 14 );
    var asa = new THREE.TorusGeometry( 10, 2, 5, 100 );

    cInterior.translate(0,5,0);
    asa.translate(-15,0,0);

    var cExteriorBSP = new ThreeBSP(cExterior);
    var tazaMedia = cExteriorBSP.union(new ThreeBSP(asa));
    var tazaFinal = tazaMedia.subtract(new ThreeBSP(cInterior));

    var taza = tazaFinal.toMesh(this.material);
    taza.geometry.computeFaceNormals ();
    taza.geometry.computeVertexNormals ();

    taza.translateOnAxis(new THREE.Vector3(1,0,0),-50);

    return taza;
  }

  createEscuadra(){
    var cuboExterno = new THREE.BoxGeometry(20,20,5);
    var cuboInterno = new THREE.BoxGeometry(20,20,5);
    var hueco = new THREE.BoxGeometry(4,4,10);
    var curva = new THREE.CylinderGeometry(4,4,5,8);
    var cilArriba = new THREE.CylinderGeometry( 0.5, 1.5, 3, 14 );
    var cilAbajo = new THREE.CylinderGeometry( 1.5, 0.5, 3, 14 );

    cuboInterno.translate(2,2,0);
    cilArriba.rotateZ(Math.PI/2);
    cilArriba.translate(-9,6.5,0);
    cilAbajo.translate(6.5,-9,0);
    curva.rotateX(Math.PI/2);
    curva.translate(-4,-4,0);
    hueco.translate(-6,-6,0);

    
    var cuboExternoBSP = new ThreeBSP(cuboExterno);
    var cuboInternoBSP = new ThreeBSP(cuboInterno);
    var huecoBSP = new cuboInternoBSP.subtract(new ThreeBSP(hueco));
    var curvaBSP = new huecoBSP.union(new ThreeBSP(curva));
    var curvaBSP2 = new cuboExternoBSP.subtract(curvaBSP);
    var cilArribaBSP = curvaBSP2.subtract(new ThreeBSP(cilArriba));
    var cilAbajoBSP = cilArribaBSP.subtract(new ThreeBSP(cilAbajo));

    var escuadra = cilAbajoBSP.toMesh(this.Material);
    escuadra.geometry.computeFaceNormals ();
    escuadra.geometry.computeVertexNormals ();

    return escuadra;
  }

  createTuerca(){
    var cExterior = new THREE.CylinderGeometry(10, 10, 10, 6);
    var cInterior = new THREE.CylinderGeometry(5, 5, 10, 25);
    var esquinas = new THREE.SphereGeometry(11, 9, 5);
    var ondulaciones = new THREE.CylinderGeometry(6.5,6.5,0.5,40);

    ondulaciones.translate(0,-4.5,0);
    
    var esquinasBSP = new ThreeBSP(esquinas);
    var cExteriorBSP = esquinasBSP.intersect(new ThreeBSP(cExterior));
    var cInteriorBSP = cExteriorBSP.subtract(new ThreeBSP(cInterior));

    for (var i = 0; i < 10; i++) {
      cInteriorBSP = cInteriorBSP.subtract(new ThreeBSP(ondulaciones));
      ondulaciones.translate(0,1,0);
    }

    var tuerca = cInteriorBSP.toMesh(this.Material);
    tuerca.geometry.computeFaceNormals ();
    tuerca.geometry.computeVertexNormals ();

    tuerca.translateOnAxis(new THREE.Vector3(1,0,0),50);

    return tuerca;
  }

  update () {
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
