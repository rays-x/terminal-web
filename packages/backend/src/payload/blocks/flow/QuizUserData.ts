import {Block} from 'payload/types';

const QuizUserData: Block = {
    slug: 'quiz_user_data',
    labels: {
        singular: 'Quiz User Data',
        plural: 'Quiz User Data'
    },
    fields: [
        {
            name:'item',
            type:'relationship',
            relationTo:'quiz_user_data',
            required:true
        }
    ],
};
export default QuizUserData