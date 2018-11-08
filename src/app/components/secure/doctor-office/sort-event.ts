
import {SortMeta} from './sort-meta';

export interface SortEvent {


  data: any[];
  mode: string;
  field: string;
  order: number;
  multiSortMeta: SortMeta[];
}
