// function makeIterator (arr) {
//   let nextIndex = 0
//   //返回一个迭代器对象
//   return {
//     next : () => {
//       //next（）方法返回的结果对象
//       if(nextIndex <arr.length){
//         return{value:arr[nextIndex++], done:false}
//       } else {
//         return {done:true}
//       }
//     }
//   }
// }
// const it = makeIterator(['吃饭','阿萨德','颠倒是非'])
// console.log('1' ,it.next().value)
// console.log('2' ,it.next().value)
// console.log('3' ,it.next().value)
// console.log('4' ,it.next().value)

function *makeIterator (arr) {
  for (let i=0;i<arr.length;i++){
    yield arr[i]
  }
}
const gen = makeIterator(['a','b','c'])
console.log('1', gen.next())
console.log('2', gen.next())
console.log('3', gen.next())
console.log('4', gen.next())