export const SITE = {
    title: '漫威影业时间线',
    description: '',
    defaultLanguage: 'zh-CN',
}

export const OPEN_GRAPH = {
    image: {
        src: 'https://marvelorder.com/og-image.png',
        alt: '漫威影业时间线',
    },
    twitter: 'thatguysam',
}

export const KNOWN_LANGUAGES = {
    English: 'en',
}

// Uncomment this to add an "Edit this page" button to every page of documentation.
export const GITHUB_EDIT_URL = 'https://github.com/nicognaw/marvelorder-zh-CN/blob/main-zh-CN/'

// Uncomment this to add an "Join our Community" button to every page of documentation.
// export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   appId: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// }

export const SIDEBAR = {
    en: [],
    zh: [],
}

export const storePath = './src/json'

export const markdownStorePath = './src/pages'

export const listingsGlobPattern = 'src/pages/zh/*.md'

export const storiesGlobPattern = 'src/pages/stories/*.md'

export const avengersBackdrop = '/.netlify/functions/tmdb-image/nNmJRkg8wWnRmzQDe2FwKbPIsJV.webp?transparent=0&width=2200'

export const TMDB_COMPANIES = [
    {
        // https://www.themoviedb.org/company/420/movie
        name: 'Marvel Studios',
        id: '420',
    },
    {
        // https://www.themoviedb.org/company/19551-marvel-enterprises/movie
        name: 'Marvel Enterprises',
        id: '19551',
    },
    {
        // https://www.themoviedb.org/company/7505/movie
        name: 'Marvel Entertainment',
        id: '7505',
    },
    {
        // https://www.themoviedb.org/company/38679-marvel-television/tv
        name: 'Marvel Television',
        id: '38679',
    },
    {
        // https://www.themoviedb.org/company/11106-marvel-knights/movie
        name: 'Marvel Knights',
        id: '11106',
    },
]

export const TMDB_LISTS = [
    {
        // https://www.themoviedb.org/list/8204859
        name: 'Main',
        id: '8204859',
        tags: [],
    },
    {
        // https://www.themoviedb.org/list/8204862
        name: 'Classic Marvel Movies',
        id: '8204862',
        tags: ['classic'],
    },
    {
        // https://www.themoviedb.org/list/8204860
        name: 'X-Men Movies',
        id: '8204860',
        tags: ['x-men'],
    },
]

// Has to be different from lists
// since it uses 'items' and this uses 'parts'
export const TMDB_COLLECTTIONS = [
    {
        // https://www.themoviedb.org/movie/36657-x-men
        name: 'X-Men',
        id: '36657',
        tags: ['x-men'],
    },
]
