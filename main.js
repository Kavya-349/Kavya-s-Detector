var img  = "";
var status = "";
var objects = [];

function setup() {
    canvas = createCanvas(298,300);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(298,300);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd", modalLoaded);
    document.getElementById("status").innerHTML = "Status : Object Detecting";
}

function modalLoaded() {
    console.log("modal loaded");
    status = true;
}

function gotResults(error, results) {
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video,0,0,298,300);
    
    if(status != "") {
        objectDetector.detect(video, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);

        for(var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no_of_objects").innerHTML = "No. of Objects Detected : " + objects.length;

            fill(r,g,b);
            noFill();
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 15);
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}