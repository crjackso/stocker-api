/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: EmailAddress;
    createdAt: DateTime;
}

export abstract class IQuery {
    abstract getUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export type EmailAddress = any;
export type DateTime = any;
type Nullable<T> = T | null;
