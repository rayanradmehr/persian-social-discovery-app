export const STORAGE_KEYS = {
  ACCESS_TOKEN: '@psd/access_token',
  REFRESH_TOKEN: '@psd/refresh_token',
  USER_PROFILE: '@psd/user_profile',
  THEME: '@psd/theme',
  ONBOARDED: '@psd/onboarded',
} as const;

export const SOCKET_EVENTS = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  // Discovery
  JOIN_POOL: 'discovery:join',
  LEAVE_POOL: 'discovery:leave',
  MATCH_FOUND: 'discovery:match',
  MATCH_ACCEPTED: 'discovery:accept',
  MATCH_DECLINED: 'discovery:decline',
  // Chat
  MESSAGE_SEND: 'chat:message:send',
  MESSAGE_RECEIVE: 'chat:message:receive',
  MESSAGE_READ: 'chat:message:read',
  TYPING_START: 'chat:typing:start',
  TYPING_STOP: 'chat:typing:stop',
  USER_ONLINE: 'chat:user:online',
  USER_OFFLINE: 'chat:user:offline',
} as const;

export const QUERY_KEYS = {
  ME: ['me'],
  PROFILE: (id: string) => ['profile', id],
  CHATS: ['chats'],
  CHAT_MESSAGES: (chatId: string) => ['chat', chatId, 'messages'],
  DISCOVERY_POOL: ['discovery', 'pool'],
} as const;

export const LIMITS = {
  MESSAGE_MAX_LENGTH: 1000,
  BIO_MAX_LENGTH: 300,
  DISPLAY_NAME_MAX: 50,
  MEDIA_UPLOAD_MB: 10,
} as const;

export const RTL_LOCALE = 'fa-IR';
