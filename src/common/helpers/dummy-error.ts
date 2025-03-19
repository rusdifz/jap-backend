import {
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';

export function dummyError(error: string) {
    if (error == 'internal_server_error') {
        throw new InternalServerErrorException('Something went wrong');
    }
    if (error == 'forbidden') {
        throw new ForbiddenException('Forbidden');
    }
    if (error == 'not_found') {
        throw new NotFoundException('Data not found');
    }
    if (error == 'unauthorized') {
        throw new NotFoundException('Unauthorized');
    }
}
