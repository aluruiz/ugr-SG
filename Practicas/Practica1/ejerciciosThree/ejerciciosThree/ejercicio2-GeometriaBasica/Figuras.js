
class Figuras extends THREE.Object3D {
  constructor(gui) {
    super();

    this.material=new THREE.MeshNormalMaterial({flatShading: true});

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    

    this.caja = this.createCaja();
    this.createGUICaja(gui);
    this.add (this.caja);

    this.cono = this.createCono();
    this.createGUICono(gui);
    this.add (this.cono);

    this.cilindro = this.createCilindro();
    this.createGUICilindro(gui);
    this.add (this.cilindro);

    this.esfera = this.createEsfera();
    this.createGUIEsfera(gui);
    this.add (this.esfera);

    this.torus = this.createTorus();
    this.createGUITorus(gui);
    this.add (this.torus);
    
    this.icosa = this.createIcosaedro();
    this.createGUIIcosaedro(gui);
    this.add (this.icosa);
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

  createCono(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.cono = new THREE.Mesh (new THREE.ConeGeometry(1,3), this.material);
    aux.position.set(-3.0,3.0,-3.0);   
    aux.add(ejes);
    aux.add(aux.cono);

    return aux;
  }

  createCilindro(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.cilindro = new THREE.Mesh (new THREE.CylinderGeometry( 1, 1, 3), this.material);
    aux.position.set(3.0,-3.0,-3.0);   
    aux.add(ejes);
    aux.add(aux.cilindro);

    return aux;
  }

  createEsfera(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.esfera = new THREE.Mesh (new THREE.SphereGeometry(), this.material);
    aux.position.set(3.0,-3.0,3.0);   
    aux.add(ejes);
    aux.add(aux.esfera);

    return aux;
  }

  createTorus(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.torus = new THREE.Mesh (new THREE.TorusGeometry(), this.material);
    aux.position.set(-3.0,-3.0,3.0);   
    aux.add(ejes);
    aux.add(aux.torus);

    return aux;
  }

  createIcosaedro(){
    var ejes = new THREE.AxesHelper();
    var aux = new THREE.Object3D();
    aux.icosaedro = new THREE.Mesh (new THREE.IcosahedronGeometry(), this.material);
    aux.position.set(-3.0,3.0,3.0);   
    aux.add(ejes);
    aux.add(aux.icosaedro);

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

  createGUICono (gui) {
    var that = this;

    this.cono.guiControls = {
      sizeConoRadio: 1,
      sizeConoAltura: 1,
      sizeConoCaras: 8

    };

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Dimensiones del Cono");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.cono.guiControls, 'sizeConoRadio',1, +10,0.01).name('Radio').onChange( function(){
      that.cono.cono.geometry = new THREE.ConeGeometry(that.cono.guiControls.sizeConoRadio,that.cono.guiControls.sizeConoAltura,that.cono.guiControls.sizeConoCaras) ;
    });

    folder.add(this.cono.guiControls, 'sizeConoAltura',1, +10,0.01)
      .name('Altura')
      .onChange( function(){
        that.cono.cono.geometry = new THREE.ConeGeometry(that.cono.guiControls.sizeConoRadio,that.cono.guiControls.sizeConoAltura,that.cono.guiControls.sizeConoCaras) ;
      });

    folder.add(this.cono.guiControls, 'sizeConoCaras',3, +15,1)
      .name('Nro de Caras')
      .onChange( function(){
        that.cono.cono.geometry = new THREE.ConeGeometry(that.cono.guiControls.sizeConoRadio,that.cono.guiControls.sizeConoAltura,that.cono.guiControls.sizeConoCaras) ;
      });

  }

  createGUICilindro (gui) {
    var that = this;

    this.cilindro.guiControls = {
      sizeCilindroRadioTop: 1,
      sizeCilindroRadioBot: 1,
      sizeCilindroAltura: 3,
      sizeCilindroCaras: 8

    };

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Dimensiones del Cilindro");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.cilindro.guiControls, 'sizeCilindroRadioTop',0.5, +10,0.01).name('Radio de Arriba').onChange( function(){
      that.cilindro.cilindro.geometry = new THREE.CylinderGeometry(that.cilindro.guiControls.sizeCilindroRadioTop, that.cilindro.guiControls.sizeCilindroRadioBot,that.cilindro.guiControls.sizeCilindroAltura,that.cilindro.guiControls.sizeCilindroCaras) ;
    });

    folder.add(this.cilindro.guiControls, 'sizeCilindroRadioBot', 0.5, +10,0.01).name('Radio de Abajo').onChange( function(){
      that.cilindro.cilindro.geometry = new THREE.CylinderGeometry(that.cilindro.guiControls.sizeCilindroRadioTop, that.cilindro.guiControls.sizeCilindroRadioBot,that.cilindro.guiControls.sizeCilindroAltura,that.cilindro.guiControls.sizeCilindroCaras) ;
    });

    folder.add(this.cilindro.guiControls, 'sizeCilindroAltura',3, +10,1).name('Altura').onChange( function(){
      that.cilindro.cilindro.geometry = new THREE.CylinderGeometry(that.cilindro.guiControls.sizeCilindroRadioTop, that.cilindro.guiControls.sizeCilindroRadioBot, that.cilindro.guiControls.sizeCilindroAltura,that.cilindro.guiControls.sizeCilindroCaras) ;
    });

    folder.add(this.cilindro.guiControls, 'sizeCilindroCaras',6, +15,1).name('Nro de Caras').onChange( function(){
      that.cilindro.cilindro.geometry = new THREE.CylinderGeometry(that.cilindro.guiControls.sizeCilindroRadioTop, that.cilindro.guiControls.sizeCilindroRadioBot, that.cilindro.guiControls.sizeCilindroAltura,that.cilindro.guiControls.sizeCilindroCaras) ;
    });

  }

  createGUIEsfera (gui) {
    var that = this;

    this.esfera.guiControls = {
      sizeEsferaRadio: 1,
      sizeEsferaMeridiano: 6,
      sizeEsferaEcuador: 8

    };

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Dimensiones de la Esfera");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.esfera.guiControls, 'sizeEsferaRadio',1, +10,0.01).name('Radio').onChange( function(){
      that.esfera.esfera.geometry = new THREE.SphereGeometry(that.esfera.guiControls.sizeEsferaRadio,that.esfera.guiControls.sizeEsferaEcuador,that.esfera.guiControls.sizeEsferaMeridiano) ;
    });

    folder.add(this.esfera.guiControls, 'sizeEsferaEcuador',1, +10,0.01).name('Ecuador').onChange( function(){
      that.esfera.esfera.geometry = new THREE.SphereGeometry(that.esfera.guiControls.sizeEsferaRadio,that.esfera.guiControls.sizeEsferaEcuador,that.esfera.guiControls.sizeEsferaMeridiano) ;
    });

    folder.add(this.esfera.guiControls, 'sizeEsferaMeridiano',1, +10,0.01).name('Meridiano').onChange( function(){
      that.esfera.esfera.geometry = new THREE.SphereGeometry(that.esfera.guiControls.sizeEsferaRadio,that.esfera.guiControls.sizeEsferaEcuador,that.esfera.guiControls.sizeEsferaMeridiano) ;
    });


  }

  createGUITorus (gui) {
    var that = this;

    this.torus.guiControls = {
      sizeTorusRadio: 1,
      sizeTorusTubo: 0.4,
      sizeTorusRadial: 8,
      sizeTorusTubular: 6
    };

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Dimensiones del toro");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.torus.guiControls, 'sizeTorusRadio',1, +10,0.01).name('Radio').onChange( function(){
      that.torus.torus.geometry = new THREE.TorusGeometry(that.torus.guiControls.sizeTorusRadio, that.torus.guiControls.sizeTorusTubo, that.torus.guiControls.sizeTorusRadial, that.torus.guiControls.sizeTorusTubular) ;
    });

    folder.add(this.torus.guiControls, 'sizeTorusTubo',1, +10,0.01).name('Tubo').onChange( function(){
      that.torus.torus.geometry = new THREE.TorusGeometry(that.torus.guiControls.sizeTorusRadio, that.torus.guiControls.sizeTorusTubo, that.torus.guiControls.sizeTorusRadial, that.torus.guiControls.sizeTorusTubular) ;
    });

    folder.add(this.torus.guiControls, 'sizeTorusRadial',1, +10,0.01).name('Secciones Radiales').onChange( function(){
      that.torus.torus.geometry = new THREE.TorusGeometry(that.torus.guiControls.sizeTorusRadio, that.torus.guiControls.sizeTorusTubo, that.torus.guiControls.sizeTorusRadial, that.torus.guiControls.sizeTorusTubular) ;
    });

    folder.add(this.torus.guiControls, 'sizeTorusTubular',1, +10,0.01).name('Secciones Tubulares').onChange( function(){
      that.torus.torus.geometry = new THREE.TorusGeometry(that.torus.guiControls.sizeTorusRadio, that.torus.guiControls.sizeTorusTubo, that.torus.guiControls.sizeTorusRadial, that.torus.guiControls.sizeTorusTubular) ;
    });

  }

  createGUIIcosaedro (gui) {
    var that = this;

    this.icosa.guiControls = {
      sizeIcosaRadio: 1,
      sizeIcosaDetalle: 0
    };

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Dimensiones del Icosaedro");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.icosa.guiControls, 'sizeIcosaRadio',1, +10,0.01).name('Radio').onChange( function(){
      that.icosa.icosaedro.geometry = new THREE.IcosahedronGeometry(that.icosa.guiControls.sizeIcosaRadio, that.icosa.guiControls.sizeIcosaDetalle) ;
    });

    folder.add(this.icosa.guiControls, 'sizeIcosaDetalle',0, +10,1).name('Detalle').onChange( function(){
      that.icosa.icosaedro.geometry = new THREE.IcosahedronGeometry(that.icosa.guiControls.sizeIcosaRadio, that.icosa.guiControls.sizeIcosaDetalle) ;
    });
  }

  update () {
    this.caja.caja.rotation.z+=0.01;
    this.cono.cono.rotation.z+=0.01;
    this.cilindro.cilindro.rotation.z+=0.01;
    this.icosa.icosaedro.rotation.z+=0.01;
    this.esfera.esfera.rotation.z+=0.01;
    this.torus.torus.rotation.z+=0.01;

    this.caja.caja.rotation.y+=0.01;
    this.cono.cono.rotation.y+=0.01;
    this.cilindro.cilindro.rotation.y+=0.01;
    this.icosa.icosaedro.rotation.y+=0.01;
    this.esfera.esfera.rotation.y+=0.01;
    this.torus.torus.rotation.y+=0.01;

    this.caja.caja.rotation.x+=0.01;
    this.cono.cono.rotation.x+=0.01;
    this.cilindro.cilindro.rotation.x+=0.01;
    this.icosa.icosaedro.rotation.x+=0.01;
    this.esfera.esfera.rotation.x+=0.01;
    this.torus.torus.rotation.x+=0.01;

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
