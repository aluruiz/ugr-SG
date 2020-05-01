
class Figuras extends THREE.Object3D {
  constructor(gui) {
    super();
    this.tiempoAnterior = Date.now();
    this.velocidad = 4;

    this.altura = 5;
    this.radio = 5;
    this.dirPositiva = false;
    /*this.sinu = true;
    this.heli = false;*/

    this.material = new THREE.MeshNormalMaterial({flatShading: true});
    this.transparent = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true})

    this.aux = new THREE.Object3D();

    this.aux.bola = new THREE.Mesh(new THREE.SphereGeometry(1,8,6), this.material);
    this.cilindro = new THREE.Mesh(new THREE.CylinderGeometry(this.radio,this.radio,this.altura,32), this.transparent);
    this.aux.bola.geometry.translate(this.radio+1,0,0);
    this.createAnimacion();
    
    this.aux.add(this.aux.bola);
    this.createGUICilindro (gui)
    this.add(this.aux);
    this.add(this.cilindro);
    
  }

  createAnimacion(){

    var that = this;
    let origen = {x: 0};
    let destino = {x: 2*Math.PI};

    var movimiento = new TWEEN.Tween(origen).to(destino, 4000);
    //movimiento.easing(TWEEN.Easing.Quadratic.InOut);

    movimiento.onUpdate(() => {
      that.aux.bola.rotation.y = origen.x;
    });

    let origen2 = {x: 1};
    let destino2 = {x: -1};

    var movimiento2 = new TWEEN.Tween(origen2).to(destino2, 2000);
    movimiento2.easing(TWEEN.Easing.Quadratic.InOut);

    movimiento2.onUpdate(() => {
      that.aux.bola.position.x = (origen2.x * (that.cilindro.guiControls.desfase));
    });

    movimiento2.yoyo(true);

    movimiento.repeat(Infinity);
    movimiento2.repeat(Infinity);
    movimiento.start();
    movimiento2.start();
  }

  createGUICilindro (gui){
    var that = this;

    this.cilindro.guiControls = {
      desfase: 1,
    };

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Radio del Cilindro");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   pe rmite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    
    folder.add(this.cilindro.guiControls, 'desfase',0,10,0.1).name('Radio del cilindro').
    onChange( function(){
      that.cilindro.scale.set((that.cilindro.guiControls.desfase + that.radio)/that.radio,1,1);
    });

  }

  update () {
    TWEEN.update();  
  }
}
