import { Stage, session } from 'telegraf';
import bot from './bot';
import mantainUserRelation from './middlewares/mantainUserRelation';
import countOpponents from './scenes/countOpponents';
import sendInvites from './scenes/sendInvites';
import { helpMsg, privacyMsg, aboutMsg, tutorialMsg } from './responses';
import playHandler from './commands/play';

const stage = new Stage([countOpponents, sendInvites]);

bot.use(session()); // to  be precise, session is not a must have for Scenes to work, but it sure is lonely without one
bot.use(stage.middleware()); // any is here to make it work bc typing are SHIT

bot.use(mantainUserRelation);

bot.command('aiuto', ctx => ctx.reply(...helpMsg()));
bot.command('privacy', ctx => ctx.reply(...privacyMsg()));
bot.command('info', ctx => ctx.reply(...aboutMsg()));
bot.command('tutorial', ctx => ctx.reply(...tutorialMsg()));

bot.command('sfida', playHandler);

bot.on('text', ctx => ctx.scene.enter('SEND_INVITES'));
