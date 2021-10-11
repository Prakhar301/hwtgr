var prediction1="";
var prediction2="";
Webcam.set({
    width:250,
    height:200,
    image_format:'png',
    png_quality:5
});
camera=document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="pic" src="'+data_uri+'">'
    });
}
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/cdLKMQ66v/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!");
}
function speak(){
    var synth=window.speechSynthesis;
    var speakData1="The first prediction is       "+prediction1;
    var speakData2="The second prediction is      "+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(utterThis);
}
function identify_image(){
    var img=document.getElementById("pic");
    classifier.classify(img,gotResult);   
}
function gotResult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML=result[0].label;
        document.getElementById("result_emotion_name2").innerHTML=result[1].label;
        prediction1=result[0].label;
        prediction2=result[1].label;
        speak();
        if(prediction1=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;";
        }
        else if(prediction1=="Sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        else if(prediction1=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#128548;";
        }
        if(prediction2=="Happy"){
            document.getElementById("update_emoji_2").innerHTML="&#128522;";
        }
        else if(prediction2=="Sad"){
            document.getElementById("update_emoji_2").innerHTML="&#128532;";
        }
        else if(prediction2=="Angry"){
            document.getElementById("update_emoji_2").innerHTML="&#128548;";
        }
    }
}   