import { Markup } from 'telegraf';

const dispButtons = (buttons, columns) => {
  return buttons
    ? Markup.keyboard(buttons, {
        columns: columns || buttons.length
      })
        .oneTime()
        .resize()
        .extra()
    : Markup.keyboard(['']);
};

export default dispButtons;
