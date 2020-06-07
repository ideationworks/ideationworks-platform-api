import { IdeaVote } from "./votes/IdeaVote";
import { Idea } from "./Idea";
/**
 * Interface use to extend Idea Entity without modifying the Entity
 */
export interface UserVote {

    userVote?: IdeaVote

}

export type IdeaUserVote = Idea & UserVote;