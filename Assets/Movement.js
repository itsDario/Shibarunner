#pragma strict

var speed: float;
var state: String;
var dashTime: float;
var onFloor: boolean;
var onWall: boolean;
var onRightwall: boolean;
var onLeftwall: boolean;
private var hDash: boolean;
private var dDash: boolean;
private var jumping: boolean;
private var wallTime: float;
var jumpTime: float = 0;
var maxJumpValue:float = 100;
var jumpPower: float;
var jumpSustain: float;
var direction: int;

var rightStart: Transform;
var rightEnd: Transform;

var leftStart: Transform;
var leftEnd: Transform;

function Start () {
	gravity(true);
}

function Update () {
rigidbody2D.velocity.x = speed * Time.deltaTime;
//Debug.Log(jumpTime);

movement();
keyBoardInput();
horizontalDashing();
downDashing();
isJumping();
wallCheck();
}

function movement(){

}

function horizontalDashing(){
	if(hDash){
		gravity(false);
		//set velocity		
		rigidbody2D.velocity.x = (speed * 2) * Time.deltaTime * direction;
		rigidbody2D.velocity.y = 0;
		//yield
		yield WaitForSeconds(dashTime);
		//turn gravity back on
		gravity(true);
		//dash = false
		hDash = false;
	}
}

function downDashing(){
	if(dDash){
		gravity(false);
		//set velocity		
		rigidbody2D.velocity.y = (-speed * 2) * Time.deltaTime;
		rigidbody2D.velocity.x = 0;
		//yield
		yield WaitForSeconds(dashTime);
		//turn gravity back on
		gravity(true);
		//dash = false
		dDash = false;
	}
}

function isJumping(){
	if (Input.GetKeyDown ("up") && onFloor) {
		rigidbody2D.AddForce(Vector2.up * jumpPower,ForceMode2D.Impulse);
	}  
     if (Input.GetKey ("up") && !onWall) {
//     Debug.Log("extraForce");
        if (jumpTime < maxJumpValue) {
          rigidbody2D.AddForce(Vector2.up * jumpSustain,ForceMode2D.Force);
          jumpTime += Time.deltaTime;
        }
	}
}

function wallCheck(){
	Debug.DrawLine(rightStart.position,rightEnd.position,Color.green);
	onRightwall = Physics2D.Linecast(rightStart.position,rightEnd.position);
	
	Debug.DrawLine(leftStart.position,leftEnd.position,Color.green);
	onLeftwall = Physics2D.Linecast(leftStart.position,leftEnd.position);
}

function wallHang(){
		onWall = true;
		gravity(false);
		rigidbody2D.velocity.y = 0;
		yield WaitForSeconds(2);
		gravity(true);
}

function keyBoardInput(){
	//down = slam
	if (Input.GetKeyDown ("down")){
		dDash = true;
	}
	//right = dash
	if (Input.GetKeyDown ("right")){
		hDash = true;
	}
}

function gravity(gravity : boolean){
	if(gravity){
		rigidbody2D.gravityScale = 1;
	}else{
		rigidbody2D.gravityScale = 0;
	}
}

function OnCollisionEnter2D (other : Collision2D) {
dDash = false;
	if(other.gameObject.tag == "floor"){
		jumpTime = 0;
		onFloor = true;
	}else if (other.gameObject.tag == "wall"){
		jumpTime = 0;
		wallTime = Time.deltaTime;
		wallHang();
	}
}

function OnCollisionExit2D () {
	onFloor = false;
	onWall = false;
}

