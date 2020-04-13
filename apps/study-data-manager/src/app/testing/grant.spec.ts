import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import {
  AdapterPayloadDto,
  GrantPayloadDto,
  DetailLevel,
  GrantedAction
} from '@audapret/shared';
import { Validator } from 'jsonschema';
import { GrantEntity } from '../entity/grant.entity';

describe('Grant', () => {
  process.env.STUDY_DATA_MANAGER_DB = 'localhost';

  let app: INestApplication;
  const ownerGrant: GrantEntity = {
    requester: 'jestOwner',
    isOwner: true,
    detailLevel: DetailLevel.FULL,
    grantedActions: [
      GrantedAction.DELETE,
      GrantedAction.READ,
      GrantedAction.UPDATE
    ]
  };
  const validGrantPayload: GrantPayloadDto = {
    requester: 'jestRequester',
    detailLevel: DetailLevel.DAILY_AGGREGATE,
    grantedActions: [GrantedAction.READ]
  };

  let res: request.Response;

  beforeAll(async () => {
    // Instanciate Full Nest Runtime Environment
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = module.createNestApplication();
    await app.init();

    // manually create Owner Jest in DB through backdoor
    const ownerGrantEntity = (await request(app.getHttpServer())
      .post('/test/grant')
      .send(ownerGrant)
      .expect(201)).body;

    console.log(ownerGrantEntity);
  });

  describe('Test Grant creation', () => {
    it(`should successivly create grants for all detailLevels if requester is owner`, async () => {
      for (const grantedAction of Object.keys(GrantedAction)) {
        validGrantPayload.grantedActions = [GrantedAction[grantedAction]];
        res = await request(app.getHttpServer())
          .post('/grant')
          .send(validGrantPayload)
          .set('requester', 'jestOwner')
          .expect(201);
      }
    });

    it(`should deny creation of grant if requester is not owner`, async () => {
      for (const grantedAction of Object.keys(GrantedAction)) {
        validGrantPayload.grantedActions = [GrantedAction[grantedAction]];
        res = await request(app.getHttpServer())
          .post('/grant')
          .send(validGrantPayload)
          .set('requester', 'jestRequester')
          .expect(403);
      }
    });

    it(`should deny creation of grant if request payload is not valid`, async () => {
      const invalidGrantPaylod = validGrantPayload;
      delete invalidGrantPaylod.grantedActions;
      res = await request(app.getHttpServer())
        .post('/grant')
        .send(invalidGrantPaylod)
        .set('requester', 'jestOwner')
        .expect(400);
    });
  });

  afterAll(async () => {
    // Delete all GrantEntites that are were created during testing
    const grants: any[] = (await request(app.getHttpServer()).get(
      '/test/allGrants'
    )).body;
    const testGrants = grants.filter(
      grant => (<string>grant.requester).lastIndexOf('jest') >= 0
    );

    for (const testGrant of testGrants) {
      console.log(testGrant);
      await request(app.getHttpServer())
        .delete('/test/grant')
        .query({ id: testGrant.id });
    }
    await app.close();
  });
});
