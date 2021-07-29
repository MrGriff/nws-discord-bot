export const en = {
    hello: 'Hello World',
    login_succeded: 'Authentication succed',
    interpolation: (what: string, how: string) => `${what} is ${how}`,
    dateFormat: (date: Date) => `The current date is ${formatDate(date, 'MM/DD/YYYY')}`,
    keyWithCount: (count: number) => `${count} item${count === 1 ? '' : 's'}`
  };
  
  function formatDate(date: Date, format: string): string {
    // format implementation
    return '';
  }