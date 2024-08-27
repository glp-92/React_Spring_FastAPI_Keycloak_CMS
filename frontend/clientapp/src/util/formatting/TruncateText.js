export const TruncateText = (inputText, maxLength) => {
    if (inputText.length <= maxLength) return inputText;
    return inputText.substring(0, maxLength - 3) + '...';
};