import CalendarLocale from 'rc-calendar/lib/locale/en_US';
import TimePickerLocale from '../../time-picker/locale/en_US';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Select date',
    rangePlaceholder: ['Start date', 'End date'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/wsdo/daji/blob/master/components/date-picker/locale/example.json

export default locale;
