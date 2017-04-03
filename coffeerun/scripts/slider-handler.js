function slider(val) {
    document.getElementById('range').innerHTML = val;
    if (val < 33) {
        document.getElementById('range').style.color = "green";
    } else if (val > 66) {
        document.getElementById('range').style.color = "red";
    } else {
        document.getElementById('range').style.color = "#cccc68";
    }

}
