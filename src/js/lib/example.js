import { EventEmitter } from 'events';


export default class Example extends EventEmitter {
    doSomething(maxDuration) {
    	setTimeout(() => {
    		this.emit('done', Math.random());
    	}, Math.floor(Math.random() * maxDuration));
    }
}