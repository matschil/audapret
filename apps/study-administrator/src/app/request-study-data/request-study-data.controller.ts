import { Controller, Get, Query } from "@nestjs/common";
import { RequestStudyDataService } from "./request-study-data.service";

@Controller("studyData")
export class RequestStudyDataController {
  constructor(
    private readonly requestStudyDataService: RequestStudyDataService
  ) {}
  /* 
  @Get("all")
  async getAllStudyData() {
    const allUsers = await this.requestStudyDataService.getAllUsers();
    const allStudyData = [];
    for (const user of allUsers) {
      try {
        const studyData = await this.requestStudyDataService.requestStudyData(
          user.studyDataManagerAddress
        );
        allStudyData.push(studyData.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    return allStudyData;
  } */

  @Get("forSource")
  async getStudyDataForDataSource(
    @Query("username") username: string,
    @Query("dataSource") dataSource: string
  ) {
    console.log("For Source");
    const user = await this.requestStudyDataService.getUserByName(username);
    try {
      const studyData = await this.requestStudyDataService.requestStudyDataOfSource(
        user[0].studyDataManagerAddress,
        dataSource
      );
      return studyData.data;
    } catch (error) {
      console.error(error.message);
    }
  }

  @Get("forUser")
  async getStudyDataForUser(@Query("username") username: string) {
    console.log("For User");
    const user = await this.requestStudyDataService.getUserByName(username);
    try {
      const studyData = await this.requestStudyDataService.requestStudyDataForUser(
        user[0].studyDataManagerAddress
      );
      return studyData.data;
    } catch (error) {
      console.error(error.message);
    }
  }

  @Get("dataSource")
  async getDataSources(@Query("username") username: string) {
    const user = await this.requestStudyDataService.getUserByName(username);
    try {
      const dataSources = await this.requestStudyDataService.requestDataSources(
        user[0].studyDataManagerAddress
      );
      console.log(dataSources.data);
      return dataSources.data;
    } catch (error) {
      console.error(error.message);
    }
  }
}
