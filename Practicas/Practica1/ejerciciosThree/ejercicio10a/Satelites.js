
class Satelites extends THREE.Object3D {
    constructor(camera) {
        super();
        this.camera = camera;
        this.velocidad = 1;
        this.radioTierra = 5;

        this.crearTierra();
        this.crearSatelite1();
        this.planoRotacion = new THREE.Object3D();
        this.crearSatelite2();
        this.crearSatelite3();
        this.add(this.planoRotacion);

        this.tiempoAnterior = Date.now();
    }
    crearTierra() {
        let materialTierra = this.crearMaterialEsfera('tierra');
        let geometriaTierra = new THREE.SphereGeometry(this.radioTierra, 20);

        this.meshTierra = new THREE.Mesh(geometriaTierra, materialTierra);
        this.tierra = new THREE.Object3D();

        // Centrar en europa
        this.tierra.position.y = this.radioTierra;
        this.tierra.rotation.y = -0.55;

        this.tierra.add(this.meshTierra);
        this.add(this.tierra);
    }

    crearSatelite1() {
        let radio = 2;
        let materialSatelite = this.crearMaterialEsfera('cara');
        let geometriaSatelite = new THREE.SphereGeometry(radio, 20);
        geometriaSatelite.rotateY(Math.PI);
        geometriaSatelite.translate(15, 0, 0);
        this.meshSatelite1 = new THREE.Mesh(geometriaSatelite, materialSatelite);

        this.satelite1 = new THREE.Object3D();
        this.satelite1.add(this.meshSatelite1);

        this.satelite1.position.y = this.radioTierra;

        this.add(this.satelite1);
    }

    crearSatelite2() {
        let radio = 2;
        let materialSatelite = this.crearMaterialEsfera('cara');
        let geometriaSatelite = new THREE.SphereGeometry(radio, 20);
        geometriaSatelite.rotateY(Math.PI);
        //geometriaSatelite.translate(22, 0, 0);
        this.meshSatelite2 = new THREE.Mesh(geometriaSatelite, materialSatelite);

        this.satelite2 = new THREE.Object3D();
        this.satelite2.add(this.meshSatelite2);

        this.satelite2.position.y = this.radioTierra;
        this.satelite2.position.x = 22;

        this.planoRotacion.add(this.satelite2);
    }

    crearSatelite3() {
        let radio = 2;
        let materialSatelite = this.crearMaterialEsfera('cara');
        let geometriaSatelite = new THREE.SphereGeometry(radio, 20);
        geometriaSatelite.rotateY(Math.PI);
        //geometriaSatelite.translate(29, 0, 0);
        this.meshSatelite3 = new THREE.Mesh(geometriaSatelite, materialSatelite);

        this.satelite3 = new THREE.Object3D();
        this.satelite3.add(this.meshSatelite3);

        this.satelite3.position.y = this.radioTierra;
        this.satelite3.position.x = 29;

        this.planoRotacion.add(this.satelite3);
    }

    crearMaterialEsfera(textura) {
        let textureLoader = new THREE.TextureLoader();
        let texturaTierra = textureLoader.load('../imgs/' + textura + '.jpg');
        return new THREE.MeshPhongMaterial({map: texturaTierra});
    }

    update () {
        let tiempoActual = Date.now();
        let tiempoTranscurrido = (tiempoActual - this.tiempoAnterior) / 1000;
        let incrementoRotacion = (this.velocidad * 2 * Math.PI / 12) * tiempoTranscurrido;

        this.meshTierra.rotation.y += (this.velocidad * 2 * Math.PI / 12) * tiempoTranscurrido;

        this.meshSatelite2.lookAt(this.camera.position.z, this.camera.position.y, this.camera.position.x);

        this.satelite1.rotation.y += incrementoRotacion;
        this.planoRotacion.rotation.y += incrementoRotacion;

        this.meshSatelite3.rotation.y -= incrementoRotacion;

        this.tiempoAnterior = tiempoActual;
    }
};