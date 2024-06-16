// Function to load JSON data from a file
async function loadAssetsData(filePath, resolveReferenceFields = true) {
    try {
        const response = await fetch(filePath);
        const assets = await response.json();
        if (assets && resolveReferenceFields) {
            return resolveReferences(assets);
        }
        return assets;
    } catch (error) {
        console.error('Error reading or parsing file:', error);
        return null;
    }
}

// Function to resolve references within the asset data
function resolveReferences(assets) {
    assets.forEach(asset => {
        for (const key in asset) {
            if (asset[key] && typeof asset[key] === 'object' && asset[key].reference) {
                const field = asset[key].reference.field;
                if (asset[field]) {
                    if (Array.isArray(asset[field])) {
                        const index = asset[key].reference.index;
                        if (asset[field][index]) {
                            asset[key] = asset[field][index];
                        } else {
                            console.warn(`Invalid index for ${key} in game ${asset.id}`);
                            asset[key] = null;
                        }
                    } else {
                        asset[key] = asset[field];
                    }
                }
                else {
                    console.warn(`Invalid reference for ${key} in game ${asset.id}`);
                    asset[key] = null;
                }
            }
        }
    });
    return assets;
}

const gamesDataPromise = loadAssetsData('/data/games.json');
export async function getGames() {
    const games = await gamesDataPromise;
    games.forEach(game => {
        game.tags = game.genres;
        delete game.genres;
    });
    return games.sort((a, b) => new Date(b['publish-date']) - new Date(a['publish-date']));
}
export async function getGame(id) {
    const games = await getGames();
    return games.find(game => game.id === id);
}
export async function getNextGame(id) {
    const games = await getGames();
    const index = games.findIndex(game => game.id === id);
    return games[index + 1] || games[0];
}
export async function getPreviousGame(id) {
    const games = await getGames();
    const index = games.findIndex(game => game.id === id);
    return games[index - 1] || games[games.length - 1];
}

const unityAssetsDataPromise = loadAssetsData('/data/unity-assets.json');
export async function getUnityAssets() {
    const unityAssets = await unityAssetsDataPromise;
    return unityAssets.sort((a, b) => new Date(b['publish-date']) - new Date(a['publish-date']));
}
export async function getUnityAsset(id) {
    const unityAssets = await getUnityAssets();
    return unityAssets.find(asset => asset.id === id);
}
export async function getNextUnityAsset(id) {
    const unityAssets = await getUnityAssets();
    const index = unityAssets.findIndex(asset => asset.id === id);
    return unityAssets[index + 1] || unityAssets[0];
}
export async function getPreviousUnityAsset(id) {
    const unityAssets = await getUnityAssets();
    const index = unityAssets.findIndex(asset => asset.id === id);
    return unityAssets[index - 1] || unityAssets[unityAssets.length - 1];
}

const softwareDataPromise = loadAssetsData('/data/software.json');
export async function getSoftware() {
    const software = await softwareDataPromise;
    software.forEach(item => {
        const defaultThumbnail = { type: 'image', url: 'https://img.icons8.com/fluency/96/application-window.png' };
        item.thumbnail = item.thumbnail || defaultThumbnail;
    });
    return software.sort((a, b) => new Date(b['publish-date']) - new Date(a['publish-date']));
}
export async function getSoftwareItem(id) {
    const software = await getSoftware();
    return software.find(item => item.id === id);
}
export async function getNextSoftwareItem(id) {
    const software = await getSoftware();
    const index = software.findIndex(item => item.id === id);
    return software[index + 1] || software[0];
}
export async function getPreviousSoftwareItem(id) {
    const software = await getSoftware();
    const index = software.findIndex(item => item.id === id);
    return software[index - 1] || software[software.length - 1];
}

async function main() {
}

window.onload = main;
