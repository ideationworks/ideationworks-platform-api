import { Injectable }                     from '@nestjs/common';
import { InjectRepository }               from '@nestjs/typeorm';
import { ResourceAlreadyExistsException } from '../_lib/exceptions/ResourceAlreadyExistsException';
import { ResourceNotFoundException }      from '../_lib/exceptions/ResourceNotFoundException';
import { Category }                       from './Category';
import { CategoryRepository }             from './CategoryRepository';

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

}
