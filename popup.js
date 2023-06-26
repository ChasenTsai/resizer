window.addEventListener('DOMContentLoaded', () => {
    const qs = s => document.querySelector(s);
    const getList = () => {
        try {
            return JSON.parse(localStorage.getItem('custom_list') || '');
        } catch (error) {
            return [{ width: 1280, height: 720 }, { width: 1560, height: 720 }];
        }
    }

    const qInfo = { active: true, currentWindow: true };
    chrome.tabs.query(qInfo, ([{ width: tw, height: th }]) => {
        qs('.current').innerHTML = tw + ' x ' + th;
    });

    const list = getList();
    for (const one of list) {
        const node = document.createElement('label');
        node.classList.add('option');
        node.innerText = one.title || (one.width + ' x ' + one.height);
        node.onclick = () => {
            const wid = chrome.windows.WINDOW_ID_CURRENT;
            chrome.windows.get(wid, ({ width: ww, height: wh }) => {
                chrome.tabs.query(qInfo, ([{ width: tw, height: th }]) => {
                    chrome.windows.update(wid, {
                        width: one.width + ww - tw,
                        height: one.height + wh - th,
                        state: 'normal'
                    }, window.close);
                });
            });
        }
        qs('#list').appendChild(node);
    }
});
