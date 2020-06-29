import { Injectable }                     from '@nestjs/common';
import { InjectRepository }               from '@nestjs/typeorm';
import { ResourceAlreadyExistsException } from '../_lib/exceptions/ResourceAlreadyExistsException';
import { ResourceNotFoundException }      from '../_lib/exceptions/ResourceNotFoundException';
import { Category }                       from './Category';
import { CategoryRepository }             from './CategoryRepository';
import { FindManyOptions, FindOneOptions } from 'typeorm';


@Injectable()
export class CategoriesService {

    public constructor(@InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository) {

    }

    public async getById(id: string, options?: FindOneOptions<Category>): Promise<Category> {

        const category = await this.categoryRepository.findOne(id, options);

        if (category) {

            return category;

        } else {

            throw new ResourceNotFoundException(`Category with id: ${id} not found`);

        }

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
    public async create(category: Category): Promise<Category> {

        return new Promise(async (resolve, reject) => {

            this.getByName(category.name).catch(() => {

                resolve(this.categoryRepository.save(category));

            }).then(() => {

                reject(new ResourceAlreadyExistsException('category already exists'));

            });

        });

    }

    public async updateById(id: string, category:  Partial<Category>): Promise<Category> {


        if(category.name) {

            const categoryWithName = await this.categoryRepository.findOne({ where: { name: category.name } });

            if(categoryWithName) {

                throw new ResourceAlreadyExistsException("You should enter an unique name for the category");

            }else {

                const updatedResult = await this.categoryRepository.update(id, category);
                if (updatedResult && updatedResult.raw.affectedRows > 0) {
                    return this.getById(id);
                }
            }
        }else {

            const updatedResult = await this.categoryRepository.update(id, category);
            if (updatedResult && updatedResult.raw.affectedRows > 0) {
                return this.getById(id);
            }

        }


    }

    public findAndCount(query: FindManyOptions<Category>): Promise<[Category[], number]> {

        return this.categoryRepository.findAndCount(query);

    }

    public async deleteById(id: string) :Promise<void> {

        const affectedRows = await this.categoryRepository.delete({id});

        if(affectedRows.affected === 0) {

           throw new ResourceNotFoundException('category does not exist');

        }

    }

}

