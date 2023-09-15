// Formats the date as DD.MM.YYYY
export const dateFormat = (date: Date): string => {
    const formattedDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
    return formattedDate;
}