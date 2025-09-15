import { DatePickerInput, type DatePickerValue } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { type FC } from 'react';

interface DateInputProps {
	label: string;
	value: string | null;
	onChange: (v: DatePickerValue) => void;
}

export const DateInput: FC<DateInputProps> = ({ label, value, onChange }) => {
	return (
		<DatePickerInput
			label={label}
			leftSection={<IconCalendar size={18} stroke={1.5} />}
			leftSectionPointerEvents="none"
			placeholder="Pick date"
			value={value}
			onChange={onChange}
		/>
	);
};
