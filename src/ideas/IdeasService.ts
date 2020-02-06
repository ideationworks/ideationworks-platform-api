import { Injectable } from '@nestjs/common';
import { Idea } from './Idea';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaRepository } from './IdeaRepository';

@Injectable()
export class IdeasService {

    public constructor(@InjectRepository(Idea) private ideaRepository: IdeaRepository) {

    }

    public create(idea: Idea): Promise<Idea> {

        return this.ideaRepository.save(idea);

    }

    public search(): Promise<Array<Idea>> {

        return this.ideaRepository.find();

    }

}
