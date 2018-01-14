var xhr = new XMLHttpRequest();
var url = 'https://api.coinmarketcap.com/v1/ticker/?limit=30';

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        new Ticker().init(response, true);
    }
};
xhr.open("GET", url, true);
xhr.send();
function Ticker() {

    this.init = function(response, thumbnail) {
        var div = document.getElementById('ticker');
        var ticker = document.createElement('ul')
        ticker.setAttribute('id', 'ticker_list')

        for (var i = 0; i < response.length; i++) {
            var coin = response[i];
            var li = document.createElement('li');
            var node = li.appendChild(document.createElement('div'));
            var ts = node.appendChild(document.createElement('span'))
            ts.innerHTML = coin.symbol;
            if (thumbnail) {
                var img = node.appendChild(document.createElement('img'))
                img.src = this.thumbnail(coin.id);
                img.alt = coin.name;
                img.width = '32'
            }


            var metdata = node.appendChild(document.createElement('div'))
            var percent_change_24h = document.createElement('span');
            percent_change_24h.setAttribute('id', 'percent_change_24h');
            var arrow = percent_change_24h.appendChild(document.createElement('i'));
            if (coin.percent_change_24h < 0) {
                arrow.setAttribute('class', 'fa fa-arrow-down')
                metdata.setAttribute('class', 'negative');
            } else {
                arrow.setAttribute('class', 'fa fa-arrow-up')
                metdata.setAttribute('class', 'positive');
            }
            percent_change_24h.innerHTML += ' ' + coin.percent_change_24h + '%';
            metdata.appendChild(percent_change_24h);
            var price_usd = document.createElement('span');
            price_usd.setAttribute('id', 'price_usd');
            var usd = coin.price_usd + '0';
            var tenths = usd.match(/\.\d\d/);
            usd = usd.replace(/\..*/, tenths);
            price_usd.innerHTML = '$ ' + usd;
            metdata.appendChild(price_usd);
            ticker.appendChild(li)
        }
        div.appendChild(ticker)
        $(function() {
            $('#ticker').marquee({
                duration: 5000,
                duplicated: true,
                pauseOnHover: true,
                delayBeforeStart: 0,
                gap: 50,
                duplicated: true
            });
        });
    }
    this.thumbnail = function(id) {
        return 'https://files.coinmarketcap.com/static/img/coins/32x32/' + id + '.png';
    }
}

