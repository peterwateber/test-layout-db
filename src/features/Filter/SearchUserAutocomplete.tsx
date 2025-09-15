import { Autocomplete, Loader } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { type FC, useMemo } from 'react';
import { useAppContext } from '../../AppContext';

interface SearchUserAutocompleteProps {
    onChange: (val: string) => void;
}

export const SearchUserAutocomplete: FC<SearchUserAutocompleteProps> = ({
    onChange,
}) => {
    const { entries, isLoading } = useAppContext();
    const emails = useMemo(() => {
        return Array.from(new Set(entries?.map((u) => u.user.email))).sort();
    }, [entries]);

    return (
        <Autocomplete
            clearable
            leftSection={<IconSearch size={18} stroke={1.5} />}
            placeholder="Filter by user"
            onChange={onChange}
            data={emails}
            rightSection={isLoading ? <Loader size="xs" /> : null}
        />
    );
};
