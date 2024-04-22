import './tv_on_air.css';

import * as requestConfig from '../../requestConfig';
import useFetch from '../../useFetch';

import { Link } from 'react-router-dom';

import Loader from '../loader/Loader';
import Error from '../error/Error';

const TV_on_air = () => {
	const { data, loading, error } = useFetch(requestConfig.types.tv, requestConfig.category.tv.on_the_air, undefined, undefined, undefined, undefined);

	return (
		<div className='tv-on-air'>
			{ !loading && error && <Error /> }
			{ loading && !error && <Loader /> }
			{ !loading && !error &&
				<p className='title'>TV series on the air</p> }
			{ !loading && !error &&
				data?.results?.map( item => (
					<Link
						to={`/details/tv/${item.id}`}
						className='tv-card'
						key={item.id}
						style={{
							background: `url(https://image.tmdb.org/t/p/w342${item.poster_path}) no-repeat center bottom`
						}}
					>
						<p className='title'>{item.name}</p>
					</Link>
				))
			}
		</div>
	);
};

export default TV_on_air;