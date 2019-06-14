import Joi from 'joi';
import Flag from '../models/Flag';
import flagStore from '../dataStore/flag';
import errorHandler from '../lib/helpers/errorHandler';
import Queries from '../lib/helpers/queries';
import db from '../lib/helpers/dbHelpers';
export default class flagController {
  static async flagAdvert(req, res) {
    const {
      carId, reason, description, name, email, phone,
    } = req.body;
    const dataToValidate = {
      carId: parseInt(carId, 10),
      phone,
      reason,
      description,
      name,
      email,
    };
    const result = Joi.validate(dataToValidate, Flag.flagSchema, {
      convert: false,
    });
    if (result.error === null) {
      const args = [email, carId];
      const { rowCount } = await db.Query(Queries.searchPendingReport, args);
      try {
        if (rowCount > 0) {
          return res.status(400).json({
            status: 400,
            message: 'We are handling previous reports',
          });
        }
        const args2 = [reason, description, name, email, phone, carId];
        const { rows } = await db.Query(Queries.insertFlags, args2);
        try {
          return res.status(201).json({
            status: 201,
            message: 'Report created succesfully',
            data: rows[0],
          });
        } catch (error) {
          errorHandler.tryCatchError(res, error);
        }
      } catch (error) {
        errorHandler.tryCatchError(res, error);
      }
    }
    return errorHandler.validationError(res, result);
  }

  static async viewAllFlags(req, res) {
    const { rowCount, rows } = await db.Query(Queries.allFlags);
    try {
      if (rowCount > 0) {
        return res.status(200).json({
          status: 200,
          data: rows,
        });
      }
      return res.status(404).json({
        status: 404,
        message: 'Reports not found',
      });
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
    return false;
  }
}
