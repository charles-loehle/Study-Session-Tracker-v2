import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
	selectedDate: Date | null;
	onDateChange: (date: Date | null) => void;
	value: Date | null;
}

function DateRangeUpdate({ selectedDate, onDateChange }: DatePickerProps) {
	return (
		<div>
			<DatePicker
				required
				selected={selectedDate}
				onChange={onDateChange}
				showTimeSelect
				timeIntervals={5}
				dateFormat="yyyy-MM-dd HH:mm"
			/>
		</div>
	);
}

export default DateRangeUpdate;
