import {EventEmitter} from "events";

const chatEmitter = new EventEmitter();
chatEmitter.on('match.new',data=>{
    console.log('match.new event',data)
})
export default chatEmitter