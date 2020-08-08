import Action from "../actions";

var initialState = [];
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_DATA":
      const result = action.data;

      return [...state, result];
    // case "SET_DATA":
    //   return [{ ...state, ...action.data }];
    case "DELETE_DATA":
      return {
        couter: state.couter + 1,
        text: action.text,
      };

    default:
      return state;
  }
}

export default counterReducer;
