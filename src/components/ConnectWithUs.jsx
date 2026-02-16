import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Container, Typography, Box, IconButton, Card, CardMedia, CardContent, CircularProgress } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { useSocialMediaStore } from "../stores/rootStores.js";

const ConnectWithUs = observer(() => {
	const socialMediaStore = useSocialMediaStore();

	// Get API credentials from environment variables
	const INSTAGRAM_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
	const INSTAGRAM_USER_ID = import.meta.env.VITE_INSTAGRAM_USER_ID;

	useEffect(() => {
		socialMediaStore.fetchInstagramPosts(INSTAGRAM_TOKEN, INSTAGRAM_USER_ID);
	}, [socialMediaStore, INSTAGRAM_TOKEN, INSTAGRAM_USER_ID]);

	const posts = socialMediaStore.instagramPosts;

	return (
		<Box sx={{ py: { xs: 4, md: 8 }, bgcolor: "white", width: "100%", overflow: "hidden" }}>
			<Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
				<Typography 
					variant="h3" 
					component="h2" 
					textAlign="center"
					sx={{ 
						color: "#3B6866",
						fontWeight: "bold",
						fontSize: { xs: "1.75rem", md: "2.5rem" },
						mb: 2
					}}
				>
					Connect With Us
				</Typography>
				<Typography 
					variant="body1" 
					textAlign="center"
					sx={{ 
						color: "#666",
						mb: 4,
						maxWidth: "600px",
						mx: "auto"
					}}
				>
					Stay updated with our latest news, events, and student achievements on social media
				</Typography>

				{/* Social Media Icons */}
				<Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
					<IconButton
						component="a"
						href="https://www.facebook.com/dcmodernschool"
						target="_blank"
						rel="noopener noreferrer"
						sx={{
							bgcolor: "#1877F2",
							color: "white",
							width: 50,
							height: 50,
							"&:hover": {
								bgcolor: "#166FE5",
							}
						}}
					>
						<FacebookIcon />
					</IconButton>
					<IconButton
						component="a"
						href="https://www.instagram.com/d.c.m.school/"
						target="_blank"
						rel="noopener noreferrer"
						sx={{
							bgcolor: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
							background: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
							color: "white",
							width: 50,
							height: 50,
							"&:hover": {
								opacity: 0.9,
							}
						}}
					>
						<InstagramIcon />
					</IconButton>
				</Box>

				{/* Loading State */}
				{socialMediaStore.loading && (
					<Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
						<CircularProgress sx={{ color: "#3B6866" }} />
					</Box>
				)}

				{/* Instagram Posts Grid */}
				{!socialMediaStore.loading && posts.length > 0 && (
					<Box 
						sx={{ 
							display: "grid",
							gridTemplateColumns: {
								xs: "1fr",
								sm: "repeat(2, 1fr)",
								md: "repeat(3, 1fr)",
								lg: "repeat(4, 1fr)"
							},
							gap: { xs: 2, sm: 3 },
							px: { xs: 1, sm: 0 }
						}}
					>
						{posts.map((post) => (
							<Card 
								key={post.id}
								component="a"
								href={post.permalink}
								target="_blank"
								rel="noopener noreferrer"
								sx={{ 
									display: "flex",
									flexDirection: "column",
									textDecoration: "none",
									transition: "transform 0.3s, box-shadow 0.3s",
									"&:hover": {
										transform: "translateY(-8px)",
										boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
									}
								}}
							>
								{/* Instagram Badge */}
								<Box 
									sx={{ 
										position: "absolute",
										top: 10,
										right: 10,
										bgcolor: "#E4405F",
										borderRadius: "50%",
										width: 32,
										height: 32,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										zIndex: 1,
										boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
									}}
								>
									<InstagramIcon sx={{ color: "white", fontSize: "1rem" }} />
								</Box>
								{/* Post Image/Video */}
								<CardMedia
									component="img"
									height="250"
									image={post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url}
									alt={post.caption || "Instagram post"}
									sx={{ 
										objectFit: "cover",
										bgcolor: "#f5f5f5"
									}}
								/>

								{/* Post Caption and Stats */}
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography 
										variant="body2" 
										color="text.secondary"
										sx={{
											display: "-webkit-box",
											WebkitLineClamp: 3,
											WebkitBoxOrient: "vertical",
											overflow: "hidden",
											textOverflow: "ellipsis",
											lineHeight: 1.6,
											minHeight: "4.8em"
										}}
									>
										{post.caption || "No caption"}
									</Typography>

									{/* Engagement Stats */}
									<Box sx={{ display: "flex", gap: 2, mt: 2 }}>
										{post.like_count !== undefined && (
											<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
												<FavoriteIcon sx={{ fontSize: "1rem", color: "#E4405F" }} />
												<Typography variant="caption">{post.like_count}</Typography>
											</Box>
										)}
										{post.comments_count !== undefined && (
											<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
												<CommentIcon sx={{ fontSize: "1rem", color: "#666" }} />
												<Typography variant="caption">{post.comments_count}</Typography>
											</Box>
										)}
									</Box>

									{/* Post Date */}
									<Typography 
										variant="caption" 
										color="text.secondary"
										sx={{ display: "block", mt: 1 }}
									>
										{new Date(post.timestamp).toLocaleDateString('en-US', { 
											month: 'short', 
											day: 'numeric', 
											year: 'numeric' 
										})}
									</Typography>
								</CardContent>
							</Card>
						))}
					</Box>
				)}

				{/* No Posts Message */}
				{!socialMediaStore.loading && posts.length === 0 && (
					<Box sx={{ textAlign: "center", py: 8 }}>
						<Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
							No posts available
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Instagram posts will appear here once configured.
						</Typography>
					</Box>
				)}

				{/* View More Button */}
				{!socialMediaStore.loading && posts.length > 0 && (
					<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
						<a
							href="https://www.instagram.com/d.c.m.school/"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								padding: "12px 32px",
								fontSize: "1rem",
								fontWeight: 500,
								color: "white",
								backgroundColor: "#3B6866",
								border: "none",
								borderRadius: "8px",
								cursor: "pointer",
								transition: "all 0.3s",
								boxShadow: "0 2px 8px rgba(59, 104, 102, 0.2)",
								display: "flex",
								alignItems: "center",
								gap: "8px",
								textDecoration: "none"
							}}
							onMouseEnter={(e) => {
								e.target.style.backgroundColor = "#2d5250";
							}}
							onMouseLeave={(e) => {
								e.target.style.backgroundColor = "#3B6866";
							}}
						>
							View More
						</a>
					</Box>
				)}

				{/* Follow Us CTA */}
				<Box sx={{ textAlign: "center", mt: 4 }}>
					<Typography variant="body1" sx={{ color: "#666" }}>
						Follow us for daily updates and highlights from our school community!
					</Typography>
				</Box>
			</Container>
		</Box>
	);
});

export default ConnectWithUs;
