const ASSETS = {
    fruit: [
        '🥕', '🍇', '🍉', '🍌', '🥭', '🍍', '🥑', '🌽', '🥔', '🍒',
    ],
    emojis: ['😀', '😁', '😎', '😢', '😅', '😂', '🥵', '☹️', '🥳', '🥹'],
    vehicels: ['🚗', '🚕', '🚙', '🚌', '🚎', '🚓', '🚑', '🚒', '🚜', '🛺'],
    emojis2: ['😀', '😁', '🥳', '🥵'],
}

const themes = {
    light: 'light',
    dark: 'dark'
}

export default {
    grid: {
        rows: 4,
        columns: 4,
        gap: 10
    },
    boardStyle: {
        height: 700,
        width: 700,
    },
    timeLimit: 20,
    theme: themes.light,
    assets: ASSETS.emojis2,
}