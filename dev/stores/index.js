// Stores: the state of everything in the App
// A store should contain multiple Models
// Everything is stored using 'mobx' state manager
import { observable, action, computed, autorun } from 'mobx';
import {
	LeaderModel,
	UserModel,
	LevelModel,
	ItemModel,
	MilestoneModel,
	PurchasedItemModel,
	VoucherModel,
	EventModel,
	QuestModel,
	TopUpItemModel
 } from '../models';

import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { DangerZone } from 'expo';
const { Payments } = DangerZone;

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

    async populateData() {
    	profile = this.rootStore.profileStore.profile;
    	this.user.name = `${profile.firstName} ${profile.lastName}`;
    	this.user.miles = 26028;
    	this.user.points = 42068;
    	this.user.level = 1;

		try {
		  	const value = await AsyncStorage.getItem('user_points');
		  	if (value !== null){
		  		this.user.points = parseInt(value);
		  	} else {
		  		const value = 42068;
				await AsyncStorage.setItem('user_points', value.toString());
				this.user.points = value;
		  	}
		} catch (error) {
			console.log("ERROR storing points");
			console.log(error.message);
		}

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

class QuestListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable quests = [
	    new QuestModel(
	        this,
	        'Fly 3 times to any city in the period of 6 months',
	        4000,
	        0.33,
	        false,
	    ),
	    new QuestModel(
	        this,
	        'Shop anything in total of $400 in KrisFlyerSpree',
	        2000,
	        0.2,
	        false,
	    ),
	    new QuestModel(
	        this,
	        'Try Singapore Stopover Holiday 3D2N Package',
	        2500,
	        0,
	        false,
	    ),
	    new QuestModel(
	        this,
	        'Fly to any city with Business Class',
	        3700,
	        0,
	        false,
	    ),
	    new QuestModel(
	        this,
	        'Purchase additional 10 kgs of baggage',
	        1000,
	        1,
	        true,
	    ),
	    new QuestModel(
	        this,
	        'Shop anything in total of $200 in KrisFlyerSpree',
	        500,
	        0.2,
	        true,
	    ),
	];
}

class ItemListStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	@observable items = [
		new ItemModel(this,
			0,
			'5% extra miles',
			'Get 5% extra miles for every flight that you fly',
			"• Valid for one time use only \n• Valid for 1 year after purchase\n• Voucher cannot be exchanged with money",
			'MULTIPLER',
			4375,
			0,
			'1 time'
		),
		new ItemModel(this,
			1,
			'Access to exclusive lounges',
			'Relax in comfort at more than 1,000 lounges around the world, even when you fly in Premium Economy or Economy Class with Singapore Airlines, SilkAir, Virgin Australia, Virgin Atlantic, Vistara, Star Alliance and Star Alliance Connecting Partner airlines',
			"• Valid for one time use only\n• Valid for 1 month after purchase\n• Voucher cannot be exchanged with money \n• Only applicable for members with more than 35,000 miles \n• Exclusives for KFholder. Cannot be handed to any relatives (Might require ID)",
			'ACCESS',
			12500,
			35000,
			'1 time'
		),
		new ItemModel(this,
			2,
			'Extra baggage - 5 Kg',
			'Extra baggage allowance up to 5 more Kg',
			"• Valid for one time use only \n• Valid for 1 year after purchase\n• Voucher cannot be exchanged with money",
			'ACCESS',
			9375,
			0,
			'1 time'
		),
		new ItemModel(this,
			3,
			'10% extra miles',
			'Get 10% extra miles for every flight that you fly',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'MULTIPLER',
			6250,
			15000,
			'1 year'
		),
		new ItemModel(this,
			4,
			'Priority reservation waitlist',
			'You’ll be one of the first to get a seat if someone doesn’t make the flight.',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'PRIORITY',
			10000,
			15000,
			'1 year'
		),
		new ItemModel(this,
			5,
			'Priority airport standby',
			'If you need to fly at the last minute and can’t get a confirmed reservation, you’ll be given priority on airport standby lists',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'PRIORITY',
			12500,
			15000,
			'1 year'
		),
		new ItemModel(this,
			6,
			'Priority airport check-in',
			'Get priority service at specially designated check-in counters which feature the KrisFlyer Elite Gold or Star Alliance logo, where available',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'PRIORITY',
			9375,
			40000,
			'1 time'
		),
		new ItemModel(this,
			7,
			'Priority boarding',
			'You’ll be invited to board the plane before other passengers, even when you travel in Premium Economy Class or Economy Class.',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'PRIORITY',
			6250,
			35000,
			'1 time'
		),
		new ItemModel(this,
			8,
			'Priority baggage handling',
			'Your baggage will be given priority handling, even when you travel in Premium Economy Class or Economy Class',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'PRIORITY',
			8750,
			40000,
			'1 time'
		),
		new ItemModel(this,
			9,
			'Extra baggage - 10 Kg',
			'Extra baggage allowance up to 10 more Kg',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'ACCESS',
			18750,
			40000,
			'1 time'
		),
		new ItemModel(this,
			10,
			'Extra baggage - 15 Kg',
			'Extra baggage allowance up to 15 more Kg',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'ACCESS',
			20000,
			40000,
			'1 time'
		),
		new ItemModel(this,
			10,
			'Seat upgrade',
			'Upgrade from economy to premium economy, premium economy to business, etc.',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'UPGRADE',
			15000,
			20000,
			'1 time'
		),
		new ItemModel(this,
			11,
			'Merchant voucher code',
			'Get valuable discounts for more than 100+ merhants partnering with Singapore Airlines',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			10000,
			20000,
			'1 time'
		),
		new ItemModel(this,
			12,
			'Flight discount 5%',
			'Get 5% discount with maximum of IDR 200.000',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			1875,
			20000,
			'1 time'
		),
		new ItemModel(this,
			13,
			'Flight discount 10%',
			'Get 5% discount with maximum of IDR 300.000',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			3125,
			20000,
			'1 time'
		),
		new ItemModel(this,
			14,
			'Flight discount 15%',
			'Get 5% discount with maximum of IDR 500.000',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			5000,
			20000,
			'1 time'
		),
		new ItemModel(this,
			15,
			'SIA Sticker',
			'Redeem points and get SIA merchandise',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			2500,
			20000,
			'1 time'
		),
		new ItemModel(this,
			16,
			'SIA T-shirts',
			'Redeem points and get SIA merchandise',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			10625,
			20000,
			'1 time'
		),
		new ItemModel(this,
			17,
			'SIA Tumblr',
			'Redeem points and get SIA merchandise',
			"Valid for one time use only \nValid for 1 year after purchase\nVoucher cannot be exchanged with money",
			'VOUCHER',
			7500,
			20000,
			'1 time'
		),
		new ItemModel(this,
			18,
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
		this.purchased_items = [];
	}

	@observable purchased_items = [];

	constructInitialItems0() {
		for(let i = 2; i < 15; i+=2) {
			const item = this.rootStore.itemListStore.items[i];
			this.purchased_items.push(new PurchasedItemModel(item, true));
		}
	}

	constructInitialItems1() {
		for(let i = 3; i < 19; i+=3) {
			const item = this.rootStore.itemListStore.items[i];
			this.purchased_items.push(new PurchasedItemModel(item, true));
		}
	}

	async constructInitialItems() {
        let items = []
        try {
            const value = await AsyncStorage.getItem('user_items');
            if (value !== null){
                items = JSON.parse(value);
            } else {
                const value = [];
                await AsyncStorage.setItem('user_items', JSON.stringify(value));
                items = value;
            }
        } catch (error) {
            console.log("ERROR getting/storing items");
            console.log(error.message);
        }

        for(item of items) {
            console.log('pushing items=');
            const item_obj = this.rootStore.itemListStore.items[item];
            this.purchased_items.push(new PurchasedItemModel(item_obj));
        }

		const item0 = this.rootStore.itemListStore.items[0];
		const item1 = this.rootStore.itemListStore.items[1];
		this.purchased_items.push(new PurchasedItemModel(item0, true));
		this.purchased_items.push(new PurchasedItemModel(item1, true));		
	}

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

	@observable leaders = [];

	constructLeaderboard() {

		leaders = [
			new LeaderModel(
				'Shylla E. Pramadhani',
				29965,
				new PurchasedItemListStore(this.rootStore)
			),
			new LeaderModel(
				'Michael Jones', 12742,
				new PurchasedItemListStore(this.rootStore)
			),
			new LeaderModel(
				'Tim Nguyen',
				24912,
				new PurchasedItemListStore(this.rootStore)
			),
			new LeaderModel(
				this.rootStore.userStore.user.name,
				this.rootStore.userStore.user.miles,
				this.rootStore.purchasedItemListStore
			),
			new LeaderModel(
				'Kim Seok-Hyeo',
				14291,
				new PurchasedItemListStore(this.rootStore)
			),
			new LeaderModel(
				'Rini Tanyata',
				23780,
				new PurchasedItemListStore(this.rootStore)
			),
			new LeaderModel(
				'Joshua Arisio',
				18172,
				new PurchasedItemListStore(this.rootStore)
			),
			new LeaderModel(
				'Muhammad Anto',
				22459,
				new PurchasedItemListStore(this.rootStore)
			),
			new LeaderModel(
				'Satoshi Nakamoto',
				14864,
				new PurchasedItemListStore(this.rootStore)
			),
			new LeaderModel(
				'Muhammad Ridwan',
				28712,
				new PurchasedItemListStore(this.rootStore)
			)
		];
		leaders.sort((a,b) => {return b.miles - a.miles });
		leaders[0].purchased_item_list.constructInitialItems0();
		leaders[1].purchased_item_list.constructInitialItems1();
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

class PaymentStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	items = [
		new TopUpItemModel(this,
			25,
			'usd',
			3125,
			0,
			'3,125 pts'
			),
		new TopUpItemModel(this,
			50,
			'usd',
			6250,
			0,
			'6,250 pts'
			),
		new TopUpItemModel(this,
			100,
			'usd',
			12500,
			625,
			'12,500 pts'
			),
		new TopUpItemModel(this,
			150,
			'usd',
			18750,
			1875,
			'18,750 pts'
			),
		new TopUpItemModel(this,
			200,
			'usd',
			25000,
			3750,
			'25,000 pts'
			),
		new TopUpItemModel(this,
			300,
			'usd',
			37500,
			7500,
			'37,500 pts'
			)
	];

	async processPayment(request_data) {
		let req_params = request_data;

		var formData = [];
		for (var req_param in req_params) {
		  var encodedKey = encodeURIComponent(req_param);
		  var encodedValue = encodeURIComponent(req_params[req_param]);
		  formData.push(encodedKey + "=" + encodedValue);
		}

		formData = formData.join("&");

		console.log('FORM_DATA:');
		console.log(formData);

		let headers = {
      		'Authorization': 'Bearer sk_test_XHmq3WzIQlEY7XKUqMxU8Tgs',
      		'Accept': 'application/json',
      		'Content-Type': 'application/x-www-form-urlencoded'
  		};

		const response = await fetch('https://api.stripe.com/v1/charges', {
			method: 'post',
			body: formData,
			headers: new Headers(headers)
		});
	
		response_json = await response.json();
		return response_json;
	}

	async topUpPoints(item, card) {
		Payments.initialize({
  			publishableKey: 'pk_test_hs5Ps81j0IgUafTjCx0fuZvp' // Your Stripe publishable key
		});

		const params = {
		  // mandatory
		  // number: '4242424242424242',
		  // expMonth: 11,
		  // expYear: 17,
		  // cvc: '223',

		  number: card.number,
		  expMonth: card.expMonth,
		  expYear: card.expYear,
		  cvc: card.cvc,

		  // optional
		  name: 'Test User',
		  currency: 'usd',
		  addressLine1: '123 Test Street',
		  addressLine2: 'Apt. 5',
		  addressCity: 'Test City',
		  addressState: 'Test State',
		  addressCountry: 'Test Country',
		  addressZip: '55555',
		}

		const token = await Payments.createTokenWithCardAsync(params)

		const token_str = token['tokenId'];
		console.log("STRIPE PAYMENT TOKEN:");
		console.log(token_str);

		const request_data = {
			amount: item.amount * 100,
			currency: item.currency,
			description: item.description,
			source: token_str
		};

		let paymentResponse = await this.processPayment(request_data);

		console.log("PAYMENT RESPONSE:");
		console.log(paymentResponse);

		if(paymentResponse.status == 'succeeded') {
			Alert.alert('Payment succeeded',
				`You successfully purchased ${item.description} for USD ${item.amount}`);
	        user = this.rootStore.userStore.user;
	        await user.addPoints(item.points);
		} else {
			Alert.alert('Payment Error',
				'Could not connect to Payment Server');
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
		this.questListStore = new QuestListStore(this);
		this.paymentStore = new PaymentStore(this);


		this.profileStore = new ProfileStore(this);
		this.profileStore.fetchData();
	}
}

const singleton = new RootStore();

singleton.profileStore.fetchData();
singleton.purchasedItemListStore.constructInitialItems();
singleton.leaderListStore.constructLeaderboard();

export default singleton;
