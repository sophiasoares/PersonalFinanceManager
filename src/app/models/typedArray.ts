export interface TypedArray<T> {
    type: 'expense' | 'income' | 'budget';
    data: T[];
}
  