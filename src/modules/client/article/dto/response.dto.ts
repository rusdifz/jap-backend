import { PaginationDTO, IArticle } from '../../../../common';

export class ArticleListDTO extends PaginationDTO {}

export class ResDetail implements Partial<IArticle> {}

export class ResList implements Partial<IArticle> {}
