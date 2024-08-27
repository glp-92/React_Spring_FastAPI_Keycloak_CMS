export const DateFormatToEs = (dateStr) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', options);
};

export const DateFormatToEsFull = (dateStr) => {
    const options = { minute: 'numeric', hour: 'numeric', day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', options);
};