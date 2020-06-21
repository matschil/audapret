// Perform OAuth2 authentification with oura cloud
import { Injectable, HttpService } from "@nestjs/common";
import { OAuthClient, create } from "simple-oauth2";
import { redirectUri } from "../../assets/shared";
import { ouraCredentials, ouraUri } from "../../assets/config";

import * as express from "express";
import * as axiosOAuth from "axios-oauth-client";
import { AxiosOauth2Response } from "../../assets/shared";

@Injectable()
export class OuraAuthService {
  constructor(private readonly httpService: HttpService) {
    this.client = create(ouraCredentials);
  }
  client: OAuthClient;

  /**
   * Redirect requester to the authorization URL (Login Page) of the oura cloud.
   * First part of authorization workflow.
   */
  async redirect(res: express.Response) {
    console.log("authorization starting...");

    const authorizationUri = this.client.authorizationCode.authorizeURL({
      redirect_uri: redirectUri,
    });
    res.redirect(authorizationUri);
  }

  /**
   * Exchange authentification code for valid access token
   * second part of authorization workflow.
   */
  async getAccessToken(req: express.Request): Promise<AxiosOauth2Response> {
    // Split request URL at = to obtain its first query parameter (code)
    const authCode = req.originalUrl.split("=")[1].split("&")[0];

    try {
      const payload = {
        url: `${ouraUri}/oauth/token`,
        grant_type: "authorization_code",
        client_id: ouraCredentials.client.id,
        client_secret: ouraCredentials.client.secret,
        redirect_uri: redirectUri,
        code: authCode,
      };
      const getAuthorizationCode = axiosOAuth.client(
        this.httpService.axiosRef,
        payload
      );
      return getAuthorizationCode();
    } catch (error) {
      console.log(error.message);
    }
  }

  /** Refresh access token for oura cloud */
  async refreshAccessToken(refreshToken: string) {
    const getRefreshToken = axiosOAuth.client(this.httpService.axiosRef, {
      url: `${ouraUri}/oauth/token`,
      grant_type: "refresh_token",
      client_id: ouraCredentials.client.id,
      client_secret: ouraCredentials.client.secret,
      redirect_uri: redirectUri,
      refresh_token: refreshToken,
    });

    try {
      return getRefreshToken();
    } catch (error) {
      console.error(error.message);
    }
  }
}
