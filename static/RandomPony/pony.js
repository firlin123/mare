// @ts-check

/** @typedef {'earth' | 'pegasi' | 'unicorns' | 'alicorns' | 'crystal' | 'kirin' | 'foal' | 'wonderbolts'} ListType */
/** @typedef {'earth' | 'pegasus' | 'unicorn' | 'Alicorn' | 'Kirin'} Kind */
/** @typedef {'mare' | 'stallion' | 'colt' | 'filly'} Group */
/**
 * @typedef {Object} ColorInfo
 * @property {string} [name]
 * @property {string} [color]
 * @property {string} [fgColor]
 */
/**
 * @typedef {Object} NameInfo
 * @property {string} html
 * @property {string[]} ids
 */
/**
 * @typedef {Object} FirstAppearance
 * @property {string} [title]
 * @property {string} [text]
 */
/**
 * @typedef {Object} PonyInfo
 * @property {ListType} type
 * @property {NameInfo} name
 * @property {Kind | null} kind
 * @property {Group | null} group
 * @property {ColorInfo} [coat]
 * @property {ColorInfo} [mane]
 * @property {ColorInfo} [eyes]
 * @property {FirstAppearance} [firstAppearance]
 * @property {string} description
 * @property {string[]} images
 */

/**
 * Gets a list of ponies.
 * @returns {Promise<PonyInfo[]>}
 */
async function getPonies() {
    const response = await fetch('/RandomPony/ponies.json');
    if (!response.ok) {
        throw new Error(`Failed to fetch ponies: ${response.statusText}`);
    }
    return response.json();
}

/**
 * @template {HTMLElement} T
 * @param {string} id
 * @param {new () => T} type
 * @returns {T}
 */
function strictGetElementById(id, type) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with ID '${id}' not found.`);
    }
    if (!(element instanceof type)) {
        throw new Error(`Element with ID '${id}' is not of type ${type.name}.`);
    }
    return /** @type {T} */ (element);
}

const newPonyButton = strictGetElementById('new-pony', HTMLButtonElement);
const ponyContainer = strictGetElementById('pony-container', HTMLDivElement);
const filterForms = {
    listType: strictGetElementById('list-type-filter', HTMLFormElement),
    group: strictGetElementById('group-filter', HTMLFormElement),
    kind: strictGetElementById('kind-filter', HTMLFormElement),
};

const FILTER_KEYS = {
    listType: 'selectedListTypes',
    group: 'selectedGroups',
    kind: 'selectedKinds',
};

const FILTERED_PONIES_KEY = 'filteredPonies';
const IDS_LEFT_KEY = 'idsLeft';

const ALL_FILTERS = {
    listType: ['earth', 'pegasi', 'unicorns', 'alicorns', 'crystal', 'kirin', 'foal', 'wonderbolts'],
    group: ['mare', 'stallion', 'colt', 'filly'],
    kind: ['earth', 'pegasus', 'unicorn', 'Alicorn', 'Kirin'],
};

const DEFAULT_FILTERS = {
    listType: getSelected(filterForms.listType, 'listType'),
    group: getSelected(filterForms.group, 'group'),
    kind: getSelected(filterForms.kind, 'kind'),
};

/**
 * @template {keyof typeof DEFAULT_FILTERS} T
 * Gets the default values for a filter.
 * @param {T} name
 * @returns {T extends 'listType' ? ListType[] : T extends 'group' ? Group[] : Kind[]}
 */
function getDefault(name) {
    const defaultValues = /**@type {any} */ (DEFAULT_FILTERS[name] || []);
    return defaultValues.slice(0);
}

/**
 * @template {keyof typeof FILTER_KEYS} T
 * Gets the selected values from a filter form.
 * @param {HTMLFormElement} form
 * @param {T} name
 * @returns {T extends 'listType' ? ListType[] : T extends 'group' ? Group[] : Kind[]}
 */
function getSelected(form, name) {
    /** @type {string[]} */
    const selected = [];
    form.querySelectorAll(`input[name="${name}"]:checked`).forEach(
        (input) => {
            if (!(input instanceof HTMLInputElement)) {
                throw new Error('Expected input to be an HTMLInputElement');
            }
            selected.push(input.value);
        }
    );
    return /** @type {any} */ (selected);
}

/**
 * @template {keyof typeof FILTER_KEYS} T
 * Sets the selected values in a filter form.
 * @param {HTMLFormElement} form
 * @param {T} name
 * @param {T extends 'listType' ? ListType[] : T extends 'group' ? Group[] : Kind[]} values
 */
function setSelected(form, name, values) {
    const anyValues = /** @type {any} */ (values);
    form.querySelectorAll(`input[name="${name}"]`).forEach(
        (input) => {
            if (!(input instanceof HTMLInputElement)) return;
            input.checked = anyValues.includes(/** @type {Group} */(input.value));
        }
    );
}

/**
 * @template {keyof typeof FILTER_KEYS} T
 * Saves the selected values to localStorage.
 * @param {T} name
 * @param {T extends 'listType' ? ListType[] : T extends 'group' ? Group[] : Kind[]} values
 */
function saveSelected(name, values) {
    localStorage.setItem(FILTER_KEYS[name], JSON.stringify(values));
}

/**
 * @template {keyof typeof FILTER_KEYS} T
 * Loads the selected values from localStorage.
 * @param {T} name
 * @returns {T extends 'listType' ? ListType[] : T extends 'group' ? Group[] : Kind[]}
 */
function loadSelected(name) {
    const data = localStorage.getItem(FILTER_KEYS[name]);
    if (!data) return (/** @type {any} */ (getDefault(name)));
    try {
        /** @type {T extends 'listType' ? ListType[] : T extends 'group' ? Group[] : Kind[]} */
        const values = JSON.parse(data);
        return Array.isArray(values) ? values : (/** @type {any} */ (getDefault(name)));
    } catch {
        return (/** @type {any} */ (getDefault(name)));
    }
}

/** @type {Map<number, number[]>} */
let filteredCache = new Map();

/**
 * Generates a cache key based on the selected filters.
 * @param {{ listType: ListType[], group: Group[], kind: Kind[] }} selected
 * @returns {number}
 */
function getCacheKey(selected) {
    let key = 0;
    for (const filter in ALL_FILTERS) {
        const values = selected[filter] || [];
        for (const value of ALL_FILTERS[filter]) {
            key = (key << 1) | (values.includes(value) ? 1 : 0);
        }
    }
    return key;
}

/**
 * Filters ponies based on the selected filters.
 * @param {PonyInfo[]} ponies
 * @param {{ listType: ListType[], group: Group[], kind: Kind[] }} selected
 * @returns {number[]}
 */
function filterPonies(ponies, selected) {
    let cacheKey = getCacheKey(selected);
    let cachedPonies = filteredCache.get(cacheKey);
    if (cachedPonies) {
        return cachedPonies;
    }
    if (Object.values(selected).some(value => value.length === 0)) {
        filteredCache.set(cacheKey, cachedPonies = []);
        return cachedPonies;
    }
    cachedPonies = [];
    for (let id = 0; id < ponies.length; id++) {
        const pony = ponies[id];
        const ponyListType = pony.type;
        const ponyGroup = pony.group;
        const ponyKind = pony.kind;

        let passed = true;
        if (ponyListType && !selected.listType.includes(ponyListType)) {
            passed = false;
        }
        if (ponyGroup && !selected.group.includes(ponyGroup)) {
            passed = false;
        }
        if (ponyKind && !selected.kind.includes(ponyKind)) {
            passed = false;
        }
        if (passed) {
            cachedPonies.push(id);
        }
    }

    filteredCache.set(cacheKey, cachedPonies);
    return cachedPonies;
}

const IMAGE_REGEX = /^(https:\/\/static\.wikia\.nocookie\.net\/.+)\/revision\/latest(?:\/scale-to-width-down\/\d+)?\?cb=\d+$/;

/**
 * Gets the main image URL from a pony's images.
 * @param {string[]} images
 * @returns {string | null}
 */
function getMainImage(images) {
    /** @type {string | null} */
    let selectedImage = null;
    for (const image of images) {
        const match = image.match(IMAGE_REGEX);
        if (match) {
            selectedImage = match[1];
            break;
        }
        const lc = image.toLowerCase();
        if (lc.endsWith('.png') || lc.endsWith('.jpg') || lc.endsWith('.jpeg')) {
            selectedImage = image;
            break;
        }
    }
    return selectedImage;
}

/**
 * Cleans the image link by removing unnecessary parts.
 * @param {string} image
 * @returns {string}
 */
function getCleanImageLink(image) {
    const match = image.match(IMAGE_REGEX);
    if (match) {
        return match[1];
    }
    return image;
}

/**
 * Fixes links in the given element.
 * @param {HTMLElement} element
 * @param {ListType} currentList
 * @returns {void}
 */
function fixLinks(element, currentList) {
    element.querySelectorAll('a').forEach(link => {
        if (!(link instanceof HTMLAnchorElement)) return;
        let href = link.getAttribute('href');
        if (!href) return;
        // https://mlp.fandom.com/wiki/List_of_ponies#Luminous_Dazzle
        // or just /wiki/List_of_ponies#Luminous_Dazzle
        const match = href.match(/^(?:https?:\/\/mlp\.fandom\.com)?\/wiki\/List_of_ponies(#[\w-]+)$/);
        if (match) {
            href = match[1];
            link.setAttribute('href', href);
        }

        if (href.startsWith('http://') || href.startsWith('https://')) {
            return;
        }
        if (href.startsWith('//') || href.startsWith('./')) {
            return;
        }
        if (href.startsWith('#')) {
            link.addEventListener('click', (event) => {
                // On mlp wiki this will just scroll to the appropriate pony in the table,
                // But since we don't have the table, we should load and show the pony by their ID instead.
                event.preventDefault();
                const ponyId = href.slice(1);
                /** @type {PonyInfo | null} */
                let found = null;
                /** @type {PonyInfo | null} */
                let foundInCurrentList = null;
                for (const pony of ponies) {
                    if (pony.name.ids.includes(ponyId)) {
                        if (!found) {
                            found = pony;
                        }
                        if (pony.type === currentList) {
                            foundInCurrentList = pony;
                            break;
                        }
                    }
                }
                const pony = foundInCurrentList || found;
                if (pony) {
                    showPonyWithHistory(pony, true);
                } else {
                    alert(`Pony with ID '${ponyId}' not found.`);
                }
            });
        } else {
            link.setAttribute('href', `https://mlp.fandom.com${href}`);
        }
    });
}

/**
 * Creates a paragraph element for a pony's color information.
 * @param {ColorInfo} colorInfo
 * @param {string} colorText
 * @returns {HTMLParagraphElement}
 */
function createColorP(colorInfo, colorText) {
    const coatP = document.createElement('p');
    const coatStrong = document.createElement('strong');
    coatStrong.textContent = colorText;
    coatP.appendChild(coatStrong);
    const coatSpan = document.createElement('span');
    coatSpan.className = 'color';
    if (colorInfo.color) {
        coatSpan.style.backgroundColor = colorInfo.color;
    }
    // if (colorInfo.fgColor) {
    //     coatSpan.style.color = colorInfo.fgColor;
    // }
    if (colorInfo.name) {
        coatSpan.title = colorInfo.name;
    }
    coatSpan.textContent = '¤';
    coatP.appendChild(coatSpan);
    return coatP
}

/**
 * Calculates the relative luminance of a color
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {number} Relative luminance (0-1)
 */
function getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Determines if white or black text should be used on a given background color
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {string} Either '#ffffff' or '#000000'
 */
function getContrastColor(r, g, b) {
    const luminance = getLuminance(r, g, b);
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Populates the color paragraph with computed colors if available.
 * @param {HTMLParagraphElement | null} colorP
 * @returns {void}
 */
function pupulateWithComputedColors(colorP) {
    if (!colorP) return;
    const colorSpan = colorP.querySelector('.color');
    if (!colorSpan || !(colorSpan instanceof HTMLSpanElement)) {
        return;
    }
    const computedStyle = getComputedStyle(colorSpan);
    if (computedStyle.backgroundColor === 'rgba(0, 0, 0, 0)') {
        return;
    }
    const match = computedStyle.backgroundColor.match(/(?:rgb\((\d{1,3}, \d{1,3}, \d{1,3})\)|rgba\((\d{1,3}, \d{1,3}, \d{1,3}, [01](?:\.\d+)?)\))/);
    if (!match) {
        console.warn('Could not parse color from computed style:', computedStyle.backgroundColor);
        return;
    }
    const [r, g, b] = (match[1] || match[2]).split(',').map(Number);
    const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).padStart(6, '0')}`;
    const textColor = getContrastColor(r, g, b);
    colorSpan.style.color = textColor;
    colorSpan.textContent = hexColor;
    let animationTimeout;
    colorSpan.addEventListener('click', () => {
        // Copy the hex color to clipboard
        navigator.clipboard.writeText(hexColor).then(() => {
            if (animationTimeout) {
                clearTimeout(animationTimeout);
            }
            colorSpan.classList.remove('error');
            colorSpan.classList.add('copied');
            animationTimeout = setTimeout(() => {
                colorSpan.classList.remove('copied');
                animationTimeout = null;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy color:', err);
            if (animationTimeout) {
                clearTimeout(animationTimeout);
            }
            colorSpan.classList.remove('copied');
            colorSpan.classList.add('error');
            animationTimeout = setTimeout(() => {
                colorSpan.classList.remove('error');
                animationTimeout = null;
            }, 2000);
        });
    });
}

/**
 * Displays a pony's information in the container.
 * @param {PonyInfo} pony
 * @returns {void}
 */
function showPony(pony) {
    const ponyElement = document.createElement('div');
    ponyElement.className = 'pony';

    // IMAGE
    const mainImg = getMainImage(pony.images);
    if (mainImg) {
        const img = document.createElement('img');
        img.src = mainImg;
        ponyElement.appendChild(img);
    }

    // CONTENT
    const contentDiv = document.createElement('div');
    contentDiv.className = 'pony-content';

    const nameElement = document.createElement('h2');
    nameElement.innerHTML = pony.name.html;
    fixLinks(nameElement, pony.type);
    contentDiv.appendChild(nameElement);
    const fromListP = document.createElement('p');
    const fromListStrong = document.createElement('strong');
    fromListStrong.textContent = 'From List:';
    fromListP.appendChild(fromListStrong);
    fromListP.appendChild(document.createTextNode(` ${pony.type}`));
    contentDiv.appendChild(fromListP);
    const kindP = document.createElement('p');
    const kindStrong = document.createElement('strong');
    kindStrong.textContent = 'Kind:';
    kindP.appendChild(kindStrong);
    kindP.appendChild(document.createTextNode(` ${pony.kind || 'Unknown'}`));
    contentDiv.appendChild(kindP);
    const groupP = document.createElement('p');
    const groupStrong = document.createElement('strong');
    groupStrong.textContent = 'Group:';
    groupP.appendChild(groupStrong);
    groupP.appendChild(document.createTextNode(` ${pony.group || 'Unknown'}`));
    contentDiv.appendChild(groupP);
    /** @type {HTMLParagraphElement | null} */
    let coatColorP = null;
    if (pony.coat) {
        contentDiv.appendChild(coatColorP = createColorP(pony.coat, 'Coat Color:'));
    }
    /** @type {HTMLParagraphElement | null} */
    let maneColorP = null;
    if (pony.mane) {
        contentDiv.appendChild(maneColorP = createColorP(pony.mane, 'Mane Color:'));
    }
    /** @type {HTMLParagraphElement | null} */
    let eyesColorP = null;
    if (pony.eyes) {
        contentDiv.appendChild(eyesColorP = createColorP(pony.eyes, 'Eyes Color:'));
    }
    if (pony.firstAppearance) {
        const firstAppearanceP = document.createElement('p');
        firstAppearanceP.className = 'first-appearance';
        const firstAppearanceStrong = document.createElement('strong');
        firstAppearanceStrong.textContent = 'First Appearance:';
        firstAppearanceP.appendChild(firstAppearanceStrong);
        const firstAppearanceDiv = document.createElement('div');
        if (pony.firstAppearance.title) {
            firstAppearanceDiv.title = pony.firstAppearance.title;
        }
        firstAppearanceDiv.innerText = pony.firstAppearance.text || 'Unknown';
        firstAppearanceP.appendChild(firstAppearanceDiv);
        contentDiv.appendChild(firstAppearanceP);
    }
    const descriptionP = document.createElement('p');
    descriptionP.innerHTML = pony.description || 'No description available.';
    fixLinks(descriptionP, pony.type);
    contentDiv.appendChild(descriptionP);
    if (pony.name.ids.length > 0 || pony.images.length > 0) {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = 'More Info';
        details.appendChild(summary);
        if (pony.name.ids.length > 0) {
            const idsP = document.createElement('p');
            const idsStrong = document.createElement('strong');
            idsStrong.textContent = 'IDs:';
            idsP.appendChild(idsStrong);
            idsP.appendChild(document.createTextNode(` ${pony.name.ids.join(', ')}`));
            details.appendChild(idsP);
        }
        if (pony.images.length > 0) {
            const galleryP = document.createElement('p');
            const galleryStrong = document.createElement('strong');
            galleryStrong.textContent = 'Gallery:';
            galleryP.appendChild(galleryStrong);
            const galleryList = document.createElement('ul');
            pony.images.forEach(image => {
                const listItem = document.createElement('li');
                const img = document.createElement('img');
                img.src = getCleanImageLink(image);
                img.loading = 'lazy';
                listItem.appendChild(img);
                galleryList.appendChild(listItem);
            });
            galleryP.appendChild(galleryList);
            details.appendChild(galleryP);
        }
        contentDiv.appendChild(details);
    }
    ponyElement.appendChild(contentDiv);
    ponyContainer.innerHTML = '';
    ponyContainer.appendChild(ponyElement);
    pupulateWithComputedColors(coatColorP);
    pupulateWithComputedColors(maneColorP);
    pupulateWithComputedColors(eyesColorP);
}

/**
 * Displays a pony and optionally pushes to history.
 * @param {PonyInfo} pony
 * @param {boolean} [pushState]
 * @param {boolean} [replaceState]
 */
function showPonyWithHistory(pony, pushState = false, replaceState = false) {
    showPony(pony);
    const ponyId = pony?.name?.ids?.[0] || '';
    const newUrl = new URL(window.location.href);
    if (ponyId) {
        newUrl.hash = `#${encodeURIComponent(ponyId)}`;
    } else {
        newUrl.hash = '';
    }
    if (pushState) {
        if (replaceState) {
            history.replaceState({ pony: pony }, '', newUrl.toString());
        }
        else {
            history.pushState({ pony: pony }, '', newUrl.toString());
        }
    }
}

/** @type {(t: number) => number} */
const CURVE_FN = t => 1 - Math.pow(1 - t, 0.62);
const CURVE_CLICKS_MIN = 45;
const CURVE_CLICKS_MAX = 75;
const CURVE_MIN_MS = 32;
const CURVE_MAX_MS = 500;

/** @type {PonyInfo[]} */
let ponies = [];

(async () => {
    ponies = await getPonies();
    /** @type {number[]} */
    let filteredPonies = JSON.parse(localStorage.getItem(FILTERED_PONIES_KEY) || '[]');
    /** @type {number[]} */
    let idsLeft = JSON.parse(localStorage.getItem(IDS_LEFT_KEY) || '[]');

    /** @type {Promise<{ id: number, delay: number }[]>} */
    let preparedSequence = Promise.resolve([]);
    /** @type {Map<string, HTMLImageElement | 'error'>} */
    let preparedImages = new Map();

    /**
     * Prepares a sequence of ponies to be shown.
     * @returns {Promise<{ id: number, delay: number }[]>}
     */
    async function prepareSequence() {
        if (idsLeft.length === 0) {
            return [];
        }
        const sequence = [];
        const promises = [];
        const curveClicks = Math.floor(Math.random() * (CURVE_CLICKS_MAX - CURVE_CLICKS_MIN + 1) + CURVE_CLICKS_MIN);
        for (let i = 0; i < curveClicks; i++) {
            const delayT = CURVE_FN(i / curveClicks);
            const delay = Math.round(CURVE_MIN_MS + (CURVE_MAX_MS - CURVE_MIN_MS) * delayT)
            const id = idsLeft[Math.floor(Math.random() * idsLeft.length)];
            const pony = ponies[id];
            const mainImg = getMainImage(pony.images);
            sequence.push({ id, delay });
            if (!mainImg) {
                continue;
            }
            if (preparedImages.has(mainImg)) {
                continue;
            }
            promises.push(new Promise(resolve => {
                const img = new Image();
                img.src = mainImg;
                img.onload = () => {
                    preparedImages.set(mainImg, img);
                    resolve(void 0);
                };
                img.onerror = () => {
                    preparedImages.set(mainImg, 'error');
                    resolve(void 0);
                };
            }));
        }
        await Promise.all(promises);
        // console.log(`Prepared sequence: ${sequence.map((s, i) => `(${i}, ${s.delay})`).join(', ')}`);
        return sequence;
    }

    /**
     * Plays a pony roll animation and shows a pony.
     */
    async function playRandomPonyRollAnimation() {
        if (ponyContainer.classList.contains('rolling') || newPonyButton.disabled) {
            return;
        }
        if (filteredPonies.length === 0) {
            ponyContainer.style.display = '';
            ponyContainer.innerHTML =
                '<p>No ponies found for the selected group(s).</p>';
            return;
        }

        ponyContainer.classList.add('rolling');
        newPonyButton.disabled = true;
        newPonyButton.innerHTML = 'Rolling...';
        const sequence = await preparedSequence;
        ponyContainer.style.display = '';
        if (sequence.length === 0) {
            ponyContainer.innerHTML = '<p>No ponies available for the current filters.</p>';
            return;
        }
        const imageOrTextContainer = document.createElement('div');
        imageOrTextContainer.className = 'image-or-text-container';
        ponyContainer.innerHTML = '';
        ponyContainer.appendChild(imageOrTextContainer);

        for (const { id, delay } of sequence) {
            imageOrTextContainer.innerHTML = '';
            const pony = ponies[id];
            /** @type {HTMLImageElement | null} */
            let mainImg = null;
            const mainImgLink = getMainImage(pony.images);
            if (mainImgLink) {
                let img = preparedImages.get(mainImgLink);
                if (img && img !== 'error') {
                    mainImg = img;
                }
            }
            if (mainImg) {
                imageOrTextContainer.appendChild(mainImg);
            } else {
                const text = document.createElement('p');
                text.innerHTML = pony.name.html;
                imageOrTextContainer.appendChild(text);
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        ponyContainer.classList.remove('rolling');
        newPonyButton.disabled = false;
        newPonyButton.innerHTML = 'Get New Pony';
        const randomIndexIndex = Math.floor(Math.random() * idsLeft.length);
        const [randomIndex] = idsLeft.splice(randomIndexIndex, 1);
        localStorage.setItem(IDS_LEFT_KEY, JSON.stringify(idsLeft));
        const randomPony = ponies[randomIndex];
        if (idsLeft.length === 0) {
            console.log('All ponies shown, resetting idsLeft.');
            idsLeft = filteredPonies.slice();
            localStorage.setItem(IDS_LEFT_KEY, JSON.stringify(idsLeft));
        }
        showPonyWithHistory(randomPony, true, true);
        preparedSequence = prepareSequence();
    }

    /**
     * @template {keyof typeof FILTER_KEYS} T
     * Updates the filter based on the selected values.
     * @param {T} name
     */
    function updateFilter(name) {
        const selected = {
            listType: getSelected(filterForms.listType, 'listType'),
            group: getSelected(filterForms.group, 'group'),
            kind: getSelected(filterForms.kind, 'kind'),
        };
        const selectedValues = /** @type {any} */ (selected[name]);
        saveSelected(name, selectedValues);
        filteredPonies = filterPonies(ponies, selected);
        localStorage.setItem(FILTERED_PONIES_KEY, JSON.stringify(filteredPonies));
        idsLeft = filteredPonies.slice();
        localStorage.setItem(IDS_LEFT_KEY, JSON.stringify(idsLeft));
    }

    for (const name of Object.keys(FILTER_KEYS)) {
        const key = /** @type {keyof typeof FILTER_KEYS} */ (name);
        const savedValues = /** @type {any} */ (loadSelected(key));
        setSelected(filterForms[key], key, savedValues);

        filterForms[key].addEventListener('change', () => updateFilter(key));
    }

    newPonyButton.addEventListener('click', playRandomPonyRollAnimation);

    const initialSelected = {
        listType: getSelected(filterForms.listType, 'listType'),
        group: getSelected(filterForms.group, 'group'),
        kind: getSelected(filterForms.kind, 'kind'),
    };
    if (filteredPonies.length === 0) {
        filteredPonies = filterPonies(ponies, initialSelected);
        localStorage.setItem(FILTERED_PONIES_KEY, JSON.stringify(filteredPonies));
        idsLeft = filteredPonies.slice();
        localStorage.setItem(IDS_LEFT_KEY, JSON.stringify(idsLeft));
    }
    if (idsLeft.length === 0) {
        idsLeft = filteredPonies.slice();
        localStorage.setItem(IDS_LEFT_KEY, JSON.stringify(idsLeft));
    }
    preparedSequence = prepareSequence();

    const hashPonyId = decodeURIComponent(window.location.hash.slice(1));
    let foundPony = null;
    if (hashPonyId) {
        for (const id of filteredPonies) {
            const pony = ponies[id];
            if (pony.name.ids.includes(hashPonyId)) {
                foundPony = pony;
                break;
            }
        }
        if (!foundPony) {
            for (const pony of ponies) {
                if (pony.name.ids.includes(hashPonyId)) {
                    foundPony = pony;
                    break;
                }
            }
        }
    }
    if (foundPony) {
        showPonyWithHistory(foundPony, true, true);
    } else {
        ponyContainer.style.display = 'none';
        ponyContainer.innerHTML = '';
    }

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.pony) {
            showPonyWithHistory(event.state.pony, false);
        }
    });

    window.addEventListener('hashchange', () => {
        console.log('Hash changed:', window.location.hash);
        const hashPonyId = window.location.hash.slice(1);
        if (hashPonyId) {
            let foundPony = null;
            for (const id of filteredPonies) {
                const pony = ponies[id];
                if (pony.name.ids.includes(hashPonyId)) {
                    foundPony = pony;
                    break;
                }
            }
            if (foundPony) {
                return showPonyWithHistory(foundPony, false);
            }
            for (const pony of ponies) {
                if (pony.name.ids.includes(hashPonyId)) {
                    foundPony = pony;
                    break;
                }
            }
            if (foundPony) {
                return showPonyWithHistory(foundPony, false);
            }
            ponyContainer.innerHTML = `<p>Pony with ID '${hashPonyId}' not found.</p>`;
        }
    });
})().catch(error => {
    console.error('Error fetching ponies:', error);
    ponyContainer.innerHTML = `<p>Error loading ponies: ${error.message}</p>`;
});