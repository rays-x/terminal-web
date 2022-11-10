import {Block} from 'payload/types';

export const SignIn: Block={
  slug:'sign_in',
  labels:{
    singular:'sign_in',
    plural:'sign_in'
  },
  fields:[
    {
      name:'options',
      type:'group',
      fields:[
        {
          name:'type',
          type:'select',
          options:['apple'],
          required:true,
          defaultValue:'apple',
        }
      ]
    }
  ]
};
