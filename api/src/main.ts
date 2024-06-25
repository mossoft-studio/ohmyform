import { NestApplicationOptions, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cors from 'cors'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'
import {entities} from "./entity";

void (async () => {
  const options: NestApplicationOptions =  {
    bufferLogs: true,
  }

  const app = await NestFactory.create(AppModule, options)
  app.useLogger(app.get(Logger))
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,
    transform: true,
  }))
  app.enableCors({origin: '*'})
  app.getHttpAdapter().options('*', cors())

  console.log("Test log")
  console.log({
    synchronize: false,
    type: process.env.DATABASE_DRIVER,
    url: process.env.DATABASE_URL,
    database: type === 'sqlite' ? process.env.DATABASE_URL.replace('sqlite://', '') : undefined,
    ssl: process.env.DATABASE_SSL === 'true' ? {rejectUnauthorized: false} : false,
    entityPrefix: process.env.DATABASE_TABLE_PREFIX,
    logging: process.env.DATABASE_LOGGING === 'true',
    entities,
    migrations: [`${__dirname}/**/migrations/${migrationFolder}/**/*{.ts,.js}`],
    migrationsRun: prcess.env.DATABASE_MIGRATE,
  })

  await app.listen(process.env.PORT || 4100);
})()
