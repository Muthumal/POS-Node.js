function SwipeParserObj(strParse)
{this.input_trackdata_str=strParse;this.account_name=null;this.surname=null;this.firstname=null;this.acccount=null;this.exp_month=null;this.exp_year=null;this.track1=null;this.track2=null;this.hasTrack1=false;this.hasTrack2=false;sTrackData=this.input_trackdata_str;if(strParse!='')
{nHasTrack1=strParse.indexOf("^");nHasTrack2=strParse.indexOf("=");this.hasTrack1=bHasTrack1=false;this.hasTrack2=bHasTrack2=false;if(nHasTrack1>0){this.hasTrack1=bHasTrack1=true;}
if(nHasTrack2>0){this.hasTrack2=bHasTrack2=true;}
bTrack1_2=false;bTrack1=false;bTrack2=false;if((bHasTrack1)&&(bHasTrack2)){bTrack1_2=true;}
if((bHasTrack1)&&(!bHasTrack2)){bTrack1=true;}
if((!bHasTrack1)&&(bHasTrack2)){bTrack2=true;}
bShowAlert=false;if(bTrack1_2)
{strCutUpSwipe=''+ strParse+' ';arrayStrSwipe=new Array(4);arrayStrSwipe=strCutUpSwipe.split("^");var sAccountNumber,sName,sShipToName,sMonth,sYear;if(arrayStrSwipe.length>2)
{this.account=stripAlpha(arrayStrSwipe[0].substring(1,arrayStrSwipe[0].length));this.account_name=arrayStrSwipe[1];this.exp_month=arrayStrSwipe[2].substring(2,4);this.exp_year='20'+ arrayStrSwipe[2].substring(0,2);if(sTrackData.substring(0,1)=='%'){sTrackData=sTrackData.substring(1,sTrackData.length);}
var track2sentinel=sTrackData.indexOf(";");if(track2sentinel!=-1){this.track1=sTrackData.substring(0,track2sentinel);this.track2=sTrackData.substring(track2sentinel);}
var nameDelim=this.account_name.indexOf("/");if(nameDelim!=-1){this.surname=this.account_name.substring(0,nameDelim);this.firstname=this.account_name.substring(nameDelim+1);}}
else
{bShowAlert=true;}}
if(bTrack1)
{strCutUpSwipe=''+ strParse+' ';arrayStrSwipe=new Array(4);arrayStrSwipe=strCutUpSwipe.split("^");var sAccountNumber,sName,sShipToName,sMonth,sYear;if(arrayStrSwipe.length>2)
{this.account=sAccountNumber=stripAlpha(arrayStrSwipe[0].substring(1,arrayStrSwipe[0].length));this.account_name=sName=arrayStrSwipe[1];this.exp_month=sMonth=arrayStrSwipe[2].substring(2,4);this.exp_year=sYear='20'+ arrayStrSwipe[2].substring(0,2);if(sTrackData.substring(0,1)=='%'){this.track1=sTrackData=sTrackData.substring(1,sTrackData.length);}
this.track2=';'+ sAccountNumber+'='+ sYear.substring(2,4)+ sMonth+'111111111111?';sTrackData=sTrackData+ this.track2;var nameDelim=this.account_name.indexOf("/");if(nameDelim!=-1){this.surname=this.account_name.substring(0,nameDelim);this.firstname=this.account_name.substring(nameDelim+1);}}
else
{bShowAlert=true;}}
if(bTrack2)
{nSeperator=strParse.indexOf("=");sCardNumber=strParse.substring(1,nSeperator);sYear=strParse.substr(nSeperator+1,2);sMonth=strParse.substr(nSeperator+3,2);this.account=sAccountNumber=stripAlpha(sCardNumber);this.exp_month=sMonth=sMonth;this.exp_year=sYear='20'+ sYear;if(sTrackData.substring(0,1)=='%'){sTrackData=sTrackData.substring(1,sTrackData.length);}}
if(((!bTrack1_2)&&(!bTrack1)&&(!bTrack2))||(bShowAlert))
{}}
this.dump=function(){var s="";var sep="\r";s+="Name: "+ this.account_name+ sep;s+="Surname: "+ this.surname+ sep;s+="first name: "+ this.firstname+ sep;s+="account: "+ this.account+ sep;s+="exp_month: "+ this.exp_month+ sep;s+="exp_year: "+ this.exp_year+ sep;s+="has track1: "+ this.hasTrack1+ sep;s+="has track2: "+ this.hasTrack2+ sep;s+="TRACK 1: "+ this.track1+ sep;s+="TRACK 2: "+ this.track2+ sep;s+="Raw Input Str: "+ this.input_trackdata_str+ sep;return s;}
function stripAlpha(sInput){if(sInput==null)return'';return sInput.replace(/[^0-9]/g,'');}}