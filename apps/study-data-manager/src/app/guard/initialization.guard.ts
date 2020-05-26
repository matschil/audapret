import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class InitializationGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  /**
   * Checks if an owner grant already exists in the database and returns false if not
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if user of type owner already exists
    const owner = await this.userService.getOwner();

    if (owner) {
      return false;
    }
    return true;
  }
}
