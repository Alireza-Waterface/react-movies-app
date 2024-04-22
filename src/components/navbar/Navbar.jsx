import './navbar.css';
import { Link } from 'react-router-dom';

import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useState } from 'react';

import bb from '../../images/breaking-bad.png';
import img_placeholder from '../../images/img-placeholder.png';

import useFetch, { getImgUrl } from '../../useFetch';
import * as requestConfig from '../../requestConfig';

import Loader from '../loader/Loader';
import Error from '../error/Error';

const Navbar = () => {
	const [query, setQuery] = useState('');

	const { data, loading, error } = useFetch(requestConfig.types.search, requestConfig.category.search.movie, query);

	return (
		<nav className='navbar'>
			<div className='wrapper'>
				<div className='search'>
					{ query.length == 0 ?
						<SearchOutlinedIcon className='icon' />
						:
						<CloseRoundedIcon
							className='icon close-icon'
							onClick={() => setQuery('')}
						/>
					}
					<input
						className='search-input'
						id='search-input'
						type='text'
						placeholder='Search movie or serie...'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<div
						className='founded'
						style={{
							display: query.length > 2 ? 'unset' : 'none',
						}}
					>
						{ !error && loading && <Loader /> }
						{ !loading && error && <Error /> }
						{ !loading && !error &&
							data?.results?.length <= 0 ?
								<p className='nothing'>No movie found</p> :
								data?.results?.sort((a, b) => b.popularity - a.popularity)?.map(item => (
									<Link
										to={`/details/movie/${item.id}`}
										key={item.id}
										className='item'
										onClick={() => setQuery('')}
									>
										<div className='score'>
											<span>⭐</span>
											<span>{item?.vote_average?.toFixed(1) || 'N/A'}</span>
										</div>
										<img 
											alt={item.title}
											src={getImgUrl(requestConfig.imgSizes.w92, item.poster_path)}
											onError={(e) => e.target.setAttribute('src', img_placeholder)}
										/>
										<div className='info'>
											<p className='name'>{item.title}</p>
											<p className='desc'>{item.overview.slice(0, 25)}...</p>
										</div>
									</Link>
								))
						}
					</div>
				</div>
				<div className='links'>
					<ul className='links-list'>
						<li className='item'>
							<Link className='link' to={'/contact'}>Contact</Link>
							<HeadsetMicOutlinedIcon className='nav-icon' />
						</li>
						<li className='item'>
							<Link className='link' to={'/artists/1'}>Artists</Link>
							<TheaterComedyIcon className='nav-icon' />
						</li>
						<li className='item movies'
							onMouseOver={(e) => {
								document.querySelector('.dropdown').classList.add('show');
								e.stopPropagation();
							}}
							onMouseOut={(e) => {
								document.querySelector('.dropdown').classList.remove('show');
								e.stopPropagation();
							}}
						>
							<p className='link'>Movies</p>
							<LocalMoviesIcon className='nav-icon' />
							<div className='dropdown'>
								<ul>
									<li>
										<Link to='/movies/now_playing/1'>Now playing</Link>
									</li>
									<li>
										<Link to='/movies/popular/1'>Popular</Link>
									</li>
									<li>
										<Link to='/movies/top_rated/1'>Top rated</Link>
									</li>
									<li>
										<Link to='/movies/upcoming/1'>Upcoming</Link>
									</li>
									<li>
										<Link to='/movies/trending/1'>Trending</Link>
									</li>
								</ul>
								<img src={bb} />
							</div>
						</li>
						<li className='item'>
							<Link className='link' to={'/'}>Home</Link>
							<CottageOutlinedIcon className='nav-icon' />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;