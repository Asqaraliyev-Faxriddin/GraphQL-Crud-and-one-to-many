import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PostService } from './modules/post/post.service';
import { PostModule } from './modules/post/post.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaService } from './core/prisma/prisma.service';
import { PrismaModule } from './core/prisma/prisma.module';
import {join}  from "path"
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      playground:true,
      graphiql:true,
      autoSchemaFile:join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError): GraphQLFormattedError => {

        // @ts-ignore
        const code = (error.extensions?.code || 'INTERNAL_SERVER_ERROR').toUpperCase();
      
       
        const status =
          error.message === 'this is user already exist' ? 409 :
          error.message === 'user not found' ? 404 :
          error.message === 'Validation' ? 400 :
          error.message === 'Token invalid' ? 401 :
          error.message === 'this is user vakolat yoq' ? 403 : 500; 
      
        return {
          message: error.message,
          extensions: {
            status,
          },
        };
      }
      
      
      
    }),   
    UserModule, PostModule, PrismaModule, 
  
 
      
  ],
  providers: [PrismaService],
})
export class AppModule {}
