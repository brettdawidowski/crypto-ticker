$(document).ready(function () {

      // Load Dependencies
      $.getScript("http://cdn.jsdelivr.net/jquery.marquee/1.3.1/jquery.marquee.min.js");
      $.getScript("https://rawgit.com/tobia/Pause/master/jquery.pause.js");

      var Ticker = (function () {
            /**
             * Create ticket from CoinMarketCaps Api
             * @param {Object} response json response from coinmarketcap api
             * 
             * @see https://coinmarketcap.com/api/documentation/v1/
             */
            function __Ticker(response) {
                  var crypto_ticker = document.getElementById('crypto-ticker');
                  crypto_ticker.classList.add('marquee3k');
      
                  var ticker = document.createElement('ul')
                  ticker.setAttribute('id', 'ticker_list')
      
                  for (var i = 0; i < response.length; i++) {
                        var coin = response[i];
      
                        // Create List Item for Coin Data
                        var li = document.createElement('li');
                        var node = li.appendChild(document.createElement('div'));
                        var ts = node.appendChild(document.createElement('span'))
      
                        // Add Ticket Symbol to <span>
                        ts.innerHTML = coin.symbol;
      
                        // Create <img> tag inside the ticker <div>
                        var img = node.appendChild(document.createElement('img'))
      
                        // Adding an event listener to remove any images that do not render
                        img.addEventListener('error', function () {
                              this.parentNode.removeChild(this);
                        });
      
                        // Call private function to get the url of the image of coin
                        img.src = this.__getThumbnail(coin.id);
                        img.alt = coin.name;
                        img.width = '32' // 32x32px
                        
                        // Create Data Element
                        var metadata = node.appendChild(document.createElement('div'))
      
                        // Create 24h Perecnt Change Element 
                        var percent_change_24h = document.createElement('span');
                        percent_change_24h.setAttribute('id', 'percent_change_24h');
      
                        var arrow = percent_change_24h.appendChild(document.createElement('i'));
                        // Arrow Down and Red Color of negative percent change 24h
                        if (coin.percent_change_24h < 0) {
                              arrow.setAttribute('class', 'fa fa-arrow-down')
                              metadata.setAttribute('class', 'negative');
                        
                        // Arrow Up and Green Color of negative percent change 24h
                        } else {
                              arrow.setAttribute('class', 'fa fa-arrow-up')
                              metadata.setAttribute('class', 'positive');
                        }
                        percent_change_24h.innerHTML += ' ' + coin.percent_change_24h + '%';
                        metadata.appendChild(percent_change_24h);
      
                        // Create Current Price USD Element
                        var price_usd = document.createElement('span');
                        price_usd.setAttribute('id', 'price_usd');
                        var usd = coin.price_usd + '0';
                        var tenths = usd.match(/\.\d\d/);
                        usd = usd.replace(/\..*/, tenths);
                        price_usd.innerHTML = '$ ' + usd;
                        metadata.appendChild(price_usd);
                        ticker.appendChild(li)
                  }
                  crypto_ticker.appendChild(ticker)
      
                  /**
                   * Initializing the Marquee Motion
                   * @see https://github.com/aamirafridi/jQuery.Marquee
                   */
                  $(function () {
                        $('#crypto-ticker').marquee({
                              duration: 15000,
                              duplicated: true,
                              pauseOnHover: true,
                              delayBeforeStart: -100,
                              gap: 0,
                              duplicated: true
                        });
                  });
            }
            /**
             * Using Image Hosted by 
             * @see https://cryptoindex.co/
             */
            __Ticker.prototype.__getThumbnail = function (id) {
                  return 'https://cryptoindex.co/coinlogo/' + id + '.png';
                  
            }
            return __Ticker;
      })();









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
});
