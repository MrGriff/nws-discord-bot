export const en = {
    hello: 'Hello World',
    login_succeded: 'Authentication succed',
    login_failed: 'Can\'t connect to discord',
    activity_server_up: (server: string) => `✔️ ${server} online ✔️`,
    activity_server_down: (server: string) => `❌ ${server} offline ❌`,
    channel_server_up: (server: string) => `✔️ ${server} just went online ! 😀`, 
    channel_server_down: (server: string) => `✔️ ${server} just went offline ! 😭`,
    reply_server_up: (server: string) => `${server} server is online ! 😀`,
    reply_server_down: (server: string) => `${server} is offline, it's so sad 😭`,
    reply_server_not_found: (server: string) => `${server} server in unknown on all of New World's map. Have you made a typing mistake ? 🔎 `, 
    error_server_not_found: (server: string) => `⚠️ ${server} not found ⚠️`,
    dateFormat: (date: Date) => `The current date is ${formatDate(date, 'MM/DD/YYYY')}`,
    keyWithCount: (count: number) => `${count} item${count === 1 ? '' : 's'}`
  };
  
  function formatDate(date: Date, format: string): string {
    // format implementation
    return '';
  }