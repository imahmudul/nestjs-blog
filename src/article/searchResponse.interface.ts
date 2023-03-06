import { SearchBody } from './searchBody.interface';

export interface SearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: SearchBody;
    }>;
  };
}