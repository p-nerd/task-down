export const collect = <T>(items: T[]) => {
    return {
        index: (item: T): number | null => {
            const index = items.findIndex((i) => i === item);

            if (index === -1) {
                return null;
            }

            return index;
        },
        after: (item: T, callback?: (a: T, b: T) => boolean): T | null => {
            const index = items.findIndex((a) => (callback ? callback(a, item) : a === item));

            if (index === -1 || index === items.length - 1) {
                return null;
            }

            return items[index + 1];
        },
        before: (item: T, callback?: (a: T, b: T) => boolean): T | null => {
            const index = items.findIndex((a) => (callback ? callback(a, item) : a === item));

            if (index === -1 || index === 0) {
                return null;
            }

            return items[index - 1];
        },
    };
};
