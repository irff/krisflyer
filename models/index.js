// Singular Model Store

import { observable, action, computed } from 'mobx';
import * as Utils from '../utils';

import { AsyncStorage } from 'react-native';
 
// Model concerning a single User
export class UserModel {
    constructor(store, name, miles, points, level) {
        this.store = store;
        this.id = Utils.uuid();
        this.name = name;
        this.miles = miles;
        this.points = points;
        this.level = level;
    }

    store = '';
    id = '';
    name = '';
    @observable miles = 0;
    @observable points = 0;
    @observable level = 0;
    @observable bonus_multiplier = 1;

    // Get Level Name
    @computed get getLevelName() {
        levels = this.store.rootStore.levelListStore.levels;
        return levels[this.level].name;
    }

    @computed get nextLevelName() {
        next_level = this.level + 1;
        levels = this.store.rootStore.levelListStore.levels;
        return levels[next_level].name;
    }

    @computed get getRemainingMiles() {
        next_level = this.level + 1;

        if(next_level <= 2) {
            levels = this.store.rootStore.levelListStore.levels;
            miles_required = levels[next_level].checkpoint - this.miles;
            return miles_required;
        } else {
            return 0;
        }
    }

    // Add miles to the current user by {value}
    // When miles reach certain threshold, advance to next level
    @action addMiles(value) {
        this.miles += value;
        levels = this.store.rootStore.levelListStore.levels;
        current_miles = this.miles;
        next_level = this.level + 1;
        
        if(next_level <= 2) {
            if(current_miles >= levels[next_level].checkpoint) {
                this.level = next_level;
                this.bonus_multiplier += levels[next_level].bonus_multiplier;
                console.log(`ADVANCING to ${next_level}`);
            }
            
        }

        console.log(`${this.level}, ${this.miles}, ${this.bonus_multiplier}`);
    }

    @action subtractMiles(value) {
        if(this.miles >= value) {
            this.miles -= value;            
        }
    }

    @action async addPoints(value) {
        this.points += (this.bonus_multiplier * value)
        
        try {
            await AsyncStorage.setItem('user_points', this.points.toString());
        } catch (error) {
            console.log("ERROR storing points (add points)");
            console.log(error.message);
        }
    }

    @action async subtractPoints(value) {
        if(this.points >= value) {
            this.points -= value;            
        }
        try {
            await AsyncStorage.setItem('user_points', this.points.toString());
        } catch (error) {
            console.log("ERROR storing points (subtract points)");
            console.log(error.message);
        }

    }
}


// A Single Level available in the KrisFlyer program
export class LevelModel {
    constructor(number, name, checkpoint, bonus_multiplier) {
        this.id = Utils.uuid();
        this.number = number;
        this.name = name;
        this.checkpoint = checkpoint;
        this.bonus_multiplier = bonus_multiplier;
    }

    bonus_multiplier = 0;
    id = '';
    number = 0;
    name = '';
    checkpoint = 0;
}

// A Single Milestone (with checkpoints & their rewards)
export class MilestoneModel {
    constructor(checkpoint, rewards) {
        this.id = Utils.uuid();
        this.checkpoint = checkpoint;
        this.rewards = rewards;
    }

    id = 0;
    checkpoint = 0;
    rewards = 0;    
}

// A Model concerning a single item available to buy
export class ItemModel {
    constructor(store, idx, name, description, terms, usage_type, price, miles_required, expired) {
        this.store = store;
        this.id = Utils.uuid();
        this.idx = idx;
        this.name = name;
        this.description = description;
        this.terms = terms;
        this.usage_type = usage_type;
        this.price = price;
        this.miles_required = miles_required;
        this.expired = expired;
    }

    store = '';
    id = '';
    idx = 0;
    name = '';
    description = ''; 
    terms = '';
    usage_type = '';
    price = 0;
    miles_required = 0;
    expired = false;

    @computed get isMilesEnough() {
        user = this.store.rootStore.userStore.user;
        return user.miles >= this.miles_required;
    }

    @computed get isPointsEnough() {
        user = this.store.rootStore.userStore.user;
        return user.points >= this.price;
    }

    @action async purchaseItem() {
        user = this.store.rootStore.userStore.user;
        if(this.isMilesEnough) {
            if(this.isPointsEnough) {
                this.store.rootStore.purchasedItemListStore.addPurchasedItem(this);
                user.subtractPoints(this.price);

                try {

                    const itemsStr = await AsyncStorage.getItem('user_items');
                    const items = JSON.parse(itemsStr);

                    items.push(this.idx);

                    await AsyncStorage.setItem('user_items', JSON.stringify(items));
                } catch (error) {
                    console.log("ERROR storing items");
                    console.log(error.message);
                }

            } else {
                throw new Error('You don\'t have enough points to redeem this item');
            }        
        } else {
            throw new Error('You don\'t have enough miles to redeem this item');
        }
    }
}

// Model that concerns the item already bought by User
export class PurchasedItemModel {
    constructor(item, invalidated=false) {
        this.purchase_date = new Date();
        this.expiry_date = new Date();
        this.expiry_date.setDate(this.expiry_date.getDate() + 30);
        this.id = Utils.uuid();
        this.item = item;

        if(invalidated) {
            this.invalidateItem();
        }
    }

    id = '';
    item = '';
    @observable purchase_date = '';
    @observable expiry_date = '';

    @observable is_invalidated = false;
    @observable invalidated_datetime = '';

    @computed get isExpired() {
        return this.expiry_date < new Date();
    }

    @action invalidateItem() {
        this.is_invalidated = true;
        this.invalidated_datetime = new Date(``);
    }

}

// Model that concerns a reward in the form of Voucher
export class VoucherModel {
    constructor(name, merchant, code, amount, type) {
        this.id = Utils.uuid();
        this.name = name;
        this.merchant = merchant;
        this.code = code;
        this.amount = amount;
        this.type = type;
    }

    id = '';
    name = '';
    merchant = '';
    code = '';
    amount = 0;
    type = '';
    @observable is_used = false;
    @observable used_datetime = '';
}

// An event with start and end time, used to trigger some action
export class EventModel {
    constructor(name, description, start_datetime, end_datetime, is_active) {
        this.id = Utils.uuid();
        this.name = name;
        this.description = description;
        this.start_datetime = start_datetime;
        this.end_datetime = end_datetime;
        this.is_active = is_active;
    }

    name = '';
    description = '';
    start_datetime = '';
    end_datetime = '';
    @observable is_active = false;  
}


// A model concerning a single entry in the leaderboard
export class LeaderModel {
    constructor(name, miles, purchased_item_list) {
        this.name = name,
        this.miles = miles,
        this.purchased_item_list = purchased_item_list;
    }

    name = '';
    miles = 0;
    purchased_item_list = '';
}
