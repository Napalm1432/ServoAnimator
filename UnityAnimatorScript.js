#pragma strict
import System;
import System.IO;
//FILE SAVING
var fileName = "Animation";
var fileExtension = ".R3D";
var realFileName : String;
var strArr : String[];
var strArr2 : String[];

//FRAMES AND AXES
var FrameString : String = "0";
var showServos = true;
var AxesNr = 6;
var Axes:Transform[];
var AxesMin : String[];
var AxesMax : String[];
var ModelOffsets : float[];
var AxesVal : float[];
var AxesNrS : String = "6";
var savedFrames : String[];
var currentValues : String[];
var frameR : String = "30";
var frameRate= 30;
var ThisFrame;
var AnimLength : String = "length in seconds";
var AnimLengthS : float = 0.0;
var animationTime = 5; //in seconds
var setframes : int = 0;
var currentFrame : float = 0.0;

//GUI
var waveform : Texture2D;

//CONTROLS
var pause = false;
var stop = true;
var PlayModel = false;
var ServoModel = true;
var camPivot:Transform;
var camSlider : float = 0.0;

//MISC
var firstStart = true;

function Start (){
	//prefill arrays to avoid errors
	if(AxesMin.length == 0)
	{
		AxesMin = new String[AxesNr];
		AxesMax = new String[AxesNr];
		for(var i = 0; i < AxesNr; i++)
		{
			AxesMin[i] = "0";
			AxesMax[i] = "180";
		}
	}
	//also to avoid errors
	if(AxesVal.length == 0){AxesVal = new float[AxesNr];}


}

function Update () {
	//Fix the final filename for writing. (Why am i doing this every frame?)
	realFileName = fileName + fileExtension;
	//Switch between showing the current servo values on the 3d model, to showing frame values on the model.
	if(PlayModel)
	{
		ShowPlayOnModel();
		ServoModel = false;
	}
	if(ServoModel)
	{
		ShowServoOnModel();
		PlayModel = false;
	}
}
//Populate the empty frames, if it finds an empty frame fill it with the values of the frame before that. HARSH METHOD :S
function populateEmptyFrames()
{
	for(var i = 0; i < savedFrames.length; i++)
	{
		if(savedFrames[i] == null)
		{
			savedFrames[i] = savedFrames[i-1];
		}
	}
}
//Write the values from the animation frames to a file. nothing to explain here
function saveFramesToFile()
{
	if (File.Exists(realFileName))
	{
			Debug.Log(realFileName+" already exists.");
			return;
	}
	var sr = File.CreateText(realFileName);
	for(var i = 0; i < savedFrames.length; i++)
	{
		sr.WriteLine (savedFrames[i] + "f");
	}
	sr.Close();
}
//use the current frame values and show them on the model
function ShowPlayOnModel ()
{
	//split up the string of the frame into seperate values
	var useStr : String;
	useStr = savedFrames[currentFrame];
	strArr = useStr.Split(", "[0]);
	//Go trough the values and set them to the correct model
	for(var i = 1; i < strArr.length; i++)
	{
		var parseThis = strArr[i];
		var thisF : float;
		thisF = parseFloat(parseThis);
		Axes[i-1].localRotation.z = (thisF + ModelOffsets[i-1]) * Mathf.Deg2Rad;
		//Debug.Log((thisF + ModelOffsets[i-1]) * Mathf.Deg2Rad);
	}
}
//Use the current servo values and show them on the model. Simple stuff, still doesn't work correctly....
function ShowServoOnModel ()
{
	strArr2 = FrameString.Split(", "[0]);
	for(var i = 1; i < strArr2.length; i++)
	{
		var tempx = Axes[i-1].rotation.x;
		var tempy = Axes[i-1].rotation.y;
		var parseThis = strArr2[i];
		var thisF : float;
		thisF = parseFloat(parseThis);
		Axes[i-1].localRotation.z = (thisF + ModelOffsets[i-1]) * Mathf.Deg2Rad;
		//Debug.Log((thisF + ModelOffsets[i-1]) * Mathf.Deg2Rad);
	}
}
//when play button is pressed, loop trough the frames, does nothing more than that, ShowPlayOnModel(); just reads what is being played
function play()
{
	while(!pause && !stop)
	{
		//go trough all the frames
		for(var i =currentFrame;i < setframes;i++)
		{
			if(!pause && !stop)
			{
				currentFrame = i;
				yield WaitForSeconds(0.03);
			}
		}
	}
}
//not sure what i'm doing here? stop function already works....
function stopPlay()
{
	//go back to first frame
}
function OnGUI()
{
	//Toggle servo sliders
	if (GUI.Button(Rect(Screen.width-225, 10, 100, 20),"EDIT FRAMES"))
	{
      showServos = true;
			PlayModel = false;
			ServoModel = true;
	}
	if (GUI.Button(Rect(Screen.width-125, 10, 100, 20),"PLAY FRAMES"))
	{
      showServos = false;
			PlayModel = true;
			ServoModel = false;
	}
	//Servo position sliders
	if(showServos)
	{
		for(var i=0; i< AxesNr;i++)
		{
			AxesMin[i] = GUI.TextField (Rect (Screen.width-225, 55 + (i*60), 40, 20), AxesMin[i], 25);
			//i might be overdoing this:
			var tempMin = parseFloat(AxesMin[i]);
			tempMin = Mathf.FloorToInt(tempMin);

			AxesMax[i] = GUI.TextField (Rect (Screen.width-65, 55 + (i*60), 40, 20), AxesMax[i], 25);
			//again probably overdoing this
			var tempMax = parseFloat(AxesMax[i]);
			tempMax = Mathf.FloorToInt(tempMax);

			AxesVal[i] = GUI.HorizontalSlider (Rect (Screen.width-225, 40 + (i*60), 200, 20), AxesVal[i], tempMin, tempMax);
			//someone please teach me to code properly xD:
			var valInt = Mathf.FloorToInt(AxesVal[i]);
			var tempVal = valInt.ToString();

			GUI.Label (Rect (Screen.width-130, 50 + (i*60), 40, 20), tempVal);
		}
	}
	else{}

	//Frame Controller / animation time
	setframes = animationTime * frameRate;

	//Frames Slider
	currentFrame = GUI.HorizontalSlider (Rect (25, Screen.height-60, Screen.width-50, 30), currentFrame, 0.0, setframes-1);
	currentFrame = Mathf.FloorToInt(currentFrame);

	//Framerate
	GUI.Label (Rect (25, Screen.height-100, 150, 20), "Animation Framerate ");
	frameR = GUI.TextField (Rect (150, Screen.height-100, 50, 20), frameR, 25);
	frameRate = parseFloat(frameR);
	GUI.Label (Rect (225, Screen.height-100, 500, 20), "Warning, changing framerate or record length clears the saved frames!");

	//Time in sec for animation
	GUI.Label (Rect (25, Screen.height-80, 200, 20), "Length of Animation in seconds: ");
	AnimLength = GUI.TextField (Rect (225, Screen.height-80, 50, 20), AnimLength, 25);
	var animLengthF : float = parseFloat(AnimLength);
	AnimLengthS = animLengthF;
	animationTime = AnimLengthS;


	//current frame
	ThisFrame = currentFrame.ToString();
	GUI.Label (Rect (300, Screen.height-80, 200, 20), "Current Frame: ");
	ThisFrame = GUI.TextField (Rect (400, Screen.height-80, 50, 20), ThisFrame, 25);

	//Total amount of frames
	GUI.Label (Rect (500, Screen.height-80, 200, 20), "Total Frames: ");
	var TotalFrames = setframes.ToString();
  TotalFrames = GUI.TextField (Rect (600, Screen.height-80, 50, 20), TotalFrames, 25);
	if(savedFrames.length != setframes)
	{
		savedFrames = new String[setframes];
	}

	//Waveform image
	GUI.Label (Rect (25, Screen.height-40, Screen.width-50, 600), waveform);

	//save frame
	//Collect current data in one string for easy saving
	for(var j = 0; j < AxesNr;j++)
	{
		if(j == 0)
		{
			FrameString = "0";
		}
		var axesValInt = Mathf.FloorToInt(AxesVal[j]);
		currentValues[j] = axesValInt.ToString();
		FrameString = FrameString + ", " + currentValues[j];
	}
	GUI.Label (Rect (Screen.width-300, Screen.height-120, 150, 20), "current servo values:");
	GUI.Label (Rect (Screen.width-150, Screen.height-120, 150, 20), FrameString);
	GUI.Label (Rect (Screen.width-300, Screen.height-100, 150, 20), "current frame values:");
	if(savedFrames[currentFrame] != null){GUI.Label (Rect (Screen.width-150, Screen.height-100, 150, 20), savedFrames[currentFrame]);}
	if (GUI.Button(Rect(Screen.width-300, Screen.height-80, 100, 20),"Save Frame"))
	{
		savedFrames[currentFrame] = FrameString;
	}
	if (GUI.Button(Rect(Screen.width-175, Screen.height-80, 150, 20),"Delete Frame"))
	{
		savedFrames[currentFrame] = null;
	}
	//play || pause || stop || tostart || toend ~buttons
	if (GUI.Button(Rect(25, 25, 50, 20),"Start"))
	{
		currentFrame = 0;
	}
	if (GUI.Button(Rect(75, 25, 50, 20),"Play"))
	{
		pause = false;
		stop = false;
		play();
	}
	if (GUI.Button(Rect(125, 25, 50, 20),"Pause"))
	{
		pause = true;
	}
	if (GUI.Button(Rect(175, 25, 50, 20),"Stop"))
	{
		stop = true;
		currentFrame = 0;
	}
	if (GUI.Button(Rect(225, 25, 50, 20),"End"))
	{
		currentFrame = setframes-1;
	}
	if (GUI.Button(Rect(150, 50, 125, 20),"Next Frame") && currentFrame < setframes-1)
	{
		currentFrame += 1;
	}
	if (GUI.Button(Rect(25, 50, 125, 20),"Prev Frame") && currentFrame > 0)
	{
		currentFrame -= 1;
	}


	//populating empty keyframes, filename, plus save button!
	if (GUI.Button(Rect(25, 125, 200, 20),"Populate Empty Frames"))
	{
		populateEmptyFrames();
	}
	fileName = GUI.TextField (Rect (95, 150, 130, 20), fileName, 25);
	GUI.Label (Rect (25, 150, 70, 20), "File name:");
	GUI.Label (Rect (230, 150, 70, 20), fileExtension);
	if (GUI.Button(Rect(25, 175, 200, 20),"Save to File!"))
	{
		saveFramesToFile();
	}
	GUI.Label (Rect (25, 225, 200, 20), "Rotate around Model:");
	camSlider = GUI.HorizontalSlider (Rect (25, 250, 200, 20), camSlider, -55, 55);
	var radCam = camSlider * Mathf.Deg2Rad;
	camPivot.rotation.y = radCam;

	var windowRect : Rect = Rect (300, 100, 500, 500);
	if(firstStart)
	{
	windowRect = GUI.Window (0, windowRect, DoMyWindow, "Welcome!");
	}



}
function DoMyWindow (windowID : int) {
		if (GUI.Button (Rect (20,20,100,20), "Close Window"))
			firstStart = false;

		GUI.Label (Rect (20, 50, 500, 20), "Please read this first start guide!");
		GUI.Label (Rect (20, 70, 500, 20), "Before you start animating, you need to set the animation length in seconds.");
		GUI.Label (Rect (20, 90, 500, 20), "After setting the length, set the frames per second(fps), standard is 30!");

		GUI.Label (Rect (20, 130, 500, 20), "Use the slider below to search trough frames.");

		GUI.Label (Rect (20, 170, 500, 20), "After setting frames, set your min and max values for the servos.");

		GUI.Label (Rect (20, 200, 500, 20), "You are now ready to start animating!, Select the desired frame");
		GUI.Label (Rect (20, 220, 500, 20), "to animate. Set the servos to the desired value, and save the frame!");
		GUI.Label (Rect (20, 240, 500, 20), "To play back the animation, press play in the upper left corner!");
		GUI.Label (Rect (20, 260, 500, 20), "Once you are done animating, you can save it to a file, before saving");
		GUI.Label (Rect (20, 280, 500, 20), "make sure you press Populate empty frames, this makes sure no frames");
		GUI.Label (Rect (20, 300, 500, 20), "are skipped when writing to a file. After this, enter a filename");
		GUI.Label (Rect (20, 320, 500, 20), "and press Save to file!");
			//do some labels for information on what things to set.
			//setting animation length, fps.
			//setting servos min and max values
			//saving files, warn about populating empty frames

			GUI.DragWindow (Rect (0,0,10000,10000));

	}
