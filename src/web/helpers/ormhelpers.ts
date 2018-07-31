import { ObjectID } from "mongodb";
import { InvalidRouteParameterException } from "../../exceptions";

export function objectIDFromRouteParam(hexString: string): ObjectID {
  if (hexString.length > 28 || hexString.length < 24) {
    throw new InvalidRouteParameterException('Incorrect param length');
  }

  try {
    return ObjectID.createFromHexString(Buffer.from(hexString, 'hex').toString('hex'));
  } catch(err) {
    throw new InvalidRouteParameterException('Invalid id hex string format');
  }
}