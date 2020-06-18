import { FieldError } from './FieldError';
/**
 *
 * Class to provide a way to return a standar error related to fields
 * Following the same structure provided by Nest DTO validation
 *
 */
export class FieldErrors {

    private errorsDictionary: { [key: string]: FieldError } = {};

    /**
     *
     * @param property property name
     * @param value property value
     * @param constrain name of the constrain
     * @param message message in the constrain
     */
    constructor(property: string, value: string, constrain: string, message: string) {

        this.add(property, value, constrain, message);

    }

    /**
     * Method to add errors
     * Errors stack for the same property
     * @param property property name
     * @param value property value
     * @param constrain name of the constrain
     * @param message message in the constrain
     */
    add(property: string, value: string, constrain: string, message: string) {

        const field = this.errorsDictionary[property];

        if (field) {

            field.constraints[constrain] = message;

        } else {

            this.errorsDictionary[property] = {

                value,
                property,
                constraints: {

                    [constrain]: message,

                },

            };

        }

    }

    get errors(): FieldError[] {

        return Object.keys(this.errorsDictionary)
                     .map((key) => this.errorsDictionary[key]);

    }
}
