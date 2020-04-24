class ModeloCoche extends THREE.Object3D {
    constructor() {
        super();

        let materialLoader = new THREE.MTLLoader();
        let objectLoader = new THREE.OBJLoader();

        let that = this;
        materialLoader.load('../models/porsche911/911.mtl',
            function ( materials ) {
                objectLoader.setMaterials (materials);
                objectLoader.load( '../models/porsche911/Porsche_911_GT2.obj',
                    function ( object ) {
                        let coche = object;
                        that.add(coche) ;
                    }, () => {
                        console.log("Cargando modelo");
                    },
                    () => {
                        console.log("Error al cargar el modelo");
                    }) ;
            });
    }
}