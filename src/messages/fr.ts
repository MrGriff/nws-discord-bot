export const fr = {
    hello: 'Hello World',
    login_succeded: 'Authentifié avec success',
    login_failed: 'Impossible de se connecter à discord',
    activity_server_up: (server: string) => `✔️ ${server} est en ligne ✔️`,
    activity_server_down: (server: string) => `❌ ${server} est hors ligne ❌`,
    channel_server_up: (server: string) => `✔️ ${server} vient de passer en ligne ! 😀`, 
    channel_server_down: (server: string) => `✔️ ${server} vient de passer en hors ligne ! 😭`, 
    error_server_not_found: (server: string) => `⚠️ ${server} est introuvable ⚠️`,
    dateFormat: (date: Date) => `The current date is ${formatDate(date, 'MM/DD/YYYY')}`,
    keyWithCount: (count: number) => `${count} item${count === 1 ? '' : 's'}`
  };
  
  function formatDate(date: Date, format: string): string {
    // format implementation
    return '';
  }