import {SortMeta} from './sort-meta';
import {FilterMetadata} from './filter-metadata';

export interface LazyLoadEvent {
  first?: number;
  rows?: number;
  sortField?: string;
  sortOrder?: number;
  multiSortMeta?: SortMeta[];
  filters?: {[s: string]: FilterMetadata;};
  globalFilter?: any;
}
