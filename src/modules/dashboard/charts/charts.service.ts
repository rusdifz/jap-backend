import { Injectable } from '@nestjs/common';
import {
  Between,
  FindManyOptions,
  LessThan,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';

import { ConditionUnitEnum, dayjs, monthAgo, PropertiesDB } from 'src/common';
import { ResDashboardHomeDTO } from './dto/response.dto';

import { DashboardMasterLocationService } from '../master-location/master-location.service';
import { DashboardPropertiesService } from '../properties/services/properties.service';
import { DashboardUnitsService } from '../units/units.service';

@Injectable()
export class ChartsService {
  constructor(
    private readonly masterLocationService: DashboardMasterLocationService,
    private readonly propertiesService: DashboardPropertiesService,
    private readonly unitsService: DashboardUnitsService,
  ) {}

  async chartPropertyHasBeenUpdatedOneMonth() {
    const locations = await this.masterLocationService.getList({
      page: 1,
      limit: 100,
    });

    const charts = [];

    for (const location of locations.data) {
      const countData = await this.propertiesService.CountData({
        location: location.location_name,
        updated_at: MoreThanOrEqual(monthAgo),
      });

      charts.push({
        location: location.location_name,
        count: countData,
      });
    }

    return charts;
  }

  async chartStatisticProperty() {
    const optionQuery: FindManyOptions<PropertiesDB> = {
      select: {
        property_id: true,
        location: true,
      },
      order: {
        updated_at: 'desc',
      },
      take: 500,
    };

    const [locations, properties] = await Promise.all([
      this.masterLocationService.getList({ page: 1, limit: 500 }),
      this.propertiesService.getListCustom(optionQuery),
    ]);

    const charts = [];

    locations.data.forEach((location) => {
      const dataChart = {
        location: location.location_name,
        count: 0,
      };

      properties.forEach((property) => {
        if (property.location === location.location_name) {
          dataChart.count += 1;
        }
      });

      charts.push(dataChart);
    });

    return charts;
  }

  async tabelProperty() {
    //order by last update

    const optionQuery: FindManyOptions<PropertiesDB> = {
      select: {
        property_id: true,
        name: true,
        location: true,
        updated_at: true,
      },
      order: {
        updated_at: 'desc',
      },
      take: 6,
    };

    let findData = await this.propertiesService.getListCustom(optionQuery);

    if (findData.length > 0) {
      findData = findData.map((dt) => {
        dt.updated_at = dayjs(dt.updated_at).format('MMMM D, YYYY');
        return dt;
      });
    }

    return findData;
  }

  async countSumPropertyBySize(type: string) {
    const locations = await this.masterLocationService.getList({
      page: 1,
      limit: 500,
    });

    let sizeQuery = {};

    if (type == 'a') {
      sizeQuery = { size: LessThanOrEqual(200) };
    } else if (type == 'b') {
      sizeQuery = { size: Between(200, 500) };
    } else if (type == 'c') {
      sizeQuery = { size: Between(500, 1000) };
    } else if (type == 'd') {
      sizeQuery = { size: MoreThanOrEqual(1000) };
    }

    const charts = [];

    locations.data.forEach(async (loc) => {
      const countData = await this.propertiesService.CountDataJoinTable({
        location: loc.location_name,
        units: sizeQuery,
      });

      charts.push({
        location: loc.location_name,
        count: countData,
      });
    });

    return charts;
  }

  // async homeDashboard(): Promise<ResDashboardHomeDTO> {
  async homeDashboard(): Promise<any> {
    const [
      hasBeenUpdated,
      listPropertyLastUpdated,
      statisticProperty,
      propertiesOlderOneMonth,
      propertiesLastUpdate,
      countUnitsFurnished,
      countUnitsBare,
      countUnitsPartition,
      sumSizeA,
      sumSizeB,
      sumSizeC,
      sumSizeD,
    ] = await Promise.all([
      this.chartPropertyHasBeenUpdatedOneMonth(),
      this.tabelProperty(),
      this.chartStatisticProperty(),
      this.propertiesService.CountData({
        updated_at: LessThanOrEqual(monthAgo),
      }),
      this.propertiesService.CountData({
        updated_at: MoreThanOrEqual(monthAgo),
      }),
      this.unitsService.countData({ condition: ConditionUnitEnum.FURNISHED }),
      this.unitsService.countData({ condition: ConditionUnitEnum.BARE }),
      this.unitsService.countData({ condition: ConditionUnitEnum.PARTITION }),
      this.countSumPropertyBySize('a'),
      this.countSumPropertyBySize('b'),
      this.countSumPropertyBySize('c'),
      this.countSumPropertyBySize('d'),
    ]);

    return {
      charts: {
        hasBeenUpdated: hasBeenUpdated,
        pieCharts: {
          statisctisUpdated: {
            olderOneMonth: propertiesOlderOneMonth,
            lastUpdate: propertiesLastUpdate,
          },
          units: [
            {
              status: ConditionUnitEnum.FURNISHED,
              count: countUnitsFurnished,
            },
            {
              status: ConditionUnitEnum.BARE,
              count: countUnitsBare,
            },
            {
              status: ConditionUnitEnum.PARTITION,
              count: countUnitsPartition,
            },
          ],
          luasan: {
            a: sumSizeA,
            b: sumSizeB,
            c: sumSizeC,
            d: sumSizeD,
          },
        },
        jumlahProperty: statisticProperty,
      },
      tabels: listPropertyLastUpdated,
    };
  }
}
