var mydata = [
		{id:"1",invdate:"2010-05-24",name:"test",note:"note",tax:"10.00",total:"2111.00"} ,
		{id:"2",invdate:"2010-05-25",name:"test2",note:"note2",tax:"20.00",total:"320.00"},
		{id:"3",invdate:"2007-09-01",name:"test3",note:"note3",tax:"30.00",total:"430.00"},
		{id:"4",invdate:"2007-10-04",name:"test",note:"note",tax:"10.00",total:"210.00"},
		{id:"5",invdate:"2007-10-05",name:"test2",note:"note2",tax:"20.00",total:"320.00"},
		{id:"6",invdate:"2007-09-06",name:"test3",note:"note3",tax:"30.00",total:"430.00"},
		{id:"7",invdate:"2007-10-04",name:"test",note:"note",tax:"10.00",total:"210.00"},
		{id:"8",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"21.00",total:"320.00"},
		{id:"9",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
		{id:"11",invdate:"2007-10-01",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
		{id:"12",invdate:"2007-10-02",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
		{id:"13",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
		{id:"14",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
		{id:"15",invdate:"2007-10-05",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
		{id:"16",invdate:"2007-09-06",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
		{id:"17",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
		{id:"18",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
		{id:"19",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
		{id:"21",invdate:"2007-10-01",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
		{id:"22",invdate:"2007-10-02",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
		{id:"23",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
		{id:"24",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
		{id:"25",invdate:"2007-10-05",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
		{id:"26",invdate:"2007-09-06",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
		{id:"27",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
		{id:"28",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
		{id:"29",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"}
	];


jQuery("#list7").jqGrid({
   	//url:'server.php?q=2',
	//datatype: "json",
	datatype: "local",
	data:mydata,
   	colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
   	colModel:[
   		{name:'id',index:'id', width:55},
   		{name:'invdate',index:'invdate', width:90},
   		{name:'name',index:'name', width:100},
   		{name:'amount',index:'amount', width:80, align:"right"},
   		{name:'tax',index:'tax', width:80, align:"right"},		
   		{name:'total',index:'total', width:80,align:"right"},		
   		{name:'note',index:'note', width:150, sortable:false}		
   	],
   	rowNum:300,
   	rowList:[10,20,30],
   	pager: '#pager7',
   	sortname: 'name',
    viewrecords: true,
    sortorder: "desc",
		/*
   	grouping:true,
   	groupingView : {
   		groupField : ['name']
   	},*/

    caption:"Set Methods Example",
    hidegrid: false,
    height: 210
});
jQuery("#list7").jqGrid('navGrid','#pager7',{edit:false,add:false,del:false,refresh:false,searchtext:"Find"});

jQuery("#s1").click( function() {

	//jQuery("#list7").jqGrid('setGridParam',{url:"server.php?q=2"}).trigger("reloadGrid")
/*
	var id = jQuery("#list7").jqGrid('getGridParam','selrow');
	alert(id);
	if( !id ) {
		alert("Please select row");
		return;
	}
	var row = jQuery("#list7").jqGrid('getRowData',id);
*/

	/*
	//查找出yp
	//exportYy.yps
	var yp = exportYy.yps[0];
	yp.exporttype = "未导出";
	alert(  JSON.stringify( yp ) );
	console.log(exportYy);
	*/

	//mydata[0].name = "test4";
	$('#list7').jqGrid('setRowData',1,{name:'test4'});
	$('#list7').jqGrid().trigger('reloadGrid');
	// 取得表格的数据 全部  
	var data = $('#list7').jqGrid('getRowData');  
	console.log(data);
	//$('#list7').jqGrid().trigger('reloadGrid', [{page:1}]);  ;  //这样没效果
	//$('#list7').jqGrid().clearGridData(); 
	/*
	$('#list7').jqGrid('setGridParam', 
		{  datatype:'local',  
			rowNum:mydata.length,  
			data:mydata  
		}
	//);  
		).trigger('reloadGrid', [{page:1}]);  
	*/
	/*

	//jQuery("#list48").jqGrid('setRowData',id,{name:"test4"}).trigger("reloadGrid");
	//return;
	//jQuery("#list48").trigger("reloadGrid");
	jQuery("#list48").jqGrid('setRowData',id,{name:"test4"}).trigger("reloadGrid");
	//var su=jQuery("#list48").jqGrid('setRowData',id,{yyname:'yy'});
	alert(su);
	if(su) 
		alert("Succes. Write custom code to update row in server"); 
	else 
		alert("Can not update");
		*/
	

});
jQuery("#s2").click( function() {
	jQuery("#list7").jqGrid('setGridParam',{sortname:"amount",sortorder:"asc"}).trigger("reloadGrid");
});
jQuery("#s3").click( function() {
	var so = jQuery("#list7").jqGrid('getGridParam','sortorder');
	so = so=="asc"?"desc":"asc";
	jQuery("#list7").jqGrid('setGridParam',{sortorder:so}).trigger("reloadGrid");
});
jQuery("#s4").click( function() {
	jQuery("#list7").jqGrid('setGridParam',{page:2}).trigger("reloadGrid");
});
jQuery("#s5").click( function() {
	jQuery("#list7").jqGrid('setGridParam',{rowNum:15}).trigger("reloadGrid");
});
jQuery("#s6").click( function() {
	jQuery("#list7").jqGrid('setGridParam',{url:"server.php?q=1",datatype:"xml"}).trigger("reloadGrid");
});
jQuery("#s7").click( function() {
	jQuery("#list7").jqGrid('setCaption',"New Caption");
});
jQuery("#s8").click( function() {
	jQuery("#list7").jqGrid('sortGrid',"name",false);
});
