//"use strict";
const nav_view = document.getElementsByClassName("navbar navbar-dark")[0];
const nav_view2 = document.getElementsByClassName("shadow p-3 mb-5 rounded")[0];
const title_head = document.getElementById('title_head');
const description = document.getElementById('description');
const record_view = document.getElementById('record_view');
const result_view = document.getElementById('result_view');

const start_recording = document.getElementById('start_recording');
const stop_recording = document.getElementById('stop_recording');
const next = document.getElementById('next');
const re_recording = document.getElementById('re_recording');
const progressbar1 = document.getElementById('progressbar1');

var undertimerflag = true;
var deviceConnection= false;
var start_time;


// initialize view
description.style.display = "inline";
record_view.style.display = "none";
result_view.style.display = "none";

// start recording button click event
start_recording.addEventListener("click", function(){
	if(deviceConnection == true){
		nav_view.style.display = "none";
		nav_view2.style.display = "none";
		title_head.style.display = "none";
		description.style.display = "none";
		record_view.style.display = "inline";
		result_view.style.display = "none";
	}
});

// stop recording button click event
stop_recording.addEventListener("click", function(){
	if(undertimerflag==false){
		nav_view.style.display = "inline";
		nav_view2.style.display = "inline";
		title_head.style.display = "inline";
		description.style.display = "none";
		record_view.style.display = "none";
		result_view.style.display = "inline";
	}
});

// record again button click event
re_recording.addEventListener("click", function(){
	nav_view.style.display = "none";
	nav_view2.style.display = "none";
	title_head.style.display = "none";
	description.style.display = "none";
	record_view.style.display = "inline";
	result_view.style.display = "none";
	recordedAudio.pause();
	recordedAudio.currentTime = 0;
});

// next button click event
next.addEventListener("click", function(){
	location.href = "RT.html";	
});


// get access to voice device
navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {handlerFunction(stream);
      	deviceConnection=true;})
      .catch(e => { alert('getUserMedia() failed: ' + e); });//make it comment when use 'use strict'


function handlerFunction(stream) {
	rec = new MediaRecorder(stream);
    rec.ondataavailable = e => {
    	audioChunks.push(e.data);
    	if (rec.state == "inactive"){
            let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});
            recordedAudio.src = URL.createObjectURL(blob);
            recordedAudio.controls=true;
            recordedAudio.autoplay=false;
            //sendData(blob)

			//uploading 
			var filename =new Date().getTime()
			
		  	var xhr=new XMLHttpRequest();
		  	var fd=new FormData();
		  	fd.append("file",blob, filename+".wav");
		  	xhr.open("POST","upload.php",true);
		 	xhr.send(fd);
        }
    }
}


function timeunder_warining_msg(){
	//under 1 minitue
	if(undertimerflag == true){
    	undertimerflag= false;
	}
}

function sendData(data) {
	//get username? - to specifiy the tester
	//get test time
	var filename = 'acetest.mp3';
	//make file name
	downloadLink.href = URL.createObjectURL(data);
    downloadLink.download = filename;
}

start_recording.onclick = e => {
	if(deviceConnection == true){
		console.log('start recording');
		//record start time
		start_time = new Date();
		
		// initialize audio binary buffer
		audioChunks = [];
	    rec.start();
	    
	    //set timer
	    undertimerflag= true;    
	    setTimeout(timeunder_warining_msg, 60000); //60 seconds -minimum
	    createProgressbar('progressbar1', '120s');
	}else{
		alert("User must allow device connection");
		//get permision
		navigator.mediaDevices.getUserMedia({audio:true})
		      .then(stream => {handlerFunction(stream);
		      	deviceConnection=true;})
		      .catch(e => { alert('getUserMedia() failed: ' + e); });
	}
}

re_recording.onclick = e => {
	console.log('re recording');
	//record start time
	start_time = new Date();
	
	// initialize audio binary buffer
	audioChunks = [];
    rec.start();

    //set timer
    undertimerflag= true;
    setTimeout(timeunder_warining_msg, 60000); //60 seconds -minimum
    createProgressbar('progressbar1', '120s');
}

stop_recording.onclick = e => {
	if(undertimerflag==true){
		alert("you are encouraged to speak for 1 minute");
	}else{
		console.log("stop_recording");
    	//stop record
    	rec.stop();
    	
    	//save recording file
    	// [please insert 'saving record file code' here]
	/*
    	//save json file (time record)
    	var timelog = {start: start_time, stop : new Date() };
    	JsonFilename = "timelog.json";
    	saveData(timelog, JsonFilename);
	*/
	}
}

function createProgressbar(id, duration, callback) {
  // We select the div that we want to turn into a progressbar
  var progressbar = document.getElementById(id);
  progressbar.className = 'progressbar';

  // We create the div that changes width to show progress
  var progressbarinner = document.createElement('div');
  progressbarinner.className = 'inner';

  // Now we set the animation parameters
  progressbarinner.style.animationDuration = duration;

  // Eventually couple a callback
  if (typeof(callback) === 'function') {
    progressbarinner.addEventListener('animationend', callback);
  }

  // Append the progressbar to the main progressbardiv
  progressbar.appendChild(progressbarinner);

  // When everything is set up we start the animation
  progressbarinner.style.animationPlayState = 'running';
}

function progressbar_start() {
  createProgressbar('progressbar1', '120s');//progressbar time set here
}

//save data in json format function
var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());