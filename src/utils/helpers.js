export const textCapitalize = (text, isAllText) => {
    if (text) {
        if (isAllText) {
            return text
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
        }

        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return text;
};

export const formatRupiah = (angka, prefix) => {
    if (angka) {
        var number_string = angka.toString().replace(/[^,\d]/g, '');
        var split = number_string.split(',');
        var sisa = split[0].length % 3;
        var rupiah = split[0].substr(0, sisa);
        var ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
    }
};

export const parseRupiah = (stringNumber) => {
    if (stringNumber) {
        var number = stringNumber.split('.').join('');
        return Number(number);
    }
};

export const calculatePMT = (rate, nper, pv) => {
    const monthlyRate = rate / 100 / 12;
    const denominator = 1 - Math.pow(1 + monthlyRate, -(nper * 12));
    const payment = pv * (monthlyRate / denominator);
    return -payment;
};

export const parsePhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
        return phoneNumber.replace('+62', '0').trim();
    }
};
