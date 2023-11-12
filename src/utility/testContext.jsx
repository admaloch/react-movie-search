

export default function testContext (contextInput) {
    const context = contextInput
    if (context === undefined) {
        throw Error(
            "Context is undefined"
        )
    }
    return context
}