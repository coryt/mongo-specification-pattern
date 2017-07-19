"use strict";

// class SimpleQuery extends BaseQuery {
//     constructor(obj) {
//         super();
//         this.criteria = Object.assign(this.criteria, obj);
//     }

//     static create(obj) {
//         return new SimpleQuery(obj);
//     }
// }

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
        return new OrQuery(query);
    }

    and(query) {
        return new AndQuery(this, query);
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
    constructor(obj) {
        super({$or:[]});
        if (typeof obj == "object" && obj.__proto__.constructor.name == "Query") {
            this.criteria.$or.push(obj.criteria);
        }
        else {
            this.criteria.$or.push(obj);
        }
        return this;
    }

    static create(query) {
        return new OrQuery(query);
    }
}

module.exports = {
    Query: Query,
    OrQuery: OrQuery,
    AndQuery: AndQuery    
}