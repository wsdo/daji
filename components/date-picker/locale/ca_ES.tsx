import CalendarLocale from 'rc-calendar/lib/locale/ca_ES';
import TimePickerLocale from '../../time-picker/locale/ca_ES';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Seleccionar data',
    rangePlaceholder: ['Data inicial', 'Data final'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/wsdo/daji/blob/master/components/date-picker/locale/example.json

export default locale;
