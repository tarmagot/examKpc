var initialState = [];
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_DATA":
      const result = action.data;

      return [...state, result];
    case "SET_DATA":
      const editData = action.data;
      console.log("set", action.address);
      const filteredData = state.filter(
        (value) => value.rowkey !== editData.rowkey
      );
      return [...filteredData, editData];
    case "DELETE_DATA":
      console.log(action.rowkey);
      const newdata = state.filter((value) => value.rowkey !== action.rowkey);

      console.log("new", newdata);
      return newdata;

    default:
      return state;
  }
}

export default counterReducer;
