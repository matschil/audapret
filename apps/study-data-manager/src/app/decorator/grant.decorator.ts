import { SetMetadata } from '@nestjs/common';
import { GrantedAction } from '@audapret/shared';

export const Grants = (...grantedActions: GrantedAction[]) =>
  SetMetadata('grantedActions', grantedActions);
