import {Inject, Injectable, Scope} from '@nestjs/common';
import UserEntity, {Languages} from '../entities/User';
import {ReturnModelType} from '@typegoose/typegoose';
import {InjectModel} from 'nestjs-typegoose';
import payload from 'payload';
import {get} from 'lodash';
import {ObjectId} from "mongodb";
import {isObject} from "util";

const webHost = process.env.FRONTEND_URL;
const GeometricOneImg = `${webHost}/assets/icons/select/geometric/1.png`;
const GeometricTwoImg = `${webHost}/assets/icons/select/geometric/2.png`;
const GeometricThreeImg = `${webHost}/assets/icons/select/geometric/3.png`;
const GeometricFourImg = `${webHost}/assets/icons/select/geometric/4.png`;
const NumberOneImg = `${webHost}/assets/icons/select/numberic/1.png`;
const NumberTwoImg = `${webHost}/assets/icons/select/numberic/2.png`;
const NumberThreeImg = `${webHost}/assets/icons/select/numberic/3.png`;
const NumberFourImg = `${webHost}/assets/icons/select/numberic/4.png`;
const LetterOneImg = `${webHost}/assets/icons/select/alphabetic/1.png`;
const LetterTwoImg = `${webHost}/assets/icons/select/alphabetic/2.png`;
const LetterThreeImg = `${webHost}/assets/icons/select/alphabetic/3.png`;
const LetterFourImg = `${webHost}/assets/icons/select/alphabetic/4.png`;
const randomImages = [[{
  url: GeometricOneImg
}, {
  url: GeometricTwoImg
}, {
  url: GeometricThreeImg
}, {
  url: GeometricFourImg
}], [{
  url: NumberOneImg
}, {
  url: NumberTwoImg
}, {
  url: NumberThreeImg
}, {
  url: NumberFourImg
}], [{
  url: LetterOneImg
}, {
  url: LetterTwoImg
}, {
  url: LetterThreeImg
}, {
  url: LetterFourImg
}]];

@Injectable()
export class FlowService {
  quiz: {
    [lang: string]: any[]
  } = {};

  constructor(
    @InjectModel(UserEntity) private readonly repoUser: ReturnModelType<typeof UserEntity>,
  ) {
    setTimeout(() => {
      this._onInit();
    });
  }

  private async _onInit() {
    const languages: string[] = Object.values(Languages);
    await Promise.all(languages.map(async (lang: string) => {
      const elements = await payload.find({
        locale: lang, user: null, collection: 'quiz', depth: 2, where: {
          '_status': {
            equals: 'published'
          }
        }, limit: 999 * 999 * 999, sort: '-createdAt'
      });
      this.quiz[lang] = get(elements, 'docs', []);
    }));
  }

  async get(type, lang: Languages) {
    const _groups = Array.from({length: 20}).map((_, i) => i + 1);
    const group = _groups[Math.floor(Math.random() * _groups.length)];
    const quiz = get(this.quiz, lang, []).filter(({group: _group}) => _group === group);
    const flows = get(await payload.find({
      locale: lang, user: null, collection: 'flow', where: {
        ...(type === 'web' ? {
          slug: {
            contains: '_slmt_'
          }
        } : {}), type: {
          equals: type
        }, '_status': {
          equals: 'published'
        }
      }, sort: '-createdAt', limit: 999 * 999 * 999
    }), 'docs');
    const {
      globalType,
      createdAt,
      updatedAt,
      id,
      quizPhotoPicker,
      onboardingDeletedUserAlert,
      ...appSettings
    } = type === 'ios' ? (await payload.findGlobal({
      slug: 'appSettings',
      locale: lang,
      user: null,
    }) || {} as any) : {} as any
    const flowItem = flows[Math.floor(Math.random() * flows.length)]
    return this._transformType({
      ...(type === 'ios' ? {
        quizPhotoPicker,
        onboardingDeletedUserAlert,
        appSettings: {
          ...appSettings,
          swiper: {
            logoUrl: get(appSettings, 'swiper.logo.url', null),
            ...Object.fromEntries(Object.entries(get(appSettings, 'swiper', {})).filter(([key]) => key !== 'logo')),
            outOfCards: {
              imageUrl: get(appSettings, 'swiper.outOfCards.image.url', null),
              ...Object.fromEntries(Object.entries(get(appSettings, 'swiper.outOfCards', {})).filter(([key]) => key !== 'image')),
            }
          },
          settings: {
            logoUrl: get(appSettings, 'settings.logo.url', null),
            ...Object.fromEntries(Object.entries(get(appSettings, 'settings', {})).filter(([key]) => key !== 'logo')),
          },
          paywall: {
            ...get(appSettings, 'paywall', {}),
            slider_three_plans: {
              ...get(appSettings, 'paywall.slider_three_plans', {}),
              advantages: get(appSettings, 'paywall.slider_three_plans.advantages', []).map(({
                                                                                               title,
                                                                                               image
                                                                                             }) => ({
                title,
                imageUrl: get(image, 'url')
              }))
            },
            default: {
              ...get(appSettings, 'paywall.slider_three_plans', {}),
              advantages: get(appSettings, 'paywall.slider_three_plans.advantages', []).map(({
                                                                                               title,
                                                                                               image
                                                                                             }) => ({
                title,
                imageUrl: get(image, 'url')
              }))
            }
          },
          paywalls:
            Object.entries(get(appSettings, 'paywall', {}))
              .reduce((prev, [type, value]) => {
                if (type === 'slider_three_plans') {
                  value['advantages'] = get(value, 'advantages', []).map(({
                                                                            title,
                                                                            image
                                                                          }) => ({
                    title,
                    imageUrl: get(image, 'url')
                  }))
                  return [
                    ...prev,
                    {
                      [type]: value
                    },
                    {
                      default: value
                    }
                  ]
                }
                return [...prev, {
                  [type]: value
                }]
              }, []),
          deleteAccount: {
            ...Object.fromEntries(Object.entries(get(appSettings, 'deleteAccount', {})).filter(([key]) => key !== 'image')),
            imageUrl: get(appSettings, 'deleteAccount.image.url', null)
          },
          chats: {
            ...Object.fromEntries(Object.entries(get(appSettings, 'chats', {})).filter(([key]) => !['emptyImage', 'logo'].includes(key))),
            emptyImageURL: get(appSettings, 'chats.emptyImage.url', null),
            logoURL: get(appSettings, 'chats.logo.url', null)
          },
        }
      } : {}),
      ...this._transformData('flow', flowItem, quiz)
    }, group, lang);
  }

  private _transformData(type: 'flow' | 'quizContainer' | 'breakdown' | 'quiz_user_data' | 'answer' | 'quiz_algorithm', data: any, quiz: any[] = undefined) {
    switch (type) {
      case 'flow': {
        data['items'] = get(data, 'items', []).map(({id, blockType: type, item, ...rest}) => {
          switch (type) {
            case 'quizContainer': {
              this._transformData(type, rest, quiz);
              break;
            }
          }
          return {
            id, type, ...item, ...rest
          };
        });
        return data;
      }
      case 'quizContainer': {
        data['items'] = get(data, 'items', []).reduce((prev, {id, blockType: type, ...rest}) => {
          switch (type) {
            case 'breakdown': {
              this._transformData(type, rest);
              break;
            }
            case 'quiz_user_data': {
              return [...prev, this._transformData(type, {
                id, type, ...rest
              })];
            }
            case 'quiz_algorithm': {
              return [...prev, ...this._transformData(type, {
                id, type, ...rest
              }, quiz)];
            }
          }
          return [...prev, {
            id, type, ...rest
          }];
        }, []);
        return data;
      }
      case 'breakdown': {
        data['items'] = data['items'].map(({id, blockType: type, ...rest}) => {
          return {
            id, type, ...rest
          };
        });
        data['answer'] = this._transformData('answer', get(data, 'answer.0', get(data, 'answer')));
        return data;
      }
      case 'quiz_user_data': {
        const {id, item, ...rest} = data;
        const {answer, ..._rest} = item;
        data = {
          id, ...rest, ..._rest, items: get(item, 'items', []).map(({id, blockType: type, ...rest}) => {
            return {
              id, type, ...rest
            };
          }), answer: this._transformData('answer', get(item, 'answer.0', get(item, 'answer') || {}))
        };
        return data;
      }
      case 'quiz_algorithm': {
        const {id, items_length, ...rest} = data;
        const items = quiz.splice(0, items_length);
        data = {
          id, ...rest, items
        };
        return items.map(({id, items, answer, ...rest}) => ({
          id, type: 'quiz', items: items.map(({id, blockType, ..._rest}) => ({
            id, type: blockType, ..._rest
          })), answer: this._transformData('answer', get(answer, 0, answer)), ...rest
        }));
      }
      case 'answer': {
        const {id, blockType: type, ...rest} = data;
        return {id, type, ...rest};
      }
    }
  }

  private _transformType(data, group, lang) {
    if (data.type !== 'ios') {
      return {
        ...data, group
      };
    }
    const onboarding = data.items.find(item => item.type === 'onboarding')
    const appPrivacy = data.items.find(item => item.type === 'appPrivacy')
    const appNotifications = data.items.find(item => item.type === 'appNotifications')
    const applicationUpdate = data.items.find(item => item.type === 'applicationUpdate')
    const beforeQuiz = data.items.find(item => item.type === 'beforeQuiz')
    const quiz = data.items.find(item => item.type === 'quizContainer')
    const fakeSearch = data.items.find(item => item.type === 'fakeSearch')
    const appSettings = get(data, 'appSettings', {})
    const quizBotCharacter = Object.fromEntries(Object.entries(get(appSettings, 'quizBotCharacter', {})).filter(([key]) => key !== 'image'))
    quizBotCharacter['image_url'] = get(data, 'appSettings.quizBotCharacter.image.url', null)
    return {
      locale: lang.toUpperCase(),
      general: {
        app: 'Soulmate',
        empty_value: '—',
        connection_error: 'Connection error',
        location_denied: 'Location permission denied',
        location_unavailable: 'Location Services are not supported on your device',
        signin_google: 'Continue with Google',
        interval_and_unit_format: '%1$@ %2$@'
      },
      onboarding: {
        deletedUserAlert: get(data, 'onboardingDeletedUserAlert', null),
        onboarding: get(onboarding, 'items', []
        ).map(({title, content}) => ({
          title,
          nextButton: get(onboarding, 'buttons.next'),
          signInButton: get(onboarding, 'buttons.signIn'),
          skipButton: get(onboarding, 'buttons.signIn'),
          content: {
            type: get(content, 'type'),
            url: get(content, 'file.url'),
          }
        }))
      },
      allowAppTracking: {
        title: get(appPrivacy, 'title'),
        subtitle: get(appPrivacy, 'subtitle'),
        nextButton: get(appPrivacy, 'buttons.next'),
        skipButton: get(appPrivacy, 'buttons.skip'),
        content: {
          type: get(appPrivacy, 'content.type'),
          url: get(appPrivacy, 'content.file.url'),
        }
      },
      allowNotifications: {
        title: get(appNotifications, 'title'),
        subtitle: get(appNotifications, 'subtitle'),
        nextButton: get(appNotifications, 'buttons.next'),
        skipButton: get(appNotifications, 'buttons.skip'),
        content: {
          type: get(appNotifications, 'content.type'),
          url: get(appNotifications, 'content.file.url'),
        }
      },
      applicationUpdate: {
        title: get(applicationUpdate, 'title'),
        subtitle: get(applicationUpdate, 'subtitle'),
        nextButton: get(applicationUpdate, 'buttons.next'),
        skipButton: get(applicationUpdate, 'buttons.skip'),
        content: {
          type: get(applicationUpdate, 'content.type'),
          url: get(applicationUpdate, 'content.file.url'),
        },
        versionsAndConditions: get(applicationUpdate, 'versionsAndConditions', []).map(({
                                                                                          id,
                                                                                          applicationVersion,
                                                                                          isHardUpdateNeeded,
                                                                                          ...rest
                                                                                        }) => ({
          id,
          applicationVersion,
          isHardUpdateNeeded: Boolean(isHardUpdateNeeded),
          ...rest
        })),
      },
      prequiz: {
        title: get(beforeQuiz, 'title'),
        subtitle: get(beforeQuiz, 'subtitle'),
        startButton: get(beforeQuiz, 'button'),
        tips: get(beforeQuiz, 'list', []).map(({title, emoji}) => ({
          title,
          imageURL: get(emoji, 'url')
        })),
        termsOfUseConsent: get(beforeQuiz, 'termsOfUseConsent')
      },
      postquiz: {
        title: get(fakeSearch, 'title'),
        loader_strings: get(fakeSearch, 'progressItems', []).map(({content}) => content),
        content: {
          type: 'video',
          url: get(fakeSearch, 'video.url'),
        }
      },
      quiz: {
        groupId: String(group),
        id: get(quiz, 'id', null),
        bot_character: quizBotCharacter,
        steps: this._transformDataIos('quizSteps', get(quiz, 'items', []), get(data, 'quizPhotoPicker', {}), lang).reduce((prev, next) => {
          const last = prev.at(-1) || [];
          last.push(next);
          const isBreakdown = Boolean(get(next, 'message.messages', []).find(({type}) => type === 'breakdown'))
          if (isBreakdown) {
            return [...[...prev.filter((_: any, i: any) => i < prev.length - 1), last], []];
          }
          return [...prev.filter((_: any, i: any) => i < prev.length - 1), last];
        }, [])
      },
      date: {
        yesterday: 'Yesterday',
        today: 'Today',
        tomorrow: 'Tomorrow',
        date_comma_time_format: '%1$@, %2$@',
        date_at_time_format: '%1$@ at %2$@',
        dates_intervals_format: '%1$@ – %2$@',
        ago_format: '%@ ago',
        duration: {
          day: {
            pluralizable: 'true',
            zero: '%@ days',
            one: '%@ day',
            other: '%@ days',
            many: '%@ days',
            few: '%@ days'
          },
          week: {
            pluralizable: 'true',
            zero: '%@ weeks',
            one: '%@ week',
            other: '%@ weeks',
            many: '%@ weeks',
            few: '%@ weeks'
          },
          month: {
            pluralizable: 'true',
            zero: '%@ months',
            one: '%@ month',
            other: '%@ months',
            many: '%@ months',
            few: '%@ months'
          },
          year: {
            pluralizable: 'true',
            zero: '%@ years',
            one: '%@ year',
            other: '%@ years',
            many: '%@ years',
            few: '%@ years'
          }
        },
        time_components_separator: ':'
      },
      ...Object.fromEntries(Object.entries(appSettings).filter(([key]) => key !== 'quizBotCharacter')),
    };
  }

  private _transformDataIos(type: 'quizSteps', data, quizPhotoPicker?: any, lang?: string) {
    switch (type) {
      case 'quizSteps': {
        return data.map((item, index) => {
          switch (item.type) {
            case 'paywall': {
              const {slider_three_plans, ...restItem} = item
              return {
                next_id: get(data, `${index + 1}.id`, null),
                ...restItem,
                paywall: {
                  slider_three_plans: {
                    ...slider_three_plans,
                    advantages: get(slider_three_plans, 'advantages', []).map(({
                                                                                 title,
                                                                                 image
                                                                               }) => ({
                      title,
                      imageUrl: get(image, 'url')
                    }))
                  }
                }
              }
            }
            default: {
              const input_options = (() => {
                switch (item.answer.type) {
                  case 'photo_picker': {
                    return null
                  }
                  case 'text_input': {
                    const {type, ...options} = item.answer.options;
                    return [{
                      id: new ObjectId(), ...options, ...item.answer.content
                    }]
                  }
                  case 'sign_in': {
                    const {type, ...options} = item.answer.options
                    return [{
                      id: new ObjectId(),
                      type,
                      ...options,
                    }]
                  }
                  default: {
                    const imageSet = randomImages[Math.floor(Math.random() * randomImages.length)];
                    return get(item, 'answer.content', []).map((c, index) => {
                      const fileUrl = get(c, 'file.url', get(imageSet, `${index}.url`));
                      const result = {
                        id: c.id,
                        text: c.text,
                        action: 'no_action',
                      }
                      if (c.file?.url || item.answer.type === 'vertical_options') {
                        result['image_url'] = fileUrl
                      }
                      if (c.analytic_key) {
                        result['base_value'] = c.analytic_key
                      }
                      return result
                    })
                  }
                }
              })()
              const result = {
                id: item.id,
                next_id: get(data, `${index + 1}.id`, null),
                type: 'message',
                key: item.key,
                message: {
                  messages: item.items.map(_item => ({
                    id: _item.id,
                    type: item.type === 'breakdown' && _item.type === 'matches_message' ? 'breakdown' : (_item.type === 'message' ? 'text' : 'text_with_image'),
                    direction: 'incoming',
                    content: _item.type === 'message' ? {
                      text: _item.content
                    } : {
                      title: get(_item, 'content.title'),
                      text: get(_item, 'content.subtitle'),
                      image_url: get(_item, 'content.file.url')
                    }
                  }))
                },
                input_info: {
                  required: true,
                  type: (() => {
                    switch (item.answer.type) {
                      case 'text_input': {
                        const isDate = get(item, 'answer.options.type') === 'date'
                        return isDate ? 'date_picker' : item.answer.type
                      }
                      default: {
                        return item.answer.type
                      }
                    }
                  })(),
                  ...(item.answer.type === 'photo_picker' ? {
                    photo_picker: quizPhotoPicker
                  } : {})
                }
              }
              if (get(item, 'answer.options.type') === 'date') {
                item.answer.options.button = lang === 'ru' ? 'Прдолжить' : 'Continue'
              }
              if (item.answer?.options?.button) {
                result.input_info['button'] = item.answer.options.button
              }
              if (input_options) {
                result.input_info['input_options'] = input_options
              }
              if (item.key) {
                result['key'] = item.key
              }
              return result
            }
          }
        })
      }
    }
  }
}
