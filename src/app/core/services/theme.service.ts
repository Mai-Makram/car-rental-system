import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'app-theme';
  readonly theme = signal<ThemeMode>('light');

  constructor() {
    const savedTheme = localStorage.getItem(this.storageKey) as ThemeMode | null;
    const systemTheme: ThemeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const resolvedTheme = savedTheme ?? systemTheme;

    this.setTheme(resolvedTheme);
  }

  toggleTheme(): void {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  setTheme(mode: ThemeMode): void {
    this.theme.set(mode);
    localStorage.setItem(this.storageKey, mode);
    document.documentElement.setAttribute('data-theme', mode);
  }
}
