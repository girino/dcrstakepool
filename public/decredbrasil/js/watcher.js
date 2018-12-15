var watchersByDomain = {};
var debug = console.log;

function newWatcher(domain, elementID) {
    if (watchersByDomain[domain]) {
        return;
    }

    watchersByDomain[domain] = {
        domain: domain,
        elementID: elementID,
        ws: null,
    };
}

function openWS(domain) {
    ws = new WebSocket(domain + "/watchWaitingList");
    ws.onopen = function (evt) {
        debug("WS Opened for", domain);
    }
    ws.onclose = function (evt) {
        debug("WS Closed for", domain);
        let w = watchersByDomain(domain);
        if (w) {
            w.ws = null;
        }
    }
    ws.onmessage = function (evt) {
        debug("WS Message for", domain, evt.data);
        var data = JSON.parse(evt.data)
        let w = watchersByDomain[domain];
        if (w) {
            updateSessions(data, w.elementID);
        }
    }
    ws.onerror = function (evt) {
        debug("WS Error for", domain, evt);
    }
    return ws;
};

function updateSessions(sessions, elementID) {
    var ul = document.getElementById(elementID)
    for (; ul.childNodes.length > 0;) {
        ul.removeChild(ul.childNodes[0]);
    }

    if (sessions.length === 0) {
        var spanNone = document.createElement("span")
        spanNone.className = "nosessions";
        spanNone.innerText = "(no sessions)";
        ul.appendChild(spanNone);
    }

    for (var i = 0; i < sessions.length; i++) {
        var sess = sessions[i];
        var li = document.createElement("li")
        var spanName = document.createElement("span")
        spanName.className = "name";
        spanName.innerText = sess.name.substring(0, 32) + ":";
        li.appendChild(spanName);

        var amountsTxts = [];
        var total = 0;
        for (var j = 0; j < sess.amounts.length; j++) {
            var amnt = sess.amounts[j] / 1e8;
            amountsTxts.push(amnt.toFixed(2) + " DCR");
            total += sess.amounts[j]
        }
        var spanAmounts = document.createElement("span")
        spanAmounts.className = "amounts";
        spanAmounts.innerText = "[" + amountsTxts.join(", ") + "]";
        li.appendChild(spanAmounts)

        var spanTotal = document.createElement("span")
        spanTotal.className = "total";
        spanTotal.innerText = "Total: " + (total / 1e8).toFixed(2) + " DCR";
        li.appendChild(spanTotal);

        ul.appendChild(li)
    }
}

function maintainWatchers() {
    Object.keys(watchersByDomain).forEach(domain => {
        let w = watchersByDomain[domain];
        if (w.ws != null) return;
        try {
            w.ws = openWS(domain);
        } catch (error) {}
    });
}

function initWatchers() {
    maintainWatchers();
    setInterval(maintainWatchers, 5000);
}
