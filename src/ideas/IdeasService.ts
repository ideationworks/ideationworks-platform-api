import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceNotFoundException } from '../_lib/exceptions/ResourceNotFoundException';
import { Idea } from './Idea';
import { IdeaRepository } from './IdeaRepository';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CrudServiceBase } from '../_lib/common/crud/CrudServiceBase';
import { IdeaStatus } from './IdeaStatus';
import { TagsService } from '../tags/TagsService';
import { CategoriesService } from '../categories/CategoriesService';
import { Category } from 'src/categories/Category';


@Injectable()
export class IdeasService implements CrudServiceBase<Idea>{

    public constructor(
        @InjectRepository(Idea) private ideaRepository: IdeaRepository,
        private categoriesService: CategoriesService,
        private tagsService: TagsService,
    ) {

    }

    public async deleteById(id: string): Promise<void> {


        const idea = await this.ideaRepository.findOne({ id, deleted: false });

        if (!idea) throw new NotFoundException(`The idea with the id: ${id} does not exists`);

        idea.status = IdeaStatus.DELETED;
        idea.deleted = true;

        await this.ideaRepository.save(idea);

    }


    public async getById(id: string, options?: FindOneOptions<Idea>): Promise<Idea> {

        const idea = await this.ideaRepository.findOne(id, options);

        if (!idea) throw new ResourceNotFoundException(`Idea with id: ${id} not found`);

        return idea;

    }


    public async create(idea: Partial<Idea>): Promise<Idea> {

        const category = await this.categoriesService.getById(idea.categoryId);

        if (!category) throw new NotFoundException(`Category with id ${idea.categoryId} not found`)

        console.log(idea);

        return this.ideaRepository.save(idea);

    }

    public findAndCount(query: FindManyOptions<Idea>): Promise<[Idea[], number]> {

        return this.ideaRepository.findAndCount(query);

    }

    public async updateById(id: string, idea: Partial<Idea>): Promise<Idea> {

        await this.ideaRepository.update(id, idea);

        return this.getById(id);
    }


    public async linkTag(ideaId: string, tagId: string): Promise<void> {

        const idea = await this.getById(ideaId);

        const tag = await this.tagsService.getById(tagId);

        return this.ideaRepository
            .createQueryBuilder()
            .relation(Idea, 'tags')
            .of(idea)
            .add(tag);

    }

    public async unlinkTag(ideaId: string, tagId: string): Promise<void> {

        const idea = await this.getById(ideaId);

        const tag = await this.tagsService.getById(tagId);

        return this.ideaRepository
            .createQueryBuilder()
            .relation(Idea, 'tags')
            .of(idea)
            .remove(tag);

    }

}
