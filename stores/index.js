import { observable, action, computed } from 'mobx';

class CounterStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable count = 0;

	@computed get isOdd(){
		return this.count % 2 === 1;	
	} 

	@action increment(step = 1) {
		this.count += step;
	}
}

class RootStore {
	constructor() {
		this.counterStore = new CounterStore(this);
	}
}

const singleton = new RootStore();
export default singleton;
