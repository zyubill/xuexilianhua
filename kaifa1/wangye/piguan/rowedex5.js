
var lastsel;

//功能
//TODO 数据从服务器获取
	//现在都在服务器处理完
//增加错和扣分的编辑
//保存后，
	//整理数据
	//提交至服务器



// 		{name:'id',index:'id', width:90, sorttype:"int", editable: true},
//   		{name:'name',index:'name', width:150,editable: true,editoptions:{size:"20",maxlength:"30"}},
//   		{name:'stock',index:'stock', width:60, editable: true,edittype:"checkbox",editoptions: {value:"Yes:No"}},
//   		{name:'ship',index:'ship', width:90, editable: true,edittype:"select",editoptions:{value:"FE:FedEx;IN:InTime;TN:TNT;AR:ARAMEX"}},		
//   		{name:'note',index:'note', width:200, sortable:false,editable: true,edittype:"textarea", editoptions:{rows:"2",cols:"10"}}		

jQuery("#rowed5").jqGrid({
	datatype: "local",
	width:"100%",
	height: "100%",
   	colNames:[  'xitiid','daaiid', 'cuowu','kuofeng','neilong', 'shuoming'],
   	colModel:[
   		{name:'xitiid',index:'xitiid', width:200},
   		{name:'daaiid',index:'daaiid', width:200},
   		{name:'cuowu',index:'cuowu', width:50, editable: true,edittype:"checkbox",editoptions: {value:"错:对"}},   //因为这列是错误列，缺省打勾表示错
   		{name:'kuofeng',index:'kuofeng', width:50,editable: true},
		{name:'neilong',index:'neilong', width:300},
   		{name:'shuoming',index:'shuoming', width:300}		
   	],
	onSelectRow: function(id){
		//alert(id);
		if(id && id!==lastsel){
			jQuery('#rowed5').jqGrid('restoreRow',lastsel);
			jQuery('#rowed5').jqGrid('editRow',id,true);
			lastsel=id;
			//alert(lastsel);
			//TODO
			//如果回车保存后，不清理 lastsel，则无法再编辑。特别是只有一条时
			//先暂时不解决 通过onEnter或直接增加按钮等来处理

		}
	},
	//editurl: "server.php",
	//editurl: "#",
	//editurl: "http://www.sina.com.cn",
	editurl: "clientArray",
	caption: "答案列表"

});


//答案列表
var mydata2 = [

{ xitiid: '54b4c610475f3dd00b2a1e7b',
   daaiid: '54b4c610475f3dd00b2a1e7a',
	cuowu:'',
	kuofeng:0,
   neilong: '36秒',
   shuoming: undefined 
	
}
,{ xitiid: '54b4c610475f3dd00b2a1e7b',
   daaiid: '54b4c610475f3dd00b2a1e7a',
	cuowu:'',
	kuofeng:0,
   neilong: '36秒',
   shuoming: undefined 
	
}

		
		];


for(var i=0;i<mydata2.length;i++)
	jQuery("#rowed5").jqGrid('addRowData',mydata2[i].id,mydata2[i]);


jQuery("#save").click( function() {
	var datas = jQuery("#rowed5").getRowData(); 
	datas =$.toJSON( datas ); 
	alert(datas);

});



