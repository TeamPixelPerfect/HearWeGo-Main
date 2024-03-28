// Count the number of commas in a string
export function countCommas(str: string): number {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ",") {
      count++;
    }
  }
  return count;
}


// Count non empty items in a array
export function countNonEmptyItems(arr: string[]): number {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      count++;
    }
  }
  return count;
}

// Check if a string is numeric
export function isNumeric(str: string): boolean {
  return !isNaN(parseFloat(str));
}
