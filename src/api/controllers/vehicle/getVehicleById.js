import { Vehicle } from '../../../models/index.js';
import { errorHelper, responseHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const vehicleId = parseInt(req.params.id);
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      res.status(404).json(errorHelper('00002', req, 'Vehicle not found'));
    } else {
      res.json(responseHelper('success', '', vehicle))
    }
  } catch (error) {
    res.status(500).json(errorHelper('00003', req, error.message));
  }
};
/**
 * @swagger
 * /vehicles/{vehicleId}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         description: ID of the vehicle
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vehicle details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       500:
 *         description: An internal server error occurred, please try again.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */