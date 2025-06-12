import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../database/connect'
import UserAttributes from '../interfaces/user.interface'
import bcrypt from 'bcrypt'
import Transaction from './Transaction.model'

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'isVerified' | 'verificationCode'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string
  public email!: string
  public password!: string
  public username!: string
  public isVerified!: boolean
  public verificationCode?: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // ✅ Define the instance method
  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }
}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10)
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10)
        }
      },
    },
  },
)

Transaction.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Transaction, { foreignKey: 'userId' })

export default User
