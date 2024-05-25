export type Transient<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
