export const getQueryParam = (
    href: string,
    name: string,
    defaultValue?: string,
): string | undefined => {
    let urlObj: URL;
    try {
        urlObj = new URL(href);
    } catch (error) {
        console.error("Invalid URL:", error);
        return defaultValue;
    }
    return urlObj.searchParams.get(name) || defaultValue;
};

export const replaceQueryParam = (href: string, name: string, value: string): string => {
    let urlObj: URL;
    try {
        urlObj = new URL(href);
    } catch (error) {
        console.error("Invalid URL:", error);
        return href;
    }
    urlObj.searchParams.set(name, value);
    return urlObj.toString();
};
