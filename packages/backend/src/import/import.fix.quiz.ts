import csv from 'csvtojson';
import {get} from 'lodash';
import {Payload} from 'payload';
import {promiseMap} from '../utils';
import {Logger} from '../config/logger/api-logger';

const importFixQuiz=async (payload: Payload)=>{
  const fileData: any[]=await csv().fromFile(`${__dirname}/soulmate.quiz.csv`);
  const quiz=Object.values(fileData.reduce((prev,next,index)=>{
    next['Id']=get(next,'Id')||get(prev,`${index-1}.Id`);
    return [...prev,next];
  },[]).reduce((prev,next)=>{
    const {
      Id,
      Locale,
      Question,
      ['Question type']: QuestionType,
      ['Selector type']:SelectorType,
      ['two_horizontal_options subtypes']:two_horizontal_optionsSubtypes,
      A,
      B,
      C,
      D
    }=next;
    const locale=Locale.toLowerCase();
    const docId=Number(Id);
    if(docId==1){
    }
    const items = {
      ...get(prev, `${docId}.items`, {}),
      [locale]: [
        {
          blockType: QuestionType,
          content: Question
        }
      ]
    }
    const answer=(()=>{
      const result={
        blockType:SelectorType
      };
      result['content']=(()=>{
        switch(result.blockType){
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
          case 'two_horizontal_options':{
            return [A,B,C,D].filter(Boolean).filter((_,i)=>i<2).map((_,i)=>({
              file:(two_horizontal_optionsSubtypes==='Yes/No' ? (i==0 ? '62f77951f2dc1d8b09668ced' : (i==1 ? '62f77958f2dc1d8b09668cfa' : null)) : (i==0 ? '6306052798734e4fc5f8db75' : (i==1 ? '6306053c98734e4fc5f8db82' : null))),
              text:_
            }));
          }
          default:{
            return null;
          }
        }
      })();
      return [result];
    })();
    const _answer={
      ...get(prev,`${docId}.answer`,{}),[locale]:answer
    };
    if(!(['vertical_actions','two_columns_options','vertical_options','two_horizontal_options'].includes(SelectorType))){
      return prev;
    }
    return {
      ...prev,[docId]:{
        docId,
        items,
        answer:_answer
      }
    };
  },{}));
  console.log('quiz', quiz[0]['items']);
  const quizExists=(await payload.find({
    collection:'quiz',limit:999*999
  })).docs;
  const quizModel=payload.collections['quiz'].Model;
  await promiseMap(quiz,async (item)=>{
    const existId=quizExists.find(({docId})=>{
      return docId===item.docId;
    });
    if(!existId){
      return;
    }
    try{
      await quizModel.updateOne({
        _id:existId.id
      },{
        answer:item.answer,
        items:item.items
      });
    }catch(e){
      console.error(e);
    }
  });
  Logger.info('import of quiz fix is done');
};
export default importFixQuiz;
