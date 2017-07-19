"use strict";

// class GreaterThanQuery extends BaseQuery {
//     constructor(key, value) {
//         super();
//         this.key = key;
//         this.value = value;
//     }

//     static create(key, name) {
//         return new GreaterThanQuery(key, name);
//     }

//     toMongoQuery() {
//         const query = {};
//         query[this.key] = {$gt: this.value};
//         return query;
//     }
// }

class Query {
    constructor(obj) {
        this.criteria = {};
        if (obj !== null) {
            this.criteria = Object.assign(this.criteria, obj);
        }
    }

    static create(obj) {
        return new Query(obj);
    }

    or(query) {
        return new OrQuery(this.criteria, query);
    }

    and(query) {
        return new AndQuery(this.criteria, query);
    }

    in(query) {
        return this;
    }
    
    not(query) {
        return this;
    }

    toString() {
        return `Query ${JSON.stringify(this)}`;
    }

    toMongoQuery() {
        return this.criteria;
    }
}

class AndQuery extends Query {
    constructor(criteria, obj) {
        super(criteria);
        if (this.criteria.$and == null) {
            this.criteria.$and = [];
        }
        if (typeof obj == "object" && obj.__proto__.constructor.name == "Query") {
            this.criteria.$and.push(obj.criteria);
        }
        else {
            this.criteria.$and.push(obj);
        }
        return this;
    }

    static create(query) {
        return new AndQuery({$and:[]}, query);
    }
}

class OrQuery extends Query {
    constructor(criteria, obj) {
        super(criteria);
        if (this.criteria.$or == null) {
            this.criteria.$or = [];
        }
        if (typeof obj == "object" && obj.__proto__.constructor.name == "Query") {
            this.criteria.$or.push(obj.criteria);
        }
        else {
            this.criteria.$or.push(obj);
        }
        return this;
    }

    static create(query) {
        return new OrQuery({$or:[]}, query);
    }
}

module.exports = {
    Query: Query,
    OrQuery: OrQuery,
    AndQuery: AndQuery    
}