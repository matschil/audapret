import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

import { Reflector } from "@nestjs/core";
import { GrantedAction, DetailLevel, UserType } from "@audapret/shared";
import { GrantEntity } from "../entity/grant.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class GrantGuard implements CanActivate {
  constructor(
    //private readonly grantService: GrantService,
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    /**
     * Should retrieve requesting user -> Somehow through token
     * Conduct the Check based on usr properties
     *
     */

    const request = context.switchToHttp().getRequest();
    let associatedGrant: GrantEntity;

    // (0) Get entity of requesting user
    const requestingUser = await this.userService.findUserByName(
      request.user.username
    );
    // (1) Check if requester is adapter
    // Todo! Fix adapters
    if (requestingUser.type === UserType.ADAPTER) {
      // (1.1) Set grant manually
      // IMPORTANT: As currently no registration exists for Adapters, the grant is hardcoded here.
      associatedGrant = {
        detailLevel: DetailLevel.DAILY_AGGREGATE,
        grantedActions: [GrantedAction.CREATE],
      };
    } else {
      // (1.2) Check if grant exists for requester
      if (!requestingUser.grant) {
        return false;
      }
    }

    // (2) Check whether the requested function requires the requester to be Owner
    const isOwner = this.reflector.get<boolean>(
      "isOwner",
      context.getHandler()
    );

    if (isOwner && !(requestingUser.type === UserType.OWNER)) {
      return false;
    }

    // (3) Get the grantedActions that are required by the route that is going to be called
    const requiredGrantedActions = this.reflector.get<GrantedAction[]>(
      "grantedActions",
      context.getHandler()
    );

    // If route does not require any grant
    if (!requiredGrantedActions) {
      return true;
    }

    // (4) Check if the associated grant of the requester covers all actions the called route requires
    const grantedActions = requestingUser.grant.grantedActions;
    for (const requiredGrantedAction of requiredGrantedActions) {
      if (!grantedActions.includes(requiredGrantedAction)) {
        return false;
      }
    }
    return true;
  }
}
