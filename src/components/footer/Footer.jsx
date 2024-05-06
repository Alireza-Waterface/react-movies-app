import './footer.css';

import footerBG from '../../images/footer-bg.jpg';
import { Link } from 'react-router-dom';

import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import LiveTvIcon from '@mui/icons-material/LiveTv';

const Footer = () => {


	return (
		<footer
			className='footer'
			style={{
				background: `url(${footerBG}) no-repeat center`,
			}}
		>
			<div className="wrapper">
				<div className="section movies-links">
					<ul>
						<legend className="title">Movies</legend>
						<li><Link to='/movies/trending/1' className='link'>Trending</Link></li>
						<li><Link to='/movies/upcoming/1' className='link'>Upcoming</Link></li>
						<li><Link to='/movies/top_rated/1' className='link'>Top rated</Link></li>
						<li><Link to='/movies/popular/1' className='link'>Popular</Link></li>
						<li><Link to='/movies/now_playing/1' className='link'>Now playing</Link></li>
					</ul>
				</div>

				<div className="section contact">
					<legend className="title">Contact</legend>
					<address>
						<ul>
							<li><a href="mailto:Alireza.waterface@outlook.com" className="email">
								<MailOutlineRoundedIcon />
								Send Email
							</a></li>
							<li><a href="tel:+989155706085" className="phone">
								<CallRoundedIcon />
								Call
							</a></li>
							<li><a href="sms:+989155706085" className="sms">
								<QuestionAnswerRoundedIcon />
								Send SMS
							</a></li>
						</ul>
					</address>
				</div>

				<div className="section links">
					<legend className='title'>Useful links</legend>
					<ul>
						<li><a href="https://www.themoviedb.org/" target='_blank' className="link">
							<LiveTvIcon />
							TMDB
						</a></li>
						<li><a href="https://waterface.ir/" target='_blank' className="link">
							<CodeIcon />
							Developer page
						</a></li>
					</ul>
				</div>

				<div className="section social">
					<legend className="title">Social</legend>
					<ul>
						<li><a className='social-link telegram' href="https://t.me/+989155706085">
							<TelegramIcon className='icon' />
						</a></li>
						<li><a className='social-link whatsapp' href="https://wa.me/+989155706085">
							<WhatsAppIcon className='icon' />
						</a></li>
						<li><a className='social-link linkedin' href="https://www.linkedin.com/in/waterface">
							<LinkedInIcon className='icon' />
						</a></li>
						<li><a className='social-link github' href="https://github.com/Alireza-Waterface">
							<GitHubIcon className='icon' />
						</a></li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;