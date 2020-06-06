import { PaginationQuery } from "./PaginationQuery";

class Test {

    name: string;
    description: string;
    count: number;

}

describe('Pagination Query', () => {

    const params = new PaginationQuery<Test>();

    it('Retuns default size and ofset query', () => {

        const options = params.getFindManyOptions();
        expect(options).toMatchObject(expect.objectContaining({ take: 20, skip: 0 }));

    })

});