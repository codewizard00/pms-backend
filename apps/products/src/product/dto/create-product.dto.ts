import { IsArray, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class CreateProductDto {
        @IsString()
        name: string

        @IsString()
        description: string

        @IsNumber()
        @IsPositive()
        product_selling_price: number

        @IsNumber()
        @IsPositive()
        product_mrp: number

        @IsString()
        terms_and_conditions: string

        @IsString()
        product_brand: string

        @IsString()
        category: string

        @IsArray()
        @IsOptional()
        product_images: string[]
}