function imageSwap(sImage, sNewImage) {
    document.images[sImage].src=eval(sNewImage+'.src');
}

function giveFocus(overObject) {
  overObject.focus();
}

function giveFocusId(overId) {
  document.getElementById(overId).focus();
}

function displayMsg(msg) {
  alert(msg);
}

function openPopupTV(){
	wpPopup = null;
  picURL = "";
  w = 875;
	h = 660;
	t = (screen.height - h) / 2;
	l = (screen.width - w) / 2;
	
	wpPopup = open("https://web.archive.org/web/20140907183858/http://www.pubtv.net/online/hit/BobBuilder/","wppopup","toolbar=no,status=no,scrollbars=no,location=no,menubar=no,directories=no,top=" + t + ",left=" + l + ",width=" + w + ",height=" + h);
	wpPopup.picURL = picURL;
}

}
