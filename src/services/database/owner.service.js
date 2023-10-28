import Owner from "../../models/owner.js";
import { pagingHelper } from "../../utils/index.js";
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";

const getAllOwner = async (req) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  let whereClause = {};

  let searchConditions = [];
  if (req.query.key_word) {
    searchConditions.push({
      [Op.or]: [
        { name: { [Op.like]: `%${req.query.key_word}%` } },
        { address: { [Op.like]: `%${req.query.key_word}%` } },
      ],
    });
  }

  if (req.query.citizen_identification) {
    searchConditions.push({
      citizen_identification: req.query.citizen_identification,
    });
  }

  if (req.query.email) {
    searchConditions.push({ email: req.query.email });
  }

  if (searchConditions.length > 0) {
    whereClause[Op.and] = searchConditions;
  }

  const owners = await Owner.findAll({
    where: whereClause,
    limit: pageSize,
    offset: offset,
  });

  const totalOwners = await Owner.count({ where: whereClause });
  const meta = pagingHelper(page, pageSize, totalOwners);
  return { owners: owners, meta: meta };
};

const createOwner = async (ownerData) => {
  ownerData.id = uuidv4();
  const newOwner = await Owner.create(ownerData);
  return newOwner;
};

const getOwnerById = async (ownerId) => {
  const owner = await Owner.findByPk(ownerId);
  return owner;
};

const updateOwnerById = async (ownerId, updatedData) => {
  const owner = await Owner.findByPk(ownerId);
  if (owner) {
    await owner.update(updatedData);
    return true;
  }
  return false;
};

const deleteOwnerById = async (ownerId) => {
  const owner = await Owner.findByPk(ownerId);
  if (owner) {
    await owner.destroy();
    return true;
  }
  return false;
};

export {
  getAllOwner,
  createOwner,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
};