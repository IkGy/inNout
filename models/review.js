// 리뷰

const Sequelize = require("sequelize");

// review_id || user_id || lodging_id || rating || content

class Review extends Sequelize.Model {
  static initiate(sequelize) {
    Review.init({
      review_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        comment: "리뷰(review) 식별자 ID (기본키)",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "사용자(user) 식별자 ID",
      },
      lodging_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "숙박시설(lodging) 식별자 ID",
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "평점",
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [1, 1000],
            msg: "내용은 1자 이상 1000자 이하로 작성하여야 합니다."
          }
        },
        comment: "리뷰 내용",
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Review',
      tableName: 'reviews',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Review.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'user_id' });
    db.Review.belongsTo(db.Lodging, { foreignKey: 'lodging_id', targetKey: 'lodging_id' });
  }

};

module.exports = Review;