# ServoAnimator

The Servo Animator includes a script to use inside a unity project,
also there is a folder with the files for the arduino code.

A compiled version of the unity scene will also be available!

To use the Animator Script, simply attach to any gameobject and configure!

UNITY ANIMATOR FEATURES:
- Animate up to 8 servos
- Set min and max values.
- variable animation length.
- variable framerate.
- saving and deleting frames.
- Filling empty frames with last known servo values.
- Support to display the animation, or servo values to a 3d model.(buggy)
- multiple controls for animation
- Set an img of a waveform for sound reference.
- exporting the animation to a file.

UNITY ANIMATOR TODO:
- make amount of servos variable (nearly done).
- instead of just filling frames with last known info, tween the frames!
- Fix 3d model rotation issues.
- make it able to open a soundfile in runtime, and show the waveform.
- Add serial connection to view servo values live on arduino.

ARDUINO CODE FEATURES:
- Basic functionality, reads the file test.txt from sd card, decodes the lines, and gives each servo the value needed.

ARDUINO CODE TODO:
- Select any available file automatically, with more files, play them randomly.
- mp3 selector using this audio board making sure audio and animation file names have a same numerical value: https://www.banggood.com/Voice-Playback-Module-Board-MP3-Reminder-For-Arduino-p-1007593.html?rmmds=search&cur_warehouse=CN
- Variable servo amounts
