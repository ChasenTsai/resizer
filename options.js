window.addEventListener('DOMContentLoaded', () => {
    const qs = s => document.querySelector(s);
    const getList = () => {
        try {
            return JSON.parse(localStorage.getItem('custom_list') || '');
        } catch (error) {
            return [{ width: 1280, height: 720 }, { width: 1560, height: 720 }];
        }
    }

    const showSetting = () => {
        const list = getList();
        let str = "";
        for (const one of list) {
            str += one.width + "|";
            str += one.height;
            if (one.title) str += "|" + one.title;
            str += "\n";
        }
        qs("#setting").value = str;
    }
    showSetting();
    let saving = false;
    qs("#save").onclick = () => {
        if (saving) return;
        saving = true;
        const list = [];
        let str = qs("#setting").value + "";
        let linearr = str.split("\n")
        for (const line of linearr) {
            if (!line.trim()) continue;
            let [w, h, t] = line.split("|").map(s => s.trim());
            w = Math.floor(Number(w));
            h = Math.floor(Number(h));
            if (w > 0 && h > 0) {
                let one = { width: w, height: h };
                if (t) one.title = t;
                list.push(one);
            }
        }
        localStorage.setItem('custom_list', JSON.stringify(list));
        showSetting();
        qs("#success").style.display = "inline";
        setTimeout(() => {
            qs("#success").style.display = "none";
            saving = false;
        }, 1000);
    }
});
