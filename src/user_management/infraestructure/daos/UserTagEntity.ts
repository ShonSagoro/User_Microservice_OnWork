import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../database/mysqldb';
import User from './UserEntity';
import Tag from './TagEntity';

class UserTagEntity extends Model {
    public uuid!: string;
    public userId!: string;
    public tagId!: string;
}

UserTagEntity.init(
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'uuid',
            },
        },
        tagId: {
            type: DataTypes.UUID,
            references: {
                model: Tag,
                key: 'uuid',
            },
        },
    },
    {
        sequelize,
        modelName: 'UserTag',
    }
);

User.belongsToMany(Tag, { through: UserTagEntity });
Tag.belongsToMany(User, { through: UserTagEntity });

export default UserTagEntity;
