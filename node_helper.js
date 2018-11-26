
/* Magic Mirror
 * Module: MMM-Video
 *
 * By Cowboysdude
 *
 */
const NodeHelper = require('node_helper');
var request = require("request");

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting Score module");
    },

    getVideo: function (url) {
         var self = this;
          var url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId="+this.config.list+"&key="+config.apiKey;
         request({ url: url, method: 'GET' }, function (error, response, body) {
             if (!error && response.statusCode == 200) {
				 var result = JSON.parse(body);
             self.sendSocketNotification('VIDEO', result );
			 }
         });
     }, 

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === "CONFIG") {
            this.config = payload;
        } else if (notification === 'GET_VIDEO') {
            this.getVideo(payload);
        }
    }
});
