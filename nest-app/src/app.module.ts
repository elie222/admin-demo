import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<PostgresConnectionOptions> => {
        const config: PostgresConnectionOptions = {
          type: 'postgres',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME', 'postgres'),
          password: configService.get<string>(
            'DB_PASSWORD',
            'mysecretpassword',
          ),
          database: configService.get<string>('DB_DATABASE_NAME', 'admin_demo'),
          entities: ['dist/**/*.entity.js'],
          // this should be false in production
          synchronize: configService.get<boolean>('DB_SYNC', true),
          logging: configService.get<boolean>('TYPEORM_LOGGING', false),
          migrationsRun: false,
          migrations: ['dist/migration/*.js'],
          cli: {
            migrationsDir: 'migration',
          },
        };

        return config;
      },
      inject: [ConfigService],
    }),
    PostsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
