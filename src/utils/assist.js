/**
 * 是否为规定数组的元素
 * @param value
 * @param validList
 * @returns {boolean}
 */
export function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

/**
 * 判断是否为数组子集
 * @param [Array] ary
 * @param validList
 */
export function partOfArray(ary, validList){
    if (!(ary instanceof Array) || !(validList instanceof Array)) {
        throw new Error("Type Error: ary or validList is not an Array")
    }else if(validList.length<ary.length){
        return false
    }

    for(let i=0; i< ary.length; i++){
        if(!validList.includes(ary[i])){
            return false
        }
    }

    return true;
}

// deepCopy
function deepCopy(data) {
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if ( t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if ( t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}

export {deepCopy};

function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]'  : 'boolean',
        '[object Number]'   : 'number',
        '[object String]'   : 'string',
        '[object Function]' : 'function',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object RegExp]'   : 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null',
        '[object Object]'   : 'object'
    };
    return map[toString.call(obj)];
}

