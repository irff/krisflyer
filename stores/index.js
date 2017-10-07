import { observable, action, computed } from 'mobx';
import model from '../models';

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

class UserStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable user = '';
}

class LevelListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable levels = [];
}

class MilestoneListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable milestones = [];
}

class ItemListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable items = [];
}


class PurchasedItemListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable purchased_items = [];
}


class VoucherListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable vouchers = [];
}

class EventListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable events = [];
}

class RootStore {
	constructor() {
		this.counterStore = new CounterStore(this);
	}
}

const singleton = new RootStore();
export default singleton;
