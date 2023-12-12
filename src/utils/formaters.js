export const textDotsFormat = (text, maxLength) => {
    if (text) {
        const textLength = text.length;

        if (textLength > maxLength) {
            return text.substring(0, maxLength) + '...';
        }

        return text;
    }
};

export const textCapitalizeFormat = (text, isAll) => {
    if (text) {
        if (isAll) {
            return text
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        } else {
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
    }
};

export const formatPrice = (price) => {
    if (price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
};

export const dateFormater = (date, withTime = false) => {
    if (date) {
        const formated = new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: withTime ? 'numeric' : undefined,
            minute: withTime ? 'numeric' : undefined,
            second: withTime ? 'numeric' : undefined,
        });

        return formated;
    }
};
