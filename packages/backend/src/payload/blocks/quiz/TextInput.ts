import {Block} from 'payload/types';

export const TextInput: Block={
  slug:'text_input',
  labels:{
    singular:'text_input',
    plural:'text_input'
  },
  fields:[
    {
      name:'options',
      type:'group',
      fields:[
        {
          type:'row',
          fields:[
            {
              name:'type',
              type:'select',
              options:['text','date'],
              required:true,
              defaultValue:'text',
              admin:{
                width:'33.3%'
              }
            },
            {
              name:'required',
              type:'text',
              admin:{
                width:'33.3%'
              }
            },
            {
              name:'pattern',
              type:'text',
              admin:{
                condition:(data,{type}) => Boolean(type!=='date'),
                width:'33.3%'
              }
            },
            {
              name:'greaterThanYears',
              type:'number',
              admin:{
                condition:(data,{type}) => Boolean(type==='date'),
                width:'33.3%'
              }
            }
          ]
        },
      ]
    },
    {
      name:'content',
      type:'group',
      fields:[
        {
          name:'subtitle',
          type:'text'
        },
        {
          name:'placeholder',
          type:'text'
        }
      ]
    }
  ]
};
