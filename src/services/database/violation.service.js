import Violation from "../../models/violation.js";
import { pagingHelper } from "../../utils/index.js";
import { getOwnerByVehicle } from "./owner.service.js";
import mailService from '../../config/smtp.config.js';
import { Op } from "sequelize";
import { stringify, v4 as uuidv4 } from "uuid";

const getAllViolation = async (req) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  let whereClause = {};

  if (req.query.type) {
    whereClause.type = req.query.type;
  }
  if (req.query.status) {
    whereClause.status = req.query.status;
  }
  if (req.query.cameraID) {
    whereClause.cameraID = req.query.cameraID;
  }
  if (req.query.startDate && req.query.endDate) {
    whereClause.deadline = {
      [Op.between]: [
        new Date(req.query.startDate),
        new Date(req.query.endDate),
      ],
    };
  }

  const violations = await Violation.findAll({
    where: whereClause,
    limit: pageSize,
    offset: offset,
  });

  const totalViolations = await Violation.count({ where: whereClause });
  const meta = pagingHelper(page, pageSize, totalViolations);
  return { violations: violations, meta: meta };
};

const createViolation = async (vehicleID, cameraID, imageUrl) => {
  const deadlineTimestamp = Date.now() + 15 * 24 * 60 * 60 * 1000;
  const id = uuidv4();
  const type = "Run a red light";
  const status = "unpaid fine";
  const violationData = { id, type, deadline: deadlineTimestamp, status, vehicleID, time: Date.now(), cameraID, imageUrl };
  const newViolation = await Violation.create(violationData);
  const owner = await getOwnerByVehicle(vehicleID);
  const emailTo = 'bta123aaa@gmail.com';
  mailService.sendMail({
    emailTo,
    emailContent: JSON.stringify(owner)
  })
  return newViolation;
};


const getViolationById = async (violationId) => {
  const violation = await Violation.findByPk(violationId);
  return violation;
};

const updateViolationById = async (violationId, updatedData) => {
  const violation = await Violation.findByPk(violationId);
  if (violation) {
    await violation.update(updatedData);
    return true;
  }
  return false;
};

const deleteViolationById = async (violationId) => {
  const violation = await Violation.findByPk(violationId);
  if (violation) {
    await violation.destroy();
    return true;
  }
  return false;
};

const formatEmail = (owner) => {
  const tmp = JSON.stringify(owner);
  console.log(tmp);
  return tmp;
}

export {
  getAllViolation,
  createViolation,
  getViolationById,
  updateViolationById,
  deleteViolationById,
};
