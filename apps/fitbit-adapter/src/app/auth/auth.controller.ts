import { Controller, Get, Res, Req } from "@nestjs/common";
import { OuraAuthService } from "./auth.service";
import * as express from "express";
import { DatabaseService } from "../database/database.service";
import { AxiosOauth2Response } from "../../assets/shared";
import { AdapterAuthEntity } from "../entity/adapter-auth.entity";
import { Token } from "simple-oauth2";

@Controller("fitbit")
export class OuraAuthController {
  constructor(
    private readonly authService: OuraAuthService,
    private readonly databaseService: DatabaseService
  ) {}

  /** Redirect to Oura Login Page for the first part of the Oauth2 authorization workflow*/
  @Get()
  async redirect(@Res() res: express.Response) {
    return this.authService.redirect(res);
  }

  /** Callback URL for Oauth2 authorization workflow of the fitbit cloud */
  @Get("callback")
  async callback(@Req() req: express.Request) {
    let authResponse: Token;
    let authResponseEntity: AdapterAuthEntity;

    try {
      // retrieve whole authObject from cloud
      authResponse = await this.authService.getAccessToken(req);

      // transform it into etity
      authResponseEntity = this.databaseService.getAuthEntityFromAccessObject(
        authResponse
      );
    } catch (error) {
      console.error(`Error while requesting Access Token : ${error.message}`);
    }
    try {
      // get latest authorization entity
      const latestAuthEntity = await this.databaseService.getLatestAuthEntity();
      if (latestAuthEntity != undefined) {
        // An authEntity already exists in the DB
        authResponseEntity.id = latestAuthEntity.id;
      }

      await this.databaseService.saveAdapterAuthEntity(authResponseEntity);
    } catch (error) {
      console.error(
        `Error while saving Authorization details : ${error.message}`
      );
    }
  }
}
