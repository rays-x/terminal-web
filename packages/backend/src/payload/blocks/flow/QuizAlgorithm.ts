import {Block} from 'payload/types';

const QuizAlgorithm: Block = {
    slug: 'quiz_algorithm',
    labels: {
        singular: 'Quiz Algorithm',
        plural: 'Quiz Algorithm'
    },
    fields: [
        {
            name: 'items_length',
            type: 'select',
            options: ['10'],
            defaultValue: '10',
            required: true
        }
    ],
};
export default QuizAlgorithm
