const spec = require('./index');

describe("implicit AND queries", () => {
    test('single field', () => {
        const query = new spec.Query({id: 123}).toMongoQuery();
        expect(query).toMatchObject({id: 123});
    });

    test('multi-field', () => {
        const query = new spec.Query({id: 123, version: 2, country:"Canada"}).toMongoQuery();
        expect(query).toEqual({id: 123, version: 2, country:"Canada"});
    });

    test('multi-field alt creation', () => {
        const query = spec.Query.create({id: 123, version: 2, country:"Canada"}).toMongoQuery();
        expect(query).toEqual({id: 123, version: 2, country:"Canada"});
    });
})

describe("explicit AND queries", () => {
    test('single condition', () => {
        const query = spec.AndQuery.create({id: 123}).toMongoQuery();
        expect(query).toMatchObject({$and:[{id: 123}]});
    });

    test('multi-condition', () => {
        const query = spec.AndQuery.create({id: 123}).and({version:2}).toMongoQuery();
        expect(query).toMatchObject({$and:[{id: 123},{version:2}]});
    });

    // test('multi-field alt creation', () => {
    //     const query = spec.Query.create({id: 123, version: 2, country:"Canada"}).toMongoQuery();
    //     expect(query).toEqual({id: 123, version: 2, country:"Canada"});
    // });
})

// // id > 123 && (id: 123 || v: 2)
// const orQ1 = OrQuery.create(new Query({id: 123}));
// console.log("orQ1------------", orQ1.toMongoQuery());

// const orQ2 = OrQuery.create({id: 123});
// console.log("orQ2------------", orQ2.toMongoQuery());

// inside service
// const query = UpdateUsernameQuery.create(username, userID);
// this._collectionRepo.execute(query);





// multi-field 
// id == 123 & version = 2

// multi-field 
// id == 123 or version = 2
