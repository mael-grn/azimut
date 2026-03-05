// typescript
import {InsertableUser} from "@/app/models/User";
import {InvalidFieldsError} from "@/app/errors/InvalidFieldsError";

export type ValidationResult = { valid: boolean; errors: string[] };

export class FieldsUtil {
    public static isNonEmptyString(v: unknown) {
        return typeof v === "string" && v.trim().length > 0;
    }

    public static isInteger(v: unknown) {
        return typeof v === "number" && Number.isInteger(v);
    }

    public static isHexColor(v: unknown) {
        if (typeof v !== "string") return false;
        // accepts #RRGGBB or #RGB
        const re = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
        return re.test(v);
    }

    public static isPositiveInteger(v: unknown) {
        return this.isInteger(v) && (v as number) > 0;
    }

    public static isValidEmail(email: string) {
        // simple regex but useful for basic validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        return re.test(email);
    }

    public static isValidDomain(domain: string) {
        // accepts "example.com" or "sub.example.co"
        const re = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
        return re.test(domain);
    }

    public static isValidUrl(url: string) {
        try {
            // accepts http(s) and valid data
            const u = new URL(url);
            return u.protocol === "http:" || u.protocol === "https:";
        } catch {
            return false;
        }
    }


    public static checkUser(user: InsertableUser): ValidationResult {
        const errors: string[] = [];
        if (!user) {
            return {valid: false, errors: ["user is required"]};
        }

        if (!this.isNonEmptyString(user.email)) {
            errors.push("email is required and must be a non-empty string");
        } else if (!this.isValidEmail(user.email)) {
            errors.push("email does not have a valid format");
        }

        if (!this.isNonEmptyString(user.first_name)) {
            errors.push("firstName is required and must be a non-empty string");
        }

        if (!this.isNonEmptyString(user.last_name)) {
            errors.push("lastName is required and must be a non-empty string");
        }

        if (!this.isNonEmptyString(user.password)) {
            errors.push("password is required and must be a non-empty string");
        } else if (user.password.length < 8) {
            errors.push("password must contain at least 8 characters");
        }

        return {valid: errors.length === 0, errors};
    }

    public static checkFieldsOrThrow<T>(validationFunction: (obj: T) => ValidationResult, obj: T) {
        // call the validation function with `FieldsUtil` as `this` to preserve access
        const validation = validationFunction.call(FieldsUtil, obj);
        if (!validation.valid) {
            throw new InvalidFieldsError();
        }
    }
}