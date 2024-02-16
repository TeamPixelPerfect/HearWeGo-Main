export function countCommas(str: string): number {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ",") {
      count++;
    }
  }
  return count;
}

export function countNonEmptyItems(arr: string[]): number {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      count++;
    }
  }
  return count;
}
