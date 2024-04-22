import './home.css';
import Header from '../../components/header/Header';
import Main from '../../components/main/Main';

import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

const Home = () => {


	return (
		<>
			<Header />
			<Main />
			<button
				className='top-btn'
				onClick={() => {
					window.scrollTo({
						top: 0,
						behavior: 'smooth',
					})
				}}
			>
				Back to top
				<ArrowUpwardRoundedIcon className='icon' />
			</button>
		</>
	);
};

export default Home;