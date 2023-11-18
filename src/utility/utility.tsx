// function to generate light or dark colors based on color scheme
//input determines wether output is dark or light shade

export function randomColorGen(lightOrDark: string): string {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * (100 + 1))
    let l: number
    lightOrDark === 'light'
        ? l = Math.floor((1 + Math.random()) * (100 / 2 + 1))
        : l = Math.floor(Math.random() * (100 / 2 + 1))
    return `hsl(${h}, ${s}%, ${l}%)`
}
