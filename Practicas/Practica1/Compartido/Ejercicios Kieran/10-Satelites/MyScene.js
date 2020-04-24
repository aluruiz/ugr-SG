
class MyScene extends THREE.Scene {
  constructor (unRenderer) {
	super();		

	this.createLights ();
	this.createCamera (unRenderer);
	this.createGUI ();
	this.axis = new THREE.AxesHelper (5);
	this.add (this.axis);

	this.time;
	this.last_time;
	
	this.tierra = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16));
	var texture = new THREE.TextureLoader().load('../imgs/mundo.jpg');
	this.tierra.material = new THREE.MeshPhongMaterial ({map: texture});
	
	this.satelites = [];
	for(var i = 0; i < 3; i++)
	{
		this.satelites[i] = new MySat();
		this.satelites[i].position.x = 3+i;
		this.satelites[i].rotation.z = Math.PI/2;
		this.tierra.add(this.satelites[i]);
	}
	
    this.add(this.tierra);
  }
 
	createCamera (unRenderer) {
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		// También se indica dónde se coloca
		this.camera.position.set (20, 10, 20);
		// Y hacia dónde mira
		var look = new THREE.Vector3 (0,0,0);
		this.camera.lookAt(look);
		this.add (this.camera);
		
		// Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
		this.cameraControl = new THREE.TrackballControls (this.camera, unRenderer);
		// Se configuran las velocidades de los movimientos
		this.cameraControl.rotateSpeed = 5;
		this.cameraControl.zoomSpeed = -2;
		this.cameraControl.panSpeed = 0.5;
		// Debe orbitar con respecto al punto de mira de la cámara
		this.cameraControl.target = look;
	}

	createGUI () {
	
	}
  
	createLights () {
		// Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
		// La luz ambiental solo tiene un color y una intensidad
		// Se declara como	 var   y va a ser una variable local a este método
		//	  se hace así puesto que no va a ser accedida desde otros métodos
		var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
		// La añadimos a la escena
		this.add (ambientLight);
		
		// Se crea una luz focal que va a ser la luz principal de la escena
		// La luz focal, además tiene una posición, y un punto de mira
		// Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
		// En este caso se declara como	  this.atributo	  para que sea un atributo accesible desde otros métodos.
		this.spotLight = new THREE.SpotLight( 0xffffff, 0.75 );
		this.spotLight.position.set( 60, 60, 40 );
		this.add (this.spotLight);
	  }
  
	getCamera () {
		// En principio se devuelve la única cámara que tenemos
		// Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
		return this.camera;
	}
  
	setCameraAspect (ratio) {
		this.camera.aspect = ratio;
		this.camera.updateProjectionMatrix();
	}
  
	update () {
		this.cameraControl.update();
		
		// Se actualiza el resto del modelo
		this.time = Date.now();
		if(this.last_time == null)
			this.last_time = this.time;
		
		var segundos_transcurridos = (this.time-this.last_time)/1000.0;
		var tierra_rads_por_seg = 1;
		var cmr = new THREE.Vector3;
		
		this.tierra.rotation.y += tierra_rads_por_seg*segundos_transcurridos;
		this.satelites[0]; //No mueve ya que esta fija a la tierra
		this.camera.getWorldPosition(cmr);
		this.satelites[1].lookAt(this.camera.position);
		this.satelites[2].rotation.y += tierra_rads_por_seg*segundos_transcurridos;
		
		this.last_time = this.time;
	}
}