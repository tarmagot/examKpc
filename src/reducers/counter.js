var initialState = [];
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_DATA":
      const result = action.data;
      let result_data1 = [...state, result];
      localStorage.setItem("data", JSON.stringify(result_data1));
      return result_data1;

    case "SET_DATA":
      const editData = action.data;
      console.log("set", action.address);
      const filteredData = state.filter(
        (value) => value.rowkey !== editData.rowkey
      );
      let result_data2 = [...filteredData, editData];
      localStorage.setItem("data", JSON.stringify(result_data2));
      return result_data2;

    case "DELETE_DATA":
      console.log(action.rowkey);
      let result_data = state.filter((value) => value.rowkey !== action.rowkey);
      localStorage.setItem("data", JSON.stringify(result_data));
      console.log("new", result_data);
      return result_data;

    default:
      return state;
  }
}

export default counterReducer;
//JSON.parse(localStorage['data'])[0].title
