import './movies.css';

import { useParams, Link } from 'react-router-dom';

import useFetch from '../../useFetch';
import * as requestConfig from '../../requestConfig';

import MovieTile from '../../components/movie-tile/MovieTile';

import { useEffect } from 'react';

import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';

const Movies = () => {
	const category = useParams().category;
	const page = useParams().page;

	const { data, loading, error } = useFetch(requestConfig.types.movie_list, category, undefined, page);

	// const getGenreList = (IDs = []) => {
	// 	const movieGenres = [];
	// 	IDs.forEach( id => {
	// 		movieGenres.push(genres.find(genre => genre.id === id).name);
	// 	});
	// 	return movieGenres;
	// };

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})

	const getTitle = (category) => {
		switch (category) {
			case 'popular':
				return 'Most popular movies';
			case 'now_playing':
				return 'Now playing in theatres';
			case 'top_rated':
				return 'Top rated movies';
			case 'upcoming':
				return 'Upcoming movies';
			
			default: return 'Trending movies';
		}
	};

	return (
		<div className='movies'>
			<div className='wrapper'>
				<h2 className='title'>{getTitle(category)}</h2>
				<div className='list'>
					{ !loading && error && <Error /> }
					{ !error && loading && <Loader /> }
					{ !loading && !error &&
						data?.results?.map( item => (
							<MovieTile key={item.id} movie={item} />
						))
					}
				</div>
				{ !error && !loading && <div className='pagination'>
					{ parseInt(page) > 1 &&
						<Link className='navigator' to={`/movies/${category}/1`}><span>1</span></Link>
					}
					{ parseInt(page) > 2 &&
						<Link className='navigator' to={`/movies/${category}/${parseInt(page) - 1}`}><span>{parseInt(page) - 1}</span></Link>
					}
					<p className='navigator active'>
						<span>{parseInt(page)}</span>
					</p>
					{ parseInt(page) < (data?.total_pages <= 500 ? data?.total_pages : 500) &&
						<Link
							className='navigator'
							to={`/movies/${category}/${parseInt(page) + 1}`}
							><span>{parseInt(page) + 1}</span>
						</Link>
					}
					{ parseInt(page) < (data?.total_pages <= 500 ? data?.total_pages : 500) && parseInt(page) < 499 &&
						<Link
							className='navigator'
							to={`/movies/${category}/${data?.total_pages > 500 ? 500 : data?.total_pages}`}
							><span>{data?.total_pages > 500 ? 500 : data?.total_pages}</span>
						</Link>
					}
					</div>
				}
			</div>
		</div>
	);
};

export default Movies;