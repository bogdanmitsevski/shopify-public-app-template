import sequelize from '../../db/connection.js';

import { DataTypes } from 'sequelize';

const shops = sequelize.define('shops', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING, unique: true, allowNull: false },
    key: { type: DataTypes.STRING, allowNull: false },
    tax: { type: DataTypes.FLOAT, allowNull: false},
    status: { type: DataTypes.BOOLEAN, default: false },
    startedAt: { type: DataTypes.DATE },
    finishedAt: { type: DataTypes.DATE }
});

const variants = sequelize.define('variants', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    variantId: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    startedAt: { type: DataTypes.DATE },
    finishedAt: { type: DataTypes.DATE }
});

const sessions = sequelize.define('sessions', {
    _id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id: { type: DataTypes.TEXT, allowNull: false},
    content: { type: DataTypes.TEXT, allowNull: false},
    shop: { type: DataTypes.TEXT, allowNull: false}
});

const stores = sequelize.define('stores', {
    shop: {type: DataTypes.TEXT, allowNull: false, unique: true},
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, default: false }
})

export { shops, variants, sessions, stores }