async function fetchAndParse(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(text, 'text/html');
    const rows = Array.from(doc.querySelectorAll('table.wikitable.sortable > tbody > tr'));
    rows.shift(); // Remove header row
    return rows.map(row => {
        return Array.from(row.children);
    });
}

function parseStyles(styleString) {
    const result = new Map();
    if (!styleString) {
        return result;
    }
    const styles = styleString.split(';').map(s => s.trim()).filter(s => s);
    for (const style of styles) {
        const si = style.indexOf(':');
        if (si === -1) {
            throw new Error(`Invalid style format: ${style}`);
        }
        const key = style.substring(0, si).trim();
        const value = style.substring(si + 1).trim();
        if (!key) {
            throw new Error(`Invalid style key: ${style}`);
        }
        result.set(key, value);
    }
    return result;
}

function getColor(td) {
    if (!(td instanceof HTMLTableCellElement)) {
        throw new Error('Expected a table cell element for color.');
    }
    if (td.children.length !== 2 || td.attributes.length !== 2) {
        if (td.children.length === 0 && td.attributes.length === 0) {
            return null;
        }
        throw new Error('Invalid color cell structure.');
    }
    if (!td.attributes.getNamedItem('style') || !td.attributes.getNamedItem('class')) {
        throw new Error('Invalid color cell structure.');
    }
    const styles = parseStyles(td.attributes.getNamedItem('style')?.value);
    if (styles.size === 2) {
        if (!styles.has('background-color') || !styles.has('color')) {
            throw new Error('Invalid color cell structure.');
        }
    } else if (styles.size === 1) {
        if (!styles.has('background-color')) {
            throw new Error('Invalid color cell structure.');
        }
    }

    const color = styles.get('background-color')?.trim() || '';
    const fgColor = styles.get('color')?.trim() || '';

    const className = td.className;
    if (className !== 'colorcell') {
        throw new Error('Invalid color cell structure.');
    }
    const colorCodeSpan = td.children[0];
    const colorNameSpan = td.children[1];
    if (!(colorCodeSpan instanceof HTMLSpanElement) || !(colorNameSpan instanceof HTMLSpanElement)) {
        throw new Error('Invalid color cell structure.');
    }
    if (colorCodeSpan.attributes.length !== 0 || colorNameSpan.attributes.length !== 1) {
        throw new Error('Invalid color cell structure.');
    }
    if (!colorNameSpan.attributes.getNamedItem('title')) {
        throw new Error('Invalid color cell structure.');
    }
    const colorCode = (colorCodeSpan.textContent || '').trim().replace(/\u00A0/g, ' ');
    if (colorCode !== color) {
        if (colorCode !== '' || color === '') {
            throw new Error('Invalid color cell structure.');
        }
    }
    const colorName = (colorNameSpan.attributes.getNamedItem('title')?.value || '').trim();
    const colorNameContent = (colorNameSpan.textContent || '').trim();
    if (colorNameContent !== '¤') {
        throw new Error('Invalid color cell structure.');
    }

    if (color === '' && fgColor === '' && colorName === '') {
        return null;
    }

    const result = {};
    if (color) {
        result.color = color;
    }
    if (fgColor) {
        result.fgColor = fgColor;
    }
    if (colorName) {
        result.name = colorName;
    }
    return result;
}

function getName(td) {
    if (!(td instanceof HTMLTableCellElement)) {
        throw new Error('Expected a table cell element for name.');
    }
    if (td.attributes.length > 2) {
        throw new Error('Invalid name cell structure.');
    }
    const idAttr = td.attributes.getNamedItem('id');
    const sortValueAttr = td.attributes.getNamedItem('data-sort-value');
    if (td.attributes.length === 2 && (!idAttr || !sortValueAttr)) {
        throw new Error('Invalid name cell structure.');
    }
    if (td.attributes.length === 1 && !idAttr && !sortValueAttr) {
        throw new Error('Invalid name cell structure.');
    }
    const ids = idAttr ? [idAttr.value.trim()] : [];
    const nameCopy = td.cloneNode(true);
    const anchorSpans = nameCopy.querySelectorAll('span.anchor');
    for (const span of anchorSpans) {
        span.remove();
        if (span.id) {
            ids.push(span.id.trim());
        }
    }
    return {
        html: nameCopy.innerHTML.trim(),
        ids,
    };
}

function getKindOrGroup(td) {
    if (!(td instanceof HTMLTableCellElement)) {
        throw new Error('Expected a table cell element for kind or group.');
    }
    if ((td.children.length !== 2 && td.children.length !== 0) || td.attributes.length !== 0) {
        throw new Error('Invalid kind/group cell structure.');
    }
    if (td.children.length === 0) {
        const textContent = (td.textContent || '').trim();
        if (textContent === '') {
            return null;
        }
        return textContent;
    }

    const nameSpan = td.children[0];
    const imageSpan = td.children[1];
    if (!(nameSpan instanceof HTMLSpanElement) || !(imageSpan instanceof HTMLSpanElement)) {
        throw new Error('Invalid kind/group cell structure.');
    }
    if (nameSpan.attributes.length !== 1 || imageSpan.attributes.length !== 1 || nameSpan.children.length !== 0) {
        throw new Error('Invalid kind/group cell structure.');
    }
    const kindNameStyle = nameSpan.getAttribute('style');
    const kindImageTypeof = imageSpan.getAttribute('typeof');
    if (kindNameStyle !== 'display:none' || kindImageTypeof !== 'mw:File') {
        throw new Error('Invalid kind/group cell structure.');
    }
    const kindName = (nameSpan.textContent || '').trim();
    if (kindName === '') {
        return null;
    }
    return kindName;
}

function getFirstAppearance(td) {
    if (!(td instanceof HTMLTableCellElement)) {
        throw new Error('Expected a table cell element for first appearance.');
    }
    if (td.attributes.length !== 0) {
        throw new Error('Invalid first appearance cell structure.');
    }
    if (td.childNodes.length === 0) {
        return null;
    }
    let htitle = null;
    let ae = td;
    if (td.children.length === 1 && td.children[0] instanceof HTMLSpanElement) {
        ae = td.children[0];
        if (ae.attributes.length !== 2) {
            throw new Error('Invalid first appearance cell structure.');
        }
        const titleAttr = ae.getAttribute('title');
        const classAttr = ae.getAttribute('class');
        if (titleAttr == null || classAttr !== 'htitle') {
            throw new Error('Invalid first appearance cell structure.');
        }
        htitle = titleAttr.trim();
    }
    const resultLines = [];
    for (const childNode of ae.childNodes) {
        if (childNode.nodeType === Node.TEXT_NODE) {
            const text = childNode.textContent.trim();
            resultLines.push(text);
            continue;
        }
        if (childNode.nodeType !== Node.ELEMENT_NODE) {
            throw new Error('Invalid first appearance cell structure.');
        }
        if (!(childNode instanceof HTMLBRElement)) {
            throw new Error('Invalid first appearance cell structure.');
        }
        resultLines.push('\n');
    }
    const resultStr = resultLines.join('').trim();
    const result = {};
    if (htitle) {
        result.title = htitle;
    }
    if (resultStr) {
        result.text = resultStr;
    }
    return result;
}

function getDescription(td) {
    if (!(td instanceof HTMLTableCellElement)) {
        throw new Error('Expected a table cell element for description.');
    }
    if (td.attributes.length !== 0) {
        if (td.attributes.length !== 2) {
            throw new Error('Invalid description cell structure.');
        }
        const allignAttr = td.getAttribute('align');
        const scopeAttr = td.getAttribute('scope');
        if (allignAttr !== 'left' || scopeAttr !== 'col') {
            throw new Error('Invalid description cell structure.');
        }
    }
    return td.innerHTML.trim();
}

function getImages(td) {
    if (!(td instanceof HTMLTableCellElement)) {
        throw new Error('Expected a table cell element for image.');
    }
    if (td.attributes.length !== 0) {
        throw new Error('Invalid image cell structure.');
    }
    const imgs = [];
    for (const span of td.children) {
        if (span instanceof HTMLBRElement) {
            continue;
        }
        if (span instanceof HTMLAnchorElement) {
            if (span.children.length !== 0 || span.attributes.length !== 3) {
                throw new Error('Invalid image cell structure.');
            }
            const href = span.getAttribute('href');
            const title = span.getAttribute('title');
            const className = span.getAttribute('class');
            if (!href || !title || className !== 'extiw') {
                throw new Error('Invalid image cell structure.');
            }
            imgs.push(href.trim());
            continue;
        }
        if (!(span instanceof HTMLSpanElement)) {
            throw new Error('Invalid image cell structure.');
        }
        if (span.attributes.length !== 1) {
            throw new Error('Invalid image cell structure.');
        }
        const attName = span.attributes[0].name;
        if (attName !== 'typeof' && attName !== 'title') {
            throw new Error('Invalid image cell structure.');
        }
        if (attName === 'title' && span.getAttribute('title') !== '') {
            throw new Error('Invalid image cell structure: title attribute should be empty.');
        }
        if (attName === 'typeof' && span.getAttribute('typeof') !== 'mw:File') {
            throw new Error('Invalid image cell structure: typeof attribute should be mw:File.');
        }
        const img = span.querySelector('img');
        if (!img) {
            if (attName !== 'title') {
                throw new Error('Invalid image cell structure.');
            }
            const a = span.querySelector('a');
            if (!a || !(a instanceof HTMLAnchorElement)) {
                throw new Error('Invalid image cell structure: missing image element.');
            }
            if (a.children.length !== 0 || a.attributes.length !== 4) {
                throw new Error('Invalid image cell structure.');
            }
            const className = a.getAttribute('class');
            const href = a.getAttribute('href');
            const target = a.getAttribute('target');
            const rel = a.getAttribute('rel');
            if (!href || target !== '_blank' || rel !== 'nofollow noreferrer noopener' || className !== 'external text') {
                throw new Error('Invalid image cell structure.');
            }
            imgs.push(href.trim());
            continue;
        }
        if (!(img instanceof HTMLImageElement)) {
            throw new Error('Invalid image cell structure.');
        }
        const srcAtt = img.getAttribute('src');
        const dataSrcAtt = img.getAttribute('data-src');
        const src = (srcAtt == null || srcAtt.startsWith('data:')) ? dataSrcAtt : srcAtt;
        if (!src) {
            throw new Error('Invalid image cell structure: missing src attribute.');
        }
        imgs.push(src.trim());
    }
    return imgs;
}

const links = [
    ['earth', 'https://mlp.fandom.com/wiki/List_of_ponies/Earth_ponies'],
    ['pegasi', 'https://mlp.fandom.com/wiki/List_of_ponies/Pegasus_ponies'],
    ['unicorns', 'https://mlp.fandom.com/wiki/List_of_ponies/Unicorn_ponies'],
    ['alicorns', 'https://mlp.fandom.com/wiki/List_of_ponies/Alicorn_ponies'],
    ['crystal', 'https://mlp.fandom.com/wiki/List_of_ponies/Crystal_Ponies'],
    ['kirin', 'https://mlp.fandom.com/wiki/List_of_ponies/Kirin'],
    ['foal', 'https://mlp.fandom.com/wiki/List_of_ponies/Foals'],
    ['wonderbolts', 'https://mlp.fandom.com/wiki/List_of_Wonderbolts']
];

const results = await Promise.all(links.map(async ([type, url]) => {
    try {
        const rows = await fetchAndParse(url);
        return { type, rows };
    } catch (error) {
        console.error(`Failed to fetch or parse ${type}:`, error);
        return { type, rows: [] };
    }
})).then(results => {
    const result = [];
    for (const { type, rows } of results) {
        for (const row of rows) {
            if (row.length !== 9) {
                throw new Error(`Invalid row length for ${type}: expected 9, got ${row.length}`);
            }
            result.push({
                type,
                name: getName(row[0]),
                kind: getKindOrGroup(row[1]),
                group: getKindOrGroup(row[2]),
                coat: getColor(row[3]),
                mane: getColor(row[4]),
                eyes: getColor(row[5]),
                firstAppearance: getFirstAppearance(row[6]),
                description: getDescription(row[7]),
                images: getImages(row[8])
            });
        }
    }
    return result;
});
