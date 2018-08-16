import { createStore } from "redux";

export default createStore((state={}, action) => {

    switch(action.type) {

        case "CHANGE_NAV_COLOR":
            state.navigationColor = action.data;
        break;

        case "FETCH_LEADS":
            state.leads = action.data;
        break;

        default:
            state = state;
    }

    return state;

},{
    navigationColor: "red",
    leads:[]
});