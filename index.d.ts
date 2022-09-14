interface ObjectConstructor {
  entries<T>(o: T): Array<[keyof T, T[keyof T]]>;
}

type DeepPartial<T> = T extends object ? Partial<T> : T;
// Object.entries {id: 1, test: 2} => [['id', 1], ['test', 2]]

// interface Array<T> {
//   reduce<U>(
//     callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => { [T[0]]: U[T[0]] },
//     initialValue: U
//   ): U;
// }
