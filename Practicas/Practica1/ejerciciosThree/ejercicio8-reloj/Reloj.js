
class Reloj extends THREE.Object3D {
    constructor(gui) {
        super();
        
        this.createGUI(gui,"Controles del reloj");

        // La parte que se mueve
        let clockGeometry = new THREE.SphereGeometry();
        clockGeometry.scale(2, 2, 2);
        clockGeometry.translate(15, 2, 0);

        let materialClock = new THREE.MeshPhongMaterial({ color: 0xFF1111});

        this.clockMesh = new THREE.Mesh(clockGeometry, materialClock);
        this.add(this.clockMesh);

        // Crear los minuteros
        let radio = 30;
        let puntos = 12;
        let pointGeometry = new THREE.SphereGeometry();
        pointGeometry.scale(2, 2, 2);
        for (let i = 0; i < puntos; ++i) {
            let pointColor = (i == 0 ? 0x1111FF : 0x16DC15); // El primer punto lo pongo azul, el resto verdes
            let angulo = (i / puntos * 360) * (Math.PI / 180); // A radianes
            let material = new THREE.MeshPhongMaterial({ color: pointColor});
            let point = new THREE.Mesh(pointGeometry, material);
            point.position.set(Math.sin(angulo) * radio, 0, Math.cos(angulo) * radio);
            this.add(point);
        }
    }

    createGUI (gui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
            velocidad: 1.0
        }


        let folder = gui.addFolder ("Reloj");
        folder.add(this.guiControls, 'velocidad', -12.0, 12.0, 1.0).name("Velocidad").listen();
    }

    update () {
       this.clockMesh.rotation.y += this.guiControls.velocidad / 60;
    }
}