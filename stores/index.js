import { observable, action, computed } from 'mobx';
import { UserModel, LevelModel, MilestoneModel } from '../models';

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

    @observable user = new UserModel('Tri Ahmad Irfan', 1250, 276, 0);
}

class LevelListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable levels = [
		new LevelModel(0, 'KrisFlyer', 0),
		new LevelModel(1, 'Kris Elite Silver', 25000),
		new LevelModel(2, 'Kris Elite Gold', 50000)
	];
}

class MilestoneListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable milestones = [
		new MilestoneModel(0, 100),
		new MilestoneModel(1000, 200),
		new MilestoneModel(5000, 300),
		new MilestoneModel(15000, 400),
		new MilestoneModel(35000, 500)
	];
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
		this.userStore = new UserStore(this);
		this.levelListStore = new LevelListStore(this);
		this.milestoneListStore = new MilestoneListStore(this);
		this.itemListStore = new ItemListStore(this);
		this.purchasedItemListStore = new PurchasedItemListStore(this);
		this.voucherListStore = new VoucherListStore(this);
		this.eventListStore = new EventListStore(this);
	}
}

const singleton = new RootStore();
export default singleton;
