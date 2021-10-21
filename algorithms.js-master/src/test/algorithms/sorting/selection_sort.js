const selectionSort = require("../../..").Sorting.selectionSort;
const sortingTestsHelper = require("./sorting_tests_helper");

describe("Selection Sort", () => {
  it("sorts the given array", () => {
    sortingTestsHelper.testSort(selectionSort);
  });

  it("sorts the array with a specific comparison function", () => {
    sortingTestsHelper.testSortWithComparisonFn(selectionSort);
  });
});
