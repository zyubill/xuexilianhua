/**
 * Created by Administrator on 14-10-11.中文utf8
 */
'use strict'


//jugglingdb


//mongoose
//global.db = mongoose.createConnection(uri);
var mongoose = require('mongoose')
var schema = mongoose.Schema;



//下面是通用的变量
var uri = 'mongodb://localhost/xuexiliahua';

/*
var Zhangjie = schema({
	mc :  { type: String, length: 50 } 
	//包含习题，需要增加属性  如分数
});
*/



var Xiti =  {
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
};

//TODO 
//一个练习的某个答案，可以有多个正确的答案。   
//(多项选择，几个答案并在一起，组成一个正确答案；这种出题时选项不好控制。
//根据题型对正确答案做处理，或者需要一个编号或一个标志，)


//一个练习下需要有多个答案，如一道填空题，可以有多个填空处，就需要多个答案。 还如应用题有多个问题，阅读理解等
//（如果有替换型的答案，在说明里处理）
var Daai = {
	//内容
	//neilong:{ type: Schema.Text }
	neilong:{ type: String }
	//正确与否    
	,zhequema:{ type: Boolean, default: true }  //, index: true  //错误的答案是用来选择题时出题更智能  //TODO 多选择时会有问题的？  多选题时，正确的答案多个并列？
	//编号  或者 唯一号   有些顺序中有使用到
	,bianhao: Number   //默认为0  //DAAI作为XITI的属性时不需要这个编号，因为数组已经有编号
	//说明   对答案的一些特别说法，如近义词有多个等
	//,shuoming: Schema.Text
	,shuoming: String

};

var Zhangjie = {
	//在同本书下，名称是否可唯一，应该可以吧。有时会有同名
	mc :  { type: String, length: 50 } 
	//包含习题，需要增加属性  如分数
	//,xitis:[{type:String}]
};



//
//关连的处理
//mongoose 先做为子属性，而不是关连属性
Xiti.daais = [Daai];
Zhangjie.xitis = [Xiti];


//交卷，批卷的相关属性，可合在一起
var LianxiZhangjie  = {
	yunshi: Number  //用时
	,cuowu: Number  //错误数量  //这些参数是否可以转移到zhangjie属性里?
	,defen:Number //得分
	,yonghu:String  //使用用户的名称
	//yonghu id  //某个用户
	//zhangjie id   //关连某个章节  lianxiZhangjie  可放在Zhangjie的lianxi下，或者作为一个独立的集合，昨晚考虑过了，因为练习本身独立的，所以是独立的
	,zhangjie : {
		zjid:String   //现在还不清楚是否能关连，就去查找一下吧
		//,version
		,xitis:[
			{
				xtid:String
				,cuowu:Number   //0：不是错误   1:是错误
				,kofen:Number    //扣分
				,daais:[
				{
						daid:String
						,cuowu:Number
						,kofen:Number
						,dati:String   //答题 ， 回答的内容
				}
					]
			}
		]
	}

}


//mongoose
var db  = mongoose.createConnection(uri);
exports.Zhangjie = db.model('Zhangjie', schema(Zhangjie) );
exports.Xiti  =   db.model('Xiti', schema(Xiti) );
exports.Daai  =   db.model('Daai', schema(Daai) );
exports.LianxiZhangjie  =   db.model('LianxiZhangjie', schema(LianxiZhangjie) );


//exports.Daai  =   Daai;
//exports.ZhangjieXiti  =   ZhangjieXiti;