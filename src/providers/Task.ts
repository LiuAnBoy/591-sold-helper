import axios from 'axios';
import { CronJob } from 'cron';
import Rent from '../controllers/task/Rent';
import Locals from './Locals';

class Task {
  public static rent() {
    console.log('Task     :: Rent Task is Running');
    const cron = new CronJob({
      // cronTime: '*/1 * * * *', //Test cron
      // cronTime: '30 */5 6-23/1 * * *', // local cron test
      cronTime: '30 */5 0-15/1 * * *',
      async onTick() {
        await Rent.Fetch();
      },
      start: true,
    });
    if (!cron.running) {
      cron.start();
    }
  }

  public static token(): void {
    console.log('Task     :: Token Task is Running');
    const cron = new CronJob({
      // cronTime: '* * * */1 * *', //Test cron
      // cronTime: '0 6-23/1 * * *', // local cron test
      cronTime: '0 0-15/1 * * *',
      async onTick() {
        await axios.get(`${Locals.config().url}/api/refresh_token`);
      },
      start: true,
    });

    if (!cron.running) {
      cron.start();
    }
  }

  public static wakeUpDyno() {
    console.log('Task     :: Wake up Task is Running');
    const cron = new CronJob({
      cronTime: '*/25 * * * *',
      async onTick() {
        try {
          console.log('Task     :: setTimeout called.');
          // HTTP GET request to the dyno's url
          await axios.get(`${Locals.config().url}`);
          console.log(`Task     :: Fetching ${Locals.config().url}.`);
        } catch (error) {
          const err = error as Error;
          console.log(
            `Task     :: Error fetching ${Locals.config().url}: ${err.message}`
          );
          console.log(`Task     :: Will try again in 25 minutes...`);
        }
      },
    });

    if (!cron.running) {
      cron.start();
    }
  }
}

export default Task;
