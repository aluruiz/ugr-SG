class MyTubo extends THREE.Object3D {
	constructor () {
		super();
		
		this.antiguaRazon;
		this.antiguaRadius;
		this.razon = 1;
		this.radius = 1;
		this.altura = 4;
		this.mov_rot = false;
		this.mov_sin = false;
		this.mov_hel = false;
		this.hel_sentido = true; //Si sube con movimiento helicoidal
		
		var geometry = new THREE.CylinderGeometry(this.radius,this.radius,this.altura,16);
		var material = new THREE.MeshNormalMaterial({opacity: 0.35,transparent: true});
		var geometry_S = new THREE.SphereGeometry(0.25,16,16);
		var material_S = new THREE.MeshPhongMaterial({color:0xff0000});
		
		this.cilindro = new THREE.Mesh(geometry, material);
		this.sphere = new THREE.Mesh(geometry_S, material_S);
		this.rotation_object = new THREE.Object3D();
		this.rotation_path = new THREE.EllipseCurve (
			0, 0, this.radius, this.radius*this.razon
		);
			
		var rotacion_geo = new THREE.Geometry();
		rotacion_geo.vertices = this.rotation_path.getPoints(50);
		this.add(new THREE.Line(rotacion_geo, new THREE.LineBasicMaterial()));
		
		this.rotation_object.add(this.sphere);
		this.rotation_object.translateX(this.radius);

		this.add(this.cilindro);
		this.add(this.rotation_object);
		
		this.createGUI()
	}
	createGUI () {
		var that = this;
		this.guiControls = new function () {
			 
			// Un botón para dejarlo todo en su posición inicial
			// Cuando se pulse se ejecutará esta función.
			this.reset = function () {
				that.razon = 1;
				that.radius = 1;
				that.mov_rot = false;
				that.mov_sin = false;
				that.mov_hel = false;
				that.rotation_object.position.set(that.radius, 0, 0)
				that.sphere.position.set(0, 0, 0);
			}
		} 
		
		// Se crea una sección para los controles de la caja
		var folder = gui.addFolder ('Controles del movimiento');
		folder.add (this, 'razon', 0.5,1,0.1).name ('Razon: ');
		folder.add (this, 'radius', 0.5,4,0.1).name ('Radio: ');
		folder.add (this, 'mov_rot').name ('Rotación').listen();
		folder.add (this, 'mov_sin').name ('Mov Sinusoidal').listen();
		folder.add (this, 'mov_hel').name ('Mov Helicoidal').listen();
		folder.add (this.guiControls, 'reset').name ('[ Reset ]');
	}
	
	update () {
		//console.log(this.rotation_object.position);
		if(this.razon != this.antiguaRazon || this.radius != this.antiguaRadius) {
			this.antiguaRazon = this.razon;
			this.antiguaRadius = this.radius
			this.rotation_path = new THREE.EllipseCurve(
				0, 0, this.radius*this.razon, this.radius
			);
			this.cilindro.scale.set(this.razon*this.radius,1,this.radius);
		}
				
		this.time = Date.now();
		
		if(this.last_time == null)
			this.last_time = this.time;
		
		var msegundos_transcurridos = (this.time-this.last_time);
		var msegundos_por_giro = 4000.0;
		var t = (this.time % msegundos_por_giro) / msegundos_por_giro;
		
		if(this.mov_rot) {
			var pos2d = this.rotation_path.getPointAt(t);
			var pos = new THREE.Vector3(pos2d.x, 0, pos2d.y);
			//var tan = this.rotation_path.getTangentAt(t);
			this.rotation_object.position.copy(pos);
			//pos.add(tan);
			this.rotation_object.lookAt(pos);
		}
		
		if(this.mov_sin) {
			this.sphere.position.y = Math.sin(4*2*Math.PI*t)*(this.altura/2);
		}
		else if(this.mov_hel) {
			if(this.sphere.position.y > this.altura/2)
				this.hel_sentido = false;
			else if(this.sphere.position.y < -this.altura/2)
				this.hel_sentido = true;
			this.sphere.position.y += (this.hel_sentido) ? 0.001 * msegundos_transcurridos : -0.001 * msegundos_transcurridos;
		}
		else {
			this.sphere.position.y = 0;
		}
				
		this.last_time = this.time;
	}
}