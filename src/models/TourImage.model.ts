import { Model, DataTypes, Sequelize } from 'sequelize'
import sequelize from '../database/connect'
import Tour from './Tour.model'

// TransportationImage model
class TourImage extends Model {
  public id!: number
  public localImage!: string
  public cloudImage!: string
  public transportationId!: number
}

TourImage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    localImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cloudImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TourId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tour',
        key: 'id',
      },
      onDelete: 'CASCADE', // delete images if transportation deleted
    },
  },
  {
    tableName: 'transportation_images',
    timestamps: true,
    sequelize,
  },
)

Tour.hasMany(TourImage, {
  foreignKey: 'TourId',
  as: 'images', // alias for eager loading
  onDelete: 'CASCADE', // optional, cascade deletes
})

TourImage.belongsTo(Tour, {
  foreignKey: 'TourId',
  as: 'transportation',
})
export default TourImage
