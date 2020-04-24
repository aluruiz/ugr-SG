class Pendulo extends THREE.Object3D {
    constructor(gui) {
        super();

        this.createGUI(gui, "Control del péndulo");
/*
        // Pendulo 1
        let geometryPendulo1 = new THREE.BoxGeometry(2, 2);
        let materialPendulo1 = new THREE.MeshPhongMaterial();
        this.meshPendulo1 = new THREE.Mesh(geometryPendulo1, materialPendulo1);

        // Pendulo 2
        let geometryPendulo2 = new THREE.BoxGeometry(5, 2);
        let materialPendulo2 = new THREE.MeshPhongMaterial();
        this.meshPendulo2 = new THREE.Mesh(geometryPendulo2, materialPendulo2);

        this.add(this.meshPendulo1);
        this.add(this.meshPendulo2);

 */
        let materialVerde = new THREE.MeshPhongMaterial({color:0x009933});
        let materialRojo = new THREE.MeshPhongMaterial({color:0xff3300});

        // Pendulo 1
        this.h_verde = 2;
        this.w_verde = 2;
        this.h_rojo = 5;
        this.w_rojo = 2;

        let geometriaPendulo1Superior = new THREE.BoxGeometry(this.w_verde, this.h_verde);
        this.meshPendulo1Superior = new THREE.Mesh(geometriaPendulo1Superior, materialVerde);

        let geometriaPendulo1Medio = new THREE.BoxGeometry(this.w_rojo, this.h_verde);
        this.meshPendulo1Medio = new THREE.Mesh(geometriaPendulo1Medio, materialRojo);
        this.meshPendulo1Medio.position.y = -this.h_rojo/2 -this.h_verde/2;

        let geometriaPendulo1Inferior = new THREE.BoxGeometry(2, 2);
        this.meshPendulo1Inferior = new THREE.Mesh(geometriaPendulo1Inferior, materialVerde);
        this.meshPendulo1Inferior.position.y = 2*(-this.h_verde/2) - this.h_rojo*this.guiControls.longitud1;
/*
        //Geometria 1
        this.h_green = 2;
        this.w_green = 2;
        var geometryGreen = new THREE.BoxGeometry(this.w_green, this.h_green);

        //Geometria 2
        this.h_red = 5;
        this.w_red = 2;
        var geometryRed = new THREE.BoxGeometry(this.w_red, this.h_red);

        //Caja de arriba
        this.boxUp = new THREE.Mesh(geometryGreen,green_Material);

        //Caja de en medio
        this.boxMid = new THREE.Mesh(geometryRed, red_Material);
        this.boxMid.position.y = -this.h_red/2 -this.h_green/2;

        //Caja de abajo
        this.boxDown = new THREE.Mesh(geometryGreen, green_Material);
        this.boxDown.position.y = 2*(-this.h_green/2) - this.h_red*this.guiControls.escala;

        //Pendulo inferior
        this.h = 3;
        this.w = 1;

        var geometry = new THREE.BoxGeometry(this.w,this.h, this.w/2);
        geometry.translate(0,-this.h/3,0);
        var material = new THREE.MeshPhongMaterial({color:0x6f6c6b});

        this.boxInf = new THREE.Mesh(geometry,material);
        this.boxInf.position.z = 0.7;
*/
/*
        this.add(this.boxInf);

        this.add(this.boxUp);
        this.add(this.boxMid);
        this.add(this.boxDown);*/
        this.add(this.meshPendulo1Superior);
        this.add(this.meshPendulo1Medio);
        this.add(this.meshPendulo1Inferior);
    }

    createGUI (gui) {
        this.guiControls = {
            longitud1: 1.0,
            giro1: 0.0,

            longitud2: 1.0,
            posicion2: 0.0,
            giro2: 0
        }

        let folderPendulo1 = gui.addFolder ("Pendulo 1");
        folderPendulo1.add (this.guiControls, 'longitud1', 1.0, 2.0, 0.1).name ('Longitud ').listen();
        folderPendulo1.add (this.guiControls, 'giro1', 0, 1, 0.01).name ('Giro ').listen();

        let folderPendulo2 = gui.addFolder ("Pendulo 2");
        folderPendulo2.add (this.guiControls, 'longitud2', 1.0, 2.0, 0.1).name ('Longitud ').listen();
        folderPendulo2.add (this.guiControls, 'posicion2', -0.7, 0.7, 0.01).name ('Posicion (%) ').listen();
        folderPendulo2.add (this.guiControls, 'giro2', 0, 1, 0.01).name ('Giro ').listen();
    }

    update() {
        this.meshPendulo1Inferior.position.y = 2*(-this.h_verde/2) - this.h_rojo * this.guiControls.longitud1;
        this.meshPendulo1Medio.scale.y = this.guiControls.longitud1;
        this.meshPendulo1Inferior.position.y = -(this.h_rojo*this.guiControls.longitud1 / 2) - this.h_verde / 2;
        
    }
}