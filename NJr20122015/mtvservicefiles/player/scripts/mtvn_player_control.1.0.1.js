var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var mtvnPlayers = [];

function mtvnPlayerLoaded( playerId ){
	mtvnPlayers[playerId]._onPlayerLoaded();
}
function MTVNPlayerController(id,onLoadFunctionName){
	mtvnPlayers[id] = this;
	this.onLoadFunctionName = onLoadFunctionName;
	this.playerLoaded = false;
	this.playerId = id;
	this.player = null;
	
	this._onPlayerLoaded = function(){
		this.player = (navigator.appName.indexOf("Microsoft") != -1) ? window[this.playerId] : document[this.playerId];
		this.playerLoaded = true;
		var f = eval(onLoadFunctionName);
		f(this);
	}
	
	this.onDump = function(){}
	
	this.dump = function(){
		var temp = "";
		if (this.playerLoaded){
			temp = this.player.getLogDump();
		}
		else{
			temp = "player not loaded";
		}
		this.onDump(temp);
	}
}

}
/*
