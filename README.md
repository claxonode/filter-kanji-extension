# Filter Kanji Firefox Extension

## What is it?
This a Firefox extension that makes navigating https://kanji.jitenon.jp/ more efficient. This is probably the best site to learn more Kanji, if you can read a Japanese-to-Japanese dictionary.
I completed this project in a week.

## What can this extension do?
- You can filter out Kanji that you want to see: Jouyou, Jinmeiyou, Uncommon
- You can also reset the kanji you want to see
- Default shortcut for popup is Ctrl+Alt+Q

## Limitations
- It does not truly filter out kanji, rather it is a bit of Node manipulation via the class attribute from the website
- This is due to Jouyou Kanji's ```<li>``` and Jinmeiyou Kanji's ```<li>``` having classes that represent different colors ```color1``` and ```color2``` respectively.

## Notes
- As for right now, I don't intend to host on addons.mozilla.org because it does not truly filter out kanji. Once I completed this feature, I might consider doing so.

## How to Install
1. Clone this repo, ```git clone https://github.com/claxonode/filter-kanji-extension/```
2. Go to ```about:debugging#/runtime/this-firefox``` on Firefox
3. Under the Temporary Extension section, click on ```Load Temporary Add-on...``` and select the manifest.json that you just cloned.
