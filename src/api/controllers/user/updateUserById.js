import User from '../../../models/user.js';
import { errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json(errorHelper('00002', req, 'User not found'));
    } else {
      await user.update(updatedUserData);
      res.json(user);
    }
  } catch (error) {
    res.status(500).json(errorHelper('00004', req, error.message));
  }
};
/**
 * @swagger
 * /user/{userId}:
 *    put:
 *      summary: Update user information by ID
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: User ID
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: User information updated successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *        "404":
 *          description: User not found.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */