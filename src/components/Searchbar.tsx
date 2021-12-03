import { TextField, Box, IconButton, Autocomplete } from '@mui/material';
import {
	SearchOutlined,
	CloseOutlined,
	LocationSearching
} from '@mui/icons-material';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import useSWR from 'swr';

import { Location } from '../models/forecast';
import useDebounce from '../hooks/useDebounce';
import { fetcher } from '../utils/fetcher';

type Props = {
	onSearch: (input: string, isfromGps?: boolean | undefined) => void;
	onClose: () => void;
};

const Searchbar = ({ onSearch, onClose }: Props) => {
	const [input, setInput] = useState<string>('');
	const [locations, setLocations] = useState<string[]>([]);
	const debouncedValue = useDebounce<string>(input, 500);

	const { data } = useSWR<Location[]>(
		input
			? `search.json?key=${process.env.REACT_APP_API_KEY}&q=${debouncedValue}`
			: null,
		fetcher,
		{
			shouldRetryOnError: false,
			revalidateOnFocus: false
		}
	);

	const handleKeyDown = (event: { key: string }) => {
		if (event.key === 'Enter') {
			onSearch(input);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
	};

	const handleAutocompleteChange = (
		_event: SyntheticEvent,
		newValue: string | null
	) => {
		setInput(newValue ? newValue : '');
		if (newValue) onSearch(newValue);
	};

	const close = () => {
		setInput('');
		onClose();
	};

	useEffect(() => {
		setLocations(data ? data.map(location => location.name) : []);
	}, [data]);

	return (
		<Autocomplete
			sx={{ width: '80%', mb: '5rem' }}
			id="searchbar"
			options={locations}
			filterOptions={x => x}
			freeSolo
			value={input}
			onChange={handleAutocompleteChange}
			renderInput={params => (
				<TextField
					label="City"
					helperText="search by city name"
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					{...params}
					InputProps={{
						...params.InputProps,
						startAdornment: (
							<IconButton onClick={() => onSearch(input, true)}>
								<LocationSearching sx={{ color: 'primary.main' }} />
							</IconButton>
						),
						endAdornment: (
							<Box
								sx={{
									display: 'flex'
								}}
							>
								<IconButton onClick={() => onSearch(input)}>
									<SearchOutlined sx={{ color: 'primary.main' }} />
								</IconButton>
								<IconButton onClick={() => close()}>
									<CloseOutlined sx={{ color: 'primary.main' }} />
								</IconButton>
							</Box>
						)
					}}
				/>
			)}
		/>
	);
};

export default Searchbar;
