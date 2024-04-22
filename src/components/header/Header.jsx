/* eslint-disable react/prop-types */
import './header.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {EffectCoverflow, Pagination, Navigation} from 'swiper/modules';

import { Link, useNavigate } from 'react-router-dom';

import useFetch from '../../useFetch';
import * as requestConfig from '../../requestConfig';

import Loader from '../loader/Loader';
import Error from '../error/Error';

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import { useEffect, useState } from 'react';
import axios from 'axios';

const Favorite = FavoriteRoundedIcon;
const NotFavorite = FavoriteBorderRoundedIcon;

const Slide = ({movie, favorites = [], favoriteList}) => {
	const isFavorite = (id) => favorites?.some(item => item.id == id);

	const handleFavorite = async (e, type = '', id = '', isFavorite) => {
		e.stopPropagation();

		const sessionID = localStorage.getItem('sessionID');

		const body = {
			media_type: type,
			media_id: id,
			favorite: isFavorite ? false : true,
		};

		try {
			const response = await axios.post(`https://api.themoviedb.org/3/account/20220153/favorite?session_id=${sessionID}`, body, {
				headers: {
					Accept: 'application/json',
					"Content-Type": 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODczMWFiNTRhODg2MGZjM2ZiNDg4NTJhYzgxZWVhOSIsInN1YiI6IjY0YzM4N2NlNDMyNTBmMDBhZWUwMWJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E9HKJQHGu6815uWRCVmCdVr5gQQ7F3g-pO-J1RWxBak'
				}
			});

			if (response.data.success) favoriteList();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<p className='name'>{movie.original_title}</p>
			<p className='score'>{movie.vote_average?.toFixed(1)}<small>/10</small>⭐</p>

			<button
				className='favorite'
				onClick={(e) => handleFavorite(e, movie.media_type, movie.id, isFavorite(movie.id))}
			>{isFavorite(movie.id) ? <Favorite className='icon' /> : <NotFavorite className='icon' />}</button>
		</>
	)
};

const Header = () => {
	const { data, loading, error } = useFetch(requestConfig.types.movie_list, requestConfig.category.movie_list.trending);
	
	const navigate = useNavigate();

	const [favorites, setFavorites] = useState([]);

	const favoriteList = async () => {
		const sessionID = localStorage.getItem('sessionID');
		try {
			const res = await axios.get(`https://api.themoviedb.org/3/account/20220153/favorite/movies?language=en-US&page=1&session_id=${sessionID}&sort_by=created_at.desc`, {
				headers: {
					accept: 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODczMWFiNTRhODg2MGZjM2ZiNDg4NTJhYzgxZWVhOSIsInN1YiI6IjY0YzM4N2NlNDMyNTBmMDBhZWUwMWJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E9HKJQHGu6815uWRCVmCdVr5gQQ7F3g-pO-J1RWxBak'
				}
			});

			setFavorites(res.data.results);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		favoriteList();
	}, [])

	return (
		<div className='header'>
			<div className='wrapper'>
			{ !loading && error && <Error /> }
			{ loading && !error && <Loader /> }
			{ !loading && !error &&
				<Swiper
					effect={'coverflow'}
					grabCursor={true}
					centeredSlides={true}
					loop={true}
					slidesPerView={'auto'}
					coverflowEffect={{
						rotate: 0,
						stretch: 0,
						depth: 100,
						modifier: 3,
						slideShadows: true,
					}}
					navigation={true}
					pagination={{
						clickable: true,
					}}
					modules={[EffectCoverflow, Pagination, Navigation]}
					className='swiper-container'
				>
					{ data?.results?.sort((a, b) => b.populary - a.popularity)?.slice(0, 10)?.map( movie => (
						<SwiperSlide
							key={movie.id}
							title={movie.title}
							className='swiper-slide'
							onClick={() => {
								navigate(`/details/movie/${movie.id}`);
							}}
							style={{
								background: `url(https://image.tmdb.org/t/p/w500${movie.poster_path}) no-repeat center`
							}}
						>
							<Slide movie={movie} favorites={favorites} favoriteList={favoriteList} />
						</SwiperSlide>
						))
					}
					<Link
						className='all'
						to={'/movies/trending/1'}
					>All trending movies</Link>
				</Swiper>
			}
			</div>
		</div>
	);
};

export default Header;