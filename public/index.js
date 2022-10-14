   
function displayTime()
{
    time = new Date();
    document.getElementById('time').innerHTML = time;
}
let interval = setInterval(displayTime, 1000);

