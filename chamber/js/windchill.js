if (current == '/chamber/index.html') {
    function windChill(wind, temp) {
        let chill = 35.74 + (.6215 * temp) - (35.75 * (wind ** .16)) + (.4275 * temp * (wind ** .16));
        return chill.toFixed(0)
    }
    let temp = document.getElementById("temperature").innerHTML;
    let wind = document.getElementById("windMph").innerHTML;
    let chill = windChill(wind, temp);
    document.getElementById("windChill").innerHTML = chill
};