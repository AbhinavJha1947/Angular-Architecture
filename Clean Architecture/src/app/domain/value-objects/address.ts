export class Address {
    constructor(
        public readonly street: string,
        public readonly city: string,
        public readonly zipCode: string,
        public readonly country: string
    ) { }

    toString(): string {
        return `${this.street}, ${this.city}, ${this.zipCode}, ${this.country}`;
    }
}
