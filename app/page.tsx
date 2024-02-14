'use client';

import supabase from './config/supabaseClient';
import { useEffect, useState } from 'react';
import StudyCard from './components/StudyCard';
import { formatTimeSentence, formatSequentialTime } from './lib/timeFunctions';

type StudySession = {
	id: number;
	title: string;
	description: string;
	study_time: number;
	// user_email: string;
	created_at: string;
};

export default function Home() {
	const [fetchError, setFetchError] = useState<string>('');
	const [studySessions, setStudySessions] = useState<StudySession[] | null>(
		null
	);
	const [totalStudyTime, setTotalStudyTime] = useState<number>(0);
	const [orderBy, setOrderBy] = useState('created_at');
	const [todaysTotalTime, setTodaysTotalTime] = useState<number>(0);

	const handleDelete = (id: number) => {
		setStudySessions((prev: StudySession[] | null) => {
			if (prev) {
				return prev.filter(item => item.id !== id);
			} else {
				return null;
			}
		});
	};

	// get all sessions
	useEffect(() => {
		async function fetchData() {
			try {
				const { data, error } = await supabase
					.from('studysessions')
					.select()
					.order(orderBy, { ascending: false });

				if (error) {
					throw error;
				}
				setStudySessions(data);
				setFetchError('');
			} catch (error) {
				console.error('Error fetching data:', error);
				setFetchError('Could not fetch data...');
			}
		}
		fetchData();
	}, [orderBy]);

	// get today's session total time
	useEffect(() => {
		async function fetchData() {
			const today = new Date();
			// set date's time at 0
			today.setHours(0, 0, 0, 0);

			try {
				const { data, error } = await supabase
					.from('studysessions')
					.select()
					// only get items by the created_at column where its value is greater than or equal (gte) to today. Using toISOString method to return a standardized date format recognized by most databases
					.filter('created_at', 'gte', today.toISOString())
					.order(orderBy, { ascending: false });

				if (error) {
					throw error;
				}
				// Calculate the totalStudyTime for today's sessions
				const total = data.reduce((acc, curr) => acc + curr.study_time, 0);

				setTodaysTotalTime(total);
				setFetchError('');
			} catch (error) {
				console.error('Error fetching data:', error);
				setFetchError('Could not fetch data...');
			}
		}
		fetchData();
	}, [orderBy]);

	// add up all session times
	useEffect(() => {
		if (studySessions) {
			const total = studySessions.reduce(
				(acc, curr) => acc + curr.study_time,
				0
			);
			setTotalStudyTime(total);
			const date = new Date();
		}
	}, [studySessions]);

	return (
		<main className="Home container">
			<h1>Study Session List</h1>
			<div className="d-flex">
				<div>
					<p className="text-body-tertiary mb-0">Total</p>
					<p className="fw-bolder fs-4">
						{formatSequentialTime(totalStudyTime)}
					</p>
				</div>
				<div>
					<p className="text-body-tertiary mb-0">Today</p>
					<p className="fw-bolder fs-4">
						{formatSequentialTime(todaysTotalTime)}
					</p>
				</div>
			</div>

			{fetchError && <p>{fetchError}</p>}
			{studySessions && (
				<div className="study-sessions">
					<p className="me-4">Order by:</p>
					<div
						className="btn-group mb-4"
						role="group"
						aria-label="Default button group"
					>
						<button
							onClick={() => setOrderBy('created_at')}
							type="button"
							className={`btn btn-outline-dark ${
								orderBy === 'created_at' ? 'active' : ''
							}`}
						>
							Created
						</button>
						<button
							onClick={() => setOrderBy('title')}
							type="button"
							className={`btn btn-outline-dark ${
								orderBy === 'title' ? 'active' : ''
							}`}
						>
							Title
						</button>
						<button
							onClick={() => setOrderBy('study_time')}
							type="button"
							className={`btn btn-outline-dark ${
								orderBy === 'study_time' ? 'active' : ''
							}`}
						>
							Time
						</button>
					</div>

					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
						{studySessions.map((studySession, i) => (
							<StudyCard
								bgColor={i % 2 === 0 ? 'primary' : 'secondary'}
								textColor={i % 2 === 0 ? 'light' : 'dark'}
								key={studySession.id}
								studySession={studySession}
								onDelete={handleDelete}
							/>
						))}
					</div>
				</div>
			)}
		</main>
	);
}

