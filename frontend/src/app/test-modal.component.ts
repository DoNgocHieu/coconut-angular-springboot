import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 20px;">
      <h2>Test Modal Component</h2>
      <button (click)="showModal = true" style="padding: 10px 20px; background: #1db954; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Open Test Modal
      </button>

      <!-- Test Modal -->
      <div class="modal-overlay" *ngIf="showModal" (click)="showModal = false">
        <div class="modal" (click)="$event.stopPropagation()" style="background: #282828; padding: 20px; border-radius: 10px; max-width: 500px; width: 90%;">
          <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #444; padding-bottom: 15px;">
            <h3 style="margin: 0; color: white;">Test Modal</h3>
            <button (click)="showModal = false" style="background: none; border: none; color: #ccc; font-size: 24px; cursor: pointer;">&times;</button>
          </div>

          <div class="modal-body" style="margin-bottom: 20px;">
            <div class="form-group" style="margin-bottom: 15px;">
              <label style="display: block; margin-bottom: 5px; color: #ccc;">Test Input:</label>
              <input type="text" [(ngModel)]="testValue" placeholder="Enter something..."
                     style="width: 100%; padding: 10px; background: #1e1e1e; border: 1px solid #555; border-radius: 5px; color: white; box-sizing: border-box;">
            </div>

            <div class="form-group" style="margin-bottom: 15px;">
              <label style="display: block; margin-bottom: 5px; color: #ccc;">Test Textarea:</label>
              <textarea [(ngModel)]="testText" placeholder="Enter description..." rows="3"
                        style="width: 100%; padding: 10px; background: #1e1e1e; border: 1px solid #555; border-radius: 5px; color: white; box-sizing: border-box; resize: vertical;"></textarea>
            </div>

            <div class="form-group">
              <label style="display: flex; align-items: center; gap: 10px; color: #ccc; cursor: pointer;">
                <input type="checkbox" [(ngModel)]="testChecked" style="accent-color: #1db954;">
                <span>Test Checkbox</span>
              </label>
            </div>
          </div>

          <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid #444; padding-top: 15px;">
            <button (click)="showModal = false"
                    style="padding: 8px 16px; background: #444; color: #ccc; border: none; border-radius: 5px; cursor: pointer;">
              Cancel
            </button>
            <button (click)="saveTest()"
                    style="padding: 8px 16px; background: #1db954; color: white; border: none; border-radius: 5px; cursor: pointer;">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background: rgba(0, 0, 0, 0.8) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      z-index: 9999 !important;
      padding: 1rem !important;
    }

    .modal {
      background: linear-gradient(145deg, #1e1e1e 0%, #282828 100%) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      border-radius: 16px !important;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6) !important;
      width: 100% !important;
      max-width: 600px !important;
      max-height: 90vh !important;
      overflow-y: auto !important;
    }

    input:focus, textarea:focus {
      outline: none !important;
      border-color: #1db954 !important;
      box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.3) !important;
    }

    button:hover {
      opacity: 0.9 !important;
    }
  `]
})
export class TestModalComponent {
  showModal = false;
  testValue = '';
  testText = '';
  testChecked = false;

  saveTest() {
    console.log('Test values:', {
      testValue: this.testValue,
      testText: this.testText,
      testChecked: this.testChecked
    });
    alert('Test modal saved! Check console for values.');
    this.showModal = false;
  }
}
