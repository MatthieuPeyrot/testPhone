const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
import {getFireNumber, modConv, updateFireBot, updateFireBot2} from './utils'

const frenchReply = async (result, message, text, isFB, local, length) => {
  if (((result.action && result.action.slug === 'bonjour' && result.action.done) || (result.nextActions && result.nextActions[0] && result.nextActions[0].slug === 'oui' && !result.nextActions[0].done)) || (result.entities && result.entities.salutations)) {
    if (result.nextActions && result.nextActions[0] && result.nextActions[0].slug === 'oui' && !result.nextActions[0].done) length--
    if (!local) {
      result.replies.forEach((replyContent, i) => {
        if (i < length) {
          message.addReply({ type: 'text', content: replyContent })
        } else {
          if (isFB) {
            message.addReply({
              type: 'quickReplies',
              content: {
                title: 'Bonjour! Nous avons besoin de connaître votre pays?',
                buttons: [
                  {
                    title: 'France',
                    value: 'France'
                  },
                  {
                    title: 'Royaume-Uni',
                    value: 'Royaume-Uni'
                  },
                  {
                    title: 'Etats Unis',
                    value: 'Etats Unis'
                  },
                  {
                    title: 'Australie',
                    value: 'Australie'
                  },
                  {
                    title: 'Espagne',
                    value: 'Espagne'
                  },
                  {
                    title: 'Pologne',
                    value: 'Pologne'
                  },
                  {
                    title: 'Pays Bas',
                    value: 'Pays Bas'
                  },
                  {
                    title: 'Autre',
                    value: 'Autre'
                  }
                ]
              }
            })
          } else {
            message.addReply({
              type: 'quickReplies',
              content: {
                title: 'Bonjour! Nous avons besoin de connaître votre pays?',
                buttons: [
                  {
                    title: 'France',
                    value: 'France'
                  },
                  {
                    title: 'Royaume-Uni',
                    value: 'Royaume-Uni'
                  },
                  {
                    title: 'Etats Unis',
                    value: 'Etats Unis'
                  },
                  {
                    title: 'Australie',
                    value: 'Australie'
                  },
                  {
                    title: 'Espagne',
                    value: 'Espagne'
                  }
                ]
              }
            })
            message.addReply({
              type: 'quickReplies',
              content: {
                title: '',
                buttons: [
                  {
                    title: 'Pologne',
                    value: 'Pologne'
                  },
                  {
                    title: 'Pays Bas',
                    value: 'Pays Bas'
                  },
                  {
                    title: 'Autre',
                    value: 'Autre'
                  }
                ]
              }
            })
          }
        }
      })
    } else {
      result.replies.forEach((replyContent, i) => {
        if (i < length) {
          message.addReply({ type: 'text', content: replyContent })
        } else {
          if (i <= length) {
            message.addReply({
              type: 'quickReplies',
              content: {
                title: 'Bonjour! Utilisez vous déjà Voxist?',
                buttons: [
                  {
                    title: 'Oui',
                    value: 'oui'
                  },
                  {
                    title: 'Non',
                    value: 'pas du tout'
                  }
                ]
              }
            })
          } else {
            modConv(message.senderId, {tel: null})
          }
        }
      })
    }
  } else if ((result.action && result.action.slug === 'country' && result.action.done) || (result.entities && result.entities.salutations)) {
    result.replies.forEach((replyContent, i) => {
      if (!local) {
        message.addReply({ type: 'text', content: 'Malheureusement Voxist n\'est pas encore disponible dans votre pays.' })
      } else {
        if (i < length) {
          message.addReply({ type: 'text', content: replyContent })
        } else {
          message.addReply({
            type: 'quickReplies',
            content: {
              title: 'Utilisez vous déjà Voxist?',
              buttons: [
                {
                  title: 'Oui',
                  value: 'oui'
                },
                {
                  title: 'Non',
                  value: 'non'
                }
              ]
            }
          })
        }
      }
    })
  } else if (((result.action && result.action.slug === 'non') || (result.nextActions && result.nextActions[0] && result.nextActions[0].slug === 'non' && !result.nextActions[0].done)) || (result.entities && result.entities.non1)) {
    if (result.nextActions && result.nextActions[0] && result.nextActions[0].slug === 'non' && !result.nextActions[0].done) length--
    result.replies.forEach((replyContent, i) => {
      if (i < length) {
        message.addReply({ type: 'text', content: replyContent })
      } else {
        if (i <= length) {
          if (local === 'FR' || local === 'US') {
            message.addReply({
              type: 'quickReplies',
              content: {
                title: 'Voulez vous testez Voxist?',
                buttons: [
                  {
                    title: 'Oui',
                    value: 'test oui'
                  },
                  {
                    title: 'Non',
                    value: 'test pas'
                  }
                ]
              }
            })
          } else {
            message.addReply({ type: 'text', content: 'Malheureusement les tests ne sont pas disponibles dans votre pays.' })
          }
        } else {
          modConv(message.senderId, {rep2: null})
        }
      }
    })
  } else if (result.action && result.action.slug === 'testservice' && result.action.done) {
    if (text.toLocaleLowerCase() === 'test oui') {
      if (isFB) {
        result.replies.forEach((replyContent, i) => {
          if (i < length) {
            message.addReply({ type: 'text', content: replyContent })
          } else {
            if (local === 'FR') {
              message.addReply({
                type: 'card',
                content: {
                  title: 'Contactez Voxist pour tester notre app',
                  subtitle: 'Ceci va lancer un appel vocal',
                  imageUrl: 'https://images-platform.99static.com/bSeJTjKXpO84gGORB5WWwckBcbc=/0x0:1205x1205/fit-in/900x675/99designs-contests-attachments/72/72376/attachment_72376810',
                  buttons: [
                    {
                      title: 'Appeler',
                      type: 'phone_number',
                      value: '+33761391453'
                    }
                  ]
                }
              })
            } else {
              message.addReply({
                type: 'card',
                content: {
                  title: 'Contactez Voxist pour tester notre app',
                  subtitle: 'Ceci va lancer un appel vocal',
                  imageUrl: 'https://images-platform.99static.com/bSeJTjKXpO84gGORB5WWwckBcbc=/0x0:1205x1205/fit-in/900x675/99designs-contests-attachments/72/72376/attachment_72376810',
                  buttons: [
                    {
                      title: 'Appeler',
                      type: 'phone_number',
                      value: '+33761391453'
                    }
                  ]
                }
              })
            }
          }
        })
      } else {
        result.replies.forEach((replyContent, i) => {
          if (i < length) {
            message.addReply({ type: 'text', content: replyContent })
          } else {
            if (local === 'FR') {
              message.addReply({
                type: 'text',
                content: 'Contactez Voxist pour tester notre app. \nAppuyez <tel://33-7-61-39-14-53|ici> va lancer un appel vocal'
              })
            } else {
              message.addReply({
                type: 'text',
                content: 'Contactez Voxist pour tester notre app. \nAppuyez <tel://33-7-61-39-14-53|ici> va lancer un appel vocal'
              })
            }
          }
        })
      }
    } else {
      result.replies.forEach((replyContent, i) => {
        if (i < length) {
          message.addReply({ type: 'text', content: replyContent })
        } else {
          message.addReply({ type: 'text', content: 'Merci de nous avoir accordé de votre temps. Bonne journée' })
        }
      })
    }
  } else if ((result.action && result.action.slug === 'phone' && result.action.done) || (result.entities && result.entities.phone)) {
    if (/[0-9]{6,30}/g.test(text)) {
      var num = null
      try {
        num = phoneUtil.format(phoneUtil.parse(text, local || 'FR'), PNF.E164)
      } catch (e) {
        console.log('no matching')
        modConv(message.senderId, {
          'loc': null,
          'non': null,
          'oui': null,
          'rep1': null,
          'rep2': null,
          'tel': null
        })
        result.replies.forEach((replyContent, i) => {
          if (i < length) {
            message.addReply({ type: 'text', content: replyContent })
          } else {
            message.addReply({ type: 'text', content: 'Le format de votre numéro n\'est pas reconnu' })
          }
        })
      }
      try {
        var numRes = await getFireNumber(num)
        if (numRes) {
          console.log(numRes)
          result.replies.forEach((replyContent, i) => {
            if (i < length) {
              message.addReply({ type: 'text', content: replyContent })
            } else {
              if (isFB) {
                message.addReply({
                  type: 'quickReplies',
                  content: {
                    title: 'Préférez vous être contacté par Messenger ou Voxist?',
                    buttons: [
                      {
                        title: 'Messenger',
                        value: 'notre bot'
                      },
                      {
                        title: 'Voxist',
                        value: 'l\'application voxist'
                      }
                    ]
                  }
                })
              } else {
                message.addReply({
                  type: 'quickReplies',
                  content: {
                    title: 'Préférez vous être contacté par Slack ou Voxist?',
                    buttons: [
                      {
                        title: 'Slack',
                        value: 'notre bot'
                      },
                      {
                        title: 'Voxist',
                        value: 'l\'application voxist'
                      }
                    ]
                  }
                })
              }
              modConv(message.senderId, {tel: {raw: num, value: numRes.uuid}})
            }
          })
        } else {
          console.log('no results')
          result.replies.forEach((replyContent, i) => {
            if (i < length) {
              message.addReply({ type: 'text', content: replyContent })
            } else {
              if (local === 'FR' || local === 'US') {
                message.addReply({
                  type: 'quickReplies',
                  content: {
                    title: 'Nous n\'avons pas trouvez votre numéro. Voulez vous testez Voxist?',
                    buttons: [
                      {
                        title: 'Oui',
                        value: 'test oui'
                      },
                      {
                        title: 'Non',
                        value: 'test pas'
                      }
                    ]
                  }
                })
              } else {
                message.addReply({ type: 'text', content: 'Nous n\'avons pas trouvez votre numéro. Et les tests ne sont pas disponibles dans votre pays.' })
              }
            }
          })
        }
      } catch (e) {
        console.log(e)
        modConv(message.senderId, {
          'tel': null
        })
        result.replies.forEach((replyContent, i) => {
          message.addReply({ type: 'text', content: 'Une erreur c\'est produite veuillez nous recommuniquer votre numéro' })
        })
      }
    } else {
      console.log('no matching')
      result.replies.forEach((replyContent, i) => {
        message.addReply({ type: 'text', content: 'Le format de votre numéro n\'est pas reconnu' })
      })
    }
  } else if ((result.action && result.action.slug === 'messengerfirst' && result.action.done && /\+/.test(result.memory.tel.raw)) || (result.entities && result.entities.choix1 && /\+/.test(result.memory.tel.raw))) {
    result.replies.forEach((replyContent, i) => {
      if (i < length) {
        message.addReply({ type: 'text', content: replyContent })
      } else {
        message.addReply({
          type: 'quickReplies',
          content: {
            title: 'Voulez vous recevoir de la pub? Si oui, à quelle date?',
            buttons: [
              {
                title: 'non',
                value: 'pas une seule fois'
              },
              {
                title: 'tout les 15 jours',
                value: 'tout les 15'
              },
              {
                title: 'tout les mois',
                value: 'tout les 30'
              }
            ]
          }
        })
      }
    })
    if (text.toLocaleLowerCase() === 'our bot' || text.toLocaleLowerCase() === 'notre bot') {
      try {
        await updateFireBot({name: (isFB ? 'facebook' : 'slack') + '-fr', type: (isFB ? 'facebook' : 'slack'), access: (isFB ? [message.conversationId, message.senderId] : [message.conversationId, message.chatId])}, result.memory.tel.value)
      } catch (e) {
        console.log(e)
      }
    }
  } else if ((result.action && result.action.slug === 'pub' && result.action.done && /\+/.test(result.memory.tel.raw)) || (result.entities && result.entities.choix3 && /\+/.test(result.memory.tel.raw))) {
    result.replies.forEach((replyContent, i) => {
      if (i < length) {
        message.addReply({ type: 'text', content: replyContent })
      } else {
        message.addReply({ type: 'text', content: replyContent })
      }
    })
    if (['not at all', 'every 15', 'every 30', 'pas une seule fois', 'tout les 15', 'tout les 30'].indexOf(text.toLocaleLowerCase()) > -1) {
      var value = ['not at all', 'every 15', 'every 30', 'pas une seule fois', 'tout les 15', 'tout les 30'].indexOf(text.toLocaleLowerCase())
      value = value === 0 || value === 3 ? 0 : value === 1 || value === 4 ? 15 : value === 2 || value === 5 ? 30 : 0
      try {
        await updateFireBot2(result.memory.tel.value, (isFB ? 'facebook' : 'slack'), value)
      } catch (e) {
        console.log(e)
      }
    }
  } else {
    result.replies.forEach((replyContent, i) => {
      message.addReply({ type: 'text', content: replyContent })
    })
  }
  return message
}

export default frenchReply
