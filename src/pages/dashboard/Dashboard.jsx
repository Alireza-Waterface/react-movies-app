import axios from 'axios';
import './dashboard.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../userProvider';
import { useEffect, useState } from 'react';
import Error from '../../components/error/Error';
import Loader from '../../components/loader/Loader';
import { Link } from 'react-router-dom';
import {getImgUrl} from '../../useFetch';
import { imgSizes } from '../../requestConfig';
import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';

const Dashboard = () => {
	const navigate = useNavigate();

	const { sessionID, updateSessionID } = useUser();

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [tabTitle, setTabTitle] = useState('Favorite movies');
	
	useEffect(() => {
		getData();
	}, [])

	if (sessionID == null) {
		toast.info('You need to login first', {
			theme: 'colored',
			pauseOnHover: true,
			closeOnClick: true,
			type: 'info',
		})
		navigate('/register');
		return;
	}

	const deleteSession = async () => {
		try {
			const res = await axios.delete('https://api.themoviedb.org/3/authentication/session', {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODczMWFiNTRhODg2MGZjM2ZiNDg4NTJhYzgxZWVhOSIsInN1YiI6IjY0YzM4N2NlNDMyNTBmMDBhZWUwMWJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E9HKJQHGu6815uWRCVmCdVr5gQQ7F3g-pO-J1RWxBak'
				},
				data: {
					session_id: sessionID,
				},
			});

			if (res.status == 200) {
				updateSessionID(null);
				toast.success('Session deleted successfully', {
					theme: 'colored',
					pauseOnHover: true,
					closeOnClick: true,
					type: 'success',
				});
				navigate('/');
			}
		} catch(err) {
			console.log(err);
			toast.error('Failed to delete session', {
				theme: 'colored',
				pauseOnHover: true,
				closeOnClick: true,
				type: "error",
			});
		}
	};

	const getData = async (type = 'movies', category = 'favorite', title = 'Favorite movies') => {
		if (tabTitle === title) return;
		setError(false);
		setLoading(true);
		setData([]);
		try {
			const res = await axios.get(`https://api.themoviedb.org/3/account/20220153/${category}/${type}?language=en-US&page=1&session_id=${sessionID}&sort_by=created_at.desc`, {
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODczMWFiNTRhODg2MGZjM2ZiNDg4NTJhYzgxZWVhOSIsInN1YiI6IjY0YzM4N2NlNDMyNTBmMDBhZWUwMWJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E9HKJQHGu6815uWRCVmCdVr5gQQ7F3g-pO-J1RWxBak'
				},
			});

			setData(res.data.results);
			setLoading(false);
			setError(false);
			setTabTitle(title);
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
		} catch(err) {
			console.log(err);
			toast.error('Failed to get favorites data', {
				theme: 'colored',
				pauseOnHover: true,
				closeOnClick: true,
				closeButton: true,
				type: "error",
			});
			setLoading(false);
			setError(true);
		}
	};

	return (
		<div className="dashboard">
			<div className="wrapper">
				<div className="tabs">
					<button onClick={() => getData('movies', 'favorite', 'Favorite movies')}>Favorite movies</button>
					<button onClick={() => getData('tv', 'favorite', 'Favorite TV series')}>Favorite TV</button>
					<button onClick={() => getData('movies', 'rated', 'Rated movies')}>Rated movies</button>
					<button onClick={() => getData('tv', 'rated', 'Rated TV series')}>Rated TV</button>
					<button onClick={deleteSession}>LogOut</button>
				</div>

				<div className="content">
					<h3>{tabTitle}</h3>
					{ !loading && error && <Error /> }
					{ loading && !error && <Loader /> }
					{ !loading && !error &&
						<div className='list'>
							{ data.length > 0 ? data.map( item => (
								<Link
									to={`/details/${tabTitle.includes('TV') ? 'tv' : 'movie'}/${item.id}`}
									className="movie"
									key={item.id}
									style={{
										background: `url(${getImgUrl(imgSizes.w342, item.poster_path)}) no-repeat center`
									}}
								>
									<span>
										Click for more details
										<ReadMoreRoundedIcon className='icon' />
									</span>
								</Link>
							)) : <p>No item to show</p>}
						</div>
					}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;