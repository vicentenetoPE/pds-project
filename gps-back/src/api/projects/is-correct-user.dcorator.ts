import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IsCorrectUser =  createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        console.log(request)
        const user = request.user;

    }
);
