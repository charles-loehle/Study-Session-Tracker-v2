type StudySession = {
	id: string;
	title: 'string';
	description: 'string';
	study_time: 'number';
	user_email: 'string';
	created_at: 'string';
};

export function getTotalTime(studySessions: StudySession[]) {
	let totalTime = 0;
	studySessions?.map(item => (totalTime += Number(item.study_time)));

	return formatTime(totalTime);
}

export function formatTime(studyTime: number) {
	const hours = Math.floor(studyTime / 3600000);
	const minutes = Math.ceil((studyTime % 3600000) / 60000);
	return `${hours} ${
		hours > 1 || `${hours} ${hours === 0}` ? 'hours' : 'hour'
	} and ${minutes} minutes`;
}

export function calculateTimeElapsed(
	startDate: Date | null,
	endDate: Date | null
) {
	if (startDate && endDate) {
		const elapsedTimeInMilliseconds = endDate.getTime() - startDate.getTime();
		const hours = Math.floor(elapsedTimeInMilliseconds / 3600000);
		const minutes = Math.ceil((elapsedTimeInMilliseconds % 3600000) / 60000);
		return `${hours} ${hours > 1 ? 'hours' : 'hour'} and ${minutes} minutes`;
	} else {
		return '';
	}
}
