
class Pendulo extends THREE.Object3D {
    constructor(gui) {
        super();
        
        this.createGUI(gui,"Controles de los péndulos");
        
        // Creacion del Pendulo 1
        let materialVerde = new THREE.MeshPhongMaterial({color:0x34A853});
        let materialRojo = new THREE.MeshPhongMaterial({color:0xEA4335});
        
        this.heightVerde = 2;
        this.widthVerde = 2;
        let geometriaVerde = new THREE.BoxGeometry(this.widthVerde, this.heightVerde);

        this.heightRojo = 5;
        this.widthRojo = 2;
        let geometriaRoja = new THREE.BoxGeometry(this.widthRojo, this.heightRojo);


        this.meshSuperior = new THREE.Mesh(geometriaVerde, materialVerde);
        this.meshMedio = new THREE.Mesh(geometriaRoja, materialRojo);
        this.meshInferior = new THREE.Mesh(geometriaVerde, materialVerde);

        this.meshMedio.position.y = (-this.heightRojo / 2) + (-this.heightVerde / 2);
        this.meshInferior.position.y = 2 * (-this.heightVerde / 2) + (-this.heightRojo * this.guiControls.escalaPendulo1);


        //Pendulo 2
        this.h_pendulo2 = 3;
        this.w_pendulo2 = 1;

        let geometriaPendulo2 = new THREE.BoxGeometry(this.w_pendulo2, this.h_pendulo2, (this.w_pendulo2 / 2));
        geometriaPendulo2.translate(0, (-this.h_pendulo2 / 3), 0);
        let materialAzul = new THREE.MeshPhongMaterial({color:0x4285F4});

        this.meshPendulo2 = new THREE.Mesh(geometriaPendulo2, materialAzul);
        this.meshPendulo2.position.z = 0.75;

        // Añadir los objetos
        this.add(this.meshSuperior);
        this.add(this.meshMedio);
        this.add(this.meshInferior);
        this.add(this.meshPendulo2);

        this.tiempoAnterior = Date.now();
        // Propiedades para cambiar la direccion de la velocidad
        this.reboteAnimacion1 = false;
        this.reboteAnimacion2 = false;
    }

    createGUI (gui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
            this.escalaPendulo1 = 1.0;
            this.rotacionPendulo1 = 0.0;

            this.escalaPendulo2 = 1.0;
            this.rotacionPendulo2 = 0.0;
            this.posicionPendulo2 = 0;

            this.animacionPendulo1 = false;
            this.animacionPendulo2 = false;
            this.velocidadPendulo1 = 1;
            this.velocidadPendulo2 = 1;

            this.resetPendulo1 = function () {
                this.escalaPendulo1 = 1.0;
                this.rotacionPendulo1 = 0.0;
            }

            this.resetPendulo2 = function () {
                this.escalaPendulo2 = 1.0;
                this.rotacionPendulo2 = 0.0;
                this.posicionPendulo2 = 0;
            }
        }


        let folderPendulo1 = gui.addFolder ("Control del péndulo 1");
        folderPendulo1.add (this.guiControls, 'escalaPendulo1', 1.0, 2.0, 0.1).name ('Escala').listen();
        folderPendulo1.add (this.guiControls, 'rotacionPendulo1', -0.9, 0.9, 0.01).name ('Rotación').listen();
        folderPendulo1.add (this.guiControls, 'resetPendulo1').name ('[Reset Pendulo 1]');

        let folderPendulo2 = gui.addFolder ("Control del péndulo 2");
        folderPendulo2.add (this.guiControls, 'escalaPendulo2', 1.0, 2.0, 0.1).name ('Escala').listen();
        folderPendulo2.add (this.guiControls, 'rotacionPendulo2', -0.9, 0.9, 0.01).name ('Rotación').listen();
        folderPendulo2.add (this.guiControls, 'posicionPendulo2', 0, 1, 0.01).name ('Posición').listen();
        folderPendulo2.add (this.guiControls, 'resetPendulo2').name ('[Reset Pendulo 2]');

        let folderPendulo3 = gui.addFolder("Animaciones");
        folderPendulo3.add (this.guiControls, 'animacionPendulo1').name('Pendulo 1');
        folderPendulo3.add(this.guiControls,'velocidadPendulo1', 0, 5, 0.1).name('Vel Pend 1').listen();
        folderPendulo3.add (this.guiControls, 'animacionPendulo2').name('Pendulo 2');
        folderPendulo3.add(this.guiControls,'velocidadPendulo2', 0, 5, 0.1).name('Vel Pend 2').listen();
    }

    update () {
        let tiempoActual = Date.now();
        let tiempoTranscurrido = (tiempoActual - this.tiempoAnterior) / 1000;
        if (this.guiControls.animacionPendulo1) {
            // Si la rotacion llega al limite, activar el rebote
            if (this.rotation.z > 1) {
                this.reboteAnimacion1 = true;
            } else if (this.rotation.z <= -1) {
                this.reboteAnimacion1 = false;
            }

            // Si el rebote está activado, la velocidad es negativa
            let velocidad = this.guiControls.velocidadPendulo1 * tiempoTranscurrido;
            if (this.reboteAnimacion1) {
                velocidad = -(velocidad);
            }

            this.rotation.z += velocidad;
        } else {
            this.rotation.z = this.guiControls.rotacionPendulo1;
        }

        this.meshMedio.scale.y = this.guiControls.escalaPendulo1;
        this.meshInferior.position.y = 2 * (-this.heightVerde / 2) - this.heightRojo * this.guiControls.escalaPendulo1;
        this.meshMedio.position.y = -(this.heightRojo * this.guiControls.escalaPendulo1 / 2) - this.heightVerde / 2;

        if (this.guiControls.animacionPendulo2) {
            // Si la rotacion llega al limite, activar el rebote
            if (this.meshPendulo2.rotation.z > 1) {
                this.reboteAnimacion2 = true;
            } else if (this.meshPendulo2.rotation.z < -1) {
                this.reboteAnimacion2 = false;
            }

            // Si el rebote está activado, la velocidad es negativa
            let velocidad = this.guiControls.velocidadPendulo2 * tiempoTranscurrido;
            if (this.reboteAnimacion2) {
                velocidad = -(velocidad);
            }

            this.meshPendulo2.rotation.z += velocidad;
        } else {
            this.meshPendulo2.rotation.z = this.guiControls.rotacionPendulo2;
        }
        this.meshPendulo2.scale.y = this.guiControls.escalaPendulo2;
        // La posicion del pendulo 2 es en funcion de la del pendulo 1
        this.meshPendulo2.position.y = (-(this.guiControls.posicionPendulo2 / 2) - 2) - (this.guiControls.posicionPendulo2 * (4 * this.guiControls.escalaPendulo1));

        this.tiempoAnterior = tiempoActual;
    }
}