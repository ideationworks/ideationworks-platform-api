
import { createParamDecorator } from '@nestjs/common';

export const UserReq = createParamDecorator((data, req) => {

    return req.user;

});
