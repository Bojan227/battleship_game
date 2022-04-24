const ship = (length) => {
    let newLength = length

    function hit() {
        newLength -= 1
    }

    function isSunk() {
        return newLength === 0
    }

    function getLength() {
        return newLength
    }

    return {
        length,
        getLength,
        hit,
        isSunk,
    }
}

export default ship
