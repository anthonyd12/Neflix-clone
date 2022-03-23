const API_KEY = '38c007f28d5b66f36b9c3cf8d8452a4b';
const API_BASE = 'https://api.themoviedb.org/3';

/*
- originais netflix
- recomendados (tranding)
- em alta (top rated)
- action movies
- comedy
- horror
- romance
- documentarios
*/

const basicFetch = async (endpoint) =>{
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async ()=>{
        return [
            {
                slug: 'originals',
                title: 'Originals of Netflix',
                itens: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Trending',
                title: 'Recomend to you',
                itens: await basicFetch(`/trending/all/week?language=ptBR&api_key=${API_KEY}`)
            },
            {
                slug: 'Top Rated',
                title: 'Films of Moment',
                itens: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Action',
                title: 'Action',
                itens: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Comedy',
                title: 'Comedy',
                itens: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Horror',
                title: 'Horror',
                itens: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'Romance',
                title: 'Romance',
                itens: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'Documentary',
                title: 'Documentary',
                itens: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ]
    }
}