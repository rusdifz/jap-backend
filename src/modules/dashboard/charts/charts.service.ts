import { Injectable } from '@nestjs/common';

import { DashboardMasterLocationService } from '../master-location/master-location.service';
import { DashboardPropertiesService } from '../properties/services/properties.service';
import { FindManyOptions, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { dayjs, monthAgo, PropertiesDB } from 'src/common';

@Injectable()
export class ChartsService {
  constructor(
    private readonly masterLocationService: DashboardMasterLocationService,
    private readonly propertiesService: DashboardPropertiesService,
  ) {}

  async chartPropertyHasBeenUpdatedOneMonth() {
    const locations = await this.masterLocationService.getList({
      page: 1,
      limit: 500,
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

    return { charts };
  }

  //chart compare data update and not update (based 1 month)
  async pieChart() {
    const [propertiesOlderOneMonth, propertiesLastUpdate] = await Promise.all([
      this.propertiesService.CountData({
        updated_at: LessThanOrEqual(monthAgo),
      }),
      this.propertiesService.CountData({
        updated_at: MoreThanOrEqual(monthAgo),
      }),
    ]);

    return {
      chart: {
        olderOneMonth: propertiesOlderOneMonth,
        lastUpdate: propertiesLastUpdate,
      },
    };
  }

  async chartStatisticProperty() {
    const [locations, properties] = await Promise.all([
      this.masterLocationService.getList({ page: 1, limit: 500 }),
      this.propertiesService.getList({ page: 1, limit: 1000 }),
    ]);

    const charts = [];

    locations.data.forEach((location) => {
      const dataChart = {
        location: location.location_name,
        count: 0,
      };

      properties.data.forEach((property) => {
        if (property.location === location.location_name) {
          dataChart.count += 1;
        }
      });

      charts.push(dataChart);
    });

    return { charts: charts };
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
}
