
class Figuras extends THREE.Object3D {
  constructor(gui) {
    super();

    this.material=new THREE.MeshNormalMaterial({flatShading: true});
    this.central = new THREE.Object3D();

    //Crear figuras Centrales
    var heartS = this.createHeartShape();
    var spadeS = this.createInvertHeartShape();
    var cloverS = this.createCloverShape();
    var diamondS = this.createDiamondShape();

    //Elementos 3D
    this.central.heart = new THREE.Object3D()
    this.central.spades = new THREE.Object3D();
    this.central.clover = new THREE.Object3D()
    this.central.diamond = new THREE.Object3D();

    ////Geometrias
    var opcionesBisel = { //Extrusion con bisel
      steps: 2,
      depth: 16,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
      extrudePath: null
    };

    this.central.heart.heartGeometry = new THREE.Mesh(new THREE.ExtrudeGeometry (heartS, opcionesBisel), this.material);
    this.central.diamond.diamondGeometry = new THREE.Mesh(new THREE.ExtrudeGeometry (diamondS, opcionesBisel), this.material);

    this.central.spades.spadesGeometry = new THREE.Object3D();
    this.central.spades.spadesGeometry.body = new THREE.Mesh(new THREE.ExtrudeGeometry (spadeS, opcionesBisel), this.material);
    this.central.spades.spadesGeometry.base = this.createBase(this.material);
    this.central.spades.spadesGeometry.add(this.central.spades.spadesGeometry.body);
    this.central.spades.spadesGeometry.add(this.central.spades.spadesGeometry.base);

    this.central.clover.cloverGeometry = new THREE.Object3D();
    this.central.clover.cloverGeometry.body = new THREE.Mesh(new THREE.ExtrudeGeometry (cloverS, opcionesBisel), this.material);
    this.central.clover.cloverGeometry.base = this.createBase(this.material);
    this.central.clover.cloverGeometry.add(this.central.clover.cloverGeometry.body);
    this.central.clover.cloverGeometry.add(this.central.clover.cloverGeometry.base);

    /*var options = { 
      amount: 8 , 
      steps: 2 , 
      curveSegments : 4, 
      bevelThickness : 4 , 
      bevelSize : 2 , 
      bevelSegments : 2 
    };*/
    
    // Posicionamiento Objetos
    this.central.heart.position.set(-80,80,0);
    this.central.diamond.position.set(80,80,0);
    this.central.clover.position.set(-80,-80,0);
    this.central.spades.position.set(80,-80,0);

    //Figuras Completas
    this.central.heart.add(this.central.heart.heartGeometry);
    this.central.spades.add(this.central.spades.spadesGeometry);
    this.central.clover.add(this.central.clover.cloverGeometry);
    this.central.diamond.add(this.central.diamond.diamondGeometry);

    

    //Ahora las figuras laterales
    var heartRightS = this.createHeartShape();
    var cloverLeftS = this.createCloverShape();

    //Creamos path
    var path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(50,0,0),
      new THREE.Vector3(35.35,25,35.35),
      new THREE.Vector3(0,50,50),
      new THREE.Vector3(-35.35,75,35.35),
      new THREE.Vector3(-50,100,0),
      new THREE.Vector3(-35.35,125,-35.35),
      new THREE.Vector3(0,150,-50),
      new THREE.Vector3(35.35,175,-35.35),
      new THREE.Vector3(50,200,0)
    ]);

    var opcionesSinBisel = {
      steps: 50,
      depth: 16,
      bevelEnabled: false,
      extrudePath: path
    };

    this.heartRight = new THREE.Object3D();
    this.cloverLeft = new THREE.Object3D();
      
    this.heartRight.heartGeometry = new THREE.Mesh(new THREE.ExtrudeGeometry (heartRightS, opcionesSinBisel), this.material);
    this.heartRight.position.set(300,0,0);
    this.heartRight.add(this.heartRight.heartGeometry);
    this.cloverLeft.cloverGeometry = new THREE.Mesh(new THREE.ExtrudeGeometry (cloverLeftS, opcionesSinBisel), this.material);
    this.cloverLeft.position.set(-300,0,0);
    this.cloverLeft.add(this.cloverLeft.cloverGeometry);

    this.AnimaciónGUI(gui);

    //Añadimos 

    this.central.add(this.central.heart);
    this.central.add(this.central.diamond);
    this.central.add(this.central.clover);
    this.central.add(this.central.spades);
    this.add(this.central);
    this.add(this.heartRight);
    this.add(this.cloverLeft);

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

  AnimaciónGUI(gui){
    var that = this;
    
    this.guiControls = {
      animation:true
    };

    var folder=gui.addFolder("Animación");

    folder.add(this.guiControls,'animation')
        .name('Animación : ');
  }

  update () {
    if (this.guiControls.animation) {
      this.central.heart.rotation.z-=0.01;
      this.central.clover.rotation.z-=0.01;
      this.central.diamond.rotation.z-=0.01;
      this.central.spades.rotation.z-=0.01;

      this.central.rotation.z+=0.01;

      this.central.heart.heartGeometry.rotation.y+=0.01;
      this.central.clover.cloverGeometry.rotation.y+=0.01;
      this.central.diamond.diamondGeometry.rotation.y+=0.01;
      this.central.spades.spadesGeometry.rotation.y+=0.01;

      this.cloverLeft.rotation.y+=0.01;
      this.cloverLeft.rotation.x+=0.01;

      this.heartRight.rotation.y+=0.01;
      this.heartRight.rotation.x+=0.01;
    }
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
