import React, { useContext, useEffect, useState } from "react"
import { SearchType, TypeObj, searchTypeOptions } from "./SearchTypeOptions"
import TypeProviderContextProps from "../../models/TypeProviderContextProps"

const TypeContext = React.createContext<null | TypeObj>(null)

export function typeTheme() {
    return useContext(TypeContext)
}

export function TypeProvider({ children }:TypeProviderContextProps): JSX.Element {
    const [searchTypes, setSearchType] = useState(searchTypeOptions)
    const [currType, setCurrType] = useState(searchTypeOptions[0])

    function searchTypeHandler (typeInput: string): void  {
        setSearchType((oldType) => {
            return oldType.map((item) => {
                if (item.type === typeInput) {
                    return ({ ...item, isActive: true })
                } else {
                    return ({ ...item, isActive: false })
                }
            })
        })
    }

    useEffect(
        function currType(): void {
            setCurrType(searchTypes.filter(item => item.isActive === true)[0])
        },
        [searchTypes]
    )

    const ctxObj: TypeObj = {
        searchTypeHandler: searchTypeHandler,
        types: searchTypes,
        currType: currType,
    }

    return (
        <TypeContext.Provider value={ctxObj}>
            {children}
        </TypeContext.Provider>
    )
}