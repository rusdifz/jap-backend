import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FeedbackDB, IJwtUser } from 'src/common';
import { GetListFeedbackDTO } from './dto/request.dto';

import { ResFeedback } from './dto/response.dto';
import { ReqCreateFeedbackDTO, ReqUpdateFeedbackDTO } from './dto/request.dto';
import { mapReqCreateToDB, mapReqUpdateToDB } from './mappings/upsert.mapping';
import { DashboardFeedbackRepository } from './feedback.repository';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class DashboardFeedbackService {
  constructor(private readonly repository: DashboardFeedbackRepository) {}

  async getOne(feedback_id: number): Promise<ResFeedback> {
    const feedback = await this.repository.findOneBy({ feedback_id });
    return feedback ? plainToInstance(ResFeedback, feedback, {}) : null;
  }

  async getList(
    props: GetListFeedbackDTO,
  ): Promise<{ data: ResFeedback[]; count: number }> {
    // initiate empty where query
    let query: FindManyOptions<FeedbackDB> = {
      where: {},
    };

    // sort & order query
    query = await this.repository.sort(query, props);

    // pagination query
    query = await this.repository.paginate(query, props);

    const searchData = await this.repository.findAndCount(query);

    const feedback =
      searchData[0].length > 0
        ? searchData[0].map((dt) => {
            return plainToInstance(ResFeedback, dt, {});
          })
        : [];

    return {
      data: feedback,
      count: searchData[1],
    };
  }

  async create(
    body: ReqCreateFeedbackDTO,
    admin: IJwtUser,
  ): Promise<ReqCreateFeedbackDTO> {
    const feedback = await mapReqCreateToDB(body, admin);

    const saveData = await this.repository.save(feedback);
    body['feedback_id'] = saveData.feedback_id;

    return body;
  }

  async update(
    body: ReqUpdateFeedbackDTO,
    admin: IJwtUser,
  ): Promise<ReqUpdateFeedbackDTO> {
    const feedback = await mapReqUpdateToDB(body, admin);
    await this.repository.update(
      { feedback_id: feedback.feedback_id },
      { ...feedback },
    );
    return body;
  }

  async delete(feedback_id: number, admin: IJwtUser): Promise<Object> {
    const del = await this.repository.softDelete({ feedback_id });

    if (del.affected > 0) {
      await this.repository.update(
        { feedback_id },
        { deleted_by: admin?.user?.username ?? 'system' },
      );
    }
    return del;
  }
}
