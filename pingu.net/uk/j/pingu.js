function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function addClass(element,value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName+= " ";
    newClassName+= value;
    element.className = newClassName;
  }
}

function attach_flash() {
	if (!document.getElementById) return false;
	if (UFO.hasFlashVersion("8","0")) {
		if ((document.getElementById("flash_uri"))) {
				var flash_uri = document.getElementById("flash_uri").value;
				var flash_vars = "content_uri=m/"+flash_uri;
				var FO_mainnav = { movie:"m/shell.swf", width:"100%", height:"100%", majorversion:"8", build:"0", wmode:"transparent", flashvars: flash_vars };
				
				UFO.create(FO_mainnav, "flash-content");
		}
		$('flash_not_found').remove();
	} else {
		if (document.getElementById("flash_not_found")) { Effect.toggle('flash_not_found','appear'); }
		var body = document.getElementsByTagName('body')[0];
		if (body) {
			body.className = "itobs textversion";
		}
	}	

}

function launchSite(url) {
		var width, height;
		var agt = navigator.userAgent.toLowerCase();
		var isNetscape = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1) && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1) && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
		var isMac = (navigator.appVersion.indexOf("Mac") != -1);
		
		width = (screen.availWidth) ? screen.availWidth : 800;
		height = (screen.availHeight) ? screen.availHeight : 616;
		
		height -= 30; // -20 extra for many
		 
		if (isMac) height += 30; // 20
		else width -= 10;
							 
		var winObj = window.open(url,"evccl","left=0,top=0,width=" + width + ",height=" + height + ",fullscreen=no, scrollbars=yes");
		if(winObj && isMac && winObj.moveTo && winObj.resizeTo)
		{
			winObj.moveTo(0, 0);
			winObj.resizeTo((width), height);
			winObj.focus();
		}
	
}

function setup_site_launcher () {
	if (!document.getElementById) return false;
	var width, height;
	width = (screen.availWidth) ? screen.availWidth : 800;
	height = (screen.availHeight) ? screen.availHeight : 616;
	var link = $('enter-website');
	if (link) {
		if (height >= 616) {
			link.onclick = function () { addClass(link, "return-to-site"); launchSite('splash.htm'); return false; }
		} else {
			link.href = "splash.htm";
		}
	}
}
