/* tslint:disable:import-spacing */
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
import { TagsController }          from './tags/TagsController';
import { TagsService }             from './tags/TagsService';
import { Tag }                     from './tags/Tag';
import { TagRepository }           from './tags/TagRepository';
import { UserAuthService }         from './auth/UserAuthService';
import { GithubController }        from './auth/github/GithubController';
import { GoogleController }        from './auth/google/GoogleController';
import { UsersAuthRepository }     from './auth/UsersAuthRepository';
import { UsersAuth }               from './auth/UsersAuth';
import { GithubStrategy }          from './auth/github/GithubStrategy';
import { GoogleStrategy }          from './auth/google/GoogleStrategy';
import { IdeaCommentService }      from './ideas/comments/IdeaCommentService';
import { IdeaCommentController }   from './ideas/comments/IdeaCommentController';
import { IdeaCommentRepository }   from './ideas/comments/IdeaCommentRepository';
import { IdeaComment }             from './ideas/comments/IdeaComment';
import { FacebookStrategy }        from './auth/facebook/FacebookStrategy';
import { FacebookController }      from './auth/facebook/FacebookController';
@Module({

    imports: [

        JwtModule.register({ secret: process.env.JWT_TOKEN }),

        TypeOrmModule.forRoot({

            type: 'mysql',
            host: process.env.DB_HOSTNAME || 'localhost',
            port: Number.parseInt(process.env.DB_PORT) || 3306,
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || 'mysql',
            database: process.env.DB_NAME || 'ideationworks',
            synchronize: process.env.DB_SYNCHRONIZE === 'true' || true,
            keepConnectionAlive: true,
            timezone: 'Z',
            entities: [

                Category,
                Idea,
                IdeaVote,
                User,
                Organization,
                Tag,
                UsersAuth,
                IdeaComment,

            ],

        }),

        TypeOrmModule.forFeature([

            CategoryRepository,
            IdeaRepository,
            IdeaVoteRespository,
            UserRepository,
            OrganizationRepository,
            TagRepository,
            UsersAuthRepository,
            IdeaCommentRepository,

        ]),

    ],

    controllers: [

        CategoriesController,
        IdeasController,
        IdeaVotesController,
        OrganizationsController,
        UsersController,
        TagsController,
        GoogleController,
        GithubController,
        FacebookController,
        IdeaCommentController,

    ],

    providers: [

        CategoriesService,
        IdeasService,
        IdeaVotesService,
        OrganizationsService,
        UsersService,
        AuthenticationService,
        TagsService,
        UserAuthService,
        GoogleStrategy,
        GithubStrategy,
        FacebookStrategy,
        IdeaCommentService,

    ],

})
export class AppModule {

}
