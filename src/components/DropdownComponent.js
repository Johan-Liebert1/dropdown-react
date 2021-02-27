import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addChildAction } from "../actions/addChildAction";
import { changeDataValueAction } from "../actions/changeDataValue";

const DropdownComponent = ({ child }) => {
	const dispatch = useDispatch();

	const [collapseChildren, setCollapseChildren] = useState(false);
	const [childDataValue, setChildDataValue] = useState(child.data);

	const mainDivStyle = { padding: "1rem 2rem" };

	const headerDiv = {
		border: "2px solid black",
		padding: "0.5rem 2rem",
		backgroundColor: "#0984e3",
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center"
	};

	const childrenDiv = {
		border: "1px solid black",
		backgroundColor: "#dfe6e9",
		display: collapseChildren ? "none" : "block",
		padding: "1rem 3rem"
	};

	const handleCollapseChildren = () => {
		setCollapseChildren(!collapseChildren);
	};

	const handleAddChild = () => {
		dispatch(addChildAction(child.name));
	};

	const changeChildsData = e => {
		setChildDataValue(e.target.value);
		dispatch(changeDataValueAction(child.name, e.target.value));
	};

	return (
		<div style={mainDivStyle}>
			<div style={headerDiv}>
				<button onClick={handleCollapseChildren}>
					{collapseChildren ? ">" : "v"}
				</button>
				<span>{child.name}</span>
				<button onClick={handleAddChild}>Add Child</button>
			</div>
			<div style={childrenDiv}>
				{child.data ? (
					<span>
						Data :{" "}
						<input value={childDataValue} onChange={changeChildsData} />
					</span>
				) : (
					child.children?.map(c => <DropdownComponent child={c} key={c.name} />)
				)}
			</div>
		</div>
	);
};

export default DropdownComponent;
