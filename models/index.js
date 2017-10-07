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
    constructor(store, name, description, usage_type, price, expired) {
        this.store = store;
        this.id = Utils.uuid();
        this.name = name;
        this.description = description;
        this.usage_type = usage_type;
        this.price = price;
        this.expired = expired;
    }

    store = '';
    id = '';
    name = '';
    description = '';
    usage_type = '';
    price = 0;
    expired = false;

    @action buyItem() {

    }
}

export class PurchasedItemModel {
    constructor(item, user) {
        this.id = Utils.uuid();
        this.item = item;
        this.user = user;
    }

    id = '';
    item = '';
    user = '';
    @observable is_used = false;
    @observable used_datetime = '';
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
