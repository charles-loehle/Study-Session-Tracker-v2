'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';
import DateRangePicker from '../create/DateRangePicker';
import { calculateTimeElapsed } from '../lib/timeFunctions';
import supabase from '../config/supabaseClient';

export default function Update({ params }: { params: { id: string } }) {
	const id = params.id;
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const [elapsedTime, setElapsedTime] = useState<string>('');
	const [elapsedTimeInMilliseconds, setElapsedTimeInMilliseconds] =
		useState<number>(0);

	//console.log(new Date(startDate));

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		// form validation
		if (!title || !description || !startDate || !endDate) {
			setError('Please fill out all fields');
			return;
		}

		const { data, error } = await supabase
			.from('studysessions')
			.update({
				title,
				description,
				study_time: elapsedTimeInMilliseconds,
				startDate: startDate,
				endDate: endDate,
			})
			.eq('id', id)
			.select();

		if (error) {
			setError('Please fill out all fields');
			console.log(error);
		}
		if (data) {
			console.log(data);
			setError(null);
			router.push('/');
		}
	};

	useEffect(() => {
		// Calculate elapsed time whenever startDate or endDate changes
		if (startDate !== null && endDate !== null) {
			setElapsedTimeInMilliseconds(endDate.getTime() - startDate.getTime());
		}
		setElapsedTime(calculateTimeElapsed(startDate, endDate));
	}, [startDate, endDate]);

	useEffect(() => {
		// populate the form
		async function getStudySession() {
			const { data, error } = await supabase
				.from('studysessions')
				.select()
				.eq('id', id)
				.single();

			if (error) {
				router.push('/');
			}
			if (data) {
				setTitle(data.title);
				setDescription(data.description);
				setStartDate(new Date(data.startDate));
				setEndDate(new Date(data.endDate));
			}
		}
		getStudySession();
	}, [id, router]);

	return (
		<div className="row justify-content-center">
			<h2 className="text-primary text-center">Edit Study Session</h2>
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
					{isLoading && <span>Updating...</span>}
					{!isLoading && <span>Update Study Session</span>}
				</button>

				{error && <p className="danger">{error}</p>}
			</form>
		</div>
	);
}
