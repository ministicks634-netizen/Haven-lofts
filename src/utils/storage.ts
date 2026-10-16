const STORAGE_PREFIX = 'haven_lofts_img_';
const STYLISTS_STORAGE_KEY = 'haven_lofts_stylists_v1';
const SALON_INFO_KEY = 'haven_lofts_info_v1';

export function getStoredImage(key: string): string | null {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${key}`);
  } catch {
    return null;
  }
}

export function setStoredImage(key: string, dataUrl: string): boolean {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, dataUrl);
    window.dispatchEvent(new CustomEvent('haven-lofts-image-updated', { detail: { key, dataUrl } }));
    return true;
  } catch (err) {
    console.error('Failed to save image to localStorage', err);
    return false;
  }
}

export function removeStoredImage(key: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    window.dispatchEvent(new CustomEvent('haven-lofts-image-updated', { detail: { key, dataUrl: null } }));
  } catch (err) {
    console.error('Failed to remove image from localStorage', err);
  }
}

export function clearAllStoredImages(): void {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    window.dispatchEvent(new CustomEvent('haven-lofts-images-cleared'));
  } catch (err) {
    console.error('Failed to clear images', err);
  }
}
