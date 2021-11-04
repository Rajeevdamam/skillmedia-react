import { createStore, combineReducers } from "redux";
import { userReducer, postsReducer } from "../reducers/reducers";

const combinedReducer = combineReducers({
	user: userReducer,
	posts: postsReducer,
});

const store = createStore(combinedReducer);

export { store };
