import {Block} from 'payload/types';
import {get} from "lodash";

const Paywall: Block = {
  slug: 'paywall',
  labels: {
    singular: 'PaywallChat', plural: 'PaywallChat'
  },
  fields: [
    {
      name: 'slider_three_plans',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'restore',
          type: 'text'
        },
        {
          name: 'isSkippable',
          type: 'checkbox',
          required: true
        },
        {
          name: 'button',
          type: 'text',
          required: true
        },
        {
          name: 'termsAndConditions',
          type: 'text',
          required: true
        },
        {
          name: 'products',
          type: 'group',
          required: true,
          fields: [
            {
              name: 'left',
              type: 'group',
              required: true,
              fields: [
                {
                  name: 'hotSaleOffer',
                  type: 'text',
                },
                {
                  name: 'isSelected',
                  type: 'checkbox',
                },
                {
                  name: 'additionalDescription',
                  type: 'text',
                }
              ]
            },
            {
              name: 'central',
              type: 'group',
              required: true,
              fields: [
                {
                  name: 'hotSaleOffer',
                  type: 'text',
                },
                {
                  name: 'isSelected',
                  type: 'checkbox',
                },
                {
                  name: 'additionalDescription',
                  type: 'text',
                }
              ]
            },
            {
              name: 'right',
              type: 'group',
              required: true,
              fields: [
                {
                  name: 'hotSaleOffer',
                  type: 'text',
                },
                {
                  name: 'isSelected',
                  type: 'checkbox',
                },
                {
                  name: 'additionalDescription',
                  type: 'text',
                }
              ]
            }
          ]
        },
        {
          name: 'advantages',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true
            }
          ]
        },
      ]
    },
    {
      name: 'input_info',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'required',
          type: 'checkbox',
          required: true
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: ['no_input']
        },
      ]
    }
  ],
};
export default Paywall