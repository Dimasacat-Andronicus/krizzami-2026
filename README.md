# Krizza's Birthday 💖 (Angular 18)

Tap-to-continue birthday story. Pink theme, mobile responsive, 8 scenes, each with a different enter/leave transition.

## Run
```
npm install
npm start        # http://localhost:4200  (open on your phone via your LAN IP)
npm run build    # production build in dist/
```

## Customize
Edit the top of `src/app/app.component.ts`:
- `name`, `wishMessage`
- `memories` -> drop photos in `src/assets/photos/` and set `src: 'assets/photos/1.jpg'`
- `textLines` -> text for the "text" scenes
- reorder scenes / change `fx` (fade, slideUp, zoom, flip, rotate, blur, curtain, burst) in `scenes`

## Optional: add Lottie
```
npm i ngx-lottie lottie-web
```
In `main.ts`: `providers: [provideLottieOptions({ player: () => import('lottie-web') })]`
Download a .json from lottiefiles.com into `src/assets/`, import `LottieComponent` in AppComponent and use
`<ng-lottie [options]="{ path: 'assets/confetti.json' }" />` inside any scene.
