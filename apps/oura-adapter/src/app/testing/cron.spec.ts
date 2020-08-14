import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication, HttpService } from "@nestjs/common";
import { AppModule as AdapterModule } from "../app.module";
import { AppModule as StudyDataManagerModule } from "../../../../study-data-manager/src/app/app.module";
import {
  studyDataManagerAdapterDataPath,
  studyDataManagerPort,
} from "@audapret/shared";
import { OuraCategory } from "../../assets/shared";
import { OuraMetaDataDto } from "../../assets/meta-data.dto";

describe("Cron", () => {
  let adapterApp: INestApplication;
  let studyDataManagerApp: INestApplication;

  let res: request.Response;
  let httpService: HttpService;
  beforeAll(async () => {
    httpService = new HttpService();

    // Set environment
    process.env.NODE_ENV = "testing";
    process.env.STUDY_DATA_MANAGER_ADDRESS = "http://localhost";
    process.env.OURA_ADAPTER_DB = "localhost";
    process.env.OURA_ADAPTER_ADDRESS = "http://localhost";

    // Instanciate Full Nest Runtime Environment for OuraAdapter
    const adapterModule = await Test.createTestingModule({
      imports: [AdapterModule],
    }).compile();
    adapterApp = adapterModule.createNestApplication();
    await adapterApp.init();

    // Instanciate Full Nest Runtime Environment for StudyDataManager
    const studyDataManagerModule = await Test.createTestingModule({
      imports: [StudyDataManagerModule],
    }).compile();
    studyDataManagerApp = studyDataManagerModule.createNestApplication();
    await studyDataManagerApp.init();

    // Check if internet connection is available - throw error if not
    try {
      await httpService.get("https://www.google.com").toPromise();
    } catch (error) {
      throw new Error(
        `Test cannot be performed because there is no internet connection: ${error.message} `
      );
    }

    // Check if latest token is expired - throw error if it is
    res = await request(adapterApp.getHttpServer()).get("/test/authEntity");
    const expiration_date =
      res.body.updatedAt.valueOf() + res.body.expires_in * 100;
    if (expiration_date > Date.now()) {
      throw new Error(
        `Test cannot be performed because the OAUTH2 access token for the Oura CLoud has expired. Please renew it first `
      );
    }

    // Check if studyDataManager is running - throw error if not (Better would be: start studyDataManager individually)
    try {
      await httpService
        .get(`http://localhost:${studyDataManagerPort}/api/test/allDataSources`)
        .toPromise();
    } catch (error) {
      throw new Error(
        `Test cannot be performed because studyDataManager is not running: ${error.message}`
      );
    }

    // Clear AdapterData from studyDataManager DB
    await httpService
      .delete(
        `http://localhost:${studyDataManagerPort}/api/test/allAdapterData`
      )
      .toPromise();

    // Clear MetaEntities from oura-adapter DB
    await request(adapterApp.getHttpServer()).delete("/test/allMetaEntities");
  });

  describe("Trigger cron workflow on clear database (initially)", () => {
    it(`should successfully trigger the workflow`, async () => {
      res = await request(adapterApp.getHttpServer())
        .get("/cron/workflow")
        .expect(200);
    });
    it(`should have successfully persisted the new sent payload to the database of the studyDataManager`, async () => {
      const comparisonDate = Date.now();
      res = await request(studyDataManagerApp.getHttpServer())
        .get("/test/lastAdapterData")
        .query({ number: 1, source: "oura/sleep" })
        .expect(200);
      const latestCreationDate = new Date(res.body[0].createdAt);
      expect(comparisonDate - latestCreationDate.valueOf()).toBeLessThan(800);
    });

    it(`should have successfully stored the metadataEntity in the ouraAdapter database`, async () => {
      const metaDataEntity = (
        await request(adapterApp.getHttpServer())
          .get("/test/metaEntity")
          .query({ category: OuraCategory.SLEEP })
          .expect(200)
      ).body;
      expect(metaDataEntity).toBeDefined();
    });
  });
  describe("Trigger cron workflow the second time within a timespan < 1 day", () => {
    let lastRetrievalDate: Date;
    beforeAll(async () => {
      lastRetrievalDate = (
        await request(adapterApp.getHttpServer())
          .get("/test/metaEntity")
          .query({ category: OuraCategory.SLEEP })
          .expect(200)
      ).body.lastSuccessfulRetrieval;
    });

    it(`should successfully trigger the workflow`, async () => {
      res = await request(adapterApp.getHttpServer())
        .get("/cron/workflow")
        .expect(200);
    });

    it(`should not have successfully persisted the new sent payload to the database of the studyDataManager`, async () => {
      const comparisonDate = Date.now();
      res = await request(studyDataManagerApp.getHttpServer())
        .get("/test/lastAdapterData")
        .query({ number: 1, source: "oura/sleep" })
        .expect(200);
      const latestCreationDate = new Date(res.body[0].createdAt);
      expect(comparisonDate - latestCreationDate.valueOf()).toBeGreaterThan(
        800
      );
    });
    it(`should not have successfully changed the latestRetrieval date of the metaDataEntity in the ouraAdapter database`, async () => {
      const lastSuccessfulRetrieval = (
        await request(adapterApp.getHttpServer())
          .get("/test/metaEntity")
          .query({ category: OuraCategory.SLEEP })
          .expect(200)
      ).body.lastSuccessfulRetrieval;
      expect(lastSuccessfulRetrieval).toEqual(lastRetrievalDate);
    });

    describe("Trigger cron workflow the second time within a timespan > 1 day", () => {
      beforeAll(async () => {
        // Get metaDataId
        const metaDataId = (
          await request(adapterApp.getHttpServer())
            .get("/test/metaEntity")
            .query({ category: OuraCategory.SLEEP })
            .expect(200)
        ).body.id;

        // Modify lastSuccessfulRetrieval to a past Date < yesterday
        const lastSuccessfulRetrieval = new Date();
        lastSuccessfulRetrieval.setDate(lastSuccessfulRetrieval.getDate() - 5);
        const modifiedMetaData: OuraMetaDataDto = {
          category: OuraCategory.SLEEP,
          lastSuccessfulRetrieval: lastSuccessfulRetrieval,
        };
        // Update the metaEntitEntity to modified date
        const res = await request(adapterApp.getHttpServer())
          .put(`/test/metaEntity`)
          .query({ id: metaDataId })
          .send(modifiedMetaData)
          .expect(200);
      });
      it.skip(`should successfully trigger the workflow`, async () => {
        //this does not work
        res = await request(adapterApp.getHttpServer())
          .get("/cron/workflow")
          .expect(200);
      });
      it.skip(`should have successfully persisted the new sent payload to the database of the studyDataManager`, async () => {
        const comparisonDate = Date.now();
        res = await request(studyDataManagerApp.getHttpServer())
          .get("/test/lastAdapterData")
          .query({ number: 1, source: "oura/sleep" })
          .expect(200);
        const latestCreationDate = new Date(
          res.body[0].lastSuccessfulRetrieval
        );
        expect(comparisonDate - latestCreationDate.valueOf()).toBeLessThan(
          10000
        );
      });
    });
  });

  afterAll(async () => {
    await adapterApp.close();
    await studyDataManagerApp.close();
  });
});
