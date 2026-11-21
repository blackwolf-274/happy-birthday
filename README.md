# Happy Birthday

An animated birthday wish: greeting, typed message, a few lines, balloons, a photo with a party hat, then a replay link.

## Run it
`customize.json` is loaded with `fetch`, so serve the folder instead of double-clicking the file:

    npm start            # or: python3 -m http.server

It also works on any static host such as GitHub Pages.

## Customise
Edit `customize.json`. Every text key matches a `data-node-name` in `index.html`.

`images` is a list of up to 5 photo paths (extra entries are ignored). While the wish is on screen the photos swap automatically every 2.6 seconds in a random order, and the same photo never shows twice in a row. With a single image nothing swaps. Put your photos in `img/` and replace the five placeholders.

The swap speed is `SHUFFLE_EVERY` at the top of `script/main.js`.

## License
MIT. This project is derived from an MIT-licensed open-source animation, see `LICENSE`.
# happy-birthday
# happy-birthday
