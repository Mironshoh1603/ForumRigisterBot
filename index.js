const telegraf = require("telegraf");
const data = require("./data");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const Scene = require("telegraf/scenes/base");
const { leave } = Stage;
const stage = new Stage();
const bot = new telegraf(data.token);

const getLogin = new Scene("getLogin");
stage.register(getLogin);
const getPassword = new Scene("getPassword");
stage.register(getPassword);
const getCategory = new Scene("getCategory");
stage.register(getCategory);

bot.use(session());
bot.use(stage.middleware());

bot.hears("️⬅️ Asosiyga qaytish", (ctx) => {
  ctx.reply(
    "Assalamu Aleykum Magic Agro Forum Platformasini Rasmiy botiga xush kelibsiz\n Iltimos Magic Agro Forum websitidagi loginningizni kiriting:\n masalan: Magic123",
    {
      reply_markup: { remove_keyboard: true },
    }
  );
  ctx.scene.enter("getLogin");
});

bot.start((ctx) => {
  ctx.reply(
    "Assalamu Aleykum Magic Agro Forum Platformasini Rasmiy botiga xush kelibsiz\n Iltimos Magic Agro Forum websitidagi loginningizni kiriting:\n masalan: Magic123",
    {
      reply_markup: { remove_keyboard: true },
    }
  );
  ctx.scene.enter("getLogin");
});

getLogin.command("start", async (ctx) => {
  ctx.reply(
    "Assalamu Aleykum Magic Agro Forum Platformasini Rasmiy botiga xush kelibsiz\n Iltimos Magic Agro Forum websitidagi loginningizni kiriting:\n masalan: Magic123",
    {
      reply_markup: { remove_keyboard: true },
    }
  );
  console.log("svdgvd");
  ctx.scene.enter("getLogin");
});

getLogin.on("text", async (ctx) => {
  if (ctx.message.text === "◀️ Orqaga qaytish") {
    return ctx.reply(
      "Siz allaqachon boshiga qaytdingiz. Iltimos, loginingizni qayta  kiriting:"
    );
  }

  console.log(ctx.message.text, "manabu session");
  ctx.session.login = ctx.message.text;
  ctx.reply(
    "Parolingizni kiriting:" +
      `\n\nAllaqachon kiritilgan maʼlumotlar:\n Login: ${ctx.session.login}`,
    {
      reply_markup: {
        keyboard: [["◀️ Orqaga qaytish"]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
  await ctx.scene.leave("getLogin");
  ctx.scene.enter("getPassword");
});

getPassword.on("text", async (ctx) => {
  if (ctx.message.text === "◀️ Orqaga qaytish") {
    ctx.reply(
      "Siz allaqachon boshiga qaytdingiz. Iltimos, loginingizni qayta  kiriting:"
    );
    ctx.scene.enter("getLogin");
    return;
  }

  console.log(ctx.message);
  ctx.session.password = ctx.message.text;
  
  ctx.reply(
    "А теперь расскажите о своем образовании. В каком вузе Вы учились и на каком факультете?" +
      `\n\nУже введенные данные:\nФ.И.О: ${ctx.session.login};\nГод рождения: ${ctx.session.password}`,
    {
      reply_markup: {
        keyboard: [["◀️ Orqaga qaytish", "❌ Chiqish"]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
  await ctx.scene.leave("getPassword");
  ctx.scene.enter("getCategory");
});

// getYear.hears("◀️ Orqaga qaytish", async (ctx) => {
//   ctx.reply("Введите фамилию, имя и отчество", {
//     reply_markup: { remove_keyboard: true },
//   });
//   await ctx.scene.leave("getYear");
//   ctx.scene.enter("getName");
// });

// getYear.on("text", async (ctx) => {
//   ctx.reply(
//     "Введидте только год рождения в формате 1990" +
//       `\n\nУже введенные данные:\nФ.И.О: ${ctx.session.name}`,
//     {
//       reply_markup: {
//         keyboard: [["◀️ Orqaga qaytish", "❌ Hammasini oʻchirib tashlang"]],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     }
//   );
// });

// getEduc.hears("◀️ Orqaga qaytish", async (ctx) => {
//   ctx.reply(
//     "Введидте год рождения" +
//       `\n\nУже введенные данные:\nФ.И.О: ${ctx.session.name}`,
//     {
//       reply_markup: {
//         keyboard: [["◀️ Orqaga qaytish", "❌ Hammasini oʻchirib tashlang"]],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     }
//   );
//   await ctx.scene.leave("getEduc");
//   ctx.scene.enter("getYear");
// });

// getEduc.hears(["❌ Hammasini oʻchirib tashlang", "/start"], async (ctx) => {
//   ctx.reply("Начнем заново. Введите имя, фамилию и отчество", {
//     reply_markup: { remove_keyboard: true },
//   });
//   await ctx.scene.leave("getEduc");
//   ctx.scene.enter("getName");
// });

// getEduc.on("text", async (ctx) => {
//   ctx.session.educ = ctx.message.text;
//   ctx.reply(
//     "Напишите тему Вашей дипломной работы" +
//       `\n\nУже введенные данные:\nФ.И.О: ${ctx.session.name};\nГод рождения: ${ctx.session.year};\nОбразование: ${ctx.session.educ}`,
//     {
//       reply_markup: {
//         keyboard: [["◀️ Orqaga qaytish", "❌ Hammasini oʻchirib tashlang"]],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     }
//   );
//   await ctx.scene.leave("getEduc");
//   ctx.scene.enter("getTheme");
// });

// getTheme.hears("◀️ Orqaga qaytish", async (ctx) => {
//   ctx.reply(
//     "А теперь расскажите о своем образовании. В каком вузе Вы учились и на каком факультете?" +
//       `\n\nУже введенные данные:\nФ.И.О: ${ctx.session.name};\nГод рождения: ${ctx.session.year}`,
//     {
//       reply_markup: {
//         keyboard: [["◀️ Orqaga qaytish", "❌ Hammasini oʻchirib tashlang"]],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     }
//   );
//   await ctx.scene.leave("getTheme");
//   ctx.scene.enter("getEduc");
// });

// getTheme.hears(["❌ Hammasini oʻchirib tashlang", "/start"], async (ctx) => {
//   ctx.reply("Начнем заново. Введите имя, фамилию и отчество", {
//     reply_markup: { remove_keyboard: true },
//   });
//   await ctx.scene.leave("getTheme");
//   ctx.scene.enter("getName");
// });

// getTheme.on("text", async (ctx) => {
//   ctx.session.theme = ctx.message.text;
//   ctx.reply(
//     "Какими Вы языками и на каком уровне владеете? \n\nНапример: \nEnglish - Intermediate\nРусский - родной" +
//       `\n\nУже введенные данные:\nФ.И.О: ${ctx.session.name};\nГод рождения: ${ctx.session.year};\nОбразование: ${ctx.session.educ};` +
//       `\nТема диплома: ${ctx.session.theme}`,
//     {
//       reply_markup: {
//         keyboard: [["◀️ Orqaga qaytish", "❌ Hammasini oʻchirib tashlang"]],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     }
//   );
//   await ctx.scene.leave("getTheme");
//   ctx.scene.enter("getLangs");
// });

// getLangs.hears("◀️ Orqaga qaytish", async (ctx) => {
//   ctx.reply(
//     "Напишите тему Вашей дипломной работы" +
//       `\n\nУже введенные данные:\nФ.И.О: ${ctx.session.name};\nГод рождения: ${ctx.session.year};\nОбразование: ${ctx.session.educ};`,
//     {
//       reply_markup: {
//         keyboard: [["◀️ Orqaga qaytish", "❌ Hammasini oʻchirib tashlang"]],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     }
//   );
//   await ctx.scene.leave("getLangs");
//   ctx.scene.enter("getTheme");
// });

// getLangs.hears(["❌ Hammasini oʻchirib tashlang", "/start"], async (ctx) => {
//   ctx.reply("Начнем заново. Введите имя, фамилию и отчество", {
//     reply_markup: { remove_keyboard: true },
//   });
//   await ctx.scene.leave("getLangs");
//   ctx.scene.enter("getName");
// });

// getLangs.on("text", async (ctx) => {
//   ctx.session.langs = ctx.message.text;
//   ctx.reply(
//     "Какими компьютерными программами и на каком уровне Вы владеете?" +
//       "\n\nНапример: \nMS Office - в совершенстве,\nAutoCad - средний" +
//       `\n\nУже введенные данные:\nФ.И.О: ${ctx.session.name};\nГод рождения: ${ctx.session.year};\nОбразование: ${ctx.session.educ};` +
//       `\nТема диплома: ${ctx.session.theme};\nЯзыки: ${ctx.session.langs}`,
//     {
//       reply_markup: {
//         keyboard: [["◀️ Orqaga qaytish", "❌ Hammasini oʻchirib tashlang"]],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     }
//   );
//   await ctx.scene.leave("getLangs");
//   ctx.scene.enter("getCompSkills");
// });

// getCompSkills.hears("◀️ Orqaga qaytish", async (ctx) => {
//   ctx.reply(
//     "Какими Вы языками и на каком уровне владеете? \n\nНапример: \nEnglish - Intermediate\nРусский - родной" +
//       `\n\nУже введенные данные:\nФ.И.О: ${ctx.session.name};\nГод рождения: ${ctx.session.year};\nОбразование: ${ctx.session.educ};` +
//       `\nТема диплома: ${ctx.session.theme}`,
//     {
//       reply_markup: {
//         keyboard: [["◀️ Orqaga qaytish", "❌ Hammasini oʻchirib tashlang"]],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     }
//   );
//   await ctx.scene.leave("getCompSkills");
//   ctx.scene.enter("getLangs");
// });

// getCompSkills.hears(["❌ Hammasini oʻchirib tashlang", "/start"], async (ctx) => {
//   ctx.reply("Начнем заново. Введите имя, фамилию и отчество", {
//     reply_markup: { remove_keyboard: true },
//   });
//   await ctx.scene.leave("getCompSkills");
//   ctx.scene.enter("getName");
// });

// getCompSkills.on("text", async (ctx) => {
//   ctx.session.compSkills = ctx.message.text;
//   ctx.reply(
//     'Нажмите кнопку "Отправить контакт" ниже, чтобы поделиться номером.' +
//       `\n\nУже введенные данные:\nФ.И.О: ${ctx.session.name};\nГод рождения: ${ctx.session.year};\nОбразование: ${ctx.session.educ};` +
//       `\nТема диплома: ${ctx.session.theme};\nЯзыки: ${ctx.session.langs};\nВладение компьютером: ${ctx.session.compSkills}`,
//     {
//       reply_markup: {
//         keyboard: [
//           [{ text: "📱 Отправить контакт", request_contact: true }],
//           ["◀️ Orqaga qaytish", "❌ Hammasini oʻchirib tashlang"],
//         ],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     }
//   );
//   await ctx.scene.leave("getCompSkills");
//   ctx.scene.enter("getNumber");
// });

// getNumber.hears("◀️ Orqaga qaytish", async (ctx) => {
//   ctx.reply(
//     "Какими компьютерными программами и на каком уровне Вы владеете?" +
//       "\n\nНапример: \nMS Office - в совершенстве,\nAutoCad - средний" +
//       `\n\nУже введенные данные:\nФ.И.О: ${ctx.session.name};\nГод рождения: ${ctx.session.year};\nОбразование: ${ctx.session.educ};` +
//       `\nТема диплома: ${ctx.session.theme};\nЯзыки: ${ctx.session.langs}`,
//     {
//       reply_markup: {
//         keyboard: [["◀️ Orqaga qaytish", "❌ Hammasini oʻchirib tashlang"]],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     }
//   );
//   await ctx.scene.leave("getNumber");
//   ctx.scene.enter("getCompSkills");
// });

// getNumber.hears(["❌ Hammasini oʻchirib tashlang", "/start"], async (ctx) => {
//   ctx.reply("Начнем заново. Введите имя, фамилию и отчество", {
//     reply_markup: { remove_keyboard: true },
//   });
//   await ctx.scene.leave("getNumber");
//   ctx.scene.enter("getCompSkills");
//   ctx.session = null;
// });

// getNumber.on("contact", async (ctx) => {
//   ctx.session.phone = ctx.message.contact.phone_number;
//   ctx.reply(
//     '❗️ Проверьте все данные и нажмите "Все верно", если они корректны: ' +
//       `\n\nФ.И.О: ${ctx.session.name};\nГод рождения: ${ctx.session.year};\nОбразование: ${ctx.session.educ};` +
//       `\nТема диплома: ${ctx.session.theme};\nЯзыки: ${ctx.session.langs};\nВладение компьютером: ${ctx.session.compSkills};` +
//       `\nНомер: ${ctx.session.phone}`,
//     {
//       reply_markup: {
//         keyboard: [["️✅ Все верно"], ["◀️ Orqaga qaytish", "❌ Hammasini oʻchirib tashlang"]],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//       parse_mode: "markdown",
//     }
//   );
//   await ctx.scene.leave("getNumber");
//   ctx.scene.enter("check");
// });

// check.hears("️✅ Все верно", (ctx) => {
//   ctx.reply("✅ Спасибо! Ваша заявка принята. Мы Вам перезвоним.", {
//     reply_markup: {
//       keyboard: [["️⬅️ На главную"]],
//       resize_keyboard: true,
//       one_time_keyboard: true,
//     },
//   });
//   ctx.scene.leave("main");

//   for (let key of data.admins) {
//     bot.telegram.sendMessage(
//       key,
//       `Новая заявка! \n\nФ.И.О: [${ctx.session.name}](tg://user?id=${ctx.from.id});\nГод рождения: ${ctx.session.year};\nОбразование: ${ctx.session.educ};` +
//         `\nТема диплома: ${ctx.session.theme};\nЯзыки: ${ctx.session.langs};\nВладение компьютером: ${ctx.session.compSkills};` +
//         `\nНомер: ${ctx.session.phone}`,
//       { parse_mode: "markdown" }
//     );
//   }
//   ctx.session = null;
// });

// check.hears("◀️ Orqaga qaytish", async (ctx) => {
//   ctx.reply(
//     'Нажмите кнопку "Отправить контакт" ниже, чтобы поделиться номером.' +
//       `\n\nУже введенные данные:\nФ.И.О: ${ctx.session.name};\nГод рождения: ${ctx.session.year};\nОбразование: ${ctx.session.educ};` +
//       `\nТема диплома: ${ctx.session.theme};\nЯзыки: ${ctx.session.langs};\nВладение компьютером: ${ctx.session.compSkills}`,
//     {
//       reply_markup: {
//         keyboard: [
//           [{ text: "📱 Отправить контакт", request_contact: true }],
//           ["◀️ Orqaga qaytish", "❌ Hammasini oʻchirib tashlang"],
//         ],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     }
//   );
//   await ctx.scene.leave("check");
//   ctx.scene.enter("getNumber");
// });

// check.hears(["❌ Hammasini oʻchirib tashlang", "/start"], async (ctx) => {
//   ctx.reply("Начнем заново. Введите имя, фамилию и отчество", {
//     reply_markup: { remove_keyboard: true },
//   });
//   await ctx.scene.leave("getNumber");
//   ctx.scene.enter("getCompSkills");
//   ctx.session = null;
// });

bot.startPolling();
