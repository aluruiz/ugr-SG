 
class MyBarrido extends THREE.Mesh {
  constructor(shape, path) {
	super();
	var points;
	this.points = shape;
	var camino;
	this.camino = path;
	
	//Opciones de extrudeSettings
	var extrudeSettings = {
		steps: 5,
		depth: 2,
		bevelEnabled: true,
		bevelThickness: 0.6,
		bevelSize: 0.6,
		bevelSegments: 1
	};
	if(this.camino){ extrudeSettings.extrudePath = this.camino; }
	
	this.createGUI();
	
	this.extrudeSettings = extrudeSettings;
	
	// Un Mesh se compone de geometría y material
	this.geometry = new THREE.ExtrudeGeometry (this.points, this.extrudeSettings);
	this.material = new THREE.MeshNormalMaterial();
  }
	
createGUI () {
	// Controles para el tamaño, la orientación y la posición de la caja
	this.guiControls = new function () {
		this.steps=5;
		this.depth=2;
		this.bevelEnabled=true;
		this.bevelThickness=0.6;
		this.bevelSize=0.6;
		this.bevelSegments=1;
		this.sombPlan = false;
		// Un botón para dejarlo todo en su posición inicial
		// Cuando se pulse se ejecutará esta función.
		this.reset = function () {
			this.steps=5;
			this.depth=2;
			this.bevelEnabled=true;
			this.bevelThickness=0.6;
			this.bevelSize=0.6;
			this.bevelSegments=1;
			this.sombPlan = false;
		}
	}
		
	
	// Se crea una sección para los controles de la caja
	//var folder = gui.addFolder ('Controles del objeto por barrido');
	if(this.camino){
		gui.add (this.guiControls, 'steps', 5, 60, 1).name ('Steps: ').listen();
	}
	else {
		gui.add (this.guiControls, 'depth', 1, 12, 1).name ('Profundidad: ').listen();
		gui.add (this.guiControls, 'bevelEnabled').name ('Bisel: ').listen();
		gui.add (this.guiControls, 'bevelThickness', 0.2, 5, 0.2).name ('Anchura Bisel: ').listen();
		gui.add (this.guiControls, 'bevelSize', 0.2, 5, 0.2).name ('Tamaño Bisel: ').listen();
		gui.add (this.guiControls, 'bevelSegments', 1, 12, 1).name ('Segmentos Bisel: ').listen();
	}
	gui.add (this.guiControls, 'sombPlan').name ('Sombreado plano: ').listen();
	gui.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
	this.newSettings = {
		steps: this.guiControls.steps,
		depth: this.guiControls.depth,
		bevelEnabled: this.guiControls.bevelEnabled,
		bevelThickness: this.guiControls.bevelThickness,
		bevelSize: this.guiControls.bevelSize,
		bevelSegments: this.guiControls.bevelSegments
	};
	if(this.camino) {
		this.newSettings.extrudePath = this.camino;
		this.extrudeSettings.extrudePath = this.camino;
	}
	
	if(this.extrudeSettings.steps != this.guiControls.steps ||
		this.extrudeSettings.depth != this.guiControls.depth ||
		this.extrudeSettings.bevelEnabled != this.guiControls.bevelEnabled ||
		this.extrudeSettings.bevelThickness != this.guiControls.bevelThickness ||
		this.extrudeSettings.bevelSize != this.guiControls.bevelSize ||
		this.extrudeSettings.bevelSegments != this.guiControls.bevelSegments)
		{
			console.log("aaa");
			this.extrudeSettings = this.newSettings
			this.geometry = new THREE.ExtrudeGeometry (this.points, this.extrudeSettings); //aqui sale una abominación :(
			this.geometry.needsUpdate = true;
		}

	if(this.material.flatShading != this.guiControls.sombPlan) {
		this.material.needsUpdate = true;
		this.material.flatShading = this.guiControls.sombPlan;
	}
  }
}