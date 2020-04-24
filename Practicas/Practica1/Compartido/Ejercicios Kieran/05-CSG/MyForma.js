 
class MyForma extends THREE.Shape {
constructor(type) {
	super();
	this.moveTo( 0, 0 );
		
	if(type == 1){
		var array = []
		array.push(new THREE.Vector2( 2, 2 ));
		array.push(new THREE.Vector2( 1, 3 ));
		array.push(new THREE.Vector2( 0, 2 ));
		array.push(new THREE.Vector2( -1, 3 ));
		array.push(new THREE.Vector2( -2, 2 ));
		array.push(new THREE.Vector2( 0, 0 ));
		this.splineThru(array);
	}
	else{
		this.lineTo( 0, 2 );
		this.lineTo( 2, 2 );
		this.lineTo( 2, 0 );
		this.lineTo( 0, 0 );
	}
}
}