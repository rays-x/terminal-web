import {Injectable} from '@nestjs/common';
import {get} from 'lodash';
import {Types} from "mongoose";
import {InjectModel} from "nestjs-typegoose";
import {ReturnModelType} from "@typegoose/typegoose";
import {differenceInYears} from "date-fns";
import UserEntity, {Languages} from "../entities/User";
import payload from "payload";
import MatchesEntity, {MatchType} from "../entities/Matches";
import {FeedActionType} from "../dto/Feed";
import ChatEntity from "../entities/Chat";
import chatEmitter from "../events/chats";
import {ChatService} from "./Chat";

const percentMatch = Array.from({length: 21}).map((_, i) => i + 80);

@Injectable()
export class FeedService {
  /*realCards: {
    [lang: string]: any[]
  } = {};*/
  fakeCards: {
    [lang: string]: any[]
  } = {};
  quizUsersAlgorithm: {
    [lang: string]: any[]
  } = {};

  constructor(
    @InjectModel(UserEntity) private readonly repoUser: ReturnModelType<typeof UserEntity>,
    @InjectModel(MatchesEntity) private readonly repoMatches: ReturnModelType<typeof MatchesEntity>,
    @InjectModel(ChatEntity) private readonly repoChat: ReturnModelType<typeof ChatEntity>,
  ) {
    setTimeout(() => {
      this._onInit()
    });
  }

  private async _onInit() {
    const languages: string[] = Object.values(Languages);
    await Promise.all(languages.map(async (lang: Languages) => {
      const cards = get(await payload.find({
        locale: lang,
        user: null,
        collection: 'user',
        depth: 3,
        where: {
          'fake': {
            equals: true
          },
          'language': {
            equals: lang
          }
        },
        limit: 999 * 999 * 999,
        sort: '-createdAt'
      }), 'docs', []);
      await Promise.all(cards.map(async card => {
        const author = new Types.ObjectId(card.id);
        const target = new Types.ObjectId('633cf28177f93dd1d6f87133')
        await this.repoMatches.findOneAndUpdate({
            author,
            target
          }, {
            author,
            target,
            type: MatchType.like
          },
          {
            upsert: true,
            new: true,
          });
      }))
      this.fakeCards[lang] = cards;
    }));
    await Promise.all(languages.map(async (lang: Languages) => {
      const cards = await payload.find({
        locale: lang,
        user: null,
        collection: 'quiz_user_data',
        depth: 3,
        where: {
          'or': [
            {
              'match': {
                exists: true
              },
            },
            {
              'nomatch': {
                exists: true
              },
            }
          ],
          'language': {
            equals: lang
          }
        },
        limit: 999 * 999 * 999,
        sort: '-createdAt'
      });
      this.quizUsersAlgorithm[lang] = get(cards, 'docs', []);
    }));
    // console.log('quizUsersAlgorithm', this.quizUsersAlgorithm['en'])
    /*await Promise.all(languages.map(async (language: Languages) => {
      const cards = await this.repoUser.find({
        language,
        fake: {
          $ne: true
        }
      }).select('-hasFinishedQuiz -roles -bans');
      this.realCards[language] = cards;
    }));*/
  }

  getPercentMatch(user, targetUser) {
    const addRandom = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let result = 50;
    result += addRandom[Math.floor(Math.random() * addRandom.length)]
    const [userInterests, targetUserInterests] = [
      user,
      targetUser
    ].map(_ => _.interests.reduce((prev, next) => {
      const type = get(next, 'type')
      if (!type) {
        return prev
      }
      return {
        ...prev,
        [type]: [
          ...get(prev, type, []),
          next
        ]
      }
    }, {}))
    get(this.quizUsersAlgorithm, user.language, [])
      .forEach(({id, match, nomatch, answer}) => {
        answer = get(answer, 0)
        const userFind = get(userInterests, 'quiz_user_data', [])
          .find(({identifier}) => identifier === id)
        const targetUserFind = get(targetUserInterests, 'quiz_user_data', [])
          .find(({identifier}) => identifier === id)
        const getAnswerIndexesId = (indexes) => {
          return get(answer, 'content').filter((_, i) => indexes.includes(i + 1)).map(_ => get(_, 'id'))
        }
        const isMatch = match.find(_ => {
          const answerIds = getAnswerIndexesId(_.split('+').map(Number))
          return answerIds.includes(get(userFind, 'answer'))
            && answerIds.includes(get(targetUserFind, 'answer'))
        })
        const isNomatch = nomatch.find(_ => {
          const answerIds = getAnswerIndexesId(_.split('+').map(Number))
          return answerIds.includes(get(userFind, 'answer'))
            && answerIds.includes(get(targetUserFind, 'answer'))
        })
        if (!isNomatch && isMatch) {
          result += 6
        }
        // console.log('isMatch', isMatch)
        // console.log('isNomatch', isNomatch)
      })
    const targetUserQuizJoined = get(targetUserInterests, 'quiz', [])
      .map(({identifier, answer}) => {
        return `${identifier}:${answer}`
      });
    get(userInterests, 'quiz', []).forEach(({identifier, answer}) => {
      const matchQuizInterests = targetUserQuizJoined.includes(`${identifier}:${answer}`)
      if (matchQuizInterests) {
        result += 10 / 50
      }
    })
    return Math.min(Math.round(result), 100);
  }

  async feed(userId: Types.ObjectId): Promise<any> {
    const user = await this.repoUser.findById(userId)
    const matchesId = (await this.repoMatches.find({
      author: new Types.ObjectId(userId)
    }).select('id')).flatMap(_ => String(_.id))
    const male = ['62fcc5dde47e1e0da9da9c23', '62f13bf53105ad2edd120602']
    const female = ['62fcc5e9e47e1e0da9da9c24', '62f13c1e3105ad2edd120603']
    // const both = ['62f13c2d3105ad2edd120604', '62fcc5f8e47e1e0da9da9c25']
    const relationship = ['62f15f727157ae861f809107', '62fcc6e4e47e1e0da9da9c29']
    const friendship = ['62f15f857157ae861f809108', '62fcc6f3e47e1e0da9da9c2a']
    const lookingForGender = (_): 'male' | 'female' | 'both' | undefined => {
      if (male.includes(get(_, 'params.lookingForSex'))) {
        return 'male'
      }
      if (female.includes(get(_, 'params.lookingForSex'))) {
        return 'female'
      }
      return 'both'
    };
    const lookingForPurpose = (_): 'relationship' | 'friendship' | undefined => {
      if (relationship.includes(get(_, 'params.purpose'))) {
        return 'relationship'
      }
      if (friendship.includes(get(_, 'params.purpose'))) {
        return 'friendship'
      }
      return undefined;
    };
    const getSex = (_): 'male' | 'female' | 'other' | undefined => {
      if (['62f13b553105ad2edd1205fd', '62fcc550e47e1e0da9da9c1d'].includes(get(_, 'params.sex'))) {
        return 'male'
      }
      if (['62f13b5e3105ad2edd1205fe', '62fcc564e47e1e0da9da9c1e'].includes(get(_, 'params.sex'))) {
        return 'female'
      }
      if (['62f13b673105ad2edd1205ff', '62fcc570e47e1e0da9da9c1f'].includes(get(_, 'params.sex'))) {
        return 'other'
      }
      return undefined;
    };
    const getPurpose = (_): 'relationship' | 'friendship' | undefined => {
      if (relationship.includes(get(_, 'params.purpose'))) {
        return 'relationship'
      }
      if (friendship.includes(get(_, 'params.purpose'))) {
        return 'friendship'
      }
      return undefined;
    };
    const lookingForAgeGetFilter = (id: string) => {
      const ageAr = [
        [18, 19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        [41, 42, 43, 44, 45, 46]
      ]
      switch (id) {
        case '62fcc881e47e1e0da9da9c2f':
        case '62f1676d7157ae861f809111': {
          return get(ageAr, 0, [])
        }
        case '62fcc890e47e1e0da9da9c31':
        case '62f1678e7157ae861f809113': {
          return get(ageAr, 1, [])
        }
        case '62f167767157ae861f809112':
        case '62fcc88ae47e1e0da9da9c30': {
          return get(ageAr, 2, [])
        }
        case '62f167987157ae861f809114':
        case '62fcc89ce47e1e0da9da9c32': {
          return get(ageAr, 3, [])
        }
        default: {
          return []
        }
      }
    }
    const lookingForAgeFilter = (_) => get(_, 'params.lookingForAge', '')
      .split(',')
      .reduce((prev, id) => [...prev, ...lookingForAgeGetFilter(id)], [])
    const getAge = (_): Number => {
      const [day, month, year] = get(_, 'params.birthday', '').split('/')
      if (!day || !month || !year) {
        return NaN;
      }
      try {
        return differenceInYears(new Date(), new Date(Number(year), Number(month) - 1, Number(day)))
      } catch (e) {
        return NaN;
      }
    }
    const fakeLookingForAge = lookingForAgeFilter(user)
    const userLookingForGender = lookingForGender(user);
    const fakeCards = this.fakeCards[user.language]
      .filter(item => {
        if (matchesId.includes(item.id)) {
          return false
        }
        return userLookingForGender === 'both'
          ? true
          : userLookingForGender === get(item, 'sex')
      })
    const realCards = (await this.repoUser.find({
      language: user.language,
      fake: {
        $ne: true
      },
      _id: {
        $nin: matchesId.map(id => new Types.ObjectId(id))
      }
    }).select('-hasFinishedQuiz -roles -bans'))
      .reduce((prev, item) => {
        item['sex'] = getSex(item)
        item['age'] = getAge(item)
        item['purpose'] = getPurpose(item)
        if (item.id === user.id || !item['sex'] || !item['purpose'] || isNaN(item['age'])) {
          return prev;
        }
        return [...prev, item];
      }, [])
      .filter(item => {
        const itemLookingForGender = get(item, 'sex')
        return !(
          !(
            itemLookingForGender
              ? [itemLookingForGender, 'both'].includes(userLookingForGender)
              : true
          )
          || ![getSex(user), 'both'].includes(itemLookingForGender)
          || !lookingForAgeFilter(user).includes(item['age'])
          || !lookingForAgeFilter(item).includes(getAge(user))
          || lookingForPurpose(user) !== item['purpose']
          || lookingForPurpose(item) !== getPurpose(user));
      })
    return [...realCards, ...fakeCards]
      .map(item => {
        const photos = get(item, 'photos', []);
        const imageUrl = get(get(photos, photos.length - 1), 'photo.url')
        return {
          id: item['id'],
          name: item['name'],
          age: item.fake
            ? fakeLookingForAge[Math.floor(Math.random() * fakeLookingForAge.length)]
            : item.age,
          matchPercentString:
            (item.fake ? `${percentMatch[Math.floor(Math.random() * percentMatch.length)]}`
              : this.getPercentMatch(user, item))
            + `% ${user.language === Languages.EN ? 'match' : 'мэтч'}`,
          imageUrl
        }
      })
      .filter(({name, imageUrl}) => name && imageUrl)
      .sort(() => .5 - Math.random())
  }

  async feedAction(author: Types.ObjectId, target: Types.ObjectId, type: FeedActionType): Promise<{
    isMatched: boolean
    chat: ChatEntity | null
  }> {
    try {
      await this.repoMatches.findOneAndUpdate({
          author,
          target
        }, {
          author,
          target,
          type
        },
        {
          upsert: true,
          new: true,
        });
      if (await this.repoMatches.count({
        target: author,
        author: target,
        type: FeedActionType.like
      })) {
        const chat = await this.repoChat.findOneAndUpdate({
            participants: {
              $all: [
                {$elemMatch: {$eq: new Types.ObjectId(author)}},
                {$elemMatch: {$eq: new Types.ObjectId(target)}}
              ],
              $size: 2
            },
          }, {
            participants: [author, target],
          },
          {
            upsert: true,
            new: true
          }).select('-messages')
        if (chat && chat.createdAt.getTime() === chat.updatedAt.getTime()) {
          chatEmitter.emit('newChat', chat)
        }
        return {
          isMatched: true,
          chat: ChatService.formatForIos(chat, author)
        }
      }
    } catch (e) {
      console.error(e)
    }
    return {
      isMatched: false,
      chat: null
    }
  }

  async deleteMatches(userId: Types.ObjectId): Promise<boolean> {
    try {
      await this.repoMatches.deleteMany({
        author: new Types.ObjectId(userId),
      });
    } catch (e) {
      console.error(e)
    }
    return true
  }
}
