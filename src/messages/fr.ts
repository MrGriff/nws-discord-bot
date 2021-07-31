export const fr = {
    hello: 'Hello World',
    login_succeded: 'Authentifié avec success',
    login_failed: 'Impossible de se connecter à discord',
    interpolation: (what: string, how: string) => `${what} is ${how}`,
    dateFormat: (date: Date) => `The current date is ${formatDate(date, 'MM/DD/YYYY')}`,
    keyWithCount: (count: number) => `${count} item${count === 1 ? '' : 's'}`
  };
  
  function formatDate(date: Date, format: string): string {
    // format implementation
    return '';
  }