import { NgrxDucksError } from '../core/errors';
import { throwIf } from '../core/validation';
import { nullOrUndefined } from '../validators';

class Plain {}

describe('reducerFrom', () => {
  describe('When the target has no initial value', () => {
    it('should emit an error', () => {
      const error = new NgrxDucksError(
        `${createFrom.name}: ${
          Plain.name
        } does not define initialValue. Make sure to annotate ${
          Plain.name
        } with @InitialState.`
      );
      expect(() => createFrom(Plain)).toThrowError(error);
    });
  });
});

function createFrom<T extends new () => InstanceType<T>>(Token: T) {
  const instance: { initialState?: unknown } = new Token();
  const initialState = instance.initialState;

  throwIf(
    nullOrUndefined(initialState),
    `${createFrom.name}: ${
      Token.constructor.name
    } does not define initialValue. Make sure to annotate ${
      Token.constructor.name
    } with @InitialState.`
  );
}
