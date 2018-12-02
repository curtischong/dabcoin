$(document).ready(function () {
    var maxAX = 0;
    var maxAY = 0;
    var maxAZ = 0;
    var count1 = 0;
    var count2 = 0;


    var acc = [];
    var vel = [];
    const numCases = 21; // the cases = 20
    const timeInterval = 3;


    //if (window.DeviceOrientationEvent) {

    var sendData = function () {

        var finalArr = [acc, vel];
        acc.shift();
        vel.shift();
        $.ajax({
            type: "POST",
            url: "http://167.99.177.36:5000/send_dabs", // FIND SOME BETTER URL
            data: {
                'data': JSON.stringify(finalArr),
            }
        });
    }


    window.addEventListener('devicemotion', function (event) {
        count1++;
        if (count1 % timeInterval == 0) {
            maxAX = parseFloat(event.acceleration.x.toFixed(2));
            maxAY = parseFloat(event.acceleration.y.toFixed(2));
            maxAZ = parseFloat(event.acceleration.z.toFixed(2));
            $("#words").html(maxAX + " " + maxAY + " " + maxAZ + " " + count1);
        }
    });
    //  }
    //  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function (event) {
        count2++;
        if (count2 % timeInterval == 0) {
            // alpha: rotation around z-axis
            var rotateDegrees = event.alpha.toFixed(2); + " " + count1
            // gamma: left to right
            var leftToRight = event.gamma.toFixed(2);
            // beta: front back motion
            var frontToBack = event.beta.toFixed(2);
            $("#words2").html(rotateDegrees + " " + leftToRight + " " + frontToBack);
            vel.push([rotateDegrees, leftToRight, frontToBack]);
            acc.push([maxAX, maxAY, maxAZ]);
            if (vel.length >= numCases ) {
                sendData();
            }
        }
    });
});
