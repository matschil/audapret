import { SetMetadata } from '@nestjs/common';

export const Owner = () => SetMetadata('isOwner', true);
