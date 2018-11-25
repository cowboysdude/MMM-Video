/* Magic Mirror
 * Module: MMM-Video
 *
 * By cowboysdude
 *
 */

Module.register("MMM-Video", {

	// Module config defaults.
	defaults: {
		updateInterval: 60*1000, // every 10 minutes
		animationSpeed: 10,
		initialLoadDelay: 875,
		fadeSpeed: 7,
    rotateInterval: 5 * 1000
	  },

    getScripts: function() { return ["mediabox.js"]; },
    getStyles: function() { return ["MMM-Video.css"]; },

    // Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
    this.video = {};
    this.today = "";
    this.activeItem = 0;
    this.rotateInterval = null;
    this.getVIDEO();
    this.scheduleUpdate();
	},


    getDom: function() {
		 var wrapper = document.createElement("div");
      var video = this.video;

     var vkeys = Object.keys(this.video);
 if(vkeys.length > 0){
       if(this.activeItem >= vkeys.length){
   this.activeItem = 0;
 }



    video = this.video[vkeys[this.activeItem]];
    var Id = video.snippet.resourceId.videoId;
    var Img = video.snippet.thumbnails.maxres.url;
    console.log(Id);

      var vcontainer = document.createElement("div");
			vcontainer.classList.add("xsmall", "bright");
			vcontainer.innerHTML = ` <a href="https://www.youtube.com/watch?v=${Id}" class="mediabox">
                             <img class = "vid" src="${Img}"></a>`
      wrapper.appendChild(vcontainer);
    }
        return wrapper;
    },

    processVIDEO: function(data) {
        this.today = data.Today;
        this.video = data.items;
    },

    getVIDEO: function() {
        this.sendSocketNotification('GET_VIDEO');
    },

    scheduleCarousel: function() {
         console.log("Scheduling Video Channel items");
     this.rotateInterval = setInterval(() => {
     this.activeItem++;
     this.updateDom(this.config.animationSpeed);
   }, this.config.rotateInterval);
  },

   scheduleUpdate: function() {
       setInterval(() => {
           this.getVideo();
       }, this.config.updateInterval);
       var self = this;
   },





    notificationReceived: function(notification, payload, sender){
 if (notification === 'DOM_OBJECTS_CREATED'){
       MediaBox('.mediabox');
 }
},

socketNotificationReceived: function(notification, payload) {
    if (notification === "VIDEO") {
        this.processVIDEO(payload);
        if(this.rotateInterval == null){
     this.scheduleCarousel();
    }
          this.updateDom(this.config.animationSpeed);
    }
},

});
