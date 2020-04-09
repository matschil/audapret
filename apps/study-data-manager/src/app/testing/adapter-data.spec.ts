import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { AdapterPayloadDto } from '@audapret/shared';
import { Validator } from 'jsonschema';

describe('Adapter Data', () => {
  let app: INestApplication;
  let initialPayload: AdapterPayloadDto = {
    content: JSON.stringify({ isValid: true, value: 'initial' }),
    description: 'testingPayload',
    source: 'jest'
  };
  let payloadWithSameSchema: AdapterPayloadDto = {
    content: JSON.stringify({ isValid: true, value: 'second schema' }),
    description: initialPayload.description,
    source: initialPayload.source
  };
  let payloadWithDiffSchema: AdapterPayloadDto = {
    content: JSON.stringify({ isValid: true, diff: 'different schema' }),
    description: initialPayload.description,
    source: initialPayload.source
  };
  let payloadWithDiffSourceAndSameSchema: AdapterPayloadDto = {
    content: payloadWithSameSchema.content,
    description: initialPayload.description,
    source: 'still jest'
  };
  let payloadWithDiffSourceAndDiffSchema: AdapterPayloadDto = {
    content: payloadWithDiffSchema.content,
    description: initialPayload.description,
    source: 'really still jest'
  };

  let invalidPayload = {
    cnt: initialPayload.content,
    dsc: initialPayload.description,
    src: initialPayload.source
  };
  let initialAdapterDataResponse: request.Response;
  let res: request.Response;
  let jsonValidator: Validator;

  beforeAll(async () => {
    // Set environment to testing
    process.env.NODE_ENV = 'testing';
    process.env.STUDY_DATA_MANAGER_DB = 'localhost';

    // Instanciate Full Nest Runtime Environment
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = module.createNestApplication();
    await app.init();
    console.log(app);

    // Post valid adapterPayloadDto to /adapterData
    initialAdapterDataResponse = await request(app.getHttpServer())
      .post('/adapterData')
      .send(initialPayload)
      .expect(201);

    jsonValidator = new Validator();
  });

  describe('Send inital payload for new Data Source', () => {
    it(`should have persisted the initial adapterPayloadDto accordingly`, async () => {
      res = await request(app.getHttpServer())
        .get('/test/nestedAdapterData')
        .query({ id: initialAdapterDataResponse.body.id })
        .expect(200);
      expect(res.body.content).toEqual(JSON.parse(initialPayload.content));
    });

    it(`should have persisted a valid contentSchema for the initial payload`, async () => {
      res = await request(app.getHttpServer())
        .get('/test/nestedAdapterData')
        .query({ id: initialAdapterDataResponse.body.id })
        .expect(200);
      const contentSchema = res.body.contentSchema.schema;
      //const options: Options

      expect(
        jsonValidator.validate(
          JSON.parse(initialPayload.content),
          contentSchema
        ).valid
      ).toBeTruthy();
    });

    it(`should have persisted the corresponding DataSource for the ContentSchema of the initial payload`, async () => {
      res = await request(app.getHttpServer())
        .get('/test/nestedContentSchema')
        .query({ id: initialAdapterDataResponse.body.contentSchema.id })
        .expect(200);
      const dataSource = res.body.dataSource;
      expect(dataSource.source).toEqual(initialPayload.source);
    });
  });

  describe('Send new payload for initial ContentSchema', () => {
    let adapterDataResponse: request.Response;
    beforeAll(async () => {
      // Post new adapterPayloadDto with initial schema to /adapterData
      adapterDataResponse = await request(app.getHttpServer())
        .post('/adapterData')
        .send(payloadWithSameSchema)
        .expect(201);
    });
    it(`should have related the new adapterData to the initial schema`, async () => {
      res = await request(app.getHttpServer())
        .get('/test/nestedAdapterData')
        .query({ id: adapterDataResponse.body.id })
        .expect(200);
      const schemaOfNewData = res.body.contentSchema;
      expect(schemaOfNewData).toEqual({
        id: initialAdapterDataResponse.body.contentSchema.id,
        schema: initialAdapterDataResponse.body.contentSchema.schema
      });
    });
  });

  describe('Send new payload for new ContentSchema of initial Data Source', () => {
    let adapterDataResponse: request.Response;
    beforeAll(async () => {
      // Post new adapterPayloadDto with different schema and initial source to /adapterData
      adapterDataResponse = await request(app.getHttpServer())
        .post('/adapterData')
        .send(payloadWithDiffSchema)
        .expect(201);
    });
    it(`should have persisted a new schema`, async () => {
      res = await request(app.getHttpServer())
        .get('/test/nestedAdapterData')
        .query({ id: adapterDataResponse.body.id })
        .expect(200);
      const schemaOfNewData = res.body.contentSchema;
      expect(schemaOfNewData.schema).not.toEqual(
        initialAdapterDataResponse.body.contentSchema.schema
      );
    });

    it(`should have related the new schema to the initial Data Source`, async () => {
      const newSchemaId = adapterDataResponse.body.contentSchema.id;
      res = await request(app.getHttpServer())
        .get('/test/nestedContentSchema')
        .query({ id: newSchemaId })
        .expect(200);
      const dataSourceOfNewSchema = res.body.dataSource;

      const initialSchemaId = initialAdapterDataResponse.body.contentSchema.id;
      res = await request(app.getHttpServer())
        .get('/test/nestedContentSchema')
        .query({ id: initialSchemaId })
        .expect(200);
      const dataSourceOfInitialSchema = res.body.dataSource;

      expect(dataSourceOfNewSchema).toEqual(dataSourceOfInitialSchema);
    });
  });

  describe('Send new payload for new ContentSchema of new Data Source', () => {
    let diffSchemaResponse: request.Response;
    let sameSchemaResponse: request.Response;
    beforeAll(async () => {
      // Post new adapterPayloadDto with different schema and initial source to /adapterData
      sameSchemaResponse = await request(app.getHttpServer())
        .post('/adapterData')
        .send(payloadWithDiffSourceAndSameSchema)
        .expect(201);
      diffSchemaResponse = await request(app.getHttpServer())
        .post('/adapterData')
        .send(payloadWithDiffSourceAndDiffSchema)
        .expect(201);
    });

    it(`should have created a new schema and a new data source for a new payload with same schema of initial payload but different source`, async () => {
      res = await request(app.getHttpServer())
        .get('/test/nestedAdapterData')
        .query({ id: sameSchemaResponse.body.id })
        .expect(200);
      const schemaOfNewData = res.body.contentSchema;
      expect(schemaOfNewData.id).not.toEqual(
        initialAdapterDataResponse.body.contentSchema.id
      );
    });

    it(`should have created a new schema and a new data source for a new payload with different schema of initial payload but different source`, async () => {
      res = await request(app.getHttpServer())
        .get('/test/nestedAdapterData')
        .query({ id: diffSchemaResponse.body.id })
        .expect(200);
      const schemaOfNewData = res.body.contentSchema;
      expect(schemaOfNewData.id).not.toEqual(
        initialAdapterDataResponse.body.contentSchema.id
      );
    });
  });

  it(`should deny POST Request of invalid payload to /adapterData`, async () => {
    await request(app.getHttpServer())
      .post('/adapterData')
      .send(invalidPayload)
      .expect(400);
  });

  afterAll(async () => {
    // Delete all AdapterDataEntities and ContentSchemaEntities that are were created during testing
    const dataSources: any[] = (await request(app.getHttpServer()).get(
      '/test/allDataSources'
    )).body;
    const testDataSources = dataSources.filter(
      dataSource => (<string>dataSource.source).lastIndexOf('jest') >= 0
    );

    for (const testDataSource of testDataSources) {
      await request(app.getHttpServer())
        .delete('/test/dataSource')
        .query({ id: testDataSource.id });
    }

    await app.close();
  });
});
