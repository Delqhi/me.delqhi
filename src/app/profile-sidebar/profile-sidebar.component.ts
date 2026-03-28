import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../i18n.service';
import { GoogleGenAI } from '@google/genai';

@Component({
  selector: 'app-profile-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="flex flex-col md:flex-row gap-8 items-start">
      <div class="relative group shrink-0">
        <img src="https://avatars.githubusercontent.com/u/9919?s=400&v=4" alt="Jeremy Schulze" class="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border border-gh-border shadow-md z-20 relative">
        <div class="absolute bottom-6 right-2 z-30 bg-gh-bg border border-gh-border rounded-full p-2 flex items-center justify-center cursor-pointer hover:text-gh-link text-gh-text-secondary shadow-sm">
          <mat-icon>sentiment_satisfied</mat-icon>
        </div>
      </div>
      
      <div class="flex flex-col flex-1 w-full">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 class="text-3xl font-bold text-gh-text leading-tight">Jeremy Schulze</h1>
            <h2 class="text-xl font-light text-gh-text-secondary leading-tight">jeremyschulze</h2>
          </div>
          <button (click)="openContactModal()" class="bg-gh-btn-bg border border-gh-border text-gh-text font-medium py-1.5 px-4 rounded-md hover:bg-gh-btn-hover hover:border-gray-500 transition-colors text-sm whitespace-nowrap">
            {{ t()('sidebar.contactMe') }}
          </button>
        </div>
        
        <div class="text-base text-gh-text mb-4">
          <p>Software Engineer & Tech Enthusiast. Building enterprise-grade applications and sharing knowledge.</p>
        </div>
        
        <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gh-text mb-6">
          <div class="flex items-center gap-2">
            <mat-icon class="text-gh-text-secondary text-[16px] w-[16px] h-[16px]">email</mat-icon>
            <a href="mailto:contact@jeremyschulze.com" class="hover:text-gh-link hover:underline">contact&#64;jeremyschulze.com</a>
          </div>
          <div class="flex items-center gap-2">
            <mat-icon class="text-gh-text-secondary text-[16px] w-[16px] h-[16px]">link</mat-icon>
            <a href="https://jeremyschulze.com" target="_blank" class="hover:text-gh-link hover:underline">jeremyschulze.com</a>
          </div>
        </div>

        <div class="border-t border-gh-border pt-4 mt-2">
          <h3 class="text-sm font-semibold text-gh-text mb-2">{{ t()('sidebar.organizations') }}</h3>
          <div class="flex flex-wrap gap-2">
            <a href="#" class="w-8 h-8 rounded-md border border-gh-border overflow-hidden hover:border-gray-500 transition-colors" title="Google Developer Partner">
              <img src="https://avatars.githubusercontent.com/google?s=64&v=4" alt="Google Developer Partner" class="w-full h-full object-cover" referrerpolicy="no-referrer">
            </a>
            <a href="#" class="w-8 h-8 rounded-md border border-gh-border overflow-hidden hover:border-gray-500 transition-colors" title="NVIDIA Partner Developer Program">
              <img src="https://avatars.githubusercontent.com/NVIDIA?s=64&v=4" alt="NVIDIA Partner Developer Program" class="w-full h-full object-cover" referrerpolicy="no-referrer">
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Modal -->
    @if (isContactModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-gh-bg border border-gh-border rounded-lg shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <!-- Header -->
          <div class="bg-gh-bg-secondary px-4 py-3 border-b border-gh-border flex justify-between items-center">
            <h3 class="font-semibold text-gh-text text-sm">{{ t()('contact.new') }}</h3>
            <button (click)="closeContactModal()" class="text-gh-text-secondary hover:text-gh-text transition-colors">
              <mat-icon class="text-[18px] w-[18px] h-[18px]">close</mat-icon>
            </button>
          </div>
          
          @if (isSent()) {
            <div class="p-8 flex flex-col items-center justify-center text-center gap-4">
              <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <mat-icon>check</mat-icon>
              </div>
              <p class="text-gh-text font-medium">{{ t()('contact.success') }}</p>
            </div>
          } @else {
            <!-- Form -->
            <form (submit)="sendMessage($event)" class="flex flex-col">
              <div class="px-4 py-2 border-b border-gh-border flex items-center gap-4 text-sm">
                <span class="text-gh-text-secondary w-16">{{ t()('contact.to') }}</span>
                <span class="text-gh-text font-medium">contact&#64;jeremyschulze.com</span>
              </div>
              <div class="px-4 py-2 border-b border-gh-border flex items-center gap-4 text-sm">
                <span class="text-gh-text-secondary w-16">{{ t()('contact.from') }}</span>
                <input type="email" required placeholder="your&#64;email.com" class="flex-1 bg-transparent border-none outline-none text-gh-text placeholder:text-gh-text-secondary/50 focus:ring-0 p-0">
              </div>
              <div class="px-4 py-2 border-b border-gh-border flex items-center gap-4 text-sm">
                <span class="text-gh-text-secondary w-16">{{ t()('contact.subject') }}</span>
                <input type="text" required placeholder="What's this about?" class="flex-1 bg-transparent border-none outline-none text-gh-text placeholder:text-gh-text-secondary/50 focus:ring-0 p-0">
              </div>
              <div class="p-4 relative">
                <textarea required rows="6" [value]="messageText()" (input)="updateMessage($event)" [placeholder]="t()('contact.messagePlaceholder')" class="w-full bg-transparent border-none outline-none text-gh-text placeholder:text-gh-text-secondary/50 focus:ring-0 p-0 resize-none text-sm"></textarea>
                <button type="button" (click)="enhanceTextWithAI()" [disabled]="isEnhancing() || !messageText().trim()" [title]="t()('contact.enhanceAI')" class="absolute bottom-4 right-4 p-1.5 rounded-md text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                  @if (isEnhancing()) {
                    <mat-icon class="text-[18px] w-[18px] h-[18px] animate-spin">sync</mat-icon>
                  } @else {
                    <mat-icon class="text-[18px] w-[18px] h-[18px]">auto_awesome</mat-icon>
                  }
                </button>
              </div>
              
              <!-- Footer -->
              <div class="px-4 py-3 bg-gh-bg-secondary border-t border-gh-border flex justify-end gap-2">
                <button type="button" (click)="closeContactModal()" class="px-4 py-1.5 text-sm font-medium text-gh-text bg-gh-bg border border-gh-border rounded-md hover:bg-gh-bg-secondary transition-colors">
                  {{ t()('contact.cancel') }}
                </button>
                <button type="submit" class="px-4 py-1.5 text-sm font-medium text-white bg-[#238636] border border-[#2ea043]/40 rounded-md hover:bg-[#2ea043] transition-colors flex items-center gap-2">
                  <mat-icon class="text-[16px] w-[16px] h-[16px]">send</mat-icon>
                  {{ t()('contact.send') }}
                </button>
              </div>
            </form>
          }
        </div>
      </div>
    }
  `
})
export class ProfileSidebarComponent {
  i18n = inject(I18nService);
  t = this.i18n.t;

  isContactModalOpen = signal(false);
  isSent = signal(false);
  messageText = signal('');
  isEnhancing = signal(false);

  openContactModal() {
    this.isContactModalOpen.set(true);
    this.isSent.set(false);
    this.messageText.set('');
  }

  closeContactModal() {
    this.isContactModalOpen.set(false);
  }

  updateMessage(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.messageText.set(target.value);
  }

  async enhanceTextWithAI() {
    const currentText = this.messageText().trim();
    if (!currentText || this.isEnhancing()) return;

    this.isEnhancing.set(true);
    try {
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Enhance the following message to sound more professional, polite, and clear. Only return the enhanced text, without any conversational filler, quotes, or markdown formatting:\n\n${currentText}`,
      });
      
      if (response.text) {
        this.messageText.set(response.text.trim());
      }
    } catch (error) {
      console.error('Failed to enhance text:', error);
    } finally {
      this.isEnhancing.set(false);
    }
  }

  sendMessage(event: Event) {
    event.preventDefault();
    this.isSent.set(true);
    setTimeout(() => {
      this.closeContactModal();
      this.isSent.set(false);
    }, 2000);
  }
}
