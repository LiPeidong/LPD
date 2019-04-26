//通过reducer建立
//根据老的state和action生成新的state
const ADD = '+'
const REDUCE= '-'
export function counter(state=0,actions){
    switch(actions.type){
      case ADD:
        return state+1
      case REDUCE:
        return state-1
      default:
        return 10
    }
  }

//action creator
export function addGUN(){
  return {type:ADD}
}
export function removeGUN(){
  return {type:REDUCE}
}