import config from "../config"
export default async function getVideoImages(id) {

    const response = await fetch(`${config.apiUrl}images/api/video-cat/?search_keyword=${id}`, { cache: 'no-cache' })
    


    if (!response.ok) {
        throw new Error('failed to fetch user')
    }

    return response.json()

}