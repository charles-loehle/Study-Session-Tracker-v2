type StudySession = {
	id: string;
	title: 'string';
	description: 'string';
	study_time: 'number';
	user_email: 'string';
	created_at: 'string';
};

// 1:23:45
export function formatSequentialTime(studyTime: number) {
	const hours = Math.floor(studyTime / 3600);
	const minutes = Math.floor((studyTime % 3600) / 60);
	const seconds = studyTime % 60;

	return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`;
}

// "1 hour and 23 minutes"
export function formatTimeSentence(studyTime: number) {
	const hours = Math.floor(studyTime / 3600000);
	const minutes = Math.ceil((studyTime % 3600000) / 60000);
	return `${hours} ${
		hours > 1 || `${hours} ${hours === 0}` ? 'hours' : 'hour'
	} and ${minutes} minutes`;
}

export function getTotalTime(studySessions: StudySession[]) {
	let totalTime = 0;
	studySessions?.map(item => (totalTime += Number(item.study_time)));

	return formatTimeSentence(totalTime);
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
