app.util = {};

app.util.isCorrectDateFormat = function (value) {

    const pattern01 = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
    const pattern02 = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;

    const isValidPattern = pattern01.test(value) || pattern02.test(value);

    if (isValidPattern === false) {
        return false;
    }

    // Is reasonable date

    const noDashes = value.replace(/-/g, '');

    const yearPart = noDashes.slice(0, 4);
    const monthPart = noDashes.slice(4, 6);
    const dayPart = noDashes.slice(6, 8);

    const dateObj = new Date(`${yearPart}-${monthPart}-${dayPart}`);

    return dateObj.getFullYear() === +yearPart &&
        (dateObj.getMonth() + 1) === +monthPart &&
        dateObj.getDate() === +dayPart;
}