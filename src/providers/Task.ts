import { CronJob, CronJobParameters } from 'cron';
import Rent from '../controllers/task/Rent';
import Tokens from '../controllers/task/Token';

class Task {
  public static rent() {
    console.log('Task     :: Rent Task is Running');
    const cron = new CronJob({
      cronTime: '*/5 * * * *',
      async onTick() {
        await Rent.Fetch();
      },
      start: true,
    });
    if (!cron.running) {
      cron.start();
    }
  }

  public static token() {
    console.log('Task     :: Token Task is Running');
    const cron = new CronJob({
      // cronTime: '* * * * *',
      cronTime: '0 0-15/1 * * *',
      async onTick() {
        await Tokens.GetToken(
          'https://rent.591.com.tw/?section=37,38&searchtype=1&rentprice=15000,25000&showMore=1&area=13,&order=posttime&orderType=desc'
        );
      },
      start: true,
    });

    if (!cron.running) {
      cron.start();
    }
  }

  public static wakeUpDyno(url: string) {
    console.log('Task     :: Wake up Task is Running');
    const cron = new CronJob({
      cronTime: '*/25 * * * *',
      async onTick() {
        try {
          console.log('Task     :: setTimeout called.');
          // HTTP GET request to the dyno's url
          await fetch(url);
          console.log(`Task     :: Fetching ${url}.`);
        } catch (error) {
          const err = error as Error;
          console.log(`Task     :: Error fetching ${url}: ${err.message} 
                Will try again in 25 minutes...`);
        }
      },
    });

    if (!cron.running) {
      cron.start();
    }
  }
}

export default Task;
