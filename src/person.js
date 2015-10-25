function Person (options) {
    if (options) {
        for (var prop in options) {
            if (options.hasOwnProperty(prop)) {
                this[prop] = options[prop];
            }
        }
    }
}