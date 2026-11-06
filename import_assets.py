"""Run from Unreal Editor's Tools > Execute Python Script.
Select the downloaded texture folder. Requires Python Editor Script Plugin.
Target: UE 5.8; pending validation in that editor.
"""
import os
import unreal

def main():
    selected = os.path.dirname(os.path.abspath(__file__))
    # Keep this script beside the two TGA textures from this upload.
    tasks = []
    for filename in ('soft-particle.tga', 'spark.tga'):
        path = os.path.join(selected, filename)
        if not os.path.isfile(path):
            unreal.log_warning('Missing Forma texture: ' + path)
            continue
        task = unreal.AssetImportTask()
        task.filename = path
        task.destination_path = '/Game/Forma/Textures'
        task.automated = True
        task.replace_existing = False
        task.save = True
        tasks.append(task)
    if tasks:
        unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks(tasks)
        unreal.log('Forma texture import complete. Check /Game/Forma/Textures.')

if __name__ == '__main__':
    main()
