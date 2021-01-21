
export interface GroupedArrayElementsHandlerResult {
  errorMessage?: string;
  groups?: Array<Array<number>>;
}

export class GroupedArrayElementsHandler {
  readonly emptyArrayErrorMessage = 'the array must contain elements';
  readonly invalidGroupSizeErrorMessage = 'the size to group the array by must be a positive number';
  readonly groupSizeExceedsArrayLengthErrorMessage = 'unable to group elements - group size exceeds than the array length';
  
  handle = (arrayToGroup: Array<number>, groupSize: number): GroupedArrayElementsHandlerResult => {
    if (this.inputArrayIsEmpty(arrayToGroup.length))
      return this.getErrorResponse(this.emptyArrayErrorMessage);

    if (this.groupSizeIsLessThanOne(groupSize))
      return this.getErrorResponse(this.invalidGroupSizeErrorMessage);
        
    if(this.groupSizeExceedsArrayLength(arrayToGroup.length, groupSize))
      return this.getErrorResponse(this.groupSizeExceedsArrayLengthErrorMessage);
        
    return {
      groups: [...groupedArrayElementsHandler(arrayToGroup, groupSize)]
    };
  }

  private groupSizeExceedsArrayLength = (arrayLength: number, groupSize: number): boolean => {
    return groupSize > arrayLength;
  }

  private groupSizeIsLessThanOne = (groupSize: number): boolean => {
    return groupSize < 1;
  }

  private inputArrayIsEmpty = (arrayLength: number): boolean => {
    return arrayLength === 0;
  }

  private getErrorResponse = (errorMessage: string): GroupedArrayElementsHandlerResult => {
    return { errorMessage };
  }
}

function* groupedArrayElementsHandler(arrayToGroup: Array<number>, groupSize: number) {
  for (let index = 0; index < arrayToGroup.length; index += groupSize) {
      yield arrayToGroup.slice(index, index + groupSize);
  }
}