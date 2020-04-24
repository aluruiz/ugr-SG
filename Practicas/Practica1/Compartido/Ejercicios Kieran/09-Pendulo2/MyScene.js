
class MyScene extends THREE.Scene {
  constructor (unRenderer) {
	super();		

	this.createLights ();
	this.createCamera (unRenderer);
	this.createGUI ();
	this.axis = new THREE.AxesHelper (5);
	this.add (this.axis);
	
	//Variables de longitud
	this.centerpoint = 4.5;
	
	//Crear contenedores
	this.penduloSuperior = new THREE.Object3D();
	this.penduloInferior = new THREE.Object3D();
	this.penduloCenterpoint = new THREE.Object3D();
	this.pendInfContainer = new THREE.Object3D();
	
	//Crear componentes
	this.pendSup1 = new ComponenteRoja(); // Tamaño por defecto 5
	this.pendSup2 = new ComponenteVerde(); // Tamaño 4
	this.pendSup3 = new ComponenteVerde(); // Tamaño 4
	this.pendInf = new ComponenteAzul(); // Tamaño por defecto 10
	
	//Formar pendulo superior, componentes verdes anidados a los extremos del rojo
	this.pendSup2.applyMatrix (new THREE.Matrix4().makeTranslation(0,this.centerpoint,0)); // 5/2 + 4/2
	this.pendSup3.applyMatrix (new THREE.Matrix4().makeTranslation(0,-this.centerpoint,0)); // 5/2 + 4/2
	
	this.penduloCenterpoint.add(this.pendSup1);
	this.penduloCenterpoint.add(this.pendSup3);
	
	this.penduloSuperior.add(this.pendSup2);
	this.penduloSuperior.add(this.penduloCenterpoint);
	
	//Formar pendulo inferior
	
	this.pendInf.applyMatrix (new THREE.Matrix4().makeTranslation(0,-4,0)); //Eje en y = 1
	this.pendInfContainer.add(this.pendInf);
	this.penduloInferior.add(this.pendInfContainer);
	this.penduloCenterpoint.add(this.penduloInferior); //Centrado con el superior, ya que no se ha movido
	
	//Centrar eje del pendulo superior
	//Longitud = 5+4+4 = 13. Centrado en 13/2 = 6.5
	//Queremos centrar su eje en mitad del verde superior, es decir, 4/2 = 2, menos 6.5 = -4.5
	this.penduloSuperior.applyMatrix (new THREE.Matrix4().makeTranslation(0,-this.centerpoint,0));
	
	//Añadir todo a la escena
	this.Pendulo = new THREE.Object3D();
	this.Pendulo.add(this.penduloSuperior);
	this.add(this.Pendulo);
	
	
	//Variables de los grados de libertad
	this.longPendSup = 5; // Ud. distancia
	this.longPendInf = 10; // Ud. distancia
	this.oscPendSup = 0; // Radianes
	this.oscPendInf = 0; // Radianes
	this.posPendInf = 0.5; // Fracción
	
	this.sentidoLonSup = true;
	this.sentidoLonInf = true;
	this.sentidoOscSup = true;
	this.sentidoOscInf = true;
	this.sentidoPos = true;
	
	
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
		this.guiControls = new function () {
			this.red_length = 5;
			this.blue_length = 10;
			this.blue_pos = 50;
			this.red_speed = 0;
			this.blue_speed = 0;
			// Un botón para dejarlo todo en su posición inicial
			// Cuando se pulse se ejecutará esta función.
			this.reset = function () {
				this.red_length = 5;
				this.blue_length = 10;
				this.blue_pos = 50;
				this.red_speed = 0;
				this.blue_speed = 0;
				this.model.rotation.y = 0;
				this.container.rotation.y = 0;
			}
		} 
		
		// Se crea una sección para los controles de la caja
		var folder = gui.addFolder ('Controles globales');
		folder.add (this.guiControls, 'red_length', 5, 10, 0.1).name ('Longitud roja: ').listen();
		folder.add (this.guiControls, 'blue_length', 10, 20, 0.1).name ('Longitud azul: ').listen();
		folder.add (this.guiControls, 'blue_pos', 10, 90, 1).name ('Posicion azul (%): ').listen();
		folder.add (this.guiControls, 'red_speed', 0, 0.1, 0.001).name ('Velocidad roja: ').listen();
		folder.add (this.guiControls, 'blue_speed', 0, 0.1, 0.001).name ('Velocidad azul: ').listen();
				
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
		var MAX_LONGSUP = 10;
		var MIN_LONGSUP = 5;
		var MAX_LONGINF = 20;
		var MIN_LONGINF = 10;
		var MAX_OSCIL = Math.PI/4;
		var MIN_OSCIL = -(Math.PI/4);
		// POSINF no es una variable sino que es una función de la longitud actual
		
		
		var MAX_OSCIL = Math.PI/4;
		var MIN_OSCIL = -(Math.PI/4);
		// POSINF no es una variable sino que es una función de la longitud actual
		
		this.cameraControl.update();
		
		// Se actualiza el resto del modelo
		if(this.oscPendSup > MAX_OSCIL) this.sentidoOscSup = false;
		if(this.oscPendSup < MIN_OSCIL) this.sentidoOscSup = true;
		
		if(this.oscPendInf > MAX_OSCIL) this.sentidoOscInf = false;
		if(this.oscPendInf < MIN_OSCIL) this.sentidoOscInf = true;


			//Escalado del pendulo superior
				this.longPendSup = this.guiControls.red_length;
				var SCALE = (this.longPendSup)/MIN_LONGSUP;
				this.pendSup1.scale.set(1,SCALE,1);
				this.penduloCenterpoint.position.y = -(this.longPendSup-MIN_LONGSUP)/2; //movemos hacia abajo la mitad para que el centerpoint siga rozando el verde superior
				this.pendSup3.position.y = -this.centerpoint-(this.longPendSup-MIN_LONGSUP)/2;
				
			//Oscilación de los pendulos
			
				this.oscPendInf += (this.sentidoOscInf)?this.guiControls.blue_speed:(-this.guiControls.blue_speed);
				this.oscPendSup += (this.sentidoOscSup)?this.guiControls.red_speed:(-this.guiControls.red_speed);
				
				this.Pendulo.rotation.z = this.oscPendSup;
				this.pendInfContainer.rotation.z = this.oscPendInf;
				
			//Movimiento del pendulo inferior
			
				this.posPendInf = this.guiControls.blue_pos/100.0;
				this.penduloInferior.position.y = this.longPendSup*(this.posPendInf-0.5);
			
			//Escalado del pendulo inferior
				
				this.longPendInf = this.guiControls.blue_length;
				var SCALE2 = (this.longPendInf)/MIN_LONGINF;
				this.pendInf.scale.set(1,SCALE2,1);
				this.pendInf.position.y = -4-(this.longPendInf-MIN_LONGINF)/2

	}
}