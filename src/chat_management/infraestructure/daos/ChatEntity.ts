import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../database/mysqldb';

class ChatEntity extends Model {
    public uuid!: string;
    public from_user_uuid!: string;
    public to_user_uuid!: string;
}

ChatEntity.init(
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        from_user_uuid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        to_user_uuid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Chat',
    }
);
export default ChatEntity;