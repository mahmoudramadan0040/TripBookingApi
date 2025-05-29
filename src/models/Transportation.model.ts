import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../database/connect'

class Transportation extends Model {
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
  public IsDeleted!: boolean | null
  public destination!:string|null
  public source!:string|null
  public TypeOfTransportation!: 'Bus' | 'Train' | 'Flight' | 'Boat'
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
Transportation.init(
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
    source: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destination:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    TypeOfTransportation:{
      type: DataTypes.ENUM('Bus', 'Train', 'Flight', 'Boat'),
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'transportation',
    timestamps: true,
  },
)

export default Transportation
