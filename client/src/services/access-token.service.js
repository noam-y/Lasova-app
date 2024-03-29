import { storageService } from './storage.service';

const TOKEN_STORAGE_KEY = `ACCESS_TOKEN`;

function getToken() {
  return storageService.getItem(TOKEN_STORAGE_KEY);
}

function setToken(token) {
  storageService.setItem(TOKEN_STORAGE_KEY, token);
}

function removeToken() {
  storageService.removeItem(TOKEN_STORAGE_KEY);
}

export const accessTokenService = {
  getToken,
  setToken,
  removeToken
};
