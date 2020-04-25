class Figura extends THREE.Object3D{
  constructor(gui){
    super();

    this.dimPendGrande ={
      lado: 4,
      central: 5
    }
    this.dimPendPeq ={
      lado: 2,
      largo: 10,
      porcentaje: 0.1
    }

    // Creación de los elementos
    this.penduloGrande = this.createPenduloGrande(this.dimPendGrande.lado,this.dimPendGrande.central);
    this.penduloPeque = this.createPenduloPeq(this.dimPendPeq.lado,this.dimPendPeq.largo);
    this.penduloPeque.position.set(0,-this.dimPendGrande.lado/2 -this.dimPendPeq.porcentaje*this.dimPendGrande.central,(this.dimPendPeq.lado+this.dimPendGrande.lado)/2);
    // Creación de las GUI de los elementosS
    this.createGUIBox(gui);

    // Los añadimos a nuestro objeto
    this.add(this.penduloGrande);
    this.add(this.penduloPeque);
  }

  createCylinder(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.cilindro = new THREE.Mesh(new THREE.CylinderGeometry(),material);
    aux.position.set(-3.0,3.0,3.0);
    aux.add(ejes);
    aux.add(aux.cilindro);
    return aux;
  }

  createPenduloGrande(lado,central){
    var pendulo = new THREE.Object3D();
    pendulo.cajaArriba = new THREE.Mesh(
      new THREE.BoxGeometry(lado,lado,lado),
      new THREE.MeshPhongMaterial( { color: 0x00ff00 } )
    );
    pendulo.cajaAbajo = new THREE.Mesh(
      new THREE.BoxGeometry(lado,lado,lado),
      new THREE.MeshPhongMaterial( { color: 0x00ff00 } )
    );
    pendulo.cajaCentral = new THREE.Mesh(
      new THREE.BoxGeometry(lado,central,lado),
      new THREE.MeshPhongMaterial( { color: 0xf4340d } )
    );
    pendulo.rosca =new THREE.Mesh(
      new THREE.CylinderGeometry(lado/4,lado/4,5*lado/4,8),
      new THREE.MeshPhongMaterial( { color: 0xc75cfa } )
    );

    pendulo.rosca.rotateX(Math.PI/2);
    pendulo.cajaCentral.position.set(0,(-lado-central)/2,0);
    pendulo.cajaAbajo.position.set(0,-lado-central,0);

    pendulo.add(pendulo.rosca);
    pendulo.add(pendulo.cajaArriba);
    pendulo.add(pendulo.cajaCentral);
    pendulo.add(pendulo.cajaAbajo);

    return pendulo;
  }

  createPenduloPeq(lado,largo){
    var pendulo = new THREE.Object3D();
    pendulo.caja = new THREE.Mesh(
      new THREE.BoxGeometry(lado,largo,lado),
      new THREE.MeshPhongMaterial( { color: 0x1d3aca } )
    );
    pendulo.rosca =new THREE.Mesh(
      new THREE.CylinderGeometry(lado/4,lado/4,5*lado/4,8), // Queremos que su tamaño sea la mitad del lado del péndulo de ancho y alto y que sobresalga un poco de profundo
      new THREE.MeshPhongMaterial( { color: 0xc75cfa } )
    );

    pendulo.rosca.rotateX(Math.PI/2);
    pendulo.caja.position.set(0,(-largo+lado)/2,0);

    pendulo.add(pendulo.rosca);
    pendulo.add(pendulo.caja);

    return pendulo;
  }


  createGUIBox(gui){
      var that = this;

      this.guiControls = {
        centralPendGrande: 5,
        anguloT: 0,
        largoPendPeq: 10,
        anguloP: 0
      };

      var folder = gui.addFolder('Pendulo Grande');

      folder.add(this.guiControls, 'centralPendGrande', 5,+10,0.1)
        .name('Longitud: ')
        .onChange( function(){
          that.penduloGrande.cajaCentral.scale.set(1,that.guiControls.centralPendGrande/that.dimPendGrande.central,1);
          that.penduloGrande.cajaCentral.position.set(0,(-that.dimPendGrande.lado-that.guiControls.centralPendGrande)/2,0);
          that.penduloGrande.cajaAbajo.position.set(0,-that.dimPendGrande.lado-that.guiControls.centralPendGrande,0);
          that.penduloPeque.position.set(0,-that.dimPendGrande.lado/2 -that.dimPendPeq.porcentaje*that.guiControls.centralPendGrande,(that.dimPendPeq.lado+that.dimPendGrande.lado)/2);
        });
      folder.add(this.guiControls, 'anguloT', -Math.PI/4, Math.PI/4,0.1)
        .name('Giro: ')
        .onChange( function(){
          that.rotation.z=that.guiControls.anguloT;
        }
      );

      folder = gui.addFolder('Pendulo Pequeño');
      folder.add(this.guiControls, 'largoPendPeq', 10,+20,0.1)
        .name('Longitud: ')
        .onChange( function(){
          that.penduloPeque.caja.scale.set(1,that.guiControls.largoPendPeq/that.dimPendPeq.largo,1);
          that.penduloPeque.caja.position.set(0,(-that.guiControls.largoPendPeq+that.dimPendPeq.lado)/2,0);
      });
      folder.add(this.guiControls, 'anguloT', -1, 1,0.1)
        .name('Giro: ')
        .onChange( function(){
          that.penduloPeque.rotation.z=that.guiControls.anguloT;
      });
      folder.add(this.dimPendPeq, 'porcentaje', 0.1,0.9,0.01)
        .name('Posicion(%): ')
        .onChange( function(){
            that.penduloPeque.position.set(0,-that.dimPendGrande.lado/2 -that.dimPendPeq.porcentaje*that.guiControls.centralPendGrande,(that.dimPendPeq.lado+that.dimPendGrande.lado)/2);
        });


    }

    update(){
      //this.box.caja.rotation.y+=0.01;
    }

}
