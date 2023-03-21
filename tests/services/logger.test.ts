'use strict';
import { Logger } from '../../src/services/Logger';
import { OBJECT_LOGGER } from '../common/mocks/logger.mock';

describe("LoggerService", () => {
    it("verification to generate a basic log trace", () => {
      // Generate a logger and verify that it is not null or undefined
      const logger: Logger = Logger.getLogger('::TEST | test log message');
      expect(logger).toBeDefined();
      expect(logger).not.toBeNull();  
      // the generated logger object should be as expected    
      expect(logger).toMatchObject(OBJECT_LOGGER);
    });
  
    it("verification to start the logger correctly without errors", () => {
      expect(() => { Logger.initLogger(); }).not.toThrowError();
    });
  });