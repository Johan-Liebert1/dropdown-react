const updateState = (childrenArray, childName, newDataValue) => {
	for (let i = 0; i < childrenArray.length; i++) {
		let childObject = childrenArray[i];

		if (childObject.name === childName) {
			if (childObject.data) {
				childObject.data = newDataValue;
			}
			return;
		}

		if (childObject.name !== childName && childObject.children) {
			updateState(childObject.children, childName, newDataValue);
		}
	}
};

export const changeDataValueAction = (childName, newDataValue) => (
	dispatch,
	getState
) => {
	let newState = { ...getState().tree };

	if (childName === "root") {
		if (newState.data) {
			newState.data = newDataValue;
			dispatch({ type: "UPDATE_STATE", payload: newState });
		}
		return;
	}

	updateState(newState.children, childName, newDataValue);
	dispatch({ type: "UPDATE_STATE", payload: newState });
};
