import React, {useContext} from 'react'
import LoadingBar from 'react-top-loading-bar'
import { ContextName } from '../Context/Context'

function TopLoadingBar() {
    const ContextItems = useContext(ContextName)
    return (
        <LoadingBar
            color='#FF5F00'
            progress={ContextItems.progress}
            height={4}
        />
    )
}

export default TopLoadingBar