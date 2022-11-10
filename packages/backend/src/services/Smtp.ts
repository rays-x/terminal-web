import {Injectable} from '@nestjs/common';
import mailchimp    from '@mailchimp/mailchimp_transactional';

@Injectable()
export class SmtpService{
  private mailchimp;
  constructor(){
    this.mailchimp=mailchimp(`${process.env.MAILCHIMP_TRANSACTIONAL_API_KEY}`);
  }
  async sendEmail(type: string,args: any){
    switch(type){
    case 'recover-by-email':{
      const {email,appeal,recoverExistRequest,recoverExistRequestVerify}=args;
      if(!email|| !recoverExistRequest|| !recoverExistRequestVerify) break;
      try{
        console.log(await this.mailchimp.messages.sendTemplate({
          template_name:'en',
          template_content:[],
          message:{
            subject:'Recovery password',
            from_email:'cfo@ray.sx',
            merge_vars:[{
              rcpt:email,
              vars:[
                {
                  name:'USER_NAME',
                  content:appeal
                },
                {
                  name:'LINK',
                  content:`${process.env.SERVER_URL}/api/rest/auth/email/recover/${recoverExistRequest}/${recoverExistRequestVerify}`
                }
              ]
            }
            ],
            to:[{
              email
            }]
          }
        }));
      }catch(e){
        console.error(e.message);
      }
      break;
    }
    }
  }
}
