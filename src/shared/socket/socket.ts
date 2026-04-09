import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/shared/constants';

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL ?? 'http://localhost:3000';

class SocketManager {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;

  async connect(): Promise<void> {
    if (this.socket?.connected) return;

    const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
    });

    this.socket.on('connect', () => {
      this.reconnectAttempts = 0;
      console.log('[Socket] Connected:', this.socket?.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected:', reason);
    });

    this.socket.on('connect_error', (err) => {
      console.error('[Socket] Connection error:', err.message);
      this.reconnectAttempts++;
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  emit<T>(event: string, data?: T): void {
    if (!this.socket?.connected) {
      console.warn('[Socket] Not connected. Cannot emit:', event);
      return;
    }
    this.socket.emit(event, data);
  }

  on<T>(event: string, handler: (data: T) => void): void {
    this.socket?.on(event, handler);
  }

  off(event: string): void {
    this.socket?.off(event);
  }

  get isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  get id(): string | undefined {
    return this.socket?.id;
  }
}

export const socketManager = new SocketManager();
