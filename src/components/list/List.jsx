import './list.css';

import { Link } from 'react-router-dom';

import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';

import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const List = ({data, title}) => {
	return data?.results?.length > 0 ? (
		<div className='list'>
			<p className='list-title'>{title} movies</p>
			<Swiper
				slidesPerView={4}
				spaceBetween={16}
				grabCursor={true}
				className="mySwiper items"
			>
				{ data?.results?.map( movie => (
					<SwiperSlide
						key={movie.id}
						className='item'
						style={{
							background: `url(https://image.tmdb.org/t/p/w342${movie.backdrop_path}) no-repeat center`
						}}
					>
						<p className='score'>{movie.vote_average.toFixed(1)}</p>
						<Link className='title' to={`/details/${movie.media_type === 'tv' ? 'tv' : 'movie'}/${movie.id}`}>
							<span>{movie.title || movie.name}</span>
							<ReadMoreRoundedIcon className='icon' />
						</Link>
					</SwiperSlide>
				))
				}
			</Swiper>
		</div>
	) : null;
};

List.propTypes = {
	title: PropTypes.string,
	data: PropTypes.object,
}

export default List;