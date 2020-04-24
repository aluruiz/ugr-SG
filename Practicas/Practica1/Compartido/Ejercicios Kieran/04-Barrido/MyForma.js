 
class MyForma extends THREE.Shape {
constructor(type) {
	super();
	this.moveTo( 0, 0 );
		
	if(type == 1){
		var array = []
		array.push(new THREE.Vector2( 1, 1 ));
		array.push(new THREE.Vector2( 0.5, 1.5 ));
		array.push(new THREE.Vector2( 0, 1 ));
		array.push(new THREE.Vector2( -0.5, 1.5 ));
		array.push(new THREE.Vector2( -1, 1 ));
		array.push(new THREE.Vector2( 0, 0 ));
		this.splineThru(array);
	}
	else{
		this.lineTo( 0, 1 );
		this.lineTo( 1, 1 );
		this.lineTo( 1, 0 );
		this.lineTo( 0, 0 );
	}
}
}