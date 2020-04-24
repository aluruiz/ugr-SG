
class MyScene extends THREE.Scene {
  constructor (unRenderer) {
	super();		

	this.createLights ();
	this.createCamera (unRenderer);
	this.createGUI ();
	this.axis = new THREE.AxesHelper (5);
	this.add (this.axis);

	this.obj = new THREE.Mesh( new THREE.CylinderGeometry(0.4,0,1,16) , new THREE.MeshNormalMaterial());
	this.obj.geometry.applyMatrix( new THREE.Matrix4().makeRotationX(-Math.PI/2));
	this.add(this.obj);
	
	this.curve = new THREE.CatmullRomCurve3( [
		new THREE.Vector3( 0, 2, 0 ),
		new THREE.Vector3( 5, 1, -5 ),
		new THREE.Vector3( 10, 0 , 0 ),
		new THREE.Vector3( 5, -1, 5 ),
		new THREE.Vector3( 0, -2, 0 ),
		new THREE.Vector3( -5, -1, -5 ),
		new THREE.Vector3( -10, 0, 0 ),
		new THREE.Vector3( -5, 1, 5 )
	], true );
	
	var geo = new THREE.Geometry();
	geo.vertices = this.curve.getPoints(200);
	var mat = new THREE.LineBasicMaterial( { color : 0x000000 , linewidth : 30} );
	this.add(new THREE.Line(geo, mat));
	
	var origen = { p : 0 }
	var destino = { p : 0.5 }
	var destino2 = { p : 1 }
	
	var that = this;
	
	this.tween = new TWEEN.Tween ( origen )
		.to(destino, 4000)
		.easing( TWEEN.Easing.Quadratic.InOut)
		.onComplete( function() { this.p = 0; that.tween2.start(); } )
		.onUpdate( function() { that.actualizar(this.p); } );

	this.tween2 = new TWEEN.Tween ( destino )
		.to(destino2, 8000)
		.easing( TWEEN.Easing.Quadratic.InOut)
		.onComplete( function() { this.p = 0.5; that.tween.start(); } )
		.onUpdate( function() { that.actualizar(this.p); } );

//	this.tween.chain( this.tween2 );
//	this.tween2.chain( this.tween );
	this.tween.start()
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
			this.speed = false;
			var that = this;
			this.rollercoaster = function () {
				that.speed = true;
			}
		}
		var folder = gui.addFolder ('Controles globales');
		folder.add (this.guiControls, 'rollercoaster').name ('[ Rollercoaster ]');
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
		TWEEN.update();
	}
	
	actualizar ( p ) {
		var pos = this.curve.getPointAt(p);
		this.obj.position.copy(pos);
		if(this.guiControls.speed) {
			this.camera.position.copy(pos);
			this.camera.position.y += 0.4;
		}

		var tan = this.curve.getTangentAt(p);
		pos.add(tan);
		this.obj.lookAt(pos);
		if(this.guiControls.speed) {
			this.camera.lookAt(pos);
		}
	}
}