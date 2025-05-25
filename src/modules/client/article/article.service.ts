import { Injectable } from '@nestjs/common';

import { ArticleListDTO } from './dto/response.dto';

import { ResDetail, ResList } from './dto/response.dto';

import { mapDbToResDetail, mapDbToResList } from './mappings/view.mapping';

import { ClientArticleRepository } from './article.repository';
import { FindManyOptions } from 'typeorm';
import { ArticleDB, MediaReferenceType, StatusPublishEnum } from 'src/common';

import { DashboardImagesService } from 'src/modules/dashboard/images/images.service';

@Injectable()
export class ClientArticleService {
  constructor(
    private readonly repository: ClientArticleRepository,
    private readonly imageService: DashboardImagesService,
  ) {}

  // async getDetail(article_id: number): Promise<ResDetail> {
  //   const searchData = await this.repository.findOneBy({
  //     article_id,
  //     status_publish: StatusPublishEnum.PUBLISH,
  //   });
  //   return searchData ? await mapDbToResDetail(searchData) : null;
  // }

  async getDetail(slug: string): Promise<ResDetail> {
    const searchData = await this.repository.findOneBy({
      slug,
      status_publish: StatusPublishEnum.PUBLISH,
    });

    //panggil data images
    const images = await this.imageService.findImageJoin(
      searchData.article_id,
      MediaReferenceType.ACTIVITY,
    );

    return searchData ? await mapDbToResDetail(searchData, images) : null;
  }

  async getList(
    props: ArticleListDTO,
  ): Promise<{ data: ResList[]; count: number }> {
    // initiate empty where query
    let query: FindManyOptions<ArticleDB> = {
      where: {
        status_publish: StatusPublishEnum.PUBLISH,
      },
    };

    // sort & order query
    query = await this.repository.sort(query, props);

    // pagination query
    query = await this.repository.paginate(query, props);

    const searchData = await this.repository.findAndCount(query);

    const mapRes =
      searchData[0].length > 0 ? await mapDbToResList(searchData[0]) : [];

    return {
      data: mapRes,
      count: searchData[1],
    };
  }
}
