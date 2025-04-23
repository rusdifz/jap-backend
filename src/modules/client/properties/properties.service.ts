import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Like, UpdateResult } from 'typeorm';
import { PropertiesDTO } from './dto/request.dto';
import { mapDbToResDetail, mapDbToResList } from './mappings/view.mapping';
import { ResProperties, ResProperty } from './dto/response.dto';
import { ClientPropertiesRepository } from './properties.repository';
import { PropertiesDB, StatusPublishEnum } from 'src/common';

@Injectable()
export class ClientPropertiesService {
  constructor(private readonly repository: ClientPropertiesRepository) {}

  async getDetail(slug: string): Promise<ResProperty> {
    const query: FindOneOptions<PropertiesDB> = {
      where: {
        slug,
        status_publish: StatusPublishEnum.PUBLISH,
      },
      relations: {
        units: true,
        images: true,
      },
    };

    const property = await this.repository.findOne(query);
    return property ? await mapDbToResDetail(property) : null;
  }

  async getList(
    props: PropertiesDTO,
  ): Promise<{ data: ResProperties[]; count: number }> {
    // initiate empty where query
    let query: FindManyOptions<PropertiesDB> = {
      where: {
        status_publish: StatusPublishEnum.PUBLISH,
      },
      order: {
        created_at: 'desc',
      },
      relations: { units: true, images: true },
    };

    // sort & order query
    query = await this.repository.sort(query, props);

    // pagination query
    query = await this.repository.paginate(query, props);

    //assign query where
    if (props.amenities) {
      Object.assign(query.where, { amenities: Like(`%${props.amenities}%`) });
    }

    if (props.location) {
      Object.assign(query.where, { location: props.location.toLowerCase() });
    }

    if (props.property_type) {
      Object.assign(query.where, { property_type: props.property_type });
    }

    if (props.property_status) {
      // Object.assign(query.where, { property_type: props.property_status });
    }

    if (props.search_keyword) {
      Object.assign(query.where, { name: Like(`%${props.search_keyword}%`) });
    }

    const search = await this.repository.findAndCount(query);

    const properties =
      search[0].length > 0 ? await mapDbToResList(search[0]) : [];

    return { data: properties, count: search[1] };
  }
}
