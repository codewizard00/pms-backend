import { Table, Column, Model } from 'sequelize-typescript';


@Table({ tableName: 'products',paranoid: true })
export class Product extends Model<Product> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  seller_id: string;

  @Column({ allowNull: false })
  name:string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  category :string;

  @Column({ allowNull: false })
  terms_and_conditions: string;

  @Column({ allowNull: false })
  product_brand :string;

  @Column({ allowNull: false })
  product_selling_price : number;

  @Column({ allowNull: false })
  product_mrp : number;

}