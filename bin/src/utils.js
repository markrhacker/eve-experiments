var uuid_1 = require("../vendor/uuid");
exports.uuid = uuid_1.v4;
exports.ENV = "browser";
try {
    window;
    window["utils"] = exports;
}
catch (err) {
    exports.ENV = "node";
}
exports.DEBUG = {};
if (exports.ENV === "browser")
    window["DEBUG"] = exports.DEBUG;
function builtinId(name) {
    return "AUTOGENERATED " + name + " THIS SHOULDN'T SHOW UP ANYWHERE";
}
exports.builtinId = builtinId;
exports.unpad = function (indent) {
    if (exports.unpad.memo[indent])
        return exports.unpad.memo[indent];
    return exports.unpad.memo[indent] = function (strings) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        if (!strings.length)
            return;
        var res = "";
        var ix = 0;
        for (var _a = 0; _a < strings.length; _a++) {
            var str = strings[_a];
            res += str + (values.length > ix ? values[ix++] : "");
        }
        if (res[0] === "\n")
            res = res.slice(1);
        var charIx = 0;
        while (true) {
            res = res.slice(0, charIx) + res.slice(charIx + indent);
            charIx = res.indexOf("\n", charIx) + 1;
            if (!charIx)
                break;
        }
        return res;
    };
};
exports.unpad.memo = {};
function repeat(str, length) {
    var len = length / str.length;
    var res = "";
    for (var ix = 0; ix < len; ix++)
        res += str;
    return (res.length > length) ? res.slice(0, length) : res;
}
exports.repeat = repeat;
function underline(startIx, length) {
    return repeat(" ", startIx) + "^" + repeat("~", length - 1);
}
exports.underline = underline;
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}
exports.capitalize = capitalize;
function titlecase(name) {
    return name.split(" ").map(capitalize).join(" ");
}
exports.titlecase = titlecase;
exports.string = {
    unpad: exports.unpad,
    repeat: repeat,
    underline: underline,
    capitalize: capitalize,
    titlecase: titlecase
};
function tail(arr) {
    return arr[arr.length - 1];
}
exports.tail = tail;
exports.array = {
    tail: tail
};
function coerceInput(input) {
    // http://jsperf.com/regex-vs-plus-coercion
    if (!isNaN(+input))
        return +input;
    else if (input === "true")
        return true;
    else if (input === "false")
        return false;
    return input;
}
exports.coerceInput = coerceInput;
// Shallow copy the given object.
function copy(obj) {
    if (!obj || typeof obj !== "object")
        return obj;
    if (obj instanceof Array)
        return obj.slice();
    var res = {};
    for (var key in obj)
        res[key] = obj[key];
    return res;
}
exports.copy = copy;
function mergeObject(root, obj) {
    for (var key in obj) {
        root[key] = obj[key];
    }
    return root;
}
exports.mergeObject = mergeObject;
function autoFocus(node, elem) {
    if (!node.focused) {
        node.focused = true;
        node.focus();
    }
}
exports.autoFocus = autoFocus;
exports.KEYS = {
    ESC: 27,
    ENTER: 13,
    UP: 38,
    DOWN: 40,
    BACKSPACE: 8,
    "]": 221,
};
// FROM: http://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity/3866442#3866442
function setEndOfContentEditable(contentEditableElement) {
    var range, selection;
    if (document.createRange) {
        range = document.createRange(); //Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
        range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection(); //get the selection object (allows you to change selection)
        selection.removeAllRanges(); //remove any selections already made
        selection.addRange(range); //make the range you have just created the visible selection
    }
}
exports.setEndOfContentEditable = setEndOfContentEditable;
// LCG courtesy of <https://gist.github.com/Protonk/5389384>
function srand(z) {
    var m = Math.pow(2, 24), a = 16598013, c = 12820163;
    return function () { return z = (a * z + c) % m / m; };
}
exports.srand = srand;
// Shuffle courtesy of <http://stackoverflow.com/a/6274381>
function shuffle(o, rand) {
    if (rand === void 0) { rand = Math.random; }
    for (var j, x, i = o.length; i; j = Math.floor(rand() * i), x = o[--i], o[i] = o[j], o[j] = x)
        ;
    return o;
}
exports.shuffle = shuffle;
function sortByField(field) {
    return function (a, b) {
        return (a[field] === b[field]) ? 0 :
            (a[field] > b[field]) ? -1 :
                (a[field] < b[field]) ? 1 :
                    (a[field] === undefined) ? 1 : -1;
    };
}
exports.sortByField = sortByField;
function sortByLookup(lookup) {
    return function (a, b) {
        return (lookup[a] === lookup[b]) ? 0 :
            (lookup[a] > lookup[b]) ? -1 :
                (lookup[a] < lookup[b]) ? 1 :
                    (lookup[a] === undefined) ? 1 : -1;
    };
}
exports.sortByLookup = sortByLookup;
//# sourceMappingURL=utils.js.map