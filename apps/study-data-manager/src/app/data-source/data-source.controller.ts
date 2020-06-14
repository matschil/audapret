import { Controller, Get, UseGuards } from "@nestjs/common";
import { DataSourceService } from "./data-source.service";
import { DataSourceDto, GrantedAction } from "@audapret/shared";
import { DataSourceEntity } from "../entity/data-source.entity";
import { Grants } from "../decorator/grant.decorator";
import { JwtAuthGuard } from "../guard/jwt-auth.guard";

@Controller("dataSource")
export class DataSourceController {
  constructor(private readonly dataSourceService: DataSourceService) {}

  @Get("")
  /** @returns All DataSources (DataSourceDto[]) */
  @UseGuards(JwtAuthGuard)
  //@UseGuards(GrantGuard)
  @Grants(GrantedAction.READ)
  async getAllDataSources() {
    const dataSourceEntites: DataSourceEntity[] = await this.dataSourceService.getAllDataSources();
    const dataSourceDtos: DataSourceDto[] = dataSourceEntites.map(
      (dataSourceEntity) => dataSourceEntity.toDto()
    );
    return dataSourceDtos;
  }
}
