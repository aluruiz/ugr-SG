
class Figuras extends THREE.Object3D {
  constructor(gui) {
    super();

    this.material=new THREE.MeshNormalMaterial({flatShading: true});

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    
    var shape = new THREE.Shape ( ) ;
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
    shape.holes.push ( hole ) ;
    
    var pts = [new THREE.Vector3(0,1,2), new THREE.Vector3(2,3,4), new THREE.Vector3(-3,-4,-5)];
    var path = new THREE. CatmullRomCurve3 ( pts ) ;
    var options = { steps : 50 , curveSegments : 4 , extrudePath : path } ;
    //var options = { amount: 8 , steps: 2 , curveSegments : 4, bevelThickness : 4 , bevelSize : 2 , bevelSegments : 2 };      
    var geometry = new THREE.ExtrudeGeometry (shape, options);
    var aux = new THREE.Object3D();
    aux = new THREE.Mesh (geometry, this.material);
    this.add (aux);

  }

  createCaja(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.caja = new THREE.Mesh (new THREE.BoxGeometry (1,1,1), this.material);
    aux.position.set(3.0,3.0,-3.0);   
    aux.add(ejes);
    aux.add(aux.caja);

    return aux;
  }

  createGUICaja (gui) {
    var that = this;

    this.caja.guiControls = {
      sizeX: 1,
      sizeY: 1,
      sizeZ: 1
    };

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Dimensiones de la Caja");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.caja.guiControls, 'sizeX', 0.1, 5.0, 0.1).name('Tamaño X : ').onChange( function(){ 
      that.caja.caja.scale.set(that.caja.guiControls.sizeX,that.caja.guiControls.sizeY,that.caja.guiControls.sizeZ);
    });

    folder.add (this.caja.guiControls, 'sizeY', 0.1, 5.0, 0.1).name('Tamaño Y : ').onChange( function(){ 
      that.caja.caja.scale.set(that.caja.guiControls.sizeX,that.caja.guiControls.sizeY,that.caja.guiControls.sizeZ);
    });

    folder.add (this.caja.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name('Tamaño Z : ').onChange( function(){ 
      that.caja.caja.scale.set(that.caja.guiControls.sizeX,that.caja.guiControls.sizeY,that.caja.guiControls.sizeZ);
    });
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
