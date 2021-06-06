import { useStore } from 'hooks'
import React from 'react'

type Props = {}

const Favorites: React.FC<Props> = () => {
    const {bookmarks} = useStore()
    return (
        <>
            
        </>
    )
}

export default Favorites
