import { Injectable } from '@nestjs/common';

// import { MasterArticleService } from 'apps/master/src/modules/article/article.service';

import {
  ArticleListDTO,
  ReqCreateArticleDTO,
  ReqUpdateArticleDTO,
} from './dto/request.dto';
import { ResDetail, ResList } from './dto/response.dto';

import { mapDbToResDetail, mapDbToResList } from './mappings/view.mapping';

import { mapReqCreateToDB, mapReqUpdateToDB } from './mappings/upsert.mapping';
import { ArticleDB, IJwtUser } from 'src/common';
import { DashboardArticleRepository } from './article.repository';
import { FindManyOptions, Like } from 'typeorm';

@Injectable()
export class DashboardArticleService {
  constructor(private readonly repository: DashboardArticleRepository) {}

  async getDetail(article_id: number): Promise<ResDetail> {
    const searchData = await this.repository.findOneBy({ article_id });
    return searchData ? await mapDbToResDetail(searchData, []) : null;
  }

  async getList(
    props: ArticleListDTO,
  ): Promise<{ data: ResList[]; count: number }> {
    // initiate empty where query
    let query: FindManyOptions<ArticleDB> = {
      where: {},
    };

    // sort & order query
    query = await this.repository.sort(query, props);

    // pagination query
    query = await this.repository.paginate(query, props);

    if (props.search_keyword) {
      Object.assign(query.where, { title: Like(`%${props.search_keyword}%`) });
    }

    if (props.status_publish) {
      Object.assign(query.where, { status_publish: props.status_publish });
    }

    const searchData = await this.repository.findAndCount(query);

    const mapRes =
      searchData[0].length > 0 ? await mapDbToResList(searchData[0]) : [];

    return {
      data: mapRes,
      count: searchData[1],
    };
  }

  async create(
    body: ReqCreateArticleDTO,
    user: IJwtUser,
  ): Promise<ReqCreateArticleDTO> {
    const mapSave = await mapReqCreateToDB(body, user?.user.username);

    const saveData = await this.repository.save(mapSave);

    body['article_id'] = Number(saveData.article_id);

    return body;
  }

  async update(
    body: ReqUpdateArticleDTO,
    user: IJwtUser,
  ): Promise<ReqUpdateArticleDTO> {
    const mapUpdate = await mapReqUpdateToDB(body, user?.user.username);
    await this.repository.update(
      { article_id: mapUpdate.article_id },
      mapUpdate,
    );
    return body;
  }

  async delete(article_id: number, admin: IJwtUser): Promise<Object> {
    const [remove, updateLog] = await Promise.all([
      this.repository.softDelete({ article_id }),
      await this.repository.update(
        { article_id },
        { updated_by: admin?.user?.username ?? 'system' },
      ),
    ]);

    return remove.affected > 0 ? {} : null;
  }

  async updateImage(article_id: number, thumbnail: string) {
    return await this.repository.update({ article_id }, { thumbnail });
  }
}
