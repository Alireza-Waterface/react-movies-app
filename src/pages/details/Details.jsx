import './details.css';

import * as requestConfig from '../../requestConfig';
import useFetch, { getImgUrl } from '../../useFetch';
import { useParams } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SourceIcon from '@mui/icons-material/Source';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import List from '../../components/list/List';

import img_placeholder from '../../images/img-placeholder.png';

import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';

import { useState, useEffect } from 'react';

import axios from 'axios';

import { toast } from 'react-toastify';

const Details = () => {
	const category = useParams().category;
	const id = useParams().id;

	const { data, loading, error } = useFetch(requestConfig.types.details, category, undefined, undefined, id);

	const [isFavorite, setIsFavorite] = useState(false);
	const [isLoading, setIsLoading] = useState(null);

	useEffect(() => {
		(async () => {
			const sessionID = localStorage.getItem('sessionID');
			console.log(sessionID);
			if (!sessionID) return;
			try {
				setIsLoading(true);
				const res = await axios.get(`https://api.themoviedb.org/3/account/20220153/favorite/${category == 'movie' ? 'movies' : 'tv'}?language=en-US&page=1&session_id=${sessionID}`, {
					headers: {
						accept: 'application/json',
						Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODczMWFiNTRhODg2MGZjM2ZiNDg4NTJhYzgxZWVhOSIsInN1YiI6IjY0YzM4N2NlNDMyNTBmMDBhZWUwMWJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E9HKJQHGu6815uWRCVmCdVr5gQQ7F3g-pO-J1RWxBak'
					}
				});

				if (res.status == 200) {
					const isFavorite = res.data.results.some( item => item.id == id);
					setIsFavorite(isFavorite);
					setIsLoading(false);
				}
			} catch (err) {
				console.log(err);
				setIsLoading(false);
			}
		})()
	}, [id, category]);

	const handleFavorite = async (type = '', id = '', isFavorite) => {
		const sessionID = localStorage.getItem('sessionID');

		if (!sessionID) {
			toast('Login to your account first!', {
				type: 'error',
				theme: 'colored',
				closeButton: true,
				closeOnClick: true,
				pauseOnHover: true,
			});
			return;
		}

		const body = {
			media_type: type,
			media_id: id,
			favorite: !isFavorite,
		};

		try {
			setIsLoading(true);
			const response = await axios.post(`https://api.themoviedb.org/3/account/20220153/favorite?session_id=${sessionID}`, body, {
				headers: {
					Accept: 'application/json',
					"Content-Type": 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODczMWFiNTRhODg2MGZjM2ZiNDg4NTJhYzgxZWVhOSIsInN1YiI6IjY0YzM4N2NlNDMyNTBmMDBhZWUwMWJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E9HKJQHGu6815uWRCVmCdVr5gQQ7F3g-pO-J1RWxBak'
				}
			});

			if (response.data.success) {
				toast(response.data.status_code == 13 ? 'Removed from favorites' : 'Added to favorites', {
					type: 'success',
					theme: 'colored',
					closeButton: true,
					closeOnClick: true,
					pauseOnHover: true,
				});

				setIsFavorite(prev => !prev);
				setIsLoading(false);
			} else {
				toast('An error accured', {
					type: 'error',
					theme: 'colored',
					closeButton: true,
					closeOnClick: true,
					pauseOnHover: true,
				});
				setIsLoading(false);
			}
		} catch (err) {
			console.log(err);
			toast(err.response.data.status_message, {
				type: 'error',
				theme: 'colored',
				closeButton: true,
				closeOnClick: true,
				pauseOnHover: true,
			});
			setIsLoading(false);
		}
	};

	return (
		<div className='details'>
			{ !loading && error && <Error /> }
			{ loading && !error && <Loader /> }
			{ !loading && !error &&
				<div className='wrapper'>
					<div
						className='main'
						style={{
							background: `url(${getImgUrl(requestConfig.imgSizes.w780, data?.backdrop_path)}) no-repeat center`,
						}}
					>
						<div className='img'>
							<img
								src={getImgUrl(requestConfig.imgSizes.w342, data?.poster_path)}
								alt={data?.original_title}
								onError={(e) => e.target.setAttribute('src', img_placeholder)}
								loading='lazy'
							/>
						</div>
						<div className='details'>
							<h2 className='title'>{data?.title}</h2>
							<p className='genres font-20'>
								<SourceIcon className='icon' />
								Genres: 
								{ data?.genres?.map( genre => (
									<span key={genre.id}>{genre.name}</span>
								)) }
							</p>
							<a
								className='page font-20'
								href={data?.homepage}
								rel='noreferrer'
								target='_blank'
							>
								<PublicOutlinedIcon className='icon' />
								Movie homepage</a>
							{ data?.spoken_languages?.length > 0 &&
								<div className='langs flex-items-center font-20'>
									<TranslateOutlinedIcon className='icon' />
									Spoken languages: 
										{ data?.spoken_languages?.map( lang => (
											<span key={lang.iso_639_1}>{lang.english_name}</span>
										)) }
								</div>
							}
							<p className='overview font-20'>{data?.overview}</p>
							{ data?.runtime && <p className='time flex-items-center font-20'><AccessTimeIcon className='icon' /> {data?.runtime} min</p> }
							<div className='production'>
								{ data?.production_companies?.length > 0 &&
									<ul className='production-comps font-20'>
										<p className='flex-items-center'><BusinessOutlinedIcon className='icon' />
										Production companies: </p>
										{ data?.production_companies?.map( company => (
											<li className='company' key={company.id}>{company.name}</li>
										)) }
									</ul>
								}
								{ data?.production_countries?.length > 0 &&
									<ul className='production-countries font-20'>
										<p className='flex-items-center'><LanguageOutlinedIcon className='icon' />
										Production countries:</p>
										{ data?.production_countries?.map( country => (
											<li className='country' key={country.iso_3166_1}>{country.name}</li>
										)) }
									</ul>
								}
							</div>
							{ data?.release_date && <p className='release-date flex-items-center font-20'><CalendarMonthOutlinedIcon className='icon' /> Release date: {data?.release_date}</p> }
							<p className='status flex-items-center font-20'>
								{ data?.status == 'Released' ? <CheckCircleIcon className='icon' /> : <PendingIcon className='icon' /> }
								Status: {data?.status}
							</p>
							<div className='score'>
								<div style={{
									color: data?.vote_average < 4 ? '#f22' :
										(data?.vote_average >= 4 && data?.vote_average < 6.5) ? '#ff2' :
										'#2f2',
								}}>
									{data?.vote_average?.toFixed(1)}
									<small>/10</small>
								</div>
								<span>{data?.vote_count} votes</span>
							</div>

							<button
								className='favorite'
								onClick={() => handleFavorite(category, id, isFavorite)}
								disabled={isLoading}
								style={{
									filter: isLoading ? 'brightness(30%)' : 'unset',
								}}
								>
								{ isFavorite && <FavoriteRoundedIcon className='icon' /> }
								{ !isFavorite && <FavoriteBorderRoundedIcon className='icon' /> }
							</button>
						</div>
					</div>

					<div className='videos'>
						{data?.videos?.results?.map( video => {
							if (video.type === 'Trailer') {
								return <div className='video' key={video.id}>
									<p className='title'>{video.name}</p>
									<iframe
										className='video-frame'
										src={`https://www.youtube.com/embed/${video.key}`}
										title="video"
									></iframe>
								</div>
							}
						})}
						
						{data?.videos?.results?.map( video => {
							if (video.type === 'Teaser') {
								return <div className='video' key={video.id}>
									<p className='title'>{video.name}</p>
									<iframe
										className='video-frame'
										src={`https://www.youtube.com/embed/${video.key}`}
										title="video"
									></iframe>
								</div>
							}
						})}
					</div>

					<List data={data?.similar} title={'similar'} />
					
					<List data={data?.recommendations} title={'recommended'} />
				</div>
			}
		</div>
	);
};

export default Details;