import { FilterQuery } from "./FilterQuery"
import { Like } from "typeorm";

class Test {

    name: string;
    description: string;
    count: number;

}

describe('Filter Query', () => {

    const params = new FilterQuery<Test>();

    beforeAll(() => {

        params.fields = ['name', 'count'];
        params.q = { name: { $like: '%test' }, count: 10 };
        params.relations = ['relation_a', 'relation_b'];
        params.sort = { name: 'ASC' };

    });

    describe('No filter options', () => {

        it('Return Empty Object if no filters', () => {

            const options = params.getFindOneOptions();
            expect(options).toMatchObject({});

        });

    })

    describe('Fields Params', () => {

        it('No fields should be returned', () => {

            const options = params.getFindOneOptions({ fields: ['description'] });
            expect(options).toMatchObject({})

        });


        it('Fields should return', () => {

            const options = params.getFindOneOptions({ fields: ['name', 'description'] });
            expect(options).toMatchObject({ select: ['name'] });

        });

    });

    describe('Sort Param', () => {

        it('Sort should not return', () => {

            const options = params.getFindOneOptions({ sortBy: ['count'] });
            expect(options).toMatchObject({})

        });

        it('Sort should return', () => {

            const options = params.getFindOneOptions({ sortBy: ['name'] });
            expect(options).toMatchObject({ order: { name: 'ASC' } })

        });

    });

    describe('Relations Params', () => {

        it('No relations should be returned', () => {

            const options = params.getFindOneOptions({ relations: ['relation_c'] });
            expect(options).toMatchObject({})

        });

        it('Relations should return', () => {

            const options = params.getFindOneOptions({ relations: ['relation_a'] });
            expect(options).toMatchObject({ relations: ['relation_a'] });

        });

    });

    describe('Search `q` Param', () => {

        it('No search should be returned', () => {

            const options = params.getFindOneOptions({ queryFields: ['description'] });
            expect(options).toMatchObject({})

        });

        it('Search should return where query', () => {

            let options = params.getFindOneOptions({ queryFields: ['name'] });
            expect(options).toMatchObject({ where: { name: Like('%test') } });

            options = params.getFindOneOptions({ queryFields: ['count'] });
            expect(options).toMatchObject({ where: { count: 10 } });

            options = params.getFindOneOptions({ queryFields: ['name', 'count'] });
            expect(options).toMatchObject({ where: { name: Like('%test'), count: 10 } });

        });

    });

})