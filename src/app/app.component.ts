import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

type Fx = 'fade' | 'slideUp' | 'zoom' | 'flip' | 'rotate' | 'blur' | 'curtain' | 'burst';

interface Scene {
  type: 'intro' | 'text' | 'name' | 'album' | 'wish' | 'cake' | 'final';
  fx: Fx;
  bg: string;
  hintDelay: number;
}

interface Memory {
  src: string;      // put photos in src/assets/photos and use e.g. 'assets/photos/1.jpg'
  emoji: string;    // shown when src is empty
  caption: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  // ✏️ EDIT THESE ----------------------------------------------------
  readonly name = 'Krizzami';
  readonly theName = 'Krizza';

  readonly memories: Memory[] = [
    { src: '../assets/photos/5.jpeg', emoji: '🌸', caption: '' },
    { src: '../assets/photos/2.png', emoji: '🎀', caption: '' },
    { src: '../assets/photos/6.jpeg', emoji: '🍰', caption: '' },
    { src: '../assets/photos/4.jpg', emoji: '✨', caption: '' },
  ];

  readonly wishMessage =
    'Hope u have the best day ever!! Stay happy and keep smiling always. I hope u know how special u are and how much u deserve all the good things in life. Enjoy ur day to the fullest!! 💗🫶🏻'
  // -------------------------------------------------------------------

  readonly scenes: Scene[] = [
  { type: 'intro', fx: 'fade',    bg: 'bg-a',     hintDelay: 1800 },
  { type: 'text',  fx: 'slideUp', bg: 'bg-b',     hintDelay: 2800 },
  { type: 'name',  fx: 'zoom',    bg: 'bg-c',     hintDelay: 3400 },
  { type: 'album', fx: 'flip',    bg: 'bg-a',     hintDelay: 2800 },
  { type: 'text',  fx: 'rotate',  bg: 'bg-d',     hintDelay: 2800 },
  { type: 'wish',  fx: 'blur',    bg: 'bg-b',     hintDelay: 700 + this.wishMessage.length * 45 + 400 },
  { type: 'cake',  fx: 'curtain', bg: 'bg-c',     hintDelay: 2000 },
  { type: 'final', fx: 'burst',   bg: 'bg-final', hintDelay: 0 },
];

  // the two generic "text" scenes use these lines
  readonly textLines: Record<number, string[]> = {
    1: ['Today is a', 'very special day', '🎈'],
    4: ['Another year,', 'more beautiful', 'memories ahead 🌷'],
  };

  index = 0;
  leaving = false;
  busy = false;
  hintVisible = false;
  readonly lockUntilReady = true;
  typed = '';
  nameLetters = this.theName.split('');

  hearts = Array.from({ length: 22 }, () => ({
    left: Math.random() * 100,
    size: 12 + Math.random() * 22,
    dur: 8 + Math.random() * 10,
    delay: -Math.random() * 14,
    op: 0.25 + Math.random() * 0.5,
    glyph: ['💗', '💖', '🌸', '✨', '💕'][Math.floor(Math.random() * 5)],
  }));

  confetti = Array.from({ length: 70 }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 3,
    dur: 3 + Math.random() * 3,
    rot: Math.random() * 360,
    color: ['#ff4d94', '#ff8fc0', '#ffc2dd', '#ffffff', '#ff6fa8', '#ffd6e8'][Math.floor(Math.random() * 6)],
  }));

  private typer?: ReturnType<typeof setInterval>;
  private hintTimer?: ReturnType<typeof setTimeout>;

  get scene(): Scene { return this.scenes[this.index]; }
  get isLast(): boolean { return this.index === this.scenes.length - 1; }

  ngOnInit(): void { this.onEnter(); }
  ngOnDestroy(): void { clearInterval(this.typer); clearTimeout(this.hintTimer); }

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (['Space', 'Enter', 'ArrowRight'].includes(e.code)) { e.preventDefault(); this.next(); }
  }

  next(): void {
    if (this.busy || this.isLast) return;
    if (this.lockUntilReady && !this.hintVisible) return;
    this.busy = true;
    this.leaving = true;
    setTimeout(() => {
      this.index++;
      this.leaving = false;
      this.onEnter();
      setTimeout(() => (this.busy = false), 700);
    }, 550);
  }

  replay(e: Event): void {
    e.stopPropagation();
    this.busy = true;
    this.leaving = true;
    setTimeout(() => {
      this.index = 0;
      this.leaving = false;
      this.onEnter();
      this.busy = false;
    }, 550);
  }

  private onEnter(): void {
    clearInterval(this.typer);
    clearTimeout(this.hintTimer);
    this.typed = '';
    this.hintVisible = false;
    if (!this.isLast) {
      this.hintTimer = setTimeout(() => (this.hintVisible = true), this.scene.hintDelay);
    }
    if (this.scene.type === 'wish') {
      let i = 0;
      setTimeout(() => {
        this.typer = setInterval(() => {
          this.typed = this.wishMessage.slice(0, ++i);
          if (i >= this.wishMessage.length) clearInterval(this.typer);
        }, 45);
      }, 700);
    }
  }

  lines(): string[] { return this.textLines[this.index] ?? []; }
}
