import { CronJob } from 'cron';
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
      timeZone: 'Asia/Taipei',
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
      cronTime: '0 7-23/1 * * *',
      async onTick() {
        await Tokens.GetToken(
          'https://rent.591.com.tw/?section=37,38&searchtype=1&rentprice=15000,25000&showMore=1&area=13,&order=posttime&orderType=desc'
        );
      },
      timeZone: 'Asia/Taipei',
      start: true,
    });

    if (!cron.running) {
      cron.start();
    }
  }
}

export default Task;
