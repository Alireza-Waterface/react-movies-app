/* eslint-disable react/prop-types */
import axios from "axios";

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import { toast } from 'react-toastify';
import { useState } from "react";

import { useUser } from "../../userProvider";

const Slide = ({movie, favorites = [], favoriteList}) => {
	const isFavorite = (id) => favorites?.some(item => item.id == id);

	const [isLoading, setIsLoading] = useState(null);

	const {sessionID} = useUser();

	const handleFavorite = async (e, type = '', id = '', isFavorite) => {
		e.stopPropagation();

		if (sessionID == null || sessionID == 'null') {
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
			favorite: isFavorite ? false : true,
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
				await favoriteList();
				toast(response.data.status_code == 13 ? 'Removed from favorites' : 'Added to favorites', {
					type: 'success',
					theme: 'colored',
					closeButton: true,
					closeOnClick: true,
					pauseOnHover: true,
				});
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
			toast('Failed to stablish connection', {
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
		<>
			<p className='name'>{movie.original_title}</p>
			<p className='score'>{movie.vote_average?.toFixed(1)}<small>/10</small>⭐</p>

			<button
				className='favorite'
				onClick={(e) => handleFavorite(e, movie.media_type, movie.id, isFavorite(movie.id))}
				disabled={isLoading}
				style={{
					filter: isLoading ? 'brightness(50%)' : 'unset',
				}}
			>
				{ isFavorite(movie.id) ?
					<FavoriteRoundedIcon className='icon' /> :
					<FavoriteBorderRoundedIcon className='icon' />
				}
			</button>
		</>
	)
};

export default Slide;