export class ConfigDTO {
    key: string
    value: object[]
    constructor(key: string, value: object[]) {
        this.key = key
        this.value = value
    }
}