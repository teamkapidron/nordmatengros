export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  isActive?: boolean;
  visibleToStore: boolean;
  parentId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface HierarchicalCategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  isActive?: boolean;
  visibleToStore: boolean;
  children?: HierarchicalCategory[];
}
