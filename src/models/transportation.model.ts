import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../database/connect'

class Transportion extends Model {
  public id!: string
  public title!: string
  public Duration!: number
  public Description!: string
  public included!: string[] | null
  public excluded!: string[] | null
  public highlight!: string[] | null
  public localImages!: string[] | null
  public cloudImages!: string[] | null
  public price!: string | null
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
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    included: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    excluded: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    highlight: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'transportation',
    timestamps: true,
  },
)

export default Transportion
