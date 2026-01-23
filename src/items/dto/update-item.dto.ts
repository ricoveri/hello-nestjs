import { CreateItemDto } from "./create-item.dto";
import { PartialType } from "@nestjs/mapped-types";


/*
 * DTO for updating Items
 * ------------------------
 * This will guarantee that data incoming into PATCH /items
 * will be normalized and type-safe via the validation pipeline
 * defined @ main.ts
*/
// inherits CreateItemDto with all of its properties set to optional
// see: @nestjs/mapped-types
export class UpdateItemDto extends PartialType(CreateItemDto) { }
