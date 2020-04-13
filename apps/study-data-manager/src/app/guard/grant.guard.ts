import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus
} from '@nestjs/common';

import { GrantService } from '../grant/grant.service';
import { Reflector } from '@nestjs/core';
import { GrantedAction, DetailLevel } from '@audapret/shared';
import { GrantEntity } from '../entity/grant.entity';

@Injectable()
export class GrantGuard implements CanActivate {
  constructor(
    private readonly grantService: GrantService,
    private readonly reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request = context.switchToHttp().getRequest();
    let associatedGrant: GrantEntity;
    // (1) Check if requester is adapter
    if (request.headers.requester === 'adapter') {
      // (1.1) Set grant manually
      // IMPORTANT: As currently no registration exists for Adapters, the grant is hardcoded here.
      associatedGrant = {
        detailLevel: DetailLevel.DAILY_AGGREGATE,
        grantedActions: [GrantedAction.CREATE],
        isOwner: false,
        requester: request.headers.requester
      };
    } else {
      // (1.2) Check if grant exists for requester
      associatedGrant = await this.getGrant(request);
      if (!associatedGrant) {
        return false;
      }
    }

    // (2) Check whether the requested function requires the requester to be Owner
    const isOwner = this.reflector.get<boolean>(
      'isOwner',
      context.getHandler()
    );

    if (isOwner && !associatedGrant.isOwner) {
      return false;
    }

    // (3) Get the grantedActions that are required by the route that is going to be called
    const requiredGrantedActions = this.reflector.get<GrantedAction[]>(
      'grantedActions',
      context.getHandler()
    );

    // If route does not require any grant
    if (!requiredGrantedActions) {
      return true;
    }

    // (4) Check if the associated grant of the requester covers all actions the called route requires
    for (const requiredGrantedAction of requiredGrantedActions) {
      if (!associatedGrant.grantedActions.includes(requiredGrantedAction)) {
        return false;
      }
    }
    return true;
  }

  /**
   * @returns grant for requester if it exists
   * @throws Error if requester is not specified or no grant exists for requester
   */
  async getGrant(req: any) {
    const requester: string = req.headers.requester;

    if (requester === undefined) {
      throw new HttpException(
        'Unauthorized! Please specify the requester header',
        HttpStatus.UNAUTHORIZED
      );
    }
    const grantEntity = await this.grantService.findGrantByRequester(requester);
    if (grantEntity === undefined) {
      throw new HttpException(
        `Unauthorized! No grant exists for user: ${requester}`,
        HttpStatus.UNAUTHORIZED
      );
    }
    return grantEntity;
  }
}
