import {Block} from 'payload/types';
import QuizAlgorithm from "./QuizAlgorithm";
import QuizUserData from "./QuizUserData";
import Breakdown from "./Breakdown";
import PaywallChat from "./PaywallChat";

const QuizContainer: Block = {
    slug: 'quizContainer',
    labels: {
        singular: 'Quiz Container',
        plural: 'Quiz Containers'
    },
    fields: [
        {
            name: 'items',
            type: 'blocks',
            minRows: 1,
            blocks: [
                QuizAlgorithm,
                QuizUserData,
                Breakdown,
                PaywallChat,
            ],
        },
    ],
};
export default QuizContainer
