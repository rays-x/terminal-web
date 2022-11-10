import csv from 'csvtojson';
import {get} from 'lodash';
import {writeFileSync} from 'fs';
import {Payload} from "payload";
import {promiseMap} from "../utils";
import {Logger} from "../config/logger/api-logger";
import {Languages} from "../entities/User";

const importQuiz = async (payload: Payload) => {
  const fileData: any[] = await csv().fromFile(`${__dirname}/soulmate.quiz.csv`)
  const fileDataTranslates: any[] = await csv().fromFile(`${__dirname}/translates.csv`)
  const quiz = Object.values(fileData
    .reduce((prev, next, index) => {
      next['Id'] = get(next, 'Id') || get(prev, `${index - 1}.Id`);
      return [...prev, next]
    }, [])
    .reduce((prev, next) => {
      const translateItem = fileDataTranslates.find(_ => _.Id === next.Id)
      if (!translateItem || next.Locale.toLowerCase() === 'ru') {
        return prev;
      }
      let {
        Id,
        Locale,
        Question,
        ['Question type']: QuestionType,
        ['Answer type']: AnswerType,
        ['Selector type']: SelectorType,
        ['vertical_options subtypes']: vertical_optionsSubtypes,
        ['two_horizontal_options subtypes']: two_horizontal_optionsSubtypes,
        A,
        B,
        C,
        D,
      } = next
      if (translateItem.Question) {
        Question = translateItem.Question
      }
      if (translateItem.A) {
        A = translateItem.A
      }
      if (translateItem.B) {
        B = translateItem.B
      }
      if (translateItem.C) {
        C = translateItem.C
      }
      if (translateItem.D) {
        D = translateItem.D
      }
      const locale = Locale.toLowerCase();
      const docId = Number(Id);
      const items = {
        ...get(prev, `${docId}.items`, {}),
        [locale]: [
          {
            blockType: QuestionType,
            content: Question
          }
        ]
      }
      const answer = (() => {
        const result = {
          blockType: SelectorType
        }
        result['content'] = (() => {
          switch (result.blockType) {
            case 'text_input': {
              result['options'] = {
                options: {
                  type: 'text',
                  required: 'This field may not be blank.',
                  pattern: null
                },
              }
              return {
                subtitle: null,
                placeholder: null
              }
            }
            case 'vertical_actions':
            case 'two_columns_options': {
              return [A, B, C, D].filter(Boolean).map((_) => ({
                text: _
              }))
            }
            case 'vertical_options': {
              return [A, B, C, D].filter(Boolean).map(_ => ({
                file: null,
                text: _
              }))
            }
            case 'two_horizontal_options': {
              return [A, B, C, D].filter(Boolean).filter((_, i) => i < 2).map((_, i) => ({
                file: (two_horizontal_optionsSubtypes === 'Yes/No' ? (i == 0 ? '62f77951f2dc1d8b09668ced' : (i == 1 ? '62f77958f2dc1d8b09668cfa' : null)) : (i == 0 ? '6306052798734e4fc5f8db75' : (i == 1 ? '6306053c98734e4fc5f8db82' : null))),
                text: _
              }))
            }
            default: {
              return null;
            }
          }
        })();
        return [result]
      })();
      const _answer = {
        ...get(prev, `${docId}.answer`, {}),
        [locale]: answer
      }
      return {
        ...prev,
        [docId]: {
          docId,
          items,
          answer: _answer,
        }
      }
    }, {}));
  writeFileSync(`${__dirname}/soulmate.quiz.json`, JSON.stringify(quiz, null, 2), 'utf-8')
  const quizExistsEn = (await payload.find({
    collection: 'quiz',
    limit: 999 * 999,
    locale: Languages.EN,
    depth: 0
  })).docs
  /*const quizExistsRu = (await payload.find({
    collection: 'quiz',
    limit: 999 * 999,
    locale: Languages.RU,
    depth: 0
  })).docs*/
  await promiseMap(quiz, async (item) => {
    const existEn = quizExistsEn.find(({docId}) => {
      return docId === item.docId;
    });
    /*const existRu = quizExistsRu.find(({docId}) => {
      return docId === item.docId;
    });*/
    if (!existEn /*|| !existRu*/) {
      return;
    }
    const itemEn = {
      ...existEn,
      ...item,
      items: get(item, 'items.en', []),
      answer: get(item, 'answer.en', []),
    }
    /*const itemRu = {
      ...existRu,
      ...item,
      items: get(item, 'items.ru', []),
      answer: get(item, 'answer.ru', []),
    }*/
    try {
      await payload.update({
        collection: 'quiz',
        id: existEn.id,
        data: itemEn,
        locale: Languages.EN
      });
      /*await payload.update({
        collection: 'quiz',
        id: existRu.id,
        data: itemRu,
        locale: Languages.RU
      });*/
    } catch (e) {
      Logger.error(e)
      console.log([
        JSON.stringify(itemEn, null, 2),
        // JSON.stringify(itemRu, null, 2)
      ])
    }
  })
  Logger.info('import of quiz is done')
}
export default importQuiz