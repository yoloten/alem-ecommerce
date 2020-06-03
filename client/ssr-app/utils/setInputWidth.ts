export const setInputWidth = (windowWidth: number) => {
    if (windowWidth > 1800) {
        return 180
    }
    if (windowWidth > 1700) {
        return 170
    }
    if (windowWidth >= 1500) {
        return 140
    }
    if (windowWidth < 1500) {
        return 100
    }

    if (windowWidth < 1650) {
        return 140
    }

    return 100
}
