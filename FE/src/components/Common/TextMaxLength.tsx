type PropsType = {
    text: string;
    maxLength: number;
};

function TextMaxLength({ text, maxLength }: PropsType) {
    if (text.length <= maxLength) {
        return <>{text}</>;
    }

    const truncatedText = text.slice(0, maxLength) + '...';
    return <>{truncatedText}</>;
}

export default TextMaxLength;
