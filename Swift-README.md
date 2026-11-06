# Optional Swift Playgrounds wrapper (iPad)

This is a starting wrapper, not a tested native build.

1. Create a new App playground on iPad.
2. Replace ContentView.swift with the file in this folder.
3. Add a bundled Web resource folder containing index.html, style.css, app.js, assets/, unreal/, and UNREAL_GUIDE.md. Preserve the folder structure and include resources in the app bundle.
4. Run the playground. The web editor loads inside WKWebView.

The wrapper uses UIKit and targets iPad/iOS. A Mac target needs NSViewRepresentable instead. Native file pickers, blob downloads, exported files, and share sheets require additional WKWebView delegates/native bridging; use Safari for the complete project import/export workflow. This wrapper does not add Unreal Engine or MetaHuman tooling to Swift Playgrounds.
