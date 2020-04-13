import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { researcherName } from '../../assets/config';

@Injectable()
export class RequestStudyDataService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly httpService: HttpService
  ) {}
  getUserByName(username: string) {
    return this.userRepository.find({ where: { name: username } });
  }
  getAllUsers() {
    return this.userRepository.find();
  }
  requestStudyData(studyDataManagerAddress: string) {
    return this.httpService
      .get(studyDataManagerAddress + '/api/adapterData/all', {
        headers: {
          requester: researcherName
        }
      })
      .toPromise();
  }
}
