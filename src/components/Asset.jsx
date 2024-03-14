import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Asset = ({ asset, onAssetClick }) => {
	const [isRed, setIsRed] = useState(false);

	useEffect(() => {
		asset?.lastClosePrice < asset?.priceTarget?.median && setIsRed(true);
	}, []);

	return (
		<Card
			onClick={() => onAssetClick(asset)}
			className="card"
			sx={{
				borderRadius: "1rem",
				boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
				margin: "1rem",
				padding: "1rem",
				width: "80%",
				cursor: "pointer",
				backgroundColor: "#f5f5f5",
			}}
		>
			<CardContent className="card-content">
				{asset?.logoUrl && (
					<CardMedia
						component="img"
						sx={{
							height: 80,
							width: 80,
							borderRadius: "10px",
						}}
						image={asset?.logoUrl || null}
					/>
				)}
				<h2 style={{ margin: "1rem 1rem 0 0" }}>{asset?.ticker}</h2>
				<small style={{ margin: "0 1rem 1rem 0" }}>{asset?.name}</small>
				<div>
					<span>
						<p>
							<strong style={{ marginRight: "10px" }}>
								Country:
							</strong>{" "}
							{asset?.country}
						</p>
						<p>
							<strong style={{ marginRight: "10px" }}>
								Industry:
							</strong>{" "}
							{asset?.industry}
						</p>
						<p
							style={{
								display: "flex",
							}}
						>
							<strong style={{ marginRight: "10px" }}>
								Last close price:{" "}
							</strong>
							{asset?.lastClosePrice} {asset?.currency}
							{isRed ? (
								<ArrowDownwardIcon style={{ color: "red" }} />
							) : (
								<ArrowUpwardIcon style={{ color: "green" }} />
							)}
						</p>
					</span>
				</div>
			</CardContent>
		</Card>
	);
};

export default Asset;
