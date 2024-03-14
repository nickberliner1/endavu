import React, { useEffect, useState } from "react";
import "./App.css";
import Asset from "./components/Asset";
import AssetModal from "./components/AssetModal";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function App() {
	const [selectedAsset, setSelectedAsset] = useState(null);

	const [assets, setAssets] = useState([]);

	const [sortOrder, setSortOrder] = useState("default");

	const uniqueCountries = [...new Set(assets.map((asset) => asset.country))];

	const [selectedCountry, setSelectedCountry] = useState("");

	const handleCountryChange = (event) => {
		setSelectedCountry(event.target.value);
	};

	const sortedAssets = [...assets];

	if (sortOrder === "alphabetical") {
		sortedAssets.sort((a, b) => a.name.localeCompare(b.name));
	}
	const handleSortChange = (event) => {
		setSortOrder(event.target.value);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://gist.githubusercontent.com/jesperborgstrup/a57aff4d66392b6c89473c57ef3eadf4/raw/a95a48ad51d90dbbc88f74155deda9fcda76f992/assets.json"
				);
				const data = await response.json();
				setAssets(data);
			} catch (error) {
				console.log("Error fetching data: ", error);
			}
		};
		fetchData();
	}, []);

	const handleAssetClick = (asset) => {
		setSelectedAsset(asset);
	};

	const handleModalClose = () => {
		setSelectedAsset(null);
	};

	return (
		<div className="App">
			<div className="navbar">
				<h2>Nick's Endavu Solution</h2>
				<span>
					<FormControl
						variant="standard"
						sx={{ m: 1, minWidth: 120 }}
					>
						<InputLabel id="selected-country-label">
							Country
						</InputLabel>
						<Select
							labelId="selected-country-label"
							id="selected-country"
							value={selectedCountry}
							onChange={handleCountryChange}
							label="selectedCountry"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{uniqueCountries.map((country) => (
								<MenuItem key={country} value={country}>
									{country}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl
						variant="standard"
						sx={{ m: 1, minWidth: 120 }}
					>
						<InputLabel id="sort-order-label">Sort</InputLabel>
						<Select
							labelId="sort-order-label"
							id="sort-order"
							value={sortOrder}
							onChange={handleSortChange}
							label="sortOrder"
						>
							<MenuItem value="default">
								<em>Default</em>
							</MenuItem>
							<MenuItem value="alphabetical">
								<em>Name (A - Z)</em>
							</MenuItem>
						</Select>
					</FormControl>
				</span>
			</div>

			<div className="list-container">
				{sortedAssets
					.filter((asset) =>
						selectedCountry
							? asset.country === selectedCountry
							: true
					)
					.map((asset) => (
						<Asset
							key={asset.id}
							asset={asset}
							onAssetClick={handleAssetClick}
						/>
					))}
			</div>
			{selectedAsset && (
				<AssetModal
					asset={selectedAsset}
					open={selectedAsset}
					onClose={handleModalClose}
				/>
			)}
		</div>
	);
}

export default App;
