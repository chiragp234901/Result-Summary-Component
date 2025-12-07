
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
            const scoreElement = document.getElementById('score'); // Get the element once

            if (scoreElement) { // Check if it exists before updating
                scoreElement.innerHTML = output; // Safe to update now
            } else {
                console.warn('Element with ID "score" not found.'); // Optional: helpful debug info
            }

            // Check if response is an array and has elements to avoid errors and division by zero
            var displayAverage;
            if (Array.isArray(response) && response.length > 0) {
                displayAverage = Math.trunc(averageTotal / response.length);
                document.getElementById('average').innerHTML = displayAverage;
            } else {
                // Handle invalid or empty response gracefully
                document.getElementById('average').innerHTML = 'No data available';
            }

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