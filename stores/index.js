import { observable, action, computed } from 'mobx';
import {
	LeaderModel,
	UserModel,
	LevelModel,
	ItemModel,
	MilestoneModel,
	PurchasedItemModel,
	VoucherModel,
	EventModel
 } from '../models';

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

    @observable user = new UserModel(this, 'Tri Ahmad Irfan', 7192, 3675, 0);
}

class LevelListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable levels = [
		new LevelModel(0, 'KrisFlyer', 0, 0),
		new LevelModel(1, 'Kris Elite Silver', 25000, 0.05),
		new LevelModel(2, 'Kris Elite Gold', 50000, 0.10)
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

	@observable items = [
		new ItemModel(this,
			'10% extra miles',
			'Get 10% extra miles for every flight that you fly',
			'MULTIPLER',
			6250,
			'1 year'
		),
		new ItemModel(this,
			'Priority reservation waitlist',
			'You’ll be one of the first to get a seat if someone doesn’t make the flight.',
			'PRIORITY',
			10000,
			'1 year'
		),
		new ItemModel(this,
			'Priority airport standby',
			'If you need to fly at the last minute and can’t get a confirmed reservation, you’ll be given priority on airport standby lists',
			'PRIORITY',
			12500,
			'1 year'
		),
		new ItemModel(this,
			'Priority airport check-in',
			'Get priority service at specially designated check-in counters which feature the KrisFlyer Elite Gold or Star Alliance logo, where available',
			'PRIORITY',
			9375,
			'1 time'
		),
		new ItemModel(this,
			'Priority boarding',
			'You’ll be invited to board the plane before other passengers, even when you travel in Premium Economy Class or Economy Class.',
			'PRIORITY',
			6250,
			'1 time'
		),
		new ItemModel(this,
			'Priority baggage handling',
			'Your baggage will be given priority handling, even when you travel in Premium Economy Class or Economy Class',
			'PRIORITY',
			8750,
			'1 time'
		),
		new ItemModel(this,
			'Lounges Access',
			'Relax in comfort at more than 1,000 lounges around the world, even when you fly in Premium Economy or Economy Class with Singapore Airlines, SilkAir, Virgin Australia, Virgin Atlantic, Vistara, Star Alliance and Star Alliance Connecting Partner airlines',
			'ACCESS',
			12500,
			'1 time'
		),
		new ItemModel(this,
			'Extra baggage - 5 Kg',
			'Extra baggage allowance up to 5 more Kg',
			'ACCESS',
			9375,
			'1 time'
		),
		new ItemModel(this,
			'Extra baggage - 10 Kg',
			'Extra baggage allowance up to 10 more Kg',
			'ACCESS',
			18750,
			'1 time'
		),
		new ItemModel(this,
			'Extra baggage - 15 Kg',
			'Extra baggage allowance up to 15 more Kg',
			'ACCESS',
			20000,
			'1 time'
		),
		new ItemModel(this,
			'Seat upgrade',
			'Upgrade from economy to premium economy, premium economy to business, etc.',
			'UPGRADE',
			30000,
			'1 time'
		),
		new ItemModel(this,
			'Merchant voucher code',
			'Get valuable discounts for more than 100+ merhants partnering with Singapore Airlines',
			'VOUCHER',
			10000,
			'1 time'
		),
		new ItemModel(this,
			'Flight discount 5%',
			'Get 5% discount with maximum of IDR 200.000',
			'VOUCHER',
			1875,
			'1 time'
		),
		new ItemModel(this,
			'Flight discount 10%',
			'Get 5% discount with maximum of IDR 300.000',
			'VOUCHER',
			3125,
			'1 time'
		),
		new ItemModel(this,
			'Flight discount 15%',
			'Get 5% discount with maximum of IDR 500.000',
			'VOUCHER',
			5000,
			'1 time'
		),
		new ItemModel(this,
			'SIA Sticker',
			'Redeem points and get SIA merchandise',
			'VOUCHER',
			2500,
			'1 time'
		),
		new ItemModel(this,
			'SIA T-shirts',
			'Redeem points and get SIA merchandise',
			'VOUCHER',
			10625,
			'1 time'
		),
		new ItemModel(this,
			'SIA Tumblr',
			'Redeem points and get SIA merchandise',
			'VOUCHER',
			7500,
			'1 time'
		),
		new ItemModel(this,
			'SIA Notebook',
			'Redeem points and get SIA merchandise',
			'VOUCHER',
			4875,
			'1 time'
		),
	];
}


class PurchasedItemListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable purchased_items = [];

	addPurchasedItem(item) {
		this.purchased_items.push(new PurchasedItemModel(item));
	}
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

class LeaderListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	leaders = [
		new LeaderModel(
			new UserModel(this, 'Shylla E. Pramadhani', 10921, 0, 0),
			new PurchasedItemListStore()
		),
		new LeaderModel(
			new UserModel(this, 'Michael Jones', 6781, 0, 0),
			new PurchasedItemListStore()
		),
		new LeaderModel(
			new UserModel(this, 'Tim Nguyen', 4512, 0, 0),
			new PurchasedItemListStore()
		),
		new LeaderModel(
			new UserModel(this, 'Jane Doe', 2153, 0, 0),
			new PurchasedItemListStore()
		),
		new LeaderModel(
			new UserModel(this, 'Kim Seok-Hyeo', 4291, 0, 0),
			new PurchasedItemListStore()
		)
	];
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
		this.leaderListStore = new LeaderListStore(this);
	}
}

const singleton = new RootStore();
export default singleton;
