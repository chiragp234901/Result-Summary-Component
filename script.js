
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
        // Typical action to be performed when the document is ready:
        //document.getElementById("demo").innerHTML = xhttp.responseText;
        var response;
        try {
            response = JSON.parse(xhttp.responseText); // Attempt to parse JSON safely
        } catch (error) {
            console.error('Failed to parse JSON:', error);
            response = null; // Fallback value or handle error accordingly
        }
        //console.log(response);
        
        let output = '';
        let averageTotal = 0;
        if (Array.isArray(response)) { // Check if response is an array
            for (let i = 0; i < response.length; i++){
                output += '<li class="scoreBox">';
                output += '<ul id = "scoreBox' + i + '">'; 
                output += '<li id="icon'+ i +'">'+'<img src ='+response[i].icon+' alt="iconImage">'+'</li>';
                output += '<li id="category'+ i +'">'+ response[i].category + '</li>';
                output += '<li id="score'+ i +'">'+ response[i].score + '<span class="outOf100"> / 100 </span>' + '</li>';
                output += '</ul>';
                output += '</li>';
                averageTotal += response[i].score;
                }
            } else {
                console.error('Expected response to be an array but got:', response);
                // Optionally, show a user-friendly message or fallback UI here
            }
            document.getElementById('score').innerHTML = output;

            let displayAverage = Math.trunc(averageTotal / response.length);
            document.getElementById('average').innerHTML = displayAverage;

            let display65Message = '';
            let display50Message = '';
            let displayGreatMessage = '';
            let displayWellDoneMessage = '';

            displayGreatMessage += '<p class ="greatMessage"> Great </p>'
            display65Message += '<p class ="65Message"> You scored higher than 65% of the people who have taken these tests.</p>'

            displayWellDoneMessage += '<p class ="wellDoneMessage"> Well Done </p>'
            display50Message += '<p class ="65Message"> You scored higher than 50% of the people who have taken these tests.</p>'

            if( displayAverage > 70){
                document.getElementById('congrats').innerHTML = displayGreatMessage;
                document.getElementById('message').innerHTML = display65Message;
            }
            else
            {
                document.getElementById('congrats').innerHTML = displayWellDoneMessage;
                document.getElementById('message').innerHTML = display50Message;
            }
        }
    };
    xhttp.open("GET", "data.json", true);
    xhttp.send();