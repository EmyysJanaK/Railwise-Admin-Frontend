import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Drawer,
	Toolbar,
	Box,
} from "@mui/material";
import { UserContext } from "../context/UserContext";

const Sidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { logout } = useContext(UserContext);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const menuItemsGraphs = [
		// "Dashboard",
		"Bookings",
		"Revenue",
		"User Registrations",
		"Class Distribution",
	];
	const menuItemsTables = ["Booking Details", "Schedule Details"];

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: 240,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					width: 240,
					boxSizing: "border-box",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				},
			}}
		>
			<Box>
				<Toolbar />
				<List>
					<ListItem disablePadding sx={{ background: "#1976f2" }}>
						<ListItemButton component={Link}>
							<ListItemText
								primary={"Graphs"}
								sx={{ color: "white" }}
							/>
						</ListItemButton>
					</ListItem>
					{menuItemsGraphs.map((text) => {
						const to = `/${text.toLowerCase().replace(" ", "-")}`;
						const isActive = location.pathname === to;
						return (
							<ListItem
								key={text}
								disablePadding
								sx={{
									paddingLeft: 3,
									backgroundColor: isActive
										? "#d3d3d3"
										: "inherit",
								}} // Darken if active
							>
								<ListItemButton component={Link} to={to}>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						);
					})}
					<ListItem disablePadding sx={{ background: "#1976f2" }}>
						<ListItemButton component={Link}>
							<ListItemText
								primary={"Tables"}
								sx={{ color: "white" }}
							/>
						</ListItemButton>
					</ListItem>

					{menuItemsTables.map((text) => {
						const to = `/${text.toLowerCase().replace(" ", "-")}`;
						const isActive = location.pathname === to;
						return (
							<ListItem
								key={text}
								disablePadding
								sx={{
									paddingLeft: 3,
									backgroundColor: isActive
										? "#d3d3d3"
										: "inherit",
								}}
							>
								<ListItemButton component={Link} to={to}>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</Box>
			<Box sx={{ mb: 2 }}>
				<List>
					<ListItem
						disablePadding
						sx={{
							border: "1px solid #d3d3d3",
							borderRadius: 1,
							overflow: "hidden",
						}}
					>
						<ListItemButton
							onClick={handleLogout}
							sx={{ color: "red" }}
						>
							<ListItemText
								primary={"Log Out"}
								sx={{ textAlign: "center" }}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
