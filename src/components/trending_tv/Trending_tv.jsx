import './trending_tv.css';

import * as requestConfig from '../../requestConfig';
import useFetch, {getImgUrl} from '../../useFetch';

import { Link } from 'react-router-dom';

import Loader from '../loader/Loader';
import Error from '../error/Error';

const Trending_tv = () => {
	const { data, loading, error } = useFetch(requestConfig.types.tv, requestConfig.category.tv.trending, undefined, undefined, undefined, undefined);

	return (
		<div className='tv-on-air'>
			{ !loading && error && <Error /> }
			{ loading && !error && <Loader /> }
			{ !loading && !error &&
				<p className='title'>Trending TV series</p> }
			{ !loading && !error &&
				data?.results?.map( item => (
					<Link
						to={`/details/tv/${item.id}`}
						className='tv-card'
						key={item.id}
						style={{
							background: `url(${getImgUrl(requestConfig.imgSizes.w342, item.poster_path)}) no-repeat center bottom`
						}}
					>
						<p className='title'>{item.name}</p>
					</Link>
				))
			}
		</div>
	);
};

export default Trending_tv;