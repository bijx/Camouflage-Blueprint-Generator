![Weapon Blueprint Generator](https://imgur.com/CWm8zfA.png)

[**[LIVE DEMO]**](https://bijx.github.io/Weapon-Blueprint-Generator/)
# Weapon Blueprint Generator
The **WBG** is an experimental online tool that generates random fictional weapons for video games, similar to bundles that can be found on many modern video games. When you generate a new weapon, the name, description, and weapon class are all selected from AI-generated options, and the weapon wrap (skin) is applied to the model on the screen.

This application uses [three.js](https://github.com/mrdoob/three.js/) to display the various weapon models and textures.

## What's the Point?
With the surging popularity of modern online video games and their concurrent users, a distinctive identity is something every player covets. Acquiring weapon or character skins, charms, stickers, and other cosmetic accessories often achieves this. The WBG taps into the allure of unique content in-game, suggesting a novel way for players to possess exclusive game items.

**TL;DR**: While the website is a fun-filled experiment, the prospects it hints at for future gaming are really exciting. 😁

## How it Works
While the term "generator" suggests creation, the WBG is more aptly a "remixer". It integrates pre-generated content to conserve resources for the sake of the experiment. The various generated components are described below:

### Weapon Information
Every weapon is characterized by:

1. `Weapon Name`: Deriving from subjects like astrophysics, ancient history, and philosophy, GPT-4 provides colloquial terms that lend an intriguing touch. These names serve as the foundation for the subsequent descriptions.
2. `Description`: The AI-generated descriptions of what each weapon does and if it has any special abilities. With very limited guidance, the GPT-4 was instructed to create a description for each weapon based on its provided name.
3. `Class`: Given its design for a fictional first-person shooter game, the weapon classes encompass: Assault Rifle, Sniper, Pistol, SMG, LMG, Melee, and Shotgun.
4. **OPTIONAL** `preferredTextureId`: The camo texture related to the weapon name.

Example Weapon Object:
```json
{
  "class": "Pistol",
  "description": "Sidearm that nullifies enemy healing for a brief period, embracing the void of recovery.",
  "weaponName": "Nihilism",
  "preferredTextureId": 19
}
```

### Tileable Camoflauge Texture
A set of camo textures were also generated using Midjourney to create the unique skins for each weapon. Some skins were generated with prompts related to a specific weapon's generated `name` and `description`, so those textures are always associated with their respective weapons.

![Tileable Camo Textures](https://imgur.com/ZVsRsGT.png)

The camoflauge textures can be downloaded for each of the generated weapons, which is what makes the tool useful for game developers (or just tileable pattern enjoyers).

## Technology Stack
The system was built as a static HTML site so it could be served using Github Pages. The script uses [three.js](https://github.com/mrdoob/three.js/) to render the 3D models for each weapon class, which were UV-unwrapped and prepared ahead of time in Blender.

## Licensing
This project is open-source, under the premise that the images were generated using Midjourney and hence, should be free from any copyright constraints.