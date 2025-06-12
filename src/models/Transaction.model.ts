import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/connect';

interface TransactionAttributes {
  id: string;
  orderId: string;
  paymentId: string;
  status: string;
  amount: number;
  currency: string;
  payerEmail: string;
  payerName: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type TransactionCreationAttributes = Optional<TransactionAttributes, 'id'>;

class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: string;
  public orderId!: string;
  public paymentId!: string;
  public status!: string;
  public amount!: number;
  public currency!: string;
  public payerEmail!: string;
  public payerName!: string;
  public userId?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    payerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'transactions',
    timestamps: true,
  }
);

export default Transaction;
