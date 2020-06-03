import { Injectable, UnauthorizedException, Delete, Param, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceAlreadyExistsException } from '../_lib/exceptions/ResourceAlreadyExistsException';
import { ResourceNotFoundException } from '../_lib/exceptions/ResourceNotFoundException';

import { TagRepository } from './TagRepository';
import { Tag } from './Tag';
import { FindManyOptions, DeleteResult, UpdateResult } from 'typeorm';
import { TagStatus } from './TagStatus';

@Injectable()
export class TagsService {

    public constructor(@InjectRepository(TagRepository) private tagRepository: TagRepository) { }

    /**
     * Create a new Tag
     * 
     * @param {Tag} tag Tag  
     * 
     * @returns {Promise<User>}
     */
    public async create(tag: Partial<Tag>): Promise<Tag> {

        return this.tagRepository.save(tag);

    }

    public async UpdateById(id: string, tag: Partial<Tag>): Promise<Tag> {

        await this.tagRepository.update(id, tag);

        return this.findById(id);

    }

    /**
     * 
     * @param id Tag identifier
     * 
     */
    public async findById(id: string): Promise<Tag> {

        const tag = await this.tagRepository.findOne(id);

        if (!tag) throw new NotFoundException(`Record with id: ${id} not found`);

        return tag;

    }

    /**
     * 
     * Use to get records with the total count of items
     * @param options FindManyOptions
     * 
     */
    public findAndCount(options: FindManyOptions<Tag>): Promise<[Array<Tag>, number]> {
        
        return this.tagRepository.findAndCount(options)

    }

    /**
     * 
     * Use to delete a specific Tag
     * @param id Tag id
     * 
     */
    public async deleteById(id: string): Promise<void> {

        //
        // We apply soft delete to the tags in case we want to restore it later
        //

        const tag = await this.tagRepository.findOne({ id, deleted: false });

        if (!tag) throw new NotFoundException(`The tag with the id: ${id} does not exists`);

        tag.status = TagStatus.DELETED;
        tag.deleted = true;

        await this.tagRepository.save(tag);

    }
}
