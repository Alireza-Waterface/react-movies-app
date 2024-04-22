import './movieTile.css';

import img_placeholder from '../../images/img-placeholder.png';

import SourceIcon from '@mui/icons-material/Source';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';

import genres from '../../genres';
import languages from '../../languages';

import { getImgUrl } from '../../useFetch';

import { imgSizes } from '../../requestConfig';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const MovieTile = ({movie}) => {
	return (
		<div className='movie'>
			<div className='poster'>
				<img
					src={getImgUrl(imgSizes.w342, movie.poster_path)}
					alt={movie.title}
					onError={(e) => e.target.setAttribute('src', img_placeholder)}
					loading='lazy'
				/>
			</div>

			<div className='details'>
				<h3 className='title'>{movie.title}</h3>

				<ul className='genres'>
				<SourceIcon className='icon' />
				Genres: 
					{ movie.genre_ids.map( id => (
						<span key={id}>{genres.find(genre => genre.id == id).name}</span>
					)) }
				</ul>

				<p className='language'>
				<TranslateOutlinedIcon className='icon' />
				Language: {languages.find(lang => lang.iso_639_1 == movie.original_language).english_name}</p>

				<p className='overview'>{movie.overview}</p>

				<p className='release'>Release date: {movie.release_date}</p>

				<div className={`score ${movie?.vote_average < 4 ? 'red' :
							(movie?.vote_average >= 4 && movie?.vote_average < 6.5) ? 'yellow' :
							'green'}`}>
					<div>
						{movie?.vote_average?.toFixed(1)}
						<small>/10</small>
					</div>
					<span>{movie?.vote_count} votes</span>
				</div>

				<div className='more'>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 27" className="bg_crev"> <path d="M0 27c.417-.01.838-.03 1.3-.03a46.441 46.441 0 0023.462-6.34L43.127 4.11a16.829 16.829 0 0122.04 0l13.471 12.12.085-.04a45.881 45.881 0 0029.971 10.78c.463 0 .888.02 1.309.03H0z" className="moresvgposts" fillRule="evenodd"></path> </svg>
					<Link to={`/details/movie/${movie.id}`}>
						<ReadMoreRoundedIcon className='icon' />
					</Link>
					<span>More details</span>
				</div>

				
			</div>
		</div>
	);
};

MovieTile.propTypes = {
	movie: PropTypes.object.isRequired,
}

export default MovieTile;