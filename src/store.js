import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { treeReducer } from "./reducers/treeReducers";

const reducers = combineReducers({
	tree: treeReducer
});

const initialState = {
	tree: {
		name: "root",
		children: [
			{
				name: "child1",
				children: [
					{ name: "child1-child1", data: "c1-c1 Hello" },
					{ name: "child1-child2", data: "c1-c2 JS" }
				]
			},
			{ name: "child2", data: "c2 World" }
		]
	}
};

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
