import { NestFactory } from '@nestjs/core';
import { TodoModule } from './todo/todo.module';

async function bootstrap() {
    const app = await NestFactory.create(TodoModule);
    await app.listen(5000);
}
bootstrap();
