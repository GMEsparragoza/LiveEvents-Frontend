import { useEffect } from 'react'

export const useSEO = ({ title }) => {
    useEffect(() => {
        document.title = `${title} | Live Events`;
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute('content', 'Find the best events in the world. Music, sports, conferences, and more');
    }, [title]);
}
