import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../database/mysqldb';
class TagEntity extends Model {
    public uuid!: string;
    public title!: string;
    public description!: string;
}

TagEntity.init(
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Tag',
    }
);
export default TagEntity;
