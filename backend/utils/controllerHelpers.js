const checkDuplicate = async (field, value, excludeId) => {
    const query = {};
    query[field] = value;
    const duplicate = await User.findOne(query).lean().exec();
    if (duplicate && !excludeId || duplicate && excludeId && duplicate._id.toString() !== excludeId) {
        return true;
    }
    return false;
};

module.exports = checkDuplicate