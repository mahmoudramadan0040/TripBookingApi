import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../database/connect'
class Transportion extends Model
{
  public id!: string
  public title!: string
  public Duration!: number
  public Description!: string
  public include?: string[] | null
  public exclude?: string[] | null
  public highlight?:String[] | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
Transportion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Duration: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    include:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    exclude:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    highlight:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'transportation',
    timestamps: true,
  },
)

export default Transportion
