import './header.css';

import Slide from './Slide';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {EffectCoverflow, Pagination, Navigation} from 'swiper/modules';

import { Link, useNavigate } from 'react-router-dom';

import useFetch, {getImgUrl} from '../../useFetch';
import * as requestConfig from '../../requestConfig';

import Loader from '../loader/Loader';
import Error from '../error/Error';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

import { useUser } from '../../userProvider';

const Header = () => {
	const { data, loading, error } = useFetch(requestConfig.types.movie_list, requestConfig.category.movie_list.trending);
	
	const navigate = useNavigate();

	const [favorites, setFavorites] = useState([]);

	const {sessionID} = useUser();

	const favoriteList = async () => {
		if (sessionID == null || sessionID == 'null') return;
		try {
			const res = await axios.get(`https://api.themoviedb.org/3/account/20220153/favorite/movies?language=en-US&page=1&session_id=${sessionID}`, {
				headers: {
					accept: 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODczMWFiNTRhODg2MGZjM2ZiNDg4NTJhYzgxZWVhOSIsInN1YiI6IjY0YzM4N2NlNDMyNTBmMDBhZWUwMWJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E9HKJQHGu6815uWRCVmCdVr5gQQ7F3g-pO-J1RWxBak'
				}
			});

			setFavorites(res.data.results);
		} catch (err) {
			toast('Failed to get favorite list', {
				type: 'error',
				theme: 'colored',
				closeButton: true,
				closeOnClick: true,
				pauseOnHover: true,
			});
		}
	};

	useEffect(() => {
		favoriteList();
	}, []);

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
						rotate: 5,
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
								background: `url(${getImgUrl(requestConfig.imgSizes.w500, movie.poster_path)}) no-repeat center`
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