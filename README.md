# persian-social-discovery-app

> Premium Persian anonymous social discovery and one-to-one chat
> React Native + Expo + TypeScript

---

## Stack

| Layer | Technology |
|---|---|
| Runtime | React Native + Expo SDK |
| Language | TypeScript (strict) |
| Navigation | React Navigation v7 |
| Server state | TanStack Query v5 |
| Client state | Zustand v5 |
| Forms | React Hook Form + Zod |
| Realtime | Socket.IO client |
| Lists | FlashList |
| Animation | Reanimated v3 |
| Storage | MMKV + SecureStore |
| i18n | i18next + expo-localization |
| Icons | lucide-react-native |
| Sheets | @gorhom/bottom-sheet |

---

## Project Structure

```
src/
  app/          # Bootstrap, providers, navigation
  features/     # auth, onboarding, discovery, requests, chat, profile, safety
  shared/       # api, socket, components, hooks, lib, utils, types
  theme/        # Design tokens: colors, spacing, typography, radius, shadows
  store/        # Zustand global stores
  i18n/         # Persian (fa) + English (en) translations
```

---

## Development

```bash
# Install
npm install

# Start
npx expo start

# Type check
npm run typecheck

# Lint
npm run lint
```

---

## Environment

Copy `.env.example` to `.env.local` and fill in values:

```
EXPO_PUBLIC_API_BASE_URL=
EXPO_PUBLIC_SOCKET_URL=
EXPO_PUBLIC_ENV=development
EXPO_PUBLIC_ENABLE_GUEST_LOGIN=true
```

---

## Architecture Principles

- Feature-first module organization
- Screen components are thin composers only
- All backend calls go through feature API modules
- Socket events flow through centralized reducers
- Zustand for client-owned ephemeral state only
- TanStack Query for all server-owned state
- Dark mode first, light mode supported
- Persian (RTL) first typography and layout
- Optimistic UI for all primary user actions
- Graceful degradation under unstable networks

---

## MVP Implementation Order

1. App shell + theme + RTL + navigation
2. Auth (guest + OTP) + profile setup
3. Presence + discovery feed + filters
4. Request flow (send, accept, reject, cancel)
5. Active chat + message queue + leave
6. Report / block / safety
7. Reconnect hardening + Android performance

---

## Related

- Backend: [persian-social-discovery-backend](https://github.com/rayanradmehr/persian-social-discovery-backend)
