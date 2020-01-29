import { Length } from 'class-validator';

export class OrganizationCreate {

    @Length(2, 255)
    public name: string;

}
