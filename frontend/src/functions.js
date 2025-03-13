export const formatDate = (isoDateString, param) => {
    const date = new Date(isoDateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    switch(param){
        case "html":
            return `${year}-${month}-${day}`;
        default:
            return `${day}.${month}.${year}`;
    }
}