import { Injectable }                     from '@nestjs/common';
import { InjectRepository }               from '@nestjs/typeorm';
import { ResourceAlreadyExistsException } from '../_lib/exceptions/ResourceAlreadyExistsException';
import { ResourceNotFoundException }      from '../_lib/exceptions/ResourceNotFoundException';
import { Category }                       from './Category';
import { CategoryRepository }             from './CategoryRepository';
import { resolve } from 'dns';
import {DeleteResult, FindManyOptions} from 'typeorm';
import { UpdateCategory } from './UpdateCategory';
import { FilterCategoriesDto } from './FilterCategoriesDto';
import {Idea} from "../ideas/Idea";

@Injectable()
export class CategoriesService {

    public constructor(@InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository) {

    }

    public getById(id: string): Promise<Category> {

        return new Promise(async (resolve, reject) => {

            const category = await this.categoryRepository.findOne({ where: { id } });

            if (category) {

                resolve(category);

            } else {

                reject(new ResourceNotFoundException('could not locate category'));

            }

        });

    }

    public getByName(name: string): Promise<Category> {

        return new Promise(async (resolve, reject) => {

            const category = await this.categoryRepository.findOne({ where: { name } });

            if (category) {

                resolve(category);

            } else {

                reject(new ResourceNotFoundException('could not locate category'));

            }

        });

    }

    public getAll(): Promise<Array<Category>> {

        return this.categoryRepository.find();

    }

    public async create(category: Category): Promise<Category> {

        return new Promise(async (resolve, reject) => {

            this.getByName(category.name).catch(() => {

                resolve(this.categoryRepository.save(category));

            }).then(() => {

                reject(new ResourceAlreadyExistsException('category already exists'));

            });

        });

    }

    public async updateCategory(category: UpdateCategory): Promise<UpdateCategory> {

        return new Promise(async (resolve, reject) => {

            this.getById(category.id).catch(() => {

                reject(new ResourceNotFoundException('category does not exist'));

            }).then(() => {

                this.getByName(category.name).catch(async () => {

                    const updatedResult = await this.categoryRepository.update({ id: category.id }, category);

                    if(updatedResult.raw.affectedRows > 0) {
                        resolve(category);
                    }

                }).then(() => {

                    reject(new ResourceAlreadyExistsException('Category name already exists'));
                    
                })

            });

        });

    } 

    public async deleteCategory(id: string) :Promise<DeleteResult> {

        return new Promise(async (resolve, reject) => {

            const affectedRows = await this.categoryRepository.delete({id});

            if(affectedRows.affected === 0) {

                reject(new ResourceNotFoundException('category doesnot exist'));

            }
            else {

                resolve(affectedRows);

            }
        });
    }

    public getFilterCategories(query: FindManyOptions<Category>): Promise<[Category[], number]> {
            console.log(query)
        return this.categoryRepository.findAndCount(query);

    }

}

