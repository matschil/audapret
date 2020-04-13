import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GrantService } from '../grant/grant.service';

@Injectable()
export class InitializationGuard implements CanActivate {
  constructor(private readonly grantService: GrantService) {}

  /**
   * Checks if an owner grant already exists in the database and returns false if not
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if grant exists for requester
    const ownerGrant = await this.grantService.getOwnerGrant();

    if (ownerGrant) {
      return false;
    }
    return true;
  }
}
