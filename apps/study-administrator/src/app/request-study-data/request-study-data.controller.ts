import { Controller, Get, Query } from '@nestjs/common';
import { RequestStudyDataService } from './request-study-data.service';

@Controller('studyData')
export class RequestStudyDataController {
  constructor(
    private readonly requestStudyDataService: RequestStudyDataService
  ) {}

  @Get('all')
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
  }

  @Get()
  async getStudyData(@Query('username') username: string) {
    const user = await this.requestStudyDataService.getUserByName(username);
    try {
      const studyData = await this.requestStudyDataService.requestStudyData(
        user[0].studyDataManagerAddress
      );
      return studyData.data;
    } catch (error) {
      console.error(error.message);
    }
  }
}
