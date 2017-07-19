const Queries = require('./index');

describe("implicit AND queries", () => {
    test('single field', () => {
        const query = Queries.SimpleQuery.create({id: 123}).toMongoQuery();
        expect(query).toMatchObject({id: 123});
    });

    test('multi-field', () => {
        const query = Queries.SimpleQuery.create({id: 123, version: 2, country:"Canada"}).toMongoQuery();
        expect(query).toEqual({id: 123, version: 2, country:"Canada"});
    });
})

describe("explicit AND queries", () => {
    test('single condition', () => {
        const query = Queries.Query.create().and({id: 123}).toMongoQuery();
        expect(query).toMatchObject({$and:[{id: 123}]});
    });

    test('multi-condition', () => {
        const query = Queries.Query.create().and({id: 123}, {version:2}).toMongoQuery();
        expect(query).toMatchObject({$and:[{id: 123},{version:2}]});
    });

    test('multi-condition chain', () => {
        const query = Queries.Query.create().and({id: 123}, {version:2}, {country:"canada"}).toMongoQuery();
        expect(query).toMatchObject({$and:[{id: 123},{version:2},{country:"canada"}]});
    });
})

describe("explicit OR queries", () => {
    test('single condition', () => {
        const query = Queries.Query.create().or({id: 123}).toMongoQuery();
        expect(query).toMatchObject({$or:[{id: 123}]});
    });

    test('multi-condition', () => {
        const query = Queries.Query.create().or({id: 123}, {version:2}).toMongoQuery();
        expect(query).toMatchObject({$or:[{id: 123},{version:2}]});
    });

    test('multi-condition chain', () => {
        const query = Queries.Query.create().or({id: 123}, {version:2}, {country:"canada"}).toMongoQuery();
        expect(query).toMatchObject({$or:[{id: 123},{version:2},{country:"canada"}]});
    });
})

describe("mixed conditional queries", () => {
    test('or & and condition', () => {
        const query = Queries.Query.create().or({id: 123}).and({version:2}).toMongoQuery();
        expect(query).toMatchObject({$or:[{id: 123}], $and:[{version:2}]});
    });

    test('and & or condition', () => {
        const query = Queries.Query.create().and({id: 123}).or({version:2}).toMongoQuery();
        expect(query).toMatchObject({$and:[{id: 123}], $or:[{version:2}]});
    });
})