import './topBar.css';
import { Link } from 'react-router-dom';

import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

import logo from '../../images/wfmoviefull.png';

import { useEffect } from 'react';

const TopBar = () => {
	useEffect(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
			document.getElementById('themeSwitch').checked = true;
		} else document.documentElement.classList.add('light');
	}, []);

	const changeTheme = () => {
		const rootClassList = document.documentElement.classList;
		if (rootClassList.contains('light')) {
			rootClassList.remove('light');
			rootClassList.add('dark');
		} else if (rootClassList.contains('dark')) {
			rootClassList.remove('dark');
			rootClassList.add('light');
		}
	};

	return (
		<div className='top-bar'>
			<div className='wrapper'>
				<Link to={'/'} className='logo'>
					<img src={logo} alt="logo" className="logo-img" />
					<div>
						<h1 className='title'>WF Movies</h1>
						<p className='desc'>Explore Movies and Series</p>
					</div>
				</Link>
				
				<div className="switch">
					<input type="checkbox" id="themeSwitch" name="theme-switch" className="theme-switch__input" />
					<label onClick={changeTheme} htmlFor="themeSwitch" className="theme-switch__label">
						<span></span>
					</label>
				</div>

				<div className='register'>
					<Link className='reg-link' to={localStorage.getItem('sessionID') ? '/dashboard' : '/register'}>
						
						{ localStorage.getItem('sessionID') ?
							'Dashboard'
							:
							<>Login <span>/</span> SignUp</>
						}
						<LoginOutlinedIcon className='register-icon' />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default TopBar;