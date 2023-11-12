import React, { useContext, useEffect, useState } from "react"
import { TypeObj, searchTypeOptions } from "./SearchTypeOptions"
import TypeProviderContextProps from "../../models/TypeProviderContextProps"

export const TypeContext = React.createContext<TypeObj | null>(null)

export function TypeProvider({ children }: TypeProviderContextProps): JSX.Element {
    const [searchTypes, setSearchType] = useState(searchTypeOptions)
    const [currType, setCurrType] = useState(searchTypeOptions[0])
    
    function searchTypeHandler(typeInput: string | null): void {
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

    return (
        <TypeContext.Provider value={{ searchTypes, searchTypeHandler, currType }}>
            {children}
        </TypeContext.Provider>
    )   
}

export const useTypeContext = () => {
    const typeContext = React.useContext(TypeContext)
    if (!typeContext) throw new Error("You need to use this context inside the provider")
    return typeContext
}