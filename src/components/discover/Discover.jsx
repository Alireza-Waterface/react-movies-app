import './discover.css';

import { useSearchParams } from 'react-router-dom';
import * as requestConfig from '../../requestConfig';

import Loader from '../loader/Loader';
import Error from '../error/Error';

import axios from 'axios';

import { Link } from 'react-router-dom';

import { useEffect, useMemo, useState } from 'react';
import MovieTile from '../movie-tile/MovieTile';

const Discover = () => {
	const [searchParams] = useSearchParams();
	
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const discover = useMemo(() => {
		return {
			country: searchParams.get('country') || '',
			language: searchParams.get('language') || '',
			genre: searchParams.get('genre') || '',
			sort: searchParams.get('sort') || 'none',
			minScore: searchParams.get('minScore') || 0,
			year: searchParams.get('year') || 1900,
			adult: searchParams.get('adult') || false,
			keyword: searchParams.get('keyword') || '',
			artist: searchParams.get('artist') || '',
			time: searchParams.get('time') || 10,
			votes: searchParams.get('votes') || 0,
			page: searchParams.get('page') || 1,
		};
	}, [searchParams]);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
		
		( async () => {
			try {
				setError(false);
				setLoading(true);
				setData([]);
				
				const res = await axios.get( `${requestConfig.BASE_URL}discover/movie?include_adult=${discover.adult}${discover.language == 'all' ? '' : `&with_original_language=${discover.language}`}&primary_release_date.gte=${discover.year}-01-01${discover.sort == 'none' ? '' : `&sort_by=${discover.sort}`}&vote_average.gte=${discover.minScore}&vote_count.gte=${discover.votes}${discover.genre == 'all' ? '' : `&with_genres=${discover.genre}`}${discover.keyword == '' ? '' : `&with_keywords=${discover.keyword?.toLowerCase()}`}${discover.country == 'all' ? '' : `&with_origin_country=${discover.country}`}${discover.artist == '' ? '' : `&with_people=${discover.artist?.toLowerCase()}`}&with_runtime.gte=${discover.time}&page=${discover.page}`, {
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODczMWFiNTRhODg2MGZjM2ZiNDg4NTJhYzgxZWVhOSIsInN1YiI6IjY0YzM4N2NlNDMyNTBmMDBhZWUwMWJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E9HKJQHGu6815uWRCVmCdVr5gQQ7F3g-pO-J1RWxBak`
					},
				});

				if (res.status !== 200 || !res.status) {
					throw new Error('Failed to fetch data');
				} else {
					setData(res.data);
					setLoading(false);
				}
			} catch (err) {
				if (err.name != 'CanceledError') {
					console.log(err);
					setError(true);
				}
			}
		})();
	}, [searchParams, discover]);

	return (
		<div className='discover-list'>
			{ !loading && error && <Error /> }
			{ loading && !error && <Loader /> }
			{ !loading && !error &&
				data?.results?.length === 0 ? <p className='nothing'>No movie found!</p>
				:
				data?.results?.map( movie => (
					<MovieTile key={movie.id} movie={movie} />
				))
			}
			{ !loading && !error &&
				<div className='pagination'>
					{ discover.page > 1 &&
						<Link
							className='btn'
							to={`/?&country=${discover.country}&language=${discover.language}&genre=${discover.genre}&sort=${discover.sort}&minScore=${discover.minScore}&year=${discover.year}&adult=${discover.adult}&keyword=${discover.keyword}&artist=${discover.artist}&time=${discover.time}&votes=${discover.votes}&page=1`}
						><span>1</span></Link>
					}
					{ discover.page > 2 &&
						<Link
							className='btn'
							to={`/?&country=${discover.country}&language=${discover.language}&genre=${discover.genre}&sort=${discover.sort}&minScore=${discover.minScore}&year=${discover.year}&adult=${discover.adult}&keyword=${discover.keyword}&artist=${discover.artist}&time=${discover.time}&votes=${discover.votes}&page=${parseInt(discover.page) - 1}`}
						><span>{parseInt(discover.page) - 1}</span></Link>
					}
					<div className='btn current-page'><span>{discover.page}</span></div>
					{ discover.page < 499 &&
						<Link
							className='btn'
							to={`/?&country=${discover.country}&language=${discover.language}&genre=${discover.genre}&sort=${discover.sort}&minScore=${discover.minScore}&year=${discover.year}&adult=${discover.adult}&keyword=${discover.keyword}&artist=${discover.artist}&time=${discover.time}&votes=${discover.votes}&page=${parseInt(discover.page) + 1}`}
						><span>{parseInt(discover.page) + 1}</span></Link>
					}
					{ discover.page < 500 && data?.total_pages > 2 &&
						<Link
							className='btn'
							to={`/?&country=${discover.country}&language=${discover.language}&genre=${discover.genre}&sort=${discover.sort}&minScore=${discover.minScore}&year=${discover.year}&adult=${discover.adult}&keyword=${discover.keyword}&artist=${discover.artist}&time=${discover.time}&votes=${discover.votes}&page=${data?.total_pages > 500 ? 500 : data?.total_pages}`}
						><span>{data?.total_pages > 500 ? 500 : data?.total_pages}</span></Link>
					}
				</div>
			}
		</div>
	);
};

export default Discover;