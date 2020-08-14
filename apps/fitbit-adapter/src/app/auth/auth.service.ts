// Perform OAuth2 authentification with fitbit cloud
import { Injectable, HttpService } from "@nestjs/common";
import { OAuthClient, create, Token } from "simple-oauth2";
import { redirectUri } from "../../assets/shared";
import { fitbitCredentials, fitbitUri } from "../../assets/config";

import * as express from "express";

@Injectable()
export class OuraAuthService {
  constructor(private readonly httpService: HttpService) {
    this.client = create(fitbitCredentials);
  }
  client: OAuthClient;

  /**
   * Redirect requester to the authorization URL (Login Page) of the fitbit cloud.
   * First part of authorization workflow.
   */
  async redirect(res: express.Response) {
    console.log("authorization starting...");

    const authorizationUri = this.client.authorizationCode.authorizeURL({
      redirect_uri: redirectUri,
      scope: ["activity", "sleep"],
    });
    res.redirect(authorizationUri);
  }

  /**
   * Exchange authentification code for valid access token
   * second part of authorization workflow.
   */
  async getAccessToken(req: express.Request): Promise<Token> {
    // Split request URL at = to obtain its first query parameter (code)
    const authCode = req.originalUrl.split("=")[1].split("&")[0];

    try {
      const headers = {
        Authorization: `Basic ${authCode}`,
      };
      const payload = {
        url: `${fitbitUri}/oauth/token`,
        grant_type: "authorization_code",
        //client_id: fitbitCredentials.client.id,
        //client_secret: fitbitCredentials.client.secret,
        redirect_uri: redirectUri,
        code: authCode,
      };
      const token = await this.client.authorizationCode.getToken(payload, {
        headers,
      });
      return token;
    } catch (error) {
      console.log(error.message);
    }
  }

  /** Refresh access token for fitbit cloud */
  async refreshAccessToken(refreshToken: string) {
    const token = this.client.accessToken.create({
      refresh_token: refreshToken,
    });
    try {
      const newToken = await this.client.authorizationCode.getToken({
        url: `${fitbitUri}/oauth/token`,
        grant_type: "refresh_token",
        redirect_uri: redirectUri,
        refresh_token: refreshToken,
      } as any);

      return newToken;
    } catch (error) {
      console.error(error.message);
    }
  }
}
