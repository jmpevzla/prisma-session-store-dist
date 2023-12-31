import { SessionData, Store } from 'express-session';
import type { PartialDeep } from 'type-fest';
import type { IOptions, IPrisma, ISessions } from '../@types';
/**
 * An `express-session` store used in the `express-session` options
 * to hook up prisma as a session store
 *
 * @example
 * ```ts
 * const app = express();
 * const prisma = new PrismaClient();
 *
 * app.use(
 *   expressSession({
 *     secret: "Some Secret Value",
 *     resave: false,
 *     saveUninitialized: false,
 *     store: new PrismaSessionStore(prisma, {
 *       checkPeriod: 10 * 60 * 1000 // 10 minutes
 *     });
 *   })
 * );
 * ```
 */
export declare class PrismaSessionStore<M extends string = 'session'> extends Store {
    private readonly prisma;
    private readonly options;
    /**
     * Initialize PrismaSessionStore with the given `prisma` and (optional) `options`.
     *
     * @param prisma the prisma client that includes a `Sessions` model
     * @param options the options to alter how this store behaves
     *
     * @example
     * ```ts
     * const app = express();
     * const prisma = new PrismaClient();
     *
     * app.use(
     *   expressSession({
     *     secret: "Some Secret Value",
     *     resave: false,
     *     saveUninitialized: false,
     *     store: new PrismaSessionStore(prisma, {
     *       checkPeriod: 10 * 60 * 1000 // 10 minutes
     *     });
     *   })
     * );
     * ```
     */
    constructor(prisma: IPrisma<M>, options: IOptions<M>);
    private readonly isTouching;
    private readonly isSetting;
    /**
     * @description The currently active interval created with `startInterval()` and removed with `stopInterval()`
     */
    private checkInterval?;
    /**
     * @description A flag indicating to use the session ID as the Prisma Record ID
     *
     * Note: If undefined and dbRecordIdFunction is also undefined then a random
     * CUID will be used instead.
     */
    private readonly dbRecordIdIsSessionId;
    /**
     * @description whether or not the prisma connection has been tested to be invalid
     */
    private invalidConnection;
    /**
     * @description A object that handles logging to a given logger based on the logging level
     */
    private readonly logger;
    /**
     * @description Some serializer that will transform objects into strings
     * and vice versa
     */
    private readonly serializer;
    /**
     * @description The name of the sessions model
     *
     * Defaults to `session` if `sessionModelName` in options is undefined
     */
    private readonly sessionModelName;
    /**
     * Attempts to connect to Prisma, displaying a pretty error if the connection is not possible.
     */
    private connect;
    /**
     * @description A function to generate the Prisma Record ID for a given session ID
     *
     * Note: If undefined and dbRecordIdIsSessionId is also undefined then a random
     * CUID will be used instead.
     */
    private readonly dbRecordIdFunction;
    /**
     * Disables store, used when prisma cannot be connected to
     */
    private disable;
    /**
     * Returns if the connect is valid or not, logging an error if it is not.
     */
    private validateConnection;
    private isJson;
    /**
     * Fetch all sessions
     *
     * @param callback a callback providing all session data
     * or an error that occurred
     */
    readonly all: (callback?: ((err?: unknown, all?: ISessions | undefined) => void) | undefined) => Promise<void | ISessions>;
    /**
     * Delete all sessions from the store
     *
     * @param callback a callback notifying that all sessions
     * were deleted or that an error occurred
     */
    readonly clear: (callback?: ((err?: unknown) => void) | undefined) => Promise<void>;
    /**
     * Destroy the session(s) associated with the given `sid`(s).
     *
     * @param sid a single or multiple id(s) to remove data for
     * @param callback a callback notifying that the session(s) have
     * been destroyed or that an error occurred
     */
    readonly destroy: (sid: string | string[], callback?: ((err?: unknown) => void) | undefined) => Promise<void>;
    /**
     * Attempt to fetch session by the given `sid`.
     *
     * @param sid the sid to attempt to fetch
     * @param callback a function to call with the results
     */
    readonly get: (sid: string, callback?: ((err?: unknown, val?: SessionData | undefined) => void) | undefined) => Promise<void | SessionData>;
    /**
     * Fetch all sessions' ids
     *
     * @param callback a callback providing all session id
     * or an error that occurred
     */
    readonly ids: (callback?: ((err?: unknown, ids?: number[] | undefined) => void) | undefined) => Promise<void | string[]>;
    /**
     * Get the count of all sessions in the store
     *
     * @param callback a callback providing either the number of sessions
     * or an error that occurred
     */
    readonly length: (callback?: ((err: unknown, length: number) => void) | undefined) => Promise<number | void>;
    /**
     * Remove only expired entries from the store
     */
    readonly prune: () => Promise<void>;
    /**
     * Commit the given `session` object associated with the given `sid`.
     *
     * @param sid the ID to save the session data under
     * @param session the session data to save
     * @param callback a callback with the results of saving the data
     * or an error that occurred
     */
    readonly set: (sid: string, session: PartialDeep<SessionData>, callback?: ((err?: unknown) => void) | undefined) => Promise<void>;
    /**
     * A function to stop any ongoing intervals and disconnect from the `PrismaClient`
     */
    shutdown(): Promise<void>;
    /**
     * Start an interval to prune expired sessions
     */
    startInterval(onIntervalError?: (err: unknown) => void): void;
    /**
     * Stop checking if sessions have expired
     */
    stopInterval(): void;
    /**
     * Refresh the time-to-live for the session with the given `sid`.
     *
     * @param sid the id of the session to refresh
     * @param session the data of the session to resave
     * @param callback a callback notifying that the refresh was completed
     * or that an error occurred
     */
    readonly touch: (sid: string, session: PartialDeep<SessionData>, callback?: ((err?: unknown) => void) | undefined) => Promise<void>;
}
