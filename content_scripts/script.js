
(function() {
//https://www.sitepoint.com/hide-elements-in-css/ Learning material

if (window.hasRun) {
    return;
}
window.hasRun = true;
const jouyouKanjiClassName = "color1"
const jinmeiyouClassName = "color2"

//loop through each search_part

function hideKanjiV2(kanjiType,search_parts) {
    search_parts.forEach(searchPart=> {
        // let selectedKanji = searchPart.getElementsByClassName(kanjiType)

        let kanjiChildren = Array.from(searchPart.children)
            kanjiChildren.forEach(kanji => {
                if (kanji.firstChild.className === kanjiType) {
                    kanji.setAttribute("style","display:none")
                }
            })
        }
    )
    cleanupEmptyKanjiDivs(search_parts)
}



function displayAllKanji(search_parts) {
    search_parts.forEach( searchPart => {
        searchPart.parentElement.hidden=false
        let kanjiChildren = searchPart.children
        kanjiChildren = Array.from(kanjiChildren)

        kanjiChildren.forEach(kanji=> {
            kanji.setAttribute("style","display:flex")
        })
    })
    
}

function cleanupEmptyKanjiDivs(search_parts) {
    search_parts.forEach( search_part=> {
        let kanjiDiv = Array.from(search_part.children)
        const allKanjiAreHidden = kanjiDiv.filter(k=>k.getAttribute("style") !== "display:none").length === 0 ? true: false
        if (allKanjiAreHidden) {
            search_part.parentElement.hidden=true
        }
    })
}


browser.runtime.onMessage.addListener((message)=> {
    //get all element with class search_parts ... 0,1,2,....
    let search_parts = document.getElementsByClassName("search_parts")
    search_parts = Array.from(search_parts)
    if (message.command === "reset") {
        displayAllKanji(search_parts)
    }
    else if (message.command === "uncommon") {
        // hideNonColouredKanji(search_parts)
        hideKanjiV2("",search_parts)
    }
    else if (message.command === "jinmeiyou") {
        hideKanjiV2(jinmeiyouClassName,search_parts)
    }
    else if (message.command === "jouyou") {
        hideKanjiV2(jouyouKanjiClassName,search_parts)
    }
})

})();

