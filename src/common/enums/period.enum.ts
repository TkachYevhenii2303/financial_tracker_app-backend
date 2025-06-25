export const Period = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year',
  } as const;
  
  export type Period = (typeof Period)[keyof typeof Period];
  