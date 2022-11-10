import {Payload}    from 'payload';
import {Logger}     from '../config/logger/api-logger';
import {get}        from 'lodash';
import it           from 'node:test';
import {promiseMap} from '../utils';

const algorithmQuiz=async(payload: Payload) => {
  const categories={};
  const questions=[];
  const quizModel=payload.collections['quiz'].Model;
  const quiz=(await payload.find({
    collection:'quiz',
    limit:999*999,
    locale:'en'
  })).docs.map((item) => {
    item['answer']=get(item,'answer.0');
    const type=get(item,'answer.blockType');
    const question=get(item,'items',[]).reduce((p,n) => {
      return get(n,'content','')+p;
    },'');
    if(!question){
      console.error(item);
    }
    /*if(['62ea38406391a4b3221d0c63','62ea382c6391a4b3221d0c39'].includes(item.category.id)){
      console.log(item.category);
      try{
        await quizModel.updateOne({
          _id:item.id
        },{
          category:'62f4c1c11773594fb0aa5ae0'
        });
      }catch(e){
        console.error(e);
      }
    }*/
    questions.push(question);
    categories[item.category.name]=[
      ...get(categories,item.category.name,[]),
      item.id
    ];
    if(!type){
      console.error(item);
    }
    return item;
  });
  const categoriesObj=Object.fromEntries(
    Object.entries(categories)
      .map(([key,value]) => [key,Math.floor((Array.from(value as any).length/100)*5)])
      .sort(([,a],[,b]) => Number(a)-Number(b))
  );
  const smallestQuestion=questions.reduce((p,n) => {
    return !p? n: (n.length<p.length? n: p);
  },'').length;
  const longestQuestion=questions.reduce((p,n) => {
    return !p? n: (n.length>p.length? n: p);
  },'').length;
  const midPoint=(smallestQuestion+longestQuestion)/2;
  const groups={
    1:[],
    2:[],
    3:[]
  };
  quiz
    .sort((a,b) => {
      const questionLengthA=get(a,'items',[]).reduce((p,n) => {
        return get(n,'content','')+p;
      },'').length;
      const questionLengthB=get(b,'items',[]).reduce((p,n) => {
        return get(n,'content','')+p;
      },'').length;
      return questionLengthA-questionLengthB;
    })
    .forEach(item => {
      const questionLength=get(item,'items',[]).reduce((p,n) => {
        return get(n,'content','')+p;
      },'').length;
      const closest=[smallestQuestion,longestQuestion,midPoint].reduce((prev,curr) => {
        return (Math.abs(curr-questionLength)<Math.abs(prev-questionLength)? curr: prev);
      });
      if(closest===smallestQuestion){
        if(groups[1].length<quiz.length/3){
          groups[1].push(item);
        }else{
          groups[2].push(item);
        }
      }
      if(closest===midPoint){
        if(groups[2].length<quiz.length/3){
          groups[2].push(item);
        }else{
          groups[3].push(item);
        }
      }
      if(closest===longestQuestion){
        groups[3].push(item);
      }
    });
  const split=(ar: any[],all=false) => {
    const randomize=ar.sort(() => .5-Math.random());
    return randomize.reduce((p,n,i) => {
      const main=p[0];
      const additional=p[1];
      const lastAr=main.at(-1)||[];
      if(i>=300&& !all){
        additional.push(n);
      }else{
        lastAr.push(n);
      }
      return [
        [
          ...(main.length>1? main.filter((_,_i) => _i<(main.length-1)): []),
          lastAr,
          ...(lastAr.length===50&&(!all? i+1<300: (i+1<randomize.length))? [[]]: [])
        ],
        additional
      ];
    },[[],[]]);
  };
  groups[1]=split(groups[1]);
  groups[2]=split([...groups[2],...groups[1][1]]);
  groups[1]=groups[1][0];
  groups[3]=split([...groups[3],...groups[2][1]],true);
  groups[2]=groups[2][0];
  groups[3]=groups[3][0];
  Object.entries(groups).map(([group,_ar]) => {
    _ar.forEach(ar => {
      ar.forEach(({id}) => {
        quiz[quiz.findIndex(({id:_id}) => id===_id)]['group']=Number(group);
      });
    });
  });
  const makeFinalGroup=Array.from({length:20})/*.map((_,i) => i+1)*/.map((_,step) => {
    const categoriesCopy={
      ...categoriesObj
    };
    const getCategory=(any=false) => {
      const found=Object.entries(categoriesCopy)
        .sort(() => .5-Math.random())
        .find(([,value]) => value>0||any);
      return found? found[0]: getCategory(true);
    };
    const getQuizCats=(_group=undefined,cat=undefined) => quiz.filter(({
      group,
      taken,
      category:{name}
    }) => (cat? (name===cat): true)&&(_group? group===_group: true)&& !taken);
    let last: 'third'|'second'|'first'='third';
    let first=0;
    let second=0;
    let third=0;
    let skipped=0;
    const result=[];
    for(let i=0; i<50;){
      if(result.length>=50){
        break;
      }
      const category=getCategory();
      switch(last){
      case 'third':{
        const _quiz=getQuizCats(1,category);
        const foundAny=get(_quiz,0,get(getQuizCats(1),0,get(getQuizCats(),0)));
        const skip=!(first<15);
        if(foundAny&& !skip){
          quiz[quiz.findIndex(f => f.id===foundAny.id)]['taken']=true;
          categoriesCopy[category]--;
          first++;
          result.push(foundAny);
          skipped=0;
          i++;
        }else if(!foundAny&& !skip){
          skipped++;
        }
        last='first';
        break;
      }
      case 'first':{
        const _quiz=getQuizCats(2,category);
        const foundAny=get(_quiz,0,get(getQuizCats(2),0,get(getQuizCats(),0)));
        const skip=!(second<15);
        if(foundAny&& !skip){
          quiz[quiz.findIndex(f => f.id===foundAny.id)]['taken']=true;
          categoriesCopy[category]--;
          second++;
          result.push(foundAny);
          skipped=0;
          i++;
        }else if(!foundAny&& !skip){
          skipped++;
        }
        last='second';
        break;
      }
      case 'second':{
        const _quiz=getQuizCats(3,category);
        const foundAny=get(_quiz,0,get(getQuizCats(3),0,get(getQuizCats(),0)));
        const skip=!(third<20);
        if(foundAny&& !skip){
          quiz[quiz.findIndex(f => f.id===foundAny.id)]['taken']=true;
          categoriesCopy[category]--;
          third++;
          result.push(foundAny);
          skipped=0;
          i++;
        }else if(!foundAny&& !skip){
          skipped++;
        }
        last='third';
        break;
      }
      }
    }
    return result;
  });
  await Promise.all(makeFinalGroup.map(async(ar,index) => {
    await promiseMap(ar,async item => {
      try{
        await quizModel.updateOne({
          _id:item.id
        },{
          group:index+1
        });
      }catch(e){
        console.error(e);
      }
    });
  }));
  await promiseMap(Object.entries(groups),async([key,value]) => {
    return;
    /*await promiseMap(value,async group => {
      await promiseMap(group,async item => {
        const answersLength=get(item,'answer.content',[]).length;
        const segment=`${answersLength}${key}`;
        try{
          await quizModel.updateOne({
            _id:item.id
          },{
            segment
          });
        }catch(e){
          console.error(e);
        }
        console.log('segment',segment);
      });
    });*/
  });
  /*console.log('groups',{
    1:[groups[1].length,groups[1].map(_ => _.length)],
    2:[groups[2].length,groups[2].map(_ => _.length)],
    3:[groups[3].length,groups[3].map(_ => _.length)]
  });*/
  Logger.info('algorithmQuiz is done');
};
export default algorithmQuiz;
