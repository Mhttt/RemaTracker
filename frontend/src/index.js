import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shoppinglist from './pages/Shoppinglist';
import Inspiration from './pages/Inspiration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route exact path="/rematracker" element={<Home />}></Route>
				<Route path="/shoppinglist" element={<Shoppinglist />}></Route>
				<Route path="/inspiration" element={<Inspiration/>}></Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
