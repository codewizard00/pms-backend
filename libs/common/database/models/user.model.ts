import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  username: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ 
    allowNull: false,
    type: DataType.ENUM('admin','user'),
    defaultValue: 'user',
   })
  role: string;

  @Column({ 
    allowNull: false,
    defaultValue: true
  })
  isActive: boolean;

  @Column({ 
    allowNull: false,
    defaultValue: false
  })
  isVerified: boolean;

}