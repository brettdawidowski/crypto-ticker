var xhr = new XMLHttpRequest();
var url = 'https://api.coinmarketcap.com/v1/ticker/?limit=30';

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        new Ticker(response, true);
    }
};
xhr.open("GET", url, true);
xhr.send();

