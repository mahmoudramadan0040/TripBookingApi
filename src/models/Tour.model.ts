import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../database/connect'
import TransportationImage from './TransporationImage.model'
class Tour extends Model {
  public id!: string
  public title!: string
  public Duration!: number | null
  public Description!: string
  public included!: string[] | null
  public excluded!: string[] | null
  public highlight!: string[] | null
  public price!: number | null
  public locations!: string[] | null
  public IsDeleted!: boolean | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Tour.init(
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
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    offer: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Description: {
      type: DataTypes.TEXT('medium'),
      allowNull: true,
    },
    FullDescription: {
      type: DataTypes.TEXT('medium'),
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
    locations: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    ActitvityDetails: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    Governorate: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: [
        'Cairo',
        'Luxor',
        'Giza',
        'Aswan',
        'Alexandria',
        'Sharm El Sheikh',
        'Hurghada',
        'Dahab',
        'Sohag',
      ],
    },
    category: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ['Favorit', 'Popular', 'Special'],
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    IsFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'tour',
    timestamps: true,
  },
)
export default Tour
