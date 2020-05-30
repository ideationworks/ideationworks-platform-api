import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

/**
 * 
 * @param property name of the property to compare
 * @param ValidationOptions validation options object
 */
export function IsEqualTo(property: string, ValidationOptions?: ValidationOptions) {
    
    return function (object: Object, propertyName: string) {
        
        registerDecorator({

            name: 'isEqualTo',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: {
               
                message: `${property} must be equal to ${propertyName}`,
                ...ValidationOptions
            
            },
            validator: {
                
                validate(value: any, args: ValidationArguments) {

                    const [realtedPropertyName] = args.constraints;
                    const realtedValue = (args.object as any)[realtedPropertyName];
                    return realtedValue === value;
                
                }

            }

        });

    };

}