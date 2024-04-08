import React, { useState } from 'react'
import foundationContext from './foundationContext';

const FoundationContextProvider = ({children}) => {
    const [foundation,setFoundation] = useState({});

    return(
        <foundationContext.Provider value = {{foundation,setFoundation}}>
            {children}
        </foundationContext.Provider> 
    )
}

export default FoundationContextProvider
