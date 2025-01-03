const convertCamelToTitleCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1")

    return result.charAt(0).toUpperCase() + result.slice(1)
}

export default convertCamelToTitleCase
