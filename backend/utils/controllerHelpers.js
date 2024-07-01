 const genDupErrMsg = (duplicateUser, duplicateEmail) => {
    let duplicateErrMsg;
    if (duplicateEmail && duplicateUser) duplicateErrMsg = 'Duplicate username and email';
    else if (duplicateEmail) duplicateErrMsg = 'Duplicate email';
    else duplicateErrMsg = 'Duplicate username';
    return duplicateErrMsg;
};

module.exports = genDupErrMsg