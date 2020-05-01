
class Figuras extends THREE.Object3D {
  constructor(gui) {
    super();
    this.tiempoAnterior = Date.now();
    this.velocidad = 1;

    this.altura = 20;
    this.dirPositiva = false;

    this.material = new THREE.MeshNormalMaterial({flatShading: true});
    this.transparent = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true})

    this.aux = new THREE.Object3D();
    this.aux.altura = 0;

    this.aux.bola = new THREE.Mesh(new THREE.SphereGeometry(1,8,6), this.material);
    this.cilindro = new THREE.Mesh(new THREE.CylinderGeometry(5,5,this.altura,32), this.transparent);
    
    this.aux.bola.position.set(-6,0,0);
    
    this.aux.add(this.aux.bola);
    this.createGUICilindro (gui)
    this.add(this.aux);
    this.add(this.cilindro);
  }

  createGUICilindro (gui) {
    var that = this;

    this.cilindro.guiControls = {
      sizeCilindroRadio: 5,
    };

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Dimensiones del Cilindro");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    
    folder.add(this.cilindro.guiControls, 'sizeCilindroRadio',0.5, 10,0.01).name('Radio del cilindro').onChange( function(){
      that.cilindro.geometry = new THREE.CylinderGeometry(that.cilindro.guiControls.sizeCilindroRadio, that.cilindro.guiControls.sizeCilindroRadio,that.altura,32) ;
    });

  }

  update () {
    //this.aux.rotation.y+=0.01;
    this.aux.bola.position.x = this.cilindro.guiControls.sizeCilindroRadio+1;
    var tiempoActual = Date.now();
    var segundosTranscurridos = (tiempoActual-this.tiempoAnterior)/1000;

    //Movimiento helicoidal
      if(this.dirPositiva){
        this.aux.position.y += 0.01;
        this.aux.rotation.y += (this.velocidad*(2*Math.PI)/4) * segundosTranscurridos;
        if(this.aux.position.y >= (this.altura/2)){
          this.dirPositiva = false;   
        }
      } else {
        this.aux.position.y -= 0.01;
        this.aux.rotation.y -= (this.velocidad*(2*Math.PI)/4) * segundosTranscurridos;
        if(this.aux.position.y <= -(this.altura/2)){
          this.dirPositiva = true;   
        }
      }
    this.tiempoAnterior = tiempoActual;
    
  }
}
