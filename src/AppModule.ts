import { Module }                  from '@nestjs/common';
import { JwtModule }               from '@nestjs/jwt';
import { TypeOrmModule }           from '@nestjs/typeorm';
import { CategoriesController }    from './categories/CategoriesController';
import { CategoriesService }       from './categories/CategoriesService';
import { Category }                from './categories/Category';
import { CategoryRepository }      from './categories/CategoryRepository';
import { Idea }                    from './ideas/Idea';
import { IdeaRepository }          from './ideas/IdeaRepository';
import { IdeasController }         from './ideas/IdeasController';
import { IdeasService }            from './ideas/IdeasService';
import { IdeaVote }                from './ideas/votes/IdeaVote';
import { IdeaVoteRespository }     from './ideas/votes/IdeaVoteRespository';
import { IdeaVotesController }     from './ideas/votes/IdeaVotesController';
import { IdeaVotesService }        from './ideas/votes/IdeaVotesService';
import { Organization }            from './organizations/Organization';
import { OrganizationRepository }  from './organizations/OrganizationRepository';
import { OrganizationsController } from './organizations/OrganizationsController';
import { OrganizationsService }    from './organizations/OrganizationsService';
import { User }                    from './users/User';
import { UserRepository }          from './users/UserRepository';
import { UsersController }         from './users/UsersController';
import { UsersService }            from './users/UsersService';
import { AuthenticationService }   from './_lib/authentication/AuthenticationService';

@Module({

    imports: [

        JwtModule.register({ secret: 'changeme' }),

        TypeOrmModule.forRoot({

            type: 'mysql',
            host: process.env.DB_HOSTNAME || 'localhost',
            port: Number.parseInt(process.env.DB_PORT) || 3306,
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || 'mysql',
            database: process.env.DB_NAME || 'ideationworks',
            synchronize: process.env.DB_SYNCHRONIZE === 'true' || true,
            keepConnectionAlive: true,
            entities: [

                Category,
                Idea,
                IdeaVote,
                User,
                Organization,

            ]

        }),

        TypeOrmModule.forFeature([

            CategoryRepository,
            IdeaRepository,
            IdeaVoteRespository,
            UserRepository,
            OrganizationRepository

        ])

    ],

    controllers: [

        CategoriesController,
        IdeasController,
        IdeaVotesController,
        OrganizationsController,
        UsersController

    ],

    providers: [

        CategoriesService,
        IdeasService,
        IdeaVotesService,
        OrganizationsService,
        UsersService,
        AuthenticationService,

    ],

})
export class AppModule {

}
