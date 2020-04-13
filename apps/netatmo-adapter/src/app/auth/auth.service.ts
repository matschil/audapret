import { Injectable } from '@nestjs/common';
import { create, OAuthClient, PasswordTokenConfig } from 'simple-oauth2';
import { netatmoCredentials, netatmoLogin } from '../../assets/config';

@Injectable()
export class AuthService {
  constructor() {
    this.client = create(netatmoCredentials);
  }
  client: OAuthClient;

  /** Get valid Oauth2 client-credentials token from Netatmo API */
  async getAccessToken(): Promise<string> {
    const tokenConfig: PasswordTokenConfig = {
      username: netatmoLogin.username,
      password: netatmoLogin.password,
      scope: ['read_station']
    };

    const result = await this.client.ownerPassword.getToken(tokenConfig);
    const accessToken = this.client.accessToken.create(result);
    return accessToken.token.access_token;
  }
}
