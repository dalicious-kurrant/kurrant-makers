function leftPad(value) {
    if (value >= 10) {
        return value;
    }
    return `0${value}`;
}

function transDateType(val) {
    if (!(val instanceof Date)) {
        return new Date(val);
    }
    return val;
}

export function formattedWeekDate(data, delimiter = '-') {
    const dateTime = transDateType(data);
    const year = dateTime.getFullYear();
    const month = leftPad(dateTime.getMonth() + 1);
    const day = leftPad(dateTime.getDate());
    return `${[year, month, day].join(delimiter)}`
}