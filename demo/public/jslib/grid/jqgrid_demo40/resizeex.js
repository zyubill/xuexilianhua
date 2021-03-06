jQuery("#list12").jqGrid({
   	url:'server.php?q=2',
	datatype: "json",
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
   	rowNum:10,
   	rowList:[10,20,30],
   	pager: '#pager12',
   	sortname: 'id',
    viewrecords: true,
    sortorder: "desc",
	multiselect: false,
	width: 500,
	height: "100%",
	caption: "Auto height example"
});
jQuery("#list12").jqGrid('navGrid','#pager12',{add:false,edit:false,del:false});
