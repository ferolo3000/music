// The video
let video;
let flipVideo;
// For displaying the label
let label = "waiting...";
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/rBkzY4zoB/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(540, 380);
  // Create the video
  video = createCapture(VIDEO);
  video.size(540, 380)
  video.hide();
  flipVideo = ml5.flipImage(video);
  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify the videeo!
function classifyVideo() {
  flipVideo = ml5.flipImage(video);
  classifier.classify(flipVideo, gotResults);

}

function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  classifyVideo();
}

function draw() {
  background(0);

  // Draw the video
  image(flipVideo, 0, 0);

  // STEP 4: Draw the label
  textSize(32)
  fill(255)
  text(label, width / 2, height - 16);

  // Pick an emoji, the "default" is train
  let emoji;
  if (label == "left") {
    var left = document.getElementById("myAudio");
    left.playbackRate = 0.7
    left.play();
  } else if (label == "right") {
    var right = document.getElementById("myAudio");
    right.playbackRate = 1.5;
    right.play();
  } else if (label == "nothing") {
    var nothing = document.getElementById("myAudio");
    nothing.playbackRate = 1;
    nothing.play();
  }
}
