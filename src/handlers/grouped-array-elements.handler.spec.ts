import { GroupedArrayElementsHandler } from './grouped-array-elements.handler';

describe('The handler class used to group array elements', () => {
  const sut = new GroupedArrayElementsHandler();
  
  describe('Error conditions', () => {
    it('return an error message if the input array is empty', () => {
      const inputArray = new Array<number>();
      const groupSize = 1;
      
      const expected = sut.emptyArrayErrorMessage;
      const result = sut.handle(inputArray, groupSize);

      expect(result.errorMessage).toBeTruthy();
      expect(result.errorMessage).toBe(expected);
    });

    it('return an error message if the group size is less than 1', () => {
      const inputArray = [1, 2, 3, 4, 5]
      const groupSize = 0;
      
      const expected = sut.invalidGroupSizeErrorMessage;
      const result = sut.handle(inputArray, groupSize);

      expect(result.errorMessage).toBeTruthy();
      expect(result.errorMessage).toBe(expected);
    });

    it('return an error message if the group size is greater than the array length', () => {
      const inputArray = [1, 2];
      const groupSize = 3;
      
      const expected = sut.groupSizeExceedsArrayLengthErrorMessage;
      const result = sut.handle(inputArray, groupSize);

      expect(result.errorMessage).toBeTruthy();
      expect(result.errorMessage).toBe(expected);
    });
  });

  it('should create instance', () => {
    expect(sut).toBeTruthy();
  });

  it('should return equal sized groups if input array is equally divisible', () => {
    const inputArray = [1, 2, 3, 4, 5, 6];
    const groupSize = 3;
    
    const result = sut.handle(inputArray, groupSize);

    expect(result.groups).toBeTruthy();
    
    result.groups?.forEach(group => {
      expect(group.length).toBe(groupSize);
    });
  });

  it('where the input array can not be equally grouped, the last group should include the remainder elements', () => {
    const inputArray = [1, 2, 3, 4, 5];
    const groupSize = 3;
    
    const expectedLastGroupLength = 2;
    const result = sut.handle(inputArray, groupSize);
    const successfulResponse = result.groups as Array<Array<number>>;
    
    expect(result.groups).toBeTruthy();
    expect(successfulResponse[0].length).toBe(groupSize);
    expect(successfulResponse[1].length).toBe(expectedLastGroupLength);
  });
});