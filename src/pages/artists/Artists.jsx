import './artists.css';

import useFetch, { getImgUrl } from '../../useFetch';
import * as requestConfig from '../../requestConfig';

import { Link, useParams } from 'react-router-dom';

import img_placeholder from '../../images/img-placeholder.png';
import { useState } from 'react';

import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';

const Search = () => {
	const [query, setQuery] = useState('');

	const { data, loading, error } = useFetch(requestConfig.types.search, requestConfig.category.search.person, query);

	return (
		<div className="search-bar">
			<label className='search-label' htmlFor="search-input">Search any artist:</label>
			<input
				type="text"
				name="search-input"
				id="search-input"
				className="search-input"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder='Emma Stone...'
			/>

			<div
				className="results"
				style={{
					display: query.length > 2 ? 'unset' : 'none',
				}}
			>
				{ !loading && error && <Error /> }
				{ loading && !error && <Loader /> }
				{ !loading && !error &&
					data?.results?.length <= 0 ? <p className='no-data'>Couldn&apos;t find any artist!</p> :
					data?.results?.sort((a, b) => b.popularity - a.popularity).map( artist => (
						<Link to={`/artist/${artist.id}`} className="artist" key={artist.id}>
							<img
								src={getImgUrl(requestConfig.imgSizes.w92, artist.profile_path)}
								alt={artist.name}
								className="profile"
								onError={(e) => e.target.setAttribute('src', img_placeholder)}
							/>
							<div className="details">
								<p className="name">{artist.name}</p>
								<ul className='known-for'>
									<legend>Known for:</legend>
									{ artist.known_for.map( item => (
										<li className="item" key={item.id}>
											<Link className='link' to={`/details/${item.media_type}/${item.id}`}>
												{item.title || item.name}
											</Link>
										</li>
									)) }
								</ul>
							</div>
						</Link>
					))
				}
			</div>
		</div>
	);
};

const Artists = () => {
	const page = useParams().page;

	const { data, loading, error } = useFetch(requestConfig.types.people, undefined, undefined, page);

	return (
		<>
			{ !loading && error && <Error /> }
			{ !error && loading && <Loader /> }
			{ !loading && !error &&
				<div className="artists">
					<div className="wrapper">
						<h2 className="title">Trending artists</h2>
						
						<Search />

						<div className="list">
							{ data?.results?.map( artist => (
								<Link
									className="item"
									key={artist.id}
									to={`/artist/${artist.id}`}
								>
									<img
										src={getImgUrl(requestConfig.imgSizes.w154, artist.profile_path)}
										alt={artist.name}
										className='profile'
										loading='lazy'
										onError={(e) => e.target.setAttribute('src', img_placeholder)}
									/>
									<p className="name">{artist.name}</p>
								</Link>
							) )
							}
						</div>

						<div className='pagination'>
							{ parseInt(page) > 1 &&
								<Link className='navigator' to={`/artists/1`}><span>1</span></Link>
							}
							{ parseInt(page) > 2 &&
								<Link className='navigator' to={`/artists/${parseInt(page) - 1}`}><span>{parseInt(page) - 1}</span></Link>
							}
							<p className='navigator active'>
								<span>{parseInt(page)}</span>
							</p>
							{ parseInt(page) < (data?.total_pages <= 500 ? data?.total_pages : 500) &&
								<Link className='navigator' to={`/artists/${parseInt(page) + 1}`}><span>{parseInt(page) + 1}</span></Link>
							}
							{ parseInt(page) < (data?.total_pages <= 500 ? data?.total_pages : 500) &&
								<Link className='navigator' to={`/artists/${data?.total_pages > 500 ? 500 : data?.total_pages}`}><span>{data?.total_pages > 500 ? 500 : data?.total_pages}</span></Link>
							}
						</div>
					</div>
				</div>
			}
		</>
	);
};

export default Artists;