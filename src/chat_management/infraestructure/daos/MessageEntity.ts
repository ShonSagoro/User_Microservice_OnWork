import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../database/mysqldb';

class MessageEntity extends Model {
    public uuid!: string;
    public message!: string;
    public chat_uuid!: string;
    public user_owner_uuid!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

MessageEntity.init(
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        chat_uuid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        user_owner_uuid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Message',
    }
);

export default MessageEntity;
