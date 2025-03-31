import { GetListFeedbackDTO } from './dto/request.dto';
import { ClientFeedbackService } from './feedback.service';
export declare class ClientFeedbackController {
    private readonly service;
    constructor(service: ClientFeedbackService);
    getList(query: GetListFeedbackDTO): Promise<{
        data: import("./dto/response.dto").ResFeedback[];
        count: number;
    }>;
}
