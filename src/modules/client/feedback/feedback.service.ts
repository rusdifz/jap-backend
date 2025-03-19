import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { GetListFeedbackDTO } from './dto/request.dto';

import { ResFeedback } from './dto/response.dto';
import { ClientFeedbackRepository } from './feedback.repository';
import { FeedbackDB } from 'src/common';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class ClientFeedbackService {
  constructor(private readonly repository: ClientFeedbackRepository) {}

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
}
