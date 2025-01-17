export function isEmpty(value: any) {
    return value === undefined || value === null || value === ''
}

export function isAnyEmpty(...values: any[]) {
    return values.some(isEmpty)
}
