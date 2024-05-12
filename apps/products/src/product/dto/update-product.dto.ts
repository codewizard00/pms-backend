import { IsArray, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class UpdateProductDto {
        @IsString()
        @IsOptional()
        name?: string
     
        @IsString()
        @IsOptional()
        description?: string
    
        @IsNumber()
        @IsOptional()
        @IsPositive()
        product_selling_price: number

        @IsNumber()
        @IsOptional()
        @IsPositive()
        product_mrp: number

        @IsString()
        @IsOptional()
        terms_and_conditions?: string

        @IsString()
        @IsOptional()
        product_brand?: string

        @IsString()
        @IsOptional()
        category?: string

        @IsArray()
        @IsOptional()
        product_images?: string[]
}