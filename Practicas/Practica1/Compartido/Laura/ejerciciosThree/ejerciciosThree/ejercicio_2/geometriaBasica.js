class Figura extends THREE.Object3D{
  constructor(gui){
    super();

    this.material=new THREE.MeshNormalMaterial({flatShading: true});

    // Shading de los materiales
    var that=this;
    var folder=gui.addFolder("Luz y Ejes");
    folder.add (this.material, 'flatShading')
      .name ('Sombreado : ')
      .onChange(function(){
        that.material.needsUpdate=true;
    });

    // Creación de los elementos
    this.box = this.createBox();
    this.cone = this.createCone();
    this.cylinder = this.createCylinder();
    this.sphere = this.createSphere();
    this.icosahedron = this.createIcosahedron();
    this.torus = this.createTorus();

    // Creación de las GUI de los elementosS
    this.createGUIBox(gui);
    this.createGUICone(gui);
    this.createGUICylinder(gui);
    this.createGUISphere(gui);
    this.createGUIIcosahedron(gui);
    this.createGUITorus(gui);

    // Los añadimos a nuestro objeto
    this.add(this.box);
    this.add(this.cone);
    this.add(this.cylinder);
    this.add(this.sphere);
    this.add(this.icosahedron);
    this.add(this.torus);
  }

  createBox(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.caja = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),this.material);
    aux.position.set(3.0,3.0,-3.0);
    aux.add(ejes);
    aux.add(aux.caja);
    return aux;
  }

  createCone(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.cono = new THREE.Mesh(new THREE.ConeGeometry(1,3),this.material);
    aux.position.set(3.0,-3.0,-3.0);
    aux.add(ejes);
    aux.add(aux.cono);
    return aux;
  }

  createCylinder(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.cilindro = new THREE.Mesh(new THREE.CylinderGeometry(),this.material);
    aux.position.set(-3.0,3.0,3.0);
    aux.add(ejes);
    aux.add(aux.cilindro);
    return aux;
  }

  createSphere(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.esfera = new THREE.Mesh(new THREE.SphereGeometry(),this.material);
    aux.position.set(-3.0,-3.0,3.0);
    aux.add(ejes);
    aux.add(aux.esfera);
    return aux;
  }

  createIcosahedron(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.icosaedro = new THREE.Mesh(new THREE.IcosahedronGeometry(),this.material);
    aux.position.set(0,3,0);
    aux.add(ejes);
    aux.add(aux.icosaedro);
    return aux;
  }

  createTorus(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.toro = new THREE.Mesh(new THREE.TorusGeometry(),this.material);
    aux.position.set(0,-3,0);
    aux.add(ejes);
    aux.add(aux.toro);
    return aux;
  }


  createGUIBox(gui){
      var that = this;

      this.box.guiControls = {
        dimBoxX: 1,
        dimBoxY: 1,
        dimBoxZ: 1
      };

      var folder = gui.addFolder('Transformaciones Caja');

      folder.add(this.box.guiControls, 'dimBoxX', 1,+10,0.1)
        .name('Dimension X')
        .onChange( function(){
          that.box.caja.scale.set(that.box.guiControls.dimBoxX,that.box.guiControls.dimBoxY,that.box.guiControls.dimBoxZ);
        });
      folder.add(this.box.guiControls, 'dimBoxY', 1,+10,0.1)
        .name('Dimension Y')
        .onChange( function(){
          that.box.caja.scale.set(that.box.guiControls.dimBoxX,that.box.guiControls.dimBoxY,that.box.guiControls.dimBoxZ);
        });
      folder.add(this.box.guiControls, 'dimBoxZ', 1,+10,0.1)
        .name('Dimension Z')
        .onChange( function(){
          that.box.caja.scale.set(that.box.guiControls.dimBoxX,that.box.guiControls.dimBoxY,that.box.guiControls.dimBoxZ);
        });
    }

    createGUICone(gui){
      var that = this;

      this.cone.guiControls = {
        dimConeRadius: 1,
        dimConeHeight: 1,
        dimConeRadialSegments: 3
      }

      var folder = gui.addFolder('Transformaciones Cono');

      folder.add(this.cone.guiControls, 'dimConeRadius',1, +10,0.01)
        .name('Radio')
        .onChange( function(){
          that.cone.cono.geometry = new THREE.ConeGeometry(that.cone.guiControls.dimConeRadius,that.cone.guiControls.dimConeHeight,that.cone.guiControls.dimConeRadialSegments) ;
        });
      folder.add(this.cone.guiControls, 'dimConeHeight',1, +10,0.01)
        .name('Altura')
        .onChange( function(){
          that.cone.cono.geometry = new THREE.ConeGeometry(that.cone.guiControls.dimConeRadius,that.cone.guiControls.dimConeHeight,that.cone.guiControls.dimConeRadialSegments) ;
        });
      folder.add(this.cone.guiControls, 'dimConeRadialSegments',3, +15,1)
        .name('Subdivisión')
        .onChange( function(){
          that.cone.cono.geometry = new THREE.ConeGeometry(that.cone.guiControls.dimConeRadius,that.cone.guiControls.dimConeHeight,that.cone.guiControls.dimConeRadialSegments) ;
        });
    }

    createGUICylinder(gui){
      var that = this;

      this.cylinder.guiControls = {
        dimCylinderRadiusTop: 1,
        dimCylinderRadiusBottom: 1,
        dimCylinderHeight: 1
      }

      var folder = gui.addFolder('Transformaciones Cilindro');

      folder.add(this.cylinder.guiControls, 'dimCylinderRadiusTop',1, +10,0.01)
        .name('Radio Superior')
        .onChange( function(){
          that.cylinder.cilindro.geometry = new THREE.CylinderGeometry(that.cylinder.guiControls.dimCylinderRadiusTop,that.cylinder.guiControls.dimCylinderRadiusBottom,that.cylinder.guiControls.dimCylinderHeight) ;
        });
      folder.add(this.cylinder.guiControls, 'dimCylinderRadiusBottom',1, +10,0.01)
        .name('Radio Inferior')
        .onChange( function(){
          that.cylinder.cilindro.geometry = new THREE.CylinderGeometry(that.cylinder.guiControls.dimCylinderRadiusTop,that.cylinder.guiControls.dimCylinderRadiusBottom,that.cylinder.guiControls.dimCylinderHeight) ;
        });
      folder.add(this.cylinder.guiControls, 'dimCylinderHeight',1, +10,0.01)
        .name('Altura')
        .onChange( function(){
          that.cylinder.cilindro.geometry = new THREE.CylinderGeometry(that.cylinder.guiControls.dimCylinderRadiusTop,that.cylinder.guiControls.dimCylinderRadiusBottom,that.cylinder.guiControls.dimCylinderHeight) ;
        });
    }

    createGUISphere(gui){
      var that = this;
      this.sphere.guiControls = {
        dimSphereRadius: 1,
        dimSphereWidth: 8,
        dimSphereHeight: 6
      }

      var folder = gui.addFolder('Transformaciones Esfera');

      folder.add(this.sphere.guiControls, 'dimSphereRadius',1, +10,0.01)
        .name('Radio')
        .onChange( function(){
          that.sphere.esfera.geometry = new THREE.SphereGeometry(that.sphere.guiControls.dimSphereRadius,that.sphere.guiControls.dimSphereWidth,that.sphere.guiControls.dimSphereHeight) ;
        });
      folder.add(this.sphere.guiControls, 'dimSphereWidth',3, +15,1)
        .name('Sub. Ecuador')
        .onChange( function(){
          that.sphere.esfera.geometry = new THREE.SphereGeometry(that.sphere.guiControls.dimSphereRadius,that.sphere.guiControls.dimSphereWidth,that.sphere.guiControls.dimSphereHeight) ;
        });
      folder.add(this.sphere.guiControls, 'dimSphereHeight',2, +15,1)
        .name('Sub. Meridiano')
        .onChange( function(){
          that.sphere.esfera.geometry = new THREE.SphereGeometry(that.sphere.guiControls.dimSphereRadius,that.sphere.guiControls.dimSphereWidth,that.sphere.guiControls.dimSphereHeight) ;
        });
    }

    createGUIIcosahedron(gui){
      var that = this;
      this.icosahedron.guiControls = {
        dimIcosahedronRadius: 1,
        dimIcosahedronDetail: 0
      }

      var folder = gui.addFolder('Transformaciones Icosahedro');

      folder.add(this.icosahedron.guiControls, 'dimIcosahedronRadius',1, +10,0.01)
        .name('Radio')
        .onChange( function(){
          that.icosahedron.icosaedro.geometry = new THREE.IcosahedronGeometry(that.icosahedron.guiControls.dimIcosahedronRadius,that.icosahedron.guiControls.dimIcosahedronDetail) ;
        });
      folder.add(this.icosahedron.guiControls, 'dimIcosahedronDetail',0, +5,1)
        .name('Detalle')
        .onChange( function(){
          that.icosahedron.icosaedro.geometry = new THREE.IcosahedronGeometry(that.icosahedron.guiControls.dimIcosahedronRadius,that.icosahedron.guiControls.dimIcosahedronDetail) ;
        });
    }

    createGUITorus(gui){
      var that = this;
      this.torus.guiControls = {
        dimTorusRadius: 1,
        dimTorusTube: 0.4,
        dimTorusRadial: 8,
        dimTorusTubular: 6
      }

      var folder = gui.addFolder('Transformaciones Toro');
      folder.add(this.torus.guiControls, 'dimTorusRadius',1, +10,0.01)
        .name('Radio')
        .onChange( function(){
          that.torus.toro.geometry = new THREE.TorusGeometry(that.torus.guiControls.dimTorusRadius,that.torus.guiControls.dimTorusTube,that.torus.guiControls.dimTorusRadial,that.torus.guiControls.dimTorusTubular) ;
        });
      folder.add(this.torus.guiControls, 'dimTorusTube',0.1, +10,0.01)
        .name('Tubo')
        .onChange( function(){
          that.torus.toro.geometry = new THREE.TorusGeometry(that.torus.guiControls.dimTorusRadius,that.torus.guiControls.dimTorusTube,that.torus.guiControls.dimTorusRadial,that.torus.guiControls.dimTorusTubular) ;
        });
      folder.add(this.torus.guiControls, 'dimTorusRadial',2, +15,1)
        .name('Segmento Radial')
        .onChange( function(){
          that.torus.toro.geometry = new THREE.TorusGeometry(that.torus.guiControls.dimTorusRadius,that.torus.guiControls.dimTorusTube,that.torus.guiControls.dimTorusRadial,that.torus.guiControls.dimTorusTubular) ;
        });
      folder.add(this.torus.guiControls, 'dimTorusTubular',2, +15,1)
        .name('Segmento Tubular')
        .onChange( function(){
          that.torus.toro.geometry = new THREE.TorusGeometry(that.torus.guiControls.dimTorusRadius,that.torus.guiControls.dimTorusTube,that.torus.guiControls.dimTorusRadial,that.torus.guiControls.dimTorusTubular) ;
        });

    }

    update(){
      this.box.caja.rotation.y+=0.01;
      this.cone.cono.rotation.y+=0.01;
      this.cylinder.cilindro.rotation.y+=0.01;
      this.icosahedron.icosaedro.rotation.y+=0.01;
      this.sphere.esfera.rotation.y+=0.01;
      this.torus.toro.rotation.y+=0.01;
    }

}
