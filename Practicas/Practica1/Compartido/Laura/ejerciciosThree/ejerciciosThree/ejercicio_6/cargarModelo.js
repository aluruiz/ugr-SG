class Figura extends THREE.Object3D{
  constructor(gui){
    super();

    this.material=new THREE.MeshNormalMaterial({flatShading: true});

    this.cargarModelo();
    this.createGround();

    // Creación de las GUI de los elementosS
    this.createGUI(gui);
  }

  cargarModelo(){
    var that = this;
    var materialLoader = new THREE.MTLLoader();
    var objectLoader = new THREE.OBJLoader();
    materialLoader.load('../models/porsche911/911.mtl',
      function(materials) {
        objectLoader.setMaterials(materials);
        objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',
          function(object) {
            that.modelo = object;
            that.add(that.modelo);
          }, null, null);
      }
    );
    this.position.y=0.7;
  }

  createGround () { //Sacado del index que nos dan como ejemplo
    // El suelo es un Mesh, necesita una geometría y un material.

    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (50,0.2,50);

    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialGround = new THREE.MeshPhongMaterial ({map: texture});

    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);

    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.7;

    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (ground);
  }


  createGUI(gui){
    var that = this;

    this.guiControls = {
        animation:false
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
        this.modelo.rotation.y+=0.01;
      }
    }

}
