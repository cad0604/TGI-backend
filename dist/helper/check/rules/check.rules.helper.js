export const CheckRulesHelper = async (req, res, next) => {
    try {
        const {} = res.locals.user.permissions;
    }
    catch (e) {
        next(e);
    }
};
