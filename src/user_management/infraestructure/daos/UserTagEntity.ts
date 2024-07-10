import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../database/mysqldb';
import UserEntity from './UserEntity';
import TagEntity from './TagEntity';

class UserTagEntity extends Model {
    public uuid!: string;
}

UserTagEntity.init(
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
    },
    {
        sequelize,
        modelName: 'user_tag',
        timestamps: false,
    },
);


UserEntity.belongsToMany(TagEntity, {
    through: 'user_tag', 
    foreignKey: 'user_uuid', 
    as: 'Tags'
});

TagEntity.belongsToMany(UserEntity, {
    through: 'user_tag',
    foreignKey: 'tag_uuid',
    as: 'Users'
});

export default UserTagEntity;
