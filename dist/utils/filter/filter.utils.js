export const FilterUtils = (req) => {
    return {
        limit: Number(req.query.limit) || 10,
        page: Number(req.query.limit) || 1,
        search: String(req.query.search) || '',
        sorting: req.query.sorting === 'new' ? -1 : req.query.sorting === 'old' ? 1 : -1,
    };
};
