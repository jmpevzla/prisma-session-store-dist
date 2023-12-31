interface IExpirationOptions {
    /**
     * The number of milliseconds to round the expiration date.
     * Mostly used for testing.
     */
    rounding?: 10 | 100 | 1000;
}
/**
 * Creates a `Date` object that is a certain number of milliseconds in the future.
 *
 * @param shelfLifeMs the number of milliseconds before the expiration date
 * @param options to modify the way this function behaves
 */
export declare const createExpiration: (shelfLifeMs: number, options: IExpirationOptions) => Date;
export {};
