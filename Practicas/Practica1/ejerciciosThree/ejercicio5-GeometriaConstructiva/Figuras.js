
class Figuras extends THREE.Object3D {
  constructor(gui) {
    super();

    this.material=new THREE.MeshNormalMaterial({flatShading: true});
    
    //Crear figuras
    var heartS = this.createHeartShape();
    var spadeS = this.createInvertHeartShape();
    var cloverS = this.createCloverShape();
    var diamondS = this.createDiamondShape();

    //Elementos 3D
    var heart = new THREE.Object3D();
    var spades = new THREE.Object3D();
    spades.base = this.createBase(this.material);
    spades.add(spades.base);
    var clover = new THREE.Object3D();
    clover.base = this.createBase(this.material);
    clover.add(clover.base);
    var diamond = new THREE.Object3D();

    //Geometrias
    var options = { 
      amount: 8 , 
      steps: 2 , 
      curveSegments : 4, 
      bevelThickness : 4 , 
      bevelSize : 2 , 
      bevelSegments : 2 
    };

    var heartGeometry = new THREE.ExtrudeGeometry (heartS, options);
    var spadesGeometry = new THREE.ExtrudeGeometry (spadeS, options);
    var cloverGeometry = new THREE.ExtrudeGeometry (cloverS, options);
    var diamondGeometry = new THREE.ExtrudeGeometry (diamondS, options);

    //Crear figuras simples
    heart = new THREE.Mesh(heartGeometry, this.material);
    spades = new THREE.Mesh(spadesGeometry, this.material);
    clover = new THREE.Mesh(cloverGeometry, this.material);
    diamond = this.heart = new THREE.Mesh(diamondGeometry, this.material);
    
    // Posicionamiento Objetos
    heart.position.set(-80,80,0);
    diamond.position.set(80,80,0);
    clover.position.set(-80,-80,0);
    spades.position.set(80,-80,0);

    //Añadimos 
    this.add(heart);
    this.add(diamond);
    this.add(clover);
    this.add(spades);

  }

  createHeartShape(){
    var heartShape = new THREE.Shape();

    heartShape.moveTo( 0, 75 );
    heartShape.bezierCurveTo( 0, 75, -10, 100,-25,100);
    heartShape.bezierCurveTo( -55, 100, -55, 65, -55, 65 );
    heartShape.bezierCurveTo( -55, 45, -35, 33, -5, 5 );
    heartShape.bezierCurveTo( 35, 33, 55, 45, 55, 65 );
    heartShape.bezierCurveTo( 55, 65, 55, 100, 25, 100 );
    heartShape.bezierCurveTo( 10, 100, 0, 75, 0, 75 );

    return heartShape;
  }

  createInvertHeartShape(){
    var heartShape = new THREE.Shape();

    heartShape.moveTo( 0, 25 );
    heartShape.bezierCurveTo( 0, 25, -10, 0, -25,0);
    heartShape.bezierCurveTo( -55, 0, -55, 35, -55, 35 );
    heartShape.bezierCurveTo( -55, 55, -35, 77, -5, 95 );
    heartShape.bezierCurveTo( 35, 77, 55, 55, 55, 35 );
    heartShape.bezierCurveTo( 55, 35, 55, 0, 25, 0 );
    heartShape.bezierCurveTo( 10, 0, 0, 25, 0, 25 );

    return heartShape;
  }

  createCloverShape(){
    var cloverShape = new THREE.Shape();

    cloverShape.moveTo( 0, 25 );
    cloverShape.bezierCurveTo( 0, 25, -10, 0,-25,0);
    cloverShape.bezierCurveTo( -55, 0, -55, 30, -55, 20 );

    cloverShape.bezierCurveTo( -55, 50, -25, 50, -15, 50 );
    cloverShape.bezierCurveTo( -15, 50, -25, 30, -25, 50 );
    cloverShape.bezierCurveTo( -35,70, -35, 90, 0, 95 );
    cloverShape.bezierCurveTo( 35,90, 35, 70, 25, 50 );

    cloverShape.bezierCurveTo( 25, 50, 55, 50, 55, 20);
    cloverShape.bezierCurveTo( 55, 20, 55, 0, 25, 0 );
    cloverShape.bezierCurveTo( 10, 0, 0, 25, 0, 25 );

    return cloverShape;
  }

  createDiamondShape(){
    var diamondShape = new THREE.Shape();

    diamondShape.lineTo(-50,50);
    diamondShape.lineTo(0,100);
    diamondShape.lineTo(50,50);
    diamondShape.lineTo(0,0);

    return diamondShape;
  }

  createBase(material){
    var points = [
      new THREE.Vector3(0,0,0),
      new THREE.Vector3(10,0,0),
      new THREE.Vector3(8,2,0),
      new THREE.Vector3(3,3,0),
      new THREE.Vector3(3,25,0)
    ];
    var base = new THREE.Mesh (
      new THREE.LatheGeometry(points), material
    );

    base.position.set(0,0,10);

    return base;

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
