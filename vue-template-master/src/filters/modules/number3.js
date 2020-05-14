export default value => {
    if (!value) return ''
    value = value.toString()
    return value.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');
}