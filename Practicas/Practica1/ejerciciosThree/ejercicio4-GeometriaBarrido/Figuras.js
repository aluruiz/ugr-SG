
class Figuras extends THREE.Object3D {
  constructor(gui) {
    super();

    this.material=new THREE.MeshNormalMaterial({flatShading: true});

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    
    /*var shape = new THREE.Shape ( ) ;
    // Se crea el contorno exterior
    shape.moveTo(10,10);
    shape.lineTo( 10, 40 );
    shape.bezierCurveTo ( 15 , 25 , 25 , 25 , 30 , 40 ) ;
    shape.splineThru( [new THREE.Vector2 ( 32 , 30 ),
    new THREE.Vector2 ( 28, 20 ) , new THREE.Vector2 ( 30 , 10 ) ] ) ;
    shape.quadraticCurveTo ( 20 , 15 , 10 , 10 ) ;
    // Agujeros de ojos y boca
    var hole = new THREE.Shape ( ) ;
    hole.absellipse( 16 , 24 , 2 , 3 , 0 , Math.PI*2 ) ;
    shape.holes.push ( hole ) ;
    // El otro ojo con otra elipse de manera similar , ahora la boca
    hole = new THREE.Shape ( ) ;
    hole.absarc ( 20 , 16 , 2 , Math.PI*2, Math.PI ) ;
    shape.holes.push ( hole ) ;*/
    
    /*var pts = [new THREE.Vector3(0,1,2), new THREE.Vector3(2,3,4), new THREE.Vector3(-3,-4,-5)];
    var path = new THREE. CatmullRomCurve3 ( pts ) ;
    var options = { steps : 50 , curveSegments : 4 , extrudePath : path } ;
    //var options = { amount: 8 , steps: 2 , curveSegments : 4, bevelThickness : 4 , bevelSize : 2 , bevelSegments : 2 };      
    var geometry = new THREE.ExtrudeGeometry (shape, options);
    var aux = new THREE.Object3D();
    aux = new THREE.Mesh (geometry, this.material);
    this.add (aux);*/
    
    //Crear figuras
    var heartS = this.createHeartShape();
    var spadeS = this.createInvertHeartShape();
    var cloverS = this.createCloverShape();
    var diamondS = this.createDiamondShape();

    //Elementos 3D
    this.heart = new THREE.Object3D();
    this.spades = new THREE.Object3D();
    this.clover = new THREE.Object3D();
    this.spades = new new THREE.Object3D();
    
    //Crear figuras simples
    var options = { amount: 8 , steps: 2 , curveSegments : 4, bevelThickness : 4 , bevelSize : 2 , bevelSegments : 2 };
    heart = new THREE.Mesh(heartS, );

    
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
