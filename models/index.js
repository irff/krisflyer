import { observable, action, computed } from 'mobx';
import * as Utils from '../utils';

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

    @computed get getLevelName() {
        levels = this.store.rootStore.levelListStore.levels;
        console.log(`wkwwk ${levels[this.level].name}`);
        return levels[this.level].name;
    }

    @computed get nextLevelName() {
        next_level = this.level + 1;
        levels = this.store.rootStore.levelListStore.levels;
        console.log(`wkwwk ${levels[this.level].name}`);
        return levels[next_level].name;
    }

    @computed get getRemainingMiles() {
        next_level = this.level + 1;

        console.log(`jebajeb`);
        if(next_level <= 2) {
            levels = this.store.rootStore.levelListStore.levels;
            miles_required = levels[next_level].checkpoint - this.miles;
            return miles_required;
        } else {
            return 0;
        }
    }

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

    @action addPoints(value) {
        this.points += (this.bonus_multiplier * value)
    }

    @action subtractPoints(value) {
        if(this.points >= value) {
            this.points -= value;            
        }
    }
}

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

export class ItemModel {
    constructor(store, name, description, terms, usage_type, price, miles_required, expired) {
        this.store = store;
        this.id = Utils.uuid();
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

    @action purchaseItem() {
        user = this.store.rootStore.userStore.user;
        if(this.isMilesEnough) {
            if(this.isPointsEnough) {
                this.store.rootStore.purchasedItemListStore.addPurchasedItem(this);
                user.points -= this.price;
            } else {
                throw new Error('You don\'t have enough points to redeem this item');
            }        
        } else {
            throw new Error('You don\'t have enough miles to redeem this item');
        }
    }
}

export class PurchasedItemModel {
    constructor(item) {
        this.purchase_date = new Date();
        this.expiry_date = new Date();
        this.expiry_date.setDate(this.expiry_date.getDate() + 30);
        this.id = Utils.uuid();
        this.item = item;
    }

    id = '';
    item = '';
    @observable purchase_date = '';
    @observable expiry_date = '';

    @observable is_invalidated = false;
    @observable invalidated_datetime = '';

    @computed get isExpired() {
        return expiry_date < new Date();
    }

    @action invalidateItem() {
        this.is_invalidated = true;
        this.invalidated_datetime = new Date(``);
    }

}

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


export class LeaderModel {
    constructor(user, purchased_item_list) {
        this.user = user;
        this.purchased_item_list = purchased_item_list;
    }

    user = '';
    purchased_item_list = '';
}
