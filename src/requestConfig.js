export const types = {
	movie_list: 'movie_list',
	search: 'search',
	discover: 'discover',
	tv: 'tv',
	details: 'details',
	people: 'people',
};

export const category = {
	search: {
		movie: 'movie',
		person: 'person',
		tv: 'tv',
	},
	movie_list: {
		trending: 'trending',
		upcoming: 'upcoming',
		top_rated: 'top_rated',
		popular: 'popular',
		now_playing: 'now_playing',
	},
	tv: {
		trending: 'trending',
		on_the_air: 'on_the_air',
	},
	details: {
		movie: 'movie',
		tv: 'tv',
		person: 'person',
		credits: 'credits',
	}
};

export const imgSizes = {
	original: 'original',
	w780: 'w780',
	w500: 'w500',
	w342: 'w342',
	w185: 'w185',
	w154: 'w154',
	w92: 'w92',
}

export const BASE_URL = 'https://api.themoviedb.org/3/';