import { NestFactory } from '@nestjs/core';
import { TodoModule } from './todo/todo.module';

const PORT = process.env.PORT;

async function bootstrap() {
    const app = await NestFactory.create(TodoModule);
    await app.listen(PORT);
}
bootstrap();
