// import { promisify} from 'util'
import {resolve as r} from 'path'
// import { readFile,writeFileSync as wfs} from 'fs'
// import * as qs from 'querystring'
// promisify(readFile)(r(__dirname,'../package.json'))
//   .then(data => {
//     data = JSON.parse(data)
//     console.log(data.name)
//     wfs(r(__dirname,'./name'),String(data.name),'utf8')
//   })

import {promisify} from 'util'
import {readFile} from 'fs'
import { name} from './ex'
import {getName} from './ex'
console.log(name)
console.log(getName)
import {
  name as kk1,
  getName2 as  kk2,
  age as kk3
} from './ex'
import { fstat } from 'fs';
console.log(kk1)
console.log(kk2)
console.log(kk3)

async function init () {
  let data = await promisify(readFile)(r(__dirname,'../package.json'))
  data = JSON.parse(data)
  console.log(data.name)
  console.log('aisdiuadiuawhdiuhasiudhui')
}
init()