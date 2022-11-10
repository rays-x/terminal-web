import {Payload} from 'payload';
import {promiseMap} from '../utils';
import {Logger} from '../config/logger/api-logger';
import {get} from "lodash";

const importLangQuizUserDataFix=async (payload: Payload)=>{
  // console.log('quiz', quiz);
  const localsQuiz=await promiseMap(['en','ru'],async locale=>{
    const quizExists=(await payload.find({
      collection:'quiz_user_data',locale,depth:0,limit:999*999*999
    })).docs;
    return [locale,quizExists]
  })
  await promiseMap(localsQuiz,async ([locale,quizExists])=>{
    await promiseMap(quizExists,async ({id,...data})=>{
      data['items']=data.items.map(item=>({
        ...item,content:get(item,`content.${locale}`,undefined)
      }))
      data['answer']=(()=>{
        const {answer}=data
        return answer.map(an=>{
          if(get(an,'blockType')!=='vertical_actions') return an;
          an['content']=an['content'][locale]
          return an
        })
      })()
      try{
        await payload.update({
          id,locale,collection:'quiz_user_data',data
        })
      }catch(e){
        console.error(id,e);
      }
    });
  })
  Logger.info('import of lang fix is done');
};
export default importLangQuizUserDataFix;
