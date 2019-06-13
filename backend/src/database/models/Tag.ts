import db from 'database/db';
import { primaryUUID } from 'lib/common';
import Sequelize from 'sequelize';

export interface TagModel {
  id: string;
  name: string;
}

const Tag = db.define('tag', {
  id: primaryUUID,
  name: {
    type: Sequelize.STRING,
    unique: 'compositeIndex',
  },
});

Tag.findByName = async (name: string) => {
  return Tag.findOne({
    where: {
      // $FlowFixMe
      [Sequelize.Op.or]: [
        Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('name')),
          Sequelize.fn('lower', name)
        ),
        Sequelize.where(
          Sequelize.fn(
            'replace',
            Sequelize.fn('lower', Sequelize.col('name')),
            ' ',
            '-'
          ),
          Sequelize.fn('replace', Sequelize.fn('lower', name), ' ', '-')
        ),
      ],
    },
  });
};

// gets tag id if exists, creates one if !exists.
Tag.getId = async function getId(rawName: string) {
  const name = rawName.trim();
  try {
    // let tag = await Tag.findOne({ where: { name } });
    let tag = await Tag.findOne({
      where: {
        // $FlowFixMe
        [Sequelize.Op.or]: [
          Sequelize.where(
            Sequelize.fn('lower', Sequelize.col('name')),
            Sequelize.fn('lower', name)
          ),
          Sequelize.where(
            Sequelize.fn(
              'replace',
              Sequelize.fn('lower', Sequelize.col('name')),
              ' ',
              '-'
            ),
            Sequelize.fn('replace', Sequelize.fn('lower', name), ' ', '-')
          ),
        ],
      },
    });
    if (!tag) {
      tag = await Tag.build({ name }).save();
    }
    return tag.id;
  } catch (e) {
    throw e;
  }
};

Tag.bulkGetId = async function(rawNames: string[]): Promise<any> {
  try {
    const tags = await Promise.all(rawNames.map(name => Tag.getId(name)));
    return tags;
  } catch (e) {
    throw e;
  }
};

export default Tag;
