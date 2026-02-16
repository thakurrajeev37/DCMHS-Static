import React from "react";
import { Box } from "@mui/material";
import BannerSection from "../components/BannerSection.jsx";
import FounderSection from "../components/FounderSection.jsx";
import QuickFacts from "../components/QuickFacts.jsx";
import FacultyStaff from "../components/FacultyStaff.jsx";
import EventsSection from "../components/EventsSection.jsx";
import PhotoGallery from "../components/PhotoGallery.jsx";
import ConnectWithUs from "../components/ConnectWithUs.jsx";
import ContactUs from "../components/ContactUs.jsx";

function Home() {
	return (
		<>
			<BannerSection />
			<FounderSection />
			<QuickFacts />
			<Box sx={{ bgcolor: '#FFFFFF', width: '100%', overflowX: 'hidden' }}>
				<FacultyStaff />
			</Box>
			<Box sx={{ bgcolor: '#F9F9F9', width: '100%', overflowX: 'hidden' }}>
				<EventsSection />
			</Box>
			<Box sx={{ bgcolor: '#FFFFFF', width: '100%', overflowX: 'hidden' }}>
				<PhotoGallery />
			</Box>
			<Box sx={{ bgcolor: '#F5F5F5', width: '100%', overflowX: 'hidden' }}>
				<ConnectWithUs />
			</Box>
			<Box sx={{ bgcolor: '#FAFAFA', width: '100%', overflowX: 'hidden' }}>
				<ContactUs />
			</Box>
		</>
	);
}

export default Home;
