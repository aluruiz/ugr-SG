
class MyScene extends THREE.Scene {
  constructor (unRenderer) {
	super();		

	this.createLights ();
	this.createCamera (unRenderer);
	this.createGUI ();
	this.axis = new THREE.AxesHelper (5);
	this.add (this.axis);

	for(var i = 0; i < 12; i++) {
		var sphere = new  THREE.Mesh(new THREE.SphereGeometry(0.25,16,16), new  THREE.MeshPhongMaterial({color:0x00ff00}));
		sphere.geometry.translate(3,0,0);
		sphere.rotation.y = (i/12)*2*Math.PI;
		this.add(sphere);
	}
	
	this.sphere = new  THREE.Mesh(new THREE.SphereGeometry(0.25,16,16), new  THREE.MeshPhongMaterial({color:0xff0000}));
	this.sphere.geometry.translate(2.5,0,0);
	this.add(this.sphere)

  }
 
	createCamera (unRenderer) {
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		// También se indica dónde se coloca
		this.camera.position.set (6, 3, 6);
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
		this.guiControls = new function () {
			this.speed = 1;	 
			// Un botón para dejarlo todo en su posición inicial
			// Cuando se pulse se ejecutará esta función.
			this.reset = function () {
				this.speed = 1;
				this.sphere.rotation = 0;
			}
		} 
		
		// Se crea una sección para los controles de la caja
		var folder = gui.addFolder ('Controles globales');
		folder.add (this.guiControls, 'speed', -12,12,1).name ('Velocidad(Esferas/Segundo): ');
		folder.add (this.guiControls, 'reset').name ('[ Reset ]');
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
		this.spotLight = new THREE.SpotLight( 0xffffff, 0.5 );
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
		
		this.sphere.rotation.y += 2*Math.PI*(this.guiControls.speed/12)*segundos_transcurridos;
		
		this.last_time = this.time;
	}
}