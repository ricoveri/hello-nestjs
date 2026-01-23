import { IsString } from "class-validator";

/*
 * DTO for creating Items
 * ------------------------
 * This will guarantee that data incoming into POST /items
 * will be normalized and type-safe via the validation pipeline
 * defined @ main.ts
*/
export class CreateItemDto {
    @IsString() // see: class-validator package
    readonly task: string;

    @IsString({ each: true }) // this will ensure every member of this array is actually a string
    readonly tags: string[];
}
