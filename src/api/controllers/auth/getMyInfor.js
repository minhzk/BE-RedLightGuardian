import { User } from '../../../models/index.js';
import { responseHelper, getUserIdFromToken } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json(responseHelper(2,'User not found'));
    } else {
      res.json(responseHelper(1, '', user))
    }
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
  }
};