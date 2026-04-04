var rendering = false;
var fileLoaded = false;
let loadedFileText = '';
var countWords = {
    fourchan: function (id, skipwords) {
        var
            word, postwords = [], wordcount = {},
            target = document.getElementById(id),
            entities = document.createElement('div'),
            posts;

        if (/<meta name="generator" content="FoolFuuka/.test(target.value)) {
            posts = target.value.match(/<div class="text"[^>]*>(.*?)<\/div>/g);
        }
        else {
            posts = target.value.match(/<blockquote [^>]+>(.*?)<\/blockquote>/g);
        }

        if (posts) {
            for (var i = posts.length - 1; i >= 0; i--) {
                entities.innerHTML = posts[i].replace(/(<\/?[^>]*>)/g, ' ');
                postwords = entities.childNodes[0].nodeValue.replace(/['’`]s\s/gi, ' ').split(' ');
                for (var j = postwords.length - 1; j >= 0; j--) {
                    word = postwords[j]
                        .toLowerCase()
                        .replace(/^[\]\}\)>~_\-\+\*«%…“’”‘"'`,;:.!?\(\)]+|[»~\*…“’”‘"'`,;:.!?\(\)]+$/g, '')
                        .replace(/^\s*(\S*(\s+\S+)*)\s*$/g, "$1");
                    if (word.length < 2 ||
                        skipwords[word] ||
                        word.match(/(^[a-z]+:\/\/)|(^[^a-z]+$)/i)) {
                        continue;
                    }
                    if (wordcount[word]) {
                        wordcount[word] += 1;
                    }
                    else {
                        wordcount[word] = 1;
                    }
                }
            }
        }
        return wordcount;
    },
    cytube: async function (id, skipwords) {
        try {
            if (fileLoaded) {
                let from = document.getElementById('ts-from');
                let to = document.getElementById('ts-to');
                let div = document.createElement('div');
                let wordcount = {};
                let json = window.jasone = JSON.parse(loadedFileText);
                if (isNaN(parseInt(from.value))) {
                    let val = json.eventsLog[0].time;
                    from.value = val;
                    from = val;
                }
                else from = parseInt(from.value);
                if (isNaN(parseInt(to.value))) {
                    let val = json.eventsLog[json.eventsLog.length - 1].time;
                    to.value = val;
                    to = val;
                }
                else to = parseInt(to.value);
                if (from > to) [from, to] = [to, from];
                let msgs = json.eventsLog.filter(e => e.type === 'chatMsg' && e.time >= from && e.time <= to).map(e => e.data[0].msg);
                if (document.getElementById('filter-emotes').checked && msgs.length) {
                    let emoteListEvents = json.eventsLog.map((e, i) => [e.time < to && e.type === 'emoteList', i, e.time]).filter(([e, i, time]) => e);
                    if (emoteListEvents.length) {
                        let currIdx;
                        if (emoteListEvents[0][2] > from) {
                            currIdx = json.eventsLog.findIndex(e => e.time >= from);
                        }
                        else {
                            currIdx = emoteListEvents.reverse().find(([e, i, time]) => time <= from)[1];
                        }
                        const regexify = (emote) => {
                            emote.regex = new RegExp(emote.source, 'gi');
                            emote.bad = (emote.name.match(/\s/) != null);
                            return emote;
                        };
                        let emotes = {};
                        let badEmotes = [];
                        const newMsgs = [];
                        //let emoteMap = {};
                        //window.emm = emoteMap;

                        let evsCount = json.eventsLog.slice(currIdx).findIndex((e, i, a) => (i + 1 === a.length || e.time >= to));
                        let currEvCount = 0;
                        while (currIdx < json.eventsLog.length && json.eventsLog[currIdx].time < to) {
                            let event = json.eventsLog[currIdx];
                            switch (event.type) {
                                case 'emoteList': {
                                    emotes = {};
                                    badEmotes = [];
                                    for (const emote of event.data[0]) {
                                        regexify(emote);
                                        emotes[emote.name] = emote;
                                        if (emote.bad) {
                                            badEmotes.push(emote);
                                        }
                                    }
                                }
                                    break;
                                case 'updateEmote': {
                                    const emote = event.data[0];
                                    const existingEmote = ((emote.name in emotes) ? emotes[emote.name] : null) || null;
                                    regexify(emote);
                                    if (existingEmote) {
                                        Object.assign(existingEmote, emote);
                                    } else {
                                        emotes[emote.name] = emote;
                                        if (emote.bad) {
                                            badEmotes.push(emote);
                                        }
                                    }
                                }
                                    break;
                                case 'renameEmote': {
                                    const emote = event.data[0];
                                    const oldName = emote.old;
                                    delete emote.old;
                                    const existingEmote = ((oldName in emotes) ? emotes[oldName] : null) || null;
                                    regexify(emote);
                                    if (existingEmote) {
                                        if (existingEmote.bad && !emote.bad) {
                                            const badIdx = badEmotes.indexOf(existingEmote);
                                            if (badIdx !== -1) {
                                                badEmotes.splice(badIdx, 1);
                                            }
                                        }
                                        delete emotes[oldName];
                                        emotes[emote.name] = existingEmote;
                                        if (!existingEmote.bad && emote.bad) {
                                            badEmotes.push(existingEmote);
                                        }
                                        Object.assign(existingEmote, emote);
                                    } else {
                                        emotes[emote.name] = emote;
                                        if (emote.bad) {
                                            badEmotes.push(emote);
                                        }
                                    }
                                }
                                    break;
                                case 'removeEmote': {
                                    const emote = event.data[0]
                                    const existingEmote = ((emote.name in emotes) ? emotes[emote.name] : null) || null;
                                    if (existingEmote) {
                                        delete emotes[emote.name];
                                        if (existingEmote.bad) {
                                            const badIdx = badEmotes.indexOf(existingEmote);
                                            if (badIdx !== -1) {
                                                badEmotes.splice(badIdx, 1);
                                            }
                                        }
                                    }
                                }
                                    break;
                                case 'chatMsg': {
                                    if (event.time > from && event.time < to) {
                                        let msg = event.data[0].msg;
                                        badEmotes.forEach(emote => {
                                            msg = msg.replaceAll(emote.regex, '');
                                        });
                                        msg = msg.replace(/[^\s]+/g, function (m) {
                                            const emote = emotes[m];
                                            if (!emote) {
                                                return m;
                                            }
                                            return '';
                                        });
                                        newMsgs.push(msg);
                                    }
                                }
                                    break;
                            }
                            if (currEvCount % 5000 === 0) {
                                await new Promise(r => setTimeout(r, 1));
                                console.log('Evs (', currEvCount + 1, '/', evsCount, ')');
                            }
                            currIdx++;
                            currEvCount++;
                        }
                        msgs = newMsgs;
                    } else {
                        //fallback to simple filter
                        msgs = msgs.map(msg => msg.replaceAll(/:[\w.]+:/g, ''));
                    }
                }
                msgs.forEach(msg => {
                    div.innerHTML = msg.replace(/(<\/?[^>]*>)/g, ' ');
                    let postwords = div.innerText.replace(/['’`]s\s/gi, ' ').split(' ');
                    for (var j = postwords.length - 1; j >= 0; j--) {
                        let word = postwords[j]
                            .toLowerCase()
                            .replace(/^[\]\}\)>~_\-\+\*«%…“’”‘"'`,;:.!?\(\)]+|[»~\*…“’”‘"'`,;:.!?\(\)]+$/g, '')
                            .replace(/^\s*(\S*(\s+\S+)*)\s*$/g, "$1");
                        if (word.length < 2 ||
                            skipwords[word] ||
                            word.match(/(^[a-z]+:\/\/)|(^[^a-z]+$)/i)) {
                            continue;
                        }
                        if (wordcount[word]) {
                            wordcount[word] += 1;
                        }
                        else {
                            wordcount[word] = 1;
                        }
                    }
                })
                return wordcount;
            }
        }
        catch (e) { console.log(e); }
    }
};
var changeSteps = {
    fourchan: function () {
        if (!rendering) {
            document.getElementById('words').value = "";
            document.getElementById('render').disabled = false;
        }
    },
    cytube: function () {
        if (!rendering) {
            document.getElementById('render').disabled = !fileLoaded;
        }
    }
};

function onFileChange() {
    var reader = new FileReader();
    reader.onload = function () {
        if (!rendering) {
            loadedFileText = reader.result;
            fileLoaded = true;
            document.getElementById('render').disabled = false;
        }
    };
    reader.readAsText(this.files[0]);
}

function showSteps() {
    var sel, tips = document.getElementsByClassName('steps');
    for (var i = tips.length - 1; i >= 0; i--) {
        tips[i].style.display = 'none';
    }
    sel = document.getElementById('datatype');
    document.getElementById('protip-' + sel.options[sel.selectedIndex].value)
        .style.display = 'block';
    changeSteps[sel.options[sel.selectedIndex].value]();
}

function hasColorPicker() {
    var el = document.createElement('input');
    el.type = 'color';
    return el.type === 'color';
}

function onColorChange() {
    var id = this.getAttribute('data-target');
    document.getElementById(id).value = this.value;
}

function initColorPickers() {
    var i, el, nodes;

    nodes = document.getElementsByClassName('clr');

    for (i = 0; el = nodes[i]; ++i) {
        el.value = document.getElementById(el.getAttribute('data-target')).value;
        el.addEventListener('change', onColorChange, false);
    }

    document.body.className = '';
}

window.onload = function () {
    var
        settningsElm = document.getElementById('settings'),
        progressElm = document.getElementById('progress'),
        renderBtn = document.getElementById('render'),
        cancelBtn = document.getElementById('cancel'),
        cloud = new Cloud(),
        dummy = document.createElement('canvas');

    if (!window.Worker) {
        settningsElm.innerHTML = "Your browser doesn't support Web Workers.";
        return;
    }
    if (!dummy.getContext) {
        settningsElm.innerHTML = "Your browser doesn't support Canvas.";
        return;
    }
    if (typeof dummy.getContext('2d').fillText != 'function') {
        settningsElm.innerHTML = "Your browser doesn't support Canvas Text.";
        return;
    }

    if (hasColorPicker()) {
        initColorPickers();
    }

    showSteps();

    document.getElementById('datatype').onchange = showSteps;
    document.getElementById('file').onchange = onFileChange;

    cancelBtn.onclick = function () {
        cloud.stop();
        progressElm.innerHTML = '';
        renderBtn.disabled = false;
        cancelBtn.disabled = true;
        rendering = false;
    };

    renderBtn.onclick = async function () {
        var datatype, wordcount, font, gt, opts, start, end;

        font = document.getElementById('font');
        font = font.options[font.selectedIndex].value;

        gt = document.getElementById('gradtype');
        gt = gt.options[gt.selectedIndex].value == 'random';

        opts = {
            fontfamily: font,
            canvaswidth: parseInt(document.getElementById('canvaswidth').value),
            canvasheight: parseInt(document.getElementById('canvasheight').value),
            bgcolor: document.getElementById('bgcolor').value,
            gradienthigh: document.getElementById('gradhigh').value,
            gradientlow: document.getElementById('gradlow').value,
            gradientrandom: gt,
            wordlimit: parseInt(document.getElementById('wordlimit').value),
            fontsizemax: parseInt(document.getElementById('fontsizemax').value),
            fontsizemin: parseInt(document.getElementById('fontsizemin').value),
            padding: parseInt(document.getElementById('padding').value),
            step: parseFloat(document.getElementById('step').value),
            ondone: function (placed) {
                end = (new Date()).getTime() - start;
                end = end / 1000;
                progressElm.innerHTML = 'Done, placed ' + placed + ' elements in '
                    + end + 's';
                renderBtn.disabled = false;
                cancelBtn.disabled = true;
                rendering = false;
            },
            progress: progressElm
        };

        if (opts.step < 0.01) {
            alert('Invalid value for "step", minimum is 0.01');
            return;
        }

        cancelBtn.disabled = false;
        this.disabled = true;
        rendering = true;

        datatype = document.getElementById('datatype');
        datatype = datatype.options[datatype.selectedIndex].value;
        wordcount = countWords[datatype]('words', skipwords);
        if (wordcount instanceof Promise) wordcount = await wordcount;
        start = (new Date()).getTime();
        cloud.generate('canvas', wordcount, opts);
    };
};