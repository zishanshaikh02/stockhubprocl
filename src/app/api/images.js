import config from "../config"
export default async function getHomeImages() {

   
    // const response = await fetch('http://127.0.0.1:8000/images/api/images/?search_keyword=is_home_only', { cache: 'no-cache' })
    const response = await fetch(`${config.apiUrl}images/api/images-home/?search_keyword=is_home_only`, { cache: 'no-cache' })

    if (!response.ok) {
        throw new Error('failed to fetch user')
    }

    return response.json()

}
