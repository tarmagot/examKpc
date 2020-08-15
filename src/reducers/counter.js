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

    case "DELETE_SELECT":
      console.log(action.rowkey);
      let olddata = state;
      let deletedata = action.rowkey;
      let newdata = [];
      let count = 1;
      var i;
      var j;
      console.log("action", action.rowkey);
      for (i = 0; i < deletedata.length; i++) {
        for (j = 0; j < olddata.length; j++) {
          if (deletedata[i].rowkey == olddata[j].rowkey && count == 1) {
            newdata = olddata.filter(
              (value) => value.rowkey !== deletedata.rowkey
            );
            count = count + 1;
          } else {
            newdata = newdata.filter(
              (value) => value.rowkey !== deletedata.rowkey
            );
          }
        }
      }
      console.log("all");
      // let result_data = state.filter((value) => value.rowkey !== action.rowkey);
      localStorage.setItem("data", JSON.stringify(newdata));
      console.log("new", newdata);
      return newdata;

    default:
      return state;
  }
}

export default counterReducer;
//JSON.parse(localStorage['data'])[0].title
