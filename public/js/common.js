function get_dimensions()
{var dims={width:0,height:0};if(typeof(window.innerWidth)=='number'){dims.width=window.innerWidth;dims.height=window.innerHeight;}else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){dims.width=document.documentElement.clientWidth;dims.height=document.documentElement.clientHeight;}else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){dims.width=document.body.clientWidth;dims.height=document.body.clientHeight;}
return dims;}
function show_feedback(type,message,title,optionsOverride)
{optionsOverride=optionsOverride||{};optionsOverride['toastClass']='toast hidden-print';toastr[type](message,title,optionsOverride);if(ENABLE_SOUNDS)
{if(type=='success')
{$.playSound(BASE_URL+'assets/sounds/success');}
else if(type=='warning')
{$.playSound(BASE_URL+'assets/sounds/warning');}
else if(type=='error')
{$.playSound(BASE_URL+'assets/sounds/error');}}}
function giftcard_swipe_field($field)
{$field.keyup(function()
{var cur_val=$(this).val();if(cur_val.substring(0,1)=='%'||cur_val.substring(0,1)==';')
{cur_val=cur_val.substring(1);}
if(cur_val.substring(cur_val.length- 1)=='?')
{cur_val=cur_val.substring(0,cur_val.length- 1);}
$(this).val(cur_val);});}
$(document).keydown(function(event)
{if(event.keyCode==112||event.keyCode==114)
{window.location=SITE_URL+"/sales";}});$(document).ready(function()
{$(document).on('click','a[data-target="#myModal"]',function(event)
{if($(this).attr('href').lastIndexOf('#',0)!==0)
{$('#myModal').html('');$('#myModal').load($(this).attr('href'));}});$(document).on('click','a[data-target="#myModalDisableClose"]',function(event)
{if($(this).attr('href').lastIndexOf('#',0)!==0)
{$('#myModalDisableClose').html('');$('#myModalDisableClose').load($(this).attr('href'));}});$('.show_more_taxes').click(function()
{$(this).parent().prev().find('.cumulative_checkbox').prop('disabled',true);$(this).parent().prev().find('.cumulative_checkbox').prop('checked',false);$(this).parent().next().show();$(this).remove();});$(".more_taxes_container:visible").each(function(index,el)
{$(this).prev().prev().find('.cumulative_checkbox').prop('disabled',true);$(this).prev().prev().find('.cumulative_checkbox').prop('checked',false);});});$(document).on('touchstart',"ul.ui-autocomplete.ui-menu li a",function(e)
{$(this).addClass('autocomplete-touch-start');$(this).removeClass('autocomplete-touch-end');});$(document).on('touchend',"ul.ui-autocomplete.ui-menu li a",function(e)
{$(this).addClass('autocomplete-touch-end');$(this).removeClass('autocomplete-touch-start');});function salesRecvFullScreen()
{$(".top-bar").hide();$(".breadcrumb").hide();$(".left-bar").hide();$("#footers").hide();$("#sales_page_holder").addClass('fullscreen-enabled');$(".content").css('margin',0).css('padding',0);$(".main-content").css('margin',0).css('padding',0);$('.dismissfullscreen').removeClass('hidden');}
function salesRecvDismissFullscren()
{$(".top-bar").show();$(".breadcrumb").show();$(".left-bar").show();$("#footers").show();$("#sales_page_holder").removeClass('fullscreen-enabled');$(".content").css('margin','').css('padding','');$(".main-content").css('margin','').css('padding','');$('.dismissfullscreen').addClass('hidden');}
function date_time_picker_field($field,format)
{$field.on("dp.change",function(e)
{formated_date=e.date.locale('en').format(format);$(this).val(formated_date);});if(IS_MOBILE)
{$field.attr('readonly','readonly');}
$field.datetimepicker({format:format,locale:LOCALE,ignoreReadonly:IS_MOBILE?true:false});}
function mercury_emv_pad_reset(post_host,listener_port,reset_data,callback)
{callback=typeof callback!=='undefined'?callback:false;delete $.ajaxSettings.headers["cache-control"]
$.ajax('http://'+post_host+':'+listener_port+'/method4',{data:reset_data,dataType:'text',method:'POST',cache:true,headers:{'Invoke-Control':'EMVX'},success:function(listener_response)
{var data=listener_response.split("&");var processed_data=[];for(var i=0;i<data.length;i++)
{var m=data[i].split("=");processed_data[m[0]]=m[1];}
$.post(SITE_URL+"/sales/set_sequence_no_emv",{sequence_no:processed_data.SequenceNo},function()
{if(callback)
{callback();}});},error:function()
{if(callback)
{callback();}}});}
function mercury_emv_param_download(post_host,listener_port,init_data,success_message,error_message,callback)
{callback=typeof callback!=='undefined'?callback:false;delete $.ajaxSettings.headers["cache-control"]
$.ajax('http://'+post_host+':'+listener_port+'/method4',{data:init_data,dataType:'text',method:'POST',cache:true,headers:{'Invoke-Control':'EMVX'},success:function(listener_response)
{var data=listener_response.split("&");var processed_data=[];for(var i=0;i<data.length;i++)
{var m=data[i].split("=");processed_data[m[0]]=m[1];}
if(processed_data.CmdStatus!='Success')
{var additional_message=decodeURIComponent(processed_data.TextResponse.replace(/\+/g,'%20'));show_feedback('error',error_message+': '+additional_message,COMMON_ERROR);}
else
{show_feedback('success',success_message,COMMON_SUCCESS);}
$.post(SITE_URL+"/sales/set_sequence_no_emv",{sequence_no:processed_data.SequenceNo},function()
{if(callback)
{callback();}});},error:function()
{show_feedback('error',error_message,COMMON_ERROR);if(callback)
{callback();}}});}
function date_time_picker_field_report($field,format)
{var id_of_field=$field.attr('id');var name_of_field=$field.attr('name');var id_copy_of_field=id_of_field+'_formatted';var name_copy_of_field=name_of_field+'_formatted';$field.attr('id',id_copy_of_field);$field.attr('name',name_copy_of_field);if(IS_MOBILE)
{$field.attr('readonly','readonly');}
$('<input>').attr({type:'hidden',id:id_of_field,name:name_of_field}).insertAfter($field);$field.on("dp.change",function(e)
{var does_date_have_time=format.indexOf(' ')!=-1;var date=e.date;var formated_date=null;if(does_date_have_time)
{formated_date=date.locale('en').format("YYYY-MM-DD HH:mm");}
else
{formated_date=date.locale('en').format("YYYY-MM-DD");}
$('#'+id_of_field).val(formated_date);if(id_of_field=='start_date'||id_of_field=='end_date')
{if($("#complex_radio").length)
{$("#complex_radio").prop('checked',true);}}
if(id_of_field=='start_date_compare'||id_of_field=='end_date_compare')
{if($("#complex_radio").length)
{$("#complex_radio_compare").prop('checked',true);}}});var defaultDate=null;if(id_of_field=='start_date'||id_of_field=='start_date_compare')
{defaultDate=moment();defaultDate.set('hour',0);defaultDate.set('minute',0);}
else if(id_of_field=='end_date'||id_of_field=='end_date_compare')
{defaultDate=moment();defaultDate.set('hour',23);defaultDate.set('minute',59);}
$field.datetimepicker({format:format,locale:LOCALE,defaultDate:defaultDate,ignoreReadonly:IS_MOBILE?true:false});if($("#simple_radio").length)
{$("#simple_radio").prop('checked',true);}
if($("#simple_radio_compare").length)
{$("#simple_radio_compare").prop('checked',true);}}
function is_int(n)
{return n%1===0;}
function do_link_confirm(message,ele)
{var url=$(ele).attr('href');bootbox.confirm(message,function(result)
{if(result)
{window.location=url;}});return false;}