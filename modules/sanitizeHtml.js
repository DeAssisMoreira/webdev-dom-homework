export const deleteHtml = (value) => {
    return value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
