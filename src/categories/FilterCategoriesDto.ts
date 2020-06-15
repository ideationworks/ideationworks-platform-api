import { IsOptional } from "class-validator";

export class FilterCategoriesDto {
    @IsOptional()
    name: string
}