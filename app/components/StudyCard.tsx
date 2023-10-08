'use client';

import { formatTime } from '../lib/timeFunctions';
import Link from 'next/link';
import { MouseEvent } from 'react';
import supabase from '../config/supabaseClient';
// import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';

//defines the shape of a study session
type StudySession = {
	title: string;
	description: string;
	study_time: number;
	created_at: string;
	id: number;
};

// defines the props that the StudyCard component expects: a studySession object and an onDelete function.
type StudyCardComponentProps = {
	studySession: StudySession;
	onDelete: (id: number) => void;
};

export default function StudyCard({
	studySession,
	onDelete,
}: StudyCardComponentProps) {
	//const supabaseBrowser = createPagesBrowserClient();
	//console.log(studySession.id);
	const id = studySession.id;
	const router = useRouter();
	//const [userEmail, setUserEmail] = useState<string>('');
	// const [disabled, setDisabled] = useState<boolean>(true);

	// useEffect(() => {
	// 	const getUserData = async () => {
	// 		const {
	// 			data: { user },
	// 		} = await supabaseBrowser.auth.getUser();
	// 		//console.log(user?.email);
	// 		setUserEmail(user?.email || '');
	// 	};

	// 	getUserData();
	// 	// console.log(userEmail);
	// 	// if (userEmail) {
	// 	// 	setDisabled(false);
	// 	// }
	// }, [supabaseBrowser.auth, userEmail]);

	const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
		const { data, error } = await supabase
			.from('studysessions')
			.delete()
			.eq('id', id)
			.select();

		if (error) {
			console.log(error);
		}
		if (data) {
			console.log(data);
			onDelete(studySession.id);
		}
	};

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					{new Date(studySession.created_at).toDateString()}
				</div>
				<div className="card-body">
					<h5 className="card-title">{studySession.title}</h5>
					<p className="card-text">{studySession.description}</p>
					<p className="card-text">
						<small className="text-body-secondary">
							{' '}
							{formatTime(studySession.study_time)}
						</small>
					</p>

					<Link href={`/${studySession.id}`} className={`btn btn-primary`}>
						edit
					</Link>

					<button
						onClick={handleDelete}
						type="button"
						className="ms-2 btn btn-secondary"
					>
						<i className="bi bi-trash3"></i>
					</button>
				</div>
			</div>
		</div>
	);
}
