import { Injectable, signal, computed } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
    icon: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
    private _counter = 0;
    private _toasts = signal<Toast[]>([]);

    readonly toasts = this._toasts.asReadonly();

    private iconFor(type: ToastType): string {
        return { success: 'check_circle', error: 'error', warning: 'warning', info: 'info' }[type];
    }

    show(message: string, type: ToastType = 'info', duration = 3200): void {
        const id = ++this._counter;
        const toast: Toast = { id, message, type, icon: this.iconFor(type) };
        this._toasts.update(t => [...t, toast]);
        setTimeout(() => this.dismiss(id), duration);
    }

    dismiss(id: number): void {
        this._toasts.update(t => t.filter(x => x.id !== id));
    }

    success(msg: string) { this.show(msg, 'success'); }
    error(msg: string) { this.show(msg, 'error'); }
    warning(msg: string) { this.show(msg, 'warning'); }
    info(msg: string) { this.show(msg, 'info'); }
}
