import './register.css';

import { useState } from 'react';

import axios from 'axios';

const Register = () => {
	const [error, setError] = useState(false);

	const register = async () => {
		try {
			const res = await axios.get('https://api.themoviedb.org/3/authentication/token/new', {
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODczMWFiNTRhODg2MGZjM2ZiNDg4NTJhYzgxZWVhOSIsInN1YiI6IjY0YzM4N2NlNDMyNTBmMDBhZWUwMWJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E9HKJQHGu6815uWRCVmCdVr5gQQ7F3g-pO-J1RWxBak'
				},
			});

			const url = location.origin;

			const navLink = document.createElement('a');
			navLink.setAttribute('href', `https://www.themoviedb.org/authenticate/${res?.data?.request_token}?redirect_to=${url}/approved`);
			navLink.click();
			
			setError(false);
		} catch (err) {
			console.log(err);
			setError(true);
		}
	};

	return (
		<div className="register">
			<div className="wrapper">
				<p className='desc'>You need to sign-in to your account to be able to use all website features!</p>
				<button onClick={register}>Get token</button>
				{error && <p className='error'>Failed to get token</p>}
			</div>
		</div>
	);
};

export default Register;