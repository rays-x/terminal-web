import {Payload} from 'payload';
import {promiseMap} from '../utils';
import {Logger} from '../config/logger/api-logger';

const importFlowFix = async (payload: Payload) => {
  // console.log('quiz', quiz);
  const flowModel: any = payload.collections['flow'].Model
  const flows = [
    {
      "id": "63047c5087ae3311ee5dfb57",
      "type": "ios",
      "slug": "ios",
      "logo": "6319a86e58c80a5d7179478b",
      "items": {
        en: [{
          "buttons": {"next": "Next", "signIn": "Sign in"},
          "items": [{
            "title": "Answer the questions",
            "content": {"type": "image", "file": "62e7b9e1ce548b63bae661b3"},
            "id": "63078230d231ee98b91d385e"
          }, {
            "title": "We'll find the perfect match",
            "content": {"type": "image", "file": "62e7b9f5ce548b63bae661b7"},
            "id": "630782a2d231ee98b91d385f"
          }, {
            "title": "Talk, date & fall in love",
            "content": {"type": "image", "file": "62e7ba4ece548b63bae661bb"},
            "id": "630782b4d231ee98b91d3860"
          }],
          "id": "630766d4c49b4c002219caeb",
          "blockType": "onboarding"
        }, {
          "title": "Allow notifications",
          "subtitle": "Never miss new soulmates or messages.",
          "content": {"type": "image", "file": "630766ef43c26aa067b947e7"},
          "buttons": {"next": "Next", "skip": "Skip"},
          "id": "630766d4c49b4c002219caec",
          "blockType": "appNotifications"
        }, {
          "title": "We respect your data and privacy",
          "subtitle": "We simply use it to block Soulmate ads in other apps and websites, since you already have it installed.",
          "content": {"type": "image", "file": "63076b3243c26aa067b948b7"},
          "buttons": {"next": "Next", "skip": "Skip"},
          "id": "63076787c49b4c002219caed",
          "blockType": "appPrivacy"
        }, {
          "title": "Connection quiz",
          "subtitle": "Tips for quiz",
          "list": [{
            "title": "Answer the questions about yourself to help us find your soulmate.",
            "id": "6307833bd231ee98b91d3861"
          }, {
            "title": "It takes about 10 minutes to complete the quiz.",
            "id": "63078348d231ee98b91d3862"
          }, {
            "title": "Answer honestly and have fun!",
            "emoji": "62e7b9b7ce548b63bae661af",
            "id": "63078351d231ee98b91d3863"
          }],
          "termsOfUseConsent": [{
            "children": [{"text": "By starting, you agree to Soulmate's "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/terms-ios",
              "newTab": true,
              "children": [{"text": "Terms of Use"}]
            }, {"text": " and "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/privacy-ios",
              "newTab": true,
              "children": [{"text": "Privacy Policy"}]
            }, {"text": ""}]
          }],
          "button": "Start",
          "id": "63076728f2fcf597079bf75c",
          "blockType": "beforeQuiz"
        }, {
          "items": [{
            "item": "62ecd4a51773594fb0aa4763",
            "id": "62f15d3c3105ad2edd12060d",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f134571773594fb0aa4ae1",
            "id": "62f15d4d3105ad2edd12060e",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13bb61773594fb0aa4c12",
            "id": "62f15d5f3105ad2edd12060f",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13c3a1773594fb0aa4c3a",
            "id": "62f15e1a3105ad2edd120610",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f166381773594fb0aa500e",
            "id": "62f166507157ae861f80910c",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f1697a1773594fb0aa5154",
            "id": "62f169847157ae861f809115",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f16b4c1773594fb0aa5274",
            "id": "62f605180b9d2e151c5a03de",
            "blockType": "quiz_user_data"
          }, {
            "items": [{
              "content": "You look awesome! 😍",
              "id": "630783a8d231ee98b91d3864",
              "blockType": "message"
            }, {
              "content": {
                "title": "Keep it up!",
                "subtitle": "We have already started picking soulmates for you",
                "file": "62f1369c1773594fb0aa4b05"
              }, "id": "630783acd231ee98b91d3865", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Keep it up!", "id": "630783c9d231ee98b91d3867"}],
              "id": "630783c8d231ee98b91d3866",
              "blockType": "vertical_actions"
            }],
            "id": "62f1348e0db24716e22910fb",
            "blockType": "breakdown"
          }, {
            "item": "62f61b79f2dc1d8b0966864f",
            "id": "62f61bab23dc634b39a6e9db",
            "blockType": "quiz_user_data"
          }, {
            "items_length": "10",
            "id": "62f1966c7157ae861f80913e",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "You are on the right track!",
                "subtitle": "Soulmate uses advanced algorithms to select you a pair",
                "file": "62f16c721773594fb0aa52d3"
              }, "id": "630783d8d231ee98b91d3868", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "63078437d231ee98b91d386a"}],
              "id": "63078436d231ee98b91d3869",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77992",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a27157ae861f809140",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Soulmate has already found your unique features!",
                "subtitle": "Just a few more questions  to complete the quiz",
                "file": "62f16cca1773594fb0aa52d7"
              }, "id": "6307843cd231ee98b91d386b", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "63078481d231ee98b91d386d"}],
              "id": "63078480d231ee98b91d386c",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77993",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a37157ae861f809141",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Myth: The easiest way to make best friends is at school  or university.",
                "subtitle": "But it's actually easier to do it  in Soulmate!",
                "file": "62f16dd11773594fb0aa52db"
              }, "id": "63078495d231ee98b91d386e", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630784abd231ee98b91d3870"}],
              "id": "630784abd231ee98b91d386f",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77994",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a07157ae861f80913f",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Already 351902 people have found their soulmate!",
                "subtitle": "Waiting for you to complete  the quiz!",
                "file": "62f16e161773594fb0aa52df"
              }, "id": "630784d8d231ee98b91d3873", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630784bcd231ee98b91d3872"}],
              "id": "630784bbd231ee98b91d3871",
              "blockType": "vertical_actions"
            }],
            "id": "62f1723c7157ae861f809130",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a57157ae861f809142",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "You're in the home stretch!",
                "subtitle": "Let's answer the final questions to see your soulmate!",
                "file": "62f173e01773594fb0aa52ff"
              }, "id": "630784f4d231ee98b91d3874", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let's do it!", "id": "63078515d231ee98b91d3876"}],
              "id": "63078514d231ee98b91d3875",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77995",
            "blockType": "breakdown"
          }, {
            "item": "631b8998c9d6c33835afd35d",
            "id": "631b8b2638436cef82dca0c0",
            "blockType": "quiz_user_data"
          }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
          "id": "62f131f00db24716e22910f5",
          "blockType": "quizContainer"
        }, {
          "video": "62ff5eef2434775f5b8518af",
          "title": "Finding your soulmate",
          "progressItems": [{
            "content": "Define your personality",
            "id": "63076beb944a6b76a6378570"
          }, {"content": "Matching interests", "id": "63076bf2944a6b76a6378571"}, {
            "content": "Prepare soulmate’s list",
            "id": "63076c03944a6b76a6378572"
          }],
          "id": "630767c0c49b4c002219caee",
          "blockType": "fakeSearch"
        }, {
          "title": "Update needed",
          "subtitle": "We are working hard on your experience  in our app. Please, update it to the newest available version.",
          "content": {"type": "image", "file": "6310669807fd55b1c5df716a"},
          "buttons": {"next": "Update", "skip": "Skip"},
          "versionsAndConditions": [{
            "applicationVersion": "1.0.0",
            "isHardUpdateNeeded": false,
            "id": "63106ac3e79253e0af414394"
          }],
          "id": "63106aad73cd3f00228f1848",
          "blockType": "applicationUpdate"
        }],
        ru: [{
          "buttons": {"next": "Далее", "signIn": "Войти"},
          "items": [{
            "title": "Ответь на вопросы",
            "content": {"type": "image", "file": "62fcc218860417e8ac4c59cd"},
            "id": "63076eff7e62197184e6ac41"
          }, {
            "title": "Найдем тебе соулмейтов",
            "content": {"type": "image", "file": "62fcc234860417e8ac4c59d1"},
            "id": "63076f1b7e62197184e6ac42"
          }, {
            "title": "Общайся, влюбляйся",
            "content": {"type": "image", "file": "62fcc260860417e8ac4c59d5"},
            "id": "63076f51c49b4c002219caf0"
          }],
          "id": "630766d4c49b4c002219caeb",
          "blockType": "onboarding"
        }, {
          "title": "Push-уведомления",
          "subtitle": "Чтобы не пропустить новых соулмейтов и сообщения от них",
          "content": {"type": "image", "file": "63076faf43c26aa067b94a9a"},
          "buttons": {"next": "Далее", "skip": "Пропустить"},
          "id": "630766d4c49b4c002219caec",
          "blockType": "appNotifications"
        }, {
          "title": "Бережно храним данные",
          "subtitle": "Так мы не будем показывать тебе рекламу Soulmate на веб-сайтах и в других приложения",
          "content": {"type": "image", "file": "63076b3243c26aa067b948b7"},
          "buttons": {"next": "Далее", "skip": "Пропустить"},
          "id": "63076787c49b4c002219caed",
          "blockType": "appPrivacy"
        }, {
          "title": "Опрос на совместимость",
          "subtitle": "Советы",
          "list": [{
            "title": "Ответь на вопросы о себе, чтобы мы нашли тебе соулмейта",
            "id": "630770ad7e62197184e6ac44"
          }, {
            "title": "Прохождение опроса занимает примерно 10 минут",
            "id": "630770b57e62197184e6ac45"
          }, {
            "title": "Отвечай честно. Развлекайся!",
            "emoji": "62e7b9b7ce548b63bae661af",
            "id": "630770bf7e62197184e6ac46"
          }],
          "termsOfUseConsent": [{
            "children": [{"text": "Нажимая «Начать», вы соглашаетесь с "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/privacy-ios",
              "newTab": true,
              "children": [{"text": "Политикой конфиденциальности"}]
            }, {"text": " и "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/terms-ios",
              "newTab": true,
              "children": [{"text": "Правилами пользования"}]
            }, {"text": ""}]
          }],
          "button": "Начать",
          "id": "63076728f2fcf597079bf75c",
          "blockType": "beforeQuiz"
        }, {
          "items": [{
            "item": "62ecd4a51773594fb0aa4763",
            "id": "62f15d3c3105ad2edd12060d",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f134571773594fb0aa4ae1",
            "id": "62f15d4d3105ad2edd12060e",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13bb61773594fb0aa4c12",
            "id": "62f15d5f3105ad2edd12060f",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13c3a1773594fb0aa4c3a",
            "id": "62f15e1a3105ad2edd120610",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f166381773594fb0aa500e",
            "id": "62f166507157ae861f80910c",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f1697a1773594fb0aa5154",
            "id": "62f169847157ae861f809115",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f16b4c1773594fb0aa5274",
            "id": "62f605180b9d2e151c5a03de",
            "blockType": "quiz_user_data"
          }, {
            "items": [{
              "content": "Выглядишь потрясно! 😍",
              "id": "63076cf47e62197184e6ac2f",
              "blockType": "message"
            }, {
              "content": {
                "title": "Так держать!",
                "subtitle": "Мы уже начали подбирать  для тебя соулмейтов",
                "file": "62f1369c1773594fb0aa4b05"
              }, "id": "63076c667e62197184e6ac2e", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63076d0e7e62197184e6ac31"}],
              "id": "63076d0d7e62197184e6ac30",
              "blockType": "vertical_actions"
            }],
            "id": "62f1348e0db24716e22910fb",
            "blockType": "breakdown"
          }, {
            "item": "62f61b79f2dc1d8b0966864f",
            "id": "62f61bab23dc634b39a6e9db",
            "blockType": "quiz_user_data"
          }, {
            "items_length": "10",
            "id": "62f1966c7157ae861f80913e",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Ты на верном пути!",
                "subtitle": "Soulmate использует передовые алгоритмы для точного подбора твоей пары",
                "file": "62f16c721773594fb0aa52d3"
              }, "id": "63076d297e62197184e6ac32", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63076d4d7e62197184e6ac34"}],
              "id": "63076d4c7e62197184e6ac33",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77992",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a27157ae861f809140",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Мы уже выявили твои уникальные особенности!",
                "subtitle": "Осталось совсем немного, чтобы закончить опрос",
                "file": "62fccbfe860417e8ac4c615f"
              }, "id": "63076d5d7e62197184e6ac35", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63076d8f7e62197184e6ac37"}],
              "id": "63076d8e7e62197184e6ac36",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77993",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a37157ae861f809141",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Миф: проще всего завести лучших друзей в школе или университете.",
                "subtitle": "Но на самом деле проще это сделать у нас, в Soulmate!",
                "file": "62f16dd11773594fb0aa52db"
              }, "id": "63076d9c7e62197184e6ac38", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63076dc77e62197184e6ac3a"}],
              "id": "63076dc67e62197184e6ac39",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77994",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a07157ae861f80913f",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Уже 351902 людей нашли свою вторую половинку в Soulmate",
                "subtitle": "Ждём, когда ты закончишь проходить опрос",
                "file": "62f16e161773594fb0aa52df"
              }, "id": "63076dd57e62197184e6ac3b", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63076dfc7e62197184e6ac3d"}],
              "id": "63076dfb7e62197184e6ac3c",
              "blockType": "vertical_actions"
            }],
            "id": "62f1723c7157ae861f809130",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a57157ae861f809142",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Почти закончили!",
                "subtitle": "Давай ответим на последние вопросы и найдём тебе пару",
                "file": "62f173e01773594fb0aa52ff"
              }, "id": "63076e0e7e62197184e6ac3e", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Заканчиваем!", "id": "63076e2a7e62197184e6ac40"}],
              "id": "63076e297e62197184e6ac3f",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77995",
            "blockType": "breakdown"
          }, {
            "item": "631b8998c9d6c33835afd35d",
            "id": "631b8b2638436cef82dca0c0",
            "blockType": "quiz_user_data"
          }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
          "id": "62f131f00db24716e22910f5",
          "blockType": "quizContainer"
        }, {
          "video": "62ff5eef2434775f5b8518af",
          "title": "Ищем твоих соулмейтов",
          "progressItems": [{
            "content": "Сравниваем личные качества",
            "id": "630771c57e62197184e6ac47"
          }, {"content": "Ищем пару по интересам", "id": "630771d17e62197184e6ac48"}, {
            "content": "Составляем список",
            "id": "630771d87e62197184e6ac49"
          }],
          "id": "630767c0c49b4c002219caee",
          "blockType": "fakeSearch"
        }, {
          "title": "Требуется обновление",
          "subtitle": "Мы усердно работаем над вашим опытом работы в нашем приложении. Пожалуйста, обновите его до последней доступной версии.",
          "content": {"type": "image", "file": "6310669807fd55b1c5df716a"},
          "buttons": {"next": "Обновить", "skip": "Пропустить"},
          "versionsAndConditions": [{"applicationVersion": "1.0.0", "id": "63106aa1a57b3b0ac40bdb6e"}],
          "id": "63106aad73cd3f00228f1848",
          "blockType": "applicationUpdate"
        }]
      },
      "_status": "published",
      "createdAt": "2022-08-23T07:05:52.245Z",
      "updatedAt": "2022-09-09T15:18:07.898Z"
    },
    {
      "id": "6305d5650fcf218ce835fe87",
      "type": "web",
      "slug": "web_slmt_paywall_video",
      "logo": "62e7b98ace548b63bae661a0",
      "items": {
        en:
          [{
            "image": "6316233f9e0e81bd09cb45c6",
            "title": "Find your soulmate",
            "subtitle": "A service that helps you find the person  who is closest to your soul",
            "button": "Let’s do it",
            "links": [{
              "text": "Privacy policy",
              "url": "https://app.soulmate.tech/page/privacy",
              "id": "6316236a0f7bcc16f8f907df"
            }, {
              "text": "Terms of use",
              "url": "https://app.soulmate.tech/page/terms",
              "id": "6316236b0f7bcc16f8f907e0"
            }],
            "info": "SOULMATE TECHNOLOGIES INC 111 Pier Avenue Suite 100, Hermosa Beach, California 90254, USA",
            "id": "6316235c0f7bcc16f8f907de",
            "blockType": "welcome"
          }, {
            "buttons": {"next": "Next"},
            "items": [{
              "title": "Answer the <br/>questions",
              "content": {"type": "image", "file": "62e7b9e1ce548b63bae661b3"},
              "id": "62ecd23b0db24716e22910ca"
            }, {
              "title": "We'll find the <br/>perfect match",
              "content": {"type": "image", "file": "62e7b9f5ce548b63bae661b7"},
              "id": "62ecd2780db24716e22910cb"
            }, {
              "title": "Talk, date & <br/>fall in love",
              "content": {"type": "image", "file": "62e7ba4ece548b63bae661bb"},
              "id": "62f104370db24716e22910e6"
            }],
            "id": "62ecd2260db24716e22910c9",
            "blockType": "onboarding"
          }, {
            "title": "Connection quiz",
            "subtitle": "Tips for quiz",
            "list": [{
              "title": "Answer the questions about yourself  to help us find your soulmate.",
              "id": "62ecd3380db24716e22910cd"
            }, {
              "title": "It takes about 10 minutes to complete  the quiz.",
              "id": "62ecd3560db24716e22910ce"
            }, {
              "title": "Answer honestly and have fun!",
              "emoji": "62e7b9b7ce548b63bae661af",
              "id": "62ecd3630db24716e22910cf"
            }],
            "termsOfUseConsent": [{
              "children": [{"text": "By starting, you agree to Soulmate’s "}, {
                "type": "link",
                "url": "https://app.soulmate.tech/page/terms",
                "newTab": true,
                "children": [{"text": "Terms of Use"}]
              }, {"text": " "}]
            }, {
              "children": [{"text": "and "}, {
                "type": "link",
                "url": "https://app.soulmate.tech/page/privacy",
                "newTab": true,
                "children": [{"text": "Privacy Policy"}]
              }, {"text": ""}]
            }],
            "button": "Start",
            "id": "62ecd3120db24716e22910cc",
            "blockType": "beforeQuiz"
          }, {
            "items": [{
              "item": "62ecd4a51773594fb0aa4763",
              "id": "62f15d3c3105ad2edd12060d",
              "blockType": "quiz_user_data"
            }, {
              "item": "62f134571773594fb0aa4ae1",
              "id": "62f15d4d3105ad2edd12060e",
              "blockType": "quiz_user_data"
            }, {
              "item": "62f13bb61773594fb0aa4c12",
              "id": "62f15d5f3105ad2edd12060f",
              "blockType": "quiz_user_data"
            }, {
              "item": "62f13c3a1773594fb0aa4c3a",
              "id": "62f15e1a3105ad2edd120610",
              "blockType": "quiz_user_data"
            }, {
              "item": "62f160381773594fb0aa4fa6",
              "id": "631275ce67bfe2bcc6d66f7c",
              "blockType": "quiz_user_data"
            }, {
              "item": "62f166381773594fb0aa500e",
              "id": "62f166507157ae861f80910c",
              "blockType": "quiz_user_data"
            }, {
              "item": "62f1697a1773594fb0aa5154",
              "id": "62f169847157ae861f809115",
              "blockType": "quiz_user_data"
            }, {
              "item": "62f16b4c1773594fb0aa5274",
              "id": "62f605180b9d2e151c5a03de",
              "blockType": "quiz_user_data"
            }, {
              "items": [{
                "content": "You look awesome! 😍",
                "id": "630476794be3c4b84f175822",
                "blockType": "message"
              }, {
                "content": {
                  "title": "Keep it up!",
                  "subtitle": "We have already started picking soulmates for you",
                  "file": "62f1369c1773594fb0aa4b05"
                }, "id": "6304768b4be3c4b84f175823", "blockType": "matches_message"
              }],
              "answer": [{
                "content": [{"text": "Keep it up!", "id": "630476b74be3c4b84f175825"}],
                "id": "630476b64be3c4b84f175824",
                "blockType": "vertical_actions"
              }],
              "id": "62f1348e0db24716e22910fb",
              "blockType": "breakdown"
            }, {
              "item": "62f61b79f2dc1d8b0966864f",
              "id": "62f61bab23dc634b39a6e9db",
              "blockType": "quiz_user_data"
            }, {
              "items_length": "10",
              "id": "62f1966c7157ae861f80913e",
              "blockType": "quiz_algorithm"
            }, {
              "items": [{
                "content": {
                  "title": "You are on the right track!",
                  "subtitle": "SLMT uses advanced algorithms to select you a pair",
                  "file": "62f16c721773594fb0aa52d3"
                }, "id": "630476c34be3c4b84f175826", "blockType": "matches_message"
              }],
              "answer": [{
                "content": [{"text": "Let’s keep going", "id": "630476dd4be3c4b84f175828"}],
                "id": "630476da4be3c4b84f175827",
                "blockType": "vertical_actions"
              }],
              "id": "62f173fa7c3e890022d77992",
              "blockType": "breakdown"
            }, {
              "items_length": "10",
              "id": "62f196a27157ae861f809140",
              "blockType": "quiz_algorithm"
            }, {
              "items": [{
                "content": {
                  "title": "SLMT has already found your unique features!",
                  "subtitle": "Just a few more questions  to complete the quiz",
                  "file": "62f16cca1773594fb0aa52d7"
                }, "id": "630476ed4be3c4b84f175829", "blockType": "matches_message"
              }],
              "answer": [{
                "content": [{"text": "Let’s keep going", "id": "630476f54be3c4b84f17582b"}],
                "id": "630476f34be3c4b84f17582a",
                "blockType": "vertical_actions"
              }],
              "id": "62f173fa7c3e890022d77993",
              "blockType": "breakdown"
            }, {
              "items_length": "10",
              "id": "62f196a37157ae861f809141",
              "blockType": "quiz_algorithm"
            }, {
              "items": [{
                "content": {
                  "title": "Myth: The easiest way to make best friends is at school  or university.",
                  "subtitle": "But it's actually easier to do it  in SLMT!",
                  "file": "62f16dd11773594fb0aa52db"
                }, "id": "630477244be3c4b84f17582c", "blockType": "matches_message"
              }],
              "answer": [{
                "content": [{"text": "Let’s keep going", "id": "6304772a4be3c4b84f17582e"}],
                "id": "630477294be3c4b84f17582d",
                "blockType": "vertical_actions"
              }],
              "id": "62f173fa7c3e890022d77994",
              "blockType": "breakdown"
            }, {
              "items_length": "10",
              "id": "62f196a07157ae861f80913f",
              "blockType": "quiz_algorithm"
            }, {
              "items": [{
                "content": {
                  "title": "Already 351902 people have found their soulmate!",
                  "subtitle": "Waiting for you to complete  the quiz!",
                  "file": "62f16e161773594fb0aa52df"
                }, "id": "6304774b4be3c4b84f17582f", "blockType": "matches_message"
              }],
              "answer": [{
                "content": [{"text": "Let’s keep going", "id": "6304776f4be3c4b84f175831"}],
                "id": "6304776d4be3c4b84f175830",
                "blockType": "vertical_actions"
              }],
              "id": "62f1723c7157ae861f809130",
              "blockType": "breakdown"
            }, {
              "items_length": "10",
              "id": "62f196a57157ae861f809142",
              "blockType": "quiz_algorithm"
            }, {
              "items": [{
                "content": {
                  "title": "You're in the home stretch!",
                  "subtitle": "Let's answer the final questions to see your soulmate!",
                  "file": "62f173e01773594fb0aa52ff"
                }, "id": "6304777f4be3c4b84f175832", "blockType": "matches_message"
              }],
              "answer": [{
                "content": [{"text": "Let’s keep going", "id": "630477984be3c4b84f175834"}],
                "id": "630477974be3c4b84f175833",
                "blockType": "vertical_actions"
              }],
              "id": "62f173fa7c3e890022d77995",
              "blockType": "breakdown"
            }, {
              "item": "62f60d5df2dc1d8b09668255",
              "id": "62f60d7b3ca6cb5e0e2fcc2d",
              "blockType": "quiz_user_data"
            }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
            "id": "62f131f00db24716e22910f5",
            "blockType": "quizContainer"
          }, {
            "video": "62ff5eef2434775f5b8518af",
            "title": "Finding your <br/>Soulmate",
            "progressItems": [{
              "content": "Define your personality...",
              "id": "62ff5efc5055780e05a7643d"
            }, {
              "content": "Matching interests...",
              "id": "62ff5f015055780e05a7643e"
            }, {"content": "Prepare soulmate’s list", "id": "62ff5f085055780e05a7643f"}],
            "id": "62ff5fb4ef4ae2002298a51c",
            "blockType": "fakeSearch"
          }, {
            "paywall_type": "video",
            "video": "6304c86ddb9bd0f81eee4141",
            "title": "We’ve found your soulmates!",
            "slides": [{
              "title": "Premium users get 10x matched",
              "file": "62ff5f242434775f5b8518b9",
              "id": "62ff5f1c5055780e05a76441"
            }, {
              "title": "Unlimited messages",
              "file": "62ff5f322434775f5b8518c3",
              "id": "62ff5f275055780e05a76442"
            }, {
              "title": "Unlimited swipes",
              "file": "62ff5f402434775f5b8518c9",
              "id": "62ff5f365055780e05a76443"
            }, {
              "title": "See who viewed you",
              "file": "62ff5f4c2434775f5b8518cd",
              "id": "62ff5f415055780e05a76444"
            }, {
              "title": "Detailed personality profile",
              "file": "62ff5f562434775f5b8518d1",
              "id": "62ff5f515055780e05a76445"
            }],
            "items": [{
              "title": "3 days free trial",
              "subtitle": "then $15.99 / month",
              "price": "$35.99",
              "file": "6304c67b8360b48e58c18568",
              "id": "62ff5f585055780e05a76446"
            }, {
              "title": "7 days",
              "subtitle": "$5.99",
              "price": "$15.99",
              "file": "6304c6898360b48e58c1856f",
              "bonus": "+ 3 days free trial",
              "badge": "save 50%",
              "id": "62ff5f685055780e05a76447"
            }],
            "beforeButton": {"title": "3 days free trial, then", "subtitle": "$15.99/month"},
            "button": "Continue",
            "id": "62ff5f125055780e05a76440",
            "blockType": "paywall"
          }, {
            "image": "630d1ba63b3b356de2dbb6be",
            "title": "You’re in the game 🤙",
            "description": "The app is about to be released in your region. All your answers have been saved. We will notify you by email 💌",
            "id": "62ff5f9a5055780e05a76449",
            "blockType": "openSoon"
          }],
        ru: [{
          "image": "631623b59e0e81bd09cb46bf",
          "title": "Найди соулмейта",
          "subtitle": "Сервис, который позволяет найти человека близкого тебе по духу",
          "button": "Погнали!",
          "links": [{
            "text": "Политика конфиденциальности",
            "url": "https://app.soulmate.tech/page/privacy",
            "id": "63162400202dec5c28c3f384"
          }, {
            "text": "Правила пользования",
            "url": "https://app.soulmate.tech/page/terms",
            "id": "63162402202dec5c28c3f385"
          }],
          "info": "SOULMATE TECHNOLOGIES INC 111 Pier Avenue Suite 100, Hermosa Beach, California 90254, USA",
          "id": "6316235c0f7bcc16f8f907de",
          "blockType": "welcome"
        }, {
          "buttons": {"next": "Далее"},
          "items": [{
            "title": "Ответь<br/> на вопросы",
            "content": {"type": "image", "file": "62fcc218860417e8ac4c59cd"},
            "id": "6305073b6c83207a43212ea2"
          }, {
            "title": "Найдем тебе соулмейтов",
            "content": {"type": "image", "file": "62fcc234860417e8ac4c59d1"},
            "id": "63050b856c83207a43212ea3"
          }, {
            "title": "Общайся, влюбляйся",
            "content": {"type": "image", "file": "62fcc260860417e8ac4c59d5"},
            "id": "63050bd06c83207a43212ea4"
          }],
          "id": "62ecd2260db24716e22910c9",
          "blockType": "onboarding"
        }, {
          "title": "Опрос на совместимость",
          "subtitle": "Советы",
          "list": [{
            "title": "Ответь на вопросы о себе,  чтобы мы нашли тебе соулмейта",
            "id": "63050c016c83207a43212ea5"
          }, {
            "title": "Прохождение опроса занимает примерно 10 минут",
            "id": "63050c0a6c83207a43212ea6"
          }, {
            "title": "Отвечай честно. Развлекайся!",
            "emoji": "62e7b9b7ce548b63bae661af",
            "id": "63050c116c83207a43212ea7"
          }],
          "termsOfUseConsent": [{"children": [{"text": "Нажимая «Начать», вы соглашаетесь "}]}, {
            "children": [{"text": "с "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/privacy",
              "newTab": true,
              "children": [{"text": "Политикой конфиденциальности"}]
            }, {"text": " и "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/terms",
              "children": [{"text": "Правилами пользования"}]
            }, {"text": ""}]
          }],
          "button": "Начать",
          "id": "62ecd3120db24716e22910cc",
          "blockType": "beforeQuiz"
        }, {
          "items": [{
            "item": "62ecd4a51773594fb0aa4763",
            "id": "62f15d3c3105ad2edd12060d",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f134571773594fb0aa4ae1",
            "id": "62f15d4d3105ad2edd12060e",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13bb61773594fb0aa4c12",
            "id": "62f15d5f3105ad2edd12060f",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13c3a1773594fb0aa4c3a",
            "id": "62f15e1a3105ad2edd120610",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f160381773594fb0aa4fa6",
            "id": "631275ce67bfe2bcc6d66f7c",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f166381773594fb0aa500e",
            "id": "62f166507157ae861f80910c",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f1697a1773594fb0aa5154",
            "id": "62f169847157ae861f809115",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f16b4c1773594fb0aa5274",
            "id": "62f605180b9d2e151c5a03de",
            "blockType": "quiz_user_data"
          }, {
            "items": [{
              "content": "Выглядишь потрясно! 😍",
              "id": "63127b16662b0f2495eb7d55",
              "blockType": "message"
            }, {
              "content": {
                "title": "Так держать!",
                "subtitle": "Мы уже начали подбирать  для тебя соулмейтов",
                "file": "62f1369c1773594fb0aa4b05"
              }, "id": "63127b2d662b0f2495eb7d56", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127b6d662b0f2495eb7d58"}],
              "id": "63127b6c662b0f2495eb7d57",
              "blockType": "vertical_actions"
            }],
            "id": "62f1348e0db24716e22910fb",
            "blockType": "breakdown"
          }, {
            "item": "62f61b79f2dc1d8b0966864f",
            "id": "62f61bab23dc634b39a6e9db",
            "blockType": "quiz_user_data"
          }, {
            "items_length": "10",
            "id": "62f1966c7157ae861f80913e",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Ты на верном пути!",
                "subtitle": "SLMT использует передовые алгоритмы для точного подбора твоей пары",
                "file": "62f16c721773594fb0aa52d3"
              }, "id": "63127b81662b0f2495eb7d59", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127b9b662b0f2495eb7d5b"}],
              "id": "63127b9a662b0f2495eb7d5a",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77992",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a27157ae861f809140",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Мы уже выявили твои  уникальные особенности!",
                "subtitle": "Осталось совсем немного, чтобы закончить опрос",
                "file": "62fccbfe860417e8ac4c615f"
              }, "id": "63127bd4662b0f2495eb7d5c", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127bfb662b0f2495eb7d5e"}],
              "id": "63127bf3662b0f2495eb7d5d",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77993",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a37157ae861f809141",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Миф: проще всего завести лучших друзей в школе или университете.",
                "subtitle": "Но на самом деле проще это сделать у нас, в SLMT!",
                "file": "62f16dd11773594fb0aa52db"
              }, "id": "63127c11662b0f2495eb7d5f", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127c34662b0f2495eb7d61"}],
              "id": "63127c33662b0f2495eb7d60",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77994",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a07157ae861f80913f",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Уже 3590 людей нашли свою вторую половинку в SLMT",
                "subtitle": "Ждём, когда ты закончишь проходить опрос",
                "file": "62f16e161773594fb0aa52df"
              }, "id": "63127c4e662b0f2495eb7d62", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127c77662b0f2495eb7d64"}],
              "id": "63127c76662b0f2495eb7d63",
              "blockType": "vertical_actions"
            }],
            "id": "62f1723c7157ae861f809130",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a57157ae861f809142",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Почти закончили!",
                "subtitle": "Давай ответим на последние вопросы и найдём соулмейтов",
                "file": "62f173e01773594fb0aa52ff"
              }, "id": "63127c93662b0f2495eb7d66", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127cc3662b0f2495eb7d68"}],
              "id": "63127cc2662b0f2495eb7d67",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77995",
            "blockType": "breakdown"
          }, {
            "item": "62f60d5df2dc1d8b09668255",
            "id": "62f60d7b3ca6cb5e0e2fcc2d",
            "blockType": "quiz_user_data"
          }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
          "id": "62f131f00db24716e22910f5",
          "blockType": "quizContainer"
        }, {
          "video": "62ff5eef2434775f5b8518af",
          "title": "Ищем твоих соулмейтов",
          "progressItems": [{
            "content": "Сравниваем личные качества",
            "id": "63051353028f6d6f6af97a6e"
          }, {"content": "Ищем пару по интересам", "id": "6305135d028f6d6f6af97a6f"}, {
            "content": "Составляем список",
            "id": "630519415d17cdbfa2a3b401"
          }],
          "id": "62ff5fb4ef4ae2002298a51c",
          "blockType": "fakeSearch"
        }, {
          "paywall_type": "video",
          "video": "6304c86ddb9bd0f81eee4141",
          "title": "Мы нашли тебе пару!",
          "slides": [],
          "items": [{
            "title": "3 дня бесплатно",
            "subtitle": "далее 999 ₽ в месяц",
            "id": "63050eee028f6d6f6af97a67"
          }, {"title": "7 дней", "subtitle": "359 ₽", "id": "63050f02028f6d6f6af97a68"}],
          "beforeButton": {},
          "button": "Продолжить",
          "id": "62ff5f125055780e05a76440",
          "blockType": "paywall"
        }, {
          "image": "630d1b3e3b3b356de2dbb524",
          "title": "Ты в игре! 🤙",
          "description": "Приложение вот-вот выйдет в твоём регионе. Мы сохранили все твои ответы. О запуске уведомим по email 💌",
          "id": "62ff5f9a5055780e05a76449",
          "blockType": "openSoon"
        }]
      },
      "_status": "published",
      "createdAt": "2022-08-23T12:31:46.299Z",
      "updatedAt": "2022-09-08T08:46:43.987Z"
    },
    {
      "id": "6304c8b2db9bd0f81eee4144",
      "type": "web",
      "slug": "web_paywall_video",
      "logo": "62e7b98ace548b63bae661a0",
      "items":
        {
          en:
            [{
              "buttons": {"next": "Next"},
              "items": [{
                "title": "Answer the <br/>questions",
                "content": {"type": "image", "file": "62e7b9e1ce548b63bae661b3"},
                "id": "62ecd23b0db24716e22910ca"
              }, {
                "title": "We'll find the <br/>perfect match",
                "content": {"type": "image", "file": "62e7b9f5ce548b63bae661b7"},
                "id": "62ecd2780db24716e22910cb"
              }, {
                "title": "Talk, date & <br/>fall in love",
                "content": {"type": "image", "file": "62e7ba4ece548b63bae661bb"},
                "id": "62f104370db24716e22910e6"
              }],
              "id": "62ecd2260db24716e22910c9",
              "blockType": "onboarding"
            }, {
              "title": "Connection quiz",
              "subtitle": "Tips for quiz",
              "list": [{
                "title": "Answer the questions about yourself to help us find your soulmate.",
                "id": "62ecd3380db24716e22910cd"
              }, {
                "title": "It takes about 10 minutes to complete the quiz.",
                "id": "62ecd3560db24716e22910ce"
              }, {
                "title": "Answer honestly and have fun!",
                "emoji": "62e7b9b7ce548b63bae661af",
                "id": "62ecd3630db24716e22910cf"
              }],
              "button": "Start",
              "id": "62ecd3120db24716e22910cc",
              "blockType": "beforeQuiz"
            }, {
              "items": [{
                "item": "62ecd4a51773594fb0aa4763",
                "id": "62f15d3c3105ad2edd12060d",
                "blockType": "quiz_user_data"
              }, {
                "item": "62f134571773594fb0aa4ae1",
                "id": "62f15d4d3105ad2edd12060e",
                "blockType": "quiz_user_data"
              }, {
                "item": "62f13bb61773594fb0aa4c12",
                "id": "62f15d5f3105ad2edd12060f",
                "blockType": "quiz_user_data"
              }, {
                "item": "62f13c3a1773594fb0aa4c3a",
                "id": "62f15e1a3105ad2edd120610",
                "blockType": "quiz_user_data"
              }, {
                "item": "62f166381773594fb0aa500e",
                "id": "62f166507157ae861f80910c",
                "blockType": "quiz_user_data"
              }, {
                "item": "62f1697a1773594fb0aa5154",
                "id": "62f169847157ae861f809115",
                "blockType": "quiz_user_data"
              }, {
                "item": "62f16b4c1773594fb0aa5274",
                "id": "62f605180b9d2e151c5a03de",
                "blockType": "quiz_user_data"
              }, {
                "items": [{
                  "content": "You look awesome! 😍",
                  "id": "630476794be3c4b84f175822",
                  "blockType": "message"
                }, {
                  "content": {
                    "title": "Keep it up!",
                    "subtitle": "We have already started picking soulmates for you",
                    "file": "62f1369c1773594fb0aa4b05"
                  }, "id": "6304768b4be3c4b84f175823", "blockType": "matches_message"
                }],
                "answer": [{
                  "content": [{"text": "Keep it up!", "id": "630476b74be3c4b84f175825"}],
                  "id": "630476b64be3c4b84f175824",
                  "blockType": "vertical_actions"
                }],
                "id": "62f1348e0db24716e22910fb",
                "blockType": "breakdown"
              }, {
                "item": "62f61b79f2dc1d8b0966864f",
                "id": "62f61bab23dc634b39a6e9db",
                "blockType": "quiz_user_data"
              }, {
                "items_length": "10",
                "id": "62f1966c7157ae861f80913e",
                "blockType": "quiz_algorithm"
              }, {
                "items": [{
                  "content": {
                    "title": "You are on the right track!",
                    "subtitle": "Soulmate uses advanced algorithms to select you a pair",
                    "file": "62f16c721773594fb0aa52d3"
                  }, "id": "630476c34be3c4b84f175826", "blockType": "matches_message"
                }],
                "answer": [{
                  "content": [{"text": "Let’s keep going", "id": "630476dd4be3c4b84f175828"}],
                  "id": "630476da4be3c4b84f175827",
                  "blockType": "vertical_actions"
                }],
                "id": "62f173fa7c3e890022d77992",
                "blockType": "breakdown"
              }, {
                "items_length": "10",
                "id": "62f196a27157ae861f809140",
                "blockType": "quiz_algorithm"
              }, {
                "items": [{
                  "content": {
                    "title": "Soulmate has already found your unique features!",
                    "subtitle": "Just a few more questions to complete the quiz",
                    "file": "62f16cca1773594fb0aa52d7"
                  }, "id": "630476ed4be3c4b84f175829", "blockType": "matches_message"
                }],
                "answer": [{
                  "content": [{"text": "Let’s keep going", "id": "630476f54be3c4b84f17582b"}],
                  "id": "630476f34be3c4b84f17582a",
                  "blockType": "vertical_actions"
                }],
                "id": "62f173fa7c3e890022d77993",
                "blockType": "breakdown"
              }, {
                "items_length": "10",
                "id": "62f196a37157ae861f809141",
                "blockType": "quiz_algorithm"
              }, {
                "items": [{
                  "content": {
                    "title": "Myth: The easiest way to make best friends is at school or university.",
                    "subtitle": "But it's actually easier to do it in Soulmate!",
                    "file": "62f16dd11773594fb0aa52db"
                  }, "id": "630477244be3c4b84f17582c", "blockType": "matches_message"
                }],
                "answer": [{
                  "content": [{"text": "Let’s keep going", "id": "6304772a4be3c4b84f17582e"}],
                  "id": "630477294be3c4b84f17582d",
                  "blockType": "vertical_actions"
                }],
                "id": "62f173fa7c3e890022d77994",
                "blockType": "breakdown"
              }, {
                "items_length": "10",
                "id": "62f196a07157ae861f80913f",
                "blockType": "quiz_algorithm"
              }, {
                "items": [{
                  "content": {
                    "title": "Already 351902 people have found their soulmate!",
                    "subtitle": "Waiting for you to complete the quiz!",
                    "file": "62f16e161773594fb0aa52df"
                  }, "id": "6304774b4be3c4b84f17582f", "blockType": "matches_message"
                }],
                "answer": [{
                  "content": [{"text": "Let’s keep going", "id": "6304776f4be3c4b84f175831"}],
                  "id": "6304776d4be3c4b84f175830",
                  "blockType": "vertical_actions"
                }],
                "id": "62f1723c7157ae861f809130",
                "blockType": "breakdown"
              }, {
                "items_length": "10",
                "id": "62f196a57157ae861f809142",
                "blockType": "quiz_algorithm"
              }, {
                "items": [{
                  "content": {
                    "title": "You're in the home stretch!",
                    "subtitle": "Let's answer the final questions to see your soulmate!",
                    "file": "62f173e01773594fb0aa52ff"
                  }, "id": "6304777f4be3c4b84f175832", "blockType": "matches_message"
                }],
                "answer": [{
                  "content": [{"text": "Let’s keep going", "id": "630477984be3c4b84f175834"}],
                  "id": "630477974be3c4b84f175833",
                  "blockType": "vertical_actions"
                }],
                "id": "62f173fa7c3e890022d77995",
                "blockType": "breakdown"
              }, {
                "item": "62f60d5df2dc1d8b09668255",
                "id": "62f60d7b3ca6cb5e0e2fcc2d",
                "blockType": "quiz_user_data"
              }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
              "id": "62f131f00db24716e22910f5",
              "blockType": "quizContainer"
            }, {
              "video": "62ff5eef2434775f5b8518af",
              "title": "Finding your <br/>Soulmate",
              "progressItems": [{
                "content": "Define your personality...",
                "id": "62ff5efc5055780e05a7643d"
              }, {
                "content": "Matching interests...",
                "id": "62ff5f015055780e05a7643e"
              }, {"content": "Prepare soulmate’s list", "id": "62ff5f085055780e05a7643f"}],
              "id": "62ff5fb4ef4ae2002298a51c",
              "blockType": "fakeSearch"
            }, {
              "paywall_type": "video",
              "video": "6304c86ddb9bd0f81eee4141",
              "title": "We’ve found your soulmates!",
              "slides": [{
                "title": "Premium users get 10x matched",
                "file": "62ff5f242434775f5b8518b9",
                "id": "62ff5f1c5055780e05a76441"
              }, {
                "title": "Unlimited messages",
                "file": "62ff5f322434775f5b8518c3",
                "id": "62ff5f275055780e05a76442"
              }, {
                "title": "Unlimited swipes",
                "file": "62ff5f402434775f5b8518c9",
                "id": "62ff5f365055780e05a76443"
              }, {
                "title": "See who viewed you",
                "file": "62ff5f4c2434775f5b8518cd",
                "id": "62ff5f415055780e05a76444"
              }, {
                "title": "Detailed personality profile",
                "file": "62ff5f562434775f5b8518d1",
                "id": "62ff5f515055780e05a76445"
              }],
              "items": [{
                "title": "1 month",
                "subtitle": "$15.99 + 3 days free trial",
                "price": "$35.99",
                "file": "6304c67b8360b48e58c18568",
                "id": "62ff5f585055780e05a76446"
              }, {
                "title": "7 days",
                "subtitle": "$5.99",
                "price": "$15.99",
                "file": "6304c6898360b48e58c1856f",
                "bonus": "+ 3 days free trial",
                "badge": "save 50%",
                "id": "62ff5f685055780e05a76447"
              }],
              "beforeButton": {"title": "3 days free trial, then", "subtitle": "$15.99/month"},
              "button": "Continue",
              "id": "62ff5f125055780e05a76440",
              "blockType": "paywall"
            }, {
              "image": "630d1ba63b3b356de2dbb6be",
              "title": "You’re in the game 🤙",
              "description": "The app is about to be released in your region. All your answers have been saved. We will notify you by email 💌",
              "id": "62ff5f9a5055780e05a76449",
              "blockType": "openSoon"
            }],
          ru: [{
            "buttons": {"next": "Далее"},
            "items": [{
              "title": "Ответь на вопросы",
              "content": {"type": "image", "file": "62fcc218860417e8ac4c59cd"},
              "id": "6305073b6c83207a43212ea2"
            }, {
              "title": "Найдем тебе соулмейтов",
              "content": {"type": "image", "file": "62fcc234860417e8ac4c59d1"},
              "id": "63050b856c83207a43212ea3"
            }, {
              "title": "Общайся, влюбляйся",
              "content": {"type": "image", "file": "62fcc260860417e8ac4c59d5"},
              "id": "63050bd06c83207a43212ea4"
            }],
            "id": "62ecd2260db24716e22910c9",
            "blockType": "onboarding"
          }, {
            "title": "Опрос на совместимость",
            "subtitle": "Советы",
            "list": [{
              "title": "Ответь на вопросы о себе,  чтобы мы нашли тебе соулмейта",
              "id": "63050c016c83207a43212ea5"
            }, {
              "title": "Прохождение опроса занимает примерно 10 минут",
              "id": "63050c0a6c83207a43212ea6"
            }, {
              "title": "Отвечай честно. Развлекайся!",
              "emoji": "62e7b9b7ce548b63bae661af",
              "id": "63050c116c83207a43212ea7"
            }],
            "button": "Начать",
            "id": "62ecd3120db24716e22910cc",
            "blockType": "beforeQuiz"
          }, {
            "items": [{
              "item": "62ecd4a51773594fb0aa4763",
              "id": "62f15d3c3105ad2edd12060d",
              "blockType": "quiz_user_data"
            }, {
              "item": "62f134571773594fb0aa4ae1",
              "id": "62f15d4d3105ad2edd12060e",
              "blockType": "quiz_user_data"
            }, {
              "item": "62f13bb61773594fb0aa4c12",
              "id": "62f15d5f3105ad2edd12060f",
              "blockType": "quiz_user_data"
            }, {
              "item": "62f13c3a1773594fb0aa4c3a",
              "id": "62f15e1a3105ad2edd120610",
              "blockType": "quiz_user_data"
            }, {
              "item": "62f166381773594fb0aa500e",
              "id": "62f166507157ae861f80910c",
              "blockType": "quiz_user_data"
            }, {
              "item": "62f1697a1773594fb0aa5154",
              "id": "62f169847157ae861f809115",
              "blockType": "quiz_user_data"
            }, {
              "item": "62f16b4c1773594fb0aa5274",
              "id": "62f605180b9d2e151c5a03de",
              "blockType": "quiz_user_data"
            }, {
              "items": [{
                "content": "Выглядишь потрясно! 😍",
                "id": "63050c746c83207a43212ea8",
                "blockType": "message"
              }, {
                "content": {
                  "title": "Так держать!",
                  "subtitle": "Мы уже начали подбирать  для тебя соулмейтов",
                  "file": "62f1369c1773594fb0aa4b05"
                }, "id": "63050c8b6c83207a43212ea9", "blockType": "matches_message"
              }],
              "answer": [{
                "content": [{"text": "Продолжаем!", "id": "63050cb26c83207a43212eab"}],
                "id": "63050cb16c83207a43212eaa",
                "blockType": "vertical_actions"
              }],
              "id": "62f1348e0db24716e22910fb",
              "blockType": "breakdown"
            }, {
              "item": "62f61b79f2dc1d8b0966864f",
              "id": "62f61bab23dc634b39a6e9db",
              "blockType": "quiz_user_data"
            }, {
              "items_length": "10",
              "id": "62f1966c7157ae861f80913e",
              "blockType": "quiz_algorithm"
            }, {
              "items": [{
                "content": {
                  "title": "Ты на верном пути!",
                  "subtitle": "Soulmate использует передовые алгоритмы для точного подбора твоей пары",
                  "file": "62f16c721773594fb0aa52d3"
                }, "id": "63050d596c83207a43212ead", "blockType": "matches_message"
              }],
              "answer": [{
                "content": [{"text": "Продолжаем!", "id": "63050d8b6c83207a43212eaf"}],
                "id": "63050d896c83207a43212eae",
                "blockType": "vertical_actions"
              }],
              "id": "62f173fa7c3e890022d77992",
              "blockType": "breakdown"
            }, {
              "items_length": "10",
              "id": "62f196a27157ae861f809140",
              "blockType": "quiz_algorithm"
            }, {
              "items": [{
                "content": {
                  "title": "Мы уже выявили твои уникальные особенности!",
                  "subtitle": "Осталось совсем немного, чтобы закончить опрос",
                  "file": "62fccbfe860417e8ac4c615f"
                }, "id": "63050da96c83207a43212eb1", "blockType": "matches_message"
              }],
              "answer": [{
                "content": [{"text": "Продолжаем!", "id": "63050e36028f6d6f6af97a62"}],
                "id": "63050e34028f6d6f6af97a61",
                "blockType": "vertical_actions"
              }],
              "id": "62f173fa7c3e890022d77993",
              "blockType": "breakdown"
            }, {
              "items_length": "10",
              "id": "62f196a37157ae861f809141",
              "blockType": "quiz_algorithm"
            }, {
              "items": [{
                "content": {
                  "title": "Миф: проще всего завести лучших друзей в школе или университете.",
                  "subtitle": "Но на самом деле проще это сделать у нас, в Soulmate!",
                  "file": "62f16dd11773594fb0aa52db"
                }, "id": "63050e4b028f6d6f6af97a63", "blockType": "matches_message"
              }],
              "answer": [{
                "content": [{"text": "Продолжаем!", "id": "630512c3028f6d6f6af97a6d"}],
                "id": "630512c2028f6d6f6af97a6c",
                "blockType": "vertical_actions"
              }],
              "id": "62f173fa7c3e890022d77994",
              "blockType": "breakdown"
            }, {
              "items_length": "10",
              "id": "62f196a07157ae861f80913f",
              "blockType": "quiz_algorithm"
            }, {
              "items": [{
                "content": {
                  "title": "Уже 351902 людей нашли свою вторую половинку в Soulmate",
                  "subtitle": "Ждём, когда ты закончишь проходить опрос",
                  "file": "62f16e161773594fb0aa52df"
                }, "id": "6305123b028f6d6f6af97a69", "blockType": "matches_message"
              }],
              "answer": [{
                "content": [{"text": "Продолжаем!", "id": "63051259028f6d6f6af97a6b"}],
                "id": "63051258028f6d6f6af97a6a",
                "blockType": "vertical_actions"
              }],
              "id": "62f1723c7157ae861f809130",
              "blockType": "breakdown"
            }, {
              "items_length": "10",
              "id": "62f196a57157ae861f809142",
              "blockType": "quiz_algorithm"
            }, {
              "items": [{
                "content": {
                  "title": "Почти закончили!",
                  "subtitle": "Давай ответим на последние вопросы и найдём тебе пару",
                  "file": "62f173e01773594fb0aa52ff"
                }, "id": "63050ea7028f6d6f6af97a64", "blockType": "matches_message"
              }],
              "answer": [{
                "content": [{"text": "Продолжаем!", "id": "63050ecc028f6d6f6af97a66"}],
                "id": "63050eca028f6d6f6af97a65",
                "blockType": "vertical_actions"
              }],
              "id": "62f173fa7c3e890022d77995",
              "blockType": "breakdown"
            }, {
              "item": "62f60d5df2dc1d8b09668255",
              "id": "62f60d7b3ca6cb5e0e2fcc2d",
              "blockType": "quiz_user_data"
            }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
            "id": "62f131f00db24716e22910f5",
            "blockType": "quizContainer"
          }, {
            "video": "62ff5eef2434775f5b8518af",
            "title": "Ищем твоих соулмейтов",
            "progressItems": [{
              "content": "Сравниваем личные качества",
              "id": "63051353028f6d6f6af97a6e"
            }, {"content": "Ищем пару по интересам", "id": "6305135d028f6d6f6af97a6f"}, {
              "content": "Составляем список",
              "id": "630519415d17cdbfa2a3b401"
            }],
            "id": "62ff5fb4ef4ae2002298a51c",
            "blockType": "fakeSearch"
          }, {
            "paywall_type": "video",
            "video": "6304c86ddb9bd0f81eee4141",
            "title": "Мы нашли тебе пару!",
            "slides": [],
            "items": [{
              "title": "1 месяц",
              "subtitle": "999 ₽ + 3 дня пробный период",
              "id": "63050eee028f6d6f6af97a67"
            }, {"title": "7 дней", "subtitle": "359 ₽", "id": "63050f02028f6d6f6af97a68"}],
            "beforeButton": {},
            "button": "Продолжить",
            "id": "62ff5f125055780e05a76440",
            "blockType": "paywall"
          }, {
            "image": "6306740e2363026a99320fe5",
            "title": "Ты в игре! 🤙",
            "description": "Приложение вот-вот выйдет в твоём регионе. Мы сохранили все твои ответы. О запуске уведомим по email 💌",
            "id": "62ff5f9a5055780e05a76449",
            "blockType": "openSoon"
          }]
        },
      "_status": "published",
      "createdAt": "2022-08-23T12:31:46.299Z",
      "updatedAt": "2022-08-30T07:22:18.928Z"
    },
    {
      "id": "6305d5280fcf218ce835fe85",
      "type": "web",
      "slug": "web_slmt_paywall_timeline",
      "logo": "62e7b98ace548b63bae661a0",
      "items": {
        en: [{
          "image": "6316233f9e0e81bd09cb45c6",
          "title": "Find your soulmate",
          "subtitle": "A service that helps you find the person  who is closest to your soul",
          "button": "Let’s do it",
          "links": [{
            "text": "Privacy policy",
            "url": "https://app.soulmate.tech/page/privacy",
            "id": "631622e20f7bcc16f8f907db"
          }, {"text": "Terms of use", "url": "https://app.soulmate.tech/page/terms", "id": "631622e30f7bcc16f8f907dc"}],
          "info": "SOULMATE TECHNOLOGIES INC 111 Pier Avenue Suite 100, Hermosa Beach, California 90254, USA",
          "id": "631622ae0f7bcc16f8f907da",
          "blockType": "welcome"
        }, {
          "buttons": {"next": "Next"},
          "items": [{
            "title": "Answer the <br/>questions",
            "content": {"type": "image", "file": "62e7b9e1ce548b63bae661b3"},
            "id": "62ecd23b0db24716e22910ca"
          }, {
            "title": "We'll find the <br/>perfect match",
            "content": {"type": "image", "file": "62e7b9f5ce548b63bae661b7"},
            "id": "62ecd2780db24716e22910cb"
          }, {
            "title": "Talk, date & <br/>fall in love",
            "content": {"type": "image", "file": "62e7ba4ece548b63bae661bb"},
            "id": "62f104370db24716e22910e6"
          }],
          "id": "62ecd2260db24716e22910c9",
          "blockType": "onboarding"
        }, {
          "title": "Connection quiz",
          "subtitle": "Tips for quiz",
          "list": [{
            "title": "Answer the questions about yourself to help us find your soulmate.",
            "id": "62ecd3380db24716e22910cd"
          }, {
            "title": "It takes about 10 minutes to complete the quiz.",
            "id": "62ecd3560db24716e22910ce"
          }, {
            "title": "Answer honestly and have fun!",
            "emoji": "62e7b9b7ce548b63bae661af",
            "id": "62ecd3630db24716e22910cf"
          }],
          "termsOfUseConsent": [{
            "children": [{"text": "By starting, you agree to Soulmate’s "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/terms",
              "newTab": true,
              "children": [{"text": "Terms of Use"}]
            }, {"text": " "}]
          }, {
            "children": [{"text": "and "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/privacy",
              "newTab": true,
              "children": [{"text": "Privacy Policy"}]
            }, {"text": ""}]
          }],
          "button": "Start",
          "id": "62ecd3120db24716e22910cc",
          "blockType": "beforeQuiz"
        }, {
          "items": [{
            "item": "62ecd4a51773594fb0aa4763",
            "id": "62f15d3c3105ad2edd12060d",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f134571773594fb0aa4ae1",
            "id": "62f15d4d3105ad2edd12060e",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13bb61773594fb0aa4c12",
            "id": "62f15d5f3105ad2edd12060f",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13c3a1773594fb0aa4c3a",
            "id": "62f15e1a3105ad2edd120610",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f160381773594fb0aa4fa6",
            "id": "63127612637777048f12bc2a",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f166381773594fb0aa500e",
            "id": "62f166507157ae861f80910c",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f1697a1773594fb0aa5154",
            "id": "62f169847157ae861f809115",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f16b4c1773594fb0aa5274",
            "id": "62f605180b9d2e151c5a03de",
            "blockType": "quiz_user_data"
          }, {
            "items": [{
              "content": "You look awesome! 😍",
              "id": "630476794be3c4b84f175822",
              "blockType": "message"
            }, {
              "content": {
                "title": "Keep it up!",
                "subtitle": "We have already started picking soulmates for you",
                "file": "62f1369c1773594fb0aa4b05"
              }, "id": "6304768b4be3c4b84f175823", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Keep it up!", "id": "630476b74be3c4b84f175825"}],
              "id": "630476b64be3c4b84f175824",
              "blockType": "vertical_actions"
            }],
            "id": "62f1348e0db24716e22910fb",
            "blockType": "breakdown"
          }, {
            "item": "62f61b79f2dc1d8b0966864f",
            "id": "62f61bab23dc634b39a6e9db",
            "blockType": "quiz_user_data"
          }, {
            "items_length": "10",
            "id": "62f1966c7157ae861f80913e",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "You are on the right track!",
                "subtitle": "SLMT uses advanced algorithms to select you a pair",
                "file": "62f16c721773594fb0aa52d3"
              }, "id": "630476c34be3c4b84f175826", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630476dd4be3c4b84f175828"}],
              "id": "630476da4be3c4b84f175827",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77992",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a27157ae861f809140",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "SLMT has already found your unique features!",
                "subtitle": "Just a few more questions to complete the quiz",
                "file": "62f16cca1773594fb0aa52d7"
              }, "id": "630476ed4be3c4b84f175829", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630476f54be3c4b84f17582b"}],
              "id": "630476f34be3c4b84f17582a",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77993",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a37157ae861f809141",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Myth: The easiest way to make best friends is at school or university.",
                "subtitle": "But it's actually easier to do it in SLMT!",
                "file": "62f16dd11773594fb0aa52db"
              }, "id": "630477244be3c4b84f17582c", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "6304772a4be3c4b84f17582e"}],
              "id": "630477294be3c4b84f17582d",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77994",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a07157ae861f80913f",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Already 351902 people have found their soulmate!",
                "subtitle": "Waiting for you to complete the quiz!",
                "file": "62f16e161773594fb0aa52df"
              }, "id": "6304774b4be3c4b84f17582f", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "6304776f4be3c4b84f175831"}],
              "id": "6304776d4be3c4b84f175830",
              "blockType": "vertical_actions"
            }],
            "id": "62f1723c7157ae861f809130",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a57157ae861f809142",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "You're in the home stretch!",
                "subtitle": "Let's answer the final questions to see your soulmate!",
                "file": "62f173e01773594fb0aa52ff"
              }, "id": "6304777f4be3c4b84f175832", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630477984be3c4b84f175834"}],
              "id": "630477974be3c4b84f175833",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77995",
            "blockType": "breakdown"
          }, {
            "item": "62f60d5df2dc1d8b09668255",
            "id": "62f60d7b3ca6cb5e0e2fcc2d",
            "blockType": "quiz_user_data"
          }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
          "id": "62f131f00db24716e22910f5",
          "blockType": "quizContainer"
        }, {
          "video": "62ff5eef2434775f5b8518af",
          "title": "Finding your <br/>Soulmate",
          "progressItems": [{
            "content": "Define your personality",
            "id": "62ff5efc5055780e05a7643d"
          }, {"content": "Matching interests", "id": "62ff5f015055780e05a7643e"}, {
            "content": "Prepare soulmate’s list",
            "id": "62ff5f085055780e05a7643f"
          }],
          "id": "62ff5fb4ef4ae2002298a51c",
          "blockType": "fakeSearch"
        }, {
          "paywall_type": "timeline",
          "title": "Start your free trial",
          "slides": [{
            "title": "Premium users get 10x matched",
            "file": "62ff5f242434775f5b8518b9",
            "id": "62ff5f1c5055780e05a76441"
          }, {
            "title": "Unlimited messages",
            "file": "62ff5f322434775f5b8518c3",
            "id": "62ff5f275055780e05a76442"
          }, {
            "title": "Unlimited swipes",
            "file": "62ff5f402434775f5b8518c9",
            "id": "62ff5f365055780e05a76443"
          }, {
            "title": "See who viewed you",
            "file": "62ff5f4c2434775f5b8518cd",
            "id": "62ff5f415055780e05a76444"
          }, {
            "title": "Detailed personality profile",
            "file": "62ff5f562434775f5b8518d1",
            "id": "62ff5f515055780e05a76445"
          }],
          "items": [{
            "title": "Today",
            "subtitle": "Start your free trial to unlock all Premium features",
            "price": "$35.99",
            "file": "6304c67b8360b48e58c18568",
            "id": "62ff5f585055780e05a76446"
          }, {
            "title": "Day 2",
            "subtitle": "Get a reminder about your trial ending",
            "price": "$15.99",
            "file": "6304c6898360b48e58c1856f",
            "bonus": "+ 3 days free trial",
            "badge": "save 50%",
            "id": "62ff5f685055780e05a76447"
          }, {
            "title": "Day 3",
            "subtitle": "Your subscription starts, cancel anytime before",
            "price": "$5.99",
            "file": "6304c6918360b48e58c18576",
            "id": "62ff5f835055780e05a76448"
          }],
          "beforeButton": {"title": "3 days free trial, then", "subtitle": "$15.99/month"},
          "button": "Continue",
          "id": "62ff5f125055780e05a76440",
          "blockType": "paywall"
        }, {
          "image": "630d1ba63b3b356de2dbb6be",
          "title": "You’re in the game 🤙",
          "description": "The app is about to be released in your region. All your answers have been saved. We will notify you by email 💌",
          "id": "62ff5f9a5055780e05a76449",
          "blockType": "openSoon"
        }],
        ru: [{
          "image": "631623b59e0e81bd09cb46bf",
          "title": "Найди соулмейта",
          "subtitle": "Сервис, который позволяет найти человека близкого тебе по духу",
          "button": "Погнали!",
          "links": [{
            "text": "Политика конфиденциальности",
            "url": "https://app.soulmate.tech/page/privacy",
            "id": "631623ec202dec5c28c3f382"
          }, {
            "text": "Правила пользования",
            "url": "https://app.soulmate.tech/page/terms",
            "id": "631623ed202dec5c28c3f383"
          }],
          "info": "SOULMATE TECHNOLOGIES INC 111 Pier Avenue Suite 100, Hermosa Beach, California 90254, USA",
          "id": "631622ae0f7bcc16f8f907da",
          "blockType": "welcome"
        }, {
          "buttons": {"next": "Далее"},
          "items": [{
            "title": "Ответь<br/> на вопросы",
            "content": {"type": "image", "file": "62fcc218860417e8ac4c59cd"},
            "id": "63051c62b3a6a1d642b163db"
          }, {
            "title": "Найдем тебе соулмейтов",
            "content": {"type": "image", "file": "62fcc234860417e8ac4c59d1"},
            "id": "63051c75b3a6a1d642b163dc"
          }, {
            "title": "Общайся, влюбляйся",
            "content": {"type": "image", "file": "62fcc260860417e8ac4c59d5"},
            "id": "63051caeb3a6a1d642b163dd"
          }],
          "id": "62ecd2260db24716e22910c9",
          "blockType": "onboarding"
        }, {
          "title": "Опрос на совместимость",
          "subtitle": "Советы",
          "list": [{
            "title": "Ответь на вопросы о себе, чтобы мы нашли тебе соулмейта",
            "id": "63051cd7b3a6a1d642b163de"
          }, {
            "title": "Прохождение опроса занимает примерно 10 минут",
            "id": "63051cdab3a6a1d642b163df"
          }, {
            "title": "Отвечай честно. Развлекайся!",
            "emoji": "62e7b9b7ce548b63bae661af",
            "id": "63051ce7b3a6a1d642b163e0"
          }],
          "termsOfUseConsent": [{"children": [{"text": "Нажимая «Начать», вы соглашаетесь "}]}, {
            "children": [{"text": "с "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/privacy",
              "newTab": true,
              "children": [{"text": "Политикой конфиденциальности"}]
            }, {"text": " и "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/terms",
              "children": [{"text": "Правилами пользования"}]
            }, {"text": ""}]
          }],
          "button": "Начать",
          "id": "62ecd3120db24716e22910cc",
          "blockType": "beforeQuiz"
        }, {
          "items": [{
            "item": "62ecd4a51773594fb0aa4763",
            "id": "62f15d3c3105ad2edd12060d",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f134571773594fb0aa4ae1",
            "id": "62f15d4d3105ad2edd12060e",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13bb61773594fb0aa4c12",
            "id": "62f15d5f3105ad2edd12060f",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13c3a1773594fb0aa4c3a",
            "id": "62f15e1a3105ad2edd120610",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f160381773594fb0aa4fa6",
            "id": "63127612637777048f12bc2a",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f166381773594fb0aa500e",
            "id": "62f166507157ae861f80910c",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f1697a1773594fb0aa5154",
            "id": "62f169847157ae861f809115",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f16b4c1773594fb0aa5274",
            "id": "62f605180b9d2e151c5a03de",
            "blockType": "quiz_user_data"
          }, {
            "items": [{
              "content": "Выглядишь потрясно! 😍",
              "id": "63127b1d1ad6a12dedd441d1",
              "blockType": "message"
            }, {
              "content": {
                "title": "Так держать!",
                "subtitle": "Мы уже начали подбирать  для тебя соулмейтов",
                "file": "62f1369c1773594fb0aa4b05"
              }, "id": "63127b2a1ad6a12dedd441d2", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127b731ad6a12dedd441d4"}],
              "id": "63127b731ad6a12dedd441d3",
              "blockType": "vertical_actions"
            }],
            "id": "62f1348e0db24716e22910fb",
            "blockType": "breakdown"
          }, {
            "item": "62f61b79f2dc1d8b0966864f",
            "id": "62f61bab23dc634b39a6e9db",
            "blockType": "quiz_user_data"
          }, {
            "items_length": "10",
            "id": "62f1966c7157ae861f80913e",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Ты на верном пути!",
                "subtitle": "SLMT использует передовые алгоритмы для точного подбора твоей пары",
                "file": "62f16c721773594fb0aa52d3"
              }, "id": "63127bae1ad6a12dedd441d5", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127bc11ad6a12dedd441d7"}],
              "id": "63127bc01ad6a12dedd441d6",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77992",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a27157ae861f809140",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Мы уже выявили твои  уникальные особенности!",
                "subtitle": "Осталось совсем немного, чтобы закончить опрос",
                "file": "62fccbfe860417e8ac4c615f"
              }, "id": "63127bd91ad6a12dedd441d8", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127c011ad6a12dedd441da"}],
              "id": "63127c001ad6a12dedd441d9",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77993",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a37157ae861f809141",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Миф: проще всего завести лучших друзей в школе или университете.",
                "subtitle": "Но на самом деле проще это сделать у нас, в SLMT!",
                "file": "62f16dd11773594fb0aa52db"
              }, "id": "63127c171ad6a12dedd441db", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127c3e1ad6a12dedd441dd"}],
              "id": "63127c2f1ad6a12dedd441dc",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77994",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a07157ae861f80913f",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Уже 3590 людей нашли свою вторую половинку в SLMT",
                "subtitle": "Ждём, когда ты закончишь проходить опрос",
                "file": "62f16e161773594fb0aa52df"
              }, "id": "63127c541ad6a12dedd441de", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127c721ad6a12dedd441e0"}],
              "id": "63127c711ad6a12dedd441df",
              "blockType": "vertical_actions"
            }],
            "id": "62f1723c7157ae861f809130",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a57157ae861f809142",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Почти закончили!",
                "subtitle": "Давай ответим на последние вопросы и найдём соулмейтов",
                "file": "62f173e01773594fb0aa52ff"
              }, "id": "63127c991ad6a12dedd441e1", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127cc61ad6a12dedd441e3"}],
              "id": "63127cb71ad6a12dedd441e2",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77995",
            "blockType": "breakdown"
          }, {
            "item": "62f60d5df2dc1d8b09668255",
            "id": "62f60d7b3ca6cb5e0e2fcc2d",
            "blockType": "quiz_user_data"
          }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
          "id": "62f131f00db24716e22910f5",
          "blockType": "quizContainer"
        }, {
          "video": "62ff5eef2434775f5b8518af",
          "title": "Ищем твоих соулмейтов",
          "progressItems": [{
            "content": "Сравниваем личные качества",
            "id": "63051e23b3a6a1d642b163f5"
          }, {"content": "Ищем пару по интересам", "id": "63051e2ab3a6a1d642b163f6"}, {
            "content": "Составляем список",
            "id": "63051e32b3a6a1d642b163f7"
          }],
          "id": "62ff5fb4ef4ae2002298a51c",
          "blockType": "fakeSearch"
        }, {
          "paywall_type": "timeline",
          "title": "Начни бесплатно",
          "slides": [],
          "items": [{
            "title": "Сегодня — полный доступ бесплатно",
            "subtitle": "Начни пробный период и попробуй все возможности",
            "file": "6304c67b8360b48e58c18568",
            "id": "63051e76b3a6a1d642b163f8"
          }, {
            "title": "День 2 — напоминание",
            "subtitle": "Пришлём уведомление о скором завершении пробного периода",
            "file": "6304c6898360b48e58c1856f",
            "id": "63051e8bb3a6a1d642b163f9"
          }, {
            "title": "День 3 — конец триала",
            "subtitle": "Начнётся подписка, до этого можно будет отменить",
            "file": "6304c6918360b48e58c18576",
            "id": "63051ec2b3a6a1d642b163fa"
          }],
          "beforeButton": {"title": "3 дня бесплатно", "subtitle": "далее 999 ₽ в месяц"},
          "button": "Продолжить бесплатно",
          "id": "62ff5f125055780e05a76440",
          "blockType": "paywall"
        }, {
          "image": "630d1b3e3b3b356de2dbb524",
          "title": "Ты в игре! 🤙",
          "description": "Приложение вот-вот выйдет в твоём регионе. Мы сохранили все твои ответы. О запуске уведомим по email 💌",
          "id": "62ff5f9a5055780e05a76449",
          "blockType": "openSoon"
        }]
      },
      "_status": "published",
      "createdAt": "2022-08-23T12:27:51.760Z",
      "updatedAt": "2022-09-08T09:41:59.931Z"
    },
    {
      "id": "6304c7c7db9bd0f81eee40d3",
      "type": "web",
      "slug": "web_paywall_timeline",
      "logo": "62e7b98ace548b63bae661a0",
      "items": {
        en: [{
          "buttons": {"next": "Next"},
          "items": [{
            "title": "Answer the <br/>questions",
            "content": {"type": "image", "file": "62e7b9e1ce548b63bae661b3"},
            "id": "62ecd23b0db24716e22910ca"
          }, {
            "title": "We'll find the <br/>perfect match",
            "content": {"type": "image", "file": "62e7b9f5ce548b63bae661b7"},
            "id": "62ecd2780db24716e22910cb"
          }, {
            "title": "Talk, date & <br/>fall in love",
            "content": {"type": "image", "file": "62e7ba4ece548b63bae661bb"},
            "id": "62f104370db24716e22910e6"
          }],
          "id": "62ecd2260db24716e22910c9",
          "blockType": "onboarding"
        }, {
          "title": "Connection quiz",
          "subtitle": "Tips for quiz",
          "list": [{
            "title": "Answer the questions about yourself  to help us find your soulmate.",
            "id": "62ecd3380db24716e22910cd"
          }, {
            "title": "It takes about 10 minutes to complete  the quiz.",
            "id": "62ecd3560db24716e22910ce"
          }, {
            "title": "Answer honestly and have fun!",
            "emoji": "62e7b9b7ce548b63bae661af",
            "id": "62ecd3630db24716e22910cf"
          }],
          "button": "Start",
          "id": "62ecd3120db24716e22910cc",
          "blockType": "beforeQuiz"
        }, {
          "items": [{
            "item": "62ecd4a51773594fb0aa4763",
            "id": "62f15d3c3105ad2edd12060d",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f134571773594fb0aa4ae1",
            "id": "62f15d4d3105ad2edd12060e",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13bb61773594fb0aa4c12",
            "id": "62f15d5f3105ad2edd12060f",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13c3a1773594fb0aa4c3a",
            "id": "62f15e1a3105ad2edd120610",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f166381773594fb0aa500e",
            "id": "62f166507157ae861f80910c",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f1697a1773594fb0aa5154",
            "id": "62f169847157ae861f809115",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f16b4c1773594fb0aa5274",
            "id": "62f605180b9d2e151c5a03de",
            "blockType": "quiz_user_data"
          }, {
            "items": [{
              "content": "You look awesome! 😍",
              "id": "630476794be3c4b84f175822",
              "blockType": "message"
            }, {
              "content": {
                "title": "Keep it up!",
                "subtitle": "We have already started picking soulmates for you",
                "file": "62f1369c1773594fb0aa4b05"
              }, "id": "6304768b4be3c4b84f175823", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Keep it up!", "id": "630476b74be3c4b84f175825"}],
              "id": "630476b64be3c4b84f175824",
              "blockType": "vertical_actions"
            }],
            "id": "62f1348e0db24716e22910fb",
            "blockType": "breakdown"
          }, {
            "item": "62f61b79f2dc1d8b0966864f",
            "id": "62f61bab23dc634b39a6e9db",
            "blockType": "quiz_user_data"
          }, {
            "items_length": "10",
            "id": "62f1966c7157ae861f80913e",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "You are on the right track!",
                "subtitle": "Soulmate uses advanced algorithms to select you a pair",
                "file": "62f16c721773594fb0aa52d3"
              }, "id": "630476c34be3c4b84f175826", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630476dd4be3c4b84f175828"}],
              "id": "630476da4be3c4b84f175827",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77992",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a27157ae861f809140",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Soulmate has already found your unique features!",
                "subtitle": "Just a few more questions  to complete the quiz",
                "file": "62f16cca1773594fb0aa52d7"
              }, "id": "630476ed4be3c4b84f175829", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630476f54be3c4b84f17582b"}],
              "id": "630476f34be3c4b84f17582a",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77993",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a37157ae861f809141",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Myth: The easiest way to make best friends is at school  or university.",
                "subtitle": "But it's actually easier to do it  in Soulmate!",
                "file": "62f16dd11773594fb0aa52db"
              }, "id": "630477244be3c4b84f17582c", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "6304772a4be3c4b84f17582e"}],
              "id": "630477294be3c4b84f17582d",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77994",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a07157ae861f80913f",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Already 351902 people have found their soulmate!",
                "subtitle": "Waiting for you to complete  the quiz!",
                "file": "62f16e161773594fb0aa52df"
              }, "id": "6304774b4be3c4b84f17582f", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "6304776f4be3c4b84f175831"}],
              "id": "6304776d4be3c4b84f175830",
              "blockType": "vertical_actions"
            }],
            "id": "62f1723c7157ae861f809130",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a57157ae861f809142",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "You're in the home stretch!",
                "subtitle": "Let's answer the final questions to see your soulmate!",
                "file": "62f173e01773594fb0aa52ff"
              }, "id": "6304777f4be3c4b84f175832", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630477984be3c4b84f175834"}],
              "id": "630477974be3c4b84f175833",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77995",
            "blockType": "breakdown"
          }, {
            "item": "62f60d5df2dc1d8b09668255",
            "id": "62f60d7b3ca6cb5e0e2fcc2d",
            "blockType": "quiz_user_data"
          }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
          "id": "62f131f00db24716e22910f5",
          "blockType": "quizContainer"
        }, {
          "video": "62ff5eef2434775f5b8518af",
          "title": "Finding your <br/>Soulmate",
          "progressItems": [{
            "content": "Define your personality...",
            "id": "62ff5efc5055780e05a7643d"
          }, {
            "content": "Matching interests...",
            "id": "62ff5f015055780e05a7643e"
          }, {"content": "Prepare soulmate’s list", "id": "62ff5f085055780e05a7643f"}],
          "id": "62ff5fb4ef4ae2002298a51c",
          "blockType": "fakeSearch"
        }, {
          "paywall_type": "timeline",
          "title": "Start your free trial",
          "slides": [{
            "title": "Premium users get 10x matched",
            "file": "62ff5f242434775f5b8518b9",
            "id": "62ff5f1c5055780e05a76441"
          }, {
            "title": "Unlimited messages",
            "file": "62ff5f322434775f5b8518c3",
            "id": "62ff5f275055780e05a76442"
          }, {
            "title": "Unlimited swipes",
            "file": "62ff5f402434775f5b8518c9",
            "id": "62ff5f365055780e05a76443"
          }, {
            "title": "See who viewed you",
            "file": "62ff5f4c2434775f5b8518cd",
            "id": "62ff5f415055780e05a76444"
          }, {
            "title": "Detailed personality profile",
            "file": "62ff5f562434775f5b8518d1",
            "id": "62ff5f515055780e05a76445"
          }],
          "items": [{
            "title": "Today",
            "subtitle": "Start your free trial to unlock all Premium features",
            "price": "$35.99",
            "file": "6304c67b8360b48e58c18568",
            "id": "62ff5f585055780e05a76446"
          }, {
            "title": "Day 2",
            "subtitle": "Get a reminder about your trial ending",
            "price": "$15.99",
            "file": "6304c6898360b48e58c1856f",
            "bonus": "+ 3 days free trial",
            "badge": "save 50%",
            "id": "62ff5f685055780e05a76447"
          }, {
            "title": "Day 3",
            "subtitle": "Your subscription starts, cancel anytime before",
            "price": "$5.99",
            "file": "6304c6918360b48e58c18576",
            "id": "62ff5f835055780e05a76448"
          }],
          "beforeButton": {"title": "3 days free trial, then", "subtitle": "$15.99/month"},
          "button": "Continue",
          "id": "62ff5f125055780e05a76440",
          "blockType": "paywall"
        }, {
          "image": null,
          "title": "We’re still creating the future of datings",
          "description": "And we’re still building our service. As soon as it's ready, we'll send you an email notification.",
          "id": "62ff5f9a5055780e05a76449",
          "blockType": "openSoon"
        }],
        ru: [{
          "buttons": {"next": "Далее"},
          "items": [{
            "title": "Ответь на вопросы",
            "content": {"type": "image", "file": "62fcc218860417e8ac4c59cd"},
            "id": "63051c62b3a6a1d642b163db"
          }, {
            "title": "Найдем тебе соулмейтов",
            "content": {"type": "image", "file": "62fcc234860417e8ac4c59d1"},
            "id": "63051c75b3a6a1d642b163dc"
          }, {
            "title": "Общайся, влюбляйся",
            "content": {"type": "image", "file": "62fcc260860417e8ac4c59d5"},
            "id": "63051caeb3a6a1d642b163dd"
          }],
          "id": "62ecd2260db24716e22910c9",
          "blockType": "onboarding"
        }, {
          "title": "Опрос на совместимость",
          "subtitle": "Советы",
          "list": [{
            "title": "Ответь на вопросы о себе,  чтобы мы нашли тебе соулмейта",
            "id": "63051cd7b3a6a1d642b163de"
          }, {
            "title": "Прохождение опроса занимает примерно 10 минут",
            "id": "63051cdab3a6a1d642b163df"
          }, {
            "title": "Отвечай честно. Развлекайся!",
            "emoji": "62e7b9b7ce548b63bae661af",
            "id": "63051ce7b3a6a1d642b163e0"
          }],
          "button": "Начать",
          "id": "62ecd3120db24716e22910cc",
          "blockType": "beforeQuiz"
        }, {
          "items": [{
            "item": "62ecd4a51773594fb0aa4763",
            "id": "62f15d3c3105ad2edd12060d",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f134571773594fb0aa4ae1",
            "id": "62f15d4d3105ad2edd12060e",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13bb61773594fb0aa4c12",
            "id": "62f15d5f3105ad2edd12060f",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13c3a1773594fb0aa4c3a",
            "id": "62f15e1a3105ad2edd120610",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f166381773594fb0aa500e",
            "id": "62f166507157ae861f80910c",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f1697a1773594fb0aa5154",
            "id": "62f169847157ae861f809115",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f16b4c1773594fb0aa5274",
            "id": "62f605180b9d2e151c5a03de",
            "blockType": "quiz_user_data"
          }, {
            "items": [{
              "content": "Выглядишь потрясно! 😍",
              "id": "63051d11b3a6a1d642b163e1",
              "blockType": "message"
            }, {
              "content": {
                "title": "Так держать!",
                "subtitle": "Мы уже начали подбирать  для тебя соулмейтов",
                "file": "62f1369c1773594fb0aa4b05"
              }, "id": "63051d15b3a6a1d642b163e2", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63051d35b3a6a1d642b163e4"}],
              "id": "63051d2db3a6a1d642b163e3",
              "blockType": "vertical_actions"
            }],
            "id": "62f1348e0db24716e22910fb",
            "blockType": "breakdown"
          }, {
            "item": "62f61b79f2dc1d8b0966864f",
            "id": "62f61bab23dc634b39a6e9db",
            "blockType": "quiz_user_data"
          }, {
            "items_length": "10",
            "id": "62f1966c7157ae861f80913e",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Ты на верном пути!",
                "subtitle": "Soulmate использует передовые алгоритмы для точного подбора твоей пары",
                "file": "62f16c721773594fb0aa52d3"
              }, "id": "63051d4fb3a6a1d642b163e6", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63051d63b3a6a1d642b163e8"}],
              "id": "63051d62b3a6a1d642b163e7",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77992",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a27157ae861f809140",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Мы уже выявили твои уникальные особенности!",
                "subtitle": "Осталось совсем немного, чтобы закончить опрос",
                "file": "62fccbfe860417e8ac4c615f"
              }, "id": "63051d79b3a6a1d642b163e9", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63051d87b3a6a1d642b163eb"}],
              "id": "63051d86b3a6a1d642b163ea",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77993",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a37157ae861f809141",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Миф: проще всего завести лучших друзей в школе или университете.",
                "subtitle": "Но на самом деле проще это сделать у нас, в Soulmate!",
                "file": "62f16dd11773594fb0aa52db"
              }, "id": "63051d98b3a6a1d642b163ec", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63051da8b3a6a1d642b163ee"}],
              "id": "63051da7b3a6a1d642b163ed",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77994",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a07157ae861f80913f",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Уже 351902 людей нашли свою вторую половинку в Soulmate",
                "subtitle": "Ждём, когда ты закончишь проходить опрос",
                "file": "62f16e161773594fb0aa52df"
              }, "id": "63051dbfb3a6a1d642b163ef", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63051dd2b3a6a1d642b163f1"}],
              "id": "63051dd1b3a6a1d642b163f0",
              "blockType": "vertical_actions"
            }],
            "id": "62f1723c7157ae861f809130",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a57157ae861f809142",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Почти закончили!",
                "subtitle": "Давай ответим на последние вопросы и найдём тебе пару",
                "file": "62f173e01773594fb0aa52ff"
              }, "id": "63051de3b3a6a1d642b163f2", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63051df8b3a6a1d642b163f4"}],
              "id": "63051df7b3a6a1d642b163f3",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77995",
            "blockType": "breakdown"
          }, {
            "item": "62f60d5df2dc1d8b09668255",
            "id": "62f60d7b3ca6cb5e0e2fcc2d",
            "blockType": "quiz_user_data"
          }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
          "id": "62f131f00db24716e22910f5",
          "blockType": "quizContainer"
        }, {
          "video": "62ff5eef2434775f5b8518af",
          "title": "Ищем твоих соулмейтов",
          "progressItems": [{
            "content": "Сравниваем личные качества",
            "id": "63051e23b3a6a1d642b163f5"
          }, {"content": "Ищем пару по интересам", "id": "63051e2ab3a6a1d642b163f6"}, {
            "content": "Составляем список",
            "id": "63051e32b3a6a1d642b163f7"
          }],
          "id": "62ff5fb4ef4ae2002298a51c",
          "blockType": "fakeSearch"
        }, {
          "paywall_type": "timeline",
          "title": "Начни бесплатно",
          "slides": [],
          "items": [{
            "title": "Сегодня — полный доступ бесплатно",
            "subtitle": "Начни пробный период и попробуй все возможности",
            "file": "6304c67b8360b48e58c18568",
            "id": "63051e76b3a6a1d642b163f8"
          }, {
            "title": "День 2 — напоминание",
            "subtitle": "Пришлём уведомление о скором завершении пробного периода",
            "file": "6304c6898360b48e58c1856f",
            "id": "63051e8bb3a6a1d642b163f9"
          }, {
            "title": "День 3 — конец триала",
            "subtitle": "Начнётся подписка, до этого можно будет отменить",
            "file": "6304c6918360b48e58c18576",
            "id": "63051ec2b3a6a1d642b163fa"
          }],
          "beforeButton": {"title": "3 дня бесплатно", "subtitle": "далее 999 ₽ в месяц"},
          "button": "Продолжить бесплатно",
          "id": "62ff5f125055780e05a76440",
          "blockType": "paywall"
        }, {
          "image": "630d1b3e3b3b356de2dbb524",
          "title": "Ты в игре! 🤙",
          "description": "Приложение вот-вот выйдет в твоём регионе. Мы сохранили все твои ответы. О запуске уведомим по email 💌",
          "id": "62ff5f9a5055780e05a76449",
          "blockType": "openSoon"
        }]
      },
      "_status": "published",
      "createdAt": "2022-08-23T12:27:51.760Z",
      "updatedAt": "2022-08-30T07:23:38.411Z"
    },
    {
      "id": "6305d5160fcf218ce835fe84",
      "_status": "published",
      "slug": "web_slmt_paywall_slider",
      "logo": "62e7b98ace548b63bae661a0",
      "items": {
        en: [{
          "image": "6316233f9e0e81bd09cb45c6",
          "title": "Find your soulmate",
          "subtitle": "A service that helps you find the person  who is closest to your soul",
          "button": "Let’s do it",
          "links": [{
            "text": "Privacy policy",
            "url": "https://app.soulmate.tech/page/privacy",
            "id": "631623940f7bcc16f8f907e3"
          }, {"text": "Terms of use", "url": "https://app.soulmate.tech/page/terms", "id": "631623950f7bcc16f8f907e4"}],
          "info": "SOULMATE TECHNOLOGIES INC 111 Pier Avenue Suite 100, Hermosa Beach, California 90254, USA",
          "id": "6316238a0f7bcc16f8f907e2",
          "blockType": "welcome"
        }, {
          "buttons": {"next": "Next"},
          "items": [{
            "title": "Answer the <br/>questions",
            "content": {"type": "image", "file": "62e7b9e1ce548b63bae661b3"},
            "id": "62ecd23b0db24716e22910ca"
          }, {
            "title": "We'll find the <br/>perfect match",
            "content": {"type": "image", "file": "62e7b9f5ce548b63bae661b7"},
            "id": "62ecd2780db24716e22910cb"
          }, {
            "title": "Talk, date & <br/>fall in love",
            "content": {"type": "image", "file": "62e7ba4ece548b63bae661bb"},
            "id": "62f104370db24716e22910e6"
          }],
          "id": "62ecd2260db24716e22910c9",
          "blockType": "onboarding"
        }, {
          "title": "Connection quiz",
          "subtitle": "Tips for quiz",
          "list": [{
            "title": "Answer the questions about yourself to help us find your soulmate.",
            "id": "62ecd3380db24716e22910cd"
          }, {
            "title": "It takes about 10 minutes to complete the quiz.",
            "id": "62ecd3560db24716e22910ce"
          }, {
            "title": "Answer honestly and have fun!",
            "emoji": "62e7b9b7ce548b63bae661af",
            "id": "62ecd3630db24716e22910cf"
          }],
          "termsOfUseConsent": [{
            "children": [{"text": "By starting, you agree to Soulmate’s "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/terms",
              "newTab": true,
              "children": [{"text": "Terms of Use"}]
            }, {"text": " "}]
          }, {
            "children": [{"text": "and "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/privacy",
              "newTab": true,
              "children": [{"text": "Privacy Policy"}]
            }, {"text": ""}]
          }],
          "button": "Start",
          "id": "62ecd3120db24716e22910cc",
          "blockType": "beforeQuiz"
        }, {
          "items": [{
            "item": "62ecd4a51773594fb0aa4763",
            "id": "62f15d3c3105ad2edd12060d",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f134571773594fb0aa4ae1",
            "id": "62f15d4d3105ad2edd12060e",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13bb61773594fb0aa4c12",
            "id": "62f15d5f3105ad2edd12060f",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13c3a1773594fb0aa4c3a",
            "id": "62f15e1a3105ad2edd120610",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f160381773594fb0aa4fa6",
            "id": "6312763149a8850cdb902a38",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f166381773594fb0aa500e",
            "id": "62f166507157ae861f80910c",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f1697a1773594fb0aa5154",
            "id": "62f169847157ae861f809115",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f16b4c1773594fb0aa5274",
            "id": "62f605180b9d2e151c5a03de",
            "blockType": "quiz_user_data"
          }, {
            "items": [{
              "content": "You look awesome! 😍",
              "id": "630476794be3c4b84f175822",
              "blockType": "message"
            }, {
              "content": {
                "title": "Keep it up!",
                "subtitle": "We have already started picking soulmates for you",
                "file": "62f1369c1773594fb0aa4b05"
              }, "id": "6304768b4be3c4b84f175823", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Keep it up!", "id": "630476b74be3c4b84f175825"}],
              "id": "630476b64be3c4b84f175824",
              "blockType": "vertical_actions"
            }],
            "id": "62f1348e0db24716e22910fb",
            "blockType": "breakdown"
          }, {
            "item": "62f61b79f2dc1d8b0966864f",
            "id": "62f61bab23dc634b39a6e9db",
            "blockType": "quiz_user_data"
          }, {
            "items_length": "10",
            "id": "62f1966c7157ae861f80913e",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "You are on the right track!",
                "subtitle": "SLMT uses advanced algorithms to select you a pair",
                "file": "62f16c721773594fb0aa52d3"
              }, "id": "630476c34be3c4b84f175826", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630476dd4be3c4b84f175828"}],
              "id": "630476da4be3c4b84f175827",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77992",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a27157ae861f809140",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "SLMT has already found your unique features!",
                "subtitle": "Just a few more questions  to complete the quiz",
                "file": "62f16cca1773594fb0aa52d7"
              }, "id": "630476ed4be3c4b84f175829", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630476f54be3c4b84f17582b"}],
              "id": "630476f34be3c4b84f17582a",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77993",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a37157ae861f809141",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Myth: The easiest way to make best friends is at school  or university.",
                "subtitle": "But it's actually easier to do it  in SLMT!",
                "file": "62f16dd11773594fb0aa52db"
              }, "id": "630477244be3c4b84f17582c", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "6304772a4be3c4b84f17582e"}],
              "id": "630477294be3c4b84f17582d",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77994",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a07157ae861f80913f",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Already 351902 people have found their soulmate!",
                "subtitle": "Waiting for you to complete  the quiz!",
                "file": "62f16e161773594fb0aa52df"
              }, "id": "6304774b4be3c4b84f17582f", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "6304776f4be3c4b84f175831"}],
              "id": "6304776d4be3c4b84f175830",
              "blockType": "vertical_actions"
            }],
            "id": "62f1723c7157ae861f809130",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a57157ae861f809142",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "You're in the home stretch!",
                "subtitle": "Let's answer the final questions to see your soulmate!",
                "file": "62f173e01773594fb0aa52ff"
              }, "id": "6304777f4be3c4b84f175832", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630477984be3c4b84f175834"}],
              "id": "630477974be3c4b84f175833",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77995",
            "blockType": "breakdown"
          }, {
            "item": "62f60d5df2dc1d8b09668255",
            "id": "62f60d7b3ca6cb5e0e2fcc2d",
            "blockType": "quiz_user_data"
          }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
          "id": "62f131f00db24716e22910f5",
          "blockType": "quizContainer"
        }, {
          "video": "62ff5eef2434775f5b8518af",
          "title": "Finding your <br/>Soulmate",
          "progressItems": [{
            "content": "Define your personality...",
            "id": "62ff5efc5055780e05a7643d"
          }, {
            "content": "Matching interests...",
            "id": "62ff5f015055780e05a7643e"
          }, {"content": "Prepare soulmate’s list", "id": "62ff5f085055780e05a7643f"}],
          "id": "62ff5fb4ef4ae2002298a51c",
          "blockType": "fakeSearch"
        }, {
          "paywall_type": "slider",
          "slides": [{
            "title": "Premium users get 10x matched",
            "file": "62ff5f242434775f5b8518b9",
            "id": "62ff5f1c5055780e05a76441"
          }, {
            "title": "Unlimited messages",
            "file": "62ff5f322434775f5b8518c3",
            "id": "62ff5f275055780e05a76442"
          }, {
            "title": "Unlimited swipes",
            "file": "62ff5f402434775f5b8518c9",
            "id": "62ff5f365055780e05a76443"
          }, {
            "title": "See who viewed you",
            "file": "62ff5f4c2434775f5b8518cd",
            "id": "62ff5f415055780e05a76444"
          }, {
            "title": "Detailed personality profile",
            "file": "62ff5f562434775f5b8518d1",
            "id": "62ff5f515055780e05a76445"
          }],
          "items": [{
            "title": "3",
            "subtitle": "month",
            "price": "$35.99",
            "id": "62ff5f585055780e05a76446"
          }, {
            "title": "1",
            "subtitle": "month",
            "price": "$15.99",
            "bonus": "+ 3 days free trial",
            "badge": "save 50%",
            "id": "62ff5f685055780e05a76447"
          }, {"title": "7", "subtitle": "days", "price": "$5.99", "id": "62ff5f835055780e05a76448"}],
          "button": "Continue",
          "id": "62ff5f125055780e05a76440",
          "blockType": "paywall",
          "beforeButton": {}
        }, {
          "image": "630d1ba63b3b356de2dbb6be",
          "title": "You’re in the game 🤙",
          "description": "The app is about to be released in your region. All your answers have been saved. We will notify you by email 💌",
          "id": "62ff5f9a5055780e05a76449",
          "blockType": "openSoon"
        }],
        ru: [{
          "image": "631623b59e0e81bd09cb46bf",
          "title": "Найди соулмейта",
          "subtitle": "Сервис, который позволяет найти человека близкого тебе по духу",
          "button": "Погнали!",
          "links": [{
            "text": "Политика конфиденциальности",
            "url": "https://app.soulmate.tech/page/privacy",
            "id": "631623bf202dec5c28c3f380"
          }, {
            "text": "Правила пользования",
            "url": "https://app.soulmate.tech/page/terms",
            "id": "631623c0202dec5c28c3f381"
          }],
          "info": "SOULMATE TECHNOLOGIES INC 111 Pier Avenue Suite 100, Hermosa Beach, California 90254, USA",
          "id": "6316238a0f7bcc16f8f907e2",
          "blockType": "welcome"
        }, {
          "buttons": {"next": "Далее"},
          "items": [{
            "title": "Ответь<br/> на вопросы",
            "content": {"type": "image", "file": "62fcc218860417e8ac4c59cd"},
            "id": "62fcc1eee47e1e0da9da9c0a"
          }, {
            "title": "Найдем тебе соулмейтов",
            "content": {"type": "image", "file": "62fcc234860417e8ac4c59d1"},
            "id": "62fcc21be47e1e0da9da9c0b"
          }, {
            "title": "Общайся, влюбляйся",
            "content": {"type": "image", "file": "62fcc260860417e8ac4c59d5"},
            "id": "62fcc24ee47e1e0da9da9c0d"
          }],
          "id": "62ecd2260db24716e22910c9",
          "blockType": "onboarding"
        }, {
          "title": "Опрос на совместимость",
          "subtitle": "Советы",
          "list": [{
            "title": "Ответь на вопросы о себе, чтобы мы нашли тебе соулмейта",
            "id": "62fcc27ce47e1e0da9da9c0e"
          }, {
            "title": "Прохождение опроса занимает примерно 10 минут",
            "id": "62fcc281e47e1e0da9da9c0f"
          }, {
            "title": "Отвечай честно. Развлекайся!",
            "emoji": "62e7b9b7ce548b63bae661af",
            "id": "62fcc286e47e1e0da9da9c10"
          }],
          "termsOfUseConsent": [{"children": [{"text": "Нажимая «Начать», вы соглашаетесь "}]}, {
            "children": [{"text": "с "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/privacy",
              "newTab": true,
              "children": [{"text": "Политикой конфиденциальности"}]
            }, {"text": " и "}, {
              "type": "link",
              "url": "https://app.soulmate.tech/page/terms",
              "children": [{"text": "Правилами пользования"}],
              "newTab": true
            }, {"text": ""}]
          }],
          "button": "Начать",
          "id": "62ecd3120db24716e22910cc",
          "blockType": "beforeQuiz"
        }, {
          "items": [{
            "item": "62ecd4a51773594fb0aa4763",
            "id": "62f15d3c3105ad2edd12060d",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f134571773594fb0aa4ae1",
            "id": "62f15d4d3105ad2edd12060e",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13bb61773594fb0aa4c12",
            "id": "62f15d5f3105ad2edd12060f",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13c3a1773594fb0aa4c3a",
            "id": "62f15e1a3105ad2edd120610",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f160381773594fb0aa4fa6",
            "id": "6312763149a8850cdb902a38",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f166381773594fb0aa500e",
            "id": "62f166507157ae861f80910c",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f1697a1773594fb0aa5154",
            "id": "62f169847157ae861f809115",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f16b4c1773594fb0aa5274",
            "id": "62f605180b9d2e151c5a03de",
            "blockType": "quiz_user_data"
          }, {
            "items": [{
              "content": "Выглядишь потрясно! 😍",
              "id": "631279bdb10781d019951aa6",
              "blockType": "message"
            }, {
              "content": {
                "title": "Так держать!",
                "subtitle": "Мы уже начали подбирать  для тебя соулмейтов",
                "file": "62f1369c1773594fb0aa4b05"
              }, "id": "631279e0b10781d019951aa7", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127a01b10781d019951aa9"}],
              "id": "631279ffb10781d019951aa8",
              "blockType": "vertical_actions"
            }],
            "id": "62f1348e0db24716e22910fb",
            "blockType": "breakdown"
          }, {
            "item": "62f61b79f2dc1d8b0966864f",
            "id": "62f61bab23dc634b39a6e9db",
            "blockType": "quiz_user_data"
          }, {
            "items_length": "10",
            "id": "62f1966c7157ae861f80913e",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Ты на верном пути!",
                "subtitle": "SLMT использует передовые алгоритмы для точного подбора твоей пары",
                "file": "62f16c721773594fb0aa52d3"
              }, "id": "63127a1ab10781d019951aaa", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127a40b10781d019951aac"}],
              "id": "63127a3fb10781d019951aab",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77992",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a27157ae861f809140",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Мы уже выявили твои  уникальные особенности!",
                "subtitle": "Осталось совсем немного, чтобы закончить опрос",
                "file": "62fccbfe860417e8ac4c615f"
              }, "id": "63127a58b10781d019951aad", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127a76b10781d019951aaf"}],
              "id": "63127a76b10781d019951aae",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77993",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a37157ae861f809141",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Миф: проще всего завести лучших друзей в школе или университете.",
                "subtitle": "Но на самом деле проще это сделать у нас, в SLMT!",
                "file": "62f16dd11773594fb0aa52db"
              }, "id": "63127a82b10781d019951ab0", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127a97b10781d019951ab2"}],
              "id": "63127a96b10781d019951ab1",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77994",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a07157ae861f80913f",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Уже 3590 людей нашли свою вторую половинку в SLMT",
                "subtitle": "Ждём, когда ты закончишь проходить опрос",
                "file": "62f16e161773594fb0aa52df"
              }, "id": "63127aa5b10781d019951ab3", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127ac2b10781d019951ab5"}],
              "id": "63127ac1b10781d019951ab4",
              "blockType": "vertical_actions"
            }],
            "id": "62f1723c7157ae861f809130",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a57157ae861f809142",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Почти закончили!",
                "subtitle": "Давай ответим на последние вопросы и найдём соулмейтов",
                "file": "62f173e01773594fb0aa52ff"
              }, "id": "63127adeb10781d019951ab6", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "63127af2b10781d019951ab8"}],
              "id": "63127af1b10781d019951ab7",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77995",
            "blockType": "breakdown"
          }, {
            "item": "62f60d5df2dc1d8b09668255",
            "id": "62f60d7b3ca6cb5e0e2fcc2d",
            "blockType": "quiz_user_data"
          }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
          "id": "62f131f00db24716e22910f5",
          "blockType": "quizContainer"
        }, {
          "video": "62ff5eef2434775f5b8518af",
          "title": "Ищем твоих соулмейтов",
          "progressItems": [{
            "content": "Сравниваем личные качества",
            "id": "62ff7afc6f0aa58c06832f79"
          }, {"content": "Ищем пару по интересам", "id": "62ff7aeb6f0aa58c06832f77"}, {
            "content": "Составляем список",
            "id": "62ff7af46f0aa58c06832f78"
          }],
          "id": "62ff5fb4ef4ae2002298a51c",
          "blockType": "fakeSearch"
        }, {
          "paywall_type": "slider",
          "slides": [{
            "title": "В 10 раз больше мэтчей",
            "file": "62ff5f242434775f5b8518b9",
            "id": "62ff7b196f0aa58c06832f7b"
          }, {
            "title": "Безлимитные сообщения",
            "file": "62ff5f322434775f5b8518c3",
            "id": "62ff7b336f0aa58c06832f7c"
          }, {
            "title": "Безлимитные свайпы",
            "file": "62ff5f402434775f5b8518c9",
            "id": "62ff7b496f0aa58c06832f7d"
          }, {
            "title": "Видно, кто тебя смотрит",
            "file": "62ff5f4c2434775f5b8518cd",
            "id": "62ff7b6e6f0aa58c06832f7e"
          }, {"title": "Подробный профиль пары", "file": "62ff5f562434775f5b8518d1", "id": "62ff7b756f0aa58c06832f7f"}],
          "items": [{
            "title": "3",
            "subtitle": "месяца",
            "price": "1999 ₽",
            "id": "62ff7bb66f0aa58c06832f80"
          }, {
            "title": "1",
            "subtitle": "месяц",
            "price": "999 ₽",
            "bonus": "+ 3 дня пробный период",
            "badge": "save 50%",
            "id": "62ff7c276f0aa58c06832f81"
          }, {"title": "7", "subtitle": "дней", "price": "359 ₽", "bonus": "", "id": "62ff7cb36f0aa58c06832f82"}],
          "button": "Продолжить",
          "id": "62ff5f125055780e05a76440",
          "blockType": "paywall",
          "beforeButton": {}
        }, {
          "image": "630d1b3e3b3b356de2dbb524",
          "title": "Ты в игре! 🤙",
          "description": "Приложение вот-вот выйдет в твоём регионе. Мы сохранили все твои ответы. О запуске уведомим по email 💌",
          "id": "62ff5f9a5055780e05a76449",
          "blockType": "openSoon"
        }]
      },
      "createdAt": "2022-08-05T08:20:51.261Z",
      "updatedAt": "2022-09-08T09:44:53.917Z",
      "type": "web"
    },
    {
      "id": "62ecd2e31773594fb0aa4738",
      "_status": "published",
      "slug": "web_paywall_slider",
      "logo": "62e7b98ace548b63bae661a0",
      "items": {
        en: [{
          "buttons": {"next": "Next"},
          "items": [{
            "title": "Answer the <br/>questions",
            "content": {"type": "image", "file": "62e7b9e1ce548b63bae661b3"},
            "id": "62ecd23b0db24716e22910ca"
          }, {
            "title": "We'll find the <br/>perfect match",
            "content": {"type": "image", "file": "62e7b9f5ce548b63bae661b7"},
            "id": "62ecd2780db24716e22910cb"
          }, {
            "title": "Talk, date & <br/>fall in love",
            "content": {"type": "image", "file": "62e7ba4ece548b63bae661bb"},
            "id": "62f104370db24716e22910e6"
          }],
          "id": "62ecd2260db24716e22910c9",
          "blockType": "onboarding"
        }, {
          "title": "Connection quiz",
          "subtitle": "Tips for quiz",
          "list": [{
            "title": "Answer the questions about yourself  to help us find your soulmate.",
            "id": "62ecd3380db24716e22910cd"
          }, {
            "title": "It takes about 10 minutes to complete  the quiz.",
            "id": "62ecd3560db24716e22910ce"
          }, {
            "title": "Answer honestly and have fun!",
            "emoji": "62e7b9b7ce548b63bae661af",
            "id": "62ecd3630db24716e22910cf"
          }],
          "button": "Start",
          "id": "62ecd3120db24716e22910cc",
          "blockType": "beforeQuiz"
        }, {
          "items": [{
            "item": "62ecd4a51773594fb0aa4763",
            "id": "62f15d3c3105ad2edd12060d",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f134571773594fb0aa4ae1",
            "id": "62f15d4d3105ad2edd12060e",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13bb61773594fb0aa4c12",
            "id": "62f15d5f3105ad2edd12060f",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13c3a1773594fb0aa4c3a",
            "id": "62f15e1a3105ad2edd120610",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f166381773594fb0aa500e",
            "id": "62f166507157ae861f80910c",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f1697a1773594fb0aa5154",
            "id": "62f169847157ae861f809115",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f16b4c1773594fb0aa5274",
            "id": "62f605180b9d2e151c5a03de",
            "blockType": "quiz_user_data"
          }, {
            "items": [{
              "content": "You look awesome! 😍",
              "id": "630476794be3c4b84f175822",
              "blockType": "message"
            }, {
              "content": {
                "title": "Keep it up!",
                "subtitle": "We have already started picking soulmates for you",
                "file": "62f1369c1773594fb0aa4b05"
              }, "id": "6304768b4be3c4b84f175823", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630476b74be3c4b84f175825"}],
              "id": "630476b64be3c4b84f175824",
              "blockType": "vertical_actions"
            }],
            "id": "62f1348e0db24716e22910fb",
            "blockType": "breakdown"
          }, {
            "item": "62f61b79f2dc1d8b0966864f",
            "id": "62f61bab23dc634b39a6e9db",
            "blockType": "quiz_user_data"
          }, {
            "items_length": "10",
            "id": "62f1966c7157ae861f80913e",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "You are on the right track!",
                "subtitle": "Soulmate uses advanced algorithms to select you a pair",
                "file": "62f16c721773594fb0aa52d3"
              }, "id": "630476c34be3c4b84f175826", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630476dd4be3c4b84f175828"}],
              "id": "630476da4be3c4b84f175827",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77992",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a27157ae861f809140",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Soulmate has already found your unique features!",
                "subtitle": "Just a few more questions  to complete the quiz",
                "file": "62f16cca1773594fb0aa52d7"
              }, "id": "630476ed4be3c4b84f175829", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "630476f54be3c4b84f17582b"}],
              "id": "630476f34be3c4b84f17582a",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77993",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a37157ae861f809141",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Myth: The easiest way to make best friends is at school  or university.",
                "subtitle": "But it's actually easier to do it  in Soulmate!",
                "file": "62f16dd11773594fb0aa52db"
              }, "id": "630477244be3c4b84f17582c", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "6304772a4be3c4b84f17582e"}],
              "id": "630477294be3c4b84f17582d",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77994",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a07157ae861f80913f",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Already 351902 people have found their soulmate!",
                "subtitle": "Waiting for you to complete  the quiz!",
                "file": "62f16e161773594fb0aa52df"
              }, "id": "6304774b4be3c4b84f17582f", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let’s keep going", "id": "6304776f4be3c4b84f175831"}],
              "id": "6304776d4be3c4b84f175830",
              "blockType": "vertical_actions"
            }],
            "id": "62f1723c7157ae861f809130",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a57157ae861f809142",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "You're in the home stretch!",
                "subtitle": "Let's answer the final questions to see your soulmate!",
                "file": "62f173e01773594fb0aa52ff"
              }, "id": "6304777f4be3c4b84f175832", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Let's do it!", "id": "630477984be3c4b84f175834"}],
              "id": "630477974be3c4b84f175833",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77995",
            "blockType": "breakdown"
          }, {
            "item": "62f60d5df2dc1d8b09668255",
            "id": "62f60d7b3ca6cb5e0e2fcc2d",
            "blockType": "quiz_user_data"
          }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
          "id": "62f131f00db24716e22910f5",
          "blockType": "quizContainer"
        }, {
          "video": "62ff5eef2434775f5b8518af",
          "title": "Finding your <br/>Soulmate",
          "progressItems": [{
            "content": "Define your personality...",
            "id": "62ff5efc5055780e05a7643d"
          }, {
            "content": "Matching interests...",
            "id": "62ff5f015055780e05a7643e"
          }, {"content": "Prepare soulmate’s list", "id": "62ff5f085055780e05a7643f"}],
          "id": "62ff5fb4ef4ae2002298a51c",
          "blockType": "fakeSearch"
        }, {
          "paywall_type": "slider",
          "slides": [{
            "title": "Premium users get 10x matched",
            "file": "62ff5f242434775f5b8518b9",
            "id": "62ff5f1c5055780e05a76441"
          }, {
            "title": "Unlimited messages",
            "file": "62ff5f322434775f5b8518c3",
            "id": "62ff5f275055780e05a76442"
          }, {
            "title": "Unlimited swipes",
            "file": "62ff5f402434775f5b8518c9",
            "id": "62ff5f365055780e05a76443"
          }, {
            "title": "See who viewed you",
            "file": "62ff5f4c2434775f5b8518cd",
            "id": "62ff5f415055780e05a76444"
          }, {
            "title": "Detailed personality profile",
            "file": "62ff5f562434775f5b8518d1",
            "id": "62ff5f515055780e05a76445"
          }],
          "items": [{
            "title": "3",
            "subtitle": "month",
            "price": "$35.99",
            "id": "62ff5f585055780e05a76446"
          }, {
            "title": "1",
            "subtitle": "month",
            "price": "$15.99",
            "bonus": "+ 3 days free trial",
            "badge": "save 50%",
            "id": "62ff5f685055780e05a76447"
          }, {"title": "7", "subtitle": "days", "price": "$5.99", "id": "62ff5f835055780e05a76448"}],
          "button": "Continue",
          "id": "62ff5f125055780e05a76440",
          "blockType": "paywall",
          "beforeButton": {}
        }, {
          "image": "62ff5fb22434775f5b8518d6",
          "title": "We’re still creating the future of datings",
          "description": "And we’re still building our service. As soon as it's ready, we'll send you an email notification.",
          "id": "62ff5f9a5055780e05a76449",
          "blockType": "openSoon"
        }],
        ru: [{
          "buttons": {"next": "Далее"},
          "items": [{
            "title": "Ответь на вопросы",
            "content": {"type": "image", "file": "62fcc218860417e8ac4c59cd"},
            "id": "62fcc1eee47e1e0da9da9c0a"
          }, {
            "title": "Найдем тебе соулмейтов",
            "content": {"type": "image", "file": "62fcc234860417e8ac4c59d1"},
            "id": "62fcc21be47e1e0da9da9c0b"
          }, {
            "title": "Общайся, влюбляйся",
            "content": {"type": "image", "file": "62fcc260860417e8ac4c59d5"},
            "id": "62fcc24ee47e1e0da9da9c0d"
          }],
          "id": "62ecd2260db24716e22910c9",
          "blockType": "onboarding"
        }, {
          "title": "Опрос на совместимость",
          "subtitle": "Советы",
          "list": [{
            "title": "Ответь на вопросы о себе,  чтобы мы нашли тебе соулмейта",
            "id": "62fcc27ce47e1e0da9da9c0e"
          }, {
            "title": "Прохождение опроса занимает примерно 10 минут",
            "id": "62fcc281e47e1e0da9da9c0f"
          }, {
            "title": "Отвечай честно. Развлекайся!",
            "emoji": "62e7b9b7ce548b63bae661af",
            "id": "62fcc286e47e1e0da9da9c10"
          }],
          "button": "Начать",
          "id": "62ecd3120db24716e22910cc",
          "blockType": "beforeQuiz"
        }, {
          "items": [{
            "item": "62ecd4a51773594fb0aa4763",
            "id": "62f15d3c3105ad2edd12060d",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f134571773594fb0aa4ae1",
            "id": "62f15d4d3105ad2edd12060e",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13bb61773594fb0aa4c12",
            "id": "62f15d5f3105ad2edd12060f",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f13c3a1773594fb0aa4c3a",
            "id": "62f15e1a3105ad2edd120610",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f166381773594fb0aa500e",
            "id": "62f166507157ae861f80910c",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f1697a1773594fb0aa5154",
            "id": "62f169847157ae861f809115",
            "blockType": "quiz_user_data"
          }, {
            "item": "62f16b4c1773594fb0aa5274",
            "id": "62f605180b9d2e151c5a03de",
            "blockType": "quiz_user_data"
          }, {
            "items": [{
              "content": "Выглядишь потрясно! 😍",
              "id": "630477b24be3c4b84f175835",
              "blockType": "message"
            }, {
              "content": {
                "title": "Так держать!",
                "subtitle": "Мы уже начали подбирать для тебя соулмейтов",
                "file": "62f1369c1773594fb0aa4b05"
              }, "id": "630477b44be3c4b84f175836", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "630477d54be3c4b84f175838"}],
              "id": "630477d44be3c4b84f175837",
              "blockType": "vertical_actions"
            }],
            "id": "62f1348e0db24716e22910fb",
            "blockType": "breakdown"
          }, {
            "item": "62f61b79f2dc1d8b0966864f",
            "id": "62f61bab23dc634b39a6e9db",
            "blockType": "quiz_user_data"
          }, {
            "items_length": "10",
            "id": "62f1966c7157ae861f80913e",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Ты на верном пути!",
                "subtitle": "Soulmate использует передовые алгоритмы для точного подбора твоей пары",
                "file": "62f16c721773594fb0aa52d3"
              }, "id": "630477e94be3c4b84f175839", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "6304780b4be3c4b84f17583b"}],
              "id": "6304780a4be3c4b84f17583a",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77992",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a27157ae861f809140",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Мы уже выявили твои уникальные особенности!",
                "subtitle": "Осталось совсем немного, чтобы закончить опрос",
                "file": "62f16cca1773594fb0aa52d7"
              }, "id": "630478124be3c4b84f17583c", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "6304783d4be3c4b84f17583e"}],
              "id": "6304783b4be3c4b84f17583d",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77993",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a37157ae861f809141",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Миф: проще всего завести лучших друзей в школе или университете.",
                "subtitle": "Но на самом деле проще это сделать у нас, в Soulmate!",
                "file": "62f16dd11773594fb0aa52db"
              }, "id": "6304784a4be3c4b84f17583f", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "630478614be3c4b84f175841"}],
              "id": "630478604be3c4b84f175840",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77994",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a07157ae861f80913f",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Уже 351902 людей нашли свою вторую половинку в Soulmate",
                "subtitle": "Ждём, когда ты закончишь проходить опрос",
                "file": "62f16e161773594fb0aa52df"
              }, "id": "630478764be3c4b84f175842", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Продолжаем!", "id": "630478884be3c4b84f175844"}],
              "id": "630478864be3c4b84f175843",
              "blockType": "vertical_actions"
            }],
            "id": "62f1723c7157ae861f809130",
            "blockType": "breakdown"
          }, {
            "items_length": "10",
            "id": "62f196a57157ae861f809142",
            "blockType": "quiz_algorithm"
          }, {
            "items": [{
              "content": {
                "title": "Почти закончили!",
                "subtitle": "Давай ответим на последние вопросы и найдём тебе пару",
                "file": "62f173e01773594fb0aa52ff"
              }, "id": "6304788f4be3c4b84f175845", "blockType": "matches_message"
            }],
            "answer": [{
              "content": [{"text": "Заканчиваем!", "id": "630478ad4be3c4b84f175847"}],
              "id": "630478ac4be3c4b84f175846",
              "blockType": "vertical_actions"
            }],
            "id": "62f173fa7c3e890022d77995",
            "blockType": "breakdown"
          }, {
            "item": "62f60d5df2dc1d8b09668255",
            "id": "62f60d7b3ca6cb5e0e2fcc2d",
            "blockType": "quiz_user_data"
          }, {"item": "62f621e9f2dc1d8b096687a0", "id": "62f6221223dc634b39a6e9e6", "blockType": "quiz_user_data"}],
          "id": "62f131f00db24716e22910f5",
          "blockType": "quizContainer"
        }, {
          "video": "62ff5eef2434775f5b8518af",
          "title": "Ищем твоих соулмейтов",
          "progressItems": [{
            "content": "Сравниваем личные качества",
            "id": "62ff7afc6f0aa58c06832f79"
          }, {"content": "Ищем пару по интересам", "id": "62ff7aeb6f0aa58c06832f77"}, {
            "content": "Составляем список",
            "id": "62ff7af46f0aa58c06832f78"
          }],
          "id": "62ff5fb4ef4ae2002298a51c",
          "blockType": "fakeSearch"
        }, {
          "paywall_type": "slider",
          "slides": [{
            "title": "В 10 раз больше мэтчей",
            "file": "62ff5f242434775f5b8518b9",
            "id": "62ff7b196f0aa58c06832f7b"
          }, {
            "title": "Безлимитные сообщения",
            "file": "62ff5f322434775f5b8518c3",
            "id": "62ff7b336f0aa58c06832f7c"
          }, {
            "title": "Безлимитные свайпы",
            "file": "62ff5f402434775f5b8518c9",
            "id": "62ff7b496f0aa58c06832f7d"
          }, {
            "title": "Видно, кто тебя смотрит",
            "file": "62ff5f4c2434775f5b8518cd",
            "id": "62ff7b6e6f0aa58c06832f7e"
          }, {"title": "Подробный профиль пары", "file": "62ff5f562434775f5b8518d1", "id": "62ff7b756f0aa58c06832f7f"}],
          "items": [{
            "title": "3",
            "subtitle": "месяца",
            "price": "1999 ₽",
            "id": "62ff7bb66f0aa58c06832f80"
          }, {
            "title": "1",
            "subtitle": "month",
            "price": "$15.99",
            "bonus": "+ 3 days free trial",
            "badge": "save 50%",
            "id": "62ff7c276f0aa58c06832f81"
          }, {"title": "7", "subtitle": "days", "price": "$5.99", "id": "62ff7cb36f0aa58c06832f82"}],
          "button": "Продолжить",
          "id": "62ff5f125055780e05a76440",
          "blockType": "paywall",
          "beforeButton": {}
        }, {
          "image": "62ff5fb22434775f5b8518d6",
          "title": "Создаём будущее знакомств",
          "description": "Сейчас мы продолжаем создавать наш сервис. Сообщим по электронной почте, когда приложение будет готово.",
          "id": "62ff5f9a5055780e05a76449",
          "blockType": "openSoon"
        }]
      },
      "createdAt": "2022-08-05T08:20:51.261Z",
      "updatedAt": "2022-08-25T14:20:18.141Z",
      "type": "web"
    }
  ]
  await promiseMap(flows, async flow => {
    await flowModel.create(flow)
  })
  Logger.info('import of id fix is done');
};
export default importFlowFix;
