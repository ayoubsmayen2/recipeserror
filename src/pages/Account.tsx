import React , {ChangeEvent, Component  } from "react";


import _ from 'lodash'

class Login {
     email :string; 
     password :string;

     constructor(email:string,password:string){
         this.password  =password ;
         this.email = email;
     }
}
export default class Account extends React.Component{


        constructor(props: any){
             super(props);

             this.handleLoginOnChangeEmail = this.handleLoginOnChangeEmail.bind(this);
             this.handleLoginOnChangePassword = this.handleLoginOnChangePassword.bind(this);


           /*  this.state = {

                  login : {
                      email : '',
                      password :'',
                  },

                  register: {
                      username:'',
                      email:'',
                      password : ''
                  }
             }*/
        }
        state = {

            login : {
                email : '',
                password :'',
            },

            register: {
                username:'',
                email:'',
                password : ''
            }
       }

        handleLoginOnChangeEmail=(e:ChangeEvent<HTMLInputElement>)=> {
           // let login = _.assign({}, this.state.login)
    
           // login[e.target.name] =  e.target.value
            this.setState({ email: e.target.value})
        }

        handleLoginOnChangePassword=(e:ChangeEvent<HTMLInputElement>)=> {
            // let login = _.assign({}, this.state.login)
     
            // login[e.target.name] =  e.target.value
             this.setState({ password: e.target.value})
         }
         handleUserLogin() {
            //this.props.login(this.state.login.email, this.state.login.password)
        }
    
        render(){

              return (
                 
                <div>
                 
                   <form>
                       <input type="text" className="form-control"  id="email"   name="email"    value={this.state.login.email}  onChange={this.handleLoginOnChangeEmail} />
                       <input type="text" className="form-control"  id="password"  name="password"    value={this.state.login.password}         onChange={this.handleLoginOnChangePassword} />
                          <input type="submit"   onClick={this.handleUserLogin}    value="login"  />

                   </form>
   
                </div>
                )
        }
}