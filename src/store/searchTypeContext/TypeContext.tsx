import React, { useContext, useEffect, useState } from "react"
import { searchTypeOptions, SearchType, TypeObj } from "./SearchTypeOptions"

const TypeContext = React.createContext<null | TypeObj>(null)

export function typeTheme(): TypeObj {
    return useContext(TypeContext)
}

export function TypeProvider({ children }) {
    const [searchTypes, setSearchType] = useState<SearchType[]>(searchTypeOptions)
    const [currType, setCurrType] = useState<SearchType>(searchTypeOptions[0])

    const searchTypeHandler = (typeInput: string): SearchType => {
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
        function currType() {
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