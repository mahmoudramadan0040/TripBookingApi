import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/connect'

class TransactionTour extends Model {
  public transactionId!: string
  public tourId!: string
  public quantity!: number
}

TransactionTour.init(
  {
    transactionId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    tourId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: 'transaction_tours',
    timestamps: false,
  },
)

export default TransactionTour
