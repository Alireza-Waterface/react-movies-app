import { Link, useSearchParams } from 'react-router-dom';
import './approved.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Approved = () => {
	const [searchParams] = useSearchParams();
	const requestToken = searchParams.get('request_token');

	const [error, setError] = useState(() => {
		localStorage.getItem('sessionID') ? true : false;
	});

	useEffect(() => {
		if (localStorage.getItem('sessionID')) return;
		( async () => {
			try {
				const response = await axios.post('https://api.themoviedb.org/3/authentication/session/new', {
					request_token: requestToken,
				}, {
					headers: {
						Accept: 'application/json',
						"Content-Type": 'application/json',
						Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODczMWFiNTRhODg2MGZjM2ZiNDg4NTJhYzgxZWVhOSIsInN1YiI6IjY0YzM4N2NlNDMyNTBmMDBhZWUwMWJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E9HKJQHGu6815uWRCVmCdVr5gQQ7F3g-pO-J1RWxBak'
					},
				});

				if (response.data.session_id) {
					localStorage.setItem('sessionID', response.data.session_id);
					setError(false);
				} else {
					setError(true);
				}
			} catch (err) {
				console.log(err);
				setError(true);
			}
		})()
	}, [requestToken]);

	return (
		<div className="approved">
			<div className="wrapper">
				{error ?
					<p className="error">Failed to approve account!</p>
					:
					<p className="success">Your account approved, you are now able to use all features!</p>
				}
				<div>
					<button
						className='search-btn'
						onClick={() => {
							document.getElementById('search-input').focus();
						}}
					>Search movie or serie</button>
					<Link className='homepage-link' to={'/'}>Start browsing</Link>
				</div>
			</div>
		</div>
	)
};

export default Approved;