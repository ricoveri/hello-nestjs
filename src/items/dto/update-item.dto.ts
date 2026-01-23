import { CreateItemDto } from "./create-item.dto";
import { PartialType } from "@nestjs/mapped-types";


// inherits CreateItemDto with all of its properties set to optional
export class UpdateItemDto extends PartialType(CreateItemDto) { }
