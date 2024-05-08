import './contact.css';

import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CallIcon from '@mui/icons-material/Call';
import SmsIcon from '@mui/icons-material/Sms';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useState } from 'react';

const Contact = () => {
	const initialData = {
		name: '',
		subject: '',
		text: '',
		email: '',
	};

	const [formData, setFormData] = useState(initialData);

	const handleChange = (e) => {
		e.preventDefault();

		setFormData( prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(formData);

		setFormData(initialData);
	};

	return (
		<div className="contact">
			<div className="wrapper">
				<h2 className='title'>Have any trouble or question? <br /> Contact us now!</h2>

				<div className="links">
					<a href='https://t.me/+989155706085' target='_blank'>
						<TelegramIcon className='icon' />
					</a>
					<a href='https://linkedin.com/in/waterface' target='_blank'>
						<LinkedInIcon className='icon' />
					</a>
					<a href='tel:+989155706085' target='_blank'>
						<CallIcon className='icon' />
					</a>
					<a href='sms:+989155706085' target='_blank'>
						<SmsIcon className='icon' />
					</a>
					<a href='mailto:alireza.waterface@outlook.com' target='_blank'>
						<MailOutlineIcon className='icon' />
					</a>
				</div>

				<div className="contact">
					<form onSubmit={handleSubmit}>
						<p className='title'>Or just send it right here</p>
						<input
							type="text"
							name='name'
							placeholder='Your name'
							value={formData.name}
							onChange={(e) => handleChange(e)}
							required
						/>

						<input
							type="email"
							name="email"
							placeholder='someone@example.com'
							value={formData.email}
							onChange={(e) => handleChange(e)}
							required
						/>

						<input
							type="text"
							name='subject'
							placeholder='Subject'
							value={formData.subject}
							onChange={(e) => handleChange(e)}
							required
						/>

						<textarea
							name="text"
							placeholder='Explain your problem, Idea or ...'
							value={formData.text}
							onChange={(e) => handleChange(e)}
							required
						></textarea>

						<button type='submit'>Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Contact;