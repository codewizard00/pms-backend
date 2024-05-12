import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'product_image' })
export class ProductImage extends Model<ProductImage> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  product_id: string;

  @Column({ allowNull: false })
  image_path:string;

}