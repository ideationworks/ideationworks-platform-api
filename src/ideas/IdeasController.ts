import { Body, Controller, Get, Post } from '@nestjs/common';
import { Idea } from './Idea';
import { IdeasService } from './IdeasService';

@Controller('/ideas')
export class IdeasController {

    public constructor(private ideasService: IdeasService) {

    }

    @Post()
    public create(@Body() idea: Idea): Promise<Idea> {

        console.log(idea);

        return this.ideasService.create(idea);

    }

    @Get()
    public search(): Promise<Array<Idea>> {

        return this.ideasService.search();

    }

}
