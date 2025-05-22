"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const middlewares_1 = require("./middlewares");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        validateCustomDecorators: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.useGlobalInterceptors(new middlewares_1.ResponseSuccessInterceptor());
    app.useGlobalFilters(new middlewares_1.ResponseErrorInterceptor());
    app.useGlobalGuards(new middlewares_1.CommonHeaderGuard());
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: process.env.FRONTEND_URL,
        methods: 'GET,POST',
        allowedHeaders: 'Content-Type,Authorization',
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map