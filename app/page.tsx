'use client';

import supabase from './config/supabaseClient';
import { useEffect, useState } from 'react';
import StudyCard from './components/StudyCard';
import { formatTime } from './lib/timeFunctions';

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

	const handleDelete = (id: number) => {
		setStudySessions((prev: StudySession[] | null) => {
			if (prev) {
				return prev.filter(item => item.id !== id);
			} else {
				return null;
			}
		});
	};

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

	useEffect(() => {
		if (studySessions) {
			// Calculate the totalStudyTime
			const total = studySessions.reduce(
				(acc, curr) => acc + curr.study_time,
				0
			);
			setTotalStudyTime(total);
		}
	}, [studySessions]);

	return (
		<main className="Home container">
			<h1>Home</h1>
			<p>All Study Sessions</p>

			<p>Total Study Time: {formatTime(totalStudyTime)}</p>
			<p>Today&apos;s Total: </p>
			{fetchError && <p>{fetchError}</p>}
			{studySessions && (
				<div className="study-sessions">
					<p>Order by:</p>
					<div
						className="btn-group mb-4"
						role="group"
						aria-label="Default button group"
					>
						<button
							onClick={() => setOrderBy('created_at')}
							type="button"
							className={`btn btn-outline-primary ${
								orderBy === 'created_at' ? 'active' : ''
							}`}
						>
							Created
						</button>
						<button
							onClick={() => setOrderBy('title')}
							type="button"
							className={`btn btn-outline-primary ${
								orderBy === 'title' ? 'active' : ''
							}`}
						>
							Title
						</button>
						<button
							onClick={() => setOrderBy('study_time')}
							type="button"
							className={`btn btn-outline-primary ${
								orderBy === 'study_time' ? 'active' : ''
							}`}
						>
							Time
						</button>
					</div>

					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
						{studySessions.map(studySession => (
							<StudyCard
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

