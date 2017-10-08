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

    @observable user = new UserModel(this, 'Loading...', 0, 0, 0);

    @observable users = [
					new UserModel(this, 'Shylla E. Pramadhani', 10921, 0, 0),
					new UserModel(this, 'Michael Jones', 6781, 0, 0),
					new UserModel(this, 'Tim Nguyen', 4512, 0, 0),
					this.user,
					new UserModel(this, 'Jane Doe', 2153, 0, 0),
					new UserModel(this, 'Kim Seok-Hyeo', 4291, 0, 0)
    ];

    populateData() {
    	profile = this.rootStore.profileStore.profile;
    	this.user.name = `${profile.firstName} ${profile.lastName}`;
    	this.user.miles = 26028;
    	this.user.points = 42068;
    	this.user.level = 1;
    }
}

class LevelListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable levels = [
		new LevelModel(0, 'KrisFlyer', 0, 0),
		new LevelModel(1, 'KrisFlyer Elite Silver', 25000, 0.05),
		new LevelModel(2, 'KrisFlyer Elite Gold', 50000, 0.10)
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
			'5% extra miles',
			'Get 5% extra miles for every flight that you fly',
			"• Valid for one time use only \n• Valid for 1 year after purchase\n• Voucher cannot be exchanged with money",
			'MULTIPLER',
			4375,
			0,
			'1 time'
		),
		new ItemModel(this,
			'Access to exclusive lounges',
			'Relax in comfort at more than 1,000 lounges around the world, even when you fly in Premium Economy or Economy Class with Singapore Airlines, SilkAir, Virgin Australia, Virgin Atlantic, Vistara, Star Alliance and Star Alliance Connecting Partner airlines',
			"• Valid for one time use only\n• Valid for 1 month after purchase\n• Voucher cannot be exchanged with money \n• Only applicable for members with more than 35,000 miles \n• Exclusives for KFholder. Cannot be handed to any relatives (Might require ID)",
			'ACCESS',
			12500,
			0,
			'1 time'
		),
		new ItemModel(this,
			'Extra baggage - 5 Kg',
			'Extra baggage allowance up to 5 more Kg',
			"• Valid for one time use only \n• Valid for 1 year after purchase\n• Voucher cannot be exchanged with money",
			'ACCESS',
			9375,
			35000,
			'1 time'
		),
		new ItemModel(this,
			'10% extra miles',
			'Get 10% extra miles for every flight that you fly',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'MULTIPLER',
			6250,
			15000,
			'1 year'
		),
		new ItemModel(this,
			'Priority reservation waitlist',
			'You’ll be one of the first to get a seat if someone doesn’t make the flight.',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'PRIORITY',
			10000,
			15000,
			'1 year'
		),
		new ItemModel(this,
			'Priority airport standby',
			'If you need to fly at the last minute and can’t get a confirmed reservation, you’ll be given priority on airport standby lists',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'PRIORITY',
			12500,
			15000,
			'1 year'
		),
		new ItemModel(this,
			'Priority airport check-in',
			'Get priority service at specially designated check-in counters which feature the KrisFlyer Elite Gold or Star Alliance logo, where available',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'PRIORITY',
			9375,
			40000,
			'1 time'
		),
		new ItemModel(this,
			'Priority boarding',
			'You’ll be invited to board the plane before other passengers, even when you travel in Premium Economy Class or Economy Class.',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'PRIORITY',
			6250,
			35000,
			'1 time'
		),
		new ItemModel(this,
			'Priority baggage handling',
			'Your baggage will be given priority handling, even when you travel in Premium Economy Class or Economy Class',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'PRIORITY',
			8750,
			40000,
			'1 time'
		),
		new ItemModel(this,
			'Extra baggage - 10 Kg',
			'Extra baggage allowance up to 10 more Kg',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'ACCESS',
			18750,
			40000,
			'1 time'
		),
		new ItemModel(this,
			'Extra baggage - 15 Kg',
			'Extra baggage allowance up to 15 more Kg',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'ACCESS',
			20000,
			40000,
			'1 time'
		),
		new ItemModel(this,
			'Seat upgrade',
			'Upgrade from economy to premium economy, premium economy to business, etc.',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'UPGRADE',
			15000,
			20000,
			'1 time'
		),
		new ItemModel(this,
			'Merchant voucher code',
			'Get valuable discounts for more than 100+ merhants partnering with Singapore Airlines',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			10000,
			20000,
			'1 time'
		),
		new ItemModel(this,
			'Flight discount 5%',
			'Get 5% discount with maximum of IDR 200.000',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			1875,
			20000,
			'1 time'
		),
		new ItemModel(this,
			'Flight discount 10%',
			'Get 5% discount with maximum of IDR 300.000',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			3125,
			20000,
			'1 time'
		),
		new ItemModel(this,
			'Flight discount 15%',
			'Get 5% discount with maximum of IDR 500.000',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			5000,
			20000,
			'1 time'
		),
		new ItemModel(this,
			'SIA Sticker',
			'Redeem points and get SIA merchandise',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			2500,
			20000,
			'1 time'
		),
		new ItemModel(this,
			'SIA T-shirts',
			'Redeem points and get SIA merchandise',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			10625,
			20000,
			'1 time'
		),
		new ItemModel(this,
			'SIA Tumblr',
			'Redeem points and get SIA merchandise',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			7500,
			20000,
			'1 time'
		),
		new ItemModel(this,
			'SIA Notebook',
			'Redeem points and get SIA merchandise',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			4875,
			20000,
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

	leaders = [];

	constructLeaderboard() {

		leaders = [
			new LeaderModel(
				this.rootStore.userStore.users[0],
				new PurchasedItemListStore()
			),
			new LeaderModel(
				this.rootStore.userStore.users[1],
				new PurchasedItemListStore()
			),
			new LeaderModel(
				this.rootStore.userStore.users[2],
				new PurchasedItemListStore()
			),
			new LeaderModel(
				this.rootStore.userStore.users[3],
				new PurchasedItemListStore()
			),
			new LeaderModel(
				this.rootStore.userStore.users[4],
				new PurchasedItemListStore()
			)
		];
		this.leaders = leaders;
	}
}

class ProfileStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.loaded = false;
	}

	async fetchData() {
		const request = {
		  "request": {
		    "krisflyerNumber": "8987011905"
		  },
		  "clientUUID": "AnyUniqueStringToIdentifyTheRequest"
		};

		const headers = {
			"Content-Type": "application/json",
			"x-api-key": "du1yO8KLZm9PfFeg6OHQW8CFcpK1RMym3JXp78Uk"
		};

		const response = await fetch('https://apidev.singaporeair.com/appchallenge/krisflyer/getprofile', {
			method: 'post',
			body: JSON.stringify(request),
			headers: new Headers(headers)
		});

		response_json = await response.json();

		if(response_json.status == "SUCCESS") {
			this.profile = response_json.response;
			this.loaded = true;
			this.rootStore.userStore.populateData();

		} else {
			this.profile = {
				firstName : 'James',
				lastName : 'Morrison'
			};
			this.loaded = true;
			this.rootStore.userStore.populateData();
		}

	}
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


		this.profileStore = new ProfileStore(this);
		this.profileStore.fetchData();
	}
}

const singleton = new RootStore();

singleton.profileStore.fetchData();
singleton.leaderListStore.constructLeaderboard();

export default singleton;
