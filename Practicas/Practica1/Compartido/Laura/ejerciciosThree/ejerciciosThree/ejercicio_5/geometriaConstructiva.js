class Figura extends THREE.Object3D{
  constructor(gui){
    super();

    this.material=new THREE.MeshNormalMaterial({flatShading: true});

    this.taza = this.createTaza();
    this.escuadra = this.createEscuadra();
    this.tuerca = this.createTuerca();

    // Creación de las GUI de los elementosS
    this.createGUI(gui);

    // Los añadimos a nuestro objeto
    this.add(this.taza);
    this.add(this.escuadra);
    this.add(this.tuerca);
  }

  createTaza(){
    var cilExt = new THREE.CylinderGeometry(25,25,80,12);
    var toro = new THREE.TorusGeometry(20,5);
    var cilInt = new THREE.CylinderGeometry(22.5,22.5,80,12);

    cilInt.translate(0,5,0);
    toro.translate(-25,15,0);

    var cilExtBSP = new ThreeBSP(cilExt);
    var partialResult = cilExtBSP.union(new ThreeBSP(toro));
    var finalResult = partialResult.subtract(new ThreeBSP(cilInt));

    var result = finalResult.toMesh(this.material);
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();

    result.translateOnAxis(new THREE.Vector3(1,0,0),-100);

    return result;
  }

  createEscuadra(){
    var cuboExt = new THREE.BoxGeometry(50,50,10);
    var cuboInt = new THREE.BoxGeometry(50,50,10);
    var cuboRes = new THREE.BoxGeometry(10,10,10);
    var cilindro1 = new THREE.CylinderGeometry(2,4,10,12);
    var cilindro2 = new THREE.CylinderGeometry(2,4,10,12);
    var cilindro3 = new THREE.CylinderGeometry(10,10,10,12);

    cuboInt.translate(5,-5,0);
    cilindro1.translate(8,25,0);
    cilindro2.rotateZ(Math.PI/2);
    cilindro2.translate(-20,-8,0);
    cilindro3.rotateX(Math.PI/2);
    cilindro3.translate(-10,10,0);
    cuboRes.translate(-15,15,0);

    var cuboExtBSP = new ThreeBSP(cuboExt);
    var cuboIntBSP = new ThreeBSP(cuboInt);
    var partialResult = cuboIntBSP.subtract(new ThreeBSP(cuboRes));
    var partialResultBis = partialResult.union(new ThreeBSP(cilindro3));
    var partialResult1 = cuboExtBSP.subtract(partialResultBis);
    var partialResult2 = partialResult1.subtract(new ThreeBSP(cilindro1));
    var finalResult = partialResult2.subtract(new ThreeBSP(cilindro2));

    var result = finalResult.toMesh(this.material);
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();

    result.translateOnAxis(new THREE.Vector3(1,0,0),100);

    return result;
  }

  createTuerca(){
    var cilindro = new THREE.CylinderGeometry(20,20,20,6);
    var esfera = new THREE.SphereGeometry(22,18,5);
    var cilInt = new THREE.CylinderGeometry(12,12,20,40);
    var cilPeque = new THREE.CylinderGeometry(13,13,1,40);

    cilPeque.translate(0,-9,0);

    var cilindroBSP = new ThreeBSP(esfera);
    var partialResult = cilindroBSP.intersect(new ThreeBSP(cilindro));
    var finalResult = partialResult.subtract(new ThreeBSP(cilInt));

    for (var i = 0; i < 10; i++) {
      finalResult = finalResult.subtract(new ThreeBSP(cilPeque));
      cilPeque.translate(0,2,0);
    }

    var result = finalResult.toMesh(this.material);
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();

    return result;
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

      }
    }

}
