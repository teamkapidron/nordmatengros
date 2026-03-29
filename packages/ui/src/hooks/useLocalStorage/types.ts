export type SetValue<T> = T | ((prev: T) => T);

export type UseLocalStorageReturn<T> = [
  T,
  (value: SetValue<T>) => void,
  () => void,
];
