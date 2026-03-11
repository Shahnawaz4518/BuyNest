import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-toast',
    template: `
    <div class="bn-toast-container" aria-live="polite">
      @for (toast of toastSvc.toasts(); track toast.id) {
        <div class="bn-toast bn-toast--{{ toast.type }}">
          <span class="material-icons bn-toast__icon">{{ toast.icon }}</span>
          <span class="bn-toast__msg">{{ toast.message }}</span>
          <button class="bn-toast__close" (click)="toastSvc.dismiss(toast.id)" aria-label="Close">
            <span class="material-icons" style="font-size:16px;">close</span>
          </button>
        </div>
      }
    </div>
  `,
    styleUrl: './toast.css',
})
export class ToastComponent {
    readonly toastSvc = inject(ToastService);
}
