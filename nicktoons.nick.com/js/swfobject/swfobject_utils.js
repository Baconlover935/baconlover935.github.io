// for use with "swfobject.createSWF" -- swfobject will do this automatically during a "swfobject.embedSwf"
function getFlashVars(flashvarsObj) {
	if(typeof flashvarsObj != "object") return false;
	var flashVars = "";

	for(var i in flashvarsObj) {
		if(flashvarsObj[i] != Object.prototype[i]) { // Filter out prototype additions from other potential libraries
			if(flashVars != "") {
				flashVars += "&" + i + "=" + flashvarsObj[i];
			} else {
				flashVars = i + "=" + flashvarsObj[i];
			}
		}
	}
	//KIDS.utils.doLog("getFlashVars1: "+flashVars);
	return flashVars;
}

function doAttachDiv(targetId, newId) {
	if(targetId == null || newId == null) return;

	//recreate the target div - Fix IE6/7 issue
	var newTargetDiv = document.createElement('div');
	newTargetDiv.id = targetId;

	var newDiv = document.createElement('div');
	if(newDiv == null) return;
	newDiv.id = newId;

	//doRemoveChildNodes(targetDiv);
	//targetDiv.appendChild(newDiv);
	var oldClasses = $("#"+targetId).attr("class");
	
	// replace targetDiv with a recreated targetDiv - Fix IE6/7 issue (.empty not working)
	$("#"+targetId).replaceWith(newTargetDiv);
	// set the new div
	$("#"+targetId).html(newDiv);
	$("#"+targetId).addClass(oldClasses);
	$("#"+targetId).addClass("swf");
}

/*
function doRemoveChildNodes(obj) {
	while(obj.hasChildNodes()) {
		obj.removeChild(obj.firstChild);
		//obj.removeChild(obj.childNodes[0]);
	}
}
*/

function initPageRedraw() {
	return;
	if(typeof(swfobject) == 'undefined') return;
	//swfobject.addDomLoadEvent(doPageRedraw);
}

function doPageRedraw(objId) {
	return;

	objId = objId && (typeof objId == "string") ? objId : "SwfObjectPageRefresher";

	var oldDiv = document.getElementById(objId);
	if(oldDiv != null) {
		oldDiv.style.visibility = "visible";
		oldDiv.style.display = "none";
		oldDiv.style.display = "block";
		KIDS.utils.doLog("swf: !doPageRedraw: reset: "+objId+" | "+oldDiv.style.visibility+" | "+oldDiv.style.display);
		return;
	}

	KIDS.utils.doLog("swf: !doPageRedraw: create");
	var newDiv = document.createElement("div");
	newDiv.id = "SwfObjectPageRefresher";
	document.getElementsByTagName("body")[0].appendChild(newDiv);
}

function doSwfObjectEmbed(swfObj) {
	if(!swfObj) return;

	if(!swfObj.validVersion && !swfObj.express) {
		KIDS.utils.doLog("swf: doSwfObjectEmbed: incompatible client version: requires: "+swfObj.version+" | "+swfObj.id);
		if(swfObj.redirectUrl) { window.location.href = swfObj.redirectUrl; }
		// else alt content
	} else if(swfObj.delayEmbed) {
		KIDS.utils.doLog("swf: doSwfObjectEmbed: embed halted enabled: geoLock or haltWrite: "+swfObj.id);
	} else {
		doAttachDiv(swfObj.div, swfObj.id);

		swfobject.embedSWF(swfObj.flashSrc, swfObj.id, swfObj.width,
			swfObj.height, swfObj.version, swfObj.expressUrl,
			swfObj.flashvars, swfObj.params, swfObj.attributes);

		KIDS.utils.doLog("swf: doSwfObjectEmbed: embed swf: "+swfObj.id);
		doSwfEmbedComplete(swfObj);
	}
}

doSwfEmbedComplete = function (swfObj) {
	//KIDS.utils.doLog("doSwfObjectEmbed: embed complete: "+swfObj.id);
	/* Could not override this function on nick due to timing of the includes. So just firing off a confirmed nick version.
	 * This should be event based, but would have further implications for multiple sites and require further testing.
	 * Added: 12/24/09 - Safe to remove after 01/01/10.
	 */
	if(typeof doSwfEmbedCompleteNick !== 'undefined') doSwfEmbedCompleteNick(swfObj);
}

function doSwfObjectEmbedDelayed(swfObj) {
	if(!swfObj || !swfObj.delayEmbed) {
		KIDS.utils.doLog("swf: doSwfObjectEmbedDelayed: launchSwf: display alt content: id: "+swfObj.id);
		return;
	}

	if(!swfObj.validVersion && swfObj.express == "true") {
		KIDS.utils.doLog("swf: doSwfObjectEmbedDelayed: invalid version: id: "+swfObj.id+" | express: "+swfObj.express);
		if(swfObj.flashvars == null) swfObj.flashvars = {};
		swfObj.flashvars.MMredirectURL = window.location;
		swfObj.flashvars.MMdoctitle = document.title

		swfObj.attributes.data = swfObj.expressUrl;
	} else {
		swfObj.attributes.data = swfObj.validVersion ? swfObj.flashSrc : swfObj.expressUrl;
		KIDS.utils.doLog("swf: doSwfObjectEmbedDelayed: id: "+swfObj.id+" | valid version?: "+swfObj.attributes.data);
	}

	swfObj.attributes.height = swfObj.height;
	swfObj.attributes.width = swfObj.width;

	swfObj.params.flashvars = getFlashVars(swfObj.flashvars);
	//swfObj.params.flashvars = swfObj.flashvars;

	if(swfObj.validVersion || swfObj.express) {
		doAttachDiv(swfObj.div, swfObj.id);
		swfobject.createSWF(swfObj.attributes, swfObj.params, swfObj.id);
		//doPageRedraw(swfObj.id);
		KIDS.utils.doLog("swf: doSwfObjectEmbedDelayed: create swf: "+swfObj.id+" | "+swfObj.attributes.data);
		doSwfEmbedComplete(swfObj);
	} else {
		KIDS.utils.doLog("swf: doSwfObjectEmbedDelayed: alt content: "+swfObj.id+" | "+swfObj.attributes.data);
	} // else alt content
}

var swfObjHash = {};
function doRegisterSwf(id, src, div, version, height, width, flashvars, delayEmbed,
	express, expressUrl, redirectUrl, embedParams, embedAttributes) {
	if(typeof(swfObjHash) == 'undefined') swfObjHash = {};

	swfObjHash[id] = {
		id:id,
		div:div,
		version:version,
		validVersion:swfobject.hasFlashPlayerVersion(version),
		flashvars:flashvars,
		params:embedParams,
		attributes:embedAttributes,
		height:height,
		width:width,
		flashSrc:src,
		express:express,
		expressUrl:expressUrl,
		redirectUrl:redirectUrl,
		delayEmbed:delayEmbed == "true",
		launchSwf:function() {
			doSwfObjectEmbedDelayed(this);
		}
	};

	KIDS.utils.doLog("swf: doRegisterSwf: id: "+id+" | delayEmbed: "+swfObjHash[id].delayEmbed+" | "+swfObjHash[id].expressUrl);
	doSwfObjectEmbed(swfObjHash[id]);
	swfobject.createCSS("#"+div, "height:"+height+";width:"+width);
}

function doLaunchSwf(swfId) {
	if(swfId == null || swfObjHash == null || swfObjHash[swfId] == null) return;
	swfObjHash[swfId].launchSwf();
