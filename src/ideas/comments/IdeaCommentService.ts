import { FindConditions } from 'typeorm';
import { ResourceNotFoundException } from './../../_lib/exceptions/ResourceNotFoundException';
import { IdeaCommentRepository } from './IdeaCommentRepository';
import { IdeasService } from '../IdeasService';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindManyOptions } from 'typeorm';
import { IdeaComment } from './IdeaComment';
import { OwnershipService } from 'src/_lib/decorators/Ownership';

@Injectable()
export class IdeaCommentService implements OwnershipService {

    public constructor(@InjectRepository(IdeaCommentRepository) private ideaCommentRepository: IdeaCommentRepository,
        private ideasService: IdeasService) {

    }

    public async getById(id: string, options?: FindOneOptions<IdeaComment>) {

        const comment = this.ideaCommentRepository.findOne(id, options);

        if (!comment) {

            throw new ResourceNotFoundException(`Comment with the ${id} not found`);

        }

        return comment;

    }

    public async create(comment: Partial<IdeaComment>): Promise<IdeaComment> {

        const idea = await this.ideasService.getById(comment.ideaId);

        return this.ideaCommentRepository.save(comment);

    }

    public async updateById(id: string, comment: Partial<IdeaComment>) {

        await this.ideaCommentRepository.update(id, comment);

        return this.getById(id);

    }

    public async update(condition: FindConditions<IdeaComment>, comment: Partial<IdeaComment>) {

        const result = await this.ideaCommentRepository.update(condition, comment);

        return this.ideaCommentRepository.findOne(condition);

    }

    public async deleteById(id: string, options?: FindOneOptions<IdeaComment>): Promise<void> {

        const comment = await this.ideaCommentRepository.findOne({ id, deleted: false }, options);

        if (!comment) {

            throw new NotFoundException(`The comment with the id: ${id} does not exist`);

        }

        comment.deleted = true;

        await this.ideaCommentRepository.save(comment);

    }

    public async findAndCount(query: FindManyOptions): Promise<[IdeaComment[], number]> {

        return this.ideaCommentRepository.findAndCount(query);

    }

    public async count(query: FindManyOptions<IdeaComment>) {

        return this.ideaCommentRepository.count(query);

    }

    public async isOwner(userId: any, commentId: any): Promise<boolean> {

        const count = await this.count({ where: { userId, id: commentId } });

        return count === 1;

    }

}
