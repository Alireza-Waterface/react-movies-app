import { Link, useSearchParams } from 'react-router-dom';
import './approved.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../userProvider';

const Approved = () => {
	const [searchParams] = useSearchParams();
	const requestToken = searchParams.get('request_token');

	const {sessionID, updateSessionID} = useUser();

	useEffect(() => {
		if (sessionID != null || sessionID != 'null') return;

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
					updateSessionID(response.data.session_id);
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [requestToken, sessionID, updateSessionID]);

	return (
		<div className="approved">
			<div className="wrapper">
				{sessionID == null || sessionID == 'null' ?
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