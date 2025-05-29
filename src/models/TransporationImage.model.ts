import { Model, DataTypes, Sequelize } from 'sequelize'
import sequelize from '../database/connect'
import Transportation from './Transportation.model'

// TransportationImage model
class TransportationImage extends Model {
  public id!: number
  public localImage!: string
  public cloudImage!: string
  public transportationId!: number
}

TransportationImage.init(
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
    transportationId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'transportation',
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

Transportation.hasMany(TransportationImage, {
  foreignKey: 'transportationId',
  as: 'images', // alias for eager loading
  onDelete: 'CASCADE', // optional, cascade deletes
})

TransportationImage.belongsTo(Transportation, {
  foreignKey: 'transportationId',
  as: 'transportation',
})
export default TransportationImage
