import './main.css';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch';
import Discover from '../discover/Discover';
import TV_on_air from '../tv_on_air/TV_on_air';

const Main = () => {
	return (
		<main className='main'>
			<div className='wrapper'>
				<AdvancedSearch	/>
				<section>
					<TV_on_air />
					<Discover />
				</section>
			</div>
		</main>
	);
};

export default Main;