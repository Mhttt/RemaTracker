
import Help from "./Help"
import { Routes, Route } from "react-router-dom"
import React from 'react';
import Home from './Home';

function App() {

  return (
		<>
			<Routes>
				<Route exact path="/RemaTracker" element={<Home />}></Route>
				<Route path="/help" element={<Help />}></Route>
			</Routes>
			<Home></Home>
		</>
	);
}

export default App;
