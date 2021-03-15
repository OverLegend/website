const modList = [
  {
    raw_name: "skyblock",
    friendly_name: "SkyBlock",
    wallpaper_dir: "/img/modalities/wallpaper_skyblock.webp",
    lore: "La skyblock è bella",
    version: ["1.15.x", "1.16.x"],
    lore_position: "left"
  },
  {
    raw_name: "vanilla",
    friendly_name: "Vanilla",
    wallpaper_dir: "/img/modalities/wallpaper_vanilla.webp",
    lore: "La vanilla è bella",
    version: ["1.16.4"],
    lore_position: "right"
  }
];

function updateModalities() {
  for (let i = 0; i < modList.length; i++) {
    let mainContainer = document.createElement("div");
    mainContainer.classList = `mod ${modList[i].lore_position}`;

    // Creating description
    let loreContainer = document.createElement("div");
    loreContainer.className = "lore";

    let loreTitle = document.createElement("h3");
    loreTitle.innerText = modList[i].friendly_name;

    let loreText = document.createElement("p");
    loreText.innerText = modList[i].lore;

    loreContainer.appendChild(loreTitle);
    loreContainer.appendChild(loreText);

    // Creating wallpaper
    let wallpaperContainer = document.createElement("div");
    wallpaperContainer.className = "wall";

    let wallpaperImage = document.createElement("img");
    wallpaperImage.src = modList[i].wallpaper_dir;
    
    wallpaperContainer.appendChild(wallpaperImage);


    // Main container childs
    mainContainer.appendChild(loreContainer);
    mainContainer.appendChild(wallpaperContainer);

    document.getElementById("modalities").appendChild(mainContainer);

  }
}

