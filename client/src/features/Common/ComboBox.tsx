import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type Props = {
  label: string;
  source: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function ComboBox({ label, source, value, onChange }: Props) {
  return (
    <Autocomplete
      disablePortal
      options={source}
      sx={{ width: 600 }}
      value={value}
      onChange={(_, newValue) => onChange(newValue ?? '')}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
