import { IsString } from "class-validator";

export class CreateItemDto {
    @IsString()
    readonly task: string;

    @IsString({ each: true })
    readonly tags: string[];
}
