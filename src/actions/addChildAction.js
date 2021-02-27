const addChild = (childName, childObject) => {
	const number = childObject.children ? childObject.children.length + 1 : 1;

	let namePrefix = childName === "root" ? "child" : childName;

	const newChild = { name: `${namePrefix}-${number}`, data: "newDataValue" };

	let newChildren;

	if (childObject.children) {
		newChildren = [...childObject.children, newChild];
		childObject.children = newChildren;
	} else {
		newChildren = [newChild];
		childObject.children = newChildren;
		delete childObject.data;
	}
};

const updateState = (childrenArray, childName) => {
	for (let i = 0; i < childrenArray.length; i++) {
		let childObject = childrenArray[i];

		if (childObject.name === childName) {
			addChild(childName, childObject);
			return;
		}

		if (childObject.name !== childName && childObject.children) {
			updateState(childObject.children, childName);
		}
	}
};

export const addChildAction = childName => (dispatch, getState) => {
	const tree = getState().tree;
	let newState = { ...tree };

	if (childName === "root") {
		addChild(childName, newState);
		dispatch({ type: "UPDATE_STATE", payload: newState });
	} else {
		updateState(newState.children, childName);
		dispatch({ type: "UPDATE_STATE", payload: newState });
	}
};
