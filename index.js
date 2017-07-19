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

class BaseQuery {
    constructor() {
        this.criteria = {};
    }

    toMongoQuery() {
        return this.criteria;
    }

    toJSON() {
        return `Query: ${JSON.stringify(this)}`;
    }
}

class SimpleQuery extends BaseQuery {
    constructor(criteria) {
        super();
        this.criteria = criteria;
    }

    static create(criteria) {
        return new SimpleQuery(criteria);
    }
}

class Query extends BaseQuery {
    constructor(criteria) {
        super();
        this.queries = [];
        if (criteria != null) {
            this.queries = [SimpleQuery.create(criteria)];
        }
    }

    static create(criteria) {
        return new Query(criteria);
    }

    or(...criteria) {
        this.queries.push(OrQuery.create(criteria));
        return this;
    }

    and(...criteria) {
        this.queries.push(AndQuery.create(criteria));
        return this;
    }

    toMongoQuery() {
        this.queries.forEach((query) => {
            const mongoQuery = query.toMongoQuery();
            Object.getOwnPropertyNames(mongoQuery).forEach((key) => {
                this.criteria[key] = mongoQuery[key];
            });
        });
        return super.toMongoQuery();
    }
}

class AndQuery extends BaseQuery {
    constructor(criteria) {
        super();
        this.criteria.$and = criteria;
    }

    static create(criteria) {
        return new AndQuery(criteria);
    }
}

class OrQuery extends BaseQuery {
    constructor(criteria) {
        super();
        this.criteria.$or = criteria;
    }

    static create(criteria) {
        return new OrQuery(criteria);
    }
}

module.exports = {
    Query: Query,
    SimpleQuery: SimpleQuery  
}