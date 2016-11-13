const myAjax = (callback, source, type="GET") => {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
            callback(xmlhttp);
        }
    };

    xmlhttp.open(type, source, true);
    xmlhttp.send();
}

module.exports = myAjax;
