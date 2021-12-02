import { TextField, Box, IconButton } from '@mui/material';
import {
	SearchOutlined,
	CloseOutlined,
	LocationSearching
} from '@mui/icons-material';
import { useState } from 'react';

type Props = {
	onSearch: (input: string, isfromGps?: boolean | undefined) => void;
	onClose: () => void;
};

const Searchbar = ({ onSearch, onClose }: Props) => {
	const [input, setInput] = useState<string>('');

	const handleKeyDown = (event: { key: string }) => {
		if (event.key === 'Enter') {
			onSearch(input);
		}
	};

	const close = () => {
		setInput('');
		onClose();
	};

	return (
		<TextField
			sx={{ width: '70%', mb: '3rem' }}
			id="outlined-helperText"
			label="City"
			helperText="search by city name"
			value={input}
			onChange={e => {
				setInput(e.target.value);
			}}
			onKeyDown={handleKeyDown}
			InputProps={{
				startAdornment: (
					<IconButton onClick={() => onSearch(input, true)}>
						<LocationSearching />
					</IconButton>
				),
				endAdornment: (
					<Box
						sx={{
							display: 'flex'
						}}
					>
						<IconButton onClick={() => onSearch(input)}>
							<SearchOutlined />
						</IconButton>
						<IconButton onClick={() => close()}>
							<CloseOutlined />
						</IconButton>
					</Box>
				)
			}}
		/>
	);
};

export default Searchbar;
