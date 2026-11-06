# Forma to Unreal Engine 5.8

Target version: 5.8. Editor compatibility is not yet tested. Forma is a browser concept and particle preview app, not the MetaHuman Creator or a native Niagara editor.

## Start without coding

1. Download this repository as a ZIP from GitHub's Code menu and extract it.
2. Open index.html in a modern browser. Choose an asset card and adjust its sliders.
3. Save keeps a project in this browser. Open > Continue saved project restores it. Export > Export project makes a portable JSON backup. JSON is Forma's own format, not an Unreal import format.
4. Export a PNG when you want a reference image for your team.

## Import the included textures (no coding)

1. Open your Unreal 5.8 project and the Content Browser.
2. Create a Forma/Textures folder, then click Import.
3. Select soft-particle.tga and spark.tga from the extracted ZIP.
4. Create a Material. Set Material Domain to Surface, Blend Mode to Additive, Shading Model to Unlit, and enable Two Sided.
5. Add a Texture Sample using one imported texture. Multiply its RGB by a Vector Parameter for color, connect to Emissive Color. Connect the texture's alpha to Opacity. Save.
6. Create a Niagara System from a sprite emitter template available in your editor. Assign the material to its Sprite Renderer. Use your Forma color, particle size, speed, and count as a visual reference; units and simulation behavior differ.

## Optional texture import script

Enable Python Editor Script Plugin and Editor Scripting Utilities in Edit > Plugins, restart, and use Tools > Execute Python Script to run import_assets.py. Keep the extracted folder structure intact. It imports into /Game/Forma/Textures without overwriting existing assets. It does not create Niagara systems or materials. If your editor's APIs differ, use the manual import steps above.

## MetaHuman and motion

Use Unreal's installed MetaHuman tools to create actual MetaHuman assets. Forma's mannequin only explores colors and proportions. It cannot export MetaHuman meshes, DNA, hair grooms, or rigs. Recreate the motion references using Control Rig or licensed animation assets, then use Unreal's retargeting workflow for your character. Forma does not export FBX, animation sequences, or native .uasset files.

## Verify in UE 5.8

Before production use, confirm texture import and transparency, the material's appearance in your Niagara system, target-platform packaging, and MetaHuman plugin support in your installed editor. This repository has not been tested against a live UE 5.8 editor.

## Included assets

Two original generated RGBA TGA textures, six procedural browser effects, one stylized mannequin, and four procedural motion choices. Included original texture assets may be used and modified in personal or commercial projects. No Epic MetaHuman content is redistributed.
