# Forma — Motion & Effects Studio

A no-code browser workspace for Genetic Prowess movement and VFX correction planning, with a visual effects and character concept studio. See [the game workbench guide](GENETIC_PROWESS.md). Open `index.html` to start. No installation, account, API key, or build step is required. For a local HTTP server run `python3 -m http.server 8000` in this folder, then visit http://localhost:8000.

- Six animated effect presets with live particle controls and color palettes.
- Built-in asset library, stylized character proportion controls, four procedural motions.
- Playback, timeline scrubbing, PNG snapshots, local saving, validated JSON project import/export.
- Two original particle textures and optional Unreal texture import script.
- Responsive interface with keyboard-accessible controls.

See [the Unreal guide](UNREAL_GUIDE.md) for the UE 5.8 target workflow and limitations. Native MetaHuman creation, Niagara authoring, and animation retargeting require Unreal Engine. UE 5.8 has not been tested in a live editor.

## Swift Playgrounds

The app can run in a SwiftUI WKWebView wrapper on iPad or Mac. See [Swift-README.md](Swift-README.md). Swift Playgrounds cannot build Unreal Engine or create native MetaHuman assets.

The interface has no external runtime dependencies. The hosted app saves a complete offline copy and supports Home Screen installation. See [offline instructions](OFFLINE.md). Projects stay on the device and are not synced. Browser data clearing removes local saves; export project JSON for backups.

## Hosting

The existing private deployment is https://forma-motion-studio-anewbyss.afootwarbler.chatgpt.site. GitHub Pages preparation and the current GitHub write-access limitation are documented in [GITHUB_PAGES.md](GITHUB_PAGES.md).

Run `python3 scripts/build.py` to rebuild dist, its PC ZIP, and the versioned offline service worker. No dependencies are needed. GitHub Pages supports either the supplied Actions workflow or an upload of the prepared static distribution to main/root. All public app paths are relative for repository-subpath hosting.
