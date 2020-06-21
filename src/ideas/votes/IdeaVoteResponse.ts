import { BaseResponse } from "../../_lib/common/BaseResponse";
import { Expose, Type } from "class-transformer";
import { IdeaResponse } from "../IdeaResponse";
import { UserResponse } from "../../users/Response/UserResponse";

export class IdeaVoteResponse extends BaseResponse {

    @Expose()
    up: boolean;

    @Expose()
    @Type(() => IdeaResponse)
    idea: IdeaResponse

    @Expose()
    @Type(() => UserResponse)
    user: UserResponse

}