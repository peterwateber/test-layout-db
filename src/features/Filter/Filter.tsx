import { Paper } from '@mantine/core';
import type { DateValue } from '@mantine/dates';
import { useDispatch, useSelector } from 'react-redux';
import { DateInput } from '../../components';
import type { RootState } from '../../store';
import { debounce } from '../../utils/debounce';
import { setEndDate, setSearch, setStartDate } from './filtersSlice';
import { SearchUserAutocomplete } from './SearchUserAutocomplete';

export const Filter = () => {
    const dispatch = useDispatch();
    const { startDate, endDate } = useSelector((s: RootState) => s.filters);

    const handleStartDateChange = (d: DateValue) => {
        if (d) dispatch(setStartDate(d.toString().slice(0, 10)));
    };

    const handleEndDateChange = (d: DateValue) => {
        if (d) dispatch(setEndDate(d.toString().slice(0, 10)));
    };

    const handleAutocompleteChange = debounce((q: string) => {
        dispatch(setSearch(q));
    }, 300);

    return (
        <Paper shadow="xs" p="sm">
            <header>
                <h1 className="text-2xl">Reporting — Demo</h1>
                <div className="date-range">
                    <DateInput
                        label="From"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    <DateInput
                        label="To"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                    <SearchUserAutocomplete
                        onChange={handleAutocompleteChange}
                    />
                </div>
            </header>
        </Paper>
    );
};
