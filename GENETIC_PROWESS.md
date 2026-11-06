# Genetic Prowess workbench

The app now opens in a game-specific workbench. Source: anewbyss/Genetic-Prowess, repository tree 87598f10a81fe24fb6ff7086119fb8dfbfb03747, reviewed 2026-11-06. This is a dated reference, not a live connection to the game.

1. Choose a real cast or action. The clip reference and effect sync frames come from the game's config.
2. Adjust speed, blend timing, or effect timing. Enter what looks wrong and what should happen. Edits are proposed changes, not edits to your PC.
3. Pick a domain and use the visual editor to explore a look. It previews procedural particles, not the game's native effect assets.
4. Import before/after MotionQA qa.csv files. Attach side-view images or replay video from your PC. The table matches event + stance + shot. Scores are the game's own labels; exit-snap deltas are simple differences. Review photos as well as numbers.
5. Download the Claude handoff (Markdown) and change plan (JSON). Send those, plus the original images/video, to Claude when ready. The app does not contact Claude.
6. Transfer the change-plan JSON to another device and choose Open change plan. Media must be selected again; it is not embedded. Save/Restore keeps a plan in this browser only.
7. For a candidate Config/GeneSimAbilities.json, select the latest file from your PC and export a candidate copy. It refuses edits whose before-values no longer match and preserves unrelated settings. Back up and review before replacing a game file. Event timing changes are documented in the handoff; no whole events file is overwritten.

The game repo's AGENTS.md and GeneSim.uproject confirm a UE 5.8 target. The repository notes describe existing GASP layering fixes, MotionQA and input replay tools, Blender-built casts, and Cascade particle effects. Those inform the workbench and Claude checklist. The Windows Obsidian vault and prior chat sessions were unavailable; the workbench does not claim to have read them.

No Unreal code, game defaults, licensed assets, or live game content were modified. Native motion correction, pose inspection, effect authoring, performance checks, and the game's tests still happen on the Unreal PC. Clip paths are references only; some assets are not in git. Do not push the game's main branch without the owner's session authorization.
