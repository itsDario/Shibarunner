#pragma strict

var swipeDirection: String;

var minSwipeDistY : float;

var minSwipeDistX : float;

var Swipe: GUIText;

private var startPos :Vector2; 

function Update () {

	if (Input.touchCount > 0) {

	var touch : Touch = Input.touches[0];

	switch (touch.phase){

		case TouchPhase.Began:
		startPos = touch.position;
		break;


			case TouchPhase.Ended:
			var swipeDistVertical : float;
			swipeDistVertical = (new Vector3(0, touch.position.y, 0) - new Vector3(0, startPos.y, 0)).magnitude;

				if (swipeDistVertical > minSwipeDistY) 
				{
					var swipeValue : float;
					swipeValue = Mathf.Sign(touch.position.y - startPos.y);

					if (swipeValue > 0)//up
					{	
						setDirection("up");
					}
					else if (swipeValue < 0)//down
					{	
						setDirection("down");
					}
				}
				var swipeDistHorizontal : float;

				swipeDistHorizontal = (new Vector3(touch.position.x,0, 0) - new Vector3(startPos.x, 0, 0)).magnitude;

				if (swipeDistHorizontal > minSwipeDistX) 
				{
					swipeValue = Mathf.Sign(touch.position.x - startPos.x);

					if (swipeValue > 0)//right
					{
						//MoveRight ();
						setDirection("right");
					}
					else if (swipeValue < 0)//left
					{	
						//MoveLeft ();
						setDirection("left");
					}
				}
				break;
			}
		}	
	}
	function setDirection(newDirection: String){
		swipeDirection = newDirection;
	}
	function getDirection(){
		return swipeDirection;
	}