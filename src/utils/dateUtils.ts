import { format } from 'date-fns';

export const formatDateTime = (DP: string) => {
  return format(new Date(DP), 'd MMMM yyyy HH:mm');
};
