import { observable, action, computed } from 'mobx';
import * as Utils from '../utils';

class UserModel {
    constructor(name, miles, points, level) {
        this.id = Utils.uuid();
        this.name = name;
        this.miles = miles;
        this.points = points;
        this.level = level;
    }

    id = '';
    name = '';
    @observable miles = 0;
    @observable points = 0;
    @observable level = 0;
}

class LevelModel {
    constructor(id, number, name, checkpoint) {
        this.id = Utils.uuid();
        this.number = number;
        this.name = name;
        this.checkpoint = 0;
    }

    id = '';
    number = 0;
    name = '';
    checkpoint = 0;
}

class MilestoneModel {
    constructor(id, checkpoint, rewards) {
        this.id = Utils.uuid();
        this.checkpoint = checkpoint;
        this.rewards = rewards;
    }

    id = 0;
    checkpoint = 0;
    rewards = 0;    
}

class ItemModel {
    constructor(id, name, description, usage_type, price, expired) {
        this.id = Utils.uuid();
        this.name = name;
        this.description = description;
        this.usage_type = usage_type;
        this.price = price;
        this.expired = expired;
    }

    id = '';
    name = '';
    description = '';
    usage_type = '';
    price = 0;
    expired = false;
}

class PurchasedItemModel {
    constructor(id, item, user) {
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

class VoucherModel {
    constructor(id, name, merchant, code, amount, type) {
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

class EventModel {
    constructor(id, name, description, start_datetime, end_datetime, is_active) {
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
