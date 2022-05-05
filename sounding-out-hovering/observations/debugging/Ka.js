Ka = function (a, b) {
    a = a.split('.');
    b = b || u;
    for (var c = 0; c < a.length; c++) {
        if (b = b[a[c]], null == b) {
            return null;
        }
    }
    return b
}