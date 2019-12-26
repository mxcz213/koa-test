// require('@babel/register');
// //core.js 导入需要的polyfill,而不推荐世界导入babel-polyfill
// require('core-js');
// require("regenerator-runtime/runtime");
// require('./server/index.js');

// 一个简易迭代器
const makeIterator = (arr) => {
    let index = 0;
    return {
        next: () => {
            if(index < arr.length){
                return {
                    value: arr[index++],
                    done: false
                }
            } else {
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}
const iterator = makeIterator(["吃饭", "sleep", "eat"])
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())


console.log("======================")

// 生成器
function *genIterator(arr){
    for(let i = 0; i < arr.length; i++){
        yield arr[i]
    }
}
const gen = genIterator(["吃饭2", "sleep2", "eat2"])
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())

console.log("======================")

const Luck = {
    id: 2,
    say: function(){
        setTimeout(function(){
            console.log('say:',this.id)
        },0)
    },
    sayThat: function(){
        const that = this;
        setTimeout(function(){
            console.log('say:',that.id)
        },500)
    },
    sayArrow: function(){
        setTimeout(() =>{
            console.log('say:',this.id)
        },1500)
    },
    sayGlobalArrow: () => {
        setTimeout(() =>{
            console.log('say:',this.id)
        },2000)
    }
}

// this: 当前执行代码的环境对象,  在函数内部，this的值取决于函数被调用的方式。
Luck.say(Luck)
Luck.sayThat(Luck)
Luck.sayArrow()
Luck.sayGlobalArrow()

import fs from 'fs'
fs.readFile('./package.json')