import AsyncStorage from '@react-native-async-storage/async-storage';
import { log } from '../utils/log';

const ACCOUNTS_KEY = '@dapur_mama/accounts_v1';
const SESSION_KEY = '@dapur_mama/session_v1';

export async function loadAccounts() {
  try {
    const raw = await AsyncStorage.getItem(ACCOUNTS_KEY);
    const accounts = raw ? JSON.parse(raw) : [];
    return Array.isArray(accounts) ? accounts : [];
  } catch (error) {
    log('loadAccounts GAGAL', error);
    return [];
  }
}

export async function registerAccount({ name, email, password }) {
  try {
    const accounts = await loadAccounts();
    const normalizedEmail = email.trim().toLowerCase();
    if (accounts.some((account) => account.email === normalizedEmail)) {
      return { ok: false, message: 'E-mel ini sudah didaftarkan' };
    }

    const account = {
      id: String(Date.now()),
      name: name.trim(),
      email: normalizedEmail,
      password,
      createdAt: Date.now(),
    };
    await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(account));
    log('registerAccount <-', normalizedEmail);
    return { ok: true, account };
  } catch (error) {
    log('registerAccount GAGAL', error);
    return { ok: false, message: 'Tidak dapat menyimpan akaun. Cuba lagi.' };
  }
}

export async function loginAccount({ email, password }) {
  try {
    const accounts = await loadAccounts();
    const account = accounts.find(
      (item) => item.email === email.trim().toLowerCase() && item.password === password
    );
    if (!account) {
      return { ok: false, message: 'E-mel atau kata laluan tidak sah' };
    }
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(account));
    log('loginAccount <-', account.email);
    return { ok: true, account };
  } catch (error) {
    log('loginAccount GAGAL', error);
    return { ok: false, message: 'Tidak dapat log masuk. Cuba lagi.' };
  }
}

export async function loadSession() {
  try {
    const raw = await AsyncStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    log('loadSession GAGAL', error);
    return null;
  }
}
