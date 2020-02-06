import { Injectable }                from '@nestjs/common';
import { InjectRepository }          from '@nestjs/typeorm';
import { ResourceNotFoundException } from '../_lib/exceptions/ResourceNotFoundException';
import { Idea }                      from './Idea';
import { IdeaRepository }            from './IdeaRepository';

@Injectable()
export class IdeasService {

    public constructor(@InjectRepository(Idea) private ideaRepository: IdeaRepository) {

    }

    /**
     * Retrieve a single idea by it's id.
     *
     * @param {string} id
     *
     * @return {Promise<Idea>}
     */
    public getById(id: string): Promise<Idea> {

        return new Promise(async (resolve, reject) => {

            const idea = await this.ideaRepository.findOne({ where: { id } });

            if (idea) {

                resolve(idea);

            } else {

                reject(new ResourceNotFoundException('could not locate category'));

            }

        });

    }

    /**
     * Retrieve a single idea by it's name.
     *
     * @param {string} name
     *
     * @return {Promise<Idea>}
     */
    public getByName(name: string): Promise<Idea> {

        return new Promise(async (resolve, reject) => {

            const idea = await this.ideaRepository.findOne({ where: { name } });

            if (idea) {

                resolve(idea);

            } else {

                reject(new ResourceNotFoundException('could not locate idea'));

            }

        });

    }

    /**
     * Retrieve all ideas.
     *
     * @return {Promise<Array<Idea>>}
     */
    public getAll(): Promise<Array<Idea>> {

        return this.ideaRepository.find();

    }

    /**
     * Create a new idea.
     *
     * @param {Idea} idea
     *
     * @return {Promise<Idea>}
     */
    public create(idea: Idea): Promise<Idea> {

        return this.ideaRepository.save(idea);

    }

    /**
     * Search for ideas.
     *
     * @return {Promise<Array<Idea>>}
     */
    public search(): Promise<Array<Idea>> {

        return this.ideaRepository.find();

    }

}
