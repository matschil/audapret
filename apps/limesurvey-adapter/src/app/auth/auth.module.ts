import { Module, Global, HttpModule } from '@nestjs/common';
import { AuthService } from './auth.service';
@Global()
@Module({
  imports: [HttpModule],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
