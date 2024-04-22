import './artistCredits.css';

import * as requestConfig from '../../requestConfig';
import useFetch, {getImgUrl} from '../../useFetch';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';
import { useState } from 'react';

import Loader from '../loader/Loader';
import Error from '../error/Error';

const ArtistCredits = ({id, artist = 'Artist'}) => {
	const [sort, setSort] = useState('vote_average');

	const { data, loading, error } = useFetch(requestConfig.types.people, requestConfig.category.details.credits, undefined, undefined, id);

	return (
		<div className="artist-credits">
			{ !loading && error && <Error /> }
			{ loading && !error && <Loader /> }
			{ !loading && !error && <>
				<p className="title">{artist}&apos;s Most popular movies or TV shows</p>

				<div className="sort">
					Sort by:
					<span
						className={`option ${sort === 'vote_average' ? 'active' : ''}`}
						onClick={() => {
							if (sort !== 'vote_average') setSort('vote_average');
						}}
					>Score</span>
					<span
						className={`option ${sort === 'vote_count' ? 'active' : ''}`}
						onClick={() => {
							if (sort !== 'vote_count') setSort('vote_count');
						}}
					>More votes</span>
					<span
						className={`option ${sort === 'popularity' ? 'active' : ''}`}
						onClick={() => {
							if (sort !== 'popularity') setSort('popularity');
						}}
					>Popularity</span>
				</div>

				<div className="credits">
					{ data?.cast?.length > 0 &&
						data?.cast?.sort((a, b) => {
							switch(sort) {
								case 'popularity':
									return b.popularity - a.popularity;
								case 'vote_count':
									return b.vote_count - a.vote_count;
								default:
									return b.vote_average - a.vote_average;
							}
						})?.slice(0, 50)?.map( credit => (
							<Link
								to={`/details/${credit.media_type}/${credit.id}`}
								className="credit"
								key={credit.credit_id}
								style={{
									background: `url(${getImgUrl(requestConfig.imgSizes.w342, credit.backdrop_path)}) no-repeat center`,
								}}
							>
								<p className="name">{credit.title || credit.name} <ReadMoreRoundedIcon className='icon' /></p>
								<span className="score">{credit.vote_average.toFixed(1)}</span>
							</Link>
						))
					}
				</div>
				</>
			}
		</div>
	);
};

ArtistCredits.propTypes = {
	id: PropTypes.number,
	artist: PropTypes.string,
};

export default ArtistCredits;