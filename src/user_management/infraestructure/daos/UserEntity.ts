import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../database/mysqldb';

class UserEntity extends Model {
    public uuid!: string;
    public token!: string;
    public verifiedAt!: Date;
    public email!: string;
    public password!: string;
    public name!: string;
    public lastName!: string;
    public phoneNumber!: string;
    public birthday!: Date;
    public region!: string;
    public plan!: string;
    public role!: string;
    public latitude!: number;
    public longitude!: number;
    public description!: string;
    public company!: string;
    public isLogging!: boolean;
    public verified!: boolean;
    public url_image!: string;
}

UserEntity.init(
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        verifiedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        region: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        plan: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isLogging: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        url_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default UserEntity;
