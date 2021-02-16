import React, { useState } from 'react'
import { CountryDropdown } from 'react-country-region-selector';

const FilterJob = props => {

	const {
		handleTitle,
		handlePartTime ,
		handleFullTime ,
		handlePostDuration ,
		handleCountry
	 } = props

	const [ title, setTitle ] = useState("") 
	const [ country, setCountry ] = useState("") 


	return ( 
		<div className="col-lg-3">
			<div className ="filter-secs">
				<div className ="filter-heading">
					<h2>Filters</h2>
					<a href="/jobs">Clear all filters</a>
				</div>
				<div className ="paddy">
					<div className ="filter-dd">
						<div className ="filter-ttl">
							<h3>Title</h3>
							<a href="/jobs">Clear</a>
						</div>
						<form>
							<input 
								type="text" 
								placeholder="Search title" 
								value={title} 
								onChange = { event => { 
									setTitle(event.target.value)
									handleTitle(event) 
								}}/>
						</form>
					</div>
					<div className ="filter-dd">
						<div className ="filter-ttl">
							<h3>Job Type</h3>
							<a href="/jobs">Clear</a>
						</div>
						<ul className ="avail-checks">
							<li>
								<input type="radio" name="cc" id="c2" value="part-time" onChange={event => { handlePartTime(event)}}/>
								<label htmlFor="c2">
									<span></span>
								</label>
								<small>Part Time</small>
							</li>
							<li>
							
								<input type="radio" name="cc" id="c3" value="full-time" onChange={event => { handleFullTime(event)}}/>
								<label htmlFor="c3">
									<span></span>
								</label>
								<small>Full Time</small>
							</li>
						</ul>
					</div>
					<div className ="filter-dd">
						<div className ="filter-ttl">
							<h3>Time stamp </h3>
							<a href="/jobs">Clear</a>
						</div>
						<form className ="job-tp">
							<select onChange = { event => handlePostDuration(event) }>
								<option value = "recent" >Select a duration</option>
								<option value = "recent" >Recently posted jobs</option>
								<option value = "old" >Old posted jobs</option>
							</select>
							<i className ="fa fa-ellipsis-v"></i>
						</form>
					</div>
					<div className ="filter-dd">
						<div className ="filter-ttl">
							<h3>Countries</h3>
							<a href="/jobs">Clear</a>
						</div>
						<form className ="job-tp">
							<CountryDropdown
								value={country}
								onChange={event => {
									handleCountry(event)
									setCountry(event)
								}} 
							/>
							<i className ="fa fa-ellipsis-v"></i>
						</form>
					</div>
				</div>
			</div>
                
            </div>
	 );
}
 
export default FilterJob ;
