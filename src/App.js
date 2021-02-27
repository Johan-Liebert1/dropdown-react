import React, { useState } from "react";
import DropdownComponent from "./components/DropdownComponent";

import { useSelector } from "react-redux";

const App = () => {
	const tree = useSelector(state => state.tree);

	const [showJson, setShowJson] = useState(false);

	return (
		<div style={{ margin: "5rem auto", width: "80%", fontFamily: "Arial" }}>
			<button onClick={() => setShowJson(!showJson)}>
				Print State as JSON string
			</button>
			<DropdownComponent child={tree} />

			{showJson && <p>{JSON.stringify(tree)}</p>}
		</div>
	);
};

export default App;
