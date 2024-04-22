import './advancedSearch.css';
import icon from './icons8-search-128.svg';
import countries from '../../countries';
import languages from '../../languages';
import genres from '../../genres';

import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdvancedSearch = () => {
	const [country, setCountry] = useState('all');
	const [language, setLanguage] = useState('all');
	const [genre, setGenre] = useState('all');
	const [sort, setSort] = useState('none');
	const [minScore, setMinScore] = useState(0);
	const [year, setYear] = useState(1900);
	const [adult, setAdult] = useState(false);
	// const [keyword, setKeyword] = useState('');
	// const [artist, setArtist] = useState('');
	const [time, setTime] = useState(10);
	const [votes, setVotes] = useState(0);

	return (
		<div className='advanced-search'>
			<div className='wrapper'>
				<div className='title'>
					<img src={icon} alt='search-icon' />
					<h3>Advanced Search</h3>
				</div>

				<div className='filters'>
					<div className='country flex-items-center'>
						<span>Country:</span>
						<select
							onChange={(e) => {
								setCountry(e.target.value);
							}}
							value={country}
						>
							<option
								value='all'
								className='country-option'
							>All</option>
							{ countries.map( country => (
								<option
									key={country.iso_3166_1}
									className='country-option'
									value={country.iso_3166_1}
								>{country.english_name}</option>
							)) }
						</select>
					</div>

					<div className='language flex-items-center'>
						<span>Language:</span>
						<select
							onChange={(e) => {
								setLanguage(e.target.value);
							}}
							value={language}
						>
							<option
								value='all'
								className='lang-option'
							>All</option>
							{ languages.map( lang => (
								<option
									key={lang.iso_639_1}
									className='lang-option'
									value={lang.iso_639_1}
								>{lang.english_name}</option>
							)) }
						</select>
					</div>

					<div className='genres flex-items-center'>
						<span>Genres:</span>
						<select
							onChange={(e) => {
								setGenre(e.target.value);
							}}
							value={genre}
						>
							<option
								value='all'
								className='genre-option'
							>All</option>
							{ genres.map( genre => (
								<option
									key={genre.id}
									className='genre-option'
									value={genre.id}
								>{genre.name}</option>
							)) }
						</select>
					</div>

					<div className='sort flex-items-center'>
						<span>Sort by:</span>
						<select
							onChange={(e) => {
								setSort(e.target.value);
							}}
							value={sort}
						>
							<option value='none'>Does not matter</option>
							<option value='primary_release_date.desc'>Newest</option>
							<option value='primary_release_date.asc'>Oldest</option>
							<option value='popularity.desc'>Popularity</option>
							<option value='vote_average.desc'>More score</option>
							<option value='vote_count.desc'>More votes</option>
							<option value='title.asc'>Title</option>
						</select>
					</div>

					<div className='score flex-items-center'>
						<label htmlFor='score-range'>Score: {minScore}</label>
						<input
							type='range'
							id='score-range'
							min={0}
							max={10}
							value={minScore}
							onChange={(e) => {
								setMinScore(e.target.value);
							}}
						/>
					</div>

					<div className='year flex-items-center'>
						<label htmlFor='year-range'>Release: {year}</label>
						<input
							type='range'
							id='year-range'
							min={1900}
							max={2024}
							value={year}
							onChange={(e) => {
								setYear(+e.target.value);
							}}
						/>
					</div>

					<div className='time flex-items-center'>
						<label htmlFor='time-range'>Time: {time}</label>
						<input
							type='range'
							id='time-range'
							min={10}
							max={200}
							value={time}
							onChange={(e) => {
								setTime(+e.target.value);
							}}
						/>
					</div>

					<div className='adult flex-items-center'>
						<span>Adult content:</span>
						<select
							onChange={(e) => {
								setAdult(e.target.value);
							}}
							value={adult}
						>
							<option value={true}>Yes</option>
							<option value={false}>No</option>
						</select>
					</div>

					<div className='votes flex-items-center'>
						<label>Min votes:</label>
						<input
							type='text'
							inputMode='numeric'
							value={votes}
							onChange={(e) => {
									setVotes(+e.target.value);
							}}
						/>
					</div>

					{/* <div className='keyword flex-items-center'>
						<label htmlFor='word'>Keyword:</label>
						<input
							type='text'
							placeholder='Avengers...'
							id='word'
							value={keyword}
							onChange={(e) => {
								setKeyword(e.target.value);
							}}
						/>
					</div> */}

					{/* <div className='artist flex-items-center'>
						<label htmlFor='artist'>Artist:</label>
						<input
							type='text'
							placeholder='leonardo dicaprio'
							id='artist'
							value={artist}
							onChange={(e) => {
								setArtist(e.target.value);
							}}
						/>
					</div> */}

					<Link
						className='search-btn'
						to={`/?&country=${country}&language=${language}&genre=${genre}&sort=${sort}&minScore=${minScore}&year=${year}&adult=${adult}&time=${time}&votes=${votes}&page=1`}
					>Search</Link>
				</div>
			</div>
		</div>
	);
};

export default AdvancedSearch;