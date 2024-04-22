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

import List from '../../components/list/List';

import img_placeholder from '../../images/img-placeholder.png';

import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';

const Details = () => {
	const category = useParams().category;
	const id = useParams().id;

	const { data, loading, error } = useFetch(requestConfig.types.details, category, undefined, undefined, id);

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
									color: data?.vote_average < 4 ? 'red' :
										(data?.vote_average >= 4 && data?.vote_average < 6.5) ? 'yellow' :
										'#2f2',
								}}>
									{data?.vote_average?.toFixed(1)}
									<small>/10</small>
								</div>
								<span>{data?.vote_count} votes</span>
							</div>
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