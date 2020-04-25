class Figura extends THREE.Object3D{
  constructor(gui){
    super();

    this.material=new THREE.MeshNormalMaterial({flatShading: true});

    this.points = [
      new THREE.Vector3(0.0,0.0,0.0),
      new THREE.Vector3(3.0,0.0,0.0),
      new THREE.Vector3(3.0,1.0,0.0),
      new THREE.Vector3(2.75,1.5,0.0),
      new THREE.Vector3(2.0,2.25,0.0),
      new THREE.Vector3(1.75,3.25,0.0),
      new THREE.Vector3(1.5,4.5,0.0),
      new THREE.Vector3(1.25,6.0,0.0),
      new THREE.Vector3(1.25,7.0,0.0),
      new THREE.Vector3(1.5,7.25,0.0),
      new THREE.Vector3(1.75,7.75,0.0),
      new THREE.Vector3(2.0,8.5,0.0),
      new THREE.Vector3(2.0,9.0,0.0),
      new THREE.Vector3(1.75,9.75,0.0),
      new THREE.Vector3(1.5,10.25,0.0),
      new THREE.Vector3(1.25,10.5,0.0),
      new THREE.Vector3(0.75,10.75,0.0),
      new THREE.Vector3(0.0,11.0,0.0)
    ];

    // Creación de los elementos
    this.peon2D = this.createPeonLine();
    this.peon3D = this.createPeonCompleto();
    this.peon = this.createPeon();

    // Creación de las GUI de los elementosS
    this.createGUI(gui);

    // Los añadimos a nuestro objeto
    this.add(this.peon2D);
    this.add(this.peon3D);
    this.add(this.peon);
  }

  createPeonLine(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices = this.points;
    aux.peon2D = new THREE.Line(lineGeometry,new THREE.MeshBasicMaterial( { color:  0x2a239b  }));
    aux.position.set(-6,0,+6);
    aux.add(ejes);
    aux.add(aux.peon2D);
    return aux;
  }

  createPeonCompleto(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.peon3D = new THREE.Mesh (
      new THREE.LatheGeometry(this.points), this.material
    );
    aux.position.set(6,0,-6);
    aux.add(ejes);
    aux.add(aux.peon3D);
    return aux;
  }

  createPeon(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.peon = new THREE.Mesh (
      new THREE.LatheGeometry(this.points,12,0.0,0.5), this.material
    );
    aux.position.set(0,0,0);
    aux.add(ejes);
    aux.add(aux.peon);
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
      folder.add (this.material, 'flatShading')
        .name ('Sombreado Plano : ')
        .onChange(function(){
          that.material.needsUpdate=true;
      });

      folder.add(this.guiControls,'animation')
        .name('Animación : ');

      var folder = gui.addFolder('Transformaciones Peón');

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
        });
    }

    update(){
      if (this.guiControls.animation) {
        this.peon.peon.rotation.y+=0.01;
        this.peon3D.peon3D.rotation.y+=0.01;
      }
    }

}
