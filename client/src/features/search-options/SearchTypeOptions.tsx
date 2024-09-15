interface ColorScheme {
    '--text': string;
    '--mainBackground': string;
    '--containertext': string;
    '--containerBackground': string;
    '--color1': string;
    '--color2': string;
    '--color3': string;
    '--overlay': string;
}

interface SearchType {
    type: string;
    isActive: Boolean,
    description: string;
    errorMsg: string;
    apiParam: string;
    colorScheme: ColorScheme;
}

interface TypeObj {
    searchTypeHandler: (typeInput: string) => void;
    searchTypes: SearchType[];
    currType: SearchType;
}

const searchTypeOptions: SearchType[] = [
    {
        type: 'Movie', isActive: false, description: 'Movies', errorMsg: 'movie', apiParam: "&type=movie", colorScheme: {
            '--text': '#f8f7ff', '--mainBackground': '#022B3A', '--containertext': '#022B3A', '--containerBackground': '#f8f7ff', '--color1': '#caf0f8', '--color2': '#d0f4de', '--color3': '#fdfcdc', '--overlay': 'rgba(248, 247, 255, .5)'
        }
    },
    {
        type: 'TV', isActive: false, description: 'TV Shows', errorMsg: 'tv show', apiParam: "&type=series", colorScheme: { '--text': '#284b63', '--mainBackground': '#cbc0d3', '--containertext': '#cbc0d3', '--containerBackground': '#284b63', '--color1': '#9a031e', '--color2': '#023e8a', '--color3': '#1b4332', '--overlay': 'rgba(40, 75, 99, .5)' },
    },

    {
        type: 'Both', isActive: true, description: 'Movies and TV Shows', errorMsg: 'movie or tv show', apiParam: "&type=", colorScheme: { '--text': '#022B3A', '--mainBackground': '#edf2f4', '--containertext': '#f7ede2', '--containerBackground': '#022B3A', '--color1': '#5e548e', '--color2': '#03045e', '--color3': '#1F7A8C', '--overlay': 'rgba(2, 43, 58, .5)' },
    },
]

export { searchTypeOptions };
export type { SearchType, TypeObj, ColorScheme };
