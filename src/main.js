import bot from './bot';
import mantainUserRelation from './middlewares/mantainUserRelation';
import { Stage, session } from 'telegraf';
import countOpponents from './scenes/countOpponents';
import { helpMsg, privacyMsg, aboutMsg, tutorialMsg } from './responses';
import playHandler from './commands/play';

const stage = new Stage([countOpponents]);

bot.use(session()); // to  be precise, session is not a must have for Scenes to work, but it sure is lonely without one
bot.use(stage.middleware()); // any is here to make it work bc typing are SHIT

bot.use(mantainUserRelation);

bot.command('aiuto', ctx => ctx.reply.apply(ctx, helpMsg()));
bot.command('privacy', ctx => ctx.reply.apply(ctx, privacyMsg()));
bot.command('info', ctx => ctx.reply.apply(ctx, aboutMsg()));
bot.command('tutorial', ctx => ctx.reply.apply(ctx, tutorialMsg()));

bot.command('sfida', playHandler);

bot.on('text', ctx => {
  console.log('text');
});
