import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";

class SocialMediaStore {
	instagramPosts = [];
	loading = true;
	instagramError = null;

	constructor() {
		makeObservable(this, {
			instagramPosts: observable,
			loading: observable,
			instagramError: observable,
			fetchInstagramPosts: action,
		});
	}

	async fetchInstagramPosts(accessToken, userId) {
		// Check if credentials are configured
		if (!accessToken || !userId || 
			accessToken === 'your_instagram_access_token_here' ||
			userId === 'your_instagram_user_id_here') {
			runInAction(() => {
				this.instagramError = "Instagram API credentials not configured.";
				this.loading = false;
			});
			return;
		}

		try {
			// Fetch user's media using Instagram Basic Display API
			const response = await axios.get(
				`https://graph.instagram.com/${userId}/media`,
				{
					params: {
						fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count',
						access_token: accessToken,
						limit: 8 // Fetch 8 posts
					}
				}
			);

			runInAction(() => {
				this.instagramPosts = response.data.data.map(post => ({
					...post,
					platform: "instagram"
				}));
				
				this.loading = false;
			});
		} catch (err) {
			console.error("Error fetching Instagram posts:", err);
			runInAction(() => {
				this.instagramError = err.response?.data?.error?.message || "Failed to load Instagram posts. Please check your API credentials.";
				this.loading = false;
			});
		}
	}
}

export default SocialMediaStore;
