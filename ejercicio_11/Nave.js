
class Nave extends THREE.Object3D {
    constructor() {
        super();

        this.crearNave();
        this.crearSpline();

        this.crearMovimientos();
    }

    crearNave() {
        let textureLoader = new THREE.TextureLoader();
        let texturaNave = textureLoader.load('../imgs/textura-ajedrezada-amarilla.jpg');
        let materialNave =  new THREE.MeshPhongMaterial({map: texturaNave});
        this.geometriaNave = new THREE.TetrahedronGeometry();
        this.nave = new THREE.Mesh(this.geometriaNave, materialNave);
        this.nave.position.set(0, 10, 0);
        this.add(this.nave);
    }

    crearSpline() {
        this.splineCurve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( 0, 10, 0),

            new THREE.Vector3( -7, 7, 2 ),
            new THREE.Vector3( -9, 7.5, 2 ),
            new THREE.Vector3( -15, 10, -1 ),
            new THREE.Vector3( -2, 6, -3 ),

            new THREE.Vector3( 0, 4, 0),

            new THREE.Vector3( 7, 7, 2 ),
            new THREE.Vector3( 9, 6, 2 ),
            new THREE.Vector3( 15, 7, -1 ),
            new THREE.Vector3( 2, 10, -3 ),
/*
            new THREE.Vector3( 8, 1, 0),
            new THREE.Vector3( 17, 4, 0),
            new THREE.Vector3( 22, 7, -0.5),
            new THREE.Vector3( 25, 12, -1),*/

            new THREE.Vector3( 0, 10, 0),
        ] );
        let points = this.splineCurve.getPoints( 50 );
        let geometry = new THREE.BufferGeometry().setFromPoints( points );
        let material = new THREE.LineBasicMaterial({ color : 0xff0000 });
        this.splineObject = new THREE.Line(geometry, material);
        this.add(this.splineObject);
    }

    crearMovimientos() {
        let origen1 = {x: 0.0}
        let target1 = {x: 0.5}
        let auxiliar = 0;

        this.movimiento1 = new TWEEN.Tween(origen1).to(target1, 8000);
        this.movimiento1.easing(TWEEN.Easing.Quadratic.InOut);

        let that = this;
        this.movimiento1.onUpdate(() => {
            auxiliar = origen1.x;
            let nuevaPosicion = that.splineCurve.getPointAt(auxiliar);
            that.nave.position.copy(nuevaPosicion);

            let tan = that.splineCurve.getTangentAt(auxiliar);
            nuevaPosicion.add(tan);
            that.nave.lookAt(nuevaPosicion);
        });

        let origen2 = {x: 0.5}
        let target2 = {x: 1.0}
        this.movimiento2 = new TWEEN.Tween(origen2).to(target2, 4000);
        this.movimiento2.easing(TWEEN.Easing.Quadratic.InOut);

        this.movimiento2.onUpdate(() => {
            auxiliar = origen2.x;
            let nuevaPosicion = that.splineCurve.getPointAt(auxiliar);
            that.nave.position.copy(nuevaPosicion);

            let tan = that.splineCurve.getTangentAt(auxiliar);
            nuevaPosicion.add(tan);
            that.nave.lookAt(nuevaPosicion);
        });

        this.movimiento1.chain(this.movimiento2);
        this.movimiento2.chain(this.movimiento1);
        this.movimiento2.start();
    }

    update () {
        TWEEN.update();
    }
};