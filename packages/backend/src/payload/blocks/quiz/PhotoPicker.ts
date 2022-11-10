import {Block} from 'payload/types';

export const PhotoPicker: Block={
  slug:'photo_picker',
  labels:{
    singular:'photo_picker',
    plural:'photo_picker'
  },
  fields:[
    {
      name:'placeholder',
      type:'text',
      required:true
    }
  ]
};
