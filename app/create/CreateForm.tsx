'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';
import DateRangePicker from './DateRangePicker';
import { calculateTimeElapsed } from '../lib/timeFunctions';
import supabase from '../config/supabaseClient';
// import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

export default function CreateForm() {
	//const supabaseBrowser = createPagesBrowserClient();

	const router = useRouter();
	const [userEmail, setUserEmail] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [elapsedTime, setElapsedTime] = useState<string>('');
	const [elapsedTimeInMilliseconds, setElapsedTimeInMilliseconds] =
		useState<number>(0);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// const getUserData = async () => {
		// 	const {
		// 		data: { user },
		// 	} = await supabaseBrowser.auth.getUser();
		//console.log(user?.email);
		// 	setUserEmail(user?.email || '');
		// };
		// Calculate elapsed time whenever startDate or endDate changes
		if (startDate !== null && endDate !== null) {
			setElapsedTimeInMilliseconds(endDate.getTime() - startDate.getTime());
		}
		// getUserData();
		setElapsedTime(calculateTimeElapsed(startDate, endDate));
	}, [startDate, endDate]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		// form validation
		if (!title || !description || !startDate || !endDate) {
			setError('Please fill out all fields');
			return;
		}

		setIsLoading(true);
		setError(null); // Clear previous errors when a new request starts

		const newStudySession = {
			title,
			description,
			study_time: elapsedTimeInMilliseconds,
			startDate: startDate,
			endDate: endDate,
			user_email: userEmail,
		};

		const response = await supabase
			.from('studysessions')
			.insert([newStudySession]);
		//console.log(response);

		// https://supabase.com/docs/reference/javascript/insert?example=create-a-record
		if (response.status === 201) {
			setError(null);
			setIsLoading(false);
			router.push('/');
		}

		if (error) {
			console.log(error);
			setError('There was a problem. Try again.');
		}
	};

	return (
		<div className="row justify-content-center">
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<form onSubmit={handleSubmit} className="col-lg-6">
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input
						id="title"
						required
						type="text"
						onChange={e => setTitle(e.target.value)}
						value={title}
						className="form-control"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<textarea
						id="description"
						required
						onChange={e => setDescription(e.target.value)}
						value={description}
						className="form-control"
					></textarea>
				</div>
				<div className="mb-3">
					<div className="mb-3">
						<p className="mb-0">Select a start date and time:</p>
						<DateRangePicker
							selectedDate={startDate}
							onDateChange={date => setStartDate(date)}
						/>
					</div>
					<div className="mb-3">
						<p className="mb-0">Select an end date and time:</p>
						<DateRangePicker
							selectedDate={endDate}
							onDateChange={date => setEndDate(date)}
						/>
					</div>

					{elapsedTime && (
						<div>
							<p>Time Elapsed: {elapsedTime}</p>
						</div>
					)}
				</div>
				<button disabled={isLoading} type="submit" className="btn btn-dark">
					{isLoading && <span>Adding...</span>}
					{!isLoading && <span>Add Study Session</span>}
				</button>

				{error && <p className="danger">{error}</p>}
			</form>
		</div>
	);
}
