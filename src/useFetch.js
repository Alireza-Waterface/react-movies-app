import { useState, useEffect } from "react";
import axios from "axios";
import * as requestConfig from './requestConfig';

export const getImgUrl = (size, path) => {
	return `https://image.tmdb.org/t/p/${size}${path}`;
};

const getUrl = (type, category, query, page, id, discover) => {
	switch (type) {
		case requestConfig.types.movie_list: // get list of movies
			if (category === requestConfig.category.movie_list.trending) { // trending movies of week
				return `${requestConfig.BASE_URL}trending/movie/week?language=en-US&page=${page}`;
			} else { // category based list of movies
				return `${requestConfig.BASE_URL}movie/${category}?language=en-US&page=${page}`;
			}

		case requestConfig.types.tv:
			if (category === requestConfig.category.tv.trending) { //trending tv shows
				return `${requestConfig.BASE_URL}trending/tv/week?language=en-US`;
			} else if (category === requestConfig.category.tv.on_the_air) { // on the air shows
				return `${requestConfig.BASE_URL}tv/on_the_air?language=en-US&page=1`;
			}
			break;
		
		case requestConfig.types.people:
			if (category === requestConfig.category.details.credits) {
				return `${requestConfig.BASE_URL}person/${id}/combined_credits?language=en-US`
			} else {
				return `${requestConfig.BASE_URL}trending/person/week?language=en-US&page=${page}`;
			}

		case requestConfig.types.search: // search movie, tv or artist
			if (category === requestConfig.category.search.movie) {  //search movie based on query
				return `${requestConfig.BASE_URL}search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
			} else if (category === requestConfig.category.search.person) { //search person based on query
				return `${requestConfig.BASE_URL}search/person?query=${query}&include_adult=false&language=en-US&page=${page}`;
			} else if (category === requestConfig.category.search.tv) { //search tv based on query
				return `${requestConfig.BASE_URL}search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`;
			}
			break;

		case requestConfig.types.details: // movie or tv details
			if (category === requestConfig.category.details.movie) {
				return `${requestConfig.BASE_URL}movie/${id}?append_to_response=videos,similar,recommendations&language=en-US`;
			} else if (category === requestConfig.category.details.tv) {
				return `${requestConfig.BASE_URL}tv/${id}?append_to_response=videos,similar,recommendations&language=en-US`;
			} else if (category === requestConfig.category.details.person) {
				return `${requestConfig.BASE_URL}person/${id}?append_to_response=images&language=en-US`;
			}
			break;

		case requestConfig.types.discover: //advanced search
			return `${requestConfig.BASE_URL}discover/movie?include_adult=${discover.adult}${discover.language == 'all' ? '' : `&with_original_language=${discover.language?.toLowerCase()}`}&page=1&primary_release_date.gte=${discover.year}-01-01${discover.sort == 'none' ? '' : `&sort_by=${discover.sort}`}&vote_average.gte=${discover.minScore}&vote_count.gte=${discover.votes}${discover.genre == 'all' ? '' : `&with_genres=${discover.genre?.toLowerCase()}`}${discover.country == 'all' ? '' : `&with_origin_country=${discover.country}`}&with_runtime.gte=${discover.time}`

		default: return;
	}
};

const useFetch = (type = '', category = '', query = '', page = 1, id = '', discover = {}) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const controller = new AbortController();

		( async () => {
			try {
				setError(false);
				setLoading(true);
				setData([]);
				
				const res = await axios.get( getUrl(type, category, query, page, id, discover), {
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODczMWFiNTRhODg2MGZjM2ZiNDg4NTJhYzgxZWVhOSIsInN1YiI6IjY0YzM4N2NlNDMyNTBmMDBhZWUwMWJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E9HKJQHGu6815uWRCVmCdVr5gQQ7F3g-pO-J1RWxBak`
					},
					signal: controller.signal,
				});

				if (res.status !== 200 || !res.status) {
					throw new Error('Failed to fetch data');
				} else {
					setData(res.data);
					setLoading(false);
				}
				setError(false);
			} catch (err) {
				if (err.name != 'CanceledError') {
					console.log(err);
					setError(true);
					setLoading(false);
				}
			}
		})();

		return () => {
			controller.abort();
		}
	}, [type, category, query, page, id]);

	return { data, loading, error };
};

export default useFetch;