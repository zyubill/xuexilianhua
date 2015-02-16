/**
 * Created by Administrator on 14-10-11.中文utf8
 */
'use strict'

//一些另外的函数在同名的JS文件下，如Baikai模型，会有一个Baikai.js的文件，添加一些更多的操作
	var Schema = require('jugglingdb').Schema;
	var schema = new Schema( 'mongodb', {
		url: 'mongodb://localhost:27017/xuexiliahua'
    });

var Q = require('q');




//答案   一个习题里会有多个子答案，每个答案可以有同义的代替答案  如  代替答案，近义词 就会有多个，也不一定确定，需要另外判断或打分题型，如主观题
	//答案会有多个，属于特殊的JSON子集，现在暂时不分出去，只跟习题有关，属于习题的一部分。有些答案不一定是正确的答案，属于备选答案
	/*

	*/
	//答案说明 ： 对答案另外的文字描述，有些不能完全定制

//TODO 智能化，有些答案由算法完成。个数等不定的
//显示答案时，只显示正确的，并按编号顺序输出，如果实例中有答案编号的，则按实例中的顺序输出
//最好有2种格式  一种是简单TEXT型，另外是这种稍复杂点的 ，第1种是否可以在XITI里实现
var Daai = schema.define('Daai',{
	//内容
	neilong:{ type: Schema.Text }
	//正确与否    
	,zhequema:{ type: Boolean, default: true }  //, index: true
	//编号  或者 唯一号   有些顺序中有使用到
	,bianhao: Number   //默认为1
	//说明   对答案的一些特别说法，如近义词有多个等
	,shuoming: Schema.Text

});

//TODO 题型管理

//TODO  智能出题，限定一些条件，这些条件会出题时再具体实现
var Xiti = schema.define('Xiti', {
    tigan:     { type: String, length: 255 }   //题干  //TODO 会超过255，最好是文本型
	//,wetis:[]    //问题，最好是数组，跟答案相同 。有些情况有多个问题，可以在这里单独处理。
	,
	tixin:{type:String}  //题型  //TODO 题型也是可关连的
	//daais  //由外部关连
	//在保存答案后，修改以下的数据。是否需要有一个标志位，来确定是否同步变化
	,daaiduishulia:{type:Number} //答案对或正确的数量  正确的答案数量
	,daaizhoushu:{type:Number} //答案总数量  正确的答案数量，包含一些混淆的答案数量
	
	//子题

	//daai:{type:String}   
	//答案顺序  有些有顺序，如数学里排列，有些无顺序，如3个特性之类的
	//daaishuishu
	//答案数量，个数
	//daaishulia 

	//难度
	//知识点
	//专业，学科等
	//年级  需要吗？

	//是否被使用  如果有任何使用，则不能删除，只能分支
});

//习题有多个答案，一对多。答案只能属于一个习题，不需要对应
Xiti.hasMany(Daai,   {as: 'daais',  foreignKey: 'xitiId'});

//章节
//统计对错，有多个答案的也算错
//统计需要选择某个人群所做的章节，如一个班，一个年级。或这批考生。
//因为在不同的章节会有不同的分数，这是可变的
//可以再增加题干，有时会对题干进行一些文字小变动，不影响其它。就不需要再新增一个试题这么麻烦。
var ZhangjieXiti = schema.define('ZhangjieXiti',{

	//zhangjieid  //与章节关连
	//xitiid		//与习题关连
	//编号

	//fenshu:{}   //可以有什么种类型  数组类型：按顺序包含几个答案的分数  ，如果是数字类型，则一个答案的分数

	//分数  //对每一个答案会有一个分数
	//TODO 可以删除一些答案选项  //还不如产生一个类似的习题
	//增加对答案的分数
});

//自动化评分，还可以由人工再打分，更人性化点，有时有些是一些细微的错别字等，可酌情扣分
//var ZhangjieXitiDaai

var Zhangjie = schema.define('Zhangjie',{
	mc :  { type: String, length: 50 } 
	//包含习题，需要增加属性  如分数
});

ZhangjieXiti.belongsTo(Xiti, {as: 'xiti', foreignKey: 'xitiId'});  //一个章节习题 包含一个习题
Zhangjie.hasMany(ZhangjieXiti,   {as: 'xitis',  foreignKey: 'zjId'});  //一个章节有多个章节习题


//章节练习   使用者练习这个章节，包含练习者的练习情况
var LianxiZhangjie  =  schema.define('LianxiZhangjie',{

}); 
//每个习题包含章节信息，是不是还需要LianxiZhangjie，程序中要好处理，这个类还是需要的。
//包含具体的答案输入，对错，得分，花费时间等信息
//
var LianxiXiti =  schema.define('LianxiXiti',{

}); 
//var XiJi  习集
//TODO Zhangjie 在这里还需要有顺序编号  章节可重名，但在一个习集里是有顺序的


//界面
//针对某些章节，习集定义UI或目录

//实例

//  类似于 章节实例
//也会产生  习题实例
//选择一个章节，会有对错，分数，总分
//var LianXi = 




exports.Zhangjie = Zhangjie;
exports.Xiti  =   Xiti;
exports.Daai  =   Daai;
exports.ZhangjieXiti  =   ZhangjieXiti;