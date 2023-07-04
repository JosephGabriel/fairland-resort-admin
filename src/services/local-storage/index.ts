type LocalStorageKeys = "token";

export class LocalStorageService {
  private static instance: LocalStorageService;
  private readonly storage: Storage;

  private constructor() {
    this.storage = window.localStorage;
  }

  static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }

    return LocalStorageService.instance;
  }

  setItem(key: LocalStorageKeys, value: string): void {
    this.storage.setItem(key, value);
  }

  getItem(key: LocalStorageKeys): string | null {
    return this.storage.getItem(key);
  }

  removeItem(key: LocalStorageKeys): void {
    this.storage.removeItem(key);
  }
}
