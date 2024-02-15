
//if not button on popup ignore
//if button is uncommon then, execute that
//if button is jouyou, execute that
//if button is jinmeiyou, execute that
//if button is reset then reset,
function listenForClicks() {
    document.addEventListener("click",(e)=>{
    
        function reportError(error) {
            console.error(`Could not execute scripts. Error ${error}`)
        }
        function displayAllKanji(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "reset"
            })
        }
        function hideKanji(tabs) {
            const buttonId = e.target.id
            browser.tabs.sendMessage(tabs[0].id, {
                command: buttonId
            })
        }
        if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
            return;
        }
        if (e.target.id === "reset") {
            browser.tabs.query({active:true,currentWindow:true})
            .then(displayAllKanji)
            .catch(reportError)
        }
        else {
            browser.tabs.query({active:true,currentWindow:true})
            .then(hideKanji)
            .catch(reportError)
        }

    });
}


//Won't work on addons.mozilla.org for e.g.
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden")
    document.querySelector("#error-content").classList.remove("hidden")
    console.error(`Failed to execute filter content kanji script: ${error.message}`)
}

async function initialiseScripts() {
    try {
        const urlMatches = await browser.tabs.query({currentWindow:true,active:true,url:"*://*.jitenon.jp/cat/*"})
        if (urlMatches.length !== 1) {
            throw new Error("Url did not match")
        }
        browser.tabs.executeScript({file:"/content_scripts/script.js"})
        listenForClicks()
    }
    catch (err) {
        reportExecuteScriptError(err)
    }
    
}

initialiseScripts()