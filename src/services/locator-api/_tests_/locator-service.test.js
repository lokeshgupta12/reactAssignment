import ApiHelper from '../../api-helper';
import { postRoutes, getRoutes } from '../locator-service';

describe('locator-services', () => {
  
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };
  
  test('postRoutes() should receive token', async () => {
    const sampleToken = 'abc123fgr23-123dfsgaqw12';
    const requestBody = {};
    const apiService = jest.spyOn(ApiHelper, 'genericPost');

    apiService.mockImplementation(() =>
        Promise.resolve({ token: sampleToken })
    );

    const response = await postRoutes(requestBody); // method being tested

    expect(response.token).toBe(sampleToken);
    apiService.mockRestore();
  });

  test('postRoutes() return an error message in case of failed api request', async () => {
    const sampleMsg = 'Internal Server Error';
    const requestBody = {};
    const apiService = jest.spyOn(ApiHelper, 'genericPost');

    apiService.mockImplementation(() => Promise.reject(sampleMsg));

    await postRoutes(requestBody).catch((e) => {
      expect(e).toBe(sampleMsg);
      apiService.mockRestore();
    });
  });

  test('getRoutes() should recieve JSON data ', async () => {
    const sampleData = {
      data: {
        status: 'success',
        path: [
            ['22.372081', '114.107877'],
            ['22.326442', '114.167811'],
            ['22.284419', '114.159510']
        ],
        total_distance: 20000,
        total_time: 1800
      }
    };

    const apiService = jest.spyOn(ApiHelper, 'genericGet');

    apiService.mockImplementation(() =>
        Promise.resolve(sampleData)
    );

    const response = await getRoutes(); // method being tested

    expect(response.data.status).toBe(sampleData.data.status);
    expect(response.data.path[0].length).toBe(sampleData.data.path[0].length);
    apiService.mockRestore();
  });

  test('getRoutes() return an error message in case of failed api request', async () => {
    const sampleMsg = 'Internal Server Error';
    const apiService = jest.spyOn(ApiHelper, 'genericGet');

    apiService.mockImplementation(() => Promise.reject(sampleMsg));

    await getRoutes().catch(e => {
      expect(e).toBe(sampleMsg);
      apiService.mockRestore();
    });
  });

  test('getRoutes() returns the status correctly and does recursion in case of "in progress" status', async () => {
    let statusMsg = { 
        data:{
            "status": ""
        }
     };
    let timesCalled = 0;
    const apiService = jest.spyOn(ApiHelper, 'genericGet');

    // apiService invoked from fetchRoutes() method
    apiService.mockImplementation(() => {
      const dice = getRandomInt(0,3);
      timesCalled++;

      switch(dice) {
        case 0: {
          statusMsg.data.status = "success";
          break;
        }
        case 1: {
          statusMsg.data.status = "in progress";
          break;
        }
        case 2: {
          statusMsg.data.status = "failure";
          break;
        }
        default: {}
      }

      return Promise.resolve(statusMsg);
    });

    const response = await getRoutes();

    expect(response.data.status).toBe(statusMsg.data.status); // Should return the 'status'
    expect(apiService).toHaveBeenCalledTimes(timesCalled); // Should do recursion in case of 'in progress' status
    apiService.mockRestore();
  });
})