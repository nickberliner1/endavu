import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";

const style = {
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	maxHeight: "70%",
	overflow: "scroll",
	bgcolor: "#efefef",
	borderRadius: "10px",
	boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
	p: 4,
};

const camelCaseToNormalText = (str) => {
	// Insert space before capital letters
	const spacedString = str.replace(/([A-Z])/g, " $1").trim();
	// Capitalize the first letter
	return spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
};

const AssetModal = ({ asset, open, onClose }) => {
	const filteredProperties = Object.entries(asset).filter(
		([key]) => key !== "id" && key !== "logoUrl" && key !== "name"
	);

	const numberWithCommas = (number) => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={style}>
				<div className="modal-content">
					{asset?.logoUrl && (
						<CardMedia
							component="img"
							sx={{
								height: 100,
								width: 100,
								marginBottom: "1rem",
								borderRadius: "10px",
							}}
							image={asset?.logoUrl}
						/>
					)}
					<h2 style={{ margin: "0 1rem 0 0" }}>{asset?.ticker}</h2>
					<small>{asset?.name}</small>
					<div style={{ marginTop: "2rem" }}>
						{filteredProperties.map(([key, value]) => (
							<Accordion
								key={key}
								style={{ backgroundColor: "#f5f5f5" }}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									<strong>
										{camelCaseToNormalText(key)}
									</strong>{" "}
								</AccordionSummary>
								<AccordionDetails>
									{key === "marketCap" ? (
										<span>{numberWithCommas(value)}</span>
									) : (
										JSON.stringify(value, null, 2)
									)}
								</AccordionDetails>
							</Accordion>
						))}
					</div>
				</div>
			</Box>
		</Modal>
	);
};

export default AssetModal;
