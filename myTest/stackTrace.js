const StackTrace =  require('stacktrace-js');
import * as Path from 'path';
import * as Log4js from 'log4js';
import * as Util from 'util';
import * as Moment from 'moment'; // 处理时间的工具

var error = new Error('BOOM!');

var callback = function(stackframes) {
    console.log(`----------stackframes----------`);
    console.log(stackframes);
    var stringifiedStack = stackframes.map(function(sf) {
        console.log(`------------sf.toString()-----------`);
        console.log(sf);
        console.log(sf.toString());
        return sf.toString();
    });
    // console.log(stringifiedStack);
};

var errback = function(err) {
    console.log(`---------------err.message--------------`);
    console.log(err.message);
};

StackTrace.fromError(error).then(callback).catch(errback);

try{


}catch(error){
    //console.log(StackTrace.getSync());
}
