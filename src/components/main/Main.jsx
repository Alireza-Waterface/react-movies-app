import './main.css';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch';
import Discover from '../discover/Discover';
import Trending_tv from '../trending_tv/Trending_tv';

const Main = () => {
	return (
		<main className='main'>
			<div className='wrapper'>
				<AdvancedSearch	/>
				<section>
					<Trending_tv />
					<Discover />
				</section>
			</div>
		</main>
	);
};

export default Main;