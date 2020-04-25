class Figura extends THREE.Object3D{
  constructor(gui){
    super();

    this.material=new THREE.MeshNormalMaterial({flatShading: true});

    this.centrales = this.createFigurasCentrales();
    this.laterales = this.createFigurasLaterales();

    // Creación de las GUI de los elementosS
    this.createGUI(gui);

    // Los añadimos a nuestro objeto
    this.add(this.centrales);
    this.add(this.laterales);
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

  createBaseMesh(material){
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

  createFigurasCentrales(){
    var aux = new THREE.Object3D();
    // Creación de las figuras
    var heartShape = this.createHeartShape();
    var invertHeartShape = this.createInvertHeartShape();
    var cloverShape = this.createCloverShape();
    var diamondShape = this.createDiamondShape();

    // Creación de los elementos 3D
    aux.heart= new THREE.Object3D();
    aux.clover = new THREE.Object3D();
    aux.diamond = new THREE.Object3D();
    aux.spades = new THREE.Object3D();

    aux.heart.heartExtrudeBevel = this.extrusionConBisel(heartShape, new THREE.MeshPhongMaterial( { color: 0x00ff00 } ),null);

    aux.diamond.diamondExtrudeBevel = this.extrusionConBisel(diamondShape, new THREE.MeshPhongMaterial( { color: 0x00ff00 } ),null);

    aux.clover.cloverExtrudeBevel = new THREE.Object3D();
    aux.clover.cloverExtrudeBevel.body = this.extrusionConBisel(cloverShape, new THREE.MeshPhongMaterial( { color: 0x00ff00 } ),null);
    aux.clover.cloverExtrudeBevel.base = this.createBaseMesh(new THREE.MeshPhongMaterial( { color: 0x00ff00 }));
    aux.clover.cloverExtrudeBevel.add(aux.clover.cloverExtrudeBevel.body);
    aux.clover.cloverExtrudeBevel.add(aux.clover.cloverExtrudeBevel.base);

    aux.spades.spadesExtrudeBevel = new THREE.Object3D();
    aux.spades.spadesExtrudeBevel.body = this.extrusionConBisel(invertHeartShape,new THREE.MeshPhongMaterial( { color: 0x00ff00 } ),null);
    aux.spades.spadesExtrudeBevel.base = this.createBaseMesh(new THREE.MeshPhongMaterial( { color: 0x00ff00 }));
    aux.spades.spadesExtrudeBevel.add(aux.spades.spadesExtrudeBevel.body);
    aux.spades.spadesExtrudeBevel.add(aux.spades.spadesExtrudeBevel.base);

    // Posicionamiento Objetos
    aux.heart.position.set(-80,80,0);
    aux.diamond.position.set(80,80,0);
    aux.clover.position.set(-80,-80,0);
    aux.spades.position.set(80,-80,0);

    // Añadimos y devolvemos
    aux.heart.add(aux.heart.heartExtrudeBevel);
    aux.clover.add(aux.clover.cloverExtrudeBevel);
    aux.diamond.add(aux.diamond.diamondExtrudeBevel);
    aux.spades.add(aux.spades.spadesExtrudeBevel);

    aux.add(aux.heart);
    aux.add(aux.clover);
    aux.add(aux.diamond);
    aux.add(aux.spades);

    return aux;
  }

  createFigurasLaterales(){
    var aux = new THREE.Object3D();

    // Creación de las figuras
    var heartShape = this.createHeartShape();
    var cloverShape = this.createCloverShape();

    //Creación del Path
    var curva = new THREE.CatmullRomCurve3([
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

    aux.left = this.extrusionSinBisel(heartShape, new THREE.MeshPhongMaterial( { color: 0x00ff00 } ),curva);
    aux.left.position.set(-300,0,0);
    aux.right = this.extrusionSinBisel(cloverShape, new THREE.MeshPhongMaterial( { color: 0x00ff00 } ),curva);
    aux.right.position.set(300,0,0);

    aux.add(aux.left);
    aux.add(aux.right);

    return aux;
  }




  extrusionConBisel(shape, material,path){
    var extrudeSettings = {
      steps: 2,
      depth: 16,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
      extrudePath: path
    };
    var aux = new THREE.Object3D();
    aux.mesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape,extrudeSettings),
      material
    );
    aux.add(aux.mesh);
    return aux;
  }

  extrusionSinBisel(shape,material,path){
    var extrudeSettings = {
      steps: 25,
      depth: 16,
      bevelEnabled: false,
      extrudePath: path
    };
    var aux = new THREE.Object3D();
    aux.mesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape,extrudeSettings),
      material
    );
    aux.add(aux.mesh);
    return aux;
  }

  createGUI(gui){
    var that = this;

    this.guiControls = {
        resolution:12,
        phiLength:0.5,
        animation:true
      };

      // Shading de los materiales y animación
      var folder=gui.addFolder("Luz y Ejes");
      /*folder.add (this.material, 'flatShading')
        .name ('Sombreado Plano : ')
        .onChange(function(){
          that.material.needsUpdate=true;
      });*/

      folder.add(this.guiControls,'animation')
        .name('Animación : ');

      /*var folder = gui.addFolder('Transformaciones Peón');

      folder.add(this.guiControls, 'resolution', 3,+30,1)
        .name('Resolución')
        .onChange( function(){
          that.peon3D.peon3D.geometry = new THREE.LatheGeometry(that.points,that.guiControls.resolution,0.0,2*Math.PI);
          that.peon.peon.geometry = new THREE.LatheGeometry(that.points,that.guiControls.resolution,0.0,that.guiControls.phiLength);
        });
      folder.add(this.guiControls, 'phiLength', 0.1,2*Math.PI,0.1)
        .name('Ángulo')
        .onChange( function(){
          that.peon.peon.geometry = new THREE.LatheGeometry(that.points,that.guiControls.resolution,0.0,that.guiControls.phiLength);
        });*/
    }

    update(){
      if (this.guiControls.animation) {
        this.centrales.heart.rotation.z-=0.01;
        this.centrales.clover.rotation.z-=0.01;
        this.centrales.diamond.rotation.z-=0.01;
        this.centrales.spades.rotation.z-=0.01;

        this.centrales.rotation.z+=0.01;

        this.centrales.heart.heartExtrudeBevel.rotation.y+=0.01;
        this.centrales.clover.cloverExtrudeBevel.rotation.y+=0.01;
        this.centrales.diamond.diamondExtrudeBevel.rotation.y+=0.01;
        this.centrales.spades.spadesExtrudeBevel.rotation.y+=0.01;

        this.laterales.left.rotation.y+=0.01;
        this.laterales.left.rotation.x+=0.01;

        this.laterales.right.rotation.y+=0.01;
        this.laterales.right.rotation.x+=0.01;
      }
    }

}
