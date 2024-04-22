import './artist.css';

import useFetch, {getImgUrl} from '../../useFetch';
import * as requestConfig from '../../requestConfig';

import ArtistCredits from '../../components/artistCredits/AtristCredits';

import { useParams } from 'react-router-dom';

import img_placeholder from '../../images/img-placeholder.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import { useEffect, useState } from 'react';

import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';

const Artist = () => {
	const id = useParams().id;

	const [profilePath, setProfilePath] = useState('');
	const [loadingImg, setLoadingImg] = useState(true);
	
	const { data, loading, error } = useFetch(requestConfig.types.details, requestConfig.category.details.person, undefined, undefined, id);
	
	useEffect(() => {
		setProfilePath(data?.profile_path);
	}, [data]);

	const setProfile = (path) => {
		if (path == profilePath) return;
		setProfilePath(path);
		setLoadingImg(true);
	};

	return (!loading && error) ? <Error /> :
		(loading && !error) ? <Loader /> : !loading && !error && (
		<div className="artist">
				<div className="wrapper">
					<div className="details">
						<div className="profile">
							<div className="main-img">
								<img
									src={getImgUrl(requestConfig.imgSizes.w500, profilePath)}
									alt={data?.name}
									loading='eager'
									onLoad={() => setLoadingImg(false)}
									onError={(e) => e.target.setAttribute('src', img_placeholder)}
								/>
								{ loadingImg && <div className="loading">Loading image...</div> }
							</div>
							<Swiper
								slidesPerView={3}
								spaceBetween={0}
								grabCursor={true}
								navigation={true}
								modules={[Navigation]}
								className="mySwiper gallery"
							>
								{ data?.images?.profiles?.map( profile => (
									<SwiperSlide
										className='img'
										key={profile?.file_path}
										onClick={() => setProfile(profile?.file_path)}
									>
										<img
											src={getImgUrl(requestConfig.imgSizes.w154, profile.file_path)}
											alt={data?.name}
											loading='lazy'
											onError={(e) => e.target.setAttribute('src', img_placeholder)}
										/>
									</SwiperSlide>
								))
								}
							</Swiper>
						</div>

						<div className="content">
							<p className="name">{data?.name}</p>

							{ data?.biography ? <p className="bio">{data?.biography}</p> : <p className="bio">No biography available!</p> }

							<div className="birth">Born in <span>{data?.birthday ? data?.birthday : '"Unknown date"'}</span>  at <span>{data?.place_of_birth}</span></div>

							{ data?.deathday && <p className="deathday">{data?.deathday}</p> }

							{ data?.homepage && <a target='_blank' href={data?.homepage} className="homepage">Artist&apos;s web page</a> }
						</div>
					</div>

					<ArtistCredits id={data?.id} artist={data?.name} />
				</div>
		</div>
	);
};

export default Artist;