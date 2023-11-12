import React, { useContext, useEffect, useState } from "react"
import { SearchType, TypeObj, searchTypeOptions } from "./SearchTypeOptions"
import TypeProviderContextProps from "../../models/TypeProviderContextProps"
// import testContext from '../../utility/testContext'
import { TypeUpdater } from "./SearchTypeOptions"

const TypeContext = React.createContext(searchTypeOptions)
const TypeUpdateContext = React.createContext<TypeUpdater | null>(null)
const TypeCurrentContext = React.createContext(searchTypeOptions[0])


function testContext(contextInput) {
    const context = contextInput
    console.log(context)
    if (context === undefined) {
        throw Error(
            "Context is undefined"
        )
    }
    return context
}

const typeTheme = () => testContext(useContext(TypeContext))
const typeUpdateTheme = () => testContext(useContext(TypeUpdateContext))
const typeCurrentTheme = () => testContext(useContext(TypeCurrentContext))



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

    const ctxObj: TypeObj = {
        searchTypeHandler: searchTypeHandler,
        types: searchTypes,
        currType: currType,
    }

    return (
        <TypeContext.Provider value={searchTypes}>
            <TypeUpdateContext.Provider value={searchTypeHandler}>
                <TypeCurrentContext.Provider value={currType}>
                    {children}
                </TypeCurrentContext.Provider>
            </TypeUpdateContext.Provider>
        </TypeContext.Provider>
    )
}

export { typeCurrentTheme, typeTheme, typeUpdateTheme }