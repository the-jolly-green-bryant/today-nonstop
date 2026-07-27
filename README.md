# Today Nonstop

[![CI](https://github.com/the-jolly-green-bryant/today-nonstop/actions/workflows/ci.yml/badge.svg)](https://github.com/the-jolly-green-bryant/today-nonstop/actions/workflows/ci.yml)
[![Deploy](https://github.com/the-jolly-green-bryant/today-nonstop/actions/workflows/deploy.yml/badge.svg)](https://github.com/the-jolly-green-bryant/today-nonstop/actions/workflows/deploy.yml)
[![Angular](https://img.shields.io/badge/Angular-20-DD0031?logo=angular)](https://angular.dev/)
[![Ionic](https://img.shields.io/badge/Ionic-8-3880FF?logo=ionic)](https://ionicframework.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Today Nonstop is a data-driven, choose-your-own-adventure engine that presents
branching stories as a mobile conversation. A story is defined in JSON and
interpreted at runtime, so writers can add scenes, choices, inventory gates,
characters, and alternate outcomes without changing the rendering engine.

The repository includes a playable time-loop story and a browser-based editor
for working with its story data.

**[Play Today Nonstop](https://today-nonstop.bryantjames.com/)**

## Highlights

- Branching, paced dialog rendered as a message feed
- Story, fast, and instant pacing modes
- Conditional scenes and choices driven by inventory state
- Persistent achievements, characters, and collectible items
- A complete loop-breaking ending with a replayable epilogue
- Responsive phone presentation with full-screen mobile play
- Accessible live-region narration and keyboard-friendly choices
- Image, emote, delay, speaker, and restart commands
- Local save-state replay through Ionic Storage
- Built-in story-data editor at `/editor`
- Web and Android targets through Ionic and Capacitor

## Technology

- Angular 20
- Ionic 8
- Capacitor 8
- TypeScript 5.8
- Jasmine and Karma
- ESLint, Prettier, and GitHub Actions

## Getting started

### Prerequisites

- Node.js 20.19 or newer
- npm 10 or newer
- JDK 21 and Android Studio for Android development

```bash
git clone https://github.com/the-jolly-green-bryant/today-nonstop.git
cd today-nonstop
npm ci
npm start
```

Open `http://localhost:4200` to play. The story editor is available at
`http://localhost:4200/editor`.

## Development commands

| Command                | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `npm start`            | Start the local development server              |
| `npm run build`        | Create an optimized production build in `www/`  |
| `npm test`             | Run the unit test suite once in headless Chrome |
| `npm run lint`         | Check TypeScript and Angular templates          |
| `npm run format:check` | Verify repository formatting                    |
| `npm run check`        | Run the complete local CI suite                 |
| `npm run sync:android` | Build the web app and sync it into Android      |

## Deployment

Every push to `master` builds the production app and deploys the `www/`
artifact to GitHub Pages. The live site uses the custom domain
[`today-nonstop.bryantjames.com`](https://today-nonstop.bryantjames.com/).

Pull requests run the separate CI workflow and must pass formatting, linting,
tests, and a production build before they are merged.

## Story format

The bundled story lives in
[`src/app/game-data/dialog.json`](src/app/game-data/dialog.json). Its main
collections are:

- `dialog`: scenes, lines, choices, and conditional transitions
- `characters`: speakers and discoverable character details
- `items`: inventory items, status counters, and persistence rules
- `keyed_images`: reusable media referenced by story commands

The runtime implementation is centered on
[`DialogStream`](src/app/classes/dialog-stream.ts), which converts the JSON
story into an event stream that can be persisted and replayed.

## Project status

Today Nonstop is an experimental narrative-engine project. The web build is
maintained as the reference target; the Android wrapper can be synchronized
from the same source with Capacitor.

## Contributing

Bug reports and focused improvements are welcome. See
[CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

Released under the [MIT License](LICENSE).
