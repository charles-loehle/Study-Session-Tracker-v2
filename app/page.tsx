'use client';

import supabase from './config/supabaseClient';
import { useEffect, useState } from 'react';
import StudyCard from './components/StudyCard';

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
	const [orderBy, setOrderBy] = useState('created_at');

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

				//console.log('Fetched data:', data);
			} catch (error) {
				console.error('Error fetching data:', error);
				setFetchError('Could not fetch data...');
			}
		}
		fetchData();
	}, [studySessions, orderBy]);

	return (
		<main className="Home container">
			<h1>Home</h1>
			<p>All Study Sessions</p>

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
							<StudyCard key={studySession.id} studySession={studySession} />
						))}
					</div>
				</div>
			)}
		</main>
	);
}

