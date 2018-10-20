const flatpickrFormatMapping = {
    d: 'DD',
    D: 'ddd',
    l: 'dddd',
    j: 'D',
    J: 'Do',
    w: 'e',
    F: 'MMMM',
    m: 'MM',
    n: 'M',
    M: 'MMM',
    U: 'X',
    y: 'YY',
    Y: 'YYYY',
    Z: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
    H: 'HH',
    h: 'H',
    i: 'mm',
    S: 'ss',
    s: 's',
    K: 'A'
}

const momentFormatMapping = {
    dddd: 'l',
    ddd:  'D',
    DD:   'd',
    Do:   'J',
    D:    'j',
    e:    'w',
    MMMM: 'F',
    MMM:  'M',
    MM:   'm',
    M:    'n',
    X:    'U',
    YYYY: 'Y',
    YY:   'y',
    HH:   'H',
    H:    'h',
    mm:   'i',
    ss:   'S',
    s:    's',
    A:    'K'
}

const delimiters = ['.', '-', '/', ':', ' ']

export default class DateTimeFormatConverter {
    static convertFormat(mapping, string) {
        let format = ''

        Object.keys(mapping).forEach(f => {
            const match = string.match(f)

            if (match) {
                format += mapping[f]

                // remove the just parsed format
                string = string.slice(f.length)

                // add the delimiter which is usually the next character
                // if there's anything of the string still left
                if (string.length && delimiters.indexOf(string.slice(0, 1)) > -1) {
                    format += string.slice(0, 1)
                    string = string.slice(1)
                }
            }
        })

        return format
    }

    /**
     * Converts a Moment.js datetime format to a Flatpickr format
     *
     * @param string
     * @returns {string}
     */
    static momentToFlatpickr(string) {
        if (string) {
            return this.convertFormat(momentFormatMapping, string)
        } else {
            throw "Empty input string provided!"
        }
    }

    /**
     * Converts a Flatpickr datetime format to a Moment.js format
     *
     * @param string
     * @returns {string}
     */
    static flatpickrToMoment(string) {
        if (string) {
            return this.convertFormat(flatpickrFormatMapping, string)
        } else {
            throw "Empty input string provided!"
        }
    }
}