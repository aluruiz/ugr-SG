
class GeometriaRevolucion extends THREE.Object3D {
    constructor(gui, titleGUI) {
        super();
        this.createGUI(gui, titleGUI);

        //Material
        this.material = new THREE.MeshNormalMaterial({ flatShading: true });

        this.resolucion = this.guiControls.resolucion;


        this.points = [];

        this.points.push(new THREE.Vector3(0, 0, 0));
        this.points.push(new THREE.Vector3(3.0, 0, 0));
        this.points.push(new THREE.Vector3(3.0, 1.0, 0));
        this.points.push(new THREE.Vector3(2.75, 1.5, 0));
        this.points.push(new THREE.Vector3(2.0, 2.25, 0));
        this.points.push(new THREE.Vector3(1.75, 3.25, 0));
        this.points.push(new THREE.Vector3(1.5, 4.5, 0));
        this.points.push(new THREE.Vector3(1.25, 6.0, 0));
        this.points.push(new THREE.Vector3(1.25, 7.0, 0));
        this.points.push(new THREE.Vector3(1.5, 7.25, 0));
        this.points.push(new THREE.Vector3(1.75, 7.75, 0));
        this.points.push(new THREE.Vector3(2.0, 8.5, 0));
        this.points.push(new THREE.Vector3(2.0, 9.0, 0));
        this.points.push(new THREE.Vector3(1.75, 9.75, 0));
        this.points.push(new THREE.Vector3(1.5, 10.25, 0));
        this.points.push(new THREE.Vector3(1.25, 10.5, 0));
        this.points.push(new THREE.Vector3(0.75, 10.75, 0));
        this.points.push(new THREE.Vector3(0, 11.0, 0));

        this.createObject();
    }

    createGUI(gui, titleGUI) {

        this.guiControls = new function ()
        {
            this.segments = 20.0;
            this.angulo = 2*Math.PI;
        }

        var folder = gui.addFolder (titleGUI);

        folder.add(this.guiControls, 'segments', 20, 100, 1).name('Segmentos').listen();
    }

    createObject() {
        this.geometry = new THREE.LatheGeometry(this.points, this.segments, 0,2*Math.PI);
        this.latheObject = new THREE.Mesh(this.geometry, this.material);
        this.add(this.latheObject);
    }

    update() {
        this.segments = this.guiControls.segments;
        this.remove(this.latheObject);

        this.createObject();
    }
}