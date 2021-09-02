var csv={__ID__:"id",__ROWS__:"values",__SIZE__:"size",__PS_INDEX__:0,__TYPE_INDEX__:1,__HEADER_INDEX__:2,__DATA_INDEX__:3,_StructData:function(){this.header=[],this.type=[],this.body=[]},_Row:function(e,t,r){var s=this;this.index=r;let c=e.header,a=e.type,n=[],i=[];c.forEach(function(e){var[t,r]=e.split(":");if(r){var s=r.match(/\[(\w*)\]/);r=s?""==s[1]||"number"==s[1]?"array.number":"array.default":"default"}else r="default";i.push(t),n.push(r)}),i.forEach(function(e,r){var c=t[r],i=n[r];if(i.startsWith("array"))c&&c.length>0?(c=c.split(/[,\+&;\/\s]/),i.endsWith("number")&&(c=c.map(function(e){return Number(e)}))):c=[];else if("json"==i)c=JSON.parse(c);else{var o=c.match(/\"(.*)\"/);if(o)c=o[1]||c;else{var l=Number(c);isNaN(l)||(c=l)}}if(csv._fieldParser){let e=a[r];c=csv._fieldParser(e,c)||c}Object.defineProperty(s,e,{value:c,writable:!1})})}};csv._Row.prototype.match=function(e){return!(!e||!e(this,this.index))},csv._CSV=function(e){this._data=e,this._rows={},this._values=null;var t=this;let r=e.header.indexOf(csv.__ID__);r=r<0?0:r,e.body.forEach(function(s,c){var a=new csv._Row(e,s,c);delete e.body[c],t._rows[s[r]]=a}),e.body.splice(0),Object.defineProperty(this,csv.__ROWS__,{get:function(){return null==this._values&&(this._values=Object.values(t._rows)),this._values}}),Object.defineProperty(this,csv.__SIZE__,{value:e.body.length,writable:!1})},csv._CSV.prototype.get=function(e){return this._rows[e]},csv._CSV.prototype.search=function(e){let t=[];for(var r in this._rows){var s=this._rows[r];s.match(e)&&t.push(s)}return t},csv.pathToCSV={},csv.cache_indexKeyToTable={},csv._fieldParser=null,csv.isLoaded=function(e){return null!=csv.pathToCSV[e]},csv.load=function(e,t,r){cc.loader.loadRes(e,cc.TextAsset,function(s,c){if(""!=c.name){if(!csv.pathToCSV[c.name]){var a=csv.parse(c.text);csv.pathToCSV[c.name]=a,Object.defineProperty(csv,c.name,{value:a,writable:!1,configurable:!0})}cc.loader.releaseRes(e,cc.TextAsset),t&&t.call(r)}})},csv.remove=function(e){delete csv.pathToCSV[e]},csv.loadString=function(e,t,r,s){let c=csv.pathToCSV[e];if(csv.remove(e),!csv.pathToCSV[e])try{var a=csv.parse(t);csv.pathToCSV[e]=a,delete csv[e],Object.defineProperty(csv,e,{value:a,writable:!1,configurable:!0})}catch(n){console.error("[csv]expcetion occur while parsing csv txt!",n),csv.pathToCSV[e]=c}r&&r.call(s)},csv.parse=function(e){var t=e.split(/\r?\n/g).filter(function(e){return""!=e}),r=new csv._StructData;return r.header=t[csv.__HEADER_INDEX__].replace(/[\r]/g,"").split(/\s*\t/g),r.type=t[csv.__TYPE_INDEX__].replace(/[\r]/g,"").split(/\s*\t/g),r.body=t.slice(csv.__DATA_INDEX__).map(function(e){return csv.parseRowWithT(e.replace(/\r/g,""))}),new csv._CSV(r)},csv.parseRowWithT=function(e){return e.split("\t")},csv.parseRow=function(e){if(-1===e.indexOf('"'))return e.split(",");for(var t="",r=[],s=!1,c=0;c<e.length;c++){var a=e.charAt(c);'"'!==a?","!==a||s?t+=a:(r.push(t),t=""):s=!s}return r.push(t),r},csv.setParser=function(e){this._fieldParser=e},csv.hasIndex=function(e){return null!=csv.cache_indexKeyToTable[e]},csv.removeIndex=function(e,t){let r=e+"."+t;csv.cache_indexKeyToTable[r]=null},csv.createIndex=function(e,t,r){if(!csv.hasIndex(e+"."+t)){var s=this[e];s.values.forEach(function(e){var c=e[t];""!=c&&0!=c&&(c=c.replace(" ","_"),Object.defineProperty(s,c,{value:e[r],writable:!1}))}),csv.cache_indexKeyToTable[e+"."+t]=s}},csv.loadDir=function(e,t,r){cc.loader.loadResDir(e,cc.TextAsset,function(s,c,a){return a.forEach(function(e,t){var r=c[t];if(!csv.pathToCSV[e]){var s=csv.parse(r.text);csv.pathToCSV[e]=s,Object.defineProperty(csv,r.name,{value:s,writable:!1,configurable:!0})}}),cc.loader.releaseResDir(e,cc.TextAsset),t&&t.call(r)})},csv.release=function(){},window.csv=csv;