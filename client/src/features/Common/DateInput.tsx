import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

type Props = {
  selectedDate: Dayjs | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs | null>>
}

export default function DateInput({ selectedDate, setSelectedDate }: Props) {
  return (
    <DatePicker
      sx={{ width: 400 }}
      label="TRAVEL DATE"
      value={selectedDate}
      onChange={(newValue) => setSelectedDate(newValue)}
      slotProps={{ textField: { fullWidth: true } }}
    />
  );
}
