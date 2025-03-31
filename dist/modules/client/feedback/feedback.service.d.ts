import { GetListFeedbackDTO } from './dto/request.dto';
import { ResFeedback } from './dto/response.dto';
import { ClientFeedbackRepository } from './feedback.repository';
export declare class ClientFeedbackService {
    private readonly repository;
    constructor(repository: ClientFeedbackRepository);
    getList(props: GetListFeedbackDTO): Promise<{
        data: ResFeedback[];
        count: number;
    }>;
}
