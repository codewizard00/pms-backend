import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'product_size' })
export class ProductSize extends Model<ProductSize> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  product_id: string;

  @Column({ allowNull: false })
  product_size : string;

  @Column({ allowNull: true })
  product_description : string;

  @Column({ allowNull: false })
  product_selling_price : number;

  @Column({allowNull: false})
  product_mrp : number

  @Column({ allowNull: false })
  product_stock : number;
  
  
}