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

const DEFAULT_FILTERS = {
    listType: ['earth', 'pegasi', 'unicorns', 'alicorns', /*'crystal', 'kirin', 'foal', 'wonderbolts'*/],
    group: ['mare', /*'stallion', 'colt', 'filly'*/],
    kind: ['earth', 'pegasus', 'unicorn', 'Alicorn', 'Kirin'],
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

/**
 * Filters ponies based on the selected filters.
 * @param {PonyInfo[]} ponies
 * @param {{ listType: ListType[], group: Group[], kind: Kind[] }} selected
 * @returns {PonyInfo[]}
 */
function filterPonies(ponies, selected) {
    if (Object.values(selected).some(value => value.length === 0)) {
        return [];
    }
    return ponies.filter(pony => {
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
        return passed;
    });
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
        const href = link.getAttribute('href');
        if (!href) return;
        if (href.startsWith('http://') || href.startsWith('https://')) {
            return;
        }
        if (href.startsWith('//') || href.startsWith('./')) {
            return;
        }
        if (href.startsWith('#')) {
            link.addEventListener('click', (event) => {
                // On mlp wiki this will just sctoll to the appropriate pony in the table,
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
        }
        link.setAttribute('href', `https://mlp.fandom.com${href}`);
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
    if (pony.coat) {
        const coatP = document.createElement('p');
        const coatStrong = document.createElement('strong');
        coatStrong.textContent = 'Coat Color:';
        coatP.appendChild(coatStrong);
        const coatSpan = document.createElement('span');
        coatSpan.className = 'color';
        coatSpan.style.backgroundColor = pony.coat.color || 'transparent';
        if (pony.coat.fgColor) {
            coatSpan.style.color = pony.coat.fgColor;
        }
        coatSpan.textContent = pony.coat.name || 'Unknown';
        coatP.appendChild(coatSpan);
        contentDiv.appendChild(coatP);
    }
    if (pony.mane) {
        const maneP = document.createElement('p');
        const maneStrong = document.createElement('strong');
        maneStrong.textContent = 'Mane Color:';
        maneP.appendChild(maneStrong);
        const maneSpan = document.createElement('span');
        maneSpan.className = 'color';
        maneSpan.style.backgroundColor = pony.mane.color || 'transparent';
        if (pony.mane.fgColor) {
            maneSpan.style.color = pony.mane.fgColor;
        }
        maneSpan.textContent = pony.mane.name || 'Unknown';
        maneP.appendChild(maneSpan);
        contentDiv.appendChild(maneP);
    }
    if (pony.eyes) {
        const eyesP = document.createElement('p');
        const eyesStrong = document.createElement('strong');
        eyesStrong.textContent = 'Eye Color:';
        eyesP.appendChild(eyesStrong);
        const eyesSpan = document.createElement('span');
        eyesSpan.className = 'color';
        eyesSpan.style.backgroundColor = pony.eyes.color || 'transparent';
        if (pony.eyes.fgColor) {
            eyesSpan.style.color = pony.eyes.fgColor;
        }
        eyesSpan.textContent = pony.eyes.name || 'Unknown';
        eyesP.appendChild(eyesSpan);
        contentDiv.appendChild(eyesP);
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
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'More Info';
    details.appendChild(summary);
    const idsP = document.createElement('p');
    const idsStrong = document.createElement('strong');
    idsStrong.textContent = 'IDs:';
    idsP.appendChild(idsStrong);
    idsP.appendChild(document.createTextNode(` ${pony.name.ids.join(', ')}`));
    details.appendChild(idsP);
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
    contentDiv.appendChild(details);
    ponyElement.appendChild(contentDiv);
    ponyContainer.innerHTML = '';
    ponyContainer.appendChild(ponyElement);
}

/**
 * Displays a pony and optionally pushes to history.
 * @param {PonyInfo} pony
 * @param {boolean} [pushState]
 * @param {boolean} [replaceState]
 */
function showPonyWithHistory(pony, pushState = false, replaceState = false) {
    showPony(pony);
    if (pushState) {
        history.pushState({ pony: pony }, '', '');
    }
}

/** @type {PonyInfo[]} */
let ponies = [];

(async () => {
    ponies = await getPonies();
    /** @type {PonyInfo[]} */
    let filteredPonies = [];

    /**
     * Shows a random pony from the filtered list.
     */
    function showRandomPony() {
        if (filteredPonies.length === 0) {
            ponyContainer.innerHTML =
                '<p>No ponies found for the selected group(s).</p>';
            return;
        }

        const randomIndex = Math.floor(Math.random() * filteredPonies.length);
        showPonyWithHistory(filteredPonies[randomIndex], true, true);
    }

    /**
     * @template {keyof typeof FILTER_KEYS} T
     * Updates the filteredPonies array and shows a random pony.
     * @param {T} name
     */
    function updateFilterAndShow(name) {
        const selected = {
            listType: getSelected(filterForms.listType, 'listType'),
            group: getSelected(filterForms.group, 'group'),
            kind: getSelected(filterForms.kind, 'kind'),
        };
        const selectedValues = /** @type {any} */ (selected[name]);
        saveSelected(name, selectedValues);
        filteredPonies = filterPonies(ponies, selected);
        showRandomPony();
    }

    for (const name of Object.keys(FILTER_KEYS)) {
        const key = /** @type {keyof typeof FILTER_KEYS} */ (name);
        const savedValues = /** @type {any} */ (loadSelected(key));
        setSelected(filterForms[key], key, savedValues);

        filterForms[key].addEventListener('change', () => updateFilterAndShow(key));
    }

    newPonyButton.addEventListener('click', showRandomPony);

    const initialSelected = {
        listType: getSelected(filterForms.listType, 'listType'),
        group: getSelected(filterForms.group, 'group'),
        kind: getSelected(filterForms.kind, 'kind'),
    };
    filteredPonies = filterPonies(ponies, initialSelected);
    showRandomPony();

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.pony) {
            showPonyWithHistory(event.state.pony, false);
        }
    });
})().catch(error => {
    console.error('Error fetching ponies:', error);
    ponyContainer.innerHTML = `<p>Error loading ponies: ${error.message}</p>`;
});