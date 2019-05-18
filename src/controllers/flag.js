import Flag from '../models/Flag';
import flagStore from '../dataStore/flag';
export default class flagController {
  static flagAdvert(req, res) {
    const flagData = req.body;
    const flag = new Flag(
      (flagData.id = Math.ceil(
        Math.random() * 100000 * (flagStore.length + 1),
      )),
      flagData.carId,
      flagData.reason,
      flagData.description,
      (flagData.createdOn = Date.now()),
      flagData.name,
      flagData.email,
      flagData.phone,
    );
    const outstandingFlag = flagStore.find(
      olduser => olduser.email === flagData.email && olduser.carId === flagData.carId,
    );
    if (outstandingFlag) {
      return res.status(400).json({
        status: 'error',
        message: 'We are handling previous reports',
      });
    }
    flagStore.push(flag);
    return res.status(201).json({
      status: 'success',
      message: 'Report created succesfully',
      data: flag,
    });
  }

  static viewAllFlags(req, res) {
    if (flagStore.length > 0) {
      return res.status(200).json({
        status: 'success',
        data: flagStore,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Reports not found',
    });
  }
}
