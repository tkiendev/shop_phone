module.exports = (query) => {
    const keyword = query;
    if (keyword) {
        const regex = new RegExp(keyword, 'i');
        return regex;
    }
    return null;
};
