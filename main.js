Status="";
input_text="";
object=[];
function setup () {
    canvas=createCanvas(400,380);
    canvas.center();
    canvas.position(680,250);
    video=createCapture(VIDEO);
    video.size(400,380);
    video.hide();
}
function start(){
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
    input_text=document.getElementById("input_id").value;

}
function modelLoaded(){
    console.log("model_loaded");
    Status=true;
}
function draw(){
    image(video,0,0,400,380);
    if(status !=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Detected ";
            document.getElementById("objects_found").innerHTML="Number of objects detected are:"+object.length;

            fill("red");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            

        }
    }


}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;

}
function start(){
    objectDetector= ml5.objectDetector('cocossd',modelLoad);
    document.getElementById("status").innerHTML="Status:Detecting Objects";

}
function modelLoad(){
    console.log("Model LOaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
