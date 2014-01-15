var HTML5VideoScreenshot = function (video) {
	this._screenshots = [];
	this.video = video; // Optional
};
HTML5VideoScreenshot.prototype.screenshot = function(video) {
	// TODO: CB with image data.
	var video = video || this.video;
	var dataUrl = this.__screenshot(video);
	this._screenshots.push(dataUrl);
	return dataUrl;
};
HTML5VideoScreenshot.prototype.save = function (imageData) {
	// TODO: Pop up a File-Save dialog.
	var _imageData = imageData.replace("image/png", "image/octet-stream");
	window.location.href = _imageData;
};
HTML5VideoScreenshot.prototype.setVideo = function(video) {
	// Optional.
	this.video = video;
};
HTML5VideoScreenshot.prototype.__screenshot = function(video, type) {
	// Get handles on the video and canvas elements
	var canvas = document.createElement('canvas');
	// Get a handle on the 2d context of the canvas element
	var context = canvas.getContext('2d');
	// Define some vars required
	var w, h, ratio;
	
	// Calculate the ratio of the video's width to height
	ratio = video.videoWidth / video.videoHeight;
	// Define the required width as 100 pixels smaller than the actual video's width
	w = video.videoWidth - 100;
	// Calculate the height based on the video's width and the ratio
	h = parseInt(w / ratio, 10);
	// Set the canvas width and height to the values just calculated
	canvas.width = w;
	canvas.height = h;

	// Takes a snapshot of the video
	// Define the size of the rectangle that will be filled (basically the entire element)
	context.fillRect(0, 0, w, h);
	// Grab the image from the video
	context.drawImage(video, 0, 0, w, h);

	return context.toDataURL("image/png");
};