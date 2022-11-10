import {GlobalConfig} from 'payload/types';
import {get} from "lodash";
import {isObject} from "../utilities/deepMerge";
import serializeHtmlMarkdown from "../../utils/serelizeHtmlMarkdown";
import serializeSlateHtml from "../../utils/serelizeSlateHtml";

const AppSettings: GlobalConfig = {
  slug: 'appSettings',
  access: {
    read: () => true,
  },
  admin: {
    hideAPIURL: true
  },
  versions: {
    drafts: true
  },
  hooks: {
    beforeRead: [({
                    doc,
                    req
                  }) => {
      if (req.payloadAPI !== 'local') {
        return;
      }
      Object.entries(get(doc, 'errorAlerts', {})).forEach(([key, value]) => {
        doc['errorAlerts'][key]['photo_error']['actions'] = get(value, `photo_error.actions`, [])
          .map((item) => get(item, 'text', null))
        doc['errorAlerts'][key]['inappropriate_photo']['actions'] = get(value, `inappropriate_photo.actions`, [])
          .map((item) => get(item, 'text', null))
        doc['errorAlerts'][key]['internet_error']['actions'] = get(value, `internet_error.actions`, [])
          .map((item) => get(item, 'text', null))
      })
    }]
  },
  fields: [
    {
      name: 'quizBotCharacter',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true
        },
        {
          name: 'step_number_string',
          type: 'text',
          required: true
        },
        {
          name: 'question_number_string',
          type: 'text',
          required: true
        }
      ]
    },
    {
      name: 'quizPhotoPicker',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'changeProfilePhoto',
          type: 'text',
          required: true
        },
        {
          name: 'takePhoto',
          type: 'text',
          required: true
        },
        {
          name: 'chooseFromLibrary',
          type: 'text',
          required: true
        },
        {
          name: 'cancel',
          type: 'text',
          required: true
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true
        },
        {
          name: 'selectedButtonText',
          type: 'text',
          required: true
        },
        {
          name: 'noAccessCameraTitle',
          type: 'text',
          required: true
        },
        {
          name: 'noAccessCameraSubtitle',
          type: 'text',
          required: true
        },
        {
          name: 'noAccessCameraBack',
          type: 'text',
          required: true
        },
        {
          name: 'noAccessCameraEnable',
          type: 'text',
          required: true
        }
      ]
    },
    {
      name: 'quizPreAuth',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true
        },
        {
          name: 'continueButton',
          type: 'text',
          required: true
        },
        {
          name: 'cancelButton',
          type: 'text',
          required: true
        }
      ],
    },
    {
      name: 'quizAuth',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'cancelButton',
          type: 'text',
          required: true
        }
      ],
    },
    {
      name: 'photoCropper',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'cancelButton',
          type: 'text',
          required: true
        },
        {
          name: 'cropButton',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'swiper',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true
        },
        {
          name: 'loading',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true
            }
          ]
        },
        {
          name: 'outOfCards',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true
            },
            {
              name: 'subtitle',
              type: 'text',
              required: true
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true
            },
          ]
        },
        {
          name: 'block_more',
          type: 'group',
          localized: true,
          fields: [
            {
              name: 'block',
              type: 'text',
              required: true
            },
            {
              name: 'report',
              type: 'text',
              required: true
            }, {
              name: 'cancel',
              type: 'text',
              required: true
            }
          ],
        },
        {
          name: 'block_report',
          type: 'group',
          localized: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true
            },
            {
              name: 'fake',
              type: 'text',
              required: true
            }, {
              name: 'scam',
              type: 'text',
              required: true
            }, {
              name: 'other',
              type: 'text',
              required: true
            }, {
              name: 'cancel',
              type: 'text',
              required: true
            }
          ],
        },
        {
          name: 'block_reported',
          type: 'group',
          localized: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true
            },
            {
              name: 'subtitle',
              type: 'text',
              required: true
            }, {
              name: 'ok',
              type: 'text',
              required: true
            }
          ],
        },
      ],
    },
    {
      name: 'dialogueConfig',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'placeholder',
          type: 'text',
          required: true,
        },
        {
          name: 'actionsMenu',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true
            },
            {
              name: 'blockUserButton',
              type: 'text',
              required: true
            },
            {
              name: 'cancelButton',
              type: 'text',
              required: true
            }
          ]
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true
        },
        {
          name: 'premiumTitle',
          type: 'text',
          required: true
        },
        {
          name: 'premiumSubtitle',
          type: 'text',
          required: true
        },
        {
          name: 'groupHeader',
          type: 'text',
          required: true
        },
        {
          name: 'privacyButton',
          type: 'text',
          required: true
        },
        {
          name: 'termsButton',
          type: 'text',
          required: true
        },
        {
          name: 'logoutButton',
          type: 'text',
          required: true
        },
        {
          name: 'deleteButton',
          type: 'text',
          required: true
        },
      ],
    },
    {
      name: 'paywall',
      type: 'group',
      localized: true,
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
          name: 'video_two_plans',
          type: 'group',
          required: true,
          fields: [
            {
              name: 'restore',
              type: 'text'
            },
            {
              name: 'title',
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
                  name: 'first',
                  type: 'group',
                  required: true,
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                    },
                    {
                      name: 'isSelected',
                      type: 'checkbox',
                    },
                    {
                      name: 'subtitle',
                      type: 'text',
                    }
                  ]
                },
                {
                  name: 'second',
                  type: 'group',
                  required: true,
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                    },
                    {
                      name: 'isSelected',
                      type: 'checkbox',
                    },
                    {
                      name: 'subtitle',
                      type: 'text',
                    }
                  ]
                }
              ]
            }
          ]
        },
      ],
    },
    {
      name: 'deleteAccount',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true
        }, {
          name: 'subtitle',
          type: 'text',
          required: true
        }, {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true
        }, {
          name: 'alertTitle',
          type: 'text',
          required: true
        }, {
          name: 'alertSubtitle',
          type: 'text',
          required: true
        },
      ],
    },
    {
      name: 'deleteConfirmAccount',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'confirmationTitle',
          type: 'text',
          required: true
        }, {
          name: 'confirmationButton',
          type: 'text',
          required: true
        }, {
          name: 'cancelButton',
          type: 'text',
          required: true
        }
      ],
    },
    {
      name: 'chats',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'emptyTitle',
          type: 'text',
          required: true
        },
        {
          name: 'emptySubtitle',
          type: 'text',
          required: true
        },
        {
          name: 'emptyImage',
          type: 'upload',
          relationTo: 'media',
          required: true
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true
        },
        {
          name: 'messagePlaceholder',
          type: 'text',
          required: true
        },
        {
          name: 'newMatchText',
          type: 'text',
          required: true
        }
      ],
    },
    {
      name: 'onboardingDeletedUserAlert',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true
        }, {
          name: 'subtitle',
          type: 'text',
          required: true
        }
      ],
    },
    {
      name: 'errorAlerts',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'photo_error',
          type: 'group',
          required: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true
            },
            {
              name: 'subtitle',
              type: 'text',
              required: true
            },
            {
              name: 'actions',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true
                }
              ],
            },
          ]
        },
        {
          name: 'inappropriate_photo',
          type: 'group',
          required: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true
            },
            {
              name: 'subtitle',
              type: 'text',
              required: true
            },
            {
              name: 'actions',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true
                }
              ],
            },
          ]
        },
        {
          name: 'internet_error',
          type: 'group',
          required: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true
            },
            {
              name: 'subtitle',
              type: 'text',
              required: true
            },
            {
              name: 'actions',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true
                }
              ],
            },
          ]
        },
        {
          name: 'reconnecting',
          type: 'text',
          required: true
        }
      ],
    },
    {
      name: 'matchedConfig',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true
        },
        {
          name: 'bottomText',
          type: 'text',
          required: true
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true
        }
      ],
    },
  ],
};

export default AppSettings;
